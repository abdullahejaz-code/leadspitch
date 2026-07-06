# LeadsPitch — Handoff

## Goal

Build LeadsPitch: an Apple-grade, clean, minimalist, trustworthy digital
storefront selling niche business lead lists (real estate, legal, home
services, beauty, medical) as one-time-purchase XLSX downloads — positioned
as the anti-subscription alternative to Apollo.io and Clay.com.

## Current state

Next.js 14 (App Router) + TypeScript + Tailwind project, no component
library, no database, no API routes. Production build passes cleanly
(`npm run build`, 19 modules per the dependency graph, 0 circular
dependencies). Pages built so far with real copy from `lib/content/`:
Home, About, FAQ, Contact, Privacy Policy, Terms of Service, Refund Policy.
Navbar/Footer and the full design-token system are in place. `/leads` and
`/leads/[category]` are intentionally stub-only ("Coming soon") and not
linked in navigation, per the original scope.

Dependency graph (from `npm run graph`, see `CODEGRAPH.md` /
`codegraph.json`):

```
app/layout.tsx        -> app/globals.css, components/Footer.tsx, components/Navbar.tsx
app/contact/page.tsx  -> components/ContactForm.tsx
app/faq/page.tsx      -> components/FaqAccordion.tsx
```

All other routes (`/`, `/about`, `/blog`, `/blog/[slug]`, `/leads`,
`/leads/[category]`, `/privacy-policy`, `/terms-of-service`,
`/terms-of-service`) are currently leaf nodes — self-contained, no shared
component imports yet beyond `next/link`.

## Active files

- `DESIGN.md` — single source of truth for tokens (color, type, spacing,
  radius, motion) and anti-pattern bans. Extend this before adding any new
  color/font/radius value.
- `app/globals.css` / `tailwind.config.ts` — token definitions (canvas,
  surface, ink/ink-secondary/ink-faint, hairline, accent/accent-deep,
  danger/danger-soft).
- `components/Navbar.tsx`, `components/Footer.tsx` — global chrome.
  Navbar mobile menu closes on Escape.
- `components/ContactForm.tsx` — client component, two modes (general
  message / custom quote request), inline validation, success state.
  Submission is wired to a placeholder `submitContactRequest()` — no
  backend yet (comment in file shows where to plug in
  Formspree/Resend).
- `components/FaqAccordion.tsx` — client component, one-open-at-a-time
  accordion, server-rendered text underneath for SEO.
- `app/page.tsx`, `app/about/page.tsx`, `app/faq/page.tsx`,
  `app/contact/page.tsx`, `app/privacy-policy/page.tsx`,
  `app/terms-of-service/page.tsx`, `app/refund-policy/page.tsx` — built
  pages, copy sourced verbatim from `lib/content/*.md`.
- `lib/content/*.md` — copy source of truth; read before touching any
  page's text.
- `lib/products.ts`, `lib/categories.ts` — typed, empty; for the future
  `/leads` build only.
- `scripts/codegraph.mjs` — generates `codegraph.json` + `CODEGRAPH.md`
  via madge (`npm run graph`).

## Changes made

- Scaffolded Next.js 14 App Router + TS + Tailwind project from scratch;
  route shells for every required path.
- Wrote `DESIGN.md`: restrained-neutral palette (canvas `#FAFAFA`, ink
  `#131316`, one accent `#2D5FB1`), Geist Sans/Mono, crisp 6/10/16/24px
  radius scale, near-invisible shadows, quiet motion tokens.
- Built Navbar (sticky, blur, mobile hamburger, Escape-to-close) and
  Footer (asymmetric grid, Company/Legal columns). `/leads` confirmed
  absent from both.
- Built Home page: hero, Apollo/Clay comparison table, how-it-works,
  built-for, what's-included, FAQ preview accordion, closing CTA.
  Organization + FAQPage JSON-LD added.
- Built About page: intro, sourcing, who-we-are, principles, trust
  section (with links to `/refund-policy` and `/contact`), closing CTA.
  BreadcrumbList JSON-LD added.
- Built full FAQ page: 5 categories, 20 questions, one-open-at-a-time
  accordion (`FaqAccordion.tsx`), full FAQPage JSON-LD covering every
  question, verified schema text matches on-page text via live DOM
  check.
- Built Contact page: two-mode form (general / custom quote), per-field
  validation, danger-token error states, success confirmation panel with
  reset. Added `--color-danger` / `--color-danger-soft` tokens to
  DESIGN.md, globals.css, and tailwind.config.ts (documented extension,
  not an ad-hoc color).
