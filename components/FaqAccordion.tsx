"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  name: string;
  items: FaqItem[];
}

function PlusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 text-ink-faint transition-transform duration-base ease-out-expo ${
        isOpen ? "rotate-45" : ""
      }`}
    >
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

export default function FaqAccordion({
  categories,
}: {
  categories: FaqCategory[];
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="mt-12 space-y-16">
      {categories.map((category) => (
        <section key={category.name}>
          <h2 className="text-sm font-medium uppercase tracking-wider text-ink-faint">
            {category.name}
          </h2>
          <div className="mt-4 border-t border-hairline">
            {category.items.map((item) => {
              const key = `${category.name}:${item.question}`;
              const isOpen = openKey === key;
              const panelId = `faq-panel-${key.replace(/[^a-z0-9]+/gi, "-")}`;
              const buttonId = `faq-button-${key.replace(/[^a-z0-9]+/gi, "-")}`;

              return (
                <div key={item.question} className="border-b border-hairline">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left font-medium transition-colors duration-fast hover:text-ink"
                    >
                      <span>{item.question}</span>
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
                      <p
                        aria-hidden={!isOpen}
                        className="max-w-prose pb-6 text-ink-secondary"
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
