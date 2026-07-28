# CYTRAC Architecture — Phase 2 Design Document

Date: 2026-07-16
Status: Approved for implementation
Author: The Root Access Network

---

## Context & Commercial Goal

cytracgames.com is the primary marketing and conversion surface for the CYTRAC board game. The Next.js site handles discovery, trust-building, and routing. Checkout is handled off-site by existing platforms.

The site must:

1. Detect or infer the customer's region
2. Route pre-order CTAs to the correct checkout platform
3. Hand off cleanly with no trust concerns (no exposed internal URLs)

---

## Domain Architecture

- cytracgames.com → Vercel (Next.js — this site)
- shop.cytracgames.com → ShopWired (INTL checkout)
- [TBD].cytracgames.com → Bumpa/Paystack (AFRICA checkout, future)

### DNS Setup (when ready)

cytracgames.com → Vercel

- Already done or pending team sign-off.
- Vercel handles SSL automatically.

shop.cytracgames.com → ShopWired

- Add CNAME in DNS provider pointing to ShopWired's CNAME target.
- Add shop.cytracgames.com as additional domain in ShopWired dashboard.
- Test before switching main domain.

### Why a Subdomain for ShopWired

Sending customers from cytracgames.com to `therootaccessnetwork-limited.myshopwired.com` at checkout creates a trust gap — the domain change is visible and signals "third party" to cautious buyers. A subdomain keeps the brand consistent through the full purchase journey.

---

## Checkout Flow

### INTL (UK / US / International)

- User lands on cytracgames.com
  - → MarketToggle shows UK/US (auto-detected or manually set)
  - → Clicks Pre-Order CTA
  - → /preorder page (product detail, pricing, delivery timeline)
  - → Clicks final CTA
  - → Redirected to shop.cytracgames.com/checkout/basket
  - → Completes purchase on ShopWired hosted checkout

No cart API. No embedded checkout. Clean redirect. ShopWired handles payment, fulfilment, and order management.

### AFRICA (Nigeria v1, expandable)

- User lands on cytracgames.com
  - → MarketToggle shows Africa (auto-detected or manually set), routes to Bumpa
  - → Clicks Pre-Order CTA
  - → /preorder page
  - → Clicks final CTA
  - → Redirected to Bumpa checkout URL

