"use client";

import SylvorIcon from "./SylvorIcon";
import { ArrowRightIcon, LockIcon, ShieldCheckIcon } from "./Icons";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-[#FCFCFC] dark:bg-[#050507]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 70%, transparent 110%)",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 70%, transparent 110%)",
          }}
        />
        <div className="absolute -top-1/3 left-1/2 h- w- -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-200/50 to-transparent blur- dark:from-white/[0.05] dark:to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium dark:border-white/10 dark:bg-white/5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              AVAILABLE FOR NEW PROJECTS — Q4 2025
            </div>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-">
              We build secure,
              <br />
              <span className="text-zinc-400">premium</span> digital
              <br />
              products.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
              PT SYLVOR LABS is a Jakarta-based technology lab specializing in
              high-end web development, security audits, and scalable web
              applications.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white hover:text-white hover:bg-gray-800 transition-colors dark:bg-white dark:text-blackhover:text-white dark:bg-white dark:text-black"
              >
                Start a project <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#work"
                className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5"
              >
                View selected work
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-xs dark:border-black dark:bg-zinc-800">
                  A
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-xs dark:border-black dark:bg-zinc-800">
                  R
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-xs dark:border-black dark:bg-zinc-800">
                  K
                </div>
              </div>
              <div className="text-sm leading-tight text-zinc-500">
                Trusted by 40+ companies
                <br />
                <span className="font-semibold text-zinc-900 dark:text-white">
                  4.9/5 average rating
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm md:max-w-">
              <div className="relative flex aspect-[4/4.6] w-full items-center justify-center overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-zinc-900">
                <div className="relative z-10">
                  <SylvorIcon size={160} rounded="22%" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-800/80">
                  <div>
                    <div className="text-xs tracking-widest text-zinc-500">
                      SYSTEM STATUS
                    </div>
                    <div className="text-sm font-medium">
                      All systems operational • 99.99%
                    </div>
                  </div>
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="absolute -left-5 top-8 hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium shadow-xl dark:border-white/10 dark:bg-zinc-900 md:flex">
                <ShieldCheckIcon className="h-4 w-4" /> SOC2 Compliant
              </div>
              <div className="absolute -right-3 bottom-24 hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium shadow-xl dark:border-white/10 dark:bg-zinc-900 md:flex">
                <LockIcon className="h-4 w-4" /> End-to-end encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
