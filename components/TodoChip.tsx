import type { ReactNode } from "react";

interface TodoChipProps {
  /** The unresolved value, e.g. the "{{TODO: ... }}" token or its default. */
  children: ReactNode;
  /** Slightly larger padding/type for standalone (non-inline) placements. */
  size?: "inline" | "block";
  className?: string;
}

/**
 * The single styled treatment for every unknown across the site — an amber
 * "TODO chip". Nothing unknown is ever rendered as raw bracket text or invented
 * data; it renders here until a real value is wired in via props. Matches the
 * batch design's amber token treatment (never any other colour).
 */
export default function TodoChip({
  children,
  size = "inline",
  className = "",
}: TodoChipProps) {
  const pad = size === "block" ? "px-3 py-1.5" : "px-1.5 py-0.5";
  return (
    <span
      title="Unresolved value — fill this in before launch"
      className={`inline-block rounded-sm bg-notice-soft font-mono text-notice ${pad} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Central registry of the TODO tokens still unresolved. Resolved values live
 * in lib/site.ts (SITE registry) — everything filled on 2026-07-11 except:
 * - supportEmail: support funnels through the contact form by default; a
 *   branded email only appears if the owner enables the email fallback.
 * - testimonials: rendered inline on the home page, never fabricated —
 *   they fill in once real buyer quotes exist.
 */
export const TODO = {
  supportEmail: "{{TODO: support email}}",
} as const;
