import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(request: Request) {
  const rawBody = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const sig = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  let currentUpdatedPlan;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data
          .object as Stripe.Checkout.Session;
        console.log("current product details:", checkoutSessionCompleted);

        // Fetch user based on customer ID
        const customer = checkoutSessionCompleted.customer_details;
        const productId = checkoutSessionCompleted.metadata?.product_id;

        console.log("customer email address:", customer?.email);
        console.log("product_id:", productId);

        // Determine the purchased plan based on product_id
        let updatedPlan;
        if (productId === process.env.BASIC_PLAN_PRODUCT_ID) {
          updatedPlan = "Basic Plan";
        } else if (productId === process.env.PREMIUM_PLAN_PRODUCT_ID) {
          updatedPlan = "Premium Plan";
        } else if (productId === process.env.ULTIMATE_PLAN_PRODUCT_ID) {
          updatedPlan = "Ultimate Plan";
        } else {
          console.error("Unknown product_id:", productId);
          return NextResponse.json(
            { error: "Unknown product_id" },
            { status: 400 }
          );
        }

        // Update the user's plan in the database using the email
        currentUpdatedPlan = await prisma.user.update({
          where: {
            email: customer?.email!,
          },
          data: {
            plan: updatedPlan,
          },
        });

        console.log("updated plan:", currentUpdatedPlan);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error constructing webhook event:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
