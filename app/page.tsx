import type { Metadata } from "next";
import Link from "next/link";
import GridBackdrop from "@/components/GridBackdrop";
import Reveal from "@/components/Reveal";
import SoonBadge from "@/components/SoonBadge";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: {
    absolute: "LeadsPitch — Buy One Lead List. Not Another Subscription.",
  },
  description:
    "Leadspitch sells pre-packaged, niche-specific business contact lists in real estate, legal, home services, beauty, and medical. Pick a category, pay once, and download a ready-to-use XLSX file in minutes. No login, no credits, no monthly charge.",
};

const IMPORT_TARGETS = ["Excel", "Google Sheets", "Your CRM", "Cold email tool"];

const SAMPLE_ROWS = [
  { name: "Lone Star Realty", contact: "M. Vasquez", email: "maria@lonestar.co", phone: "(512) 555-0148" },
  { name: "Hillside Group", contact: "D. Chen", email: "dchen@hillside.io", phone: "(214) 555-0132" },
  { name: "Bluebonnet Homes", contact: "R. Okafor", email: "ruth@bbhomes.com", phone: "(713) 555-0199" },
  { name: "Summit Realty Co", contact: "A. Patel", email: "amit@summitrc.com", phone: "(210) 555-0176" },
  { name: "Trinity Properties", contact: "J. Marsh", email: "jen@trinityp.co", phone: "(817) 555-0121" },
] as const;

const COMPARISON_ROWS = [
  {
    label: "Pricing",
    leadspitch: "One-time payment, $7.99–$15.99 per 1k list",
    apollo: "$49–$119 per user, per month",
    clay: "Credit-based, costs stack across 100+ connected data providers",
  },
  {
    label: "Access",
    leadspitch: "Instant ZIP/XLSX download after checkout",
    apollo: "Web platform login, filter-and-search workflow",
    clay: "Spreadsheet-style workspace, requires configuration",
  },
  {
    label: "Commitment",
    leadspitch: "None. Buy once, keep the file forever",
    apollo: "Monthly or annual subscription",
    clay: "Monthly subscription plus ongoing per-enrichment credit spend",
  },
  {
    label: "Setup",
    leadspitch: "None. Open the file and start emailing",
    apollo: "Build filters, connect CRM, set up sequences",
    clay: "Build enrichment waterfalls and workflows before you get usable data",
  },
] as const;

const HOW_IT_WORKS_STEPS = [
  {
    title: "Pick your niche and location.",
    body: "Choose a category (real estate, legal, home services, beauty, medical and more) and narrow it by state, city, or ZIP if you want a tighter list.",
  },
  {
    title: "Pay once at checkout.",
    body: "No account creation, no recurring card charge, no credit system to figure out. One price, one payment.",
  },
  {
    title: "Download instantly.",
    body: "Your list arrives as a ZIP file containing a clean XLSX, ready to import into your CRM, cold email tool, or spreadsheet of choice.",
  },
] as const;

const BUILT_FOR_AUDIENCES = [
  {
    title: "Freelancers",
    body: "You’re pitching one service to one niche and don’t need a $50/month tool sitting idle between projects. Buy the list for the job in front of you.",
  },
  {
    title: "Agencies",
    body: "Running outreach for multiple clients means multiple niches. Buy a separate list per client or per campaign without per-seat pricing eating into your margin.",
  },
  {
    title: "Cold email operators",
    body: "You need volume and a fresh list to rotate into a new domain or campaign. Skip the credit math and get a flat file you can load straight into your sender.",
  },
  {
    title: "Solo consultants and SDRs",
    body: "You’re prospecting alone, not managing a team subscription. Get the exact contacts for your target niche without justifying a platform license to anyone.",
  },
] as const;

const INCLUDED_FIELDS = [
  { label: "business_name" },
  { label: "contact_name" },
  { label: "email" },
  { label: "phone" },
  { label: "company_name" },
  { label: "address" },
  { label: "website" },
] as const;

