import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const publicRoutes = ["/login", "/auth/callback", "/privacy", "/safety", "/manifest.webmanifest"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icons") ||
    pathname === "/favicon.ico"
  ) {
    return updateSession(request);
  }

  return updateSession(request, true);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
