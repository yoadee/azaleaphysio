# Azalea Physiotherapy — Session Handoff

_Last updated: 2026-06-17. MVP build complete (all 12 phases). Replace at the end of every session._

## Project goal

Full rebuild of azaleaphysio.com. West Vancouver physiotherapy clinic. 2 locations, 12 practitioners, 10 services. Stack: Next.js 16 (App Router) + TypeScript + **Tailwind v4** + Sanity CMS. Hosted on Vercel. Goal: luxury editorial UX, WCAG AA, conversion + SEO + AEO/GEO optimized.

---

## STATUS: MVP build complete ✅

All 12 phases of the plan are built and the production build passes (`next build` → 51 pages, 0 TypeScript/lint errors). The site runs end to end with real content. It has **not** been deployed to production yet — left for Abtin to review first (see "Remaining before launch").

### What was built this session (Phases 4–12 + home page rework)

| Phase | What | Status |
|---|---|---|
| 0–2 | Copy, foundation, Nav/Footer | ✅ (carried over) |
| 3 | Home page, all 12 sections | ✅ + major fixes (see below) |
| 4 | 8 Sanity schemas + registered | ✅ |
| 5 | `/services` index + 10 detail pages | ✅ |
| 6 | `/team` index + 12 bio pages | ✅ |
| 7 | about, locations, insurance, conditions (+10), what-to-expect, faq, book, blog, careers, privacy | ✅ |
| 8 | sitemap.ts, robots.ts, /llms.txt, schema.ts (MedicalProcedure/Physician/FAQPage/HowTo/WebSite/BreadcrumbList), per-page metadata + canonicals | ✅ |
| 9 | next/image AVIF+WebP, priority hero, font preconnects, security headers | ✅ |
| 10 | GA4 placeholder (env-gated) + booking-funnel event taxonomy | ✅ placeholder |
| 11 | Skip link, semantic HTML, manual WCAG AA pass | ✅ (see a11y note) |
| 12 | `next build` passes; deploy prep done | ✅ code-complete |

---

## Three critical bugs found and fixed this session

1. **All spacing was collapsed sitewide.** `globals.css` had an unlayered `* { margin:0; padding:0 }` reset. In Tailwind v4, utilities live in `@layer utilities`, and unlayered rules beat layered ones, so the reset nullified every `px-*`/`pt-*`/`mb-*` on the site ("nothing in the right place"). Fixed by moving resets into `@layer base` and dropping the redundant margin/padding zeroing.
2. **Satoshi `@import` 500 error.** The Fontshare `@import url()` came after `@import "tailwindcss"`, violating the CSS rule that `@import` precede other rules. Moved it above.
3. **Blurry text + blank sections on scroll-reveal.** `.reveal.is-visible` used `transform: translateY(0)`, keeping elements GPU-composited (blurry text), and `.reveal { opacity:0 }` gated content on JS (sections blank for crawlers/headless). Fixed: revealed state uses `transform: none`; hidden state scoped to `html.js` (set by an inline script) so content is visible by default. Also removed `-webkit-font-smoothing: antialiased` (thins type on Windows).

---

## Abtin's feedback, applied this session

- **No em dashes anywhere.** Swept all rendered copy; uses commas/periods/parentheses instead. (Saved as a durable memory.)
- **Insurer names were repeated too much.** Reduced: the named list now lives canonically in the insurance strip and `/insurance`; hero microcopy and trust strip no longer re-list them.
- **Text felt blurry / not crisp.** Fixed via the reveal/compositing fix, removing `antialiased`, and replacing washed-out low-opacity text with solid colors.
- **Too-light text on too-light backgrounds** (insurer strip): bumped to solid `text-muted` (4.6:1 AA) and audited contrast across Nav/Footer.
- **No AI slop:** ran the `impeccable` skill (brand register). Removed the `01–10` service numbering (flagged as scaffolding), kept restraint, no eyebrow-on-every-section.

---

## Architecture decisions (important)

- **Content source = `src/lib/clinic.ts`** (local TypeScript), not Sanity yet. Pages render real content from this module so the site works as an MVP without manual CMS entry. The 8 Sanity schemas in `src/sanity/schemaTypes/` mirror these shapes. **Migration path:** once content is entered in the Studio, swap the `src/lib/clinic.ts` reads for GROQ queries of the same fields.
- **Booking = WIRED (ClinicMaster).** Live portal `https://azaleaphysio.clinicmaster.com/landing?clinicId=1897&lang=en-CA` (set in `SITE.booking` in `src/lib/clinic.ts`). All primary "Book online" CTAs open it in a new tab; phone numbers remain as the call option. `/book` leads with the portal. Pulled from the old live site along with: corrected practitioner credentials, fax numbers, and Instagram/Twitter (now in footer + JSON-LD sameAs + a ReserveAction). `src/lib/analytics.ts` has the booking-funnel event taxonomy ready to wire.
- **Analytics = placeholder.** `src/components/Analytics.tsx` loads GA4 only if `NEXT_PUBLIC_GA_ID` is set (safe no-op until then). Vercel Analytics can be toggled in the dashboard.

