import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { userSchema } from "@/lib/validators";
import { validateImageFile } from "@/lib/fileValidator";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try{
        const formData = await req.formData();
        const avatar = formData.get("avatar") as File;
        const body = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.log("0")
        //validation using zod 
        const validatedData = userSchema.parse(body)
        console.log(validatedData);
        const email = validatedData.email
        const username = validatedData.username
        const password = validatedData.password
        //return if avatar is not send

        console.log("1")
        if (!avatar) {
            return NextResponse.json({ error: "Avatar required" }, { status: 400 });
        }
        
        console.log("2")
        //vadatingImageFile
        validateImageFile(avatar);
        
        console.log("3")
        // Convert File → Buffer
        const bytes = await avatar.arrayBuffer();
        const buffer = Buffer.from(bytes);
        console.log("4")
        
        // Upload to Cloudinary
        const uploadResult = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader
                .upload_stream({ folder: "avatars" }, (error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    })
                    .end(buffer);
                });
                
                const avatarUrl = uploadResult.secure_url
                console.log(avatarUrl)
                console.log("5")
                
                // console.log(prisma)
                // Save ONLY the URL in DB
                // await User.create({ username, avatar: avatarUrl })
              const response = await prisma.user.findFirst({
                where: { email },
              });

              console.log(response);
        return NextResponse.json({
            message: "User registered",
        });

        }catch(error){
            console.error(error)
            console.log("error occured");
            return NextResponse.json({
                message : "error occured at sigin endpoint"
            })
            
        }
}
