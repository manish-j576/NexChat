import NextAuth from "next-auth/next"
import { authOptions } from "@/lib/auth";
//localhost:3000/api/auth/signin?callbackUrl=/
 const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
