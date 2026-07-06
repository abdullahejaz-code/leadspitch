import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "LeadsPitch — Buy One Lead List. Not Another Subscription.",
  },
  description:
    "Leadspitch sells pre-packaged, niche-specific business contact lists in real estate, legal, home services, beauty, and medical. Pick a category, pay once, and download a ready-to-use XLSX file in minutes. No login, no credits, no monthly charge.",
};

const COMPARISON_ROWS = [
  {
    label: "Pricing",
    leadspitch: "One-time payment, $7.99–$15.99 per 1k list",
    apollo: "$49–$119 per user, per month",
    clay: "Credit-based, costs stack across 100+ connected data providers",
  },
  {
    label: "Access",
    leadspitch: "Instant ZIP/XLSX download after checkout",
    apollo: "Web platform login, filter-and-search workflow",
    clay: "Spreadsheet-style workspace, requires configuration",
  },
  {
    label: "Commitment",
    leadspitch: "None. Buy once, keep the file forever",
    apollo: "Monthly or annual subscription",
    clay: "Monthly subscription plus ongoing per-enrichment credit spend",
  },
  {
    label: "Setup",
    leadspitch: "None. Open the file and start emailing",
    apollo: "Build filters, connect CRM, set up sequences",
    clay: "Build enrichment waterfalls and workflows before you get usable data",
  },
] as const;

const HOW_IT_WORKS_STEPS = [
  {
    title: "Pick your niche and location.",
    body: "Choose a category (real estate, legal, home services, beauty, medical and more) and narrow it by state, city, or ZIP if you want a tighter list.",
  },
  {
    title: "Pay once at checkout.",
    body: "No account creation, no recurring card charge, no credit system to figure out. One price, one payment.",
  },
  {
    title: "Download instantly.",
    body: "Your list arrives as a ZIP file containing a clean XLSX, ready to import into your CRM, cold email tool, or spreadsheet of choice.",
  },
] as const;

