import Link from "next/link";
import SoonBadge from "@/components/SoonBadge";

interface FooterLink {
  href: string;
  label: string;
  soon?: boolean;
}

const COMPANY_LINKS: FooterLink[] = [
  { href: "/about", label: "About" },
  { href: "/leads", label: "Leads" },
  { href: "/blog", label: "Blog", soon: true },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
] as const;

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly { href: string; label: string; soon?: boolean }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-medium">{heading}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.soon ? (
              <span
                aria-disabled="true"
                title="Coming soon"
                className="inline-flex cursor-not-allowed items-center text-sm text-ink-faint"
              >
                {link.label}
                <SoonBadge />
              </span>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-ink-secondary transition-colors duration-fast hover:text-ink"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight">
              LeadsPitch
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-secondary">
              Pre-packaged, niche-specific B2B lead lists. Buy once, download,
              done.
            </p>
          </div>
          <FooterColumn heading="Company" links={COMPANY_LINKS} />
          <FooterColumn heading="Legal" links={LEGAL_LINKS} />
        </div>
        <p className="mt-16 border-t border-hairline pt-8 font-mono text-xs text-ink-faint">
          {new Date().getFullYear()} LeadsPitch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
