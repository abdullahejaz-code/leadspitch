import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import TodoChip, { TODO } from "@/components/TodoChip";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the person who builds the lists. Questions about a list, an order, or a niche we don’t list yet? A person reads every message.",
};

// The whole site funnels through the contact form; the direct-email fallback
// stays off by default (matching the approved design). Flip to true — and fill
// the supportEmail token — to surface it beside the form.
const SHOW_EMAIL_FALLBACK = false;
const SUPPORT_EMAIL = TODO.supportEmail;
const RESPONSE_TIME = SITE.responseTime;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-shell px-5 py-16 md:px-10 md:py-20">
      <div className="grid items-start gap-14 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* left: intro + optional email fallback */}
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-accent">
            CONTACT
          </p>
          <h1 className="mt-4 text-[clamp(1.75rem,1rem+3.5vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
            Talk to the person who builds the lists.
          </h1>
          <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-ink-secondary md:text-[16.5px]">
            Questions about a list, an order, or a niche we don&rsquo;t list yet?
            A person reads every message. Pick a topic, tell us what you need, and
            we&rsquo;ll get back to you.
          </p>

          {SHOW_EMAIL_FALLBACK && (
            <div className="mt-9 rounded-lg border border-hairline bg-surface p-5">
              <div className="font-mono text-[11px] tracking-[0.1em] text-ink-faint">
                PREFER EMAIL?
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-3 flex items-center justify-between gap-3 text-accent"
              >
                <TodoChip className="text-[15px]">{SUPPORT_EMAIL}</TodoChip>
                <span aria-hidden="true">→</span>
              </a>
              <div className="mt-4 flex items-center gap-2.5 border-t border-hairline pt-3.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-xs text-ink-secondary">
                  typical reply: {RESPONSE_TIME}
                </span>
              </div>
            </div>
          )}
        </Reveal>

        {/* right: the working form (submission logic unchanged — no-op stub) */}
        <Reveal delay={80}>
          <ContactForm responseTime={RESPONSE_TIME} />
        </Reveal>
      </div>
    </div>
  );
}
