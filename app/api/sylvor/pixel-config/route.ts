import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const sid = req.cookies.get("sylvor_sid")?.value;
  if (!sid) return NextResponse.json({ automatic_advanced_matching_enabled: false }, { status: 403 });
  return NextResponse.json({ automatic_advanced_matching_enabled: true, app_env: "production", app_name: "sylvor_labs", vault_id: sid.slice(0,8) });
}