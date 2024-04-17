import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const testPathRegex = /^\/user\/tests\/(\d+)\/home(?:\/|$)/;
  const match = pathname.match(testPathRegex);
  let testId;
  if (match) {
    testId = match[1];
  }
  const email = request.cookies.get("email")?.value;
  const access_token = request.cookies.get("access_token")?.value;
  if (pathname.startsWith(`/user/tests/${testId}/home`) && !email) {
    return NextResponse.redirect(new URL(`/user/tests/${testId}`, request.url));
  }
  if (pathname.startsWith("/tests") && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/login") && access_token) {
    return NextResponse.redirect(new URL("/tests", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [`/user/tests/:path*`, "/tests", "/login"],
};
