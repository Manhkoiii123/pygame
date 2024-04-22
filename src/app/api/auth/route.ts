export async function POST(request: Request) {
  const res = await request.json();
  const access_token = res.access_token as string;
  if (!access_token) {
    return Response.json(
      { message: "Không nhận được access token" },
      { status: 400 }
    );
  }
  //set cookie
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-cookie": `candicate_access_token=${access_token}; Path=/;HttpOnly;SameSite=Lax;Secure`,
    },
  });
}
