# CYTRAC — Project Instructions (Phase 2)

## What This Project Is

Custom Next.js landing page and market routing system for the CYTRAC cybersecurity family board game. Built by The Root Access Network.

[cytracgames.com](cytracgames.com) is the marketing and conversion hub. Checkout is handled off-site by ShopWired (INTL) and Bumpa (Nigeria, expandable to Africa).

- Phase 1 (complete): Full landing page UI, market routing, newsletter form.
- Phase 2 (current): /preorder page, real checkout URLs, DNS switch prep.
- Phase 3 (future): Edge middleware routing, Turnstile bot protection.

---

## Tech Stack

- Framework: Next.js 16 (App Router)
- Runtime: React 19
- Language: TypeScript (strict mode — no any, no unchecked types)
- Styling: Tailwind CSS v4 with @tailwindcss/postcss
- Hosting: Vercel
- Environment: WSL2 (Ubuntu), Node v22

Always use App Router (app/ directory). Never Pages Router.

---

## Project Structure

```bash
cytrac/
├── app/
│   ├── layout.tsx          # Root layout, fonts, MarketProvider
│   ├── page.tsx            # Landing page (all sections)
│   ├── preorder/
│   │   └── page.tsx        # /preorder conversion page (Phase 2)
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts    # Mailchimp proxy Route Handler
│   └── globals.css         # Tailwind v4 @theme tokens + base styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky header, Server Component
│   │   └── Footer.tsx      # Site footer, Server Component
│   ├── sections/           # One file per landing page section
│   │   ├── Hero.tsx
│   │   ├── ValueProposition.tsx
│   │   ├── TrustSignals.tsx
│   │   ├── GameFeatures.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── FAQ.tsx
│   └── ui/
│       ├── MarketToggle.tsx    # Client component — market switcher
│       └── PreOrderButton.tsx  # Client component — market-aware CTA
├── context/
│   └── MarketContext.tsx   # Global market provider
├── hooks/
│   ├── useMarketRoute.ts   # Consumes MarketContext
│   └── useIsMounted.ts     # SSR hydration guard (Phase 3: delete)
├── lib/
│   ├── markets.ts          # MARKETS config, resolveMarketFromCountry()
│   └── geoip.ts            # ipapi.co fetch (Phase 3: replaced by middleware)
├── types/
│   └── market.ts           # MarketKey, Market, MarketState types
└── public/
├── images/
│   ├── game/           # WebP game assets
│   └── logo/           # PNG and SVG logos
└── og/                 # OpenGraph images (add before DNS switch)
```

---

## Market Routing System

This is the most critical feature. Read this before touching any CTA.

### How It Works (Phase 1 — Current)

1. MarketContext mounts, checks localStorage for cytrac_market key
2. If none, calls detectCountryCode() → ipapi.co/json/
3. resolveMarketFromCountry() returns "AFRICA" or "INTL"
4. state.active determines checkout URL used by PreOrderButton
5. User can override via MarketToggle → saves to localStorage

### Market Keys

- "INTL" | "AFRICA" — always use MarketKey type, never raw strings. AFRICA market currently serves Nigeria (v1).

### Nigeria Country Scope (v1, expandable)

- NG (primary), with broad Africa detection routing to Bumpa

### Checkout URLs

Set in environment variables — never hardcoded in source.

- `NEXT_PUBLIC_SHOPWIRED_URL` → INTL market checkout
- `NEXT_PUBLIC_BUMPA_URL` → AFRICA/Nigeria market checkout (live: cytracgames.bumpa.shop)

### Phase 3 Upgrade (not yet implemented)

- Client-side GeoIP will be replaced by Vercel edge middleware reading `x-vercel-ip-country`. Market will be known at first server render.
- `useIsMounted` and `isDetecting` will be removed. See architecture doc.

---

## Key Rules

### TypeScript

- Strict mode. No any. No unchecked types.
- Props interfaces at top of file, before component.
- Use MarketKey type — never raw "INTL" or "AFRICA" strings.

### Components

- "use client" only where genuinely needed (hooks, events, browser APIs).
- Keep as much as possible as Server Components.
- All interactive elements need aria-label, aria-expanded, etc.
- No inline styles — Tailwind only. Custom tokens in globals.css.

### Styling

- Tailwind v4. Tokens defined in @theme block in globals.css.
- @keyframes must be top-level — not inside @layer (Turbopack constraint).
- Font variables (--font-display, --font-body) are injected by next/font/google
  in layout.tsx. Do not redeclare them in @theme.
- Google Fonts must use next/font/google — never @import url() in CSS
  (causes PostCSS/Turbopack ordering errors).

### Images

- Always use next/image for anything in public/.
- Always set width and height props (prevents CLS).
- Always set sizes attribute on responsive images.
- priority only on above-the-fold images (Hero, Header logo).
- Game images are WebP. Logos are PNG and SVG.

### Mailchimp

- Route handler at /api/subscribe proxies to MAILCHIMP_ACTION_URL.
- MAILCHIMP*ACTION_URL is server-only — no NEXT_PUBLIC* prefix.
- This uses the embedded form POST endpoint, not Mailchimp API v3.
- Honeypot field name: b_d3f09316b76ee9f06606331c6_7075ffe2a2
- Server checks honeypot — if populated, returns silent success.

