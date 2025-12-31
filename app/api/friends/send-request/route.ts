import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const session  = await getServerSession()

  // if(!session?.user){
  //     return NextResponse.json({
  //         message : "Unauthenticated Request",
  //         status : 403
  //     })
  // }
  const body = await req.json();

  // add the send request functionality to the user
  return NextResponse.json({
    message: "Response form the /send-request",
    status: 200,
    body,
  });
}