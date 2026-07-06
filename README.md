# LeadsPitch

Digital storefront for niche business lead lists. Next.js 14 (App Router),
TypeScript, Tailwind CSS. No component library, no database, no API routes.

- Design system and rules: [DESIGN.md](DESIGN.md)
- Page copy sources: [lib/content/README.md](lib/content/README.md)

## Develop

```bash
npm install
npm run dev
```

## Routes

`/`, `/about`, `/contact`, `/faq`, `/blog`, `/blog/[slug]`,
`/privacy-policy`, `/terms-of-service`, `/refund-policy` — placeholder shells.

`/leads`, `/leads/[category]` — intentionally empty ("Coming soon"), not
linked in navigation yet.
