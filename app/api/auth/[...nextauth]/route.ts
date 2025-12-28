import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { email } from "zod";
import bcrypt from "bcrypt";
//localhost:3000/api/auth/signin?callbackUrl=/
 const handler = NextAuth({
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
     CredentialsProvider({
       name: "Credentials",
       // `credentials` is used to generate a form on the sign in page.
       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
       // e.g. domain, username, password, 2FA token, etc.
       // You can pass any HTML attribute to the <input> tag through the object.
       credentials: {
         username: { label: "Username", type: "text", placeholder: "jsmith" },
         password: { label: "Password", type: "password" },
       },
       //@ts-ignore
       async authorize(credentials, req) {

         console.log("inside next auth");
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
         
        // if(user){
        //   return user 
        // }else{
        //   return null
        // }
         // This is where you would query your database to check if the user exists and is active.
         const foundUser = await prisma.user.findFirst({
           where: {
             email: credentials?.username,
           },
         });

         const isMatch = await bcrypt.compare(
           credentials?.password as string,
           foundUser?.password as string
         );
         console.log("isMatch :" + isMatch);
         if (isMatch) {
           return {
             id: foundUser?.id.toString(),
             email: foundUser?.email,
             name: foundUser?.username,
           };
         } else {
           // If you return null then an error will be displayed advising the user to check their details.
           return null;

           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
         }
       },
     }),
     GithubProvider({
       clientId: "",
       clientSecret: "",
     }),
   ],
   callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        //@ts-ignore
        session.user.id = token.id as string;
      }
      return session;
    },
  },
   pages: {
     signIn: "/login",
   },
 });

export { handler as GET, handler as POST }

