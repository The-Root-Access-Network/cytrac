# AGENTS.md — Cytrac

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript strict
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`, no `tailwind.config`)
- **Runtime:** React 19
- **Hosting:** Vercel

## Commands

| Command         | What it does             |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint (flat config) |

No typecheck, test, or format scripts — `tsc --noEmit` and `prettier --check .` if needed.

## Env Vars

| Var                         | Scope  | Purpose                                        |
| --------------------------- | ------ | ---------------------------------------------- |
| `NEXT_PUBLIC_SHOPWIRED_URL` | public | INTL checkout (live: intl.cytracgames.com)    |
| `NEXT_PUBLIC_BUMPA_URL`     | public | AFRICA checkout (live: cytracgames.bumpa.shop) |
| `MAILCHIMP_ACTION_URL`      | server | Mailchimp POST endpoint                        |

## Architecture

- **Market Routing (core logic):** `MarketContext` detects country via ipapi.co, resolves to `"INTL"` or `"AFRICA"`, drives checkout URL. See `project-instructions.md` for full flow.
- **`"use client"` boundaries:** Only PreOrderButton, MarketToggle, MarketContext, NewsletterForm, useIsMounted. Everything else is a Server Component.
- **Design tokens:** Defined in `globals.css` via Tailwind v4 `@theme` block. Colors, fonts, spacing, radii, shadows — always use semantic aliases (e.g. `bg-cta`, `text-brand-blue`, `font-display`).
- **Fonts:** Nunito (`--font-display`, headings/CTAs), Inter (`--font-body`, body/UI). Loaded via `next/font/google` in `app/layout.tsx`.
- **Path alias:** `@/` maps to project root (`tsconfig.json` paths).
- **Sections:** One file per landing section in `components/sections/`. UI primitives in `components/ui/`.
- **Hook:** Use `useMarketRoute()` from `hooks/useMarketRoute.ts` rather than reading `MarketContext` directly.

## Commits

```bash
type(scope): description
```

- **Types:** `feat` (new feature), `fix` (bug/correction), `chore` (assets, config, tooling), `docs` (documentation).
- **Scope:** Area of the codebase — `ui`, `preorder`, `copy`, `context`, `core`, `components`, `layout`, `assets`, `api`, `docs`.
- **Description:** Present-tense imperative, capitalised, specific about what changed. Aim for 50-72 chars; use more if needed.

| Commit example                                                                       | What it communicates                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `feat(preorder): create /preorder page with market-aware pricing and CTA components` | New page with client islands for pricing and checkout routing |
| `fix(ui): route landing page pre-order CTAs to /preorder instead of direct checkout` | Behavioural change to existing buttons                        |
| `chore(assets): add rulebook product shot and card deck images`                      | New binary assets, no code change                             |
| `docs(architecture): add phase 2 design doc with routing, security, and media plans` | Documentation-only commit                                     |

Group related changes into separate commits — never mix new pages, component refactors, and asset additions in a single commit.

## Tailwind v4 specifics

- PostCSS plugin is `@tailwindcss/postcss` (separate npm package, not bundled).
- Config is `@theme` in CSS, not `tailwind.config.*`. No `@tailwind base/components/utilities` directives.
- Use `@layer base / components / utilities` for custom styles.

## ESLint

Flat config at `eslint.config.mjs` using `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

@../.config/opencode/rules.md
