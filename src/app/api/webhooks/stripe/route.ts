import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const endpointSecret = process.env.WEBHOOK_SECRET as string;

// Make sure to add this, otherwise you will get a stream.not.readable error
export const dynamic = "auto";

export const POST=async(req: NextApiRequest, res: NextApiResponse)=> {
  try {
    console.log("req.headers", req.headers);
    if (req.method !== "POST")
      return res.status(405).send("Only POST requests allowed");

    const sig: any = req.headers["stripe-signature"];
    const rawBody = await getRawBody(req);

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("event.type", JSON.stringify(event.type));

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ["line_items", "customer"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;
      const customerEmail = (sessionWithLineItems.customer as any).email;
      const customerId = (sessionWithLineItems.customer as any).id;

      if (!lineItems || !customerEmail || !customerId) {
        return res.status(500).send("Internal Server Error");
      }

      try {
        // Assuming only one item is purchased at a time
        const purchasedItem = lineItems.data[0];
        const plan = purchasedItem.description
        const stripeId = customerId;

        // Store plan and stripeId in the database
        const user = await prisma.user.update({
          where: { email: customerEmail },
          data: { plan, stripeCustomerId:stripeId },
        });

        console.log("User updated with plan and stripeId:", user);
      } catch (error) {
        console.log("Error updating user:", error);
        return res.status(500).send("Internal Server Error");
      }
    }

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}
