import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const vault = req.cookies.get("sylvor_vault")?.value;
  const sid = req.cookies.get("sylvor_sid")?.value;
  const policy = req.cookies.get("sylvor_policy_ok")?.value;

  if (!vault || !sid || !policy) {
    return NextResponse.json(
      { logged_in: false, error: "vault_incomplete", __ar: 1 }, 
      { status: 403 }
    );
  }

  // kalau lolos, baru logged_in true
  return NextResponse.json({ 
    logged_in: true, 
    app_logged_in: true,
    vault: { available: true, attested: true },
    __ar: 1 
  });
}