const BUILT_FOR_AUDIENCES = [
  {
    title: "Freelancers",
    body: "You’re pitching one service to one niche and don’t need a $50/month tool sitting idle between projects. Buy the list for the job in front of you.",
  },
  {
    title: "Agencies",
    body: "Running outreach for multiple clients means multiple niches. Buy a separate list per client or per campaign without per-seat pricing eating into your margin.",
  },
  {
    title: "Cold email operators",
    body: "You need volume and a fresh list to rotate into a new domain or campaign. Skip the credit math and get a flat file you can load straight into your sender.",
  },
  {
    title: "Solo consultants and SDRs",
    body: "You’re prospecting alone, not managing a team subscription. Get the exact contacts for your target niche without justifying a platform license to anyone.",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Is there a cheaper alternative to Apollo.io for small agencies?",
    answer:
      "Yes. Leadspitch costs a one-time $7.99–$15.99 per 1k list instead of Apollo’s $49–$119 per user, per month. If you only need contacts for one niche or one campaign, a single purchase is cheaper than even one month of an Apollo subscription.",
  },
  {
    question: "Can I buy a lead list without a monthly subscription?",
    answer:
      "Yes. Every Leadspitch list is a one-time purchase. You pay once at checkout, download the file, and there is nothing to cancel later because nothing renews.",
  },
  {
    question: "Is it legal to buy an email list and cold email people?",
    answer:
      "Yes, cold emailing business contacts is legal in the US under CAN-SPAM as long as you include a working unsubscribe link and accurate sender information. Leadspitch lists are built from publicly available business contact information for exactly this kind of B2B outreach. You’re still responsible for how you use the list, so follow CAN-SPAM (or GDPR, if you’re emailing into the EU/UK).",
  },
  {
    question: "What file format do lead lists come in?",
    answer:
      "Every list is delivered as a ZIP file containing an XLSX spreadsheet. XLSX opens directly in Excel, Google Sheets, or any CRM and cold email tool that accepts spreadsheet imports.",
  },
  {
    question:
      "Do I need Apollo or ZoomInfo if I only need one list, not ongoing prospecting?",
    answer:
      "No. Apollo and ZoomInfo are built for continuous, live database searching, which is why they charge monthly. If you need a defined list for a specific niche and don’t plan to search a live database every week, a one-time list purchase gets you the same contacts for a fraction of the cost.",
  },
] as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LeadsPitch",
  description:
    "Leadspitch sells pre-packaged, niche-specific business contact lists in real estate, legal, home services, beauty, and medical. Pick a category, pay once, and download a ready-to-use XLSX file in minutes. No login, no credits, no monthly charge.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-base ease-out-expo group-open:rotate-45"
    >
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-section">
        <h1 className="max-w-4xl text-4xl font-semibold md:text-6xl">
          Buy One Lead List. Not Another Subscription.
        </h1>
        <p className="mt-6 max-w-prose text-lg text-ink-secondary">
          Leadspitch sells pre-packaged, niche-specific business contact lists
          in real estate, legal, home services, beauty, and medical. Pick a
          category, pay once, and download a ready-to-use XLSX file in minutes.
          No login, no credits, no monthly charge.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#how-it-works"
            className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-surface transition duration-fast ease-out-expo hover:bg-[#2a2a2f] active:scale-[0.98]"
          >
            See how it works
          </a>
          <Link
            href="/faq"
            className="rounded-sm border border-hairline bg-surface px-5 py-2.5 text-sm font-medium transition duration-fast ease-out-expo hover:border-ink-faint active:scale-[0.98]"
          >
            Read the FAQ
          </Link>
        </div>
      </section>

      {/* Comparison vs Apollo / Clay */}
      <section className="mx-auto mt-section max-w-6xl px-6">
        <h2 className="max-w-3xl text-2xl font-semibold md:text-4xl">
          An Apollo.io and Clay.com Alternative for People Who Need One List,
          Not a Platform
        </h2>
        <p className="mt-6 max-w-prose text-ink-secondary">
          Leadspitch is a one-time purchase alternative to Apollo.io and
          Clay.com for anyone who needs a single targeted contact list instead
          of an ongoing sales intelligence subscription. Apollo and Clay are
          built for revenue teams running continuous prospecting workflows,
          which means you keep paying every month whether you search once or a
          thousand times. Leadspitch charges once for the exact list you need,
          and the file is yours to keep.
        </p>

        <div className="mt-12 overflow-x-auto rounded-lg border border-hairline bg-surface shadow-hairline">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="px-6 py-4" aria-label="Feature" />
                <th scope="col" className="px-6 py-4 font-semibold">
                  Leadspitch
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-ink-secondary"
                >
                  Apollo.io
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-ink-secondary"
                >
                  Clay.com
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline align-top">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium"
                  >
                    {row.label}
                  </th>
                  <td className="px-6 py-4 font-medium">{row.leadspitch}</td>
                  <td className="px-6 py-4 text-ink-secondary">{row.apollo}</td>
                  <td className="px-6 py-4 text-ink-secondary">{row.clay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-prose text-ink-secondary">
          Apollo and Clay solve a different problem than the one most
          freelancers and small agencies actually have. They&rsquo;re built for
          teams that need to search a live database continuously. If you just
          need 500 real estate agents in Texas or 300 med spa owners in
          Florida, you don&rsquo;t need a platform. You need a file.
        </p>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="mx-auto mt-section max-w-6xl scroll-mt-24 px-6"
      >
        <h2 className="text-2xl font-semibold md:text-4xl">How It Works</h2>
        <ol className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="border-t border-hairline pt-6"
            >
              <span className="font-mono text-sm text-ink-faint">
                {index + 1}
              </span>
              <h3 className="mt-3 font-medium">{step.title}</h3>
              <p className="mt-2 text-ink-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Built For */}
      <section className="mx-auto mt-section max-w-6xl px-6">
        <h2 className="text-2xl font-semibold md:text-4xl">Built For</h2>
        <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
          {BUILT_FOR_AUDIENCES.map((audience) => (
            <li key={audience.title} className="border-t border-hairline pt-6">
              <h3 className="font-medium">{audience.title}</h3>
              <p className="mt-2 text-ink-secondary">{audience.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* What's Included */}
      <section className="mx-auto mt-section max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <h2 className="text-2xl font-semibold md:text-4xl">
            What&rsquo;s Included
          </h2>
          <p className="max-w-prose text-ink-secondary">
            Every Leadspitch list includes business name, contact name, direct
            email address, phone number where publicly available, company or
            practice name, physical address, and website URL, organized in a
            single XLSX sheet with clean column headers. Niche-specific lists
            also include relevant fields for that category. For example, real
            estate lists include license type and brokerage, and medical/clinic
            lists include practice type and specialty. Every list is delivered
            as a ZIP file immediately after purchase, with no watermarks, no
            sample restrictions, and no fields locked behind a higher tier.
          </p>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mx-auto mt-section max-w-6xl px-6">
        <h2 className="text-2xl font-semibold md:text-4xl">FAQ</h2>
        <div className="mt-8 border-t border-hairline">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <PlusIcon />
              </summary>
              <p className="max-w-prose pb-6 text-ink-secondary">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <Link
          href="/faq"
          className="mt-8 inline-block text-sm font-medium text-accent transition-colors duration-fast hover:text-accent-deep"
        >
          View all questions
        </Link>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto my-section max-w-6xl px-6">
        <div className="rounded-lg border border-hairline bg-surface px-6 py-16 text-center shadow-hairline md:py-24">
          <p className="mx-auto max-w-2xl text-2xl font-semibold md:text-4xl">
            Pick your niche, pay once, and have your list in hand before your
            coffee gets cold.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-surface transition duration-fast ease-out-expo hover:bg-[#2a2a2f] active:scale-[0.98]"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
