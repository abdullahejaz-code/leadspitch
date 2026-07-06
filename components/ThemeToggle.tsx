"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "lp-theme";

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); theme just won't persist.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title="Toggle theme"
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-hairline bg-surface text-ink transition-colors duration-fast hover:border-ink-faint ${className}`}
    >
      {theme === "dark" ? (
        <SunIcon />
      ) : theme === "light" ? (
        <MoonIcon />
      ) : (
        <span className="block h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
