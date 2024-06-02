"use client"
import React, {useEffect, useState} from "react";
import LoaderComponent from "@/components/Loader";

const page = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoaderComponent />;
  }
  return <div></div>;
};

export default page;
