import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest){
    
    const username = req.nextUrl.searchParams.get("username")
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return NextResponse.json({
            message : "Unauthenticated user",
            status : 403
        })
    }

    if(!username){
        return NextResponse.json({   
            message : "Username not provided",
            status : 400,
            data : []
        })
    }

    const users = await prisma.user.findMany({
        select : {
            id : true,
            username : true,
            avatarUrl : true
        },
        where : {username}})  

    if(users.length === 0){
        return NextResponse.json({
            message : "No users found",
            status : 404,
            data : []
        })
    }
    return NextResponse.json({  
        message : "User found",
        status : 200,
        data : users
    })
    }