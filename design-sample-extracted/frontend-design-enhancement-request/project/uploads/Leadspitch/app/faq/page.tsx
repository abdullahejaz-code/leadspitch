import type { Metadata } from "next";
import FaqAccordion, { type FaqCategory } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Leadspitch: what it is, who it is for, where the contact data comes from, file formats and delivery, the legality of cold email, compliance, and refunds.",
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    name: "General",
    items: [
      {
        question: "What is Leadspitch?",
        answer:
          "Leadspitch is a store that sells pre-packaged, niche-specific business contact lists as one-time purchases. You pick a category like real estate, legal, home services, beauty, or medical, pay once, and download a ready-to-use file instead of subscribing to a search platform.",
      },
      {
        question: "Who is Leadspitch for?",
        answer:
          "Leadspitch is built for freelancers, small agencies, cold email operators, and solo consultants who need a targeted list for a specific niche rather than ongoing access to a live database. If you’re running outreach as a single campaign or project instead of a permanent function, buying one list is cheaper and simpler than licensing a platform.",
      },
      {
        question: "Is Leadspitch better than Apollo.io for small teams?",
        answer:
          "It depends on what you’re doing. Leadspitch is the better choice if you need a defined list for one niche and don’t want a recurring subscription, since a single purchase costs less than one month of Apollo’s $49–$119 per user pricing. Apollo is the better choice if you’re running continuous, live prospecting across many industries and need search, enrichment, and outreach tools in one platform.",
      },
      {
        question: "Why not just use Apollo or ZoomInfo instead?",
        answer:
          "You can, and for some use cases you should. Apollo and ZoomInfo make sense if you need to search a live, constantly updated database across many verticals every month; they don’t make sense if your actual need is a fixed list for one niche, since you’d be paying an ongoing platform fee for what amounts to a single search.",
      },
      {
        question: "Is Clay.com worth it for a one-person agency?",
        answer:
          "Usually not, unless you have the time to build and maintain enrichment workflows yourself. Clay is a workflow and enrichment tool built for technical operators who already have a list and want to layer multiple data sources onto it; most one-person agencies just need a finished list, which is what Leadspitch sells directly.",
      },
    ],
  },
  {
    name: "Product / Data",
    items: [
      {
        question: "Where does the contact data come from?",
        answer:
          "Every list is built from public business records specific to that niche, such as licensing boards, bar association directories, business directories, and publicly listed practice or company information. We don’t scrape LinkedIn profiles or pull from data-sharing networks; each niche is sourced from wherever that type of business is actually publicly listed.",
      },
      {
        question:
          "How accurate are Leadspitch’s lists compared to Apollo or Clay?",
        answer:
          "Every contact goes through email verification before it’s included in a list for sale, which is the same core method large platforms use, just applied to a narrower, purpose-built list instead of a massive general database. Because we source per niche instead of aggregating everything into one database, we don’t inherit the LinkedIn-dependency gap that leaves large platforms with weak coverage of independent local businesses like contractors and salon owners.",
      },
      {
        question: "Do lists include phone numbers?",
        answer:
          "Yes, where a phone number is publicly available for that contact. Coverage varies by niche since some public sources (like licensing boards) list phone numbers more consistently than others (like general business directories).",
      },
      {
        question: "How often is the data updated?",
        answer:
          "Each list is refreshed on a set cycle before being made available for sale, and the product page for each category shows the last update date. Because Leadspitch lists are static files rather than a live database, the file you download reflects data as of that update, not real-time information.",
      },
      {
        question: "Can I get a list for a specific city or state?",
        answer:
          "Yes. Most categories let you filter by state, and many support city or ZIP-level filtering as well; if a location combination isn’t available as a pre-built list, contact support to check if a custom pull is possible.",
      },
    ],
  },
  {
    name: "Purchasing / Delivery",
    items: [
      {
        question: "What file format do lists come in?",
        answer:
          "Every list is delivered as a ZIP file containing an XLSX spreadsheet. XLSX opens directly in Excel or Google Sheets and imports cleanly into most CRM and cold email tools.",
      },
      {
        question: "How fast will I receive my list after paying?",
        answer:
          "Delivery is instant. Once payment is confirmed, your download link is available immediately, with no manual processing or waiting period.",
      },
      {
        question: "Can I buy a list without a subscription?",
        answer:
          "Yes, every Leadspitch purchase is a one-time payment. There’s no account required, no recurring charge, and nothing to cancel later because nothing renews.",
      },
      {
        question:
          "Do you offer custom or one-off lists outside your standard categories?",
        answer:
          "Yes, in some cases. If you need a niche or location combination that isn’t already built as a standard product, contact support with your criteria and we’ll let you know if a custom list is possible and what it would cost.",
      },
    ],
  },
  {
    name: "Usage / Legal",
    items: [
      {
        question: "Is it legal to buy an email list and cold email people?",
        answer:
          "Yes, cold emailing business contacts is legal in the US under CAN-SPAM as long as your message includes accurate sender information and a working unsubscribe link. Leadspitch lists are built from publicly available business contact information for exactly this kind of B2B outreach.",
      },
      {
        question: "Who is responsible for compliance when using the list?",
        answer:
          "You are. Leadspitch provides publicly sourced contact data, but how you use it, including compliance with CAN-SPAM, GDPR, or any other regulation relevant to where your recipients are located, is your responsibility as the sender.",
      },
      {
        question: "Will a purchased list hurt my email deliverability?",
        answer:
          "It can, if you send poorly or ignore basic hygiene, the same as with any list from any source, including Apollo or ZoomInfo. Verify the list before a large send, warm up your sending domain, and follow standard cold email practices like low daily volume and a clear unsubscribe option to protect deliverability.",
      },
    ],
  },
  {
    name: "Support",
    items: [
      {
        question: "What happens if contacts bounce or are inaccurate?",
        answer:
          "Every list is verified before sale, but no contact data source is ever 100% current since people change jobs and businesses close. Check Leadspitch’s specific replacement or refund policy for bounce-rate thresholds and how to report inaccurate data.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Refunds are handled according to Leadspitch’s refund policy, which covers cases like corrupted files or lists that don’t match their listed description. Because lists are downloadable data products, refund terms are stricter than physical goods, so check the policy page before purchasing if this matters to you.",
      },
      {
        question: "How do I contact support?",
        answer:
          "You can reach Leadspitch directly through our contact page. A person handles inquiries, not an automated ticket queue, and most questions about a list or an order are answered promptly.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  ),
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-4xl font-semibold md:text-5xl">
        Frequently asked questions
      </h1>
      <FaqAccordion categories={FAQ_CATEGORIES} />
    </div>
  );
}
