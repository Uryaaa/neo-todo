import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  const isAdminPage = request.nextUrl.pathname.startsWith("/dashboard/admin");
  const isAdminAPI = request.nextUrl.pathname.startsWith("/api/admin");

  // Check authentication for protected routes
  if ((isDashboardPage || isAdminAPI) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check admin access for admin routes
  if ((isAdminPage || isAdminAPI) && token) {
    const userRole = token.role as string;
    const isAdmin = userRole === "ADMIN" || userRole === "SUPERUSER";

    if (!isAdmin) {
      // Redirect to dashboard with error message
      const url = new URL("/dashboard", request.url);
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*", "/login", "/register"],
};
