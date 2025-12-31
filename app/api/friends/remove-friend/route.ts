import { stat } from "fs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(request:NextRequest) {
    
    // const session = await getServerSession()
    // if(!session?.user){
    //     return NextResponse.json({
    //         message : "Unauthenticated user",
    //         status : 403
    //     })
    // }
    const body = await request.json()
    return NextResponse.json({
        message : "this is form the /remove-Friend",
        status : 200,
        body
    })
    
}