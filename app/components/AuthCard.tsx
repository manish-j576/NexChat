// app/login/AuthCard.tsx
"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthCard() {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="relative w-full max-w-sm perspective">
      <div
  className="relative transition-transform duration-500 transform-style-preserve-3d"
  style={{ transform: `rotateY(${rotation}deg)` }}
>
        {/* Front (Login) */}
        <div className="backface-hidden">
          <LoginForm onSwitch={() => setRotation((r) => r - 180)} />
        </div>

        {/* Back (Signup) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <SignupForm onSwitch={() => setRotation((r) => r + 180)} />
        </div>
      </div>
    </div>
  );
}
