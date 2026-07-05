 import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Quick check if a session cookie exists
  const token = request.cookies.get("sims_session")?.value;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboardPage = pathname.startsWith("/dashboard") || 
                          pathname.match(/^\/(students|teachers|classes|subjects|attendance|grades|transcripts|analytics|settings)/);

  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/students/:path*",
    "/teachers/:path*",
    "/classes/:path*",
    "/subjects/:path*",
    "/attendance/:path*",
    "/grades/:path*",
    "/transcripts/:path*",
    "/analytics/:path*",
    "/settings/:path*",
  ],
};