"use client";
import {SunDim, Moon} from "lucide-react"
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LoaderComponent from "@/components/Loader";
export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <LoaderComponent/>
    );

  if (resolvedTheme === "dark") {
    return <SunDim onClick={() => setTheme("light")} />;
  }

  if (resolvedTheme === "light") {
    return <Moon onClick={() => setTheme("dark")} />;
  }
}