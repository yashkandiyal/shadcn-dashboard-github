"use client";
import React, { useEffect } from "react";
import { Menu, X } from "lucide-react"; // Import both menu and cross icons
import { useWindowWidth } from "@react-hook/window-size";
import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs"; // Import useAuth from Clerk
import ThemeSwitch from "../app/themeSwitch";
import { useSidebarContext } from "@/components/Context"; // Import the context

type Props = {
    title: string;
    className?: string;
};

export default function PageTitle({ title, className }: Props) {
    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;
    const { isMobileOpen, toggleMobileSidebar } = useSidebarContext(); // Use the context
    const { isSignedIn } = useAuth(); // Access isSignedIn from Clerk's useAuth hook

    // useEffect to handle logout detection
    useEffect(() => {
        if (!isSignedIn) {
            // Logic to handle logout, e.g., redirect or show a message
            console.log("User has logged out.");
        }
    }, [isSignedIn]);

    return (
        <div className="flex items-center justify-between">
            {mobileWidth && ( // Check if mobile width
                <button onClick={toggleMobileSidebar}>
                    {isMobileOpen ? <X /> : <Menu />}{" "}
                    {/* Conditionally render the icon */}
                </button>
            )}
            <h1
                className={cn(
                    "text-2xl font-semibold text-gray-900 dark:text-white",
                    className
                )}
            >
                {title}
            </h1>
            <div className="flex items-center justify-center gap-5">
                <ThemeSwitch />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}
