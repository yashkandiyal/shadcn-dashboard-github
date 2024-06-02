"use client";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";
import LoaderComponent from "@/components/Loader";
import {SidebarProvider} from "@/components/Context";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoaderComponent />;
  }

  return (
    <>
      <SidebarProvider>
        <div
          className={cn(
            "min-h-screen w-full ml-2 bg-white text-black dark:bg-gray-900 dark:text-white flex",
            inter.className
          )}>
          <SideNavbar />
          <main className="flex-1 md:p-8 p-4">{children}</main>
        </div>
      </SidebarProvider>
    </>
  );
}
