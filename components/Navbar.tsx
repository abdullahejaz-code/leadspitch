"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SoonBadge from "@/components/SoonBadge";
import ThemeToggle from "@/components/ThemeToggle";

interface NavLink {
  href: string;
  label: string;
  soon?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/leads", label: "Leads" },
  { href: "/blog", label: "Blog", soon: true },
  { href: "/faq", label: "FAQ" },
];

const CTA_LINK = { href: "/contact", label: "Contact" } as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
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

  // Close the sheet whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline">
      <div className="bg-surface/70 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight transition-opacity duration-fast hover:opacity-70"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="relative inline-block h-[15px] w-[15px] rounded-[4px] border-[1.5px] border-ink">
              <span className="absolute inset-x-[3px] top-[3px] h-[1.5px] bg-ink" />
              <span className="absolute inset-x-[3px] top-[6px] h-[1.5px] bg-ink" />
              <span className="absolute bottom-[3px] left-[3px] top-[6px] w-[1.5px] bg-accent" />
            </span>
            LeadsPitch
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = !link.soon && isActive(pathname, link.href);
              if (link.soon) {
                return (
                  <li key={link.href}>
                    <span
                      aria-disabled="true"
                      title="Coming soon"
                      className="inline-flex cursor-not-allowed items-center rounded-sm px-3 py-2 text-sm text-ink-faint"
                    >
                      {link.label}
                      <SoonBadge />
                    </span>
                  </li>
                );
              }
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
                className="inline-flex items-center rounded-sm bg-ink px-4 py-2 text-sm font-medium text-surface transition duration-fast ease-out-expo hover:bg-ink-hover active:scale-[0.98]"
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
              className="relative z-50 flex h-10 w-10 items-center justify-center"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-ink transition-transform duration-base ease-out-expo ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-ink transition-transform duration-base ease-out-expo ${
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
          className={`absolute inset-0 bg-canvas/95 backdrop-blur-xl transition-opacity duration-base ease-out-expo ${
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
              const active = !link.soon && isActive(pathname, link.href);
              return (
                <li
                  key={link.href}
                  className={`transition-all duration-base ease-out-expo ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${index * 40}ms` : "0ms" }}
                >
                  {link.soon ? (
                    <span
                      aria-disabled="true"
                      className="flex cursor-not-allowed items-center justify-between py-4 text-lg text-ink-faint"
                    >
                      {link.label}
                      <SoonBadge />
                    </span>
                  ) : (
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
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href={CTA_LINK.href}
            className={`mt-8 inline-flex items-center justify-center rounded-sm bg-ink px-5 py-3 text-base font-medium text-surface transition-all duration-base ease-out-expo hover:bg-ink-hover active:scale-[0.98] ${
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
