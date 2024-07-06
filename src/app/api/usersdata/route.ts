import { NextRequest, NextResponse } from "next/server";

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
    method: "PayPal",
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
    method: "Cryptocurrency",
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
    method: "Cryptocurrency",
  },
  {
    name: "Elijah Hernandez",
    email: "elijah@example.com",
    lastOrder: "2023-11-05",
    method: "Gpay",
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
    method: "Zelle",
  },
  {
    name: "Benjamin Taylor",
    email: "benjamin@example.com",
    lastOrder: "2024-03-30",
    method: "Stripe",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")!) || 1;
  const pageSize = parseInt(searchParams.get("pageSize")!) || 5;
  const filter = searchParams.get("filter") || "";

  let filteredData = data;

  if (filter === "recent") {
    const recentDate = new Date();
    recentDate.setMonth(recentDate.getMonth() - 10);
    filteredData = filteredData.filter(
      (item) => new Date(item.lastOrder) > recentDate
    );
  } else if (filter === "Stripe") {
    filteredData = filteredData.filter((item) => item.method === "Stripe");
  } else if (filter === "Cryptocurrency") {
    filteredData = filteredData.filter(
      (item) => item.method === "Cryptocurrency"
    );
  } else if (filter === "Google Pay") {
    filteredData = filteredData.filter((item) => item.method === "Google Pay");
  }

  const offset = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(offset, offset + pageSize);

  return NextResponse.json({
    data: paginatedData,
    total: filteredData.length,
    page,
    pageSize,
  });
}
