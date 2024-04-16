export async function POST(request: Request) {
  const res = await request.json();
  const email = res.email as string;
  if (!email) {
    return Response.json({ message: "Không nhận được email" }, { status: 400 });
  }
  //set cookie
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-cookie": `email=${email}; Path=/;HttpOnly;SameSite=Lax;Secure`,
    },
  });
}
