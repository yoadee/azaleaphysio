# Azalea Physiotherapy — SEO Plan (Fast, Safe, Local + YMYL)

Brand-new healthcare (YMYL) local site at https://azaleaphysio.com. Goal: rank as high as possible, as fast as possible, on Google, **without** tripping any spam system or manual action. This is the reviewed, penalty-hardened version of the synthesized specialist plan.

---

## What the reviewer changed and why

I verified every load-bearing claim against the actual repo before signing off. Changes from the proposed plan:

1. **Osteopathy is genuinely unstaffed — confirmed in code.** The `osteopathy` service entry (`src/lib/clinic.ts:409-441`) has **no `practitioners` array**, unlike every staffed service. Shipping a YMYL service page implying a service you can't deliver is a real trust/quality defect. **Kept and elevated** the fix — but corrected the mechanics: osteopathy also appears in `medicalSpecialty` in `src/app/layout.tsx:66` and in two `relatedServices` arrays (`back-neck-pain`→`clinic.ts:721`, and another condition at `:758`). All four touchpoints must change together, or you create a noindexed/404 page that's still internally linked — a thin/broken-link signal. **Decision: confirm staffing with Mary first.** If an osteopath is actually joining, fill the `practitioners` array and keep the page. If not, 301 `/services/osteopathy → /services`, remove from sitemap, `medicalSpecialty`, and both `relatedServices` arrays. Do **not** merely `noindex` and leave it linked.

2. **Postal code error confirmed and is the single highest-trust-risk defect.** `V6B 5C6` (`clinic.ts:64`) is a downtown-Vancouver FSA, not West Vancouver. It's hardcoded in **two** places — `clinic.ts:64` AND `layout.tsx:106` (the homepage `localBusinessSchema` is a separate literal, not derived from `clinic.ts`). The plan only flagged `clinic.ts`. **Both must be fixed**, or your homepage schema and your location schema will disagree on NAP — an active local-ranking and trust suppressor. Verify the real code with Canada Post before publishing any citation.

3. **`aggregateRating` is the biggest latent penalty risk in the plan and was under-weighted.** `4.6 / 83 reviews` is hardcoded in **both** `schema.ts:141-147` and `layout.tsx:53-59`. Self-serving `aggregateRating` markup that doesn't match a verifiable on-page review source is against Google's structured-data policy and is exactly the kind of thing that gets review rich results suppressed or flagged on a YMYL site. **Decision: remove `aggregateRating` from JSON-LD entirely until on-page, first-party reviews exist** (or until you accept it will only ever reflect GBP, which Google does not want you to self-declare in markup). This is a *guardrail*, not optional. The original plan's "keep it in sync with GBP count" is not safe — Google's policy requires the rated entity's reviews to be available *on the page itself*.

4. **Homepage `'use client'` blocks page-level metadata — confirmed (`src/app/page.tsx:1`).** The pragmatic mitigation (tune the default in `layout.tsx`) is correct for launch and kept as a quick win. But I'm flagging more sharply: because `layout.tsx`'s `metadata.default` is the *fallback for every page that doesn't export its own*, you must confirm each route exports its own title/description after editing the default — otherwise you silently propagate one title across pages, which is the *exact* Bing "duplicate titles" flag you're trying to clear.

5. **Bing flag verified as real but partly structural.** Many static pages use bare titles ("About", "Services", "Team", "Careers", "Privacy Policy", "Book an Appointment", "Conditions We Treat") that render via the `%s | Azalea Physiotherapy` template — so they're not *identical*, but they are *thin* and several are short. 9 of 10 services have **no** `metaTitle` (only `massage-therapy` at `clinic.ts:311`), so they all fall back to `"{name} in West Vancouver"` and all share the identical meta-description suffix `"...Direct billing and usually same-week. Book online or call."` (`services/[slug]/page.tsx:32`). The duplicate-description flag is **real and correct**. Kept.

