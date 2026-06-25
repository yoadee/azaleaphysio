# Azalea Physiotherapy, Google Ads: Implementation-Ready Plan

**Prepared:** 2026-06-25 · **Currency:** CAD · **Channel:** Google Search
**Goal:** booked appointments (revenue) from two West Vancouver clinics, starting at ~$200/month and scaling with revenue toward ~$1,500/month.

This document is built to be *executed*, not admired. The campaign structure, every keyword, all ad copy, the sitelinks, callouts and structured snippets are already written and packaged into three import files. You upload, set geo + schedule, connect conversions, and turn it on.

It sits underneath the broader `MARKETING-STRATEGY.md` (market, competitors, SEO, 90-day plan). That file is the *why*. This file is the *do it now*.

---

## 0. The files in this folder

| File | What it is | Where it goes |
|---|---|---|
| `azalea-google-ads-BUILD.csv` | All 8 campaigns, 22 ad groups, 97 keywords, and every responsive search ad (285 headlines, full descriptions, paths, final URLs) | Google Ads Editor → Import |
| `azalea-google-ads-NEGATIVES.csv` | 77 account-level negative keywords (block job-seekers, students, DIY, free, wrong services, out-of-area geos), one per line | Google Ads UI → paste into a shared negative list |
| `azalea-google-ads-ASSETS.csv` | 7 sitelinks, 10 callouts, 2 structured-snippet sets | Reference sheet, paste into Google Ads → Assets (see §9) |
| `GOOGLE-ADS-STRATEGY.md` | This plan | Read once, then keep as the playbook |

Every headline is ≤30 characters, every description ≤90, every path ≤15, every sitelink/callout within Google's limits. This was validated programmatically, not by eye, so the import will not throw character errors.

**Launch state baked into the file:** only the three cheapest, highest-return campaigns are **Enabled** (ICBC, Farsi, Branded), summing to ~$6.50/day ≈ **$200/month**. The other five campaigns are fully built but **Paused**, ready to flip on as revenue grows (see §4). You can literally upload and run at $200/month with no further edits.

---

## 1. Executive summary

1. **Start tiny, on the highest-return lanes.** At $200/month you only run ICBC, Farsi, and Branded. Farsi and branded clicks are cheap ($2–$6), so a small budget still buys real volume while the expensive ICBC lane proves out. The first dollars are the safest dollars.
2. **The economics are strong because the pricing is real.** Pulled live from your Jane booking site (§A): a private physio episode is worth ~$800, an ICBC episode ~$1,200, a WorkSafeBC episode ~$1,050. Against a cost-per-booked-patient of roughly **$110–$160** (ICBC clicks are expensive in this market), that still returns a **~5:1 to 16:1 ROAS** before repeat visits and word of mouth. Full model in §5.
3. **ICBC and WorkSafeBC are the money lanes.** Funded treatment means no price objection, the searcher has a deadline, and your WorkSafeBC physio assessment alone bills at $196. Direct billing, and "$0 out of pocket", is your literal hook.
4. **Farsi is the single biggest unfair advantage.** Almost nobody bids on Farsi-script physio terms on the North Shore. The one competitor who owns "Persian physio" (Network Therapy) shows no ICBC, no direct billing, and no pricing. Your Farsi-speaking team plus the live `/fa` page plus ICBC/$0 messaging beats them on their own searchers, at $3–$7 a click.
5. **Conversion tracking is the one prerequisite.** GA4 is already live (`G-MP980R9WH4`). Before spending, mark `booking_start` and `phone_tap` as conversions and import them into Google Ads (§7). Without this you are flying blind.
6. **Search only, manual bidding to start.** No Performance Max, no broad match on expensive English terms. Control first; let Google's automation take over only once it has booking data to learn from.

**If you do one thing today:** connect conversions (§7), then upload `BUILD.csv` and let it run at $200/month. Everything else is optimization on top of a working base.

---

## 2. Why these numbers are trustworthy

