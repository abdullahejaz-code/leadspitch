import type { Bundle } from "@/lib/bundles";

interface BundleCardProps {
  bundle: Bundle;
}

function formatUsd(value: number): string {
  return `$${value.toFixed(2)}`;
}

function SizeBlock({
  label,
  priceUsd,
  originalPriceUsd,
  checkoutUrl,
}: {
  label: string;
  priceUsd: number;
  originalPriceUsd: number;
  checkoutUrl: string;
}) {
  const saved = originalPriceUsd - priceUsd;
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          {label}
        </span>
        <span className="rounded-sm border border-accent px-1.5 py-0.5 font-mono text-[10px] tracking-[0.04em] text-accent">
          save ${saved.toFixed(2)}
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-end gap-x-2.5 gap-y-1">
        <span className="font-mono text-[clamp(2rem,1.5rem+2.5vw,2.75rem)] font-bold leading-[0.95] tracking-[-0.04em]">
          {formatUsd(priceUsd)}
        </span>
        <div className="pb-0.5">
          <div className="font-mono text-sm text-ink-faint line-through">
            {formatUsd(originalPriceUsd)}
          </div>
        </div>
      </div>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-sm border border-hairline-strong bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink transition duration-fast ease-out-expo hover:border-accent hover:text-accent active:scale-[0.98]"
      >
        Get {label}
      </a>
    </div>
  );
}

export default function BundleCard({ bundle }: BundleCardProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border-[1.5px] border-hairline bg-surface p-6 shadow-card transition-all duration-base ease-out-expo hover:-translate-y-0.5 hover:border-accent hover:shadow-lift sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-accent px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-accent">
          TIER {bundle.tierNote}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          one-time · no subscription
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.02em]">
        {bundle.name}
      </h3>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {bundle.niches.map((niche) => (
          <span
            key={niche}
            className="rounded-sm border border-hairline px-2 py-1 font-mono text-[11px] text-ink-secondary"
          >
            {niche}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-5 border-t border-hairline pt-5">
        <SizeBlock
          label="25,000 emails"
          priceUsd={bundle.size25k.priceUsd}
          originalPriceUsd={bundle.size25k.originalPriceUsd}
          checkoutUrl={bundle.size25k.checkoutUrl}
        />
        <div aria-hidden="true" className="h-px bg-hairline" />
        <SizeBlock
          label="50,000 emails"
          priceUsd={bundle.size50k.priceUsd}
          originalPriceUsd={bundle.size50k.originalPriceUsd}
          checkoutUrl={bundle.size50k.checkoutUrl}
        />
      </div>
    </div>
  );
}
