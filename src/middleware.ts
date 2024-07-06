import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/api/fetchuser",
  "/api/webhooks/stripe",
  "/api/webhooks/clerk",
  "/sign-in(.*)",
]);

const allowedOrigin = "https://shadcn-dashboard-github.vercel.app/";

export default clerkMiddleware((auth, req) => {
  console.log("Middleware reached. Path:", req.nextUrl.pathname);

  const origin = req.nextUrl.origin;
  console.log("origin:",origin)
  if (origin !== allowedOrigin) {
    console.log(`Unauthorized origin: ${origin}`);
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (isPublicRoute(req)) {
    console.log("Public route detected");

    // Check if the route is /api/fetchuser to add CORS headers
    if (req.nextUrl.pathname === "/api/fetchuser") {
      const response = NextResponse.next();
      response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
      response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");
      return response;
    }

    return NextResponse.next();
  }

  console.log("Protected route, applying auth");
  auth().protect();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
