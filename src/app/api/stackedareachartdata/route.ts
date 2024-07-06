import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
const data = [
  { name: "January", newUsers: 500, activeUsers: 200, revenue: 2400 },
  { name: "February", newUsers: 600, activeUsers: 300, revenue: 2210 },
  { name: "March", newUsers: 800, activeUsers: 500, revenue: 2290 },
  { name: "April", newUsers: 700, activeUsers: 400, revenue: 2000 },
  { name: "May", newUsers: 400, activeUsers: 600, revenue: 2181 },
  { name: "June", newUsers: 300, activeUsers: 800, revenue: 2500 },
  { name: "July", newUsers: 200, activeUsers: 700, revenue: 2100 },
  { name: "August", newUsers: 450, activeUsers: 750, revenue: 2300 },
  { name: "September", newUsers: 650, activeUsers: 850, revenue: 2400 },
  { name: "October", newUsers: 700, activeUsers: 900, revenue: 2600 },
  { name: "November", newUsers: 800, activeUsers: 950, revenue: 2800 },
  { name: "December", newUsers: 900, activeUsers: 1000, revenue: 3000 },
];


  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
