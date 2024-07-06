"use client";

import React, { useState, useEffect } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import LoaderComponent from "@/components/Loader";
import PageTitle from "@/components/PageTitle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { DataTableOrders } from "@/components/DataTableOrders";
import { cn } from "@/lib/utils";

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

const fetchData = async (page: number, pageSize: number, filter: string) => {
  const res = await fetch(
    `/api/ordersdata?page=${page}&pageSize=${pageSize}&filter=${filter}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const pageSize = 5;

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["orders", page, filter],
    queryFn: () => fetchData(page, pageSize, filter),
  });

  useEffect(() => {
    router.push(`/dashboard/orders?page=${page}&filter=${filter}`);
  }, [page, filter, router]);

  const handleFilterChange = (newFilter: string) => {
    setPage(1);
    setFilter(newFilter);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-5 w-full bg-white dark:bg-gray-900 dark:text-white">
      <PageTitle title="Users" />
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[5rem] p-1 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            Filter
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={filter === ""}
              onCheckedChange={() => handleFilterChange("")}>
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "recent"}
              onCheckedChange={() => handleFilterChange("recent")}>
              Recent Orders
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "Stripe"}
              onCheckedChange={() => handleFilterChange("Stripe")}>
              Stripe Payments
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "Google Pay"}
              onCheckedChange={() => handleFilterChange("Google Pay")}>
              Google Pay Payments
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "Cryptocurrency"}
              onCheckedChange={() => handleFilterChange("Cryptocurrency")}>
              Cryptocurrency Payments
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "Pending"}
              onCheckedChange={() => handleFilterChange("Pending")}>
              Pending Payments
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "Completed"}
              onCheckedChange={() => handleFilterChange("Completed")}>
              Completed Payments
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "Processing"}
              onCheckedChange={() => handleFilterChange("Processing")}>
              Processing Payments
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DataTableOrders
        columns={columns}
        data={data.data}
        totalItems={data.total}
        pageSize={pageSize}
        currentPage={page}
        isFetching={isFetching}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const queryClient = new QueryClient();

export default function UsersPageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersPage />
    </QueryClientProvider>
  );
}
