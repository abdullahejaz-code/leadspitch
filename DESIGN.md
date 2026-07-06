# Design System: LeadsPitch

Single source of truth for every page built in later phases. Tokens live in
[app/globals.css](app/globals.css) (CSS variables) and are mapped to utilities
in [tailwind.config.ts](tailwind.config.ts). Do not introduce ad-hoc colors,
fonts, radii, or shadows — extend the tokens instead.

## 1. Visual Theme & Atmosphere

Apple-grade utilitarian minimalism for a trusted data storefront. The surface
should feel like precision instrumentation, not a marketing template: a
true-neutral light canvas, hairline structure, generous macro-whitespace, one
quiet accent, and data rendered in monospace. Calm inspires trust; spectacle
undermines it.

Dials (from the frontend taste skills): variance 5 (offset, editorial-leaning
but never chaotic), motion 3 (restrained — hover states, gentle fade-ups,
nothing perpetual), density 3–4 (airy marketing pages; product tables may go
denser with hairline dividers instead of cards).

Register: brand surface for /, /about, /blog; product surface for /leads
(when built) — same tokens, higher density, zero decoration.

## 2. Color — Restrained Strategy (tinted-zero neutrals + one accent, <10% usage)

| Token | Value | Role |
| --- | --- | --- |
| `--color-canvas` | `#FAFAFA` | Body background. True neutral (chroma 0) — the warm cream/bone band is explicitly avoided as the current AI default. |
| `--color-surface` | `#FFFFFF` | Cards, navbar, footer, elevated panels. |
| `--color-ink` | `#131316` | Primary text and primary (filled) buttons. Never pure `#000000`. |
| `--color-ink-secondary` | `#5F5F68` | Secondary text. ≥4.5:1 on canvas and surface. |
| `--color-ink-faint` | `#8B8B94` | Metadata, timestamps. Large/mono-caps use only — not body text. |
| `--color-hairline` | `#E9E9EC` | All borders and dividers. Always 1px. |
| `--color-accent` | `#2D5FB1` | Desaturated deep cobalt. Links, focus rings, active states, semantic highlights. Not for large fills or decorative gradients. ≥4.5:1 on white. |
| `--color-accent-deep` | `#234C91` | Accent hover/pressed. |
| `--color-danger` | `#B42318` | Semantic error only — validation messages, invalid field borders. Desaturated red, ~5.9:1 on white. Never decorative. |
| `--color-danger-soft` | `#FEF3F2` | Tinted background behind error/validation summaries. |

Rules: max one accent. No purple/neon, no gradients as decoration, no colored
hero backgrounds. Primary CTAs are ink-filled (`#131316` bg, white text),
hover `#2A2A2F` — the accent is reserved for meaning, not emphasis.

## 3. Typography

One family in multiple weights (contrast via weight and color, not extra
families), plus a mono for data. Loaded via the `geist` package in
[app/layout.tsx](app/layout.tsx) as `--font-geist-sans` / `--font-geist-mono`.

- **Geist Sans** (`font-sans`) — everything: display, body, UI. Chosen because
  Inter/Roboto are banned by every taste skill, and Geist is the closest
  neutral-precise grotesk to SF Pro (the Apple register) with first-class
  Next.js support. No serif: this is a software/data product, and the skills
  ban serifs outside editorial contexts.
- **Geist Mono** (`font-mono`) — prices, lead counts, timestamps, metadata,
  table numerics. Data in mono is a core trust signal for this product.

Scale and rules:
- Display/H1: `text-4xl md:text-6xl`, weight 600, `letter-spacing -0.02em`
  (set globally on h1–h3), `text-wrap: balance`. Hero H1 never exceeds 2–3
  lines — use wide containers (`max-w-5xl`+), never a narrow text wall.
- Body: `text-base`, `leading-relaxed`, `max-w-prose` (68ch cap).
- Secondary text uses `text-ink-secondary`, never opacity tricks.
- Weights available: 400 (body), 500 (UI labels), 600 (headings). No 700+.

## 4. Spacing & Layout

- Base scale: Tailwind default (4px grid). No arbitrary pixel values.
- Section rhythm: `--space-section` = `clamp(5rem, 3.5rem + 6vw, 9rem)`,
  exposed as `py-section`. Sections are distinct chapters — huge vertical
  gaps are the point.
