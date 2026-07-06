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
    <div className="rounded-lg border border-hairline bg-surface p-8 shadow-hairline">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="mt-2 max-w-prose text-ink-secondary">
            {product.description}
          </p>
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm text-ink-faint">
            <div>
              <dt className="inline">Leads: </dt>
              <dd className="inline text-ink-secondary">
                {product.leadCount.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="inline">Verified emails: </dt>
              <dd className="inline text-ink-secondary">
                {product.emailCount.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-2xl font-semibold text-ink">
              {formatPrice(product.priceUsd)}
            </span>
            <span className="text-ink-faint line-through">
              {formatPrice(product.originalPriceUsd)}
            </span>
            <span className="rounded-sm border border-hairline px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent">
              {discountPercent}% off
            </span>
          </div>
          <a
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-surface transition duration-fast ease-out-expo hover:bg-[#2a2a2f] active:scale-[0.98]"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
