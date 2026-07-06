import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "LeadsPitch exists because most freelancers and small agencies don’t need a sales intelligence platform. They need one accurate list, for one niche, for one campaign — a store instead of a platform.",
};

const PRINCIPLES = [
  {
    title: "One price, no upsells.",
    body: "The price you see at checkout is the price you pay. No credits, no seat fees, no “contact sales” for bigger lists.",
  },
  {
    title: "Public data only.",
    body: "Every contact comes from publicly available business records. No LinkedIn scraping, no accounts we shouldn’t have access to, no gray-area data sourcing.",
  },
  {
    title: "Niche over volume.",
    body: "We would rather sell an accurate 1000-contact list for one niche than pad a file with loosely related contacts to make the count look bigger.",
  },
  {
    title: "You own the file.",
    body: "Once you download a list, it’s yours. No expiring access, no re-subscribing to use data you already paid for.",
  },
] as const;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "About" },
  ],
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Intro */}
      <h1 className="text-4xl font-semibold md:text-5xl">
        We Sell Lists, Not Subscriptions
      </h1>
      <p className="mt-8 text-ink-secondary">
        Leadspitch exists because most freelancers and small agencies don&rsquo;t
        need a sales intelligence platform. They need one accurate list, for
        one niche, for one campaign, and they shouldn&rsquo;t have to sign up
        for a monthly tool to get it. Apollo, Clay, and ZoomInfo are built for
        revenue teams running prospecting as a permanent, ongoing job. Most of
        our buyers are running it as a project with a start and an end date,
        which is a different problem that deserves a different product.
      </p>
      <p className="mt-6 text-ink-secondary">
        That gap is the entire reason Leadspitch exists. A freelancer pitching
        website services to salons in one city doesn&rsquo;t need 275 million
        contacts and a monthly seat license. They need 400 salon owners in
        their target area, once. So we built a store instead of a platform:
        pick the niche, pay once, get the file.
      </p>

      {/* How We Source Data */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">
          How We Source Data
        </h2>
        <p className="mt-6 text-ink-secondary">
          We source every list from public business records specific to that
          niche, not from a single generic database stretched across every
          industry. Real estate lists are built from licensing boards,
          brokerage directories, and public agent registries. Legal lists come
          from bar association directories and law firm listings. Home
          services, beauty, and medical/clinic lists come from business
          directories, association listings, and publicly listed practice
          information.
        </p>
        <p className="mt-6 text-ink-secondary">
          This is also where the big platforms actually struggle. Apollo,
          Clay, and similar tools lean heavily on LinkedIn activity and
          corporate contributor networks to build their databases, which works
          well for corporate, LinkedIn-active roles and works poorly for
          independent local business owners who never bothered to build out a
          LinkedIn presence. An HVAC contractor or a solo salon owner is far
          more likely to be listed in a licensing registry or a local business
          directory than to have an active LinkedIn profile feeding someone
          else&rsquo;s waterfall enrichment. We build each list from the
          sources that niche actually shows up in, then run every record
          through email verification before it goes into a file for sale.
        </p>
      </section>

      {/* Who We Are */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Who We Are</h2>
        <p className="mt-6 text-ink-secondary">
          LeadsPitch is a platform built specifically to give freelancers and
          agencies instant access to pre-built, verified lead lists — so you
          spend your time pitching clients, not hunting for contacts. Every
          list is packaged, verified, and ready to download the moment you
          pay. No credits, no subscriptions, no searching.
        </p>
      </section>

      {/* Our Principles */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Our Principles</h2>
        <ul className="mt-8">
          {PRINCIPLES.map((principle) => (
            <li
              key={principle.title}
              className="border-t border-hairline py-6 last:border-b"
            >
              <h3 className="font-medium">{principle.title}</h3>
              <p className="mt-2 text-ink-secondary">{principle.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Trust and Legitimacy */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Trust and Legitimacy
        </h2>
        <p className="mt-6 text-ink-secondary">
          Leadspitch is a real, operating business, not an anonymous data
          dump. Every list goes through email verification before sale, we
          publish sample data so you can check format and quality before you
          buy, and every purchase is backed by our{" "}
          <Link
            href="/refund-policy"
            className="font-medium text-accent transition-colors duration-fast hover:text-accent-deep"
          >
            refund policy
          </Link>
          . If you have a question about a list before or after buying it, you
          can reach us directly through our{" "}
          <Link
            href="/contact"
            className="font-medium text-accent transition-colors duration-fast hover:text-accent-deep"
          >
            contact page
          </Link>
          , and a person answers, not a support ticket queue. We also
          don&rsquo;t collect or resell your customer data. Our business is
          selling lists we&rsquo;ve built ourselves, not brokering yours.
        </p>
      </section>

      {/* Closing CTA */}
      <section className="mt-20 rounded-lg border border-hairline bg-surface px-6 py-12 text-center shadow-hairline">
        <p className="mx-auto max-w-md text-xl font-semibold md:text-2xl">
          Stop paying monthly for a platform you&rsquo;ll use once. Pick your
          niche and get the list.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-surface transition duration-fast ease-out-expo hover:bg-ink-hover active:scale-[0.98]"
        >
          Get in touch
        </Link>
      </section>
    </article>
  );
}
