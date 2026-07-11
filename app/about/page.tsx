import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { toJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "LeadsPitch exists because most freelancers and small agencies don’t need a sales-intelligence platform — they need one accurate list, for one niche, for one campaign. So we built a store instead of a subscription.",
};

const METHOD_POINTS = [
  "Public business records, per niche — never one generic database stretched across every industry.",
  "State licensing boards, brokerage directories, and public agent registries.",
  "Every record run through email verification before it goes into a file for sale.",
];

const PRINCIPLES = [
  {
    title: "One price, no upsells",
    body: "The price you see at checkout is the price you pay. No credits, no seat fees, no “contact sales” for bigger lists.",
  },
  {
    title: "Public data only",
    body: "Every contact comes from publicly available business records. No LinkedIn scraping, no accounts we shouldn’t have, no gray-area sourcing.",
  },
  {
    title: "Niche over volume",
    body: "We would rather sell an accurate 1,000-contact list for one niche than pad a file with loosely related contacts to make the count look bigger.",
  },
  {
    title: "You own the file",
    body: "Once you download a list, it’s yours. No expiring access, no re-subscribing to use data you already paid for.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://leadspitch.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://leadspitch.com/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
      />

      {/* intro */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-shell px-5 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.14em] text-accent">
              ABOUT LEADSPITCH
            </p>
            <h1 className="mt-4 max-w-[20ch] text-[clamp(2rem,1rem+4.5vw,2.875rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Why we built a store for lead lists, instead of a subscription
              platform.
            </h1>
            <div className="mt-7 grid gap-10 md:grid-cols-2">
              <p className="text-[17px] leading-relaxed text-ink-secondary">
                LeadsPitch exists because most freelancers and small agencies
                don’t need a sales-intelligence platform. They need one accurate
                list, for one niche, for one campaign — and they shouldn’t have to
                sign up for a monthly tool to get it. Apollo, Clay, and ZoomInfo
                are built for revenue teams running prospecting as a permanent,
                ongoing job. Most of our buyers are running it as a project with a
                start and an end date.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-secondary">
                That gap is the entire reason LeadsPitch exists. A freelancer
                pitching website services to salons in one city doesn’t need 275
                million contacts and a monthly seat license. They need 400 salon
                owners in their target area, once. So we built a store: pick the
                niche, pay once, get the file.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* methodology */}
      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-shell px-5 py-14 md:px-10">
          <div className="grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.1em] text-accent">
                METHODOLOGY
              </p>
              <h2 className="mt-3.5 text-3xl font-semibold tracking-[-0.025em]">
                How we source data
              </h2>
              <div className="mt-6 flex flex-col gap-3.5">
                {METHOD_POINTS.map((point, i) => (
                  <div key={point} className="flex items-baseline gap-3">
                    <span className="shrink-0 font-mono text-[13px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-ink-secondary">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-base leading-relaxed text-ink-secondary">
                We source every list from public business records specific to that
                niche. Real estate lists are built from licensing boards,
                brokerage directories, and public agent registries. Legal lists
                come from bar-association directories and law-firm listings. Home
                services, beauty, and medical lists come from business
                directories, association listings, and publicly listed practice
                information.
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-secondary">
                This is also where the big platforms struggle. Apollo, Clay, and
                similar tools lean heavily on LinkedIn activity, which works well
                for corporate roles and poorly for independent local owners who
                never built a LinkedIn presence. An HVAC contractor or a solo
                salon owner is far more likely to appear in a licensing registry
                than in someone else’s enrichment waterfall. We build each list
                from the sources that niche actually shows up in.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* founder — no photo, no monogram */}
      <section className="border-b border-hairline bg-surface-2">
        <div className="mx-auto max-w-shell px-5 py-20 md:px-10">
          <Reveal>
            <p className="text-center font-mono text-xs tracking-[0.1em] text-accent">
              FOUNDER
            </p>
            <div className="mt-5 text-center font-mono text-[clamp(2rem,1rem+5vw,3.75rem)] font-bold leading-none tracking-[-0.04em]">
              Abdullah Ejaz
            </div>
            <div className="mt-3.5 text-center font-mono text-[13px] tracking-[0.08em] text-ink-secondary">
              FOUNDER · BUILDS EVERY LIST
            </div>

            <div className="mx-auto mt-12 max-w-[60ch] text-center">
              <div
                aria-hidden="true"
                className="font-mono text-[64px] leading-none text-hairline-strong"
              >
                &ldquo;
              </div>
              <blockquote className="-mt-4 text-2xl font-medium leading-[1.5] tracking-[-0.015em]">
                {SITE.founderQuote}
              </blockquote>
            </div>

            <div className="mx-auto mt-11 max-w-[56ch] border-t border-hairline pt-7 text-center">
              <div className="font-mono text-[11px] tracking-[0.1em] text-ink-faint">
                WHAT WE&rsquo;RE BUILDING TOWARD
              </div>
              <p className="mt-3.5 leading-relaxed text-ink-secondary">
                {SITE.founderGoal}
              </p>
            </div>

            <div className="mx-auto mt-9 flex w-fit items-center gap-2.5 rounded-md border border-hairline bg-surface px-3.5 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-ink-secondary">
                a real person answers your email — not a ticket queue
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* principles */}
      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-shell px-5 py-14 md:px-10">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[13px] text-accent">—</span>
              <h2 className="text-3xl font-semibold tracking-[-0.025em]">
                Our principles
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-x-12 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 60}>
                <div className="border-t border-hairline py-6">
                  <h3 className="text-[17px] font-semibold">{p.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-secondary">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* trust + CTA */}
      <section className="bg-surface-2">
        <div className="mx-auto max-w-shell px-5 py-14 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                A real, operating business — not an anonymous data dump.
              </h2>
              <p className="mt-4 max-w-[60ch] leading-relaxed text-ink-secondary">
                Every list goes through email verification before sale, we
                publish sample data so you can check format and quality before you
                buy, and every purchase is backed by our refund policy. We don’t
                collect or resell your customer data — our business is selling
                lists we’ve built ourselves, not brokering yours.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-lg border border-hairline bg-band p-8 text-white">
                <div className="text-xl font-semibold tracking-[-0.015em]">
                  Have a question before you buy?
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">
                  Ask about a niche, a custom pull, or the sample. A person reads
                  every message.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 flex items-center justify-between gap-3 rounded-sm bg-accent px-4 py-3.5 text-white transition duration-fast ease-out-expo hover:bg-accent-hover"
                >
                  <span className="text-[14.5px] font-medium">Get in touch</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
