import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className={cn("text-2xl font-semibold", className)}>{title}</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
