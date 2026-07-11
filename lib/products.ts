// Product catalog for /leads and /leads/[category].

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  priceUsd: number;
  originalPriceUsd: number;
  leadCount: number;
  emailCount: number;
  checkoutUrl: string;
}

// Real Estate products — all figures are real, one-time purchase, no subscription.
export const products: Product[] = [
  {
    id: "real-estate-agents-us-1k",
    slug: "real-estate-agents-1k",
    name: "Real Estate Agent Leads",
    description:
      "Verified email leads for real estate agents and brokers, sourced from public licensing and brokerage directories.",
    categorySlug: "real-estate",
    priceUsd: 7.99,
    originalPriceUsd: 15.99,
    leadCount: 3570,
    emailCount: 1000,
    checkoutUrl: "https://workspaceae.gumroad.com/l/1k_01",
  },
  {
    id: "real-estate-agents-us-5k",
    slug: "real-estate-agents-5k",
    name: "Real Estate Leads - 5k",
    description:
      "Verified email leads for real estate agents and brokers — 5,000 emails from a 42,000+ lead pool, sourced from public licensing and brokerage directories.",
    categorySlug: "real-estate",
    priceUsd: 19.99,
    originalPriceUsd: 39.99,
    leadCount: 42000,
    emailCount: 5000,
    checkoutUrl: "https://workspaceae.gumroad.com/l/5k_emails",
  },
  {
    id: "real-estate-agents-us-12k",
    slug: "real-estate-agents-12k",
    name: "Real Estate Leads — 12K",
    description:
      "Verified email leads for real estate agents and brokers — 12,000 emails from a 42,000+ lead pool, sourced from public licensing and brokerage directories.",
    categorySlug: "real-estate",
    priceUsd: 32.99,
    originalPriceUsd: 65.99,
    leadCount: 42000,
    emailCount: 12000,
    checkoutUrl: "https://workspaceae.gumroad.com/l/12k_01",
  },
  {
    id: "real-estate-agents-us-32k",
    slug: "real-estate-agents-32k",
    name: "Real Estate Leads — 32.9K",
    description:
      "Verified email leads for real estate agents and brokers — 32,900 emails from a 129,400+ lead pool, sourced from public licensing and brokerage directories.",
    categorySlug: "real-estate",
    priceUsd: 43.99,
    originalPriceUsd: 88.99,
    leadCount: 129400,
    emailCount: 32900,
    checkoutUrl: "https://workspaceae.gumroad.com/l/32k_0",
  },
];

/** The one live product, for pages that render a single real card. */
export const realEstateList = products[0];
