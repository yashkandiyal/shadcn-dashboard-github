"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import LoaderComponent from "@/components/Loader";

type Props = {};
type Payment = {
  order: string;
  status: string;
  lastOrder: string;
  method: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("status") === "Pending",
            "bg-orange-200": row.getValue("status") === "Processing",
            "bg-green-200": row.getValue("status") === "Completed",
          })}>
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "lastOrder",
    header: "Last Order",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
];

const data: Payment[] = [
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

export default function OrdersPage({}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredData = data.filter((item) => {
    if (filter === "recent") {
      const recentDate = new Date();
      recentDate.setMonth(recentDate.getMonth() - 6);
      return new Date(item.lastOrder) > recentDate;
    }
    if (filter === "Stripe") {
      return item.method === "Stripe";
    }
    if (filter === "Google Pay") {
      return item.method === "Google Pay";
    }
    if (filter === "Cryptocurrency") {
      return item.method === "Cryptocurrency";
    }
    return true;
  });

  if (!isMounted) {
    return <LoaderComponent />;
  }

  return (
    <div className="flex flex-col gap-5 w-full bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="">
        <PageTitle title="Orders" />
      </div>
      <div className="flex justify-end">
        <select
          className="w-[8rem] p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
          value={filter}
          onChange={handleFilterChange}>
          <option value="">Filter</option>
          <option value="recent">Recent Orders</option>
          <option value="Stripe">Stripe Payments</option>
          <option value="Google Pay">Google Pay Payments</option>
          <option value="Cryptocurrency">Cryptocurrency Payments</option>
        </select>
      </div>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
