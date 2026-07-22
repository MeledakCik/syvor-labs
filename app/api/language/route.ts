// app/api/language/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const vault = req.cookies.get("sylvor_policy_ok")?.value;
  if (!vault) return NextResponse.json({ error: "policy_required" }, { status: 403 });

  const acceptLang = req.headers.get("accept-language") || "en-US,en;q=0.9";
  const languages = acceptLang.split(",").map(l => l.split(";")[0].trim());
  if (languages.length < 2) {
    return NextResponse.json({ error: "suspicious_language", is_bot: true }, { status: 403 });
  }

  return NextResponse.json({
    primary: languages[0],
    all: languages,
    detected: languages[0].startsWith("id")? "id" : "en",
    is_real_browser: true,
  });
}