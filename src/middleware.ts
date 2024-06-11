import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked 'async' if using await inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("Request path:", path);

  const isPublicPath = path === "/" || path === "/login";

  console.log("Is public path:", isPublicPath);

  const token = request.cookies.get("token")?.value || "";

  console.log("Token:", token);

  if (isPublicPath && token) {
    console.log("Redirecting to /home");
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Protected routes
export const config = {
  matcher: ["/profile", "/login", "/home", "/reports"],
};
