import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const data = [
    { month: "January", newUsers: 4000, sales: 2400, revenue: 2400 },
    { month: "February", newUsers: 3000, sales: 1398, revenue: 2210 },
    { month: "March", newUsers: 2000, sales: 9800, revenue: 2290 },
    { month: "April", newUsers: 2780, sales: 3908, revenue: 2000 },
    { month: "May", newUsers: 1890, sales: 4800, revenue: 2181 },
    { month: "June", newUsers: 2390, sales: 3800, revenue: 2500 },
    { month: "July", newUsers: 3490, sales: 4300, revenue: 2100 }
  ];

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
