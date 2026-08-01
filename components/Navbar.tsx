"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/bundles", label: "Bundles" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const CTA_LINK = { href: "/leads", label: "Browse lists" } as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LogoMark() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-accent">
      <span className="font-mono text-sm font-bold tracking-[-0.04em] text-white">
        lp
      </span>
    </span>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  // Close the sheet whenever the route changes ("adjust state during
  // render" pattern — avoids an extra effect-driven render pass).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-hairline">
      <div className="bg-surface-2/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 md:px-10"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.02em] text-ink transition-opacity duration-fast hover:opacity-80"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogoMark />
            LeadsPitch
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative inline-flex items-center rounded-sm px-3 py-2 text-sm transition-colors duration-fast ${
                      active ? "text-ink" : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-base ease-out-expo ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
            <li className="ml-2">
              <ThemeToggle />
            </li>
            <li className="ml-1">
              <Link
                href={CTA_LINK.href}
                className="inline-flex items-center rounded-sm bg-accent px-4 py-2 text-sm font-medium text-white transition duration-fast ease-out-expo hover:bg-accent-hover active:scale-[0.98]"
              >
                {CTA_LINK.label}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="relative z-50 flex h-10 w-10 items-center justify-center text-ink"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-base ease-out-expo ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-base ease-out-expo ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-surface-2/95 backdrop-blur-xl transition-opacity duration-base ease-out-expo ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          aria-label="Mobile navigation"
          className={`relative flex h-full flex-col px-6 pb-10 pt-8 transition-transform duration-base ease-out-expo ${
            isMenuOpen ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
            {NAV_LINKS.map((link, index) => {
              const active = isActive(pathname, link.href);
              return (
                <li
                  key={link.href}
                  className={`transition-all duration-base ease-out-expo ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${index * 40}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-lg transition-colors duration-fast ${
                      active ? "text-ink" : "text-ink-secondary"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={CTA_LINK.href}
            className={`mt-8 inline-flex items-center justify-center rounded-sm bg-accent px-5 py-3 text-base font-medium text-white transition-all duration-base ease-out-expo hover:bg-accent-hover active:scale-[0.98] ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
            style={{ transitionDelay: isMenuOpen ? `${NAV_LINKS.length * 40}ms` : "0ms" }}
          >
            {CTA_LINK.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
