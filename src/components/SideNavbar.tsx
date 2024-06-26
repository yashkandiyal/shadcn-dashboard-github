"use client";
import { useState } from "react";
import { Nav } from "./ui/nav";
import {
  ShoppingCart,
  LayoutDashboard,
  Users,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";
import { useSidebarContext } from "./Context"; // Import the context

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const { isMobileOpen, toggleMobileSidebar } = useSidebarContext(); // Use the context

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  const sidebarClasses = `${
    mobileWidth
      ? isMobileOpen
        ? "w-full fixed inset-y-0 left-0 z-50 transition ease-in-out duration-100 "
        : "w-0"
      : isCollapsed
      ? "w-[4rem]"
      : "w-[10rem]"
  } bg-white dark:bg-gray-900 overflow-hidden border-r border-gray-200 dark:border-gray-700 pt-4 pb-10`;

  return (
    <div className={sidebarClasses}>
      <div className="flex items-center justify-between p-3">
        {isMobileOpen && (
          <X className="cursor-pointer" onClick={() => toggleMobileSidebar()} />
        )}
        {!isMobileOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700">
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        )}
      </div>
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
        toggleSidebar={toggleMobileSidebar}
      />
    </div>
  );
}
