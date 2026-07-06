// Lead-list categories for /leads and /leads/[category].

export interface Category {
  slug: string;
  name: string;
  description: string;
  status: "live" | "soon";
}

export const categories: Category[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Verified email leads for real estate agents and brokers, sourced from public licensing and brokerage directories.",
    status: "live",
  },
  {
    slug: "legal",
    name: "Legal",
    description:
      "Verified email leads for law firms and legal professionals, sourced from public bar association directories.",
    status: "soon",
  },
  {
    slug: "home-services",
    name: "Home Services",
    description:
      "Verified email leads for contractors and home service providers, sourced from public licensing boards.",
    status: "soon",
  },
  {
    slug: "beauty",
    name: "Beauty",
    description:
      "Verified email leads for salons, spas, and beauty professionals, sourced from public business directories.",
    status: "soon",
  },
  {
    slug: "medical",
    name: "Medical",
    description:
      "Verified email leads for medical and healthcare practices, sourced from public licensing directories.",
    status: "soon",
  },
];