---

## Key new files this session

- `src/lib/clinic.ts` — single source of truth for services, team, conditions, faqs, locations, insurers, testimonials.
- `src/lib/schema.ts` — JSON-LD builders. `src/components/JsonLd.tsx` — injector.
- `src/components/` — `PageHeader`, `BookCta`, `Breadcrumbs`, `RevealObserver`, `Portrait`, `FaqAccordion`, `Analytics`.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts`.
- `src/sanity/schemaTypes/` — service, practitioner, condition, testimonial, location, faq, post, siteSettings.

---

## Accessibility note (Phase 11)

The automated **accesslint** audit could not run in this environment (the CDP/Chrome engine returned non-JSON for every input, including a trivial test snippet — a tooling/env issue, not a site issue). A **manual WCAG AA pass** was done instead: `lang`, skip-to-content link, single `<main>`, descriptive `alt`, accessible button/link names, `aria-expanded` accordions, focus-visible ring, reduced-motion fallback, semantic `figure`/`blockquote`/`dl`/`ol`/`table[scope]`. **Re-run accesslint in a working environment before launch** to confirm.

---

## Remaining before launch (needs Abtin / dashboard access)

1. **Review the site** (the point of waiting): `npm run dev`, walk every page.
2. **Deploy:** push to GitHub (auto-deploys via Vercel) or `vercel --prod`. Build already passes locally.
3. **Vercel env vars:** set `NEXT_PUBLIC_GA_ID` (when GA is created) and confirm Sanity vars.
4. **Sanity CORS:** add the production URL to allowed origins.
5. **Booking system:** DONE (ClinicMaster wired). Remaining: confirm the portal handles both locations correctly, and wire the funnel events in `src/lib/analytics.ts`.
6. **Verify Google rating** (currently ★4.6 · 75+) in Google Business.
7. **Real photography:** hero is generated; About section is a styled placeholder; 3 practitioners (Sirus Vakilian, Ramin Keshmiri, Azam Hosseini) use initials placeholders pending headshots.
8. **Enter Sanity content** then switch pages from `src/lib/clinic.ts` to GROQ.

---

## Design — LOCKED (unchanged)

Palette B: Warm Stone + Restrained Rose. Spectral (next/font) + Satoshi (Fontshare CSS import). Rose on buttons only. No border-radius. WCAG AA. RTL-ready via CSS logical properties. Tokens in `src/app/globals.css` `@theme {}` (Tailwind v4, no config file). Full details in `DESIGN.md`.

---

## Clinic facts (verified)

**16th Street:** Unit 207, 585 16th Street, West Vancouver BC V7V 3R8 | (604) 281-3345 | Mon–Fri 8am–7pm, Sat 9am–3pm
**Ocean Walk:** 1884 Marine Drive, West Vancouver BC V6B 5C6 | (604) 281-3122 | Mon–Fri 8:30am–7pm, Sat 9am–3pm
**Email:** info@azaleaphysio.com | **Founded:** 2011

**Team (12):** Mary Ghoroghi (RPT, owner), Braedan Lalor (PT), Mehdi Tafreshi (Osteopath), Noushin Nouri (RPT), Ali Shafiei (Sports/MSK), Asal (CBT/Psychotherapy), Faranak Shekoohi (Kinesiologist), Kambiz Navirian (Acupuncture), Dr. Sirus Vakilian (Kinesiology), Ramin Keshmiri (Acupuncture), Dr. Azam Hosseini (Psychiatry), Melina Raad (Office Manager).

**Services (10):** Physiotherapy, Sports Injury, Acupuncture, Occupational Therapy, Kinesiology, Osteopathy, Chiropractic, Weight Loss Program, Yoga Therapy, Elderly Care.

**Direct billing:** ICBC, WorkSafeBC, Pacific Blue Cross, Sun Life, Manulife, Canada Life, Green Shield, Desjardins.

---

## Credentials & URLs

- **GitHub repo:** https://github.com/yoadee/azaleaphysio
- **Vercel:** project `azaleaphysio`
- **Sanity Project ID:** `ksdjppy7` / Dataset: `production`
- **Local path:** `C:\Users\abtin\azaleaphysio`
- **Plan file:** `C:\Users\abtin\.claude\plans\declarative-marinating-tome.md`

---

## How Abtin wants to work

- Direct and concise. State assumptions. No clarifying questions when context makes the answer obvious.
- Models: Opus for design/copy/planning, Sonnet for code, Haiku for quick checks.
- **No em dashes. No AI-slop copy. No repeated content. Crisp, high-contrast type.** (Durable feedback — see memory.)
