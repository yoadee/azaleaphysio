# Azalea Physiotherapy — Copy & Conversion Strategy

Synthesis of the SEO/AEO research and the CRO/conversion research. The single end goal is more booked appointments. This doc is the reference for all copy execution.

---

## 1. Positioning (the lane no competitor holds)

Both research tracks landed on the same open lane:

> **The premium, multidisciplinary, no-referral, direct-billing West Vancouver clinic that treats you in English or Farsi and finds the cause others missed.**

Competitor reality: Hollyburn owns heritage but ignores insurance and language. Network Therapy claims "Persian" but has no content depth and is in North Van. COAST runs the content/ICBC playbook well but skews young/athletic and has no Persian angle or West Van location. Nobody combines all of Azalea's differentiators.

### The hook
The emotional core, already latent in the brand and Mary's reputation:

> **The cause, not just the symptom.**

That is what an affluent, referred, skeptical patient is actually buying. Lead with it.

---

## 2. Messaging system

Frame every differentiator as the answer to a worry, not as a feature:

| Differentiator | Patient worry it answers | Copy frame |
|---|---|---|
| No referral (BC) | "Do I need a doctor's note first?" | Start now, nothing to chase. |
| Direct billing (ICBC, WorkSafeBC, extended health) | "Will I be out of pocket?" | Nothing upfront for the covered portion. |
| Same-week, open to 7pm + Sat | "Will I wait weeks in pain?" | Usually seen within the week. |
| Multidisciplinary, one roof | "Will I get bounced between clinics?" | Your whole plan in one place. |
| Farsi-speaking practitioners | "Can I be treated in my language?" | Care in your language. (Persian) |
| Owner expertise (Mary) | "Are they actually good?" | The cause, not just the symptom. |

### Value-prop hierarchy (home hero)
- Headline (promise): a "cause, not symptom" line with the patient as protagonist.
- Sub-line (proof of ease): twelve practitioners, ten disciplines, one roof in West Vancouver; no referral, direct billing, usually seen the same week.
- Micro-trust: rating + reviews (keep).

### Voice (locked)
Measured, grounded, exact. Patient as protagonist. No hype, no performative warmth, no em dashes, no AI-slop, no repeated content. Answer-first writing (lead each section/FAQ with the direct answer, then elaborate; this also wins AI citations).

---

## 3. Offer strategy (DECIDED — assurance + lead magnet; traffic plan is Google Ads)

- **Website = assurance, not discount.** A first-visit assurance (thorough assessment, plain-language explanation, same-day treatment, realistic timeline) stated as a promise, not a coupon. Protects the premium, referral-driven brand. No homepage promo banners.
- **Lead magnet for the not-ready visitor** (ICBC-claim checklist, "what to bring to your first visit" guide, or a short "is it physio, or something else?" self-check). With Google Ads every click is paid for and ~70-80% will not book on visit one, so this capture is mandatory, not optional: it lets us follow up by email / retarget instead of eating the cost.
- **No discount to start, even on ad landing pages.** Google Ads search traffic is high-intent; the differentiators (no referral, direct billing, same-week, one roof) convert it without cheapening the brand or attracting price-shoppers. Treat any offer as a later A/B test on an isolated paid landing page only if conversion underperforms. Promos stay on Instagram/social.

### Google Ads implications (raised priority)
- **Conversion tracking is prerequisite #1.** GA4 + Google Ads conversion import on every booking-CTA click and click-to-call. Smart Bidding optimizes toward conversions it can see; without this we pay Google to optimize blind.
- **The money pages double as ad landing pages.** /icbc, the service pages, condition pages, /pricing are the message-matched destinations for paid keywords (ad keyword = page topic = higher Quality Score = lower CPC). Building them well directly lowers ad cost.
- **Farsi is a cheap, uncontested paid campaign** (Persian keywords → Farsi landing page) once that page is built.

---

## 4. Page-by-page copy plan

### Existing pages to rewrite/strengthen
1. **Home** — sharpen hero to lead with "the cause, not just the symptom"; pull same-week + Farsi higher; fold no-referral/direct-billing/same-week into the reassurance sub-line. Deploy more of the 75+ reviews as proof.
2. **Service detail (10)** — enrich the 9 thin ones to the physiotherapy template depth (approach, firstVisit, goodToKnow, FAQs, explicit practitioners, a service-matched testimonial). Un-enriched pages do not rank or convert. **Highest-volume copy task.**
3. **Conditions (10)** — strengthen the big four (back/neck, knee, shoulder, post-surgical); answer-first "how X is treated / how long to recover / should I see a physio for X"; each cross-links to its matched service and to /icbc where relevant.
4. **Team bios (12)** — credentials + College of Physical Therapists of BC registration + languages (Farsi flag prominent) for E-E-A-T; a human line each; a per-bio "Book with [name]" CTA.
5. **Insurance** — keep as the hub; convert, do not just list logos. Lead with "we bill your insurer directly; you pay only the uncovered portion."
6. **What-to-expect** — generalize the 4-step first-visit arc; dissolve first-visit anxiety; pair with the "what to bring" checklist.
7. **About** — make Mary's cause-finding reputation and the "one roof" philosophy central, not incidental. Surface Farsi + community roots.
8. **Locations** — already good copy; the work is per-location pages (below) + deep-linked booking.
9. **FAQ** — strong; add cancellation policy and a Farsi-availability question.
10. **Book** — its only job is a frictionless, expectation-set handoff to ClinicMaster ("about two minutes, have your insurer handy, here is what we will ask").

### New pages to create (high-intent, ranked)
1. **/icbc** (or /insurance/icbc) — `ICBC Physiotherapy in West Vancouver, Direct Billing, No Upfront Cost`. Highest-ROI page on the site. Sessions covered, $0 upfront, claim-number process, no adjuster approval, what to bring. FAQ + schema.
2. **/worksafebc** — mirror of ICBC for workplace injuries. Thin local competition.
3. **/fa (or /farsi)** — Persian landing page (RTL; build is already RTL-ready). Farsi-speaking staff, ICBC in Farsi, hreflang `fa`. Most defensible niche; nobody owns "Persian physio West Vancouver."
4. **/locations/16th-street** and **/locations/ocean-walk** — unique NAP, hours, map, parking, practitioners based there, and one LocalBusiness schema each. Required for the two-Google-Business-Profile strategy.
5. **/pricing** (preserve the currently-indexed /pricing-offers intent) — real fee ranges (assessment $110 to 135, follow-up $90 to 110). Wins a top informational-commercial query and AI citations.
6. **/conditions/whiplash** — split from car-accident; distinct high-intent query; cross-linked to /icbc.

---

## 5. SEO / AEO / local backbone

- **Title/meta patterns:** Service: `{Service} in West Vancouver | Azalea Physiotherapy`. Condition: `{Condition} Treatment in West Vancouver | Azalea Physiotherapy`. Lead with the keyword + geo so it survives truncation (~55-60 chars).
- **Schema sitewide:** extend FAQPage (already wired on physio) to every page with Q&A; MedicalClinic/Physiotherapy on home + one per location with `paymentAccepted`, `priceRange`, `availableLanguage: [English, Persian]`, `areaServed`, `availableService`, `aggregateRating`. The `availableLanguage: Persian` tag is a direct AEO win for Farsi queries.
- **/llms.txt** at root: clean markdown digest (both addresses, hours, phones, founded 2011, 10 services, 10 conditions, no-referral fact, ICBC/WorkSafeBC + insurer list, fee ranges, Farsi availability, one-line answer to each top FAQ, link to each canonical page). Low effort, high leverage.
- **Local:** two Google Business Profiles run as twins (distinct NAP, categories, Persian language attribute, real photos, weekly posts, booking link to each location page). Lock NAP consistency. Build citations (PainHero, Jane directory, Yelp.ca, Apple/Bing Maps, ParsaPages for the Persian market). Systematic review asks (timed SMS, ask for practitioner + condition by name, seek some Farsi reviews).

---

## 6. Execution waves

- **Wave 1 (biggest revenue, offer-independent):** enrich the 9 service pages to the physiotherapy template; sharpen the home hook; build /icbc and /pricing; extend FAQ + MedicalClinic schema and write /llms.txt.
- **Wave 2:** condition pages (big four + whiplash split); per-location pages + per-location schema; team bio credentials/languages/CTAs; insurance + what-to-expect rewrites.
- **Wave 3:** Farsi landing page; lead-magnet asset for paid traffic; deep-link the ClinicMaster portal + GA4 booking events; review-generation system.

---

## 7. Decisions & open items

**Decided:**
- **Offer:** assurance + lead magnet, no discount to start, conversion tracking first. Traffic plan is Google Ads. (Section 3.)

**Deferred pending Mary (build in a later wave if confirmed):**
- **Skin / aesthetic services:** the Instagram "skin facial" promo implies services nowhere on the site. If real and ongoing, add a service page + physio cross-sell.
- **Farsi / Persian landing page:** top-3 revenue lever and most defensible niche, but deferred for now pending Mary.
- **Practitioner assignment for the support services:** Occupational Therapy, Chiropractic, Weight Loss, Yoga Therapy, Elderly Care have no obvious match in the current 12-person team list. Mary to confirm who delivers each before those service pages get explicit `practitioners`.

**To verify (not blocking copy):**
- **ClinicMaster deep links:** does the portal accept URL params for location/service/practitioner? If yes, biggest booking-friction cut.
- **Rating:** confirm 4.6 / 75+ is current before leaning on it harder.
- **GA4 + Google Ads conversion tracking:** must be wired before/with the ad launch.
