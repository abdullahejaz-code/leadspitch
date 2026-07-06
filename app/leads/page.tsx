import type { Metadata } from "next";
import Link from "next/link";
import SoonBadge from "@/components/SoonBadge";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Lead Lists",
  description:
    "Verified, niche business lead lists — pick a category, pay once, download the file.",
};

export default function LeadsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-section">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
        Lead Lists
      </h1>
      <p className="mt-4 max-w-prose text-ink-secondary">
        Pick a niche, pay once, get the file. Every list is sourced from
        public directories and verified before sale.
      </p>

      <ul className="mt-12 border-t border-hairline">
        {categories.map((category) => {
          const isLive = category.status === "live";
          const content = (
            <>
              <div>
                <h2 className="text-lg font-medium">{category.name}</h2>
                <p className="mt-1 max-w-prose text-sm text-ink-secondary">
                  {category.description}
                </p>
              </div>
              {!isLive && <SoonBadge />}
            </>
          );

          return (
            <li
              key={category.slug}
              className="border-b border-hairline py-6"
            >
              {isLive ? (
                <Link
                  href={`/leads/${category.slug}`}
                  className="group flex items-center justify-between gap-4"
                >
                  {content}
                </Link>
              ) : (
                <div
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center justify-between gap-4 opacity-60"
                >
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
