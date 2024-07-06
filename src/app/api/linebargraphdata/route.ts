import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = [
    {
      name: "Plan A",
      subscribers: 150,
      revenue: 1500,
      activeUsers: 120,
      newUsers: 90,
    },
    {
      name: "Plan B",
      subscribers: 300,
      revenue: 4500,
      activeUsers: 280,
      newUsers: 50,
    },
    {
      name: "Plan C",
      subscribers: 200,
      revenue: 6000,
      activeUsers: 190,
      newUsers: 90,
    },
    {
      name: "Plan D",
      subscribers: 100,
      revenue: 4000,
      activeUsers: 90,
      newUsers: 80,
    },
    {
      name: "Plan E",
      subscribers: 180,
      revenue: 3000,
      activeUsers: 150,
      newUsers: 125,
    },
    {
      name: "Plan F",
      subscribers: 120,
      revenue: 3500,
      activeUsers: 110,
      newUsers: 100,
    },
  ];

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
