import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import TodoChip from "@/components/TodoChip";
import CheckTick from "@/components/CheckTick";
import { realEstateList } from "@/lib/products";
import { toJsonLd } from "@/lib/jsonld";
import { getWeeklyVerifiedDate } from "@/lib/date";
import { SITE } from "@/lib/site";

// Re-render the static page daily so the weekly "last verified" date rolls
// forward to the new Monday without a redeploy.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: {
    absolute: "LeadsPitch — Buy one niche B2B lead list, not a subscription",
  },
  description:
    "LeadsPitch sells pre-packaged, niche-specific B2B lead lists — real estate, legal, home services, beauty, and medical — as one-time XLSX downloads. Pay once, download, own the file. No login, no credits, no monthly charge.",
};

const VERIFIED_EMAILS = realEstateList.emailCount.toLocaleString("en-US"); // 1,000
const LEAD_POOL = realEstateList.leadCount.toLocaleString("en-US"); // 3,570
const PRICE = `$${realEstateList.priceUsd.toFixed(2)}`; // $7.99

const PREVIEW_FAQS = [
  "Is there a cheaper alternative to Apollo.io for small agencies?",
  "Can I buy a lead list without a monthly subscription?",
  "Is it legal to buy an email list and cold email people?",
  "What file format do lead lists come in?",
  "Do I need Apollo or ZoomInfo if I only need one list, not ongoing prospecting?",
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LeadsPitch",
  description:
    "Pre-packaged, niche-specific B2B lead lists sold as one-time XLSX downloads, built from public business records and state licensing directories.",
  url: "https://leadspitch.com",
};

