// lib/serviceToken.ts
import jwt from "jsonwebtoken";

export function createServiceToken() {
  return jwt.sign(
    {
      sub: "internal-api",
      role: "service",
    },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: "5m" },
  );
}
