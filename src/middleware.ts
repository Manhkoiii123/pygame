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
  if (pathname.startsWith(`/user/tests/${testId}/home`) && !email) {
    return NextResponse.redirect(new URL(`/user/tests/${testId}`, request.url));
  }
  //   if (pathname.match(testPathRegex) && !email) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [`/user/tests/:path*`],
};
