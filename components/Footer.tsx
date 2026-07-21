"use client";

import SylvorIcon from "./SylvorIcon";
import { ArrowUpRightIcon } from "./Icons";

const columns = [
  {
    title: "Product",
    items: ["Services", "Work", "Pricing", "About", "Templates"],
  },
  {
    title: "Security",
    items: [
      "Pentest",
      "WAF & Hardening",
      "API Security",
      "SOC2 Readiness",
      "Status",
    ],
  },
  {
    title: "Company",
    items: ["Manifesto", "Careers", "Contact", "Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#FDFCF8] text-zinc-900 dark:bg-[#050507] dark:text-white">
      {/* Top CTA bar */}
      <div className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-8 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm text-zinc-500 dark:text-white/60">
              All systems operational — 2 slots left for Q4
            </span>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5"
          >
            Start a project <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <SylvorIcon size={40} rounded="12px" />
              <span className="text-sm font-semibold tracking-widest">
                SYLVOR LABS
              </span>
            </div>
            <h3 className="mt-8 max-w-sm text-2xl font-semibold leading-[1.1] tracking-tight md:text-3xl">
              Premium web development and security lab for ambitious companies.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-white/40">
              We craft fast, secure, and timeless digital products. Jakarta •
              Singapore • Remote.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
                hello@sylvorlabs.com
              </div>
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
                PT SYLVOR LABS © 2025
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-8 md:gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="mb-4 text-xs font-medium tracking-widest text-zinc-400 dark:text-white/30">
                  {col.title.toUpperCase()}
                </div>
                <div className="space-y-3">
                  {col.items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block text-sm text-zinc-600 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-black/10 pt-8 dark:border-white/10 md:flex-row">
          <div className="flex flex-wrap gap-6 text-xs text-zinc-400 dark:text-white/30">
            <span>© 2025 PT SYLVOR LABS</span>
            <span>Jakarta, ID</span>
            <span>Designed in Jakarta</span>
          </div>
          <div className="flex gap-6 text-xs text-zinc-400 dark:text-white/30">
            <span>Built with security in mind</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-black/30 dark:bg-white/40" />{" "}
              UTC+7
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
