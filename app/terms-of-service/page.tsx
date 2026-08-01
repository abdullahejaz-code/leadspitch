import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your access to and use of the LeadsPitch website and your purchase of any digital product sold on it.",
};

export default function TermsOfServicePage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-section">
      <Reveal>
        <h1 className="text-4xl font-semibold md:text-5xl">Terms of Service</h1>
        <p className="mt-4 font-mono text-sm text-ink-faint">
          Last updated: 04/07/2026
        </p>
        <p className="mt-8 leading-relaxed text-ink-secondary">
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
          use of the LeadsPitch website and your purchase of any digital product
          sold on it. By purchasing a product, submitting a contact form, or
          otherwise using the site, you agree to these Terms. If you do not
          agree, do not use the site or purchase from LeadsPitch.
        </p>
      </Reveal>

      <section className="mt-16">
        <h2 className="text-xl font-semibold md:text-2xl">
          1. Acceptance of These Terms
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          By using LeadsPitch or completing a purchase, you confirm that you are
          at least 18 years old (or the age of majority in your jurisdiction),
          that you have the authority to agree to these Terms on your own behalf
          or on behalf of the business or agency you represent, and that you
          will use any purchased product in accordance with these Terms. If you
          are purchasing on behalf of a company, &ldquo;you&rdquo; refers to
          that company as well as the individual completing the transaction.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          2. Description of the Service
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          LeadsPitch sells pre-packaged, niche-specific business contact lists
          as downloadable digital products, delivered as ZIP files containing
          XLSX spreadsheets, across categories including real estate, legal,
          home services, beauty, and medical/clinic industries. Every purchase
          is a one-time, non-subscription transaction. LeadsPitch does not use
          user accounts or logins; each purchase is delivered via a secure
          delivery link generated after payment is confirmed.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          3. Orders, Payment, and Pricing
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          Prices for each product are listed on its product page and stated in
          USD. Payment is processed entirely by a third-party payment provider
          Gumroad; LeadsPitch does not directly collect or store
          your payment card information. An order is considered complete once
          payment is confirmed by the processor, at which point your download
          becomes available. LeadsPitch might change product pricing at any time
          without notice, but a price change never affects an order you have
          already completed.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          4. License to Use Purchased List Data
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          When you purchase a list, LeadsPitch grants you a limited,
          non-exclusive, non-transferable license to use the contact data in
          that file for your own internal business outreach and marketing
          purposes. This license allows you to import the data into your own
          CRM, email platform, or outreach tool, to contact the individuals or
          businesses listed for legitimate business communication, and to keep
          and use the downloaded file indefinitely. This license covers use of
          the data; it does not transfer ownership of the underlying data or
          grant any rights beyond what is described in this section and Section
          5.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          5. No Resale or Redistribution of List Data
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          You may not resell, sublicense, redistribute, publish, or otherwise
          make available any purchased list, in whole or in part, to any third
          party, whether for payment or free of charge, and whether the list is
          unmodified or repackaged. This includes uploading list data to public
          or shared repositories, incorporating it into your own data product or
          service, or transferring the file to any company or individual outside
          the organization that made the purchase. Violating this section
          immediately terminates your license to use the data and may result in
          legal action and forfeiture of any right to a refund.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          6. Data Accuracy Disclaimer (&ldquo;As Is&rdquo; Data)
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          All list data is provided &ldquo;as is&rdquo; and is compiled from
          publicly available business information, including licensing boards,
          professional directories, and public business listings; we cannot and
          do not guarantee 100% accuracy, completeness, or currency of any
          individual record. Businesses close, contact details change, and the
          public sources we draw from are updated on their own schedules that we
          do not control. LeadsPitch takes reasonable steps to verify email
          addresses before a list is offered for sale, but we do not warrant
          that any specific email will be deliverable, that any phone number
          will be in service, or that any listed business is still operating as
          described at the time of your purchase.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          7. Your Responsibility for Compliance with Outreach and Data
          Protection Laws
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          You are solely responsible for ensuring that your use of any purchased
          list complies with all laws applicable to your outreach, including but
          not limited to the CAN-SPAM Act, GDPR, CASL, and any other data
          protection, privacy, or anti-spam law relevant to you or to the people
          you contact. This includes using accurate sender identification,
          including a functional unsubscribe or opt-out mechanism in your
          communications, and honoring opt-out requests promptly. LeadsPitch
          sources and sells business contact data; we do not provide legal
          advice, and this section is not a substitute for consulting a
          qualified attorney about your specific outreach obligations,
          especially if you plan to contact individuals outside the United
          States.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          8. Intellectual Property
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          The LeadsPitch website, including its design, text, branding, and
          underlying software, is owned by LeadsPitch and protected by
          applicable intellectual property law; these Terms grant you no rights
          to the website itself beyond ordinary browsing and purchasing. The
          underlying business facts contained in our list products originate
          from public sources and are not exclusively owned by LeadsPitch or by
          you as the buyer; what you purchase is a compiled, formatted, and
          verified list product together with the usage license described in
          Section 4, not exclusive ownership of the underlying public
          information. The compilation, formatting, and verification process
          LeadsPitch applies to that public data is itself proprietary to
          LeadsPitch and is the asset protected under Section 5&rsquo;s resale
          restriction.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          9. Prohibited Uses
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          In addition to the restrictions in Section 5, you may not scrape,
          crawl, or use automated tools to extract data from the LeadsPitch
          website, attempt to access any product file without a completed, valid
          payment, attempt to reverse engineer our data sourcing methods,
          verification process, or pricing structure for competitive purposes,
          use the site to test stolen or fraudulent payment credentials, or use
          any purchased list for an illegal purpose, including harassment,
          fraud, or unlawfully discriminatory targeting. LeadsPitch reserves the
          right to refuse service, cancel an order, or restrict site access for
          anyone we reasonably believe is violating these Terms.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          10. Refunds and Order Issues
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          Because LeadsPitch sells downloadable digital products, sales are
          generally final once a file has been downloaded. Refunds or
          replacements may be available under LeadsPitch&rsquo;s{" "}
          <Link
            href="/refund-policy"
            className="font-medium text-accent transition-colors duration-fast hover:text-accent-hover"
          >
            refund policy
          </Link>{" "}
          for specific issues such as a corrupted file, a list that materially
          does not match its product page description, or a clearly accidental
          duplicate purchase; contact support with your order details to request
          a review. Refunds are granted at LeadsPitch&rsquo;s discretion under
          the policy in effect at the time of your purchase, and imperfect
          contact data alone, as described in Section 6, is not automatically
          grounds for a refund.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          11. Limitation of Liability
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          To the maximum extent permitted by law, LeadsPitch and its owners and
          operators are not liable for indirect, incidental, special, or
          consequential damages arising from your use of a purchased list or the
          website, including damages related to failed outreach campaigns, email
          deliverability problems, or complaints from third parties you contact
          using purchased data. LeadsPitch&rsquo;s total liability for any claim
          arising from a purchase is limited to the amount you paid for that
          specific product. Nothing in this section limits any liability that
          cannot be limited under applicable law.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">12. Termination</h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          LeadsPitch may suspend your access to the website or decline to
          process future orders at any time, particularly in response to a
          violation of these Terms, and is under no obligation to refund
          purchases that were completed legitimately before such action. Because
          LeadsPitch does not use accounts, termination primarily means
          restricting your ability to place further orders or access the site
          going forward; it does not retroactively revoke a license already
          granted for data purchased and used in compliance with these Terms,
          unless that specific data or its use was the basis for the violation,
          such as unlawful resale under Section 5.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          13. Governing Law and Changes to These Terms
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          These Terms are governed by the laws of {SITE.jurisdiction}, without
          regard to its conflict of law principles, and any dispute
          arising from these Terms or your use of LeadsPitch is subject to the
          exclusive jurisdiction of the courts located there. We may revise
          these Terms from time to time; changes take effect once posted to this
          page, and continuing to use the site or purchasing a product after an
          update means you accept the revised Terms. If you do not agree with an
          update, your remedy is to stop using the site.
        </p>
      </section>
    </article>
  );
}
