"use client"
import React, { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <SidebarContext.Provider value={{ isMobileOpen, toggleMobileSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
