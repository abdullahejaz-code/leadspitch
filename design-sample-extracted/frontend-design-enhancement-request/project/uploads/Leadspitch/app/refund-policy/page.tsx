import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "When a refund is available on a Leadspitch digital lead list and when it isn’t, explained plainly so there is no guesswork.",
};

function ContactLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/contact"
      className="font-medium text-accent transition-colors duration-fast hover:text-accent-deep"
    >
      {children}
    </Link>
  );
}

export default function RefundPolicyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-section">
      <h1 className="text-4xl font-semibold md:text-5xl">Refund Policy</h1>
      <p className="mt-8 leading-relaxed text-ink-secondary">
        Leadspitch sells downloadable digital products. Because your file is
        delivered instantly and is yours to keep the moment you download it,
        refunds work differently here than they do for a physical product. This
        page tells you exactly when a refund is available and when it
        isn&rsquo;t, so there&rsquo;s no guesswork.
      </p>

      <section className="mt-16">
        <h2 className="text-xl font-semibold md:text-2xl">General Policy</h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          All sales are final once a list has been downloaded. A digital file
          has value the second it&rsquo;s opened, so &ldquo;I changed my
          mind&rdquo; after downloading isn&rsquo;t something we can refund; if
          we did, anyone could buy a list, use it, and then ask for their money
          back, which would make the whole store unworkable. This policy is what
          lets us keep prices low and fair for everyone else buying honestly.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          When Refunds Are Offered
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          We will issue a refund or a corrected replacement file in these cases:
        </p>
        <ul className="mt-4 space-y-3 leading-relaxed text-ink-secondary marker:text-ink-faint">
          <li className="pl-1">
            <strong className="font-medium text-ink">
              Failed or corrupted delivery.
            </strong>{" "}
            Your download link doesn&rsquo;t work, the file won&rsquo;t open, or
            the file is empty or damaged.
          </li>
          <li className="pl-1">
            <strong className="font-medium text-ink">
              Product doesn&rsquo;t match its description.
            </strong>{" "}
            The list is missing data fields that were listed on the product
            page, or is for the wrong niche or location entirely, not just
            &ldquo;smaller than I expected.&rdquo;
          </li>
          <li className="pl-1">
            <strong className="font-medium text-ink">
              Duplicate or erroneous charge.
            </strong>{" "}
            You were charged twice for the same list, or charged for the wrong
            product due to a checkout error.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          If any of these happen, contact us and we&rsquo;ll fix it, either by
          resending a corrected file or refunding your payment.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          How to Request a Refund
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          Email us through our <ContactLink>contact page</ContactLink> within 7
          days of your purchase. Include your order number or the email address
          used at checkout, the name of the product you bought, and a short
          description of the issue. We review every request individually and
          typically respond within [response time placeholder]. Requests made
          after 7 days are handled at our discretion and aren&rsquo;t
          guaranteed.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          What&rsquo;s Not Covered
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          A few things are normal with public business data and aren&rsquo;t
          grounds for a refund:
        </p>
        <ul className="mt-4 space-y-3 leading-relaxed text-ink-secondary marker:text-ink-faint">
          <li className="pl-1">
            <strong className="font-medium text-ink">
              Individual leads going stale over time.
            </strong>{" "}
            People change jobs and businesses close. Every list is a snapshot as
            of the date it was sourced, not a live, constantly updated
            directory, and some drift over time is expected, not a defect.
          </li>
          <li className="pl-1">
            <strong className="font-medium text-ink">
              Buyer&rsquo;s remorse.
            </strong>{" "}
            Deciding you don&rsquo;t want the list after downloading it
            isn&rsquo;t refundable. The file has already been delivered and
            can&rsquo;t be &ldquo;returned.&rdquo;
          </li>
          <li className="pl-1">
            <strong className="font-medium text-ink">
              Not reading the product description first.
            </strong>{" "}
            Check the niche, location, and included fields before you buy. If a
            field wasn&rsquo;t listed on the product page, its absence
            isn&rsquo;t a refund-eligible error.
          </li>
          <li className="pl-1">
            <strong className="font-medium text-ink">
              Low response rate from your own outreach.
            </strong>{" "}
            Reply and conversion rates depend on your messaging, offer, timing,
            and sending practices, not on the accuracy of the contact data
            itself, so campaign performance alone isn&rsquo;t a basis for a
            refund.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          Bundle Purchase Refunds
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          If you buy a bundle of multiple lists in one purchase, refund requests
          are evaluated for the bundle as a whole, not list by list. We
          can&rsquo;t refund one list out of a five-list bundle while you keep
          the other four. If there&rsquo;s a genuine issue with a single list
          inside a bundle, our default fix is to replace that specific file
          rather than refund the entire purchase, unless the issue affects the
          bundle as a whole.
        </p>
      </section>

      <p className="mt-12 border-t border-hairline pt-8 leading-relaxed text-ink-secondary">
        Questions about a list before you buy it? Contact us first through our{" "}
        <ContactLink>contact page</ContactLink>. We&rsquo;d rather answer a
        question upfront than deal with a refund request afterward.
      </p>
    </article>
  );
}
