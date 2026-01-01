import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log("this is the search route")
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session?.user) {
      return  NextResponse.json({
        message: "Unauthenticated user",
        status: 403,
      });
    }
    const search = req.nextUrl.searchParams.get("search");
    console.log(search);
    if(!search){
        return NextResponse.json({
            message : "Search parameter not found",
            status : 400
        }) 
    }
    const fetchedUser = await prisma.user.findMany({
        where: {username: search }
    })
    console.log("fetched user")
    console.log(fetchedUser)
    if(fetchedUser == null){
        return new Response("User not found", {status: 404})
    }
    return NextResponse.json({
        message : "this is form the /search",
        status : 200,
        body : fetchedUser
    })
}