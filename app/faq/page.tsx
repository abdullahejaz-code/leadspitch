import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { toJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Everything about buying a LeadsPitch list, in our own words: what it is, who it’s for, how we compare to Apollo, Clay, and ZoomInfo, where the data comes from, file formats, delivery, the legality of cold email, and refunds.",
};

// Copy is first-person ("we") throughout — the company speaking, not an outside
// reviewer.
const ITEMS: FaqItem[] = [
  {
    question: "What is LeadsPitch?",
    answer:
      "LeadsPitch is a store that sells pre-packaged, niche-specific business contact lists as one-time purchases. You pick a category like real estate, legal, home services, beauty, or medical, pay once, and download a ready-to-use XLSX file — instead of subscribing to a search platform.",
  },
  {
    question: "Who is LeadsPitch for?",
    answer:
      "We built LeadsPitch for freelancers, small agencies, cold-email operators, and solo consultants who need a targeted list for a specific niche rather than ongoing access to a live database. If you’re running outreach as a single campaign or project instead of a permanent function, buying one list from us is cheaper and simpler than licensing a platform.",
  },
  {
    question: "Are you a cheaper alternative to Apollo.io for small agencies?",
    answer:
      "Yes. We charge a one-time $7.99–$15.99 per 1k list instead of Apollo’s $49–$119 per user, per month, so if you only need contacts for one niche or one campaign, a single purchase from us costs less than even one month of an Apollo subscription. Apollo is the better fit if you’re running continuous, live prospecting across many industries and need search, enrichment, and outreach tools in one platform.",
  },
  {
    question:
      "Do I need Apollo or ZoomInfo if I only need one list, not ongoing prospecting?",
    answer:
      "No. Apollo and ZoomInfo are built for continuous, live database searching, which is why they charge monthly. If you need a defined list for one niche and don’t plan to search a live database every week, a one-time list from us gets you the same contacts for a fraction of the cost.",
  },
  {
    question: "Where does your contact data come from?",
    answer:
      "We build every list from public business records specific to that niche — licensing boards, bar-association directories, business directories, and publicly listed practice or company information. We don’t scrape LinkedIn profiles or pull from data-sharing networks; we source each niche from wherever that type of business is actually publicly listed.",
  },
  {
    question: "How accurate are your lists compared to Apollo or Clay?",
    answer:
      "We run every contact through email verification before it goes into a list for sale — the same core method large platforms use, applied to a narrower, purpose-built list instead of a massive general database. Because we source per niche rather than aggregating everything into one database, we avoid the LinkedIn-dependency gap that leaves large platforms with weak coverage of independent local businesses like contractors and salon owners.",
  },
  {
    question: "Do your lists include phone numbers?",
    answer:
      "Yes, where a phone number is publicly available for that contact. Coverage varies by niche, since some public sources — like licensing boards — list phone numbers more consistently than others, such as general business directories.",
  },
  {
    question: "What file format do lists come in?",
    answer:
      "Every list is delivered as a ZIP file containing an XLSX spreadsheet. XLSX opens directly in Excel or Google Sheets and imports cleanly into most CRM and cold-email tools.",
  },
  {
    question: "How fast will I receive my list after paying?",
    answer:
      "Delivery is secure and fast. Once your payment is confirmed, your download link is sent right away, with no manual processing or waiting period.",
  },
  {
    question: "Can I buy a list without a subscription?",
    answer:
      "Yes. Every purchase is a one-time payment. There’s no account required, no recurring charge, and nothing to cancel later, because nothing renews.",
  },
  {
    question: "Is it legal to buy an email list and cold email people?",
    answer:
      "Yes — cold emailing business contacts is legal in the US under CAN-SPAM, as long as your message includes accurate sender information and a working unsubscribe link. Our lists are built from publicly available business contact information for exactly this kind of B2B outreach. You’re still responsible for how you use the list, so follow CAN-SPAM, or GDPR if you’re emailing into the EU or UK.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, in specific cases — a failed or corrupted download, a file that doesn’t match its description, or a duplicate charge. Because our lists are downloadable data products, our terms are stricter than for physical goods, so check our Refund Policy for the full details before you buy.",
  },
  {
    question: "How do I contact support?",
    answer: `The fastest way to reach us is through our contact form — a person handles every message, not an automated ticket queue, and we typically reply within ${SITE.responseTime}.`,
    node: (
      <p>
        The fastest way to reach us is through our{" "}
        <Link
          href="/contact"
          className="text-accent transition-colors hover:text-accent-hover"
        >
          contact form
        </Link>{" "}
        — a person handles every message, not an automated ticket queue, and we
        typically reply within {SITE.responseTime}.
      </p>
    ),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-shell px-5 py-16 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
      />
      <Reveal>
        <p className="font-mono text-xs tracking-[0.14em] text-accent">
          FREQUENTLY ASKED QUESTIONS
        </p>
        <h1 className="mt-4 max-w-[24ch] text-[clamp(2rem,1rem+4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Everything about buying a list, in our own words.
        </h1>
        <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-ink-secondary">
          If you’re weighing us against Apollo, Clay, or ZoomInfo, or you just
          want to know how the file works, here’s how we answer the questions we
          get most.
        </p>
      </Reveal>

      <div className="mt-9">
        <FaqAccordion items={ITEMS} />
      </div>

      <Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-lg border border-hairline bg-surface p-6 sm:px-7">
          <div>
            <div className="text-[17px] font-semibold">Still have a question?</div>
            <p className="mt-1.5 text-[14.5px] text-ink-secondary">
              Ask us before you buy — we&rsquo;d rather answer upfront than sort
              out a refund after.
            </p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-sm bg-accent px-5 py-3 text-sm font-medium text-white transition duration-fast ease-out-expo hover:bg-accent-hover active:scale-[0.98]"
          >
            Contact us
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