- **Pricing is live, not estimated.** Every fee in §A and in the revenue model was pulled from your own Jane App on 2026-06-25. These are the real prices a patient pays.
- **CPC and conversion benchmarks are sourced, and CAD.** Physiotherapy Google Ads benchmarks: LocaliQ puts physical-therapy CPC at ~USD $4.95 and conversion at ~15.35% (US national); BC-specific work (SEO Medics, updated March 2026) cites $6–$12/click and 9–13% conversion for Metro Vancouver physio. The per-lane CPCs in §5 ($2 branded to $16 ICBC, CAD) and the conservative 8–13% conversion band sit on the BC anchor, not the cheaper US one, so the model does not flatter the budget. Replace with your real account data after 30 days.
- **Volumes are thin and we plan for it.** West Vancouver is ~44,000 people. This is a precision account, not a volume account. The plan wins on conversion and cheap lanes, not on traffic.

Anything below tagged **[Live]** is from your Jane data; **[Benchmark]** is a sourced external figure; **[Estimated]** is a labelled projection to be replaced with account data.

---

## 3. Account architecture

One Search account, 8 campaigns (budget containers), tight ad groups so each ad matches the search. Match types are mostly **Phrase** for control, **Exact** on proven branded/core terms, **Broad** reserved for the low-competition Farsi campaign where it safely finds script variants.

| # | Campaign | Ad groups | Match | Landing page | Launch |
|---|---|---|---|---|---|
| 1 | ICBC & Car Accident | ICBC Physiotherapy · Car Accident & Whiplash · ICBC Direct Billing | Phrase + Exact | `/icbc` | **Enabled** |
| 2 | WorkSafeBC | WorkSafeBC Physio | Phrase + Exact | `/worksafebc` | Paused |
| 3 | Core Physiotherapy | Physio West Van · Physio North Van · Physio Near Me | Phrase + Exact | `/services/physiotherapy` | Paused |
| 4 | Conditions | Back & Neck · Sciatica · Knee · Shoulder · Sports Injury | Phrase | condition / `/services/sports-injury` | Paused |
| 5 | Other Services | Massage/RMT · Acupuncture · Chiropractic · Kinesiology · Occupational Therapy | Phrase | each service page | Paused |
| 6 | Farsi & Persian | Persian Physio (English) · Farsi Physio (Script) | Phrase + Broad | `/fa` | **Enabled** |
| 7 | Branded | Azalea Brand | Exact + Phrase | `/` | **Enabled** |
| 8 | Seasonal Sport | Golf Injury · Ski & Snowboard Injury | Phrase | `/conditions/golf-injury`, `/conditions/ski-snowboard-injury` | Paused (run in season) |

Every ad group has 7–15 headlines and 4 descriptions written specifically for that search (message match), so the click lands on a page that says the same thing the ad said. The Farsi script ad group is written in Persian; I own that copy and Mary is the native reviewer before it goes live.

---

## 4. Budget tiers and scaling

The account is designed to climb four rungs. You move up only when the rung below is profitable (the kill/scale rules in §10 are the trigger). Daily budgets are what the file ships with or what to set when you unpause.

| Tier | Monthly | Daily | Campaigns enabled | When |
|---|---|---|---|---|
| **1, Launch** | **~$200** | ~$6.50 | ICBC ($3.50) · Farsi ($2) · Branded ($1) | Now (shipped in file) |
| **2, Insurance + intent** | **~$500** | ~$16 | + WorkSafeBC ($3) · Conditions ($6) | After 30 days if Tier 1 cost/booking < $150 |
| **3, Full service** | **~$1,000** | ~$33 | + Core Physio ($8) · Other Services ($6) | After 15–30 conversions, switch winners to Maximize Conversions |
| **4, Scale** | **~$1,500** | ~$50 | + Seasonal ($4, in season) · raise winners to target | When Tier 3 holds ROAS and impression share has headroom |

To move a campaign from Paused to live: in Google Ads, enable the campaign and set its daily budget to the **target** value (ICBC $12, WorkSafeBC $5, Core $14, Conditions $10, Other $9, Farsi $4, Branded $2, Seasonal $5). Targets sum to ~$50/day ≈ $1,500/month at full tilt.

**A real caution for this market:** West Vancouver volume is small. Above roughly $1,000–$1,200/month you may find the cheap, high-intent lanes (Farsi, ICBC, branded) simply run out of searches, impression share maxes out and extra budget chases lower-quality clicks. If that happens, do **not** force spend to hit $1,500. Hold at the efficient level and put surplus into SEO, reviews, and the two Google Business Profiles, which have no volume ceiling.

---

