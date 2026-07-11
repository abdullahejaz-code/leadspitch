// Single registry of resolved site-wide facts. These were the owner-fill
// "TODO chip" tokens; each value here is real and approved. Anything still
// unknown stays in the TODO registry in components/TodoChip.tsx instead.

export const SITE = {
  /** Operating name shown in the footer ("operated by …") — no registered
   *  entity yet, so the brand name is used as the operating name. */
  legalEntity: "LeadsPitch",
  /** Support reply-time promise shown on contact, FAQ, and refund pages. */
  responseTime: "24–48 hours",
  /** Governing law for the Terms of Service (§13). */
  jurisdiction: "Pakistan",
  /** Checkout runs on Gumroad; their privacy policy covers card handling. */
  processorName: "Gumroad",
  processorPrivacyPolicyUrl: "https://gumroad.com/privacy",
  founderQuote:
    "I built LeadsPitch after one too many months of paying for a prospecting platform I barely opened. Most freelancers don't need 275 million contacts — they need one accurate list, once.",
  founderGoal:
    "The goal is a store, not a platform: one verified niche list at a time — real estate today; legal, home services, beauty, and medical next. Pay once, download the file, own it. No accounts, no credits, nothing to cancel.",
} as const;
