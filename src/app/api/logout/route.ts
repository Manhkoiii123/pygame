import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookie = cookies();
  const sessionToken = cookie.get("access_token");
  if (!sessionToken) {
    return Response.json({ message: "Không nhận được token" }, { status: 401 });
  }
  try {
    return Response.json(
      {},
      {
        status: 200,
        headers: {
          "Set-cookie": `access_token=; Path=/;HttpOnly;Max-Age=0`,
        },
      }
    );
  } catch (error) {
    return Response.json({ error, message: "Co loi xay ra" }, { status: 500 });
  }
}