function SampleTerminal() {
  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-surface shadow-lift">
      <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-accent">
            <span className="font-mono text-[8px] font-bold tracking-[-0.04em] text-white">
              lp
            </span>
          </span>
          <span className="font-mono text-xs text-ink">
            real-estate-agents.xlsx
          </span>
        </div>
        <span className="rounded-sm border border-notice-border bg-notice-soft px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-notice">
          SAMPLE
        </span>
      </div>
      <p className="px-3.5 py-2 font-mono text-[11px] text-ink-faint border-b border-hairline">
        Sample data for preview only — columns vary by dataset
      </p>
      {/* Body = real sample screenshot */}
      <div className="relative h-[236px] overflow-hidden">
        <Image
          src="/sample-excel.png"
          alt="Sample real-estate-agents.xlsx preview — 26 columns showing NAME, EMAIL, CITY, LICENSE, verified tick"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </div>
      <div className="flex items-center justify-between border-t border-hairline px-3.5 py-2.5">
        <span className="border-b-2 border-accent pb-0.5 font-mono text-[11px] text-ink">
          real-estate
        </span>
        <span className="font-mono text-[11px] text-ink-faint">
          {VERIFIED_EMAILS} verified · {LEAD_POOL} pool
        </span>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  muted,
}: {
  value: string;
  label: string;
  muted?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-mono text-[44px] font-bold leading-none tracking-[-0.03em] ${
          muted ? "text-ink-secondary" : "text-ink"
        }`}
      >
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[13px] text-ink-secondary">
        {label}
      </div>
    </div>
  );
}

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-[13px] text-accent">{num}</span>
      <h2 className="text-3xl font-semibold tracking-[-0.025em]">{title}</h2>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema) }}
      />

      {/* ===== 01 · HERO ===== */}
      <section className="blueprint relative border-b border-hairline">
        <div className="relative mx-auto grid max-w-shell items-center gap-14 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-20">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.14em] text-accent">
              01 — NICHE B2B LEAD LISTS
            </p>
            <h1 className="mt-4 text-[clamp(2rem,1rem+4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-[-0.035em]">
              Buy one niche B2B lead list, not another monthly subscription.
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-secondary">
              We sell pre-packaged, niche-specific business contact lists in real
              estate, legal, home services, beauty, and medical. Pick a list, pay
              once, and download a ready-to-use XLSX file — no login, no credits,
              no monthly charge.
            </p>

            <div className="mt-9 flex flex-wrap items-end gap-10">
              <Stat value={VERIFIED_EMAILS} label="verified emails" />
              <div className="hidden self-stretch border-l border-hairline sm:block" />
              <Stat value={LEAD_POOL} label="lead pool" muted />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={realEstateList.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-accent px-5 py-3 text-[15px] font-medium text-white transition duration-fast ease-out-expo hover:bg-accent-hover active:scale-[0.98]"
              >
                Get the Real Estate list — {PRICE}
              </a>
              <Link
                href="/pricing"
                className="rounded-sm border border-hairline bg-surface px-5 py-3 text-[15px] font-medium text-ink transition duration-fast ease-out-expo hover:border-accent hover:text-accent"
              >
                See a sample
              </Link>
            </div>

<p className="mt-7 max-w-[60ch] font-mono text-[12.5px] leading-relaxed text-ink-secondary">
              Last verified {getWeeklyVerifiedDate()} · Built from public
              business records & state licensing directories · One-time
              purchase, no subscription
            </p>
          </Reveal>

          <Reveal delay={80}>
            <SampleTerminal />
          </Reveal>
        </div>
      </section>

      {/* ===== 02 · WHY LEADSPITCH (bento) ===== */}
      <section className="border-b border-hairline bg-surface-2">
        <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
          <Reveal>
            <SectionHead num="02" title="Why LeadsPitch" />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Reveal className="md:row-span-2">
              <div className="flex h-full flex-col justify-between rounded-lg border border-hairline bg-surface p-8 transition-colors duration-base hover:border-hairline-strong">
                <div>
                  <p className="font-mono text-xs tracking-[0.1em] text-accent">
                    THE EDGE
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em]">
                    Local business owners the LinkedIn-scrapers miss.
                  </h3>
                  <p className="mt-4 max-w-[44ch] leading-relaxed text-ink-secondary">
                    Apollo, Clay, and ZoomInfo lean on LinkedIn activity, which
                    works poorly for independent local owners who never built a
                    profile. An HVAC contractor or a solo salon owner shows up in
                    a licensing registry, not a contributor network — so we build
                    each list from the sources that niche actually appears in.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "real estate",
                    "legal",
                    "home services",
                    "beauty",
                    "medical",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] text-ink-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {[
              {
                h: "Public-record sourcing",
                p: "Built from public business records and state licensing directories. No LinkedIn scraping, no gray-area data.",
              },
              {
                h: "One-time pricing",
                p: "The price at checkout is the price you pay. No credits, no seat fees, nothing renews.",
              },
              {
                h: "Human verification",
                p: "Every record runs through email verification before it goes into a file for sale.",
              },
            ].map((cell, i) => (
              <Reveal key={cell.h} delay={i * 60}>
                <div className="h-full rounded-lg border border-hairline bg-surface p-6 transition-colors duration-base hover:border-hairline-strong">
                  <h3 className="text-base font-semibold">{cell.h}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                    {cell.p}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={180}>
              <div className="h-full rounded-lg border border-hairline bg-surface p-6 transition-colors duration-base hover:border-hairline-strong">
                <h3 className="text-base font-semibold">Refund guarantee</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  Corrupted file or wrong list? We resend a corrected file or
                  refund.{" "}
                  <Link
                    href="/refund-policy"
                    className="text-accent transition-colors hover:text-accent-hover"
                  >
                    Read the refund policy.
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 03 · HOW IT WORKS ===== */}
      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
          <Reveal>
            <SectionHead num="03" title="How it works" />
          </Reveal>
          <div className="mt-9 grid gap-10 md:grid-cols-3">
            {[
              {
                n: "01",
                h: "Pick a list",
                p: "Choose a niche — real estate is live now — and narrow it by state, city, or ZIP if you want a tighter file.",
              },
              {
                n: "02",
                h: "Pay once",
                p: "No account, no recurring charge, no credit system to figure out. One price, one payment at checkout.",
              },
              {
                n: "03",
                h: "Download the XLSX",
                p: "Your list arrives as a ZIP with a clean XLSX, ready for Excel, Google Sheets, your CRM, or your cold-email tool.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 60}>
                <div className="border-t border-hairline pt-5">
                  <div className="font-mono text-[22px] font-bold text-accent">
                    {step.n}
                  </div>
                  <h3 className="mt-3.5 text-lg font-semibold">{step.h}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-secondary">
                    {step.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 04 · INSPECT THE FILE ===== */}
      <section id="04" className="border-b border-hairline bg-surface-2">
        <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
          <Reveal>
            <SectionHead num="04" title="Inspect the file before you buy" />
          </Reveal>
          <div className="mt-8 grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <p className="max-w-[52ch] text-base leading-relaxed text-ink-secondary">
                We publish sample data so you can check format and quality before
                you pay. Every list includes business name, contact name, direct
                email, phone where publicly available, city, and niche-specific
                fields — for real estate, that means license type and brokerage —
                in a single XLSX with clean column headers.
              </p>
              <div className="mt-7 grid gap-x-8 sm:grid-cols-2">
                <div className="border-t border-hairline py-[18px]">
                  <div className="text-[15px] font-semibold">Provenance</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                    Licensing boards, brokerage directories, and public agent
                    registries — sourced per niche, not one generic database.
                  </p>
                </div>
                <div className="border-t border-hairline py-[18px]">
                  <div className="text-[15px] font-semibold">Freshness</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                    Each list is a snapshot refreshed on a set cycle; the file
                    shows its last update date. Last verified{" "}
                    <span className="font-medium text-ink">
                      {getWeeklyVerifiedDate()}
                    </span>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-md border border-hairline bg-surface px-3.5 py-3">
                <CheckTick size={14} className="text-accent" />
                <span className="font-mono text-[12.5px] text-ink-secondary">
                  every record email-verified before sale
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
                <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5">
                  <span className="font-mono text-xs text-ink">
                    sample · redacted preview
                  </span>
                  <span className="rounded-sm border border-notice-border bg-notice-soft px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-notice">
                    SAMPLE
                  </span>
                </div>
                <p className="px-3.5 py-2 font-mono text-[11px] text-ink-faint border-b border-hairline">
                  Sample data for preview only — columns vary by dataset
                </p>
                <div className="relative h-[184px]">
                  <Image
                    src="/sample-excel.png"
                    alt="Sample real-estate-agents.xlsx preview — columns showing NAME, EMAIL, CITY, LICENSE, verified tick"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 05 · FOUNDER ===== */}
      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
          <Reveal>
            <SectionHead num="05" title="Who builds the lists" />
          </Reveal>
          <Reveal>
            <div className="mt-7 grid items-center gap-12 rounded-lg border border-hairline bg-surface-2 p-8 md:grid-cols-[0.7fr_1.3fr] md:p-10">
              <div>
                <div className="text-[26px] font-semibold tracking-[-0.02em]">
                  Abdullah Ejaz
                </div>
                <div className="mt-2 font-mono text-[12.5px] text-accent">
                  founder · builds every list
                </div>
                <div className="mt-5 inline-flex items-center gap-2.5 rounded-md border border-hairline bg-surface px-3 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-xs text-ink-secondary">
                    a real person answers your email
                  </span>
                </div>
              </div>
              <div>
                <blockquote className="text-[22px] font-medium leading-[1.5] tracking-[-0.01em]">
                  &ldquo;{SITE.founderQuote}&rdquo;
                </blockquote>
                <p className="mt-5 max-w-[56ch] leading-relaxed text-ink-secondary">
                  {SITE.founderGoal}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 06 · SOCIAL PROOF ===== */}
      <section className="border-b border-hairline bg-surface-2">
        <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
          <Reveal>
            <SectionHead num="06" title="What buyers say" />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["testimonial 01", "testimonial 02", "testimonial 03"].map(
              (t, i) => (
                <Reveal key={t} delay={i * 60}>
                  <div className="flex min-h-[180px] flex-col justify-between rounded-lg border border-dashed border-hairline-strong bg-surface p-7">
                    <TodoChip className="self-start text-[11.5px]">{`{{TODO: ${t}}}`}</TodoChip>
                    <div className="font-mono text-[11.5px] text-ink-faint">
                      name · role · niche
                    </div>
                  </div>
                </Reveal>
              ),
            )}
          </div>
          <p className="mt-3 font-mono text-[11.5px] text-ink-faint">
            placeholders only — never fabricated. Section fills in once real
            testimonials exist.
          </p>
        </div>
      </section>

      {/* ===== 07 · FAQ PREVIEW ===== */}
      <section className="bg-surface">
        <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
          <Reveal>
            <SectionHead num="07" title="Questions people ask before buying" />
          </Reveal>
          <Reveal>
            <div className="mt-7 border-t border-hairline">
              {PREVIEW_FAQS.map((q) => (
                <Link
                  key={q}
                  href="/faq"
                  className="group flex items-center justify-between gap-6 border-b border-hairline py-[22px] transition-colors hover:text-accent"
                >
                  <span className="text-base font-medium">{q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-ink-faint transition-colors group-hover:text-accent"
                  >
                    <path
                      d="M8 2v12M2 8h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              ))}
            </div>
            <Link
              href="/faq"
              className="mt-6 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              View all questions →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
