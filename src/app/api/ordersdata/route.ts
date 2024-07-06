import { NextRequest, NextResponse } from "next/server";






const data= [
  {
    order: "ORD001",
    status: "Pending",
    lastOrder: "2023-01-15",
    method: "Stripe",
  },
  {
    order: "ORD002",
    status: "Processing",
    lastOrder: "2023-02-20",
    method: "Google Pay",
  },
  {
    order: "ORD003",
    status: "Completed",
    lastOrder: "2023-03-10",
    method: "Cryptocurrency",
  },
  {
    order: "ORD004",
    status: "Pending",
    lastOrder: "2023-04-05",
    method: "Google Pay",
  },
  {
    order: "ORD005",
    status: "Completed",
    lastOrder: "2023-05-12",
    method: "Stripe",
  },
  {
    order: "ORD006",
    status: "Processing",
    lastOrder: "2023-06-18",
    method: "Cryptocurrency",
  },
  {
    order: "ORD007",
    status: "Completed",
    lastOrder: "2023-07-22",
    method: "Stripe",
  },
  {
    order: "ORD008",
    status: "Pending",
    lastOrder: "2023-08-30",
    method: "Google Pay",
  },
  {
    order: "ORD009",
    status: "Processing",
    lastOrder: "2023-09-05",
    method: "Stripe",
  },
  {
    order: "ORD010",
    status: "Completed",
    lastOrder: "2023-10-18",
    method: "Cryptocurrency",
  },
  {
    order: "ORD011",
    status: "Pending",
    lastOrder: "2023-11-25",
    method: "Google Pay",
  },
  {
    order: "ORD012",
    status: "Completed",
    lastOrder: "2023-12-08",
    method: "Stripe",
  },
  {
    order: "ORD013",
    status: "Processing",
    lastOrder: "2024-01-15",
    method: "Cryptocurrency",
  },
  {
    order: "ORD014",
    status: "Completed",
    lastOrder: "2024-02-20",
    method: "Stripe",
  },
  {
    order: "ORD015",
    status: "Pending",
    lastOrder: "2024-03-30",
    method: "Google Pay",
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
  else if (filter === "Pending") {
    filteredData = filteredData.filter((item) => item.status === "Pending");
  }
  else if (filter === "Completed") {
    filteredData = filteredData.filter((item) => item.status === "Completed");
  }
  else if (filter === "Processing") {
    filteredData = filteredData.filter((item) => item.status === "Processing");
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