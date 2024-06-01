import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import prisma from "@/lib/prisma"; // Ensure this path is correct

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
export const dynamic = "auto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = session.customer as string;
      const plan = session.metadata?.plan;

      if (customerId && plan) {
        try {
          await prisma.user.update({
            where: { email: session.customer_email! },
            data: { plan, stripeCustomerId: customerId },
          });
          console.log(
            `User with customerId ${customerId} updated to plan ${plan}`
          );
        } catch (error: any) {
          console.error(`Error updating user plan: ${error.message}`);
        }
      }
      res.status(200).json({ received: true });
      break;

    case "checkout.session.async_payment_failed":
      console.error("Payment failed:", event.data.object);
      res.status(200).json({ message: "Payment failed" });
      break;

    case "checkout.session.async_payment_succeeded":
      console.log("Payment succeeded:", event.data.object);
      res.status(200).json({ message: "Payment succeeded" });
      break;

    // Handle other Stripe webhook events as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
      res.status(200).json({ received: true });
      break;
  }
}
