// app/api/site/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // VALIDASI VAULT COOKIES
  const vault = req.cookies.get("sylvor_vault")?.value;
  const sid = req.cookies.get("sylvor_sid")?.value;
  if (!vault ||!sid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // VALIDASI SITE TOKEN
  const siteToken = req.headers.get("x-site-token") || req.nextUrl.searchParams.get("site_token");
  if (siteToken!== process.env.NEXT_PUBLIC_SITE_KEY && siteToken!== process.env.SITE_TOKEN) {
    return NextResponse.json({ error: "Invalid site token" }, { status: 403 });
  }

  // VALIDASI BROWSER LANGUAGE
  const lang = req.headers.get("accept-language") || "en";
  const fp = req.headers.get("x-fp-hash");

  return NextResponse.json({
    site: "sylvor_labs",
    status: "active",
    vault_ok: true,
    fp: fp?.slice(0, 10) + "...",
    lang_detected: lang.split(",")[0],
    timestamp: Date.now(),
  });
}