6. **Toned down overstated speed/impact claims.** No new domain "owns the local pack" in 30 days. GBP verification alone often takes 1–3 weeks; review velocity and pack movement are 1–3+ months. I rewrote time-to-impact to be honest. Over-promising fast wins leads to over-aggressive tactics (mass citations, review pushes) — itself a risk.

7. **Hardened the link section.** Original was already conservative; I made the "no scaled/bought links, no exact-match anchors, paid = `rel=sponsored`" rules explicit guardrails, and explicitly ruled out the doorway/programmatic temptation in writing.

8. **Removed the unverifiable from the critical path.** Pricing ($110–135 / $90–110 in `llms.txt:39`) and the "founded 2011 / North Shore since 2011" claims (`clinic.ts:15,18`; `llms.txt:32`) must be confirmed by the clinic before promotion — YMYL accuracy. Note `llms.txt` also lists "weight loss programs, yoga therapy, elderly care" as offerings; confirm these are real and staffed, same osteopathy rule.

Everything else in the proposed plan was safe and high-impact and is retained.

---

## 1. Strategy thesis — fastest *safe* path

A brand-new YMYL local clinic wins fastest through **local trust signals + clean technical/entity/accuracy hygiene**, not content volume or links. Those move within one crawl / GBP cycle and carry near-zero penalty risk. Compounding order:

1. **Fix data-integrity and trust defects first** — wrong NAP postal, self-serving/invalid schema, unstaffed-service page. These actively suppress and invite YMYL scrutiny. Non-negotiable prerequisites.
2. **Build the Google local pack** (2 GBPs + first-party reviews + clean citations). This is the single fastest *legitimate* lever and is mostly off-repo. Expect movement over 1–3 months, not days.
3. **Commit the geo strategy to West Vancouver** as SEO home turf (you win on proximity there). Treat North Shore / North Vancouver as a secondary `areaServed` lane only — never by retitling West Van pages to North Van.
4. **Clear the Bing-flagged title/meta/duplicate-description layer** — confirmed real, concentrated on service + static hub pages, same-day fix.
5. **Capture the structurally uncontested lanes** — Farsi (`/fa`) and funded care (`/icbc`, `/worksafebc`) — purpose-built pages that convert without price objection.

The on-page prose quality is already strong. The gap is the title/meta/schema/entity/accuracy layer and the off-site local layer. **Do not over-edit good content.**

---

## 2. Quick wins (0–2 weeks) — all penalty-safe

