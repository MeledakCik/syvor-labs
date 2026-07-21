// app/api/sylvor/infrastructure/route.ts - VERCEL SAFE
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const vault = req.cookies.get("sylvor_vault")?.value;
  const sid = req.cookies.get("sylvor_sid")?.value;
  const policy = req.cookies.get("sylvor_policy_ok")?.value;

  // Kalau bot langsung tembak infrastructure tanpa vault
  if (!vault) {
    return NextResponse.json(
      {
        identity: { available: false, scheduledMaintenance: false, reason: "vault_required" },
        market: { available: false, scheduledMaintenance: false, version: "0" },
        rss: { available: false, scheduledMaintenance: false },
        vault: { available: false, attested: false },
        site: { available: false, mode: "maintenance" },
        __ar: 1,
      },
      { status: 403 }
    );
  }

  // Kalau vault ada tapi sid/policy belum lengkap -> available tapi attested false (kayak Envato)
  const isFullyAttested = !!(sid && policy);

  return NextResponse.json(
    {
      identity: { available: true, scheduledMaintenance: false, region: "id-jkt-1", attested: isFullyAttested },
      market: { available: true, scheduledMaintenance: false, version: "2.1.0" },
      rss: { available: true, scheduledMaintenance: false },
      vault: { available: true, attested: isFullyAttested },
      site: { available: true, mode: "production", env: process.env.NODE_ENV },
      timestamp: Date.now(),
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "x-sylvor-infra": "ok",
      },
    }
  );
}