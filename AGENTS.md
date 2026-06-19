<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Azalea Physiotherapy — Project Brief

Read this every session. It is the portable context, so any session (PC, web at
claude.ai/code, or phone) starts with the full picture. For current build state and the
pre-launch checklist, read `HANDOFF.md` next.

## Who I'm working with

Abtin owns this project. He is non-technical on web development, so explain technical things
in plain English, not jargon. Be direct and concise. State assumptions explicitly before
acting. Do not ask clarifying questions when the answer is obvious from context.

## Writing rules (non-negotiable)

- Never use em dashes. Restructure with commas, periods, or parentheses. Applies to site
  copy and to chat replies.
- No AI-slop copy. No generic filler, no "your health is our priority" voice. Run the
  `impeccable` skill and writing guidance before shipping user-facing text.
- No repeated content. Do not list the same thing (for example insurer names) in many
  places. Keep one canonical location and link to it.

## Design rules

- Crisp, high-contrast type. Abtin dislikes washed-out text. Favor solid colors over
  low-opacity modifiers for anything meant to be read. Every text/background pair must meet
  WCAG AA (4.5:1 normal, 3:1 large).
- Design system is LOCKED, documented in `DESIGN.md`. Palette B: Warm Stone + Restrained
  Rose. Rose on buttons only. No border-radius. Spectral (display) + Satoshi (body).
  RTL-ready via CSS logical properties (a `/fa` Farsi section exists).
- Tailwind v4: tokens live in `src/app/globals.css` inside `@theme {}`. There is no
  `tailwind.config` file. Base resets must sit inside `@layer base` so they never override
  Tailwind utilities.
- Run the `impeccable` skill for non-trivial UI work and to avoid AI-slop visuals.

## How the project is built

- Stack: Next.js (App Router) + TypeScript + Tailwind v4 + Sanity CMS, hosted on Vercel.
- Content source of truth: `src/lib/clinic.ts` (local TypeScript: services, team, conditions,
  FAQs, locations, insurers, testimonials). Pages read from it so the site works without
  manual CMS entry. Sanity schemas in `src/sanity/schemaTypes/` mirror these shapes for a
  future migration to GROQ.
- Booking: live ClinicMaster portal in `SITE.booking` (`src/lib/clinic.ts`). "Book online"
  CTAs use it; phone numbers stay as the call option.
- Imagery: interim AI-generated mood images in `public/images/generated/` (warm stone/oak
  editorial, no people), to be swapped for real clinic photography. Never generate fake faces
  for real named practitioners; missing headshots use initials placeholders.
- SEO/AEO: sitemap, robots (AI crawlers allowed), `/llms.txt`, and JSON-LD live in the app.
  Keep content answer-first and depth-rich; question-form H2s where natural.

## Key files

- `HANDOFF.md` — current state, decisions, pre-launch checklist. Keep it updated.
- `DESIGN.md` — locked visual system. `PRODUCT.md` — brand strategy. `COPY.md` — source copy.
- `src/lib/clinic.ts` — all clinic content. `src/lib/schema.ts` — JSON-LD builders.

## Model preferences

Opus for design, copy, and planning. Sonnet for coding. Haiku for quick checks.

## Working agreement

- Commit and push only when asked. Work happens on a preview branch (check the current
  branch with `git branch --show-current`; do not commit straight to `master`, which is
  production). `master` is what deploys live.
- After user-facing copy changes, sweep for em dashes and repeated content.
- End commit messages with: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
