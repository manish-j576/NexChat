import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    interface RequestBody {
      userId: string;
      friendId: string;
    }
    console.log("Request body");
    const session = await getServerSession();
    console.log("we dont require userid her eis it from teh get session hook");
    console.log(session);
    if (!session?.user) {
      return NextResponse.json({
        message: "Unauthenticated Request",
        status: 403,
      });
    }
    const body: RequestBody = await req.json();
    console.log(body);

    // DB call to fetch the user and
    // if the user send the request to himself
    if (body.userId === body.friendId) {
      return NextResponse.json({
        message: "You can't send a request to yourself",
        status: 400,
        body,
        session,
      });
    }

    const response = await prisma.friend.create({
      data: {
        userAId: body.userId,  //sended user
        userBId: body.friendId,   //reciever user
        requestedBy: body.userId,
        status: "pending",
      },
    });

    console.log(response);

    return NextResponse.json({
      message: "Friend request sent successfully",
      status: 200,
      body,
      session,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      status: 500,
      body: error,
    });
  }
}