## 5. Revenue and ROAS model (built on live Jane pricing)

### 5.1 What a new patient is worth

A first "episode of care" is one assessment plus a realistic course of follow-ups, at your **actual** Jane prices.

| Lane | Episode build (real fees) | First-episode value |
|---|---|---|
| Private physiotherapy | $130 assess + ~6 × $110 | **~$800** [Live] |
| ICBC physiotherapy | $154 assess + ~9 × $97 (often + kinesiology rehab) | **~$1,200** [Live] |
| WorkSafeBC physiotherapy | $196 assess + ~9 × $95 | **~$1,050** [Live] |
| Massage / RMT | ~4 × ~$145 (high repeat) | **~$550** [Live] |
| Acupuncture / Chiro / Kinesiology | ~$140 assess + ~5 × ~$115 | **~$700** [Live] |

Weighted across where the budget actually goes (insurance + Farsi + branded early, then physio + conditions), the **blended value of one new booked patient is ~$900 first-episode** [Estimated, from Live fees]. Lifetime value, with repeat episodes and cross-discipline referral, is commonly 2–2.5× that, so **~$1,900–$2,250** [Benchmark]. The model below uses the conservative first-episode $900, the true return is higher.

### 5.2 The funnel

Per-lane CPC matters more than a single blended number, because the cheap lanes (Farsi, branded) buy far more clicks per dollar than ICBC. CPCs below are CAD, anchored to BC-specific benchmarks (SEO Medics Metro Vancouver $6–$12 USD competitive terms, converted and adjusted for the North Shore's high-value auctions) [Benchmark]:

| Lane | CPC (CAD) | First-episode value |
|---|---|---|
| ICBC / car accident | ~$16 | $1,200 |
| WorkSafeBC | ~$12.5 | $1,050 |
| Core physiotherapy | ~$11 | $800 |
| Conditions | ~$10 | $800 |
| Other services | ~$7.5 | $650 |
| Farsi / Persian | ~$5 | $950 |
| Branded | ~$2 | $850 |
| Seasonal sport | ~$8.5 | $800 |

- **Click → lead** (booking click or call): 8% conservative / 10% base / 13% optimistic [Benchmark, SEO Medics BC 9–13%].
- **Lead → booked & attended:** ~70% [Estimated], funded and high-intent local searchers book at a high rate.
- **Cost per booked patient ≈ $110–$160** at the base case (higher than US averages because ICBC clicks are genuinely expensive here).

### 5.3 What each budget tier should produce

Modelled bottom-up: each campaign's budget ÷ its CPC → clicks → leads → booked patients → revenue at its real episode value, summed per tier. Three scenarios flex the click→lead rate and episode value.

| Tier | Monthly spend | Clicks/mo | Booked patients/mo | First-episode revenue/mo | ROAS |
|---|---|---|---|---|---|
| **1, $200** | ~34 | **2–3** | **$1,500–$3,200** | **8×–16×** |
| **2, $500** | ~62 | **3–6** | **$2,800–$5,800** | **5.5×–12×** |
| **3, $1,000** | ~117 | **7–11** | **$5,000–$10,400** | **5×–10×** |
| **4, $1,500** | ~173 | **10–16** | **$7,300–$15,300** | **5×–10×** |

(Columns: clicks; booked patients conservative→optimistic; revenue conservative→optimistic; ROAS conservative→optimistic. Base case sits in the middle of each range.)

Read it conservatively: even at the **low** end of every range, the channel returns ~5× revenue on spend. ROAS compresses slightly as you scale (higher tiers buy more expensive core-physio and conditions clicks), which is normal and still strong. Three things this model deliberately leaves out, all of which improve the real return: **lifetime value** (repeat episodes + cross-discipline push the per-patient figure to ~$1,900–$2,250, roughly doubling ROAS), no-show recovery, and referrals.

**Break-even sanity check:** at ~$130 to acquire a patient worth ~$900 first-episode, the channel pays for itself many times over even if a third of booked patients no-show. The risk here is not negative ROI; it's thin volume (next paragraph).

**The real constraint is volume, not return.** At ~34 clicks/month, Tier 1 produces a handful of patients, not a flood. That is the nature of a 44,000-person town. Scale the budget only as fast as the searches exist; when the cheap lanes max out their impression share, extra spend buys worse clicks. Better to hold at the efficient level and pour the surplus into SEO and the Google Business Profiles.

---

## 5b. The competitive edge (from live competitor research)

North Shore physio is crowded in North Vancouver and thin in West Vancouver. The build is shaped around three real gaps found by inspecting competitors' live sites:

- **West Vancouver is a geo-moat.** Hollyburn is the only entrenched West Van brand, and it leads with heritage ("50+ years"), not injury or insurance intent. Most rivals (COAST, North Shore Sports Medicine, Allied) cluster in North Van. That's why Core Physiotherapy splits **West Van** and **North Van** into separate ad groups, you can own the less-contested West Van term outright.
- **"$0 out of pocket" on ICBC is underused.** Only one competitor (Allied) leads with it. ICBC genuinely costs the patient nothing, so the ICBC ads now headline **"ICBC: $0 Out of Pocket"** and **"Car Accident? $0 to You."** This is the strongest, most honest conversion hook in the category, and "free" stays a negative keyword everywhere so you don't attract bargain-hunters.
- **Network Therapy owns "Persian physio" but converts it weakly**, its site shows no ICBC, no direct billing, and no pricing, and runs policy-risky "Guaranteed Healing" copy. The Farsi campaign pairs the Persian-community angle **with** ICBC/$0/direct-billing hooks they lack, so Azalea out-executes them on the exact searchers they target.

## 6. Bidding, targeting, schedule

- **Bidding:** start every campaign on **Manual CPC** (shipped that way). Max CPCs are pre-set per campaign to win the real local auctions, ICBC $20, WorkSafeBC $16, Core $14, Conditions $12, Seasonal $10, Other $9, Farsi $6, Branded $3. (A flat $1.50 cap, which is common in templates, would never show on the money lanes here, these are deliberate.) Trim them down once you see actual costs. Once a campaign has **15–30 conversions**, switch it to **Maximize Conversions**. Only later, with a stable cost-per-booking, test **Target CPA** near that number. Do not start on automated bidding, it has nothing to learn from yet.
- **Location:** target a radius covering West Vancouver + North Vancouver. Set targeting to **"Presence: people in or regularly in your targeted locations"** (not "interest"), so you don't pay for someone elsewhere researching. Add a bid boost on the affluent core (West Van core, British Properties, Ambleside, Dundarave).
- **Ad schedule:** run evenings (your clinics are open to 7pm) and Saturday daytime, that availability is a selling point. A light always-on baseline the rest of the time is fine.
- **Devices:** keep mobile fully on (pain and "near me" searches skew mobile and phone-call bookings). Make sure tap-to-call is above the fold on every landing page.
- **Networks:** Search only. Turn **off** "Search Partners" and Display expansion to start.

---

## 7. Conversion tracking, do this BEFORE spending

GA4 is already live sitewide (`G-MP980R9WH4`) and already fires two events through `AnalyticsEvents.tsx`: `booking_start` (any click on a Jane booking link) and `phone_tap` (any `tel:` tap). You do not need new code. You need to wire them to Google Ads:

1. In **GA4 → Admin → Events**, mark `booking_start` and `phone_tap` as **Key events**.
2. **Link GA4 to Google Ads** (Admin → Product links → Google Ads).
3. In **Google Ads → Goals → Conversions**, **import** both GA4 key events as conversions.
4. Set `booking_start` as the **Primary** conversion (the one bidding optimizes to). Set `phone_tap` as **Secondary** (a real but lower-signal action).
5. Add **call assets** with Google call reporting so phone bookings attribute to the campaign and keyword.

Note: Jane completes the booking on its own portal and does not redirect a confirmation page back to the site, so the booking *click* is the conversion proxy, standard for Jane clinics. If Jane ever exposes a confirmation redirect, track that as the true booking.

---

## 8. Negative keywords

`NEGATIVES.csv` holds 77 terms that block the wrong searcher: job-seekers (jobs, hiring, salary, resume, NPTE, PTA), students (course, school, degree, student), DIY (exercises, stretches, youtube, pdf), bargain hunters (free, cheap), services you don't offer (naturopath, botox, dietitian, prolotherapy), animals (dog, pet, veterinary), and out-of-area cities (downtown, burnaby, richmond, surrey, victoria, squamish). In Google Ads: **Tools → Shared library → Negative keyword lists**, create "Azalea master negatives," paste the terms (broad match), and apply the list to all campaigns. (Shared lists can't be created by file import, so this is a one-time paste in the UI.)

