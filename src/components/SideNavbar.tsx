"use client";
import { useState } from "react";
import { Nav } from "./ui/nav";
import {
  ShoppingCart,
  LayoutDashboard,
  Users,
  Settings,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { useSidebarContext } from "./Context"; // Import the context

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const { isMobileOpen, toggleMobileSidebar } = useSidebarContext(); // Use the context

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  const sidebarClasses = `fixed inset-y-0 left-0 z-50  ${
    mobileWidth
      ? isMobileOpen
        ? "w-full"
        : "w-0"
      : isCollapsed
      ? "w-[2.6rem]"
      : "w-[16rem]"
  } bg-white dark:bg-gray-900 overflow-hidden border-r border-gray-200 dark:border-gray-700 pt-24 pb-10`;

  return (
    <>
      {mobileWidth && !isMobileOpen && (
        <Button
          onClick={toggleMobileSidebar}
          variant="secondary"
          className="fixed top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"></Button>
      )}
      <div className={sidebarClasses}>
        {mobileWidth && (
          <div className="absolute top-4 left-4">
            <Button
              onClick={toggleMobileSidebar}
              variant="secondary"
              className="rounded-full p-2 transition-colors duration-300 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              
            </Button>
          </div>
        )}
        {!mobileWidth && (
          <div className="absolute right-[-20px] top-7">
            <Button
              onClick={toggleSidebar}
              variant="secondary"
              className="rounded-full p-2 transition-colors duration-300 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"></Button>
          </div>
        )}
        <Nav
          isCollapsed={mobileWidth ? false : isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/dashboard",
              icon: LayoutDashboard,
              variant: "default",
            },
            {
              title: "Users",
              href: "/dashboard/users",
              icon: Users,
              variant: "ghost",
            },
            {
              title: "Orders",
              href: "/dashboard/orders",
              icon: ShoppingCart,
              variant: "ghost",
            },
            {
              title: "Plans",
              href: "/dashboard/plans",
              icon: Settings,
              variant: "ghost",
            },
          ]}
        />
      </div>
    </>
  );
}
