# Azalea Physiotherapy — Session Handoff

_Last updated: 2026-06-18. MVP build complete. Physiotherapy service page rebuilt to a full "finished" template. Build passes. Not yet deployed._

## Project goal

Full rebuild of azaleaphysio.com. West Vancouver physiotherapy clinic. 2 locations, 12 practitioners, 10 services. Stack: Next.js 16 (App Router) + TypeScript + **Tailwind v4** + Sanity CMS. Hosted on Vercel. Goal: luxury editorial UX, WCAG AA, conversion + SEO + AEO/GEO optimized.

---

## STATUS: Review in progress — service pages polished this session

All 12 phases built, build passes (`next build` 51 pages, 0 errors). Abtin started the review pass this session. Home page, nav, footer, booking CTA, phone numbers all confirmed good. Service pages had issues (see below) — now fixed. **Not yet deployed.**

---

## This session: Physiotherapy service page rebuilt to a finished template

The page was a thin spine (image → list → one paragraph → portraits → links → CTA). Rebuilt it into a substantial, on-brand template, using the `impeccable` skill (polish + brand register) and a fresh-eyes design-critique subagent. **Physiotherapy is now the reference template; the other 9 services are not yet enriched.**

**Data model — `src/lib/clinic.ts`:** `Service` type extended with optional `approach`, `firstVisit` (ordered `ServiceStep[]`), `goodToKnow` (`ServiceFact[]`), `faqs` (`Faq[]`), and `practitioners` (explicit slugs). Added `defaultGoodToKnow` fallback derived from clinic facts. Physiotherapy fully populated: 4 distinct `whoThisHelps`, tightened `whatWeDo`, an `approach` paragraph, a 4-step `firstVisit` arc, 5 facts (incl. fee range), 5 curated FAQs, and explicit practitioners (mary-ghoroghi, braedan-lalor, noushin-nouri).

**Page — `src/app/services/[slug]/page.tsx`:** New section flow with clean rhythm (stone → white → stone → dark → white → stone → white → stone → dark):
1. PageHeader (stone)
2. Hero image
3. "What we do" + approach, paired with a "Good to know" facts rail (white, 2-col)
4. "Is this you?" — checklist grid (stone), distinct layout so the sticky-heading device isn't overused
5. "Your first visit" — numbered sequence (dark) + HowTo JSON-LD
6. "Who you might see" — portraits (white)
7. "Conditions we treat" — fixed cards, white-on-stone with single coherent hover (was the stone-on-stone invisible-card bug)
8. "Common questions" — per-service FAQ (white) + FAQPage JSON-LD
9. Service-matched testimonial (stone), placed right before the CTA as social proof at the decision point
10. BookCta (dark)

Sections render only when their data exists, so un-enriched services degrade gracefully. `schema.ts` `faqPageSchema` + `howToSchema` are now wired in (were scaffolded but unused).

**Critique fixes applied:** removed a verbatim duplicated sentence; cut em dashes from facts copy (house rule); fixed the fragile practitioner-matching (explicit slugs); de-duplicated a `whoThisHelps` bullet; surfaced fees; softened a slightly defensive first-visit line; resolved gold-on-name discipline by moving the testimonial to stone.

`next build` passes: 51 pages, 0 errors. `tsc --noEmit` clean.

**Taste-skill pass (this session):** Ran the `design-taste-frontend` skill as a second lens. It validated the impeccable pass (zero em dashes, eyebrows within budget, no AI tells). Three fixes applied: (1) **rose is now strictly booking-only on the service page** — removed rose from condition-card and practitioner-name hovers (per the locked "rose on buttons only" rule); condition cards now hover via border + supporting-line darkening, practitioner names via a hairline underline. (2) Conditions grid renders 2x2 for 4 items instead of a 3+1 orphan. (3) Trimmed the Marcus L. testimonial to ~3 lines (also improves the home page, which shares it). **Note:** the same rose-on-hover pattern likely exists on the team index and other link lists — sweep it during rollout to keep rose = booking sitewide.

**Logo (this session):** No clean vector existed, only low-res color JPGs (in `logo/`) plus a photo of the office wall sign, which Abtin liked best (the logo rendered monochrome/metallic on dark). Recreated that treatment: traced the cleanest raster mark (`logo/images.jpg`) to a single-color silhouette via a color-distance mask (sharp) + potrace, slimmed to `public/logo-mark.svg` (~21KB). New `src/components/Logo.tsx` renders the mark via CSS `mask-image` + `background-color: currentColor`, so it inherits each section's ink color (ink on stone/white, off-white on dark) with no color-variant assets. Wired into `Nav` (header + mobile overlay) and `Footer` as a mark + Spectral wordmark lockup. The tracing scripts live in `scripts/logo-*.mjs` (need `npm i -D potrace` to re-run; potrace was uninstalled after generating to keep deps clean). Source uploads kept in `logo/` for reference. Build passes.

**Brand sign (this session):** Full lockup as a brand moment at the top of the `Footer` (near-black `--color-footer`): flat off-white mark + "Azalea Physiotherapy" wordmark + a centered "Advanced Health Centre" subline between two flanking rule lines, as on the wall. A brushed-metal/gradient/warm-glow treatment was tried and rejected (Abtin: worse than flat); only the centered-subline-with-rules was kept. `Logo` props: `subline` (centered with flanking rules), responsive `markClass`. Nav stays flat mark + wordmark, no subline. Build passes.

