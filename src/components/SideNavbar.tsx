"use client"
import { useEffect, useState } from "react";
import { Nav } from "./ui/nav";
import {
  ShoppingCart,
  LayoutDashboard,
  Users,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
const [isMounted, setIsMounted] = useState(false);

// useEffect(() => {
//   setIsMounted(true);
// }, []);

// // Render a placeholder or skeleton on the server side
// if (!isMounted) {
//   return (
//     <div className="p-4 bg-gray-200">
//       <p>Loading...</p>
//     </div>
//   );
// }
  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  const sidebarClasses = `relative border-r pb-10 pt-24 transition-all duration-300 ease-in-out ${
    isCollapsed ? "min-w-[3rem]" : "min-w-[2.5rem]"
  }`;

  return (
    <div className={sidebarClasses}>
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2  transition-colors duration-300">
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
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
  );
}
