import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard created with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div
      className={cn(
        "min-h-screen w-full bg-white text-black flex",
        inter.className
      )}>
      <SideNavbar />
      <main className="flex-1 md:p-8 p-4">{children}</main>
    </div>
  );
}