const FAQ_ITEMS = [
  {
    question: "Is there a cheaper alternative to Apollo.io for small agencies?",
    answer:
      "Yes. Leadspitch costs a one-time $7.99–$15.99 per 1k list instead of Apollo’s $49–$119 per user, per month. If you only need contacts for one niche or one campaign, a single purchase is cheaper than even one month of an Apollo subscription.",
  },
  {
    question: "Can I buy a lead list without a monthly subscription?",
    answer:
      "Yes. Every Leadspitch list is a one-time purchase. You pay once at checkout, download the file, and there is nothing to cancel later because nothing renews.",
  },
  {
    question: "Is it legal to buy an email list and cold email people?",
    answer:
      "Yes, cold emailing business contacts is legal in the US under CAN-SPAM as long as you include a working unsubscribe link and accurate sender information. Leadspitch lists are built from publicly available business contact information for exactly this kind of B2B outreach. You’re still responsible for how you use the list, so follow CAN-SPAM (or GDPR, if you’re emailing into the EU/UK).",
  },
  {
    question: "What file format do lead lists come in?",
    answer:
      "Every list is delivered as a ZIP file containing an XLSX spreadsheet. XLSX opens directly in Excel, Google Sheets, or any CRM and cold email tool that accepts spreadsheet imports.",
  },
  {
    question:
      "Do I need Apollo or ZoomInfo if I only need one list, not ongoing prospecting?",
    answer:
      "No. Apollo and ZoomInfo are built for continuous, live database searching, which is why they charge monthly. If you need a defined list for a specific niche and don’t plan to search a live database every week, a one-time list purchase gets you the same contacts for a fraction of the cost.",
  },
] as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LeadsPitch",
  description:
    "Leadspitch sells pre-packaged, niche-specific business contact lists in real estate, legal, home services, beauty, and medical. Pick a category, pay once, and download a ready-to-use XLSX file in minutes. No login, no credits, no monthly charge.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-base ease-out-expo group-open:rotate-45"
    >
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

