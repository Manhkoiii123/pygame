import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const access_token = res.access_token as string;
  if (!access_token) {
    return Response.json(
      { message: "Không nhận được accessToken" },
      { status: 400 }
    );
  }
  //set cookie
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-cookie": `access_token=${access_token}; Path=/;HttpOnly;SameSite=Lax;Secure`,
    },
  });
}
export async function GET(request: Request) {
  const cookie = request.headers.get("cookie");

  if (!cookie) {
    return Response.json(
      { message: "Không có cookie được gửi" },
      {
        status: 400,
      }
    );
  }

  return Response.json(cookie, {
    status: 200,
  });
}