- Containers: `max-w-6xl mx-auto px-6` for page chrome; `max-w-prose` for
  running text.
- Full-height sections use `min-h-[100dvh]`, never `h-screen`.
- Grid over flexbox math. Asymmetric splits (`2fr 1fr`) over equal thirds —
  the generic 3-equal-cards row is banned.
- Below 768px everything collapses to a single column, `w-full px-6`.
  No horizontal overflow, ever.
- Cards only when elevation means something; prefer hairline dividers
  (`border-t border-hairline`, `divide-y`) for lists and data.
- Wide data tables: wrap in `overflow-x-auto` with `min-w-[40rem]` on the
  table — the one approved arbitrary width, rem-based, for horizontal
  scroll on mobile.

## 5. Radius & Elevation

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` / `rounded-sm` | 6px | Buttons, inputs, tags |
| `--radius-md` / `rounded` | 10px | Small cards, popovers |
| `--radius-lg` / `rounded-lg` | 16px | Cards, panels |
| `--radius-xl` / `rounded-xl` | 24px | Large media frames only |

Crisp radii — no pill-shaped containers, no 2rem squircles; trust reads
precise, not toy-like. Pills (`rounded-full`) are allowed only for tiny tags
and avatar-scale elements.

Shadows are near-invisible: `shadow-hairline` (0 1px 2px @ 4%) as resting
state, `shadow-lift` (diffuse, ≤8% opacity) on hover. Never Tailwind's
default `shadow-md/lg/xl`. Most elevation comes from the 1px hairline border,
not shadow.

## 6. Motion

Quiet and directional. Tokens: `duration-fast` 150ms (hover), `duration-base`
300ms (state changes), `duration-slow` 600ms (scroll reveals);
`ease-out-expo` = `cubic-bezier(0.16, 1, 0.3, 1)`. Never `linear` or default
`ease-in-out` for anything visible.

- Animate `transform` and `opacity` only.
- Scroll entries (later phases): fade + `translateY(12px)` over 600ms via
  IntersectionObserver — never `window scroll` listeners.
- Buttons: `active:scale-[0.98]` tactile press; color shift on hover.
- `backdrop-blur` on sticky/fixed chrome only (navbar), never on scrolling
  content.
- No perpetual/infinite animations — they read as gimmick on a trust surface.
- `prefers-reduced-motion` is globally respected (see globals.css).

## 7. Components (established so far)

- **Navbar** ([components/Navbar.tsx](components/Navbar.tsx)): sticky,
  `bg-surface/80` + `backdrop-blur-md`, hairline bottom border, 64px tall.
  Desktop: text links, secondary → ink on hover. Mobile: hamburger whose two
  lines morph to an X via transforms. /leads is intentionally not linked.
- **Footer** ([components/Footer.tsx](components/Footer.tsx)): surface bg,
  hairline top border, asymmetric `2fr 1fr 1fr` grid (brand / Company /
  Legal), mono-faint copyright line.
- **Buttons** (later phases): primary = ink fill, white text, `rounded-sm`,
  `px-5 py-2.5`; secondary = hairline border, surface bg. No glows, no
  gradients.
- **Forms** (later phases): label above input, error text below, focus ring
  in accent.
- **FAQ accordions** (later phases): no boxes — items separated by hairline
  `border-b` only.

## 8. Anti-Patterns (banned — from the loaded taste skills)

- Emojis anywhere in code or content.
- Inter, Roboto, Open Sans, generic serifs.
- Pure black `#000000`; warm cream/bone body backgrounds.
- Purple/neon accents, gradient text, glassmorphism as decoration.
- Default Tailwind shadows; dark harsh drop shadows.
- 3-equal-cards feature rows; nested cards; identical card grids.
- Eyebrow kickers above every section; "01 / 02 / 03" scaffolding labels.
- AI copy clichés: "Elevate", "Seamless", "Unleash", "Next-Gen".
- `h-screen`; `window.addEventListener('scroll')`; animating layout
  properties; arbitrary `z-[9999]`.
- Fake round numbers (99.99%, 50%) and generic placeholder names.
- Inventing page copy — all copy comes from lib/content/ (see
  [lib/content/README.md](lib/content/README.md)).
