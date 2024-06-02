"use client"
import React from "react";
import { Menu } from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import ThemeSwitch from "../app/themeSwitch";
import { useSidebarContext } from "@/components/Context"; // Import the context

type Props = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const { toggleMobileSidebar } = useSidebarContext(); // Use the context

  return (
    <div className="flex items-center justify-between">
      {mobileWidth && (
        <button onClick={toggleMobileSidebar}>
          <Menu />
        </button>
      )}
      <h1
        className={cn(
          "text-2xl font-semibold text-gray-900 dark:text-white",
          className
        )}>
        {title}
      </h1>
      <div className="flex items-center justify-center gap-5">
        <ThemeSwitch />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
