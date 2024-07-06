import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const data = [
    { name: "Basic Plan", subscribers: 850, revenue: 2500, activeUsers: 600 },
    { name: "Premium Plan", subscribers: 500, revenue: 4500, activeUsers: 480 },
    { name: "Ultimate Plan", subscribers: 600, revenue: 5000, activeUsers: 390 },

  ];

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
