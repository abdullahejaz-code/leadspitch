import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CheckTick from "@/components/CheckTick";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "When we refund, and when we can’t — explained plainly. We sell downloadable digital lists, so refunds work differently here than for a physical product. No guesswork, no legal wall.",
};

const REFUND_CASES = [
  {
    lead: "Failed or corrupted delivery.",
    rest: "Your download link doesn’t work, the file won’t open, or it’s empty or damaged.",
  },
  {
    lead: "The product doesn’t match its description.",
    rest: "The list is missing data fields we listed on the product page, or is for the wrong niche or location entirely — not just “smaller than I expected.”",
  },
  {
    lead: "A duplicate or erroneous charge.",
    rest: "You were charged twice for the same list, or charged for the wrong product due to a checkout error.",
  },
];

const NOT_COVERED = [
  {
    title: "Leads going stale over time",
    body: "Every list is a snapshot as of its sourcing date, not a live directory. Some drift is expected, not a defect.",
  },
  {
    title: "Buyer’s remorse",
    body: "Deciding you don’t want the list after downloading it isn’t refundable — the file has already been delivered.",
  },
  {
    title: "Not reading the description first",
    body: "Check the niche, location, and fields before you buy. A field we never listed isn’t a refund-eligible error.",
  },
  {
    title: "Low response from your outreach",
    body: "Reply rates depend on your messaging and sending practices, not the accuracy of the contact data itself.",
  },
];

function SectionNumber({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3.5">
      <span className="font-mono text-[13px] text-accent">{num}</span>
      <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{title}</h2>
    </div>
  );
}

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-shell px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[760px]">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-accent">
            REFUND POLICY
          </p>
          <h1 className="mt-4 text-[clamp(1.9rem,1rem+4vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
            When we refund, and when we can&rsquo;t.
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary">
            We sell downloadable digital products. Because your file is delivered
            instantly and is yours to keep the moment you download it, refunds
            work differently here than they do for a physical product. This page
            tells you exactly when a refund is available and when it isn&rsquo;t,
            so there&rsquo;s no guesswork.
          </p>
        </Reveal>

        {/* 01 general policy */}
        <Reveal>
          <div className="mt-11 border-t border-hairline pt-7">
            <SectionNumber num="01" title="Our general policy" />
            <p className="mt-3.5 text-[15.5px] leading-relaxed text-ink-secondary">
              All sales are final once a list has been downloaded. A digital file
              has value the second it&rsquo;s opened, so &ldquo;I changed my
              mind&rdquo; after downloading isn&rsquo;t something we can refund —
              if we did, anyone could buy a list, use it, and then ask for their
              money back. Keeping this line firm is what lets us keep prices low
              and fair for everyone buying honestly.
            </p>
          </div>
        </Reveal>

        {/* 02 when we refund */}
        <Reveal>
          <div className="mt-9 border-t border-hairline pt-7">
            <SectionNumber num="02" title="When we’ll refund or replace your file" />
            <div className="mt-4 flex flex-col gap-3.5">
              {REFUND_CASES.map((c) => (
                <div key={c.lead} className="flex items-start gap-3">
                  <CheckTick size={15} className="mt-1 shrink-0 text-accent" />
                  <span className="text-[15.5px] leading-relaxed text-ink-secondary">
                    <span className="font-medium text-ink">{c.lead}</span>{" "}
                    {c.rest}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">
              If any of these happen, contact us and we&rsquo;ll fix it — either
              by resending a corrected file or refunding your payment.
            </p>
          </div>
        </Reveal>

        {/* 03 what isn't covered */}
        <Reveal>
          <div className="mt-9 border-t border-hairline pt-7">
            <SectionNumber num="03" title="What isn’t covered" />
            <p className="mt-3.5 text-[15px] leading-relaxed text-ink-secondary">
              A few things are normal with public business data and aren&rsquo;t
              grounds for a refund:
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {NOT_COVERED.map((n) => (
                <div
                  key={n.title}
                  className="rounded-md border border-hairline bg-surface p-5"
                >
                  <div className="text-[14.5px] font-semibold">{n.title}</div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-secondary">
                    {n.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 04 how to request */}
        <Reveal>
          <div className="mt-9 border-t border-hairline pt-7">
            <SectionNumber num="04" title="How to request a refund" />
            <p className="mt-3.5 text-[15.5px] leading-relaxed text-ink-secondary">
              Send us a message through our{" "}
              <Link
                href="/contact"
                className="font-medium text-accent transition-colors hover:text-accent-hover"
              >
                contact form
              </Link>{" "}
              within 7 days of your purchase. Include your order number or the
              email address you used at checkout, the name of the product you
              bought, and a short description of the issue. We review every
              request individually and typically respond within{" "}
              {SITE.responseTime}. Requests made after 7 days
              are handled at our discretion and aren&rsquo;t guaranteed.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-md border border-hairline bg-surface p-4">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-[14.5px] leading-relaxed text-ink-secondary">
                Not sure a list fits before you buy?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  Ask us first
                </Link>{" "}
                — we&rsquo;d rather answer upfront than sort out a refund
                afterward.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
