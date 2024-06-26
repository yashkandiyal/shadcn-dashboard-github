"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import LoaderComponent from "@/components/Loader";

type Props = {};
type Payment = {
  name: string;
  email: string;
  lastOrder: string;
  method: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Image
            width={40}
            height={40}
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("name")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
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

export default function UsersPage({}: Props) {
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
      recentDate.setMonth(recentDate.getMonth() - 10);
      return new Date(item.lastOrder) > recentDate;
    }
    if (filter === "Stripe") {
      return item.method === "Stripe";
    }
    if (filter === "Cryptocurrency") {
      return item.method === "Cryptocurrency";
    }
    if (filter === "Google Pay") {
      return item.method === "Google Pay";
    }
    return true;
  });

  if (!isMounted) {
    return <LoaderComponent />;
  }

  return (
    <div className="flex flex-col gap-5 w-full bg-white dark:bg-gray-900 dark:text-white">
      <PageTitle title="Users" />
      <div className="flex justify-end">
        <select
          className="w-[8rem] p-2 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
