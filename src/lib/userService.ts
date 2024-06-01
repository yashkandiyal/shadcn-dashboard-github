import prisma from "./prisma"

interface User {
  id: string;
  username: string;
  email: string;
  clerkId: string;
  plan: string;
}

export async function createUser(user: User) {
  try {
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        clerkId: user.clerkId,
        plan: user.plan,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
