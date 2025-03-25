import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if there's a token in the URL query params
  const urlToken = request.nextUrl.searchParams.get("token");

  // If there's a token in the URL, set it in cookies
  if (urlToken) {
    const redirectUrl = new URL(request.nextUrl.pathname, request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Set the token in cookies on the same response
    response.cookies.set("admin_token", urlToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/admin/:path*"],
};
