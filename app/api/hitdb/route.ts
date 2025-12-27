import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export  async function POST() {
  try {
    const response = await prisma.user.create({
      data: {
        username: "manishjosh",
      },
    });
    console.log(response);
    return NextResponse.json({
      message: " dadta inserted successfully",
    });
  } catch (eroror) {
    return NextResponse.json({
      message: "error occured",
    });
  }
}
export  async function GET() {
  return NextResponse.json({
    message : "hello"
  })
  
}