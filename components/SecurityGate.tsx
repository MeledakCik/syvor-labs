// components/SecurityGate.tsx
"use client";
import { useEffect, useState } from "react";

export default function SecurityGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      const nonce =
        Math.random().toString(36).slice(2, 8) + Date.now().toString(36);
      const appId = process.env.NEXT_PUBLIC_APP_ID!;
      const policy = btoa(appId + nonce).slice(0, 16);
      const fp = btoa(
        `${screen.width}x${screen.height}_${navigator.language}`,
      ).slice(0, 24);
      const vaultCode = btoa(`sylvor_${Date.now()}_${fp}`).replace(/=/g, "");

      const headers = {
        "x-sylvor-nonce": nonce,
        "x-sylvor-policy": policy,
        "x-site-token": process.env.NEXT_PUBLIC_SITE_KEY || "",
        "x-fp-hash": fp,
        "Accept-Language": navigator.language + ",en-US;q=0.9,en;q=0.8",
      } as any;

      const call = async (url: string) => {
        const r = await fetch(url, { headers, credentials: "include" });
        if (!r.ok) throw new Error(url + " -> " + r.status);
        return r.json();
      };

      try {
        // FLOW SYLVOR - WAJIB BERURUTAN (kayak Envato)
        // 1. vault
        await call(`/api/vault/init?code=${vaultCode}`);
        await call(`/api/vault/policy`);
        await call(`/api/vault/attest?policy=${policy}`);

        // 2. infrastructure (kayak envato infrastructure_availability.json)
        const infra = await call(`/api/sylvor/infrastructure`);
        if (!infra.market?.available || !infra.identity?.available)
          throw new Error("infra not available");

        // 3. pixel-config + collect (kayak envato pixel-config + gtm collect)
        await call(`/api/sylvor/pixel-config`);
        await call(`/api/sylvor/collect?v=2&tid=sylvor_${fp}`);

        // 4. baru boleh hit data utama
        await Promise.all([
          call(`/api/site`),
          call(`/api/parameters`),
          call(`/api/language`),
        ]);

        console.log("[Sylvor] infra OK", infra);
        setOk(true);
      } catch (e) {
        console.error("[Sylvor] blocked", e);
        // Kalau gagal, biarin blank biar bot gak dapet data
      }
    })();
  }, []);

  if (!ok) {
    // Loading tapi jangan kasih HTML asli - kasih skeleton aja
    return <div style={{ background: "#fff", height: "100vh" }} />;
  }

  return <>{children}</>;
}
