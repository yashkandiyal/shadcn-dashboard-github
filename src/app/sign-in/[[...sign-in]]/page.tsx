"use client";
import { useState, useEffect } from "react";
import { SignIn } from "@clerk/nextjs";

import LoaderComponent from "@/components/Loader";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false); // Cleanup when component unmounts
  }, []);

  if (!mounted) {
    return <LoaderComponent />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
