"use client";

import { useState, type ReactNode } from "react";

export interface FaqItem {
  question: string;
  /** Plain-text answer — also used verbatim for FAQPage JSON-LD. */
  answer: string;
  /** Optional rich render (e.g. embeds a contact link + TODO chip). */
  node?: ReactNode;
}

function PlusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-ink-faint transition-transform duration-base ease-out-expo ${
        isOpen ? "rotate-45" : ""
      }`}
    >
      <path
        d="M8 2v12M2 8h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  // Independent toggles, first row open by default — matches the design.
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <div className="border-t border-hairline">
      {items.map((item, i) => {
        const isOpen = !!open[i];
        const num = `Q${String(i + 1).padStart(2, "0")}`;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={item.question} className="border-b border-hairline">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpen((prev) => ({ ...prev, [i]: !prev[i] }))
                }
                className="flex w-full items-center gap-5 py-[22px] text-left"
              >
                <span className="w-9 shrink-0 font-mono text-[13px] text-accent">
                  {num}
                </span>
                <span className="flex-1 text-[15px] font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[17px]">
                  {item.question}
                </span>
                <PlusIcon isOpen={isOpen} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              className="grid transition-all duration-base ease-out-expo motion-reduce:transition-none"
            >
              <div className="overflow-hidden">
                <div
                  aria-hidden={!isOpen}
                  className="max-w-[76ch] pb-6 pl-0 text-[14px] leading-relaxed text-ink-secondary sm:pl-14 sm:text-[15.5px]"
                >
                  {item.node ?? item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
