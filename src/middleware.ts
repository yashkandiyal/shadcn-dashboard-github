import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/api/fetchuser",
  "/api/webhooks/stripe",
  "/api/webhooks/clerk",
  "/sign-in(.*)",
]);

export default clerkMiddleware((auth, req) => {
  console.log("Middleware reached. Path:", req.nextUrl.pathname);
  if (isPublicRoute(req)) {
    console.log("Public route detected");
    return NextResponse.next();
  }
  console.log("Protected route, applying auth");
  auth().protect();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
