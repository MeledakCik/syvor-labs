"use client";

import { useEffect, useRef, useState } from "react";
import SylvorIcon from "./SylvorIcon";
import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "./Icons";

const contactInfo = [
  { icon: MailIcon, label: "hello@sylvorlabs.com" },
  { icon: PhoneIcon, label: "+62 812 3456 7890" },
  { icon: MapPinIcon, label: "Jakarta • Singapore • Remote" },
];

const projectTypes = ["Website Dev", "Web App", "Pentest", "Security Audit", "Template", "Maintenance"];

export default function Contact() {
  const [selectedType, setSelectedType] = useState("Website Dev");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full overflow-hidden bg-[#FDFCF8] py-20 text-zinc-900 dark:bg-[#050507] dark:text-white md:py-28"
    >
      {/* grid + glow fix */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-black/[0.03] blur-3xl dark:bg-white/[0.04]" />
        <div className="absolute -bottom-32 right-0 h-48 w-48 rounded-full bg-black/[0.02] blur-3xl dark:bg-white/[0.03]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          {/* Left */}
          <div className={`transition-all duration-700 ${visible? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Available for new projects
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-[0.9] tracking-tight md:text-5xl">
              Let’s build<br />something<br /><span className="text-zinc-400 dark:text-white/40">secure.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-white/50">
              Tell us about your project. We’ll reply within 24h with scope, timeline, and fixed pricing.
            </p>

            <div className="mt-10 space-y-3">
              {contactInfo.map((c, i) => (
                <div key={c.label} className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-black/[0.02] p-3 transition-all hover:border-black/10 hover:bg-black/[0.04] dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-white/10 dark:hover:bg-white/[0.04]" style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-zinc-700 dark:text-white/80">{c.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:backdrop-blur">
              <SylvorIcon size={36} rounded="20%" />
              <div className="text-xs leading-relaxed text-zinc-500 dark:text-white/50">
                Average response: <span className="font-medium text-black dark:text-white">2.4 hours</span><br />
                Currently onboarding 2 new partners for November.
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className={`rounded-2xl border border-black/10 bg-white p-1.5 shadow-sm transition-all duration-700 dark:border-white/10 dark:bg-[#111113] md:p-2 ${visible? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`} style={{ transitionDelay: "200ms" }}>
            <div className="rounded-xl bg-zinc-50 p-6 dark:bg-[#111113] md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-[10px] tracking-widest text-zinc-400 dark:text-white/40">FULL NAME</label>
                  <input placeholder="Alex Morgan" className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none placeholder:text-zinc-400 focus:border-black/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20 dark:focus:border-white/20" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest text-zinc-400 dark:text-white/40">WORK EMAIL</label>
                  <input placeholder="alex@company.com" className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none placeholder:text-zinc-400 focus:border-black/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20 dark:focus:border-white/20" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] tracking-widest text-zinc-400 dark:text-white/40">PROJECT TYPE</label>
                  <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
                    {projectTypes.map((t) => (
                      <button key={t} type="button" onClick={() => setSelectedType(t)} className={`h-10 rounded-full border text-xs font-medium transition-all ${selectedType === t? "scale-[1.02] border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" : "border-black/10 bg-white text-zinc-500 hover:border-black/20 hover:text-black dark:border-white/10 dark:bg-white/[0.03] dark:text-white/50 dark:hover:border-white/20 dark:hover:text-white"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] tracking-widest text-zinc-400 dark:text-white/40">PROJECT DETAILS</label>
                  <textarea placeholder="Tell us about goals, timeline, and budget range..." rows={4} className="mt-3 w-full resize-none rounded-xl border border-black/10 bg-white p-4 text-sm outline-none placeholder:text-zinc-400 focus:border-black/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20 dark:focus:border-white/20" />
                </div>
              </div>

              <button className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white transition-all hover:gap-3 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100">
                Send inquiry — we reply in 24h
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-4 text-center text-[10px] text-zinc-400 dark:text-white/30">By sending, you agree to our privacy & security policy. No spam.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
