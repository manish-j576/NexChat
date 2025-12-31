import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const session =await getServerSession()
    if(!session?.user){
        return NextResponse.json({
            message : "User not authenticated",
            status : 403
        })
    }
    return NextResponse.json({
        messege : "this is a protected api route"
    })
}