- Built all three legal pages from source markdown verbatim
  (Privacy Policy, Terms of Service, Refund Policy). Contact/support
  placeholders in the source (`[contact email placeholder]`,
  `[support email placeholder]`) were converted to real `next/link`
  links to `/contact` and `/refund-policy` per explicit instruction.
  Genuine unresolved legal placeholders (`[processor privacy policy
  link]`, `[jurisdiction placeholder]`, `[response time placeholder]`)
  were deliberately left as visible bracketed text — not invented —
  since they need real values from the business owner, not a link.
- Ran a code-reviewer agent pass after the scaffold and again after Home;
  fixed all findings (Navbar Escape-key dismissal, JSON-LD description
  fidelity to source copy, one untokenized arbitrary width converted to
  a documented rem-based exception).
- Installed `madge` (dev dependency) for codebase dependency graphing;
  added `npm run graph` / `graph:circular` / `graph:svg` scripts and
  `scripts/codegraph.mjs`, which resolves `@/*` path aliases via
  `tsconfig.json` and emits a Mermaid graph in `CODEGRAPH.md` (no native
  Graphviz dependency required).

## Failed attempts

- **Dev server / `.next` cache corruption.** Mid-session, the dev server
  started throwing `Cannot find module './252.js'` and serving completely
  unstyled HTML (no Tailwind, default blue links). Root cause: this
  project lives inside OneDrive, and OneDrive's background sync appears to
  race Next.js's webpack writes to `.next`, corrupting chunk files. Fixed
  by stopping the server, deleting `.next` entirely, and restarting clean.
  This is likely to recur if the project stays inside a synced OneDrive
  folder — see Next Steps.
- **`preview_screenshot` timeouts.** Multiple screenshot calls during FAQ
  and Contact verification timed out after 30s with no console errors.
  Worked around by verifying functionality through `preview_eval`
  (DOM state, computed styles, ARIA attributes) and `preview_snapshot`
  instead of relying on visual screenshots. Not fully root-caused; may be
  an environment/renderer quirk rather than an app bug, since the app
  itself had no console errors during these incidents.
- **`madge` without `--ts-config`.** First graph run resolved zero
  cross-file dependencies (every module showed an empty array) because it
  couldn't follow the `@/*` path alias used throughout the app. Fixed by
  passing `--ts-config tsconfig.json` (and the equivalent `tsConfig`
  option in `scripts/codegraph.mjs`), after which real edges (layout →
  Navbar/Footer, contact → ContactForm, faq → FaqAccordion) appeared.
- **`madge --image` (SVG output).** Not usable on this machine — it shells
  out to Graphviz's `dot` binary, which isn't installed. Left as an
  optional `npm run graph:svg` script with a note that it needs
  `winget install Graphviz.Graphviz` first; the default `npm run graph`
  path uses Mermaid instead, which needs no native binary.
- **First "graphify" request was ambiguous.** No package by that name
  exists for this purpose; clarified with the user that they wanted a
  whole-codebase dependency graph, then installed `madge`, the standard
  tool for that job, instead of guessing.

## Next steps

1. **Move the project off OneDrive sync**, or at minimum exclude
   `node_modules` and `.next` from sync (Files On-Demand / "Always keep on
   this device" is not the fix — the folders should not sync at all).
   This is the direct cause of the slow installs and the cache-corruption
   incident above.
2. **Build `/leads` and `/leads/[category]`** — currently intentional
   "Coming soon" stubs per original scope. Will need `lib/products.ts` /
   `lib/categories.ts` populated with real typed data, then linked from
   Navbar/Footer once ready.
3. **Build `/blog` and `/blog/[slug]`** — currently placeholder shells;
   source content exists at `lib/content/blog.md` (blog content strategy +
   first 3 articles) and hasn't been built into pages yet.
4. **Wire the Contact form to a real backend.** `submitContactRequest()` in
   `components/ContactForm.tsx` is a no-op placeholder; swap in Formspree
   or a Resend-backed API route (comment in the file shows the exact spot
   and a sample call).
5. **Fill remaining legal placeholders** with real values: payment
   processor privacy policy URL (Privacy Policy §5), governing-law
   jurisdiction (Terms of Service §13), and support response-time SLA
   (Refund Policy). These were deliberately left as visible bracketed
   text rather than guessed.
6. **Decide on and integrate the payment processor** (copy currently says
   "2Checkout / Gumroad" as a placeholder pairing) — affects Terms of
   Service §3/§5 wording and the actual checkout flow once `/leads` is
   built.
7. **Re-run `npm run graph` periodically** as pages gain shared
   components, to keep `CODEGRAPH.md` a useful map rather than a stale
   snapshot of 5 links.
