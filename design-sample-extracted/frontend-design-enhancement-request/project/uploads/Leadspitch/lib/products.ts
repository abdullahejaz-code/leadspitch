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

export const products: Product[] = [
  {
    id: "real-estate-agents-us",
    slug: "real-estate-agents",
    name: "Real Estate Agent Leads",
    description:
      "Verified email leads for real estate agents and brokers, sourced from public licensing and brokerage directories.",
    categorySlug: "real-estate",
    priceUsd: 7.99,
    originalPriceUsd: 15.99,
    leadCount: 3570,
    emailCount: 1000,
    checkoutUrl: "https://workspaceae.gumroad.com/l/dyfumz",
  },
];
