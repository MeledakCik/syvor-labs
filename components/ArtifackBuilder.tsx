"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const Icons = {
  waf: "🛡️",
  owasp: "🐞",
  auth: "🔑",
  api: "🔌",
  pentest: "🎯",
  soc2: "📜",
  threat: "👁️",
  deps: "📦",
  swap: "🔄",
  sast: "🧬",
} as const;

// Koordinat menggunakan persentase responsif yang dioptimalkan untuk Desktop & Mobile
const modules = [
  {
    id: "waf",
    title: "WAF",
    full: "WAF & Hardening",
    x: { desktop: 12, mobile: 18 },
    y: { desktop: 18, mobile: 15 },
    desc: "Layer 7, rate limit & bot filter",
    icon: Icons.waf,
    links: ["owasp", "api", "swap", "pentest"],
  },
  {
    id: "owasp",
    title: "OWASP",
    full: "OWASP Top 10",
    x: { desktop: 28, mobile: 50 },
    y: { desktop: 12, mobile: 10 },
    desc: "Injection, XSS, SSRF",
    icon: Icons.owasp,
    links: ["auth", "sast", "waf"],
  },
  {
    id: "auth",
    title: "AUTH",
    full: "Auth Hardening",
    x: { desktop: 52, mobile: 82 },
    y: { desktop: 15, mobile: 22 },
    desc: "JWT, 2FA, session lock",
    icon: Icons.auth,
    links: ["api", "swap", "owasp"],
  },
  {
    id: "api",
    title: "API SEC",
    full: "API Security",
    x: { desktop: 80, mobile: 85 },
    y: { desktop: 16, mobile: 42 },
    desc: "Schema & scope check",
    icon: Icons.api,
    links: ["swap", "threat", "auth", "waf"],
  },
  {
    id: "pentest",
    title: "PENTEST",
    full: "Pentest Report",
    x: { desktop: 15, mobile: 15 },
    y: { desktop: 50, mobile: 38 },
    desc: "Real exploit path",
    icon: Icons.pentest,
    links: ["threat", "owasp", "sast", "soc2"],
  },
  {
    id: "sast",
    title: "SAST",
    full: "SAST Scan",
    x: { desktop: 34, mobile: 35 },
    y: { desktop: 40, mobile: 28 },
    desc: "Static code analysis",
    icon: Icons.sast,
    links: ["deps", "owasp", "pentest", "swap"],
  },
  {
    id: "swap",
    title: "SWAP",
    full: "Secure Swap",
    x: { desktop: 68, mobile: 65 },
    y: { desktop: 35, mobile: 32 },
    desc: "Safe token swap logic",
    icon: Icons.swap,
    links: ["api", "auth", "sast", "threat"],
  },
  {
    id: "soc2",
    title: "SOC2",
    full: "SOC2 Ready",
    x: { desktop: 48, mobile: 50 },
    y: { desktop: 75, mobile: 85 },
    desc: "Audit trail & logs",
    icon: Icons.soc2,
    links: ["deps", "threat", "pentest"],
  },
  {
    id: "threat",
    title: "THREAT",
    full: "Threat Model",
    x: { desktop: 88, mobile: 80 },
    y: { desktop: 55, mobile: 65 },
    desc: "STRIDE modeling",
    icon: Icons.threat,
    links: ["soc2", "api", "swap"],
  },
  {
    id: "deps",
    title: "DEPS",
    full: "Dependency Audit",
    x: { desktop: 70, mobile: 22 },
    y: { desktop: 82, mobile: 78 },
    desc: "SBOM & CVE",
    icon: Icons.deps,
    links: ["soc2", "sast"],
  },
];

function WebCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let w = (c.width = c.offsetWidth * 2);
    let h = (c.height = c.offsetHeight * 2);
    const dots = Array.from({ length: 75 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x,
            dy = dots[i].y - dots[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(128,128,128,${0.1 * (1 - d / 150)})`;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      dots.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      w = c.width = c.offsetWidth * 2;
      h = c.height = c.offsetHeight * 2;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-40 pointer-events-none" />
  );
}

export default function ArtifackBuilder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const cRef = useRef<HTMLDivElement>(null);
  const netRef = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<typeof modules[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const sec = sectionRef.current,
      b = bRef.current,
      c = cRef.current,
      n = netRef.current;
    if (!sec || !b || !c || !n) return;
    
    gsap.set(b, { left: "50%", top: "40%", xPercent: -50, yPercent: -50 });
    gsap.set(c, { left: "50%", top: "60%", xPercent: -50, yPercent: -50 });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: "+=2500",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      },
    });

    if (window.innerWidth < 768) {
      // Posisi layout mobile saat scroll aktif
      tl.to(b, { left: "5%", top: "4%", xPercent: 0, yPercent: 0, scale: 0.38, ease: "power4.out" }, 0)
        .to(c, { left: "auto", right: "5%", top: "4%", xPercent: 0, yPercent: 0, scale: 0.38, ease: "power4.out" }, 0);
    } else {
      // Posisi layout desktop saat scroll aktif
      tl.to(b, { left: "2%", top: "6%", xPercent: 0, yPercent: 0, scale: 0.45, ease: "power4.out" }, 0)
        .to(c, { left: "auto", right: "2%", top: "auto", bottom: "6%", xPercent: 0, yPercent: 0, scale: 0.45, ease: "power4.out" }, 0);
    }

    tl.to(n, { opacity: 1, duration: 0.8 }, 0.3)
      .fromTo(
        ".node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: { amount: 0.5, from: "center" },
          ease: "back.out(2)",
        },
        0.4,
      );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={sectionRef}
      id="builder"
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-[#FDFCF8] text-zinc-900 dark:bg-[#050507] dark:text-white select-none"
    >
      <WebCanvas />
      <div className="relative h-full w-full mt-6">
        <div
          ref={bRef}
          className="absolute z-10 font-semibold text-3xl sm:text-5xl md:text-6xl leading-none tracking-tight whitespace-nowrap"
        >
          Builder
        </div>
        <div
          ref={cRef}
          className="absolute z-10 whitespace-nowrap font-semibold text-3xl sm:text-5xl md:text-6xl leading-none tracking-tight"
        >
          Cyber Security
        </div>

        <div ref={netRef} className="absolute inset-0 opacity-0">
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            {modules.map((m) =>
              m.links.map((lid) => {
                const target = modules.find((x) => x.id === lid);
                if (!target) return null;
                const mX = isMobile ? m.x.mobile : m.x.desktop;
                const mY = isMobile ? m.y.mobile : m.y.desktop;
                const tX = isMobile ? target.x.mobile : target.x.desktop;
                const tY = isMobile ? target.y.mobile : target.y.desktop;

                // Variasi lengkungan jaring laba-laba acak
                const randomOffset = (parseInt(m.id, 36) + parseInt(lid, 36)) % 2 === 0 ? 15 : -15;
                const mx = (mX + tX) / 2 + randomOffset;
                const my = (mY + tY) / 2 + randomOffset;

                return (
                  <path
                    key={`${m.id}-${lid}`}
                    d={`M ${mX}% ${mY}% Q ${mx}% ${my}% ${tX}% ${tY}%`}
                    className="fill-none stroke-black/20 dark:stroke-white/20 transition-all duration-300"
                    strokeWidth={1.2}
                    strokeDasharray="3 3"
                  />
                );
              }),
            )}
            
            {modules.map((m) => {
              const mX = isMobile ? m.x.mobile : m.x.desktop;
              const mY = isMobile ? m.y.mobile : m.y.desktop;
              return (
                <line
                  key={`core-${m.id}`}
                  x1="50%"
                  y1="50%"
                  x2={`${mX}%`}
                  y2={`${mY}%`}
                  className="stroke-black/15 dark:stroke-white/15"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
              );
            })}
          </svg>

          {modules.map((m) => {
            const posX = isMobile ? m.x.mobile : m.x.desktop;
            const posY = isMobile ? m.y.mobile : m.y.desktop;
            return (
              <div
                key={m.id}
                className="node absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${posX}%`, top: `${posY}%` }}
              >
                <div
                  onClick={() => setSel(m.id)}
                  onMouseEnter={() => setHoveredNode(m)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="group flex h-12 w-12 sm:h-14 sm:w-14 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl border border-black/15 bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-125 hover:bg-black hover:text-white dark:border-white/20 dark:bg-white/10 dark:hover:bg-white dark:hover:text-black"
                >
                  <span className="text-xs sm:text-sm leading-none">{m.icon}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest">
                    {m.title}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 sm:h-20 sm:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-black text-[10px] sm:text-xs font-bold tracking-widest text-white shadow-xl dark:bg-white dark:text-black">
            SYLVOR
          </div>
        </div>

        {/* Readme Tooltip saat Hover Kursor (Desktop/Mobile support) */}
        {hoveredNode && (
          <div
            className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 w-56 sm:w-64 rounded-xl border border-black/10 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-[#111113]/95 animate-in fade-in zoom-in-95 duration-150"
            style={{ left: mousePos.x, top: mousePos.y }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{hoveredNode.icon}</span>
              <span className="text-xs font-bold tracking-wider text-zinc-900 dark:text-white">
                {hoveredNode.full}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {hoveredNode.desc}
            </p>
            <div className="mt-2 text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
              [Linked: {hoveredNode.links.join(", ").toUpperCase()}]
            </div>
          </div>
        )}

        {/* Modal Pop-up Klik Detail */}
        {sel && (
          <div className="absolute bottom-8 left-1/2 z-30 w-[92%] max-w-sm -translate-x-1/2 rounded-2xl border bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#111113]">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-sm dark:bg-white/10">
                {modules.find((x) => x.id === sel)?.icon}
              </div>
              <div className="text-sm font-semibold dark:text-white">
                {modules.find((x) => x.id === sel)?.full}
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-white/50">
              {modules.find((x) => x.id === sel)?.desc}
            </p>
            <button
              onClick={() => setSel(null)}
              className="mt-3 w-full rounded-full bg-black py-2 text-xs text-white dark:bg-white dark:text-black"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </section>
  );
}