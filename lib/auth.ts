import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
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
      async authorize(credentials, req) {
        // This is where you would query your database to check if the user exists and is active.
        const foundUser = await prisma.user.findFirst({
          where: {
            email: credentials?.username,
          },
        });
        if (foundUser == null) {
          return null;
        }
        const isMatch = await bcrypt.compare(
          credentials?.password as string,
          foundUser?.password as string
        );

        if (isMatch) {
          return {
            id: foundUser?.id.toString(),
            email: foundUser?.email,
            name: foundUser?.username,
            image: foundUser?.avatarUrl,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findFirst({
          where: { email: user.email! ?? "" },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              username: user.name ?? "user",
              email: user.email!,
              avatarUrl: user.image ?? "",
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: user.email },
        });

        if (dbUser) {
          console.log("id = user  id is below");

          token.id = dbUser.id.toString();
          token.image = dbUser.avatarUrl;
          token.role = "ADDMINSS"
          console.log(token);
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("this is insde session callback");
      console.log(session);
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
        session.user.role = token.role as string;
        console.log("here is the session information");
        console.log(session);
      }

      console.log("session is above");
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