| # | Action | File(s) | Impact | Effort | Time-to-impact |
|---|--------|---------|--------|--------|----------------|
| Q1 | **Fix Ocean Walk postal code** in BOTH places: `clinic.ts:64` and the duplicate literal in `layout.tsx:106`. Verify the real West Van code with Mary / Canada Post (likely V7V/V7W). Do this **before** any citation work so every listing seeds from a correct, consistent NAP. | `src/lib/clinic.ts:64`, `src/app/layout.tsx:106` | High | Low | 2–4 wks (re-crawl) |
| Q2 | **Remove self-serving `aggregateRating` from JSON-LD** until first-party on-page reviews exist. Delete the block in `schema.ts:141-147` AND `layout.tsx:53-59`. (Guardrail — see "What changed" #3.) | `src/lib/schema.ts:141-147`, `src/app/layout.tsx:53-59` | High (risk removal) | Low | immediate |
| Q3 | **Fix invalid/misleading practitioner schema.** Change `@type` from `'Physician'` to `'Person'` (physiotherapists are not physicians — a factual misstatement on a YMYL page). Keep `jobTitle` + `memberOf` college. | `src/lib/schema.ts:49` | High | Low | days |
| Q4 | **Fix the location `@type`.** `['MedicalClinic','Physiotherapy']` — `'Physiotherapy'` is not a schema.org type. Use `@type:'MedicalClinic'` + `medicalSpecialty:'https://schema.org/PhysicalTherapy'`. | `src/lib/schema.ts:120` | Medium | Low | days |
| Q5 | **Remove the WebSite `SearchAction`** — it points at `/search` which 404s (no search route exists). Delete `potentialAction` from `websiteSchema`. | `src/lib/schema.ts:204-208` | Medium | Low | days |
| Q6 | **Resolve osteopathy (staffed?).** If genuinely staffed: add the `practitioners` array, keep the page. If not: 301 `/services/osteopathy → /services`, and remove it from the sitemap loop input, `medicalSpecialty` (`layout.tsx:66`), and both `relatedServices` arrays (`clinic.ts:721`, `:758`). Do NOT noindex-and-leave-linked. Confirm with Mary first. | `clinic.ts:410,721,758`, `layout.tsx:66`, `services/[slug]/page.tsx` | High | Low–Med | immediate |
| Q7 | **Homepage canonical + tuned default metadata.** Add `alternates:{canonical:'/'}` to `layout.tsx` metadata. Tighten the default description (<155 chars, front-load "No referral needed"). Title query-first ~50–60 chars, e.g. `Physiotherapy in West Vancouver \| Azalea Physiotherapy`. (Server-Component refactor is a 30-day item, not a quick win.) | `src/app/layout.tsx:18-39` | High | Low | days–2 wks |
| Q8 | **Add 9 missing service `metaTitle`s** (only `massage-therapy` has one). Pattern `[Query] in West Vancouver \| Azalea`, 50–60 chars, each differentiated. Clears Bing "identical titles." | `src/lib/clinic.ts` service entries | High | Low | 1–2 wks |
| Q9 | **Expand bare static titles** (About, Services, Team, FAQ, Insurance, Careers, Blog, Conditions, Locations, Your First Visit, Book) to 50–60 chars with a geo qualifier. Clears the core Bing flag. | each `src/app/*/page.tsx` `title` | High | Low | 1–2 wks |
| Q10 | **Differentiate service meta descriptions** — kill the identical suffix `"Direct billing and usually same-week. Book online or call."` shared across all 10 services (`services/[slug]/page.tsx:32`). Let unique excerpts stand or add a per-service insurance hook. | `src/app/services/[slug]/page.tsx:32` | Medium | Low | 1–2 wks |
| Q11 | **Complete hreflang reciprocity + x-default.** Add `languages:{'en-CA':'/','fa':'/fa','x-default':'/'}` to `layout.tsx`; `/fa/page.tsx` currently has only `canonical` (no `languages`) — add the reciprocal block there too. | `src/app/layout.tsx`, `src/app/fa/page.tsx:7-12` | High | Low | 1–2 wks |
| Q12 | **Blog cover image alt text** — replace `alt=""` with descriptive alt (`post.title`) on listing + article hero. | `src/app/blog/[slug]/page.tsx`, `src/app/blog/page.tsx` | Low | Low | 2–4 wks |
| Q13 | **Explicit `robots:{index:false}` on `/refer/one-pager`** (currently no noindex mechanism in `robots.ts`; relies on convention). | `src/app/refer/one-pager/page.tsx` | Low | Low | immediate |
| Q14 | **Trim over-length money titles** — `/icbc` (`ICBC Physiotherapy in West Vancouver \| Direct Billing, No Referral`) and `/pricing` truncate in SERPs. Use `title.absolute` so the key geo modifier survives. | `src/app/icbc/page.tsx:11`, `src/app/pricing/page.tsx:11` | Low | Low | days |
| Q15 | **Confirm pricing + history accuracy** with the clinic before `/pricing`, `/icbc`, `llms.txt` are promoted (YMYL accuracy): the $110–135 / $90–110 figures and the "since 2011 / North Shore" framing. Also confirm "weight loss programs, yoga therapy, elderly care" listed in `llms.txt` are real, staffed offerings. | `clinic.ts`, `llms.txt/route.ts` | Med | Low | gates promotion |

**Coupling caution (verified):** `layout.tsx` `metadata.default` is the fallback for any page missing its own metadata. After editing the default, confirm each route exports its own title/description — otherwise you re-create the duplicate-title flag.

---

## 3. 30 / 60 / 90-day roadmap

### Days 0–30 — foundation + local pack ignition
- **All Quick Wins above.** (cumulative High / Low–Med effort / days–2 wks)
- **Claim, verify, fully build both GBPs** (16th St + Ocean Walk): primary category *Physiotherapist*; secondary categories only for genuinely staffed disciplines (Acupuncture clinic, RMT, Chiropractor, Kinesiologist, Occupational therapist, Sports medicine — **not osteopathy unless staffed**); real photos; Farsi as a spoken language; Jane booking link; NAP byte-identical to the corrected `clinic.ts`. (High / Med / verification 1–3 wks, pack movement 1–3 mo)
- **Launch a compliant review engine** via Jane confirmation email + SMS + discharge card; aim 5–10 reviews/location/month; respond to all (including negatives); invite Farsi reviews. **No gating, no incentives, same link for everyone.** (High / Med / ongoing)
- **Submit Tier-1 citations only**, byte-identical NAP: ICBC Find-a-Provider, WorkSafeBC registry, PainHero, Lumino Health, Apple Business Connect, Bing Places, Yelp.ca. No mass-directory blasts. (High / Med / 2–8 wks)
- **Add practitioner + org `sameAs`** to regulatory college registries (CPTBC, CCBC, CTCMA, CMTBC, BCACC) and to org/location schema (both GBP URLs, Jane, socials). Top E-E-A-T / AI-citation signal. (High / Low / 2–4 wks)
- **Set up GSC + Bing Webmaster, submit sitemap, verify `/fa` indexes.** Capture baseline ~2–3 weeks post-launch (after ≥95% indexation) to avoid false "unranked" baselines. (High / Low / immediate)

### Days 30–60 — depth + entity
- **Enrich the 5 thin condition pages** (sports-injuries, workplace-injuries, arthritis-joint-pain, headaches-jaw-pain, balance-mobility): symptoms, approach, recovery, 4 FAQs each. Template supports the fields; data-only edit. Unlocks FAQ schema + PAA / AI-Overview eligibility. Only enrich conditions the clinic genuinely treats. (High / Med / 3–6 wks)
- **Refactor homepage to a Server Component** so it exports real metadata; render FAQ answers in static DOM (`<details>`/`<summary>` or non-`display:none` collapse) so crawlers and AI extract them. (High / Med / days–2 wks)
- **Add a `metaDescription` field** to Practitioner/Condition/Service types (mirror the existing `metaTitle` pattern); replace bio-as-description for long bios that truncate. (Medium / Med / 1–2 wks)
- **Add `/services/counselling`** *only if staffed* (Asal Akbari, RCC, Farsi, virtual) — near-uncontested ("registered clinical counsellor west vancouver", "farsi counsellor vancouver"). Scope precisely (Farsi, virtual). Cross-link from `/fa`, whiplash, ICBC. (High / Med / 4–8 wks)
- **Add visible medical-reviewer attribution** ("Reviewed by [Practitioner], CPTBC") + author bylines on condition/blog pages; add `MedicalWebPage` (`about`, `lastReviewed`, `reviewedBy`) schema for condition pages — only where the named clinician genuinely reviewed it. (High / Med / 2–6 wks)
- **Native-Farsi clinical review** of all `/fa` + `/fa/icbc` medical/insurance copy before promotion. Gates promotion. (High / Low–Med)

### Days 60–90 — earn + expand safely
- **Relevance-first link earning, editorial only**: North Shore community/business orgs, Persian-community sites, sports/credential PR (Braedan's credentials are a clean hook), referral partners (GPs, ICBC injury lawyers, WorkSafeBC case managers) off the existing `/refer` page. No bought/scaled links. (High / Med / 1–3 mo)
- **Unlinked brand-mention reclamation** (founded 2011 — legacy mentions likely exist). Reconcile any surname inconsistency between the web/CPTBC and the in-repo "Ghoroghi" spelling. (Medium / Low / 2–6 wks)
- **Add 4–6 hand-written condition pages the clinic genuinely treats** (frozen shoulder, rotator cuff, herniated disc, TMJ, runner's knee; vertigo/BPPV **only if staffed**). One/week, full template, each mapped to a real practitioner. This is the *only* safe form of page "scaling." (High / High / 1–3 mo)
- **3–4 informational blog posts** filling real gaps; add 2–3 authoritative outbound citations (ICBC.com, WorkSafeBC, CPTBC) per high-value post. (Medium / Med / 1–3 mo)
- **Add `datePublished`/`dateModified`** to service/condition schema where dates are real; set honest `updatedAt` on the ICBC/WorkSafeBC posts; fix sitemap `lastModified` (`sitemap.ts:6,32,38,42,45,48` all use `new Date()` — replace static-route dates with real content dates so freshness signals aren't fabricated); HSTS `preload`. (Low–Med / Low / weeks)

---

## 4. By theme

**On-page** — Q7–Q10, Q14 titles/meta. Content/H1 layer is already correct; don't over-edit. Add Article publisher `logo` (ImageObject) for Article rich-result eligibility.

**Technical** — Q1 (NAP both files), Q3–Q5 (schema validity), Q11 (hreflang/x-default), Q7 (canonical + later Server-Component refactor). Note: `FaLangDir` sets `lang`/`dir` client-side, so SSR `<html>` stays `lang="en"` even on `/fa` (`layout.tsx:152`) — complete hreflang (Q11) is the pragmatic mitigation; a longer-term fix is per-segment `lang`. Fix sitemap `lastModified`. Validate everything in Google's Rich Results Test post-fix.

**Content** — enrich the 5 thin condition pages, optional counselling page, medical-reviewer/author attribution, then net-new hand-written condition + blog content. Every health page attributable to a named, credentialed, *actual* practitioner.

**Local SEO (GBP ×2 + citations)** — the fastest *safe* lever. Both GBPs fully built/verified, correct staffed-only categories, real photos, Farsi, Jane link, identical NAP. Compliant review engine. Tier-1 citations only. Track local pack separately (BrightLocal / Local Falcon).

**AEO / AI-search** — practitioner `sameAs` to colleges; `MedicalWebPage` + `reviewedBy`/`lastReviewed` only where true; FAQ answers in static DOM; add blog + practitioner URLs to `llms.txt` (currently omits both). Keep `llms.txt` facts in sync with the corrected source of truth.

**Off-page / links** — editorial/relevance-first only. Default to **not** disavowing on a clean new domain.

**Programmatic** — **do NOT build** service×neighbourhood, condition×location, or `/locations/[slug]/[service]` combinatorial pages: textbook doorway / scaled-content abuse with near-zero real volume. Record this "do-not-build" list in `information-architecture.md` so it isn't silently reversed. Hyperlocal intent stays on the two real location pages + home (light, honest "near me" FAQ only). The only safe scaling is hand-written condition expansion.

---

## 5. Penalty guardrails (map to Google's current spam systems)

- **Scaled content abuse** — No programmatic/templated mass pages (service×neighbourhood, condition×location). Net-new pages are hand-written and tied to a real practitioner. No AI-generated bulk articles published unreviewed.
- **Site-reputation abuse** — No third-party/host-rented sections; the `/refer` and partner work is your own editorial content, not sold subdirectories.
- **Expired-domain abuse** — N/A (fresh domain); don't acquire aged domains to redirect.
- **Link spam / unnatural links** — No bought/scaled links, PBNs, link rentals, or mass-directory blasts. Any paid placement gets `rel="sponsored"`; any UGC gets `rel="ugc"`. Prefer branded/naked-URL anchors; **no exact-match anchor over-optimization** on links you control. Vet any agency promising "N dofollow links/month."
- **Keyword stuffing** — Titles stay natural and query-first (one geo modifier, not stacked variants). Don't repeat "West Vancouver / North Vancouver / North Shore" across title + H1 + first line + alt.
- **Cloaking** — None. Ensure crawlers see what users see; FAQ answers must be in rendered HTML, not `display:none`-only.
- **Doorway pages** — None. Two real location pages only; no near-duplicate geo landing pages.
- **Thin / unstaffed YMYL pages** — **No service/condition page for an unstaffed or undeliverable service.** Osteopathy is the live example; same rule for pelvic floor, shockwave, vestibular, counselling, weight-loss/yoga/elderly-care — confirm staffing before publishing or asserting in `llms.txt`.
- **Structured-data policy** — No `aggregateRating` in JSON-LD without first-party reviews on the page itself (removed in Q2). Never put `aggregateRating` on service/condition schema. Never mark a physiotherapist as `Physician`. Never list a credential, service, or specialty not actually held/offered. Markup must mirror visible content.
- **YMYL accuracy / E-E-A-T** — Correct NAP everywhere (Q1). Confirm pricing, founding date, and offerings before promotion (Q15). Health pages reviewed by and attributed to a named, credentialed clinician. No unreviewed Farsi medical/insurance content live.
- **Reviews** — No gating, no incentives, same link to all discharged patients; respond to negatives, never suppress them.

---

## 6. Measurement & tracking
- **Baseline** ~2–3 weeks post-launch (after ≥95% indexation): positions, SERP composition (incl. AI Overviews / local pack), GSC CTR. A baseline before indexation produces false "unranked" reads.
- **4-bucket keyword tracker** (~200–325 total): Brand (10–15), Money (40–60: ICBC, WorkSafeBC, conditions, Farsi), Opportunity (positions 11–30), Competitor benchmark (Hollyburn, Aquatic Centre/Lifemark, Impulse Sport, WestVanPhysio, Network Therapy). Tag by bucket/topic/funnel/page/device.
- **Track local pack separately** for both GBPs (BrightLocal/Local Falcon grid).
- **Alerts**: Brand drop below #1 → immediate; Money drop ≥5 or out of top-10 → daily; Opportunity into top-10 or past 30 → weekly. Loosen month 1 (new-site volatility), tighten months 2–3.
- **Cadence**: weekly 1-pager (brand + money movers + alerts), monthly narrative, quarterly opportunity rebuild.
- **Monthly GSC review** — emerging queries, index coverage, homepage canonical/duplicate status, manual-action check, CWV, International Targeting (`/fa`).
- **Verify the Bing flag against live HTML** — export published metadata for ~20 pages and diff against the code to confirm Bing isn't reading a stale build.

---

## 7. Tooling gaps & what they'd sharpen
- **Ahrefs/Semrush not connected** → can't quantify: (1) West Van vs North Van local volume + KD (the decisive input for the geo call — all current volumes are `[Estimated]`); (2) competitor DR/backlink + content gaps to build a real link/citation target list; (3) live ranking baseline + anchor-text distribution to catch exact-match drift; (4) which thin-condition queries justify enrichment.
- **GSC (free, first priority)** → index coverage, homepage duplicate-canonical status, manual actions, CWV field data, and the page-2 queries this site will surface in 30–60 days — beats all estimates.
- **Local rank grid (BrightLocal/Local Falcon)** → measurable map-pack position per location.
- **NAP/citation audit (BrightLocal/Whitespark/Moz Local)** → find legacy listings carrying the wrong postal or any surname inconsistency.
- **Live crawl (Screaming Frog)** → confirm deployed HTML matches the code (canonical present, schema valid, no leftover osteopathy links).

**Single highest-leverage sequence:** Q1 (postal, both files) → Q2 (remove aggregateRating) → Q3–Q6 (schema validity + osteopathy) → both GBPs + compliant reviews → Q7–Q11 (titles/meta/canonical/hreflang) → practitioner `sameAs` → enrich 5 thin condition pages. The first block is days-to-weeks, near-zero risk, and removes the active suppressors/penalty exposure before any growth tactic — the fastest *safe* path to ranking for a new West Vancouver YMYL clinic.
