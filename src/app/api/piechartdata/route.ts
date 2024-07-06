// app/api/payments/route.js

import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const data = [
    {
      name: "John Doe",
      email: "john@example.com",
      lastOrder: "2023-01-01",
      method: "Stripe",
    },
    {
      name: "Alice Smith",
      email: "alice@example.com",
      lastOrder: "2023-02-15",
      method: "Apple Pay",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      lastOrder: "2023-03-20",
      method: "Stripe",
    },
    {
      name: "Emma Brown",
      email: "emma@example.com",
      lastOrder: "2023-04-10",
      method: "Stripe",
    },
    {
      name: "Michael Davis",
      email: "michael@example.com",
      lastOrder: "2023-05-05",
      method: "Stripe",
    },
    {
      name: "Sophia Wilson",
      email: "sophia@example.com",
      lastOrder: "2023-06-18",
      method: "Apple Pay",
    },
    {
      name: "Liam Garcia",
      email: "liam@example.com",
      lastOrder: "2023-07-22",
      method: "Apple Pay",
    },
    {
      name: "Olivia Martinez",
      email: "olivia@example.com",
      lastOrder: "2023-08-30",
      method: "Apple Pay",
    },
    {
      name: "Noah Rodriguez",
      email: "noah@example.com",
      lastOrder: "2023-09-12",
      method: "Google Pay",
    },
    {
      name: "Ava Lopez",
      email: "ava@example.com",
      lastOrder: "2023-10-25",
      method: "Stripe",
    },
    {
      name: "Elijah Hernandez",
      email: "elijah@example.com",
      lastOrder: "2023-11-05",
      method: "Google Pay",
    },
    {
      name: "Mia Gonzalez",
      email: "mia@example.com",
      lastOrder: "2023-12-08",
      method: "Stripe",
    },
    {
      name: "James Perez",
      email: "james@example.com",
      lastOrder: "2024-01-18",
      method: "Google Pay",
    },
    {
      name: "Charlotte Carter",
      email: "charlotte@example.com",
      lastOrder: "2024-02-22",
      method: "Apple Pay",
    },
    {
      name: "Benjamin Taylor",
      email: "benjamin@example.com",
      lastOrder: "2024-03-30",
      method: "Stripe",
    },
  ];

  // Filter data to include only Stripe, Google Pay, and Apple Pay methods


  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
