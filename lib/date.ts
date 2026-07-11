// Weekly "last verified" date: the most recent Monday, so the value is
// stable within a week and rolls forward automatically. Pages that render it
// must set `export const revalidate` (≤ 1 day) so static output re-computes.

const DAY_MS = 86_400_000;

function mostRecentMonday(): Date {
  const now = new Date();
  // getDay(): 0 = Sunday … 6 = Saturday; Monday-based offset:
  const daysSinceMonday = (now.getDay() + 6) % 7;
  return new Date(now.getTime() - daysSinceMonday * DAY_MS);
}

/** e.g. "July 6, 2026" — for on-page copy. */
export function getWeeklyVerifiedDate(): string {
  return mostRecentMonday().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** e.g. "2026-07-06" — for machine-readable uses (JSON-LD, meta). */
export function getWeeklyVerifiedDateISO(): string {
  return mostRecentMonday().toISOString().slice(0, 10);
}
