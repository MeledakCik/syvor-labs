import { NextResponse } from "next/server";

export async function GET() {
  const vaultId = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const sid = Math.random().toString(36).slice(2);
  
  const res = NextResponse.json({ vault: "initialized", sid, t: Date.now() });
  
  const isProd = process.env.NODE_ENV === "production";
  
  res.cookies.set("sylvor_vault", "1", { 
    httpOnly: true, 
    secure: isProd, // true di Vercel, false di localhost
    sameSite: "lax",
    maxAge: 60 * 30, // 30 menit aja biar gak numpuk
    path: "/" 
  });
  res.cookies.set("sylvor_sid", sid, { 
    httpOnly: true, 
    secure: isProd,
    sameSite: "lax",
    maxAge: 60 * 30, 
    path: "/" 
  });
  
  return res;
}