The single biggest money-saver in month 1 is the **Search Terms report**. Check it weekly, and every irrelevant term you see, add as a negative. The 77 shipped negatives are the starting net, not the finished one.

---

## 9. Assets (sitelinks, callouts, structured snippets)

Assets are free and lift click-through, so add all of them. `ASSETS.csv` has the exact text (all within Google's limits). Add them at the **account level** in Google Ads → Assets so every campaign inherits them:

- **7 sitelinks:** Book Online, ICBC Direct Billing, WorkSafeBC Injuries, Our Services, Pricing, Our Locations, Meet the Team.
- **10 callouts:** No referral needed · Direct billing to ICBC · Open until 7pm · Open Saturdays · Same-week appointments · English & Farsi speaking · Two West Van locations · Multidisciplinary clinic · Book online or by phone · Rated 4.6 on Google.
- **2 structured snippet sets:** *Service catalog* (Physiotherapy, Massage Therapy, Acupuncture, Chiropractic, Kinesiology, Occupational Therapy) and *Insurance coverage* (ICBC, WorkSafeBC, Pacific Blue Cross, Sun Life, Manulife, Canada Life).
- **Call asset:** add both clinic numbers (16th St 604-281-3345, Ocean Walk 604-281-3122) with call reporting on.
- **Location assets:** link the two Google Business Profiles once they're claimed, so the map pin shows in the ad.

**Recommended pins (do in the UI, optional):** in each ad group pin the most on-topic headline to Position 1 for message match, e.g. pin "ICBC Physio West Vancouver" in the ICBC group, "Persian Physio West Van" in the Farsi-English group. Don't over-pin; leave the rest unpinned so Google can optimize the mix.

---

## 9b. Compliance and structural constraints (verified against Google policy)

The copy in the build is already written to these rules, listed so you don't undo them:

- **Claims to never use:** "cure," "guaranteed," "guaranteed healing," "eliminate pain forever," "100% recovery," "permanent fix." These trip Google's healthcare/misrepresentation policies (a competitor's live "Guaranteed Healing" copy is non-compliant, do not copy it). The shipped ads stay on safe ground: "treat the cause," "relief," "rebuild strength," "registered physiotherapists."
- **"No referral needed" is fine**, BC physio is direct-access. Keep the claim about *access* (booking), since some extended-health plans still require a referral to *reimburse*.
- **"ICBC" and "WorkSafeBC" in ad text are fine** used descriptively ("Direct billing to ICBC," "$0 out of pocket on ICBC"). Avoid implying official endorsement ("Official ICBC provider") unless literally true.
- **No healthcare certification needed.** General physiotherapy in Canada does not require Google/LegitScript certification (that only applies to pharmacies, prescription drugs, addiction treatment).
- **Local Services Ads are NOT available for physio in Canada (2026)**, the Canadian LSA category list is home/trade services only. Do not budget for the "Google Guaranteed" green-badge ads; this plan is standard Search.
- **No patient remarketing / Customer Match.** Health is a sensitive category, so you cannot build audiences from past patients or upload customer lists for ads. This plan relies on keyword intent + tight geo + Google's predefined in-market audiences instead, no remarketing lists required.

