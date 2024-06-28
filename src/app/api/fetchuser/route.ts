import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import NextCors from "nextjs-cors";

export async function GET(req: Request) {
  // Apply CORS middleware
  await NextCors(req, NextResponse, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  // Get authentication details
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
      where: { clerkId: userId }, // assuming clerkId is stored in your User model
    });
    console.log("userInPrisma:", userInPrisma);

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
