import { authOptions } from "@/lib/auth";
import { getWsClient } from "@/lib/wsClient";
import { SignJWT } from "jose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req:NextRequest) {
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
    
    
}