## 10. Launch checklist

1. **Conversions wired** (§7), `booking_start` primary, `phone_tap` secondary, imported into Google Ads. *Do not skip.*
2. **Download Google Ads Editor** (free desktop app), sign into the account.
3. **Account → Import → From file** → choose `azalea-google-ads-BUILD.csv`. Review the proposed changes (8 campaigns, 22 ad groups, keywords, ads). It will create everything; the three Tier-1 campaigns come in Enabled, the rest Paused.
4. **Import negatives:** create a shared negative list, paste from `NEGATIVES.csv`, apply to all campaigns.
5. **Set location targeting + schedule + bid boosts** (§6) on each campaign, these aren't in the file because they're set in-UI.
6. **Add assets** (§9) at account level from `ASSETS.csv`.
7. **Set max CPC** sanity check (default $1.50 shipped; raise ICBC/core if needed).
8. **Push** from Editor to the account. Confirm the three Tier-1 campaigns are live and the rest Paused.
9. **Have Mary review the Farsi ad group** (Campaign 6, "Farsi Physio (Script)") before that ad group serves.
10. **Watch for 7 days**, then run the optimization cadence below.

### Optimization cadence
- **Daily (week 1), then weekly:** Search Terms report → add negatives, pause dead keywords.
- **Weekly:** check cost-per-booking by campaign; shift budget toward the cheapest bookings.
- **At 15–30 conversions/campaign:** switch that campaign to Maximize Conversions.
- **Monthly:** decide each campaign, scale, hold, or kill.

