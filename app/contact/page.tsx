import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Leadspitch. Send a general message, or request a custom quote for a niche and lead count outside the standard categories.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-section">
      <h1 className="text-4xl font-semibold md:text-5xl">Contact</h1>
      <p className="mt-6 max-w-prose text-ink-secondary">
        Questions about a list, an order, or a niche we don&rsquo;t list yet? A
        person reads every message. Pick a general message for anything, or a
        custom quote request if you need a specific niche and lead count.
      </p>
      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