**Logo follow-ups / options:** (1) Still no true high-res vector master, only this trace from a 322px source. Good enough for on-screen at current sizes; commission a proper vector before any large-format/print use. (2) Optional brand moment: the mark could appear large and off-white in a dark section (about page or footer) to echo the wall sign directly. (3) Wordmark is the site's Spectral serif; the original logo uses a sans. If Abtin prefers fidelity to the original lockup, swap the wordmark to a tracked Satoshi caps treatment.

**Next:** Abtin reviews the Physiotherapy template live (`/services/physiotherapy`) and the new logo in the nav/footer. On approval, roll the same depth (approach, firstVisit, goodToKnow, faqs, practitioners) across the other 9 services. Note: `relatedPractitioners` heuristic can mis-staff services without explicit `practitioners` (e.g. weight-loss falls back to physios) — give every service explicit `practitioners` during rollout.

---

## Previously fixed bugs (prior sessions, for reference)

1. **All spacing collapsed sitewide.** Unlayered `* { margin:0; padding:0 }` reset beat Tailwind utilities. Fixed by moving into `@layer base`.
2. **Satoshi 500 error.** `@import` order violated CSS spec. Moved Fontshare import above `@import "tailwindcss"`.
3. **Blurry text + blank sections on scroll-reveal.** `transform: translateY(0)` kept elements composited (blurry); `opacity:0` gated content on JS (blank for crawlers). Fixed with `transform: none` and `html.js` scoping.

---

## Architecture decisions (important)

- **Content source = `src/lib/clinic.ts`** (local TypeScript), not Sanity yet. Pages render real content without CMS entry. The 8 Sanity schemas in `src/sanity/schemaTypes/` mirror these shapes. Migration path: once content is entered in the Studio, swap reads for GROQ queries of the same fields.
- **Booking = WIRED (ClinicMaster).** Live portal `https://azaleaphysio.clinicmaster.com/landing?clinicId=1897&lang=en-CA` (set in `SITE.booking` in `src/lib/clinic.ts`). All "Book online" CTAs open it in a new tab. `/book` leads with the portal.
- **Analytics = placeholder.** `src/components/Analytics.tsx` loads GA4 only if `NEXT_PUBLIC_GA_ID` is set. Safe no-op until then.

---

## Remaining before launch

1. **Continue review pass** -- service pages now fixed, remaining pages to walk: team bios, conditions, about, locations, FAQ, book, blog, careers, insurance, what-to-expect.
2. **Service-page copy enrichment: ALL 10 DONE.** Full revenue/copy strategy in `COPY-STRATEGY.md` (two Opus research agents: SEO/AEO + CRO/offering). Decided: offer = assurance + lead magnet, no discount, traffic via Google Ads, conversion tracking first. All 10 service pages now at template depth (approach, firstVisit, goodToKnow, 5 answer-first FAQs, practitioners). Built with the actual RampStack skills loaded (`seo-aeo-geo`, `landing-page-copy`), not paraphrased. CRO additions from the skill: hero booking CTA on every service page (PageHeader `cta` prop); `relatedPractitioners` no longer falls back to physios, so services with no matching practitioner hide that section instead of mis-staffing. Service schema enriched (areaServed, availableLanguage Persian, provider address, paymentAccepted). FAQ "Common questions" left column made purposeful (helper line + call CTA).

   **Practitioner flags for Mary:** weight-loss → faranak-shekoohi (kinesiologist) and elderly-care → mary-ghoroghi + noushin-nouri (physios) are inferred from how those services are delivered — confirm. occupational-therapy, chiropractic, yoga-therapy have NO team member in that discipline, so "Who you might see" is hidden on those pages until Mary supplies the practitioners. Also deferred pending Mary: skin/aesthetic service page, Farsi/Persian landing page.

   **Service-page perfection still to do before commit:** seo-onpage titles/meta pass (call `seo-onpage`); social-proof-early (move a proof point above the fold) is pending rating verification. Then: home hook rewrite, new /icbc + /pricing pages, sitewide FAQ/MedicalClinic schema + /llms.txt, GA4 + Google Ads conversion tracking.
3. **Deploy:** push to GitHub (auto-deploys via Vercel). Build passes locally.
4. **Vercel env vars:** set `NEXT_PUBLIC_GA_ID` when GA4 is created. Confirm Sanity vars are present.
5. **Sanity CORS:** add the production URL to allowed origins.
6. **ClinicMaster:** confirm the portal handles both locations correctly, then wire the booking-funnel events in `src/lib/analytics.ts`.
7. **Verify Google rating** (currently ★4.6 / 75+) in Google Business dashboard.
8. **Real photography:** AI-generated mood imagery is in place as interim. Swap before launch. 3 practitioners (Sirus Vakilian, Ramin Keshmiri, Dr. Azam Hosseini) use initials placeholders -- no generated faces.
9. **Enter Sanity content** then migrate pages from `src/lib/clinic.ts` to GROQ.
10. **Re-run accesslint** in a working environment before launch (Chrome/CDP env was broken in earlier sessions; manual WCAG pass was done instead).

---

## Design — LOCKED

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
- Don't hand off verification tasks that can be checked from code -- only escalate genuine UI questions or third-party system access.
- Models: Opus for design/copy/planning, Sonnet for code, Haiku for quick checks.
- **No em dashes. No AI-slop copy. No repeated content. Crisp, high-contrast type.**