Status: Bumpa checkout live at [https://cytracgames.bumpa.shop/products/cytrac-board-game/5125254?location=350821](https://cytracgames.bumpa.shop/products/cytrac-board-game/5125254?location=350821).

---

## Market Routing — Current Implementation (Phase 1)

Client-side detection via ipapi.co. Works but has known weaknesses:

- 1,000 req/day rate limit on free tier
- Blocked by ad-blockers and privacy browsers
- Causes isDetecting flash on first render
- next: { revalidate: 86400 } in geoip.ts is dead code

This is acceptable for pre-launch. The Phase 2 upgrade (edge middleware) eliminates all of these but is not a launch blocker.

---

## Market Routing — Phase 2 Target (Edge Middleware)

### How It Works

- Request arrives at Vercel Edge

```sh
middleware.ts runs before page renders
├─ Check cytrac_market cookie (manual override from MarketToggle)
├─ If cookie present → use it, pass as header
└─ If no cookie → read x-vercel-ip-country header (Vercel-native, free, zero-latency, no third-party API)
→ resolveMarketFromCountry(countryCode)
→ set cytrac_market cookie (1 year)
→ pass market as x-cytrac-market header

app/layout.tsx (Server Component)
→ reads cookie via cookies() from next/headers
→ passes initialMarket prop to `<MarketProvider>`

MarketProvider
→ initialises state synchronously from prop
→ no useEffect, no GeoIP fetch, no isDetecting state
→ setMarket() writes document.cookie for next request

MarketToggle / PreOrderButton
→ no useIsMounted needed
→ no skeleton state needed
→ market is known at first server render
```

### Files Affected

| File                      | Action                                           |
| ------------------------- | ------------------------------------------------ |
| middleware.ts             | Create                                           |
| context/MarketContext.tsx | Modify — remove GeoIP, accept initialMarket prop |
| app/layout.tsx            | Modify — read cookie, pass to MarketProvider     |
| types/market.ts           | Modify — remove isDetecting, detected fields     |
| hooks/useIsMounted.ts     | Delete                                           |
| lib/geoip.ts              | Keep — fallback for non-Vercel deploys           |
| MarketToggle.tsx          | Modify — remove useIsMounted and skeleton        |
| PreOrderButton.tsx        | Modify — remove useIsMounted and skeleton        |

### Why Not Now

The current client-side system works. The edge middleware upgrade improves reliability and eliminates the detection flash, but it is not required for launch. Implement post-DNS-switch as a quality improvement sprint.

---

## The /preorder Page

A dedicated route at `app/preorder/page.tsx`.

### Purpose

Converts warmed visitors into buyers. Someone who clicks Pre-Order on the landing page is interested but not yet committed. The `/preorder` page gives them the final information they need to confirm the purchase.

### Content

- Hero: product shot + headline ("You're one step away")
- What's in the box: board, cards, tokens, rulebook
- Delivery timeline: current estimated ship date
- Pricing: INTL price (GBP/USD) or AFRICA price (NGN) based on market
- Trust signals: secure payment, worldwide shipping
- Final CTA: "Complete Pre-Order" → checkout URL for active market
- Market indicator: "Shipping to: [market label]" with toggle link

### Routing

- The page reads the active market from MarketContext.
- The final CTA href resolves to the correct checkout URL.
- No additional market selection UI needed — MarketToggle in header handles it.

### What It Is Not

- Not a checkout page.
- No payment processing. No cart. No form.
- It is a single-purpose conversion page that ends in a redirect.

---

## ShopWired Constraint (Permanent)

ShopWired has no Storefront API. No cart endpoints. No headless checkout.

The Admin API supports products, orders, stock, and customers but cannot initiate a customer-facing checkout session.

Consequence: INTL checkout always redirects to ShopWired hosted storefront.
A headless INTL checkout is not possible without migrating away from ShopWired.

This is a permanent architectural constraint, not a gap to be filled.

---

## Mailchimp Integration

Route handler at app/api/subscribe/route.ts proxies form submissions to Mailchimp's embedded form POST endpoint.

Uses MAILCHIMP*ACTION_URL (server-only env var, never NEXT_PUBLIC*).

This is the embedded form URL, not the Mailchimp API v3.
No API key is used or required for the current integration.

Bot protection: server-side honeypot check. If botField is populated, returns silent success (bot is not informed it was caught).

Rate limiting: not implemented. Add Cloudflare Turnstile post-launch if spam becomes an issue.

---

## Environment Variables

| Variable                  | Scope       | Current Value | Purpose                 |
| ------------------------- | ----------- | ------------- | ----------------------- |
| NEXT_PUBLIC_SHOPWIRED_URL | Public      | set           | INTL checkout URL       |
| NEXT_PUBLIC_BUMPA_URL     | Public      | set           | AFRICA checkout URL     |
| MAILCHIMP_ACTION_URL      | Server-only | set           | Mailchimp form endpoint |

NEXT_PUBLIC_SHOPWIRED_URL target value once subdomain is configured: [https://shop.cytracgames.com/checkout/basket](https://shop.cytracgames.com/checkout/basket)

---

## What Is Not In Scope

| Item                          | Reason                                        |
| ----------------------------- | --------------------------------------------- |
| Embedded checkout             | ShopWired has no Storefront API               |
| Cart session management       | Not needed for redirect model                 |
| Custom AFRICA checkout        | Bumpa store live at cytracgames.bumpa.shop    |
| Medusa/headless migration     | Deferred until ShopWired migration decision   |
| Vercel KV rate limiting       | Turnstile covers the threat model when needed |
| Commerce adapter abstractions | Premature until headless is confirmed         |

---

## Pre-Launch Checklist

- [ ] shop.cytracgames.com CNAME configured and resolving to ShopWired
- [ ] NEXT_PUBLIC_SHOPWIRED_URL set to shop.cytracgames.com checkout URL in Vercel environment variables
- [ ] /preorder page built and tested on cytrac.vercel.app
- [ ] INTL pre-order flow tested end-to-end (Next.js → ShopWired checkout)
- [x] AFRICA market routes to Bumpa checkout (placeholder replaced)
- [ ] Team and founder aligned on DNS switch timing
- [ ] DNS switched: cytracgames.com → Vercel
- [ ] SSL confirmed on both cytracgames.com and shop.cytracgames.com
- [ ] Smoke test all CTAs on live domain
