"use client"
import { SignIn } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { useEffect } from "react";

export default function Page() {
   const myFunction = async () => {
     const response = await clerkClient.users.getUserList();

     console.log(response.data);
   };
   useEffect(() => {
     myFunction();
   }, []);
  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
