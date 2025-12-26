"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Email</Label>
              <Input type="email" required />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" required />
            </div>

            <Button className="w-full">Sign Up</Button>
          </div>

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
