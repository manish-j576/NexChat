import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export default async function POST() {
  try {
    const response = await prisma.user.create({
      data: {
        username: "manishjosh",
        email: "manishjoshi705572@mail.com",
        password: "qweqwe",
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
