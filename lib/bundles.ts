// Bundle catalog for /bundles — grouped one-time purchases, two sizes each.

export interface BundleSize {
  priceUsd: number;
  originalPriceUsd: number;
  checkoutUrl: string;
}

export interface Bundle {
  id: string;
  tier: string;
  tierNote: string;
  name: string;
  niches: string[];
  size25k: BundleSize;
  size50k: BundleSize;
}

export interface BundleTier {
  tier: string;
  tagline: string;
  description: string;
  bundles: Bundle[];
}

export const bundleTiers: BundleTier[] = [
  {
    tier: "S",
    tagline: "Care & property",
    description:
      "Everyday-service businesses and professionals people contact daily — verified emails from public directories, yours to keep.",
    bundles: [
      {
        id: "s1-dentists-clinics-beauty",
        tier: "S",
        tierNote: "S1",
        name: "Dentists, Clinics & Beauty",
        niches: ["Dentists", "Clinics", "Beauty & Wellness"],
        size25k: {
          priceUsd: 49.99,
          originalPriceUsd: 66.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s1-dentists-clinics-beauty-wellness-25k/",
        },
        size50k: {
          priceUsd: 89.99,
          originalPriceUsd: 112.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s1-dentists-clinics-beauty-wellness-50k/",
        },
      },
      {
        id: "s2-real-estate-lawyers-home",
        tier: "S",
        tierNote: "S2",
        name: "Real Estate, Lawyers & Home Services",
        niches: ["Real Estate", "Lawyers", "Home Services"],
        size25k: {
          priceUsd: 64.99,
          originalPriceUsd: 88.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s2-real-estate-lawyers-home-services-25k/",
        },
        size50k: {
          priceUsd: 99.99,
          originalPriceUsd: 142.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s2-real-estate-lawyers-home-services-50k/",
        },
      },
    ],
  },
  {
    tier: "A",
    tagline: "Local & commercial",
    description:
      "High-frequency local businesses and the commercial services that keep them running — bundled to stretch further per email.",
    bundles: [
      {
        id: "a1-restaurants-hotels-construction",
        tier: "A",
        tierNote: "A1",
        name: "Restaurants, Hotels & Construction",
        niches: [
          "Restaurants & Cafes",
          "Hotels & Hospitality",
          "Construction & Contractors",
        ],
        size25k: {
          priceUsd: 49.99,
          originalPriceUsd: 65.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s1-restaurants-hotels-hospitality-construction-25k/",
        },
        size50k: {
          priceUsd: 94.99,
          originalPriceUsd: 117.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s1-restaurants-hotels-hospitality-construction-50k/",
        },
      },
      {
        id: "a2-automotive-logistics-agencies",
        tier: "A",
        tierNote: "A2",
        name: "Automotive, Logistics & Agencies",
        niches: [
          "Automotive",
          "Logistics",
          "Agencies & Business Services",
        ],
        size25k: {
          priceUsd: 49.99,
          originalPriceUsd: 68.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s2-automotive-logistics-agencies-business-services-25k/",
        },
        size50k: {
          priceUsd: 89.99,
          originalPriceUsd: 111.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s2-automotive-logistics-agencies-business-services-50k/",
        },
      },
    ],
  },
  {
    tier: "B",
    tagline: "Professional networks",
    description:
      "Knowledge-industry professionals and the events that bring them together — perfect for course sellers and B2B outreach.",
    bundles: [
      {
        id: "b1-education-events-accounting",
        tier: "B",
        tierNote: "B1",
        name: "Education, Events & Accounting",
        niches: [
          "Education & Training",
          "Events & Leisure",
          "Accounting & Finance",
        ],
        size25k: {
          priceUsd: 49.99,
          originalPriceUsd: 64.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s1-education-training-events-leisure-accounting-finance-25k/",
        },
        size50k: {
          priceUsd: 84.99,
          originalPriceUsd: 106.99,
          checkoutUrl:
            "https://whop.com/bundles-leadspitch/bundle-s1-education-training-events-leisure-accounting-finance-50k/",
        },
      },
    ],
  },
];

/** Flattened list of every live bundle. */
export const bundles: Bundle[] = bundleTiers.flatMap((tier) => tier.bundles);

/** Total live bundles / niches shown, for page copy. */
export const BUNDLE_STATS = {
  tiers: bundleTiers.length,
  bundles: bundles.length,
  emails25k: 25000,
  emails50k: 50000,
} as const;
