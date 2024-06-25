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
        console.log("plan id:", checkoutSessionCompleted.id);
        console.log("customer email address:", customer?.email);
        console.log("amount:", checkoutSessionCompleted.amount_total);

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