### ESLint

- Prefer named functions inside useEffect over disable comments.
- next: { revalidate } in client-side fetch is a no-op — do not use.

---

## Brand

### Colours (Tailwind utility → CSS token → hex)

| Utility           | Token              | Hex     | Use                   |
| ----------------- | ------------------ | ------- | --------------------- |
| bg-cta / text-cta | --color-cta        | #FF8A00 | CTA buttons only      |
| bg-brand-blue     | --color-brand-blue | #0057B8 | Headings, borders     |
| bg-bg-dark        | --color-bg-dark    | #0B131F | Dark sections         |
| bg-bg-light       | --color-bg-light   | #F4F7FC | Default background    |
| text-forest       | --color-forest     | #2F5D50 | Subheadings, eyebrows |
| text-success      | --color-success    | #7AC943 | Checkmarks            |
| bg-mint           | --color-mint       | #EAF7F1 | Badges, accents       |
| text-body         | --color-body       | #555555 | Body copy             |

### Section Background Pattern

- Hero: bg-bg-dark
- → ValueProposition: bg-bg-light
- → TrustSignals: bg-brand-blue
- → GameFeatures: bg-bg-light
- → NewsletterForm: bg-bg-light
- → FAQ: bg-bg-dark
- → Footer: bg-bg-dark

Dark sections bookend the page. Brand-blue trust band in the middle.

### Typography

- font-display → Nunito (headings, CTAs, eyebrows)
- font-body → Inter (body copy, labels)
- Both loaded via next/font/google in layout.tsx.

### Tone

- Warm, direct, accessible. Audience is parents and families.
- Not cybersecurity professionals. No jargon.
- If a secondary school student wouldn't understand it on first read, rewrite it.

### Shared CSS Primitives

- `.section-pad` — vertical padding with clamp(), use on every section
- `.container-content` — max-width 72rem, centred
- `.btn-primary` — CTA button with breathe animation
- `.btn-secondary` — ghost button
- `.card` — white card with blue-tinted shadow
- `.eyebrow` — small uppercase label
- `.trust-check` — checkmark list item (::before mask SVG)
- `.trust-check--on-dark` — white variant for dark/blue backgrounds

---

## Assets

### Logos

- /public/images/logo/cytrac-logo.png — header (priority, h-12 w-auto)
- /public/images/logo/cytrac-logo-wordmark.png — footer (h-16 w-auto)
- SVG variants available but PNG used in production (transparent bg confirmed)

### Game Images (all WebP)

- cytrac-hero-lifestyle.webp — Hero section
- game-board-flat-full.webp — GameFeatures row 1
- cards-red-threat.webp — GameFeatures row 2
- cytrac-hero-game-setting.webp — GameFeatures row 3
- cytrac-box-bundle.webp — available, not currently used
- Additional: card-blue-bail, cards-green-defense, cards-yellow-concept,
- game-board-flat, role-tokens

### OpenGraph

- /public/og/cytrac-og.png — not yet created. Required before DNS switch.
- 1200×630px. Add URL to metadata in app/layout.tsx once created.

---

## Social Links (CYTRAC accounts)

- Facebook: [https://www.facebook.com/share/18yekWBXDP/](https://www.facebook.com/share/18yekWBXDP/)
- TikTok: [https://www.tiktok.com/@cytracgames](https://www.tiktok.com/@cytracgames)
- X: [https://x.com/cytracgames](https://x.com/cytracgames)
- Instagram: [https://www.instagram.com/cytracgames](https://www.instagram.com/cytracgames)
- LinkedIn: [https://www.linkedin.com/showcase/cytracgames/](https://www.linkedin.com/showcase/cytracgames/)

---

## What to Flag Before Doing

Raise with the team/Claude before acting on:

- Changes to checkout URLs or market scope
- New environment variables
- DNS or domain configuration changes
- SEO copy or product descriptions needing founder sign-off
- Any change to the Mailchimp form fields or honeypot

---

## Phase 2 Immediate Tasks

1. Build /preorder page (app/preorder/page.tsx)
   - Product detail, what's in the box, delivery timeline, pricing
   - Market-aware final CTA (reads from MarketContext)
   - Market indicator showing current region with toggle link
   - No payment processing — ends in redirect to checkout URL

2. Configure shop.cytracgames.com subdomain
   - Add CNAME in DNS provider → ShopWired CNAME target
   - Add shop.cytracgames.com in ShopWired domain settings
   - Confirm `https://shop.cytracgames.com/checkout/basket` resolves
   - Set `NEXT_PUBLIC_SHOPWIRED_URL` in Vercel env vars

3. Create OG image for cytracgames.com (1200×630px)
   - Add to /public/og/cytrac-og.png
   - Wire into layout.tsx metadata

4. Pre-launch smoke test on cytrac.vercel.app
   - INTL pre-order flow: landing → /preorder → ShopWired checkout
   - AFRICA pre-order flow: landing → /preorder → Bumpa checkout
   - Newsletter form submission
   - MarketToggle switching

5. DNS switch (after team alignment)
   - Point cytracgames.com to Vercel
   - Confirm SSL on cytracgames.com and shop.cytracgames.com
   - Smoke test all flows on live domain