### Kill / scale rules (pre-committed, so decisions are mechanical)
- **Scale** a campaign when cost-per-booking is comfortably under ~$150 and the bookings show up. Move up a tier.
- **Pause** a keyword or ad group that, after ~50–100 clicks, has produced zero leads, or whose cost-per-booking is more than 2× your best campaign. Don't judge on 10 clicks.
- **Hold** when results sit right at the line, gather another two weeks of data before committing.

---

## 11. Loose ends worth knowing (from building this)

- **Site pricing is slightly understated.** The site/`llms.txt` say physio assessment $110–135 and follow-up $90. Real Jane prices are **$130 assessment / $110 follow-up**. Worth aligning the copy (separate small task), and it makes the revenue model above conservative if anything.
- **Two disciplines exist in Jane but not on the site:** *Laser Skin + Hair* and *Women's Health*. If these are real, active services they're a future cross-sell and a possible new campaign, flag for a decision.
- **Counselling is ICBC-priced only in Jane** ($268 initial / $160 follow-up) and is Farsi-only virtual (Asal). Best folded into the Farsi lane rather than run as its own English campaign, as already noted in `MARKETING-STRATEGY.md`.
- **Benchmark a competitor's fees.** Hollyburn (the main West Van rival) has a fees page that was unreachable during research. Worth a manual look to position Azalea's pricing, though the strategy here is no-discount premium regardless.
- **Missing clusters to consider later** (offered or near-zero competition): pelvic-health and vestibular/concussion rehab are *not* currently Azalea services, add pages first if you want to bid. Dry needling/IMS and TMJ are already covered by the acupuncture and conditions pages and could get their own keywords once the core lanes prove out.
- **Osteopathy stays out of paid traffic**, the discipline exists in Jane but has no bookable treatments (unstaffed). No osteopathy keywords are in the build.

---

## Appendix A, Live Jane pricing (pulled 2026-06-25)

Source: Azalea's Jane booking API. These are the real, current fees.

| Discipline | Initial | Follow-up | ICBC initial / follow-up | Notes |
|---|---|---|---|---|
| Physiotherapy | $130 (45m) | $110 (30m) | $154 / $97 | WorkSafeBC: $196 / $95 · Home visit $160 |
| Acupuncture | $140 (60m) | $120 (45m) | $135 / $115 | |
| Chiropractic | $140 (30m) | $120 (15m) | $124 / $77 | |
| Kinesiology | $130 (60m) | $110 (60m) | $119 / $96 | ICBC active rehab |
| Massage / RMT | $130 (45m) |, | $131 / $107 | 30m $100 · 60m $160 · 75m $190 · 90m $220 |
| Counselling |, |, | $268 / $160 | ICBC, Farsi-only virtual |

## Appendix B, Assumptions and limitations

- **CPC and conversion rates are sourced CAD benchmarks**, not your account's data, anchored to BC-specific physio Google Ads figures (SEO Medics Metro Vancouver, converted to CAD), not US national averages, so they don't flatter the budget. Replace within 30 days from the Search Terms and bidding reports. The plan is built so the *structure* holds even as the *numbers* refine. The fastest sharpening step: a free Google Keyword Planner pull for the keyword clusters once the account exists.
- **Search volume is thin** in West Vancouver. Several keywords will show as low-volume; that's expected and is why the plan leads with cheap, high-intent lanes and caps spend at the efficient level.
- **Revenue is modelled on first-episode value** at real Jane fees, deliberately ignoring lifetime value, no-show recovery, and referrals, all of which improve the real return.
- **Conversion tracking accuracy** depends on the booking-click proxy (Jane has no confirmation redirect). Treat reported conversions as directional and reconcile against actual new patients in Jane monthly.
