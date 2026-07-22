"use client";

import { useEffect, useRef, useState } from "react";
import SylvorIcon from "./SylvorIcon";

const traits = [
  { title: "Senior only", desc: "No juniors on your project" },
  { title: "Security first", desc: "OWASP & best practices baked in" },
  { title: "Product mindset", desc: "We think like owners" },
];

const principles = [
  {
    title: "01 — Precision over volume",
    desc: "We take 3 projects at a time, max. Focus is our unfair advantage.",
  },
  {
    title: "02 — Security is non-negotiable",
    desc: "Every project gets threat modeling, dependency audit, and hardening checklist.",
  },
  {
    title: "03 — No lock-in",
    desc: "Clean code, documented, yours. Deploy anywhere.",
  },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="w-full border-y border-zinc-200 bg-white py-20 dark:border-white/10 dark:bg-[#050507] md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-8">
        <div
          className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <div className="mb-4 text- font-medium tracking-[0.18em] text-zinc-500">
            ABOUT — PT SYLVOR LABS
          </div>
          <h2 className="text-3xl font-semibold leading-[0.95] tracking-tight md:text-">
            A small lab with
            <br />
            senior-grade execution.
          </h2>

          <div className="mt-8 space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 md:text-">
            <p>
              Founded in Jakarta, SYLVOR LABS was built to bridge the gap
              between beautiful product design and rigorous security
              engineering. We don&apos;t do generic — every line of code is
              reviewed, every interaction is intentional.
            </p>
            <p>
              Our team previously built products for fintech, healthcare, and
              logistics companies across SEA. We bring that experience to every
              engagement: performance budgets, threat modeling, and design
              systems that scale.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8 dark:border-white/10">
            {traits.map((t, i) => (
              <div
                key={t.title}
                className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="text-sm font-semibold">{t.title}</div>
                <div className="mt-1 text-xs leading-snug text-zinc-500">
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-2xl border border-zinc-200 bg-zinc-50 p-2 transition-all duration-700 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900/50 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="rounded-xl bg-white p-6 dark:bg-[#121214] md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 dark:bg-white">
                <SylvorIcon size={20} rounded="9999px" />
              </div>
              <div>
                <div className="text-sm font-semibold">Manifesto</div>
                <div className="text-xs text-zinc-500">How we work</div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className={`flex gap-4 transition-all duration-700 ${visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <div className="w-px shrink-0 self-stretch bg-zinc-200 dark:bg-white/10" />
                  <div>
                    <div className="text- font-medium">{p.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-zinc-500">
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              </div>
              <div className="text-xs">
                <span className="font-medium">
                  Lab capacity: 2 slots left for Q4
                </span>
                <span className="ml-1 text-zinc-500">— apply early</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
