// app/api/help-api/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { emitToUser } from "../../../ws-backend/src/index.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const {fromUserId , toUserId } = await req.json();

//   // 1. Save in DB
//   const request = await prisma.friend.create({
//     data: {
//       userAId: session.user.id,
//       userBId: toUserId,
//       status: "PENDING",
//       requestedBy: session.user.id,
//     },
//   });

  // 2. Emit WS event to User B
  emitToUser(toUserId, {
    type: "FRIEND_REQUEST",
    payload: {
      id: toUserId,
      fromUserId: fromUserId,
    },
  });

  return NextResponse.json({ success: true });
}
