// app/api/parameters/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const vault = req.cookies.get("sylvor_vault")?.value;
  if (!vault) return NextResponse.json({ error: "vault_required" }, { status: 403 });

  const acceptLang = req.headers.get("accept-language") || "en-US";
  const browserLang = acceptLang.split(",")[0].split("-")[0]; // id, en, etc

  // DETEKSI LANGUAGE BROWSER ASLI (bot biasanya gak kirim accept-language lengkap)
  const isValidLang = acceptLang.includes("-") || acceptLang.includes("q=");
  if (!isValidLang) {
    return NextResponse.json({ error: "invalid_browser_language" }, { status: 403 });
  }

  return NextResponse.json({
    parameters: {
      language: browserLang,
      timezone: "Asia/Jakarta",
      currency: browserLang === "id"? "IDR" : "USD",
    },
    browser: {
      lang: browserLang,
      accept_language: acceptLang.slice(0, 50),
      vault: "ok",
    }
  });
}