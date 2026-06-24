# Azalea Physiotherapy — Handoff

_Last updated: 2026-06-18 (overnight build session). MVP + launch waves 1-2 done: all 10 service pages, enriched conditions + /whiplash, new /icbc + /worksafebc + /pricing money pages, per-location pages, team E-E-A-T, home hook rewrite, sitewide AEO, 19-article SEO/AEO blog. Full research-backed Google Ads + SEO strategy in MARKETING-STRATEGY.md. Build passes (clean). DEPLOYED to Vercel **Preview** (mvp-rebuild branch); production (master) promotion still needs Abtin._

---

## ▶ CURRENT STATE (2026-06-18, GA4 + production cutover)

- **GA4 wired** (commit `5c9a86f`): `Analytics.tsx` + `AnalyticsEvents.tsx` send SPA pageviews + a sitewide delegated click listener firing `booking_start` (any Jane App booking link) and `phone_tap` (any tel:). Measurement ID `G-MP980R9WH4`. Setup steps in `ANALYTICS-SETUP.md`. Mark both events as Key events in GA4; import to Google Ads post-launch.
- **Production cutover:** direct push to `master` is blocked by the safety classifier. Instead, Vercel **Production Branch was changed to `mvp-rebuild`** so production builds from the real code. `master` is still the abandoned scaffold (commit `507c259`) — do not rely on it. Public domain `www.azaleaphysio.com` still points at the OLD nginx host; DNS cutover is the final, deliberate launch step (not done).
- **Emil Kowalski design pass: DONE** (commit `26bee15`) — motion/interaction polish landed; design system untouched and LOCKED.

---

## Earlier queued task (Emil pass — now DONE, kept for reference)

**Task:** Run Abtin's **Emil Kowalski design skill** over the site for a craft-level polish pass (interaction/motion, visual hierarchy, spacing rhythm, typographic precision, micro-interactions). Load that skill FIRST before making any design judgement (per memory: do not assume design principles before the relevant skill is loaded). The skill was not present in the prior session; Abtin confirmed it exists and is opening a fresh session so it loads.

**Recommended approach:** audit-first. Produce findings + a short phased plan, get Abtin's nod, then implement. Abtin is hands-off but wants to approve direction on a pass this size.

**Suggested scope (highest-traffic / highest-value first):** home (`src/app/page.tsx`), the money/landing pages (`/icbc`, `/worksafebc`, `/pricing`), the new blog (`/blog` index + `/blog/[slug]` renderer at `src/app/blog/[slug]/page.tsx`), then service/condition/team templates. Ask Abtin if he wants whole-site or just these.

**DESIGN SYSTEM IS LOCKED — do not break it (see `DESIGN.md`):**
- Palette B: Warm Stone + Restrained Rose. **Rose is for buttons/booking only** (not link hovers, not accents).
- Fonts: Spectral (display, via next/font) + Satoshi (sans, Fontshare CSS import). Gold is a sparing accent (eyebrows, numerals, takeaway ticks).
- **NO border-radius anywhere.** Square corners are a deliberate brand choice.
- WCAG AA. **Crisp, high-contrast type — avoid low-opacity / washed-out text** (Abtin feedback; tune any faint `/60`-ish greys on important copy).
- RTL-ready: use CSS **logical properties** (padding-inline, margin-inline, inset-inline-start) for any new spacing — there is a future `/fa` Farsi route.
- Tailwind **v4**, CSS-first: all tokens live in `src/app/globals.css` inside `@theme {}`. **No tailwind.config.** Colors are `bg`, `stone`, `text`, `muted`, `dark`, `dark-text`, `rose`, `rose-dark`, `gold`, `border`.

**Motion notes (relevant to an Emil Kowalski pass):** scroll-reveal is `.reveal` -> `.is-visible` via `RevealObserver` / an IntersectionObserver, scoped to `html.js` (set in `layout.tsx` before paint to avoid FOUC / blank sections for no-JS + crawlers). Any new animation must respect `prefers-reduced-motion` and must not hide content from crawlers. Keep transitions tasteful and fast; the brand is editorial/restrained, not flashy.

**Key components to polish:** `Nav.tsx` (scroll state + mobile overlay), `Footer.tsx`, `PageHeader.tsx`, `BookCta.tsx`, `FaqAccordion.tsx`, `Portrait.tsx`, `Breadcrumbs.tsx`, `RichText.tsx` (blog inline), and the blog article renderer.

**Abtin's working prefs:** direct/concise; no em dashes; no AI-slop; state assumptions; don't ask to verify things checkable from code. Models: Opus for design.

**Workflow / deploy:** project at `C:\Users\abtin\azaleaphysio`, branch `mvp-rebuild`. Shell resets cwd each call (cd every time). gh at `C:\Program Files\GitHub CLI` (add to PATH). Verify with `npx tsc --noEmit` then `npx next build` (both currently clean). Commit + `git push origin mvp-rebuild` -> auto Vercel **Preview**. **Production (master) push is blocked by the safety classifier — needs Abtin to approve or click Promote in Vercel.** Preview URLs sit behind Vercel login (Abtin views them logged in). Latest preview build: commit on `mvp-rebuild`, all routes green.

**Still open (not design):** promote to production; pick home headline (3 options, A is live); confirm non-physio fees + cancellation policy; add blog cover images; GA4 + conversion tracking before ads.

---

## What changed this session (2026-06-18 overnight)

Branch `mvp-rebuild` pushed to GitHub; Vercel auto-builds a **Preview** per push (build succeeds, all routes prerender). Latest commits: env fallback, money pages + conditions + locations, home/team/about/AEO.

- **Item 1 — Home hook:** hero now leads with **"The cause, not just the symptom."** + differentiator subline (one roof, English/Farsi). FAQPage schema added to home. Fixed "14 years" -> "15" (founded 2011). Removed unverified "free parking" claim. **3 headline options for Abtin to pick are in the session summary; A is live.**
- **Item 2 — New money pages:** `/icbc` (25 pre-approved visits, no referral, direct billing; HowTo + FAQPage schema), `/worksafebc` (provider, direct billing, return-to-work), `/pricing` (physio fees $110-135 / $90-110 verified; other disciplines say "call for fee" — see open item). All message-matched as Google Ads landing pages, wired into sitemap (priority 0.9) + footer.
- **Item 3 — Conditions:** enriched big four (back/neck, knee, shoulder, post-surgical) with symptoms, approach, recovery timeline, FAQPage schema. Added **/conditions/whiplash** (split from car-accident). ICBC/WorkSafeBC cross-link bands on the relevant conditions.
- **Item 4 — Per-location pages:** `/locations/16th-street` + `/locations/ocean-walk`, unique NAP + framing, hours, directions, per-location `MedicalClinic`+`Physiotherapy` schema with parsed opening hours. Index page links to them.
- **Item 5 — Team E-E-A-T:** "Registered with the College of Physical Therapists of BC" on the 4 physiotherapists (no fabricated numbers), Farsi badge, schema `memberOf`/`knowsAbout`.
- **Item 6 — Supporting pages:** About now centers Mary's cause-finding reputation + Farsi roots; Insurance cross-links to /icbc and /worksafebc; Book has expectation-setting copy; FAQ gains Farsi-availability + cancellation-policy Q&As.
- **Item 7 — Sitewide schema/AEO:** BreadcrumbList already emitted by Breadcrumbs component (confirmed). Enriched `/llms.txt` with money pages, ICBC 25-visit fact, fee ranges, NAP, Farsi. FAQPage schema now on home, conditions, icbc, worksafebc, pricing.
- **Strategy:** `MARKETING-STRATEGY.md` — keyword research (volumes/CPC labelled Verified/Estimated), Google Ads campaign structure + budget model (~$1-2k/mo, ~$84/booking, ~10:1), 90-day plan, local SEO + AEO. Headline: ICBC/WorkSafeBC + Farsi are the highest-ROI lanes; Search not PMax; conversion tracking first.

**Still on Abtin / blocked:** promote to production (push master was auto-blocked; approve it or click Promote in Vercel). Confirm non-physio discipline fees. Confirm cancellation policy terms. Pick home headline option.

## Blog / Notes (2026-06-18 overnight, session 2)

Built the blog from an empty placeholder into a working SEO/AEO content engine with **19 published articles**.

- **Architecture:** articles are local typed data in `src/content/posts/<slug>.ts` (one file per article) registered in `src/content/posts/index.ts`, rendered by `src/app/blog/[slug]/page.tsx`. The `BlogPost` type (`src/content/blog.ts`) mirrors the Sanity `post` schema, so this migrates into Sanity later (body blocks → Portable Text). Chose local-first to match the clinic.ts pattern and because there is no Sanity write token; the value is live and indexable now.
- **Per article:** answer-first "Key takeaways" panel (AEO 18-token rule), H2/H3 body, inline `[label](/path)` internal links to money/service/condition pages (revenue), 4-6 FAQs (FAQPage JSON-LD), `BlogPosting` JSON-LD, practitioner author byline + E-E-A-T strip, related services/conditions cards, related reading. Blog index grouped by category; all 19 in the sitemap.
- **Coverage (mapped to the MARKETING-STRATEGY keyword research):** ICBC/insurance (does-icbc-cover-physiotherapy, whiplash-heal, after-a-car-accident, icbc-active-rehab, worksafebc); injuries/conditions (knee-pain-stairs, lower-back-pain, neck-pain-headaches, sciatica, rotator-cuff-vs-frozen-shoulder, knee-replacement-recovery, tennis-elbow); how-physio-works (referral-in-BC, physio-vs-chiro-vs-osteo, first-appointment, cost-in-west-van, farsi-speaking-physio); recovery/prevention (return-to-sport, fall-prevention-seniors).
- Built clean: `tsc` 0 errors, `next build` 0 errors. Written via 5 research subagents + 2 hand-written exemplars; all fact-checked (whiplash WAD grades, ICBC 25+12 visits, BC direct access, MSP supplementary benefit, cauda equina red flags).
- **To do later:** add cover images (coverImage field exists in the Sanity schema; renderer currently text-only), and when ready migrate articles into Sanity Studio. Authors/dates are all 2026-06-18; stagger publish dates if you prefer a drip.

---

## Project goal

Full rebuild of azaleaphysio.com. West Vancouver physiotherapy clinic, 2 locations, 12 practitioners, 10 services. Stack: Next.js 16 (App Router) + TypeScript + **Tailwind v4** + Sanity CMS, hosted on Vercel. Goal: luxury editorial UX, WCAG AA, and conversion + SEO + AEO/GEO optimized. **The end goal is more booked appointments (revenue), with Google Ads as the traffic plan.**

---

## Current status & restore points

All 12 build phases complete; `next build` passes (51 pages, 0 errors), `tsc --noEmit` clean. Not deployed (review first, then push to GitHub auto-deploys via Vercel).

Branch: `mvp-rebuild`. Restore points (commit locally, not pushed):
- `af1eb34` — baseline: all service pages enriched, logo + brand sign, copy/SEO strategy
- `d3d8c14` — real Google reviews replace placeholder testimonials

To compare design alternatives going forward: commit a known-good state first, branch per option, push branch for a Vercel preview URL, keep the winner.

---

## Architecture (important)

- **Content source = `src/lib/clinic.ts`** (local TypeScript), not Sanity yet. Pages render real content without CMS entry. The 8 Sanity schemas in `src/sanity/schemaTypes/` mirror these shapes. Migration path: enter content in the Studio, then swap reads for GROQ queries of the same fields.
- **Booking = WIRED (Jane App).** Live portal in `SITE.booking` (`https://azaleaphysiotherapyclinic.janeapp.com/`). All "Book online" CTAs open it in a new tab. (Migrated off ClinicMaster.)
- **Analytics = placeholder.** `src/components/Analytics.tsx` loads GA4 only if `NEXT_PUBLIC_GA_ID` is set. Safe no-op until then.
- **Schema helpers** in `src/lib/schema.ts`: `serviceSchema` (MedicalProcedure + `clinicProvider`), `faqPageSchema`, `howToSchema`, `practitionerSchema`, `websiteSchema`. Sitewide `MedicalBusiness` schema lives in `src/app/layout.tsx` (now with `aggregateRating` 4.6/83, `availableLanguage` English+Persian, `areaServed`, `paymentAccepted`, 2 MedicalClinic locations).
- **Tooling:** `sharp` + `puppeteer` are devDeps. Puppeteer can drive headless Chrome (used to pull Google reviews; also enables live-page screenshots for visual QA). Logo trace scripts in `scripts/logo-*.mjs` (need `npm i -D potrace` to re-run).

---

## What's done

**Service pages (all 10) — `src/app/services/[slug]/page.tsx` + `clinic.ts`.** Each at full template depth: `whoThisHelps`, `whatWeDo`, an `approach` paragraph, a 4-step `firstVisit` arc (HowTo JSON-LD), a "Good to know" facts rail, 5 answer-first FAQs (FAQPage JSON-LD), explicit `practitioners`, and a service-matched testimonial. Section rhythm: stone → white → stone → dark → white → stone → white → stone → dark. Built with the actual RampStack skills loaded (`seo-aeo-geo`, `landing-page-copy`, `seo-onpage`) plus `impeccable` and `design-taste-frontend` for design.
- Hero booking CTA + above-the-fold "★ 4.6 from 83 Google reviews" on every service page (`PageHeader` `cta` prop).
- `relatedPractitioners` no longer falls back to physios: services with no matching practitioner hide that section instead of mis-staffing.
- Service titles resolve via the layout template (`{Service} in West Vancouver | Azalea Physiotherapy`); meta descriptions carry differentiators + soft CTA.

**Testimonials = REAL.** Pulled 10 verbatim 5-star Google reviews via headless Chrome (cleared the consent wall). 6 wired into `clinic.ts`, tagged by service (physiotherapy, sports-injury, kinesiology), excerpted to the reviewer's own words, names as shown publicly on Google, marked "Verified Google review". Home testimonial = Tomáš Majzel ("diagnose the cause... my 5-year lasting pain was gone"), which lands the brand hook. 4 more reviews available to add.

**Logo + brand sign.** No clean vector existed (only low-res JPGs in `logo/` + a photo of the wall sign). Traced the cleanest raster mark to a single-color silhouette (`public/logo-mark.svg`, ~21KB), recolored via CSS `mask-image` + `currentColor` so it inherits each section's ink (`src/components/Logo.tsx`). In `Nav` (header + mobile) and `Footer`. Footer carries the full lockup: mark + Spectral wordmark + centered "Advanced Health Centre" subline between flanking rules (a brushed-metal treatment was tried and rejected). Nav contrast over the hero photo fixed with a light scrim + stronger link weight.

**Rating + entity signals.** 4.6 / 83 sitewide (`SITE.googleRating` / `reviewCount`) + `aggregateRating` schema; `availableLanguage: [English, Persian]` (direct AEO win for Farsi queries), `areaServed`, `paymentAccepted`. robots.txt already allows GPTBot/ClaudeBot/PerplexityBot/Google-Extended.

**Strategy.** `COPY-STRATEGY.md` (synthesized from two Opus research agents: SEO/AEO + CRO/offering). Positioning lane: the premium, multidisciplinary, no-referral, direct-billing West Vancouver clinic that treats you in English or Farsi and finds the cause others missed. Hook: "the cause, not just the symptom."

---

## Decisions made

- **Offer = assurance + lead magnet, no discount.** Website stays premium (first-visit assurance, not coupons); a lead magnet (ICBC checklist / "what to bring" guide) captures not-ready paid visitors; promos stay on Instagram. No discount even on ad landing pages to start; test later only if conversion underperforms.
- **Traffic plan = Google Ads.** Conversion tracking is prerequisite #1. The money pages (/icbc, service, condition, /pricing) double as message-matched ad landing pages.
- **Rose discipline:** rose = booking only (removed from link hovers).

## Open questions for Mary (cannot be inferred)

- **Practitioner assignment for support services.** weight-loss → faranak-shekoohi and elderly-care → mary-ghoroghi + noushin-nouri are inferred (confirm). occupational-therapy, chiropractic, yoga-therapy have NO team member in that discipline, so "Who you might see" is hidden on those pages until she names the providers (or confirms these services run).
- **Skin / aesthetic services.** Instagram ran a "skin facial" promo; these services are nowhere on the site. Real and ongoing? If so, add a page + physio cross-sell.
- **Jane App deep links:** does the booking portal accept URL params for location/service/practitioner? If yes, biggest booking-friction cut.
- A few practitioner names in reviews are not on the team list (Behzad RMT, Amir Ahmadi physio) — confirm current roster.

---

## Remaining before launch (priority order)

1. **Home hook rewrite** toward "the cause, not just the symptom" (changes the locked hero headline — give Abtin 2-3 options to pick).
2. **/icbc page** (highest-ROI page + top Google Ads landing target), then **/worksafebc** and **/pricing** (transparent fee ranges).
3. **Conditions pages**: strengthen the big four (back/neck, knee, shoulder, post-surgical), split out **/conditions/whiplash**, cross-link to /icbc.
4. **Per-location pages** (`/locations/16th-street`, `/locations/ocean-walk`) with unique NAP + one LocalBusiness schema each (required for the 2-Google-Business-Profile strategy).
5. **Team bios**: add credentials + College of Physical Therapists of BC registration + languages (Farsi flag) + per-bio "Book with [name]" CTA.
6. **About / insurance / what-to-expect / FAQ / book** rewrites per the per-page briefs in `COPY-STRATEGY.md`.
7. **Sitewide schema + AEO**: BreadcrumbList schema, write `/llms.txt`, extend FAQPage where genuine.
8. **GA4 + Google Ads conversion tracking** (booking-CTA clicks + click-to-call); set `NEXT_PUBLIC_GA_ID` in Vercel.
9. **Farsi/Persian landing page** (`/fa`, RTL-ready) + lead-magnet asset for paid traffic (both deferred pending Mary / scope).
10. **Real photography** (AI mood imagery is interim; 3 practitioners use initials placeholders). **Replace the logo** with a proper high-res vector (current is a 322px trace — fine on screen, not for print). **Enter Sanity content** then migrate to GROQ. **Re-run accesslint** in a working Chrome/CDP env (Puppeteer is now available for this). Add the remaining real reviews / per-service matched quotes.
11. **Deploy:** push to GitHub (auto-deploys via Vercel). Confirm Sanity env vars + add production URL to Sanity CORS.

**Note:** the site is not "fully done" until the proper logo vector replaces the placeholder trace (recorded in project memory).

---

## Design — LOCKED

Palette B: Warm Stone + Restrained Rose. Spectral (next/font) + Satoshi (Fontshare CSS import). Rose on buttons only. No border-radius. WCAG AA. RTL-ready via CSS logical properties. Tokens in `src/app/globals.css` `@theme {}` (Tailwind v4, no config file). Full details in `DESIGN.md`.

**Prior bug fixes (reference):** unlayered `*{margin:0;padding:0}` reset beat Tailwind utilities (moved to `@layer base`); Satoshi `@import` order (moved above `@import "tailwindcss"`); scroll-reveal blur/blank (use `transform:none` + `html.js` scoping).

---

## Clinic facts (verified)

**16th Street:** Unit 207, 585 16th Street, West Vancouver BC V7V 3R8 | (604) 281-3345 | Mon-Fri 8am-7pm, Sat 9am-3pm
**Ocean Walk:** 1884 Marine Drive, West Vancouver BC V6B 5C6 | (604) 281-3122 | Mon-Fri 8:30am-7pm, Sat 9am-3pm
**Email:** info@azaleaphysio.com | **Founded:** 2011 | **Google:** 4.6 / 83 reviews

**Team (12):** Mary Ghoroghi (RPT, owner), Braedan Lalor (PT), Mehdi Tafreshi (Osteopath), Noushin Nouri (RPT), Ali Shafiei (Sports/MSK), Asal (CBT/Psychotherapy), Faranak Shekoohi (Kinesiologist), Kambiz Navirian (Acupuncture), Dr. Sirus Vakilian (Kinesiology), Ramin Keshmiri (Acupuncture), Dr. Azam Hosseini (Psychiatry), Melina Raad (Office Manager).

**Services (10):** Physiotherapy, Sports Injury, Acupuncture, Occupational Therapy, Kinesiology, Osteopathy, Chiropractic, Weight Loss Program, Yoga Therapy, Elderly Care.

**Direct billing:** ICBC, WorkSafeBC + most extended health (full list in `clinic.ts` `insurers`).

---

## Credentials & key files

- **GitHub:** https://github.com/yoadee/azaleaphysio | **Vercel project:** `azaleaphysio` | **Local:** `C:\Users\abtin\azaleaphysio`
- **Sanity:** Project ID `ksdjppy7`, dataset `production`
- **Key docs:** `COPY-STRATEGY.md` (revenue/copy plan), `DESIGN.md` (visual system), plan file `C:\Users\abtin\.claude\plans\declarative-marinating-tome.md`
- **Content:** `src/lib/clinic.ts` (everything) | **Schema:** `src/lib/schema.ts` + `src/app/layout.tsx`

---

## How Abtin wants to work

- Direct and concise. State assumptions. No clarifying questions when context makes the answer obvious; do ask on genuine business decisions.
- Don't hand off verification tasks checkable from code; only escalate real UI questions or third-party/owner access.
- Use the actual RampStack skills (load them), not paraphrased knowledge. Models: Opus for design/copy/planning, Sonnet for code, Haiku for quick checks.
- **No em dashes. No AI-slop copy. No repeated content. Crisp, high-contrast type.**
