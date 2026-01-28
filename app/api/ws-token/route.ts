// app/api/ws-token/route.ts
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { SignJWT } from "jose";
import { authOptions } from "@/lib/auth";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

   const token = await new SignJWT({
    id: session.user.id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(new TextEncoder().encode(process.env.NEXTAUTH_SECRET!));

  return Response.json({ token });}
