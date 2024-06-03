"use client";
import React, { useState, useEffect } from "react";
import { SignIn } from "@clerk/nextjs";

import LoaderComponent from "@/components/Loader";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoaderComponent />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
