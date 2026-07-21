"use client";

import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "./Icons";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Switch appearance"
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border transition-all dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-zinc-300 dark:hover:bg-white/[0.10] border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
    >
      {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}
