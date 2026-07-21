import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ policy: "ok", "x-security-policy": "enforced" });
  
  const isProd = process.env.NODE_ENV === "production";
  
  res.cookies.set("sylvor_policy_ok", "1", { 
    httpOnly: true, 
    secure: isProd,
    sameSite: "lax",
    maxAge: 60 * 30, 
    path: "/" 
  });
  
  return res;
}