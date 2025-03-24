import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token
  const role = token?.role;

  // Get the pathname from the URL
  const path = request.nextUrl.pathname

  // Admin routes protection
  if (path.startsWith("/admin") && (!isAuthenticated || token?.role !== "admin")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Patient portal protection
  if (path.startsWith("/portal") && (!isAuthenticated || token?.role !== "patient")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the user is authenticated and tries to access login/register
  if (isAuthenticated && (path === "/login" || path === "/register")) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    } else if (token.role === "patient") {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*", "/login", "/register"],
}

