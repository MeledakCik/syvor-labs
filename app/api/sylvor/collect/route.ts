import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const policy = req.cookies.get("sylvor_policy_ok")?.value;
  if (!policy) return NextResponse.json({ status:"blocked" }, { status: 403 });
  return NextResponse.json({ status:"collected", t: Date.now() });
}