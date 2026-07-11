import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CheckTick from "@/components/CheckTick";
import { realEstateList } from "@/lib/products";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One list, one price. Nothing renews. The Real Estate list is a one-time $7.99 launch purchase (regular $15.99) — 1,000 verified emails from a 3,570-lead pool. More niches coming.",
};

const VERIFIED_EMAILS = realEstateList.emailCount.toLocaleString("en-US");
const LEAD_POOL = realEstateList.leadCount.toLocaleString("en-US");
const PRICE = `$${realEstateList.priceUsd.toFixed(2)}`;
const REGULAR = `$${realEstateList.originalPriceUsd.toFixed(2)}`;

function NextNicheSlot({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex min-h-[360px] flex-col items-start justify-center gap-3.5 rounded-lg border border-dashed border-hairline-strong bg-surface p-8">
      <span className="rounded-sm border border-hairline px-2 py-1 font-mono text-[11px] tracking-[0.06em] text-ink-faint">
        NEXT NICHE
      </span>
      <span className="font-mono text-[13px] text-ink-secondary">{label}</span>
      <p className="font-mono text-xs leading-relaxed text-ink-faint">{note}</p>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
      {/* header */}
      <Reveal>
        <p className="font-mono text-xs tracking-[0.14em] text-accent">
          PRICING — PAY ONCE, OWN THE FILE
        </p>
        <h1 className="mt-4 max-w-[22ch] text-[clamp(2rem,1rem+4vw,2.75rem)] font-semibold tracking-[-0.03em]">
          One list, one price. Nothing renews.
        </h1>
        <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-ink-secondary">
          Every LeadsPitch list is a one-time purchase — you pay once at
          checkout, download the file, and there is nothing to cancel later
          because nothing renews. Only the Real Estate list is live today; more
          niches are coming.
        </p>
      </Reveal>

      {/* pricing grid */}
      <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
        {/* REAL PRODUCT */}
        <Reveal>
          <div className="flex h-full flex-col rounded-lg border-[1.5px] border-accent bg-surface p-6 shadow-lift sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-lg font-semibold sm:text-xl">
                  Real Estate Agent Leads
                </div>
                <div className="mt-1.5 font-mono text-xs text-ink-secondary">
                  verified agents &amp; brokers · US
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-accent px-2 py-1 font-mono text-[10px] tracking-[0.06em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                LIVE
              </span>
            </div>

            {/* giant mono price — wraps its strike cleanly at 390px */}
            <div className="mt-6 flex flex-wrap items-end gap-x-3.5 gap-y-1">
              <span className="font-mono text-[clamp(3rem,2rem+6vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
                {PRICE}
              </span>
              <div className="pb-2">
                <div className="font-mono text-sm text-ink-faint line-through">
                  {REGULAR}
                </div>
                <div className="font-mono text-xs text-accent">launch price</div>
              </div>
            </div>
            <div className="mt-3 font-mono text-[13px] text-ink-secondary">
              one-time · no subscription
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-5">
              <div className="flex items-start gap-2.5">
                <CheckTick size={14} className="mt-1 shrink-0 text-accent" />
                <span className="text-sm leading-snug sm:text-[14.5px]">
                  <span className="font-mono font-bold">{VERIFIED_EMAILS}</span>{" "}
                  verified emails, from a{" "}
                  <span className="font-mono font-bold">{LEAD_POOL}</span>-lead
                  pool
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckTick size={14} className="mt-1 shrink-0 text-accent" />
                <span className="text-sm leading-snug text-ink-secondary sm:text-[14.5px]">
                  clean XLSX — name, email, city, license, brokerage
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckTick size={14} className="mt-1 shrink-0 text-accent" />
                <span className="text-sm leading-snug text-ink-secondary sm:text-[14.5px]">
                  instant download · yours to keep forever
                </span>
              </div>
            </div>

            <a
              href={realEstateList.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 rounded-sm bg-accent px-4 py-3.5 text-center text-[15px] font-medium text-white transition duration-fast ease-out-expo hover:bg-accent-hover active:scale-[0.98]"
            >
              Get the Real Estate list — {PRICE}
            </a>
            <Link
              href="/#04"
              className="mt-2.5 text-center text-[13px] text-ink-secondary transition-colors hover:text-accent"
            >
              See a sample first
            </Link>
          </div>
        </Reveal>

        {/* placeholder slots — never invented packs, counts, or "save X%" */}
        <Reveal delay={60}>
          <NextNicheSlot
            label="Legal — in sourcing"
            note="No pack, count, price, or per-email rate until the list actually ships. Built from public bar association directories."
          />
        </Reveal>
        <Reveal delay={120}>
          <NextNicheSlot
            label="Home services · beauty · medical"
            note="Empty by design — never an invented count or a fake “save X%”."
          />
        </Reveal>
      </div>

      {/* reassurance line */}
      <Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 rounded-lg border border-hairline bg-surface p-7 sm:px-8">
          <div className="flex max-w-[64ch] items-start gap-3.5">
            <CheckTick size={18} className="mt-1 shrink-0 text-accent" />
            <p className="text-[15px] leading-relaxed text-ink-secondary sm:text-[15.5px]">
              <span className="font-medium text-ink">
                One-time, not a subscription.
              </span>{" "}
              There is no account, no card kept on file, and nothing to cancel.
              You pay once, download the XLSX, and the file is yours to keep —
              every purchase is backed by our refund policy.
            </p>
          </div>
          <Link
            href="/refund-policy"
            className="whitespace-nowrap text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Read the Refund Policy →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