function getCategoryPricingSummary(categorySlug: string) {
  const categoryProducts = products.filter(
    (product) => product.categorySlug === categorySlug,
  );
  if (categoryProducts.length === 0) return undefined;

  const cheapest = categoryProducts.reduce((lowest, product) =>
    product.priceUsd < lowest.priceUsd ? product : lowest,
  );

  return {
    fromPriceUsd: cheapest.priceUsd,
    packCount: categoryProducts.length,
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ===== Hero ===== */}
      <section id="top" className="relative overflow-hidden">
        <GridBackdrop mask="radial-gradient(120% 90% at 30% 0%, #000 30%, transparent 78%)" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-section lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <Reveal>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs text-ink-secondary"
              style={{ boxShadow: "none" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 0 3px var(--color-accent-soft)" }}
                aria-hidden="true"
              />
              One-time purchase &middot; no subscription
            </div>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] md:text-6xl">
              Buy One Lead List. Not Another Subscription.
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-secondary">
              Leadspitch sells pre-packaged, niche-specific business contact
              lists in real estate, legal, home services, beauty, and medical.
              Pick a category, pay once, and download a ready-to-use XLSX file
              in minutes. No login, no credits, no monthly charge.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#pricing"
                className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-surface transition duration-fast ease-out-expo hover:bg-ink-hover active:scale-[0.98]"
              >
                See pack pricing
              </a>
              <a
                href="#compare"
                className="rounded-sm border border-hairline bg-surface px-5 py-2.5 text-sm font-medium transition duration-fast ease-out-expo hover:border-ink-faint active:scale-[0.98]"
              >
                Compare to Apollo &amp; Clay
              </a>
            </div>
            <div className="mt-10">
              <div className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                Imports cleanly into
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                {IMPORT_TARGETS.map((target, index) => (
                  <span key={target} className="flex items-center gap-x-5">
                    <span className="text-sm font-medium text-ink-secondary">
                      {target}
                    </span>
                    {index < IMPORT_TARGETS.length - 1 && (
                      <span className="h-[3px] w-[3px] rounded-full bg-dot" aria-hidden="true" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-lg border border-hairline bg-surface shadow-elevated">
              <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-2 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-accent">
                    <span className="h-[1.5px] w-[7px] bg-white shadow-[0_-3px_0_#fff,0_3px_0_#fff]" />
                  </span>
                  <span className="truncate font-mono text-[12.5px]">
                    sample-preview.xlsx
                  </span>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full border border-notice/30 bg-notice-soft px-2 py-0.5 font-mono text-[10.5px] font-medium tracking-wide text-notice">
                  SAMPLE &middot; NOT REAL DATA
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[28rem] border-collapse font-mono text-[11.5px]">
                  <thead>
                    <tr className="bg-surface-2 text-ink-faint">
                      <th className="border-b border-hairline px-3 py-2.5 text-left font-medium tracking-wide">
                        business_name
                      </th>
                      <th className="border-b border-hairline px-3 py-2.5 text-left font-medium tracking-wide">
                        contact_name
                      </th>
                      <th className="border-b border-hairline px-3 py-2.5 text-left font-medium tracking-wide">
                        email
                      </th>
                      <th className="border-b border-hairline px-3 py-2.5 text-left font-medium tracking-wide">
                        phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_ROWS.map((row, index) => (
                      <tr
                        key={row.name}
                        className={index < SAMPLE_ROWS.length - 1 ? "border-b border-hairline-soft" : ""}
                      >
                        <td className="px-3 py-2.5">{row.name}</td>
                        <td className="px-3 py-2.5">{row.contact}</td>
                        <td className="px-3 py-2.5 text-accent">{row.email}</td>
                        <td className="px-3 py-2.5 text-ink-secondary">{row.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-hairline bg-surface-2 px-4 py-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-secondary">
                  <svg
                    viewBox="0 0 16 16"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="var(--color-notice)"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <path d="M8 1.5 1.5 13h13L8 1.5Z" />
                    <path d="M8 6.5v3.2" strokeLinecap="round" />
                    <circle cx="8" cy="11.4" r="0.5" fill="var(--color-notice)" stroke="none" />
                  </svg>
                  Illustrative sample — not real records
                </span>
                <span className="whitespace-nowrap font-mono text-[11px] text-ink-faint">
                  columns vary by package
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Browse by niche / pricing ===== */}
      <section
        id="pricing"
        className="mx-auto mt-section max-w-6xl scroll-mt-20 px-6"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs tracking-wide text-accent">
                LEADS
              </div>
              <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
                Browse by niche.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-secondary">
              Real Estate is live today, priced and ready to download. The
              other categories are on the way — reach out if you need one
              sooner.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const isLive = category.status === "live";
            const pricing = isLive ? getCategoryPricingSummary(category.slug) : undefined;

            return (
              <Reveal key={category.slug} delay={(index % 3) * 60}>
                <Link
                  href={`/leads/${category.slug}`}
                  className="group flex h-full flex-col rounded-[14px] border border-hairline bg-surface p-5 transition-colors duration-fast hover:border-accent"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-base font-semibold">{category.name}</div>
                    {!isLive && <SoonBadge />}
                  </div>
                  <p className="mt-1.5 text-sm text-ink-secondary">
                    {category.description}
                  </p>
                  <div className="mt-4 font-mono text-xs text-ink-faint">
                    {pricing
                      ? `From $${pricing.fromPriceUsd.toFixed(2)} · ${pricing.packCount} pack size${pricing.packCount > 1 ? "s" : ""}`
                      : "Launching soon"}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={80}>
          <p className="mt-6 text-xs text-ink-faint">
            Need a niche or location we don&rsquo;t list yet?{" "}
            <Link href="/contact" className="text-accent transition-colors duration-fast hover:text-accent-deep">
              Ask for a custom quote &rarr;
            </Link>
          </p>
        </Reveal>
      </section>

      {/* ===== Comparison vs Apollo / Clay ===== */}
      <section id="compare" className="mx-auto mt-section max-w-6xl scroll-mt-20 px-6">
        <Reveal>
          <h2 className="max-w-3xl text-2xl font-semibold md:text-4xl">
            An Apollo.io and Clay.com Alternative for People Who Need One
            List, Not a Platform
          </h2>
          <p className="mt-6 max-w-prose text-ink-secondary">
            Leadspitch is a one-time purchase alternative to Apollo.io and
            Clay.com for anyone who needs a single targeted contact list
            instead of an ongoing sales intelligence subscription. Apollo and
            Clay are built for revenue teams running continuous prospecting
            workflows, which means you keep paying every month whether you
            search once or a thousand times. Leadspitch charges once for the
            exact list you need, and the file is yours to keep.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 overflow-x-auto rounded-lg border border-hairline bg-surface shadow-elevated">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="border-b border-hairline">
                  <th scope="col" className="px-6 py-4" aria-label="Feature" />
                  <th scope="col" className="px-6 py-4 font-semibold">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-[7px] w-[7px] rounded-sm bg-accent" aria-hidden="true" />
                      Leadspitch
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-ink-secondary"
                  >
                    Apollo.io
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-ink-secondary"
                  >
                    Clay.com
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline-soft align-top">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium"
                    >
                      {row.label}
                    </th>
                    <td className="px-6 py-4 font-medium">{row.leadspitch}</td>
                    <td className="px-6 py-4 text-ink-secondary">{row.apollo}</td>
                    <td className="px-6 py-4 text-ink-secondary">{row.clay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-prose text-ink-secondary">
            Apollo and Clay solve a different problem than the one most
            freelancers and small agencies actually have. They&rsquo;re built
            for teams that need to search a live database continuously. If
            you just need 500 real estate agents in Texas or 300 med spa
            owners in Florida, you don&rsquo;t need a platform. You need a
            file.
          </p>
        </Reveal>
      </section>

      {/* ===== How It Works ===== */}
      <section
        id="how-it-works"
        className="mx-auto mt-section max-w-6xl scroll-mt-20 px-6"
      >
        <Reveal>
          <h2 className="text-2xl font-semibold md:text-4xl">How It Works</h2>
        </Reveal>
        <ol className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 100}
              className={`pt-5 ${index === 0 ? "border-t border-ink" : "border-t border-hairline"}`}
            >
              <span
                className={`font-mono text-[13px] ${index === 0 ? "text-accent" : "text-ink-faint"}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-secondary">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ===== What's Included + Built For ===== */}
      <section className="mx-auto mt-section max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.6fr] md:gap-14">
          <Reveal>
            <h2 className="text-2xl font-semibold md:text-4xl">
              What&rsquo;s Included
            </h2>
            <p className="mt-5 text-ink-secondary">
              One clean XLSX sheet with labelled columns. No watermarks, no
              sample restrictions, and no fields locked behind a higher tier.
              Niche-specific lists add relevant fields for that category —
              real estate lists include license type and brokerage, medical
              lists include practice type and specialty.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-hairline bg-surface sm:grid-cols-2">
              {INCLUDED_FIELDS.map((field, index) => {
                const isLastInRow = index % 2 === 1;
                const isLastRow = index >= INCLUDED_FIELDS.length - (INCLUDED_FIELDS.length % 2 === 0 ? 2 : 1);
                return (
                  <div
                    key={field.label}
                    className={`px-5 py-[18px] ${
                      !isLastRow ? "border-b border-hairline-soft" : ""
                    } ${!isLastInRow ? "sm:border-r sm:border-hairline-soft" : ""}`}
                  >
                    <span className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-1 font-mono text-sm">{field.label}</div>
                  </div>
                );
              })}
              <div className="px-5 py-[18px]">
                <span className="font-mono text-xs text-ink-faint">+</span>
                <div className="mt-1 font-mono text-sm text-ink-secondary">
                  license_type &middot; specialty &middot; more by niche
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h2 className="mt-20 text-2xl font-semibold md:mt-24 md:text-4xl">
            Built For
          </h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {BUILT_FOR_AUDIENCES.map((audience, index) => (
            <Reveal
              key={audience.title}
              as="li"
              delay={(index % 2) * 80}
              className="border-t border-hairline pt-5"
            >
              <h3 className="font-semibold">{audience.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-secondary">
                {audience.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ===== FAQ preview ===== */}
      <section id="faq" className="mx-auto mt-section max-w-6xl scroll-mt-20 px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-14">
          <Reveal>
            <h2 className="text-2xl font-semibold md:text-4xl">
              Questions,
              <br />
              answered.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="border-t border-hairline">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group border-b border-hairline">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-medium [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronIcon />
                  </summary>
                  <p className="max-w-prose pb-6 leading-relaxed text-ink-secondary">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
            <Link
              href="/faq"
              className="mt-8 inline-block text-sm font-medium text-accent transition-colors duration-fast hover:text-accent-deep"
            >
              View all questions
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== Closing CTA ===== */}
      <section id="cta" className="mx-auto my-section max-w-6xl scroll-mt-20 px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-hairline bg-cta-bg px-6 py-16 text-center text-cta-ink md:py-24">
            <GridBackdrop
              mask="radial-gradient(90% 120% at 50% 0%, #000, transparent 75%)"
              lineColor="var(--color-cta-border)"
            />
            <p className="relative mx-auto max-w-2xl text-2xl font-semibold leading-tight md:text-4xl">
              Pick your niche, pay once, and have your list in hand before
              your coffee gets cold.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pricing"
                className="rounded-sm bg-cta-btn-bg px-6 py-3 text-sm font-medium text-cta-btn-ink transition duration-fast ease-out-expo active:scale-[0.98]"
              >
                Browse categories
              </a>
              <Link
                href="/contact"
                className="rounded-sm border border-cta-border px-6 py-3 text-sm font-medium text-cta-ink transition duration-fast ease-out-expo active:scale-[0.98]"
              >
                Get in touch
              </Link>
            </div>
            <p className="relative mt-6 font-mono text-xs text-cta-sub">
              One-time payment &middot; emailed as a secure ZIP &middot;{" "}
              <Link href="/refund-policy" className="underline decoration-cta-border underline-offset-2">
                refund policy
              </Link>{" "}
              applies
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
