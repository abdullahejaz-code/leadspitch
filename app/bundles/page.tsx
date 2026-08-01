import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CheckTick from "@/components/CheckTick";
import BundleCard from "@/components/BundleCard";
import { bundleTiers, BUNDLE_STATS } from "@/lib/bundles";

export const metadata: Metadata = {
  title: "Bundles",
  description:
    "Curated multi-niche lead bundles — 25k and 50k verified emails in one purchase, grouped across Tier S, Tier A, and Tier B. Pay once, own the file.",
};

export default function BundlesPage() {
  return (
    <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
      {/* header */}
      <Reveal>
        <p className="font-mono text-xs tracking-[0.14em] text-accent">
          BUNDLES — 3 TIERS, {BUNDLE_STATS.bundles} NICHE SETS
        </p>
        <h1 className="mt-4 max-w-[24ch] text-[clamp(2rem,1rem+4vw,2.75rem)] font-semibold tracking-[-0.03em]">
          Niche lists, bundled. Pay once, keep them all.
        </h1>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-ink-secondary">
          Each bundle groups several one-time lists into a single purchase — no
          subscription, nothing to cancel. Every bundle ships in two sizes:
          {" "}
          <span className="font-mono font-bold text-ink">25,000</span> and{" "}
          <span className="font-mono font-bold text-ink">50,000</span> verified
          emails, built from public business records.
        </p>
      </Reveal>

      {/* reassurance strip */}
      <Reveal delay={80}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-hairline bg-surface p-5 sm:px-6">
          <div className="flex items-center gap-2">
            <CheckTick size={14} className="shrink-0 text-accent" />
            <span className="text-sm text-ink-secondary">
              one-time purchase · no subscription
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckTick size={14} className="shrink-0 text-accent" />
            <span className="text-sm text-ink-secondary">
              verified emails from public directories
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckTick size={14} className="shrink-0 text-accent" />
            <span className="text-sm text-ink-secondary">
              secure delivery · yours to keep
            </span>
          </div>
        </div>
      </Reveal>

      {/* tiers */}
      {bundleTiers.map((tier) => (
        <section key={tier.tier} className="mt-14">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <h2 className="font-mono text-sm font-bold tracking-[0.1em] text-accent">
                TIER {tier.tier}
              </h2>
              <span className="font-mono text-[13px] text-ink-secondary">
                {tier.tagline}
              </span>
            </div>
            <p className="mt-2 max-w-[64ch] text-[15px] leading-relaxed text-ink-secondary">
              {tier.description}
            </p>
          </Reveal>

          <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2">
            {tier.bundles.map((bundle, index) => (
              <Reveal key={bundle.id} delay={index * 70}>
                <BundleCard bundle={bundle} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* coming soon slot */}
      <Reveal>
        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-lg border border-dashed border-hairline-strong bg-surface p-7 sm:flex-row sm:items-center sm:px-8">
          <div>
            <div className="font-mono text-xs tracking-[0.14em] text-ink-faint">
              NEXT UP
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">
              More bundles coming soon
            </h3>
            <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-ink-secondary">
              New niche combinations are in the pipeline — no invented counts,
              no fake “save X%”. They land when the data is real and verified.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-sm border border-hairline-strong bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink transition duration-fast ease-out-expo hover:border-accent hover:text-accent active:scale-[0.98]"
          >
            Ask about a niche
          </Link>
        </div>
      </Reveal>

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
              You pay once, download the file, and the leads are yours to keep —
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
