"use client";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";
import LoaderComponent from "@/components/Loader";
import { SidebarProvider } from "@/components/Context";
import { useAuth } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

type User = {
  plan: string;
  email: string;
  id: string;
  createdAt: string;
  clerkId: string;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Define type for user state
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "/api/fetchuser"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem("userPlan", JSON.stringify(userData.plan)); // Store user's plan in localStorage
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const initializeUser = async () => {
      if (isSignedIn) {
        await fetchUser();
      } else {
        localStorage.removeItem("userPlan");
        setUser(null);
      }
      setIsMounted(true); // Set component as mounted
    };

    initializeUser();

    return () => {
      setIsMounted(false); // Clean-up effect
    };
  }, [isSignedIn]);

  useEffect(() => {
    // Update localStorage when user updates their plan
    if (isSignedIn && user?.plan) {
      localStorage.setItem("userPlan", JSON.stringify(user.plan));
    } else {
      localStorage.removeItem("userPlan");
    }
  }, [isSignedIn, user?.plan]);

  if (!isMounted) {
    return <LoaderComponent />;
  }

  return (
    <>
      <SidebarProvider>
        <div
          className={cn(
            "min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white flex",
            inter.className
          )}>
          <SideNavbar />
          <main className="flex-1 md:p-[2.5rem] p-3">{children}</main>
        </div>
      </SidebarProvider>
    </>
  );
}
