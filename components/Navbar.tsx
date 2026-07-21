"use client";

import { useEffect, useState } from "react";
import SylvorIcon from "./SylvorIcon";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon, XIcon } from "./Icons";

const links = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About" },
  { id: "builder", label: "Artificial Builder" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-all ${
        scrolled
          ? "border-zinc-200 bg-white/90 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80"
          : "border-zinc-200/50 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-black/40"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:h- md:px-8">
        <button onClick={() => go("top")} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
            <SylvorIcon size={18} rounded="6px" />
          </div>
          <div className="text-left leading-none">
            <div className="text- font-bold tracking-wide text-zinc-900 dark:text-white">
              SYLVOR LABS
            </div>
            <div className="mt-1 text- tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
              PT • TECHNOLOGY
            </div>
          </div>
        </button>

        <nav className="hidden items-center rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-zinc-900 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-all ${
                active === l.id
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-black"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => go("contact")}
            className="hidden h-9 items-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 md:flex"
          >
            Contact
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900 md:hidden"
          >
            {menuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-black md:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="w-full py-3 text-left text-zinc-700 dark:text-zinc-300"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
