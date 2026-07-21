// proxy.ts - root - SYLVOR VAULT IG-STYLE + ENVATO INFRASTRUCTURE - VERCEL FIX
import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const ua = req.headers.get("user-agent") || "";
  const headers = req.headers;

  const isDoc = !path.startsWith("/api") && !path.startsWith("/_next") && !path.includes(".") && path !== "/favicon.ico";

  // FIX: Jangan cuma cek sec-fetch-mode, cek kombo
  const hasSecFetch = headers.get("sec-fetch-mode");
  const hasSecChUa = headers.get("sec-ch-ua");
  const hasPostmanToken = headers.has("postman-token");
  
  const isPostman =
    ua.includes("PostmanRuntime") ||
    hasPostmanToken ||
    (!hasSecFetch && !hasSecChUa && ua.length < 20); // Postman biasanya UA pendek & gak ada 2 header ini

  const isBotUA = /postman|curl|python|insomnia|httpclient|node-fetch/i.test(ua);

  // 1. BOT / POSTMAN -> BLOCK (IG-STYLE)
  if (isPostman || isBotUA) {
    if (!path.startsWith("/api/vault")) {
      if (isDoc) {
        return new NextResponse(
          `for(;;);{"__ar":1,"error":1357004,"errorSummary":"Please open in browser","errorDescription":"Credential or IP mismatch. Please open https://sylvorlabs.com in a real browser.","payload":null}`,
          {
            status: 200,
            headers: { "Content-Type": "text/javascript", "x-sylvor-guard": "blocked" },
          }
        );
      }
      return NextResponse.json(
        {
          message: "Please open in browser - credential mismatch",
          error: "ip_or_credential_invalid",
          status: "fail",
          __ar: 1,
        },
        { status: 403 }
      );
    }
  }

  // 2. HALAMAN / -> BIARIN LEWAT DULU (INI YANG BIKIN LOCAL LU TADI FOR(;;))
  if (isDoc) {
    return NextResponse.next();
  }

  // 3. ENVATO STYLE - /api/sylvor/infrastructure
  if (path.startsWith("/api/sylvor/infrastructure")) {
    const vault = req.cookies.get("sylvor_vault")?.value;
    if (!vault) {
      return NextResponse.json(
        {
          identity: { available: false, scheduledMaintenance: false, reason: "vault_required" },
          market: { available: false, scheduledMaintenance: false },
          rss: { available: false, scheduledMaintenance: false },
          vault: { available: false, attested: false },
          site: { available: false },
          __ar: 1,
        },
        { status: 403 }
      );
    }
    return NextResponse.next();
  }

  // 4. ENVATO STYLE - pixel-config & collect
  if (path.startsWith("/api/sylvor/pixel-config") || path.startsWith("/api/sylvor/collect")) {
    const sid = req.cookies.get("sylvor_sid")?.value;
    const policy = req.cookies.get("sylvor_policy_ok")?.value;
    if (!sid || !policy) {
      return NextResponse.json(
        {
          status: "blocked",
          error: "pixel_verification_required",
          automatic_advanced_matching_enabled: false,
          __ar: 1,
        },
        { status: 403 }
      );
    }
    return NextResponse.next();
  }

  // 5. API UTAMA
  if (path.startsWith("/api/") && !path.startsWith("/api/vault") && !path.startsWith("/api/sylvor")) {
    const vault = req.cookies.get("sylvor_vault")?.value;
    const sid = req.cookies.get("sylvor_sid")?.value;
    const policy = req.cookies.get("sylvor_policy_ok")?.value;

    if (!vault || !sid || !policy) {
      return NextResponse.json(
        {
          message: "Please complete browser verification",
          error: "vault_required",
          status: "fail",
          __ar: 1,
          required_flow: [
            "/api/vault/init",
            "/api/vault/policy",
            "/api/vault/attest",
            "/api/sylvor/infrastructure",
            "/api/sylvor/pixel-config",
            "/api/sylvor/collect",
          ],
          infrastructure: {
            identity: { available: false },
            market: { available: false },
          }
        },
        { status: 403 }
      );
    }
  }

  const res = NextResponse.next();
  res.headers.set("x-sylvor-guard", "active");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};