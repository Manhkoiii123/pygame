import { match } from "assert";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const testPathRegex = /^\/user\/tests\/(\d+)\/home(?:\/|$)/;
  const match = pathname.match(testPathRegex);
  const token = search.split("=")[1];
  let testId;
  if (match) {
    testId = match[1];
  }
  const candicate_access_token = request.cookies.get(
    "candicate_access_token"
  )?.value;
  const access_token = request.cookies.get("access_token")?.value;
  // if (
  //   pathname.startsWith(`/user/tests/${testId}/home`) &&
  //   !candicate_access_token
  // ) {
  //   return NextResponse.redirect(
  //     new URL(`/user/tests/${testId}?token=${token}`, request.url)
  //   );
  // }
  if (
    pathname.startsWith(`/user/tests/${testId}/token=`) &&
    candicate_access_token
  ) {
    return NextResponse.redirect(
      new URL(`/user/tests/${testId}/home`, request.url)
    );
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
  matcher: [`/user/tests/:path*`, "/tests/:path*", "/login"],
};
