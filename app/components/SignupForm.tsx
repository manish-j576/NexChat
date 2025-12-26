"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl bold">Create an account</CardTitle>
      </CardHeader>

      <CardContent>
        <form>
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          <div className="mt-2" >
              <Label className="mb-2"> Upload Profile Picture</Label>
            <Input type="file" name="avatar" accept="image/*" required />
          </div>
          <Button
            className="w-full mt-4"
            disabled={password !== confirmPassword}
          >
            Sign Up
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
