"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "./Icons";

const plans = [
  {
    name: "Essential",
    price: "$2.4k",
    note: "/ project",
    desc: "For founders launching fast with premium quality.",
    features: [
      "Premium Website (up to 8 pages)",
      "Basic SEO & Analytics",
      "Security Hardening L1",
      "2 weeks delivery",
      "30 days support",
    ],
    cta: "Start Essential",
    popular: false,
  },
  {
    name: "Growth",
    price: "$6.8k",
    note: "/ project",
    desc: "For scaling teams needing web app + security.",
    features: [
      "Everything in Essential",
      "Web App / Dashboard",
      "Premium Template System",
      "Pentest Report (OWASP)",
      "API Security + WAF",
      "90 days support",
    ],
    cta: "Start Growth",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "",
    desc: "For enterprises with compliance & SLA needs.",
    features: [
      "Full-stack Development",
      "Advanced Pentest & Audit",
      "SOC2 / ISO readiness",
      "24/7 Monitoring & SLA",
      "Dedicated Security Engineer",
      "On-premise option",
    ],
    cta: "Talk to us",
    popular: false,
  },
];

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="pricing"
      className="w-full bg-[#FCFCFC] py-20 dark:bg-[#050507] md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text- tracking-wide text-zinc-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400">
            PRICING • TRANSPARENT
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Simple pricing, no surprises.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-">
            Choose a plan that fits your stage. All plans include security best
            practices and performance optimization.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-700 md:p-8 ${
                p.popular
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] hover:-translate-y-1 dark:border-white/20 dark:bg-[#121214]"
                  : "border-zinc-200 bg-white hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#111113]"
              } ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              } ${p.popular ? "md:scale-[1.05]" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {p.popular && (
                <div className="absolute right-5 top-5 rounded-full bg-white px-2.5 py-1 text- font-medium tracking-wide text-black">
                  MOST POPULAR
                </div>
              )}

              <div className="text-xs font-medium tracking-widest opacity-60">
                {p.name.toUpperCase()}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {p.price}
                </span>
                <span
                  className={`text-sm ${p.popular ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  {p.note}
                </span>
              </div>

              <p
                className={`mt-3 text-[13.5px] leading-relaxed ${p.popular ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"}`}
              >
                {p.desc}
              </p>

              <div className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        p.popular
                          ? "bg-white/10 text-white"
                          : "bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
                      }`}
                    >
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span
                      className={`text- ${p.popular ? "text-zinc-300" : "text-zinc-700 dark:text-zinc-300"}`}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`mt-8 flex h-11 items-center justify-center rounded-full text-sm font-medium transition-all ${
                  p.popular
                    ? "bg-white text-black hover:bg-zinc-100"
                    : "bg-zinc-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
