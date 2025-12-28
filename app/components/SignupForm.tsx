"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading , setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget);
    console.log("name :",formData.get("username"))
    console.log("email :",formData.get("email"))
    console.log("password :",formData.get("password"))
    console.log("confirm password:",formData.get("confirmPassword"))
    console.log("avatar:",formData.get("avatar"))

    const response = await axios.post('/api/signup',formData)
    console.log(response)
    if (response.status === 200) {
      const loginResponse = await signIn("credentials", {
        username: formData.get("email"),
        password: formData.get("password"),
        redirect: false, // IMPORTANT
      });
      console.log("login resposne here")
      console.log(loginResponse)
      if (loginResponse?.ok && !loginResponse?.error) {
        console.log("login succeeded")
        router.push("/chats");
      } else {
        console.error("Login failed", loginResponse?.error);
      }
    }

    console.log("ll")
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl bold">Create an account</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 ">
            <div className="mb-2">
              <Label className="mb-2">Name</Label>
              <Input
                name="username"
                type="string"
                placeholder="Enter name"
                required
              />
            </div>

            <div className="mb-2">
              <Label className="mb-2">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <Label className="mb-2">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff size={18}></EyeOff>
                ) : (
                  <Eye size={18}></Eye>
                )}
              </button>
            </div>
          </div>
          <div>
            <Label className="mb-2"> Confirm Password</Label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18}></EyeOff>
                ) : (
                  <Eye size={18}></Eye>
                )}
              </button>
            </div>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
          )}
          <div className="mt-2">
            <Label className="mb-2"> Upload Profile Picture</Label>
            <Input type="file" name="avatar" accept="image/*" required />
          </div>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={password !== confirmPassword}
          >
            {loading ? (
              <>
                <Spinner />
                Loading...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <Button
            type="button"
            variant="link"
            className="mt-2"
            onClick={onSwitch}
          >
            Already have an account?
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
