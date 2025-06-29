import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isSignIn = req.nextUrl.pathname === "/vi/sign-in";
  const isDashboard = req.nextUrl.pathname === "/vi/dashboard";

  // Redirect to sign-in if not logged in and trying to access protected routes
  if (!isAuth && isDashboard) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/vi/sign-in";
    return NextResponse.redirect(signInUrl);
  }

  // Redirect logged-in users away from /vi/sign-in
  if (isSignIn && isAuth) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = "/vi/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các route cụ thể
export const config = {
  matcher: ["/vi/sign-in", "/vi/dashboard", "/vi/sign-up"],
};
