import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    type requestBody = {
        userAId : string,
        userBId : string
    }
    
    const body : requestBody = await request.json() 
    const session = await getServerSession()
    if(!session?.user){
        return NextResponse.json({
            message : "Unauthenticated user",
            status : 403
        })
    }

    const response = await prisma.friend.update({
      where: {
        userAId_userBId: {
          userAId: body.userAId , //sended user
          userBId: body.userBId,   //reciever user
        },
      },
      data: {
        status: "accepted",
      },
    });

    return NextResponse.json({
        message : "this is form the /accept-request",
        status : 200,
        body
    })
    
}