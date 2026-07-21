"use client";

import { useEffect, useRef, useState } from "react";
import {
  CodeXmlIcon,
  LayoutTemplateIcon,
  LockIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from "./Icons";

const services = [
  {
    title: "Website Development",
    desc: "Custom, high-performance websites built with modern stack. Fast, SEO-ready, and scalable.",
    icon: CodeXmlIcon,
    points: ["Next.js / React", "Headless CMS", "Performance 95+"],
  },
  {
    title: "Premium Templates",
    desc: "Production-grade templates crafted for conversion. Apple-level polish, ready to launch.",
    icon: LayoutTemplateIcon,
    points: ["Figma to Code", "Design System", "Lifetime Updates"],
  },
  {
    title: "Web Security Pentest",
    desc: "Comprehensive penetration testing to find vulnerabilities before attackers do.",
    icon: ShieldCheckIcon,
    points: ["OWASP Top 10", "Detailed Report", "Remediation Guide"],
  },
  {
    title: "Web App Security",
    desc: "End-to-end hardening for your web applications, APIs, and infrastructure.",
    icon: LockIcon,
    points: ["WAF Setup", "Auth Hardening", "API Security"],
  },
  {
    title: "Maintenance & SLA",
    desc: "Proactive monitoring, updates, and 24/7 support to keep you online.",
    icon: WrenchIcon,
    points: ["Uptime 99.9%", "Daily Backups", "Priority Support"],
  },
];

function BorderCard({
  children,
  delay = 0,
  visible,
}: {
  children: React.ReactNode;
  delay?: number;
  visible: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative rounded-[10px] p-2 transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        background:
          "radial-gradient(400px circle at var(--mx) var(--my), rgba(255,255,255,0.15), transparent 40%)",
      }}
    >
      {/* Border default */}
      <div className="pointer-events-none absolute inset-0 rounded-[15px] border border-zinc-200 dark:border-white/10" />

      {/* Spotlight - cuma nyala di border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[15px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={
          {
            background:
              "radial-gradient(250px circle at var(--mx) var(--my), rgba(255,255,255,0.9), transparent 40%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          } as React.CSSProperties
        }
      />

      {/* Inner - rounded 15 biar gak dempet sama border 16 */}
      <div className="relative rounded-[15px] bg-white p-6 transition-all duration-300 group-hover:-translate-y-[1px] dark:bg-[#121214] md:p-7">
        {children}
      </div>
    </div>
  );
}

export default function Services() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-[#FCFCFC] py-20 dark:bg-[#050507] md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 text-sm tracking-[0.18em] text-zinc-500">
              SERVICES — 05 CAPABILITIES
            </div>
            <h2 className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-">
              Secure by design,
              <br />
              built for scale.
            </h2>
          </div>
          <p className="max-w-full text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Every project is approached as a product. We combine design
            precision with enterprise-grade security.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <BorderCard key={s.title} visible={visible} delay={i * 90}>
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 transition-transform group-hover:scale-110 group-hover:rotate-3 dark:border-white/10 dark:bg-white/[0.06]">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-zinc-500 dark:text-zinc-400">
                {s.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.points.map((p) => (
                  <span
                    key={p}
                    className="pointer-events-none rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </BorderCard>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.slice(3).map((s, i) => (
            <BorderCard key={s.title} visible={visible} delay={(i + 3) * 90}>
              <div className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 transition-transform group-hover:scale-110 dark:border-white/10 dark:bg-white/[0.06]">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-zinc-500 dark:text-zinc-400">
                    {s.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.points.map((p) => (
                      <span
                        key={p}
                        className="pointer-events-none rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BorderCard>
          ))}
        </div>
      </div>
    </section>
  );
}
