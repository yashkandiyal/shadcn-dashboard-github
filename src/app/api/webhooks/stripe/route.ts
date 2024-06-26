import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(request: Request) {
  const rawBody = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const sig = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data
          .object as Stripe.Checkout.Session;

        // Fetch user based on customer ID

        const customer = checkoutSessionCompleted.customer_details;
        const totalAmount = checkoutSessionCompleted.amount_total;
        console.log("customer email address:", customer?.email);
        console.log("amount:", totalAmount);
        let updatedPlan;
        //according to the amount_total i will check what is the plan the user has bought
        if (totalAmount === 999) {
          updatedPlan = "Basic";
        } else if (totalAmount === 2999) {
          updatedPlan = "Premium";
        } else {
          updatedPlan = "Ultimate";
        }
        await prisma.user.update({
          where: {
            email: customer?.email!,
          },
          data: {
            plan: updatedPlan,
          },
        });
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
