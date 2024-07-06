import { getAuth } from "@clerk/nextjs/server";
import {  NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {

  // @ts-ignore
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Fetch user from database based on userId
    const userInPrisma = await prisma.user.findUnique({
      where: { clerkId: userId }, 
    });
    

    if (!userInPrisma) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userInPrisma);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
