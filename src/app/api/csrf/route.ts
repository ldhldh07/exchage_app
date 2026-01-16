import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const csrfToken = crypto.randomUUID();
  const response = NextResponse.json({ csrfToken });

  response.cookies.set("csrfToken", csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 30, // 30분
    path: "/",
  });

  return response;
}
