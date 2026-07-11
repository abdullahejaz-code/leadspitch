import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercent = Math.round(
    (1 - product.priceUsd / product.originalPriceUsd) * 100
  );

  return (
    <div className="flex h-full flex-col rounded-lg border border-hairline bg-surface p-5 shadow-card transition-all duration-base ease-out-expo hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-lift">
      <h3 className="text-base font-semibold leading-snug">{product.name}</h3>

      <div className="mt-3 flex items-baseline gap-2 font-mono">
        <span className="text-2xl font-semibold text-ink">
          {formatPrice(product.priceUsd)}
        </span>
        <span className="text-sm text-ink-faint line-through">
          {formatPrice(product.originalPriceUsd)}
        </span>
        <span className="rounded-sm border border-accent px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent">
          {discountPercent}% off
        </span>
      </div>

      <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-hairline pt-3 font-mono text-xs text-ink-faint">
        <div>
          <dt className="inline">Leads: </dt>
          <dd className="inline text-ink-secondary">
            {product.leadCount.toLocaleString()}+
          </dd>
        </div>
        <div>
          <dt className="inline">Emails: </dt>
          <dd className="inline text-ink-secondary">
            {product.emailCount.toLocaleString()}
          </dd>
        </div>
      </dl>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-secondary">
        {product.description}
      </p>

      <a
        href={product.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-white transition duration-fast ease-out-expo hover:bg-accent-hover active:scale-[0.98]"
      >
        Download
      </a>
    </div>
  );
}
