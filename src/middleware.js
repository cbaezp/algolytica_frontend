import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/:path*", // Match all routes
};

export function middleware(req) {


  const isInMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";


  if (isInMaintenanceMode) {
    req.nextUrl.pathname = "/maintenance"; // Redirect to maintenance page
    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
}
