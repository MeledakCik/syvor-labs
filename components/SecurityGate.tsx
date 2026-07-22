"use client";
import { useEffect, useState, useRef } from "react";
function getCookie(n: string) {
  return (
    document.cookie
      .split("; ")
      .find((c) => c.trim().startsWith(n + "="))
      ?.split("=")[1] || ""
  );
}

export default function SecurityGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ok, setOk] = useState(false);
  const human = useRef({ mouse: 0, scroll: 0, time: Date.now() });
  const started = useRef(false);

  useEffect(() => {
    const isBot = () => {
      const n: any = navigator;
      if (n.webdriver) return true;
      if (n.plugins.length === 0) return true;
      if (n.languages.length === 0) return true;
      if (!n.hardwareConcurrency) return true;
      if ((window as any).__playwright) return true;
      return false;
    };

    const startChain = async () => {
      if (started.current) return;
      started.current = true;
      if (isBot()) {
        while (true) {
          await new Promise((r) => setTimeout(r, 100));
        }
      }
      const fp = btoa(
        `${screen.width}x${screen.height}_${navigator.language}_${navigator.hardwareConcurrency}`,
      ).slice(0, 32);
      const call = async (url: string) => {
        const token = getCookie("sylvor_site_token");
        const h: any = {
          "x-site-token": token,
          "x-sylvor-site-token": token,
          "x-fp-hash": fp,
          "x-human-tick": human.current.mouse > 2 ? "1" : "0",
        };
        const r = await fetch(url, { headers: h, credentials: "include" });
        const t = await r.text();
        return JSON.parse(t.replace(/^for\(;;\);/, ""));
      };
      try {
        const siteToken = getCookie("sylvor_site_token");
        const vaultCode = btoa(`${siteToken}_${Date.now()}_${fp}`).replace(
          /=/g,
          "",
        );
        await call(`/api/vault/init?code=${vaultCode}`);
        await new Promise((r) => setTimeout(r, 120));
        await call(`/api/vault/policy`);
        await call(`/api/vault/attest?policy=ok`);
        await call(`/api/sylvor/infrastructure`);
        await call(`/api/sylvor/pixel-config`);
        await call(`/api/sylvor/collect?v=2&tid=sylvor_${fp}`);
        await call(`/api/site`);
        setOk(true);
      } catch (e) {
        console.error(e);
        started.current = false;
      }
    };

    const checkHuman = () => {
      if (started.current) return;
      if (human.current.mouse > 2 || Date.now() - human.current.time > 1200) {
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("scroll", onScroll);
        startChain();
      }
    };
    const onMouse = () => {
      human.current.mouse++;
      checkHuman();
    };
    const onScroll = () => {
      human.current.scroll++;
      checkHuman();
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);
    const timer = setTimeout(() => {
      if (!started.current) startChain();
    }, 800);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // FIX PUTIH ANEH -> jangan return div putih, tapi render children dengan opacity 0 + skeleton
  if (!ok) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
        <div
          style={{
            height: "60px",
            background: "#111",
            borderBottom: "1px solid #222",
          }}
        />
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}
        >
          <div
            style={{
              height: "24px",
              width: "200px",
              background: "#1a1a1a",
              borderRadius: "6px",
              marginBottom: "20px",
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            style={{
              height: "400px",
              background: "#111",
              borderRadius: "12px",
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>
        <style>{`@keyframes pulse{0%{opacity:0.6}50%{opacity:1}100%{opacity:0.6}}`}</style>
      </div>
    );
  }
  return <>{children}</>;
}
