import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How LeadsPitch collects, uses, and protects information when you visit the site, contact us, or purchase a digital lead list product.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-section">
      <Reveal variant="fade">
        <h1 className="text-4xl font-semibold md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 font-mono text-sm text-ink-faint">
          Effective date: 04/07/2026
        </p>
      </Reveal>
      <p className="mt-8 leading-relaxed text-ink-secondary">
        This Privacy Policy explains how LeadsPitch (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; &ldquo;our&rdquo;) collects, uses, and protects
        information when you visit LeadsPitch&rsquo;s website, contact us, or
        purchase a digital lead list product. It does not cover the business
        contact data contained within the lead list products themselves;
        Section 3 below explains that distinction in detail, because it is
        different from the personal information this policy otherwise
        addresses.
      </p>

      <section className="mt-16">
        <h2 className="text-xl font-semibold md:text-2xl">
          1. Scope of This Policy
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          This policy applies to visitors, contact form submitters, and buyers
          who interact with the LeadsPitch website. LeadsPitch does not require
          account creation or login to browse or purchase products; every
          purchase is a one-time transaction processed through a third-party
          payment provider, and we do not maintain user profiles, saved
          passwords, or persistent login credentials for buyers.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          2. Personal Information We Collect
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          We collect a limited set of personal information directly tied to how
          you use the site. When you make a purchase, our payment processor
          (see Section 5) passes us your email address and basic order details,
          such as which product you bought and the transaction amount, so we can
          deliver your file and provide support if needed. When you submit our
          contact form, we collect the name, email address, and message content
          you provide. When you browse the site, our analytics tool collects
          standard technical data such as IP address, browser type, device
          type, and pages viewed, in aggregate form rather than tied to an
          identified individual. We do not collect payment card numbers, billing
          addresses, or other financial details directly; those are collected
          and stored entirely by our payment processor under their own security
          controls.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          3. Important: This Policy Does Not Cover the Lead List Data We Sell
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          The business contact data contained in LeadsPitch&rsquo;s downloadable
          lead list products is not personal information collected from you, the
          website visitor, and is not covered by the data-subject rights
          described in Section 9. Our lead list products are compiled from
          publicly available business information, including licensing boards,
          professional association directories, business directories, and
          publicly listed company or practice details for real estate, legal,
          home services, beauty, and medical/clinic businesses. This is business
          contact data about third parties (business owners and professionals)
          gathered independently of our website, not data submitted to us by our
          customers or scraped from private accounts. If you are a business
          professional who appears in a LeadsPitch list and have questions about
          that listing, contact us using the details in Section 10; questions
          about your own personal data as a site visitor or buyer are handled
          under Sections 2 and 9 instead.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          4. How We Use Personal Information
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          We use the personal information described in Section 2 to fulfill and
          deliver your purchase, respond to support and contact form inquiries,
          maintain basic security and fraud prevention on the site, and
          understand aggregate site usage so we can improve product pages and
          site performance. We do not use your email address to add you to a
          marketing list unless you separately opt in, and we do not sell, rent,
          or share your personal information with third parties for their own
          marketing purposes.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          5. Payment Processing
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          All payments are processed by {SITE.processorName}, a third-party
          payment provider. LeadsPitch does not collect or store your full
          payment card number, card expiration date, or CVV; that information is
          entered directly with the processor and is subject to their own
          security standards and privacy policy, available at{" "}
          <a
            href={SITE.processorPrivacyPolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-colors hover:text-accent-hover"
          >
            gumroad.com/privacy
          </a>
          . We
          receive limited transaction information from the
          processor, such as your email address, the product purchased, the
          amount charged, and the transaction date, which we use solely to
          deliver your product and provide order support.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          6. Cookies and Analytics
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          LeadsPitch uses cookies and a web analytics tool e.g. Google
          Analytics or Plausible to understand how visitors use the site,
          including which pages are viewed, how visitors arrive at the site, and
          general device and browser information. This data is used in aggregate
          to improve the site and is not used to build individually identifiable
          advertising profiles. You can disable cookies through your browser
          settings; doing so may affect some site functionality but will not
          prevent you from completing a purchase. We do not currently use
          third-party retargeting or advertising pixels; if this changes, we
          will update this policy accordingly.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          7. Other Third-Party Services and Disclosure
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          Beyond our payment processor and analytics provider, LeadsPitch may
          use a transactional email service to deliver order confirmations and
          download links, and a hosting provider to run the website; both
          process data only as needed to provide their service to us, not for
          their own independent use. We may disclose personal information if
          required by law, such as in response to a valid subpoena or government
          request, or if necessary to investigate fraud or protect the security
          of the site. Outside of these cases, we do not share your personal
          information with third parties.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">8. Data Retention</h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          We retain order and transaction records, including buyer email
          addresses and purchase details, for as long as needed to meet our own
          legal, tax, and accounting obligations, which is typically several
          years depending on applicable financial recordkeeping requirements.
          Contact form submissions are retained for as long as reasonably needed
          to resolve your inquiry and for a limited period afterward for support
          continuity, then deleted or archived. Analytics data is retained in
          aggregate form according to our analytics provider&rsquo;s default
          retention settings.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          9. Your Rights and Choices
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          Depending on where you live, you may have rights over the personal
          information described in Section 2, including the right to request
          access to, correction of, or deletion of your data, and the right to
          object to or restrict certain processing. California residents have
          rights under the CCPA/CPRA, including the right to know what personal
          information we hold and to request deletion; we do not sell personal
          information as defined under California law. Residents of the EU, UK,
          and other jurisdictions with similar data protection laws have
          equivalent rights under frameworks such as the GDPR. To exercise any
          of these rights, contact us using the details in Section 10; because
          we do not maintain user accounts, we will verify your request using
          the email address associated with your order or contact form
          submission. LeadsPitch does not knowingly collect personal information
          from children under 16, and our products and services are intended for
          business use by adults.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">
          10. Changes to This Policy and Contact Information
        </h2>
        <p className="mt-4 leading-relaxed text-ink-secondary">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, tools, or legal requirements. When we do, we will
          update the effective date at the top of this page, and for material
          changes we will note the update on the site. If you have questions
          about this policy, your personal information, or a business listing
          that appears in one of our products, contact us through our{" "}
          <Link
            href="/contact"
            className="font-medium text-accent transition-colors duration-fast hover:text-accent-hover"
          >
            contact page
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
