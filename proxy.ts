import { NextRequest, NextResponse } from "next/server";

function genToken() {
  return `sylvor_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function getClientIp(req: NextRequest){
  const fwd = req.headers.get("x-forwarded-for");
  if(fwd) return fwd.split(",")[0].trim(); // FIX VERCEL
  return req.headers.get("x-real-ip") || req.headers.get("x-vercel-forwarded-for") || "local";
}

function getSylvorHeaders(isBlock = false) {
  return {
    "Accept-CH": "Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Arch, Viewport-Width, Width, DPR",
    "Accept-CH-Lifetime": "86400",
    "Critical-CH": "Sec-CH-UA, Sec-CH-UA-Mobile",
    "Vary": "Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Accept-Encoding",

    // FIX VERCEL: harus no-store biar gak ke-cache edge
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",

    "Content-Security-Policy": "base-uri 'self'; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.sylvorlabs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.sylvorlabs.com wss://*.sylvorlabs.com ws://localhost:* wss://localhost:*; media-src 'self' blob:; object-src 'none'; frame-ancestors 'none'; form-action 'self';",

    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-site",
    "Cross-Origin-Embedder-Policy": "credentialless",
    "Origin-Agent-Cluster": "?1",
    "Referrer-Policy": "same-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "X-XSS-Protection": "0",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Permissions-Policy": "camera=(self), microphone=(), geolocation=(self), fullscreen=(self), payment=(), usb=(), magnetometer=(), gyroscope=()",

    "Content-Type": isBlock? "text/javascript; charset=utf-8" : "text/html; charset=utf-8",
    "x-sylvor-version": "2.1-secure",
    "x-security-policy": "enforced",
    "x-sylvor-guard": isBlock? "blocked" : "active",
    "x-ratelimit-policy": "strict",
  };
}

function forbid() {
  return new NextResponse(`for(;;);{"__ar":1,"error":1357004,"errorSummary":"Please open in browser"}`, {
    status: 200,
    headers: getSylvorHeaders(true),
  });
}

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const ua = req.headers.get("user-agent") || "";
  const secFetchSite = req.headers.get("sec-fetch-site");
  const secFetchMode = req.headers.get("sec-fetch-mode");
  const referer = req.headers.get("referer") || "";
  const fpHeader = req.headers.get("x-fp-hash") || "";
  const humanHeader = req.headers.get("x-human-tick") || "";
  const ip = getClientIp(req); // FIX VERCEL

  const isPostman = ua.includes("PostmanRuntime") || req.headers.has("postman-token") || /postman|curl|python|insomnia|httpclient|node-fetch/i.test(ua);
  const isDoc =!path.startsWith("/api") &&!path.startsWith("/_next") &&!path.includes(".") && path!== "/favicon.ico";

  if (isDoc && isPostman) return forbid();

  if (isDoc) {
    const isProd = process.env.NODE_ENV === "production";
    const token = genToken();
    const now = Date.now().toString();
    const res = NextResponse.next();
    res.cookies.set("sylvor_site_token", token, { httpOnly: false, secure: isProd, sameSite: "lax", path: "/", maxAge: 300 });
    res.cookies.set("sylvor_chain", "0", { httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 300 });
    res.cookies.set("sylvor_start", now, { httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 300 });
    res.cookies.set("sylvor_fp", "", { httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 0 });
    res.cookies.set("sylvor_ip", ip, { httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 300 });

    Object.entries(getSylvorHeaders(false)).forEach(([k,v])=> {
      if(k!=="Content-Type") res.headers.set(k,v);
    });
    res.headers.set("x-sylvor-site-token", token);
    return res;
  }

  if (path.startsWith("/api/vault")) {
    const siteToken = req.cookies.get("sylvor_site_token")?.value;
    const start = req.cookies.get("sylvor_start")?.value;
    if (!siteToken) return forbid();
    if (path.includes("/init") && start) {
      const delta = Date.now() - parseInt(start);
      if (delta < 100) return forbid();
    }
    if (path.includes("/init") && humanHeader === "0" && start && Date.now() - parseInt(start) > 6000) {
      return forbid();
    }
    if (secFetchSite!== "same-origin" && secFetchMode!== "cors") {
      // FIX VERCEL: izinin vercel.app
      if (!referer.includes("localhost") &&!referer.includes("sylvorlabs.com") &&!referer.includes("vercel.app")) return forbid();
    }
    if (path.includes("/init") && fpHeader) {
      const res = NextResponse.next();
      const isProd = process.env.NODE_ENV === "production";
      res.cookies.set("sylvor_fp", fpHeader, { httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 600 });
      Object.entries(getSylvorHeaders(false)).forEach(([k,v])=> { if(k!=="Content-Type") res.headers.set(k,v); });
      return res;
    }
    const savedFp = req.cookies.get("sylvor_fp")?.value;
    if (savedFp && fpHeader && savedFp!== fpHeader) return forbid();
    const res = NextResponse.next();
    Object.entries(getSylvorHeaders(false)).forEach(([k,v])=> { if(k!=="Content-Type") res.headers.set(k,v); });
    return res;
  }

  if (path.startsWith("/api/sylvor")) {
    const chain = req.cookies.get("sylvor_chain")?.value;
    const vault = req.cookies.get("sylvor_vault")?.value;
    const savedFp = req.cookies.get("sylvor_fp")?.value;
    const savedIp = req.cookies.get("sylvor_ip")?.value;
    if (!vault ||!chain) return forbid();
    if (savedFp && fpHeader && savedFp!== fpHeader) return forbid();
    if (savedIp && savedIp!== ip && ip!== "local") return forbid();
    const res = NextResponse.next();
    Object.entries(getSylvorHeaders(false)).forEach(([k,v])=> { if(k!=="Content-Type") res.headers.set(k,v); });
    return res;
  }

  if (path.startsWith("/api/") &&!path.startsWith("/api/vault") &&!path.startsWith("/api/sylvor")) {
    const vault = req.cookies.get("sylvor_vault")?.value;
    const sid = req.cookies.get("sylvor_sid")?.value;
    const policy = req.cookies.get("sylvor_policy_ok")?.value;
    const siteToken = req.cookies.get("sylvor_site_token")?.value;
    const chain = req.cookies.get("sylvor_chain")?.value;
    const savedFp = req.cookies.get("sylvor_fp")?.value;
    const savedIp = req.cookies.get("sylvor_ip")?.value;
    const siteHeader = req.headers.get("x-site-token") || req.headers.get("x-sylvor-site-token");
    if (!vault ||!sid ||!policy ||!siteToken || chain!== "f") return forbid();
    if (siteHeader && siteToken!== siteHeader) return forbid();
    if (savedFp && fpHeader && savedFp!== fpHeader) return forbid();
    if (savedIp && savedIp!== ip && ip!== "local") return forbid();
    const res = NextResponse.next();
    Object.entries(getSylvorHeaders(false)).forEach(([k,v])=> { if(k!=="Content-Type") res.headers.set(k,v); });
    return res;
  }

  const res = NextResponse.next();
  Object.entries(getSylvorHeaders(false)).forEach(([k,v])=> { if(k!=="Content-Type") res.headers.set(k,v); });
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};