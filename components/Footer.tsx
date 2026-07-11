import Link from "next/link";
import TodoChip, { TODO } from "@/components/TodoChip";
import { SITE } from "@/lib/site";

interface FooterProps {
  /**
   * How support is reached. Defaults to the contact form (the whole site
   * funnels through it), matching the approved design. Set to "email" to
   * surface the support-email TODO chip instead.
   */
  contactMethod?: "form" | "email";
  /** Support email — only shown when contactMethod is "email". */
  supportEmail?: string;
  /** Legal operating entity shown in the "operated by …" line. */
  legalEntity?: string;
  /** Surface the "operated by …" line. */
  showLegalEntity?: boolean;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/refund-policy", label: "Refund Policy" },
] as const;

export default function Footer({
  contactMethod = "form",
  supportEmail = TODO.supportEmail,
  legalEntity = SITE.legalEntity,
  showLegalEntity = true,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-band text-white">
      <div className="mx-auto max-w-shell px-5 py-14 md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div className="max-w-[38ch]">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-accent">
                <span className="font-mono text-sm font-bold tracking-[-0.04em] text-white">
                  lp
                </span>
              </span>
              <span className="text-lg font-semibold">LeadsPitch</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              We sell pre-packaged, niche-specific B2B lead lists, built from
              public business records and state licensing directories. You buy
              once and own the file.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {NAV_LINKS.map((link, index) => (
              <span key={link.href} className="flex items-center gap-x-3">
                <Link
                  href={link.href}
                  className="text-sm text-white/75 transition-colors duration-fast hover:text-white"
                >
                  {link.label}
                </Link>
                {index < NAV_LINKS.length - 1 && (
                  <span aria-hidden="true" className="text-ink-strong">
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center gap-5">
            {contactMethod === "email" ? (
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center gap-2 text-white transition-colors duration-fast hover:text-accent-hover"
              >
                <TodoChip>{supportEmail}</TodoChip>
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-fast hover:text-accent-hover"
              >
                Contact us <span aria-hidden="true">→</span>
              </Link>
            )}
            {showLegalEntity && (
              <span className="font-mono text-xs text-white/50">
                operated by {legalEntity}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/privacy-policy"
              className="font-mono text-xs text-white/50 transition-colors duration-fast hover:text-white/80"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="font-mono text-xs text-white/50 transition-colors duration-fast hover:text-white/80"
            >
              Terms
            </Link>
            <span className="font-mono text-xs text-ink-faint">
              &copy; {year} LeadsPitch · one-time purchase, no subscription
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
