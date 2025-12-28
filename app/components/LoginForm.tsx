"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter()
  const [loading , setLoading] = useState(false)
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget);

    const loginResponse = await signIn("credentials", {
      username: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // IMPORTANT
    });
    console.log("login resposne here");
    console.log(loginResponse);
    if (loginResponse?.ok && !loginResponse?.error) {
      console.log("login succeeded");
      setLoading(false)
      router.push("/chats");
    } else {
      console.error("Login failed", loginResponse?.error);
    }

    
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl bold">Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" type="button" onClick={onSwitch}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input name="email" type="email" required />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input name="password" type="password" required />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4">
            {loading ? (
              <>
                <Spinner />
                Loading...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
