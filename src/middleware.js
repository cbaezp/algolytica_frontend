import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/:path*", // Match all routes
};

export function middleware(req) {
  console.log("Middleware executed for:", req.nextUrl.pathname);

  const isInMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  console.log("NEXT_PUBLIC_MAINTENANCE_MODE:", process.env.NEXT_PUBLIC_MAINTENANCE_MODE);
  console.log("Is Maintenance Mode:", isInMaintenanceMode);

  if (isInMaintenanceMode) {
    req.nextUrl.pathname = "/maintenance"; // Redirect to maintenance page
    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
}
