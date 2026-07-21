"use client";

import { useEffect, useRef, useState } from "react";
import SylvorIcon from "./SylvorIcon";
import { ArrowUpRightIcon } from "./Icons";

const projects = [
  {
    name: "NEXA Bank",
    cat: "Fintech • Web App",
    year: "2024",
    tone: "from-zinc-900 to-zinc-700",
  },
  {
    name: "LUMEN Estate",
    cat: "Real Estate • Website",
    year: "2024",
    tone: "from-stone-800 to-stone-600",
  },
  {
    name: "AERIS SaaS",
    cat: "SaaS • Platform",
    year: "2023",
    tone: "from-neutral-800 to-zinc-600",
  },
  {
    name: "VOLT Commerce",
    cat: "E-commerce • Headless",
    year: "2023",
    tone: "from-zinc-800 to-neutral-700",
  },
  {
    name: "ORBIT Logistics",
    cat: "Dashboard • Web App",
    year: "2023",
    tone: "from-stone-900 to-zinc-800",
  },
  {
    name: "KAIRO Health",
    cat: "Healthcare • Security Audit",
    year: "2024",
    tone: "from-neutral-900 to-stone-700",
  },
];

export default function Portfolio() {
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
      id="work"
      className="w-full border-y border-zinc-200 bg-[#FCFCFC] py-20 dark:border-white/10 dark:bg-[#050507] md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Selected work
          </h2>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 md:inline-flex"
          >
            Start similar project <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className={`group rounded-2xl border border-zinc-200 bg-white p-2 transition-all duration-700 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-white/20 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${p.tone}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_20%,rgba(255,255,255,0.15),transparent_60%)]" />

                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-white/70 backdrop-blur">
                    {p.year}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 transition-transform duration-500 group-hover:scale-110">
                  <SylvorIcon size={64} rounded="20%" />
                </div>
              </div>

              <div className="px-3 pb-2 pt-4">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {p.cat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
