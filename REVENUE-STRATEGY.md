# Azalea Physiotherapy — Revenue Strategy (master plan)

**Prepared for:** Abtin · **Date:** June 2026 · **Currency:** CAD.
**Goal:** Maximize clinic revenue, not just website bookings. The website is one touchpoint; this plan treats the clinic as a full system.

This sits *above* `MARKETING-STRATEGY.md`, which is the paid-search + SEO/AEO acquisition pillar. This document keeps that pillar and adds the three levers it doesn't cover: conversion, retention, and expansion, plus the referral engine and owned channels.

---

## 0. Assumptions and dependencies (read first)

> **Platform note (June 2026):** the clinic is moving from **Jane to Jane App** within ~1 week. Where this document says "Jane," read it as "the booking / practice-management system," transitioning to Jane. Jane is the more marketing-friendly platform and *helps* most of this plan (stronger automated reminders, per-discipline deep-link booking, easy utilization reports, a "how did you hear about us?" intake field). Three things to handle on switchover: (1) repoint `SITE.booking` to the Jane URL and update the booking schema; the GA4 `booking_start` tracking already derives from `SITE.booking`, so it follows automatically. (2) **Export the patient list (emails, last-visit dates, marketing consent) from Jane before/around the cutover** so the reactivation campaign has clean data. (3) Jane is not a marketing-email platform (no segmented broadcasts/automation), so the lifecycle email program still runs on a dedicated low-cost ESP; Jane owns transactional reminders.

Built from your answers, to be corrected as facts arrive:

- **Constraint:** assumed *spare capacity* (fill chairs). **Open dependency:** pull the Jane **Provider Productivity / Schedule Utilization** report for the last 30 days, per practitioner. The likely real answer is *mixed* (a few practitioners full, others with gaps). That report decides where the acquisition spend points and whether retention or acquisition is the priority. Until then this plan optimizes for filling capacity while building the retention asset in parallel.
- **Execution:** Phase 1 is *you + light front-desk buy-in*. The full-team version is documented as the goal state, flagged where it needs Mary and staff.
- **Assets to switch on:** the **Jane patient list** (retention/reactivation) and **active Instagram/Facebook**. Referrals are build-from-scratch (Section 2.2 is the how-to you asked for).
- **Budget:** ~$1,500-2,000/mo Google Ads (existing plan) **plus ~$500-1,000/mo** for tools, content, and experiments. Allocation in Section 8.
- **Positioning is locked:** premium, multidisciplinary, no-referral, direct-billing, English/Farsi, "find the cause others missed." **No discounting** (Section 3 of the search doc explains why for this catchment). Every tactic below respects that.

---

## 1. The revenue model — where the money actually is

Clinic revenue is not one number, it is a chain:

```
Revenue = New patients × Show rate × First-episode value × Repeat episodes × Cross-discipline uptake
                (acquire)   (convert)      (retain)          (retain)            (expand)
```

Most clinics pour everything into the first term (acquisition) and ignore the rest. That is the mistake. In a thin market like West Vancouver (~44,000 people, see search doc), acquisition has a hard ceiling, but the other four terms have almost none:

- **A new patient costs ~$84 to acquire** (search doc model). **A reactivated past patient costs near $0** (you already have their email). Same revenue, fraction of the cost.
- **Every patient who completes their care plan instead of dropping off after 2-3 visits** is worth several hundred extra dollars at zero acquisition cost.
- **Every physio patient who also sees kinesiology or massage** multiplies their value without a new acquisition.

So the strategy is: keep acquisition running, but treat **retention and referrals as the compounding engine**. They are where the budget and the team's attention have the highest marginal return once the search pillar is live.

### North star and KPI hierarchy

**North star:** **booked-and-attended appointments per week** (across all practitioners and disciplines). It captures real delivered value, leads to revenue, and exposes both empty chairs and no-shows. Revenue itself is too downstream to act on weekly.

| Layer | KPI | Where it's measured | Phase-1 target |
|---|---|---|---|
| Acquisition | New patients / month (by source) | Jane + GA4 + "how did you hear about us" | Establish baseline, then +10%/qtr |
| Conversion | Lead → booked rate; speed-to-lead | GA4 `booking_start`/`phone_tap`, front-desk log | <2h callback; >60% lead→book |
| Activation | First-visit → 2nd-visit rebook rate | Jane | >80% rebook before leaving |
| Retention | Care-plan completion; no-show/cancel rate | Jane | No-show <8%; completion up |
| Reactivation | Lapsed patients re-booked / quarter | Jane + email tool | Recover 5-10% of dormant list |
| Expansion | % patients seeing >1 discipline | Jane | Establish baseline, then grow |
| Monetization | Revenue / patient / year (LTV) | Jane | Trend up |

You cannot manage what you cannot see, and **Jane, not GA4, is the source of truth for revenue.** GA4 measures the website funnel; Jane measures the business. Section 7 ties them together.

---

## 2. Lever 1 — Acquisition (beyond search)

The search/SEO pillar is in `MARKETING-STRATEGY.md`. Two acquisition channels it omits, both higher-trust and often higher-ROI than ads:

### 2.1 The referral engine (highest-value gap)

Physio is a referral business. A single steady referrer can be worth more than a whole ad campaign, costs nothing per lead, and sends pre-trusted patients who convert and stay. You said you want this but don't know how to start. Here is the playbook.

**Who to target, in priority order for this clinic:**

1. **Personal-injury (ICBC) lawyers.** This is the standout. PI lawyers have a steady flow of car-accident clients who need funded physio *now* and ask their lawyer where to go. ICBC pays, so there's no price friction. A handful of North Shore PI lawyers referring to you is a direct line to your highest-value lane. They refer to clinics that make *their* life easy (clear documentation, progress reports, communication).
2. **GPs, walk-in clinics, and sports-medicine physicians** on the North Shore. They refer for back/neck/knee/post-surgical constantly. They send to clinics they trust to communicate back.
3. **Surgeons / orthopedic offices** (post-surgical rehab is a named service and a high-value episode).
4. **Employers and occupational-health contacts** (the WorkSafeBC lane). Local businesses with physical workforces.
5. **Gyms, run clubs, yoga/Pilates studios, sports teams** (sports-injury lane, and they skew affluent here).
6. **Pharmacies and seniors' residences** (feeds the elderly-care / balance service).
7. **Persian community organizations and Persian-owned businesses** (your structural advantage, see 2.3).

**The mechanics (how you actually build it):**

- **The offer to the referrer is not money** (illegal/unethical for healthcare referrals). It is: *you make them look good and make their job easier.* For doctors and lawyers that means **fast intake, a same-week appointment for their referral, and a one-page progress report back to them.** That closed loop is what earns repeat referrals.
- **A referral one-pager** (PDF + printed): who Azalea is, the differentiators (direct billing, no referral needed, English/Farsi, 12 practitioners, 2 locations, to 7pm + Saturdays), the conditions you treat, and a dead-simple way to refer (phone, fax, email, or a short web form). I can build a `/refer` page and this one-pager.
- **A named owner.** Referral relationships need a human who maintains them. Phase 1: you assemble the target list and materials. Goal state: Mary or a senior practitioner does periodic warm visits (a coffee, a clinic tour). Doctors refer to *people* they know.
- **Warm-visit cadence:** introduce, drop materials, then a light touch every quarter (a report, a thank-you, a holiday note). Five solid referrers maintained beats fifty cold drop-ins.
- **Track it:** add a "referred by" field at intake in Jane and a "how did you hear about us?" question. Without this you cannot tell which relationships work.

**Phase-1 starter (do-able now):** build the `/refer` page + one-pager, list the 5 nearest PI law firms and the 5 nearest GP/walk-in clinics, and make the first 3 introductions (start with PI lawyers, the highest ROI).

### 2.2 The Persian community as a network (not just keywords)

The search doc treats Farsi as cheap keywords. Bigger than that: the North Shore Iranian community (~22,000) runs on word-of-mouth and community ties, and you have a mostly Farsi-speaking team that competitors cannot copy. Treat it as a referral and community channel:

- Persian-language posts and reviews (ask Farsi-speaking patients for Farsi Google reviews; they rank and build trust with that audience).
- Presence in North Shore Persian Facebook groups, community boards, and events; relationships with Persian-owned businesses and clinics.
- A genuine Farsi `/fa` landing page (already on the roadmap) as the digital anchor.

### 2.3 Community and local presence (low cost, slow burn)

Seniors-centre talks (balance/fall-prevention feeds elderly-care), corporate lunch-and-learns (WorkSafe + ergonomics), sponsoring a local run/sports club (sports-injury). These compound trust in a small town. Phase 2+, light spend.

---

## 3. Lever 2 — Conversion (stop leaking the leads you already get)

Acquisition is wasted if interest doesn't become a booked, attended appointment. The leaks, in order of size:

- **Speed-to-lead.** Most physio bookings, especially ICBC and older patients, happen by **phone**. The clinic that calls back first wins. Target: **return every missed call / form within 2 hours, same business day minimum.** This is a front-desk behavior, not a tech fix, and it is probably your single biggest conversion lever. Measure it.
- **Phone handling.** The front desk converts or loses the ICBC/WorkSafe caller in the first two minutes. A simple script (acknowledge the injury, confirm direct billing and no referral, offer a same-week slot, book on the spot) lifts conversion measurably. Goal state: light training + a one-page script.
- **Booking friction.** Confirm what Jane's portal supports: does it deep-link to a location/service/practitioner? If yes, point each ad and page straight at the right pre-filled booking (the search doc flags this as the biggest friction cut). Click-to-call must be huge on mobile (already built).
- **The lead magnet for the not-ready.** A free "Is your pain ICBC-covered?" guide or a 15-minute phone consult captures people who won't book yet, into email, so retention can work on them. No discount, consistent with premium positioning.

The website itself (the conversion surface) is built and GA4 now measures `booking_start` and `phone_tap`. The gap is the **human follow-up speed**, which is where most clinics lose money.

---

## 4. Lever 3 — Retention and lifetime value (the biggest untapped lever)

You have the asset most clinics wish they had: **a patient list in Jane.** Past patients are the cheapest revenue in the building. Four moves, cheapest and highest-impact first:

### 4.1 Point-of-care rebooking (free, do it now)
The highest-yield retention act costs nothing: **book the next appointment before the patient leaves.** A patient who walks out with their next visit booked completes care; one who says "I'll call to rebook" often doesn't. This is a front-desk habit. Target: >80% of active patients leave with their next appointment booked. This alone can move revenue more than any ad.

### 4.2 No-show and late-cancel reduction
Every no-show is a chair that earned nothing and can't be resold. Confirm Jane's automated reminder settings (SMS + email, 48h and 2h), make the cancellation policy clear at booking, and track the no-show rate weekly. Target <8%.

### 4.3 Care-plan completion
Patients who drop off after 2-3 visits leave both money and a worse outcome on the table. A short check-in (call or email) to anyone who lapses mid-plan recovers a meaningful share. The clinical staff own the judgement of who; the system just flags the gap.

### 4.4 Reactivation of the dormant list (your fastest revenue win)
There is a list of people who saw you 6-24 months ago and drifted. A well-run reactivation campaign to them is the single fastest revenue available, at near-zero cost. This is where the email program starts.

### 4.5 The lifecycle email/SMS program

Grounded in the six standard sequence types, mapped to a clinic. **Compliance first:** Canada's anti-spam law (CASL) requires consent. You generally have *implied* consent to email recent patients (an existing business relationship, time-limited) and need *express* consent (a checkbox at intake) for ongoing marketing. Add the consent checkbox at intake now, and keep a clear unsubscribe in every send. Confirm whether Jane sends segmented marketing email or whether you need a dedicated tool (a low-cost ESP fits the ~$500-1k budget).

Priority order to build:

**A. Reactivation / win-back (build first — fastest ROI).** Trigger: no visit in 6-12 months, consent on file.

```
Sequence: Lapsed-patient reactivation
Trigger: 6-12 months since last visit, marketing consent on file
Goal: re-book a dormant patient
Audience: lapsed patients, segmented by last service if possible
Length: 3 emails over ~3 weeks

Email 1 (day 0) — value reminder, no pressure
Subject: A quick check-in from Azalea
Preview: How's that [back / knee / shoulder] holding up?
Body (<120 words): Warm, human, from a named person at the clinic. "It's been a
while. A lot of pain comes back quietly. If something's nagging, we're here, same
team, direct billing, no referral needed." One CTA.
CTA: Book a visit  → Jane

Email 2 (day 7) — relevance + reassurance (only to non-openers/non-bookers)
Subject: Still the clinic that finds the cause
Preview: Same-week appointments, English & Farsi
Body: Reinforce the differentiator + one short patient outcome. Mention seasonal
relevance if useful (ski season, gardening, etc.).
CTA: Book a visit

Email 3 (day 21) — soft last touch + list hygiene
Subject: Want us to stop the check-ins?
Body: "We won't crowd your inbox. If now's not the time, no problem." Honors the
relationship, protects deliverability.
CTA: Book a visit  /  secondary: update preferences
```

Run this as a **one-time broadcast to the existing dormant list first** (the immediate win), then leave it on as an evergreen trigger.

**B. Post-discharge follow-up + review ask (build second).** Trigger: care plan completed / last booked visit attended.

```
Email 1 (a few days after last visit): "How are you feeling?" + the Google review
ask (one-tap link, per-location). This is your review engine (search doc wants
5-10 reviews/location/month) and it doubles as a re-open door.
Email 2 (optional, ~6 weeks): maintenance tips + "we're here if it returns."
```

Single CTA each. The review ask at the moment of a good outcome is the highest-yield review tactic and feeds local SEO.

**C. New-patient welcome (build third).** Trigger: first appointment booked. Reduces first-visit no-shows and sets expectations: what to bring, parking, direct-billing reassurance, what the first visit looks like. Lower revenue impact than A and B but cheap and improves show rate.

**D. Newsletter / retention (Phase 2+).** Monthly, genuinely useful (seasonal injury prevention, a practitioner spotlight, a Farsi edition). Cadence that earns the read, not that fills the calendar. Keeps you top-of-mind for the next flare-up and for referrals.

**E. Transactional** (confirmations, reminders): almost certainly Jane's job. Make sure they're on and well-worded; don't rebuild them.

---

## 5. Lever 4 — Expansion (the multidisciplinary moat)

Ten disciplines under one roof is your structural advantage over single-service clinics. Most clinics fail to use it. The move is **internal cross-referral**: the physio who notices a patient would benefit from kinesiology (ICBC funds active rehab), massage, acupuncture, or OT, and warm-hands them to a colleague down the hall.

- **ICBC active rehab → kinesiology** is the obvious, funded cross-sell: physio assessment into a funded kinesiology rehab block. High value, no price objection.
- **Post-surgical → physio + kinesiology + (later) massage.**
- **Define 2-3 named programs / bundles** (e.g. a post-surgical recovery pathway, a seniors balance program, an ICBC active-rehab block). Programs sell better than loose sessions and raise episode value, without discounting.
- **Internal referral is a clinical-culture habit**, so it's a goal-state (full buy-in) lever. The enabler you can build now: a one-page internal "who treats what" reference so every practitioner knows what their colleagues offer.
- **Open question to resolve (from HANDOFF):** the Instagram "skin/facial" promo, services with no named practitioner (OT, chiropractic, yoga therapy). Confirm what's real before marketing it. Don't promote a service the clinic can't reliably staff.

---

## 6. Social and owned content (Instagram / Facebook)

You have active accounts; use them for retention and trust as much as acquisition.

- **Cadence that's sustainable beats ambitious-then-abandoned.** 2-3 posts/week is plenty. Content pillars: (1) education/condition tips ("why your knee hurts on stairs", repurpose the 19 blog articles), (2) practitioner and clinic personality (trust + E-E-A-T), (3) patient outcomes / reviews (with consent), (4) **Farsi-language posts** for the Persian audience, (5) practical clinic facts (direct billing, no referral, hours).
- **Repurpose, don't reinvent:** the blog already holds 19 researched articles. Each is several social posts and a newsletter item. The content engine is built; social is distribution.
- **Reviews and UGC** are the highest-trust social content. Reshare Google reviews.
- Social is a weak *direct* booking channel for physio but a strong *trust and top-of-mind* channel that supports referrals, reactivation, and the Persian network. Measure it as assist, not last-click.

---

## 7. Measurement (extend today's GA4 into a full framework)

GA4 now fires `booking_start` and `phone_tap` (live). To run the whole system you need three things GA4 alone can't give:

1. **A "How did you hear about us?" field at intake** (Jane). This is the only honest way to attribute offline channels: referrals, word-of-mouth, the Persian network. Online attribution will systematically undercount these; the intake question corrects it.
2. **Extended event taxonomy** (GA4), naming consistent with what's there (verb_noun, snake_case):

| Event | When fired | Status |
|---|---|---|
| `booking_start` | Click any Jane booking link | Live |
| `phone_tap` | Click any tel: link | Live |
| `lead_magnet_download` | Submits the ICBC/what-to-bring guide form | To build |
| `form_submit` | Any contact/refer form submit | To build |
| `directions_click` | Click a map/directions link | Optional |

3. **The offline reconciliation loop.** Weekly, compare GA4/Ads booking signals against Jane's actual new patients and revenue. The website tells you *intent*; Jane tells you *truth*. When they disagree (e.g. ads report 20 booking_starts but only 8 new patients showed), that gap is the conversion/show-rate problem to fix.

**Dashboards (one audience each):**
- **You (operator):** acquisition by source, cost per booking, lead→book, no-show rate, reactivation recovered, weekly.
- **Mary (owner, simple):** the north star (attended appts/week), revenue trend, new vs returning, monthly. Lead with the decision, not the vanity metric.

**Attribution honesty:** GA4's data-driven model is fine as primary, but treat *all* models as directional and always cross-check the intake "how did you hear" data. Phone and referral bookings will never attribute cleanly online; that's expected, not a bug.

---

## 8. Phased roadmap and budget

Sequenced by fastest, safest return. Don't switch everything on at once.

### Phase 1 — now (you + light front-desk buy-in, ≤ ~$1k/mo extra)
The cheap, high-yield moves that don't need full team change:
1. **Pull the Jane utilization report** (decides where to point everything).
2. **Point-of-care rebooking habit** + **reminders on** + track no-shows (front-desk, near-free, biggest retention win).
3. **Reactivation broadcast** to the dormant list (sequence A) once consent/tool are sorted. Fastest revenue.
4. **Review engine:** post-discharge review-ask email (sequence B) + one-tap Google links per location.
5. **Referral pilot:** `/refer` page + one-pager, first 3 PI-lawyer / GP introductions.
6. **Social cadence:** 2-3 posts/week repurposed from the blog, including Farsi.
7. **Intake "how did you hear about us?"** + marketing-consent checkbox.

### Phase 2 — expand what works
Full lifecycle email program (welcome + newsletter), formalize the referral cadence, scale social, named cross-discipline programs, community talks. Increase spend into proven channels.

### Phase 3 — goal state (full team buy-in)
Structured referral partnerships maintained by Mary/seniors, internal cross-referral as clinic culture, corporate wellness / WorkSafe employer outreach, Persian community events, Farsi `/fa` site.

### The extra ~$500-1,000/mo, allocated
| Item | ~Monthly | Why |
|---|---|---|
| Email/SMS tool (ESP) | $30-100 | Runs reactivation + lifecycle (if Jane can't segment-send) |
| Content / social (design, scheduling, or light freelance) | $200-500 | Sustains the cadence; repurpose blog |
| Review/reputation tooling (optional) | $0-100 | One-tap review links; often free/manual |
| Referral materials (one-pager print, `/refer` page) | one-off | Enables the highest-ROI channel |
| Experiment buffer | remainder | Test one new thing/quarter (a community talk, a Persian-group push) |

Keep the ~$1.5-2k Google Ads budget separate and as-planned in the search doc.

---

## 9. Honest limitations and dependencies

- **The capacity report is the gating unknown.** If certain practitioners are already full, point acquisition only at the ones with gaps, and lean harder on retention/yield than on raw new-patient volume.
- **CASL consent** governs the email program. Add the intake checkbox now; rely on implied consent only for recent patients; always include unsubscribe.
- **Jane capabilities are an external dependency:** confirm segmented email/recall, automated reminders, deep-link booking, and report exports. Some of the plan's mechanics depend on what it supports; if it's thin, a low-cost ESP covers email.
- **The front desk is make-or-break** for the two biggest levers (speed-to-lead and point-of-care rebooking). These need light buy-in (Phase 1) and pay back faster than any ad.
- **Small market ceiling:** acquisition will cap (search doc). That is *why* this plan weights retention, referrals, and expansion, which have no volume ceiling.
- **No-discount discipline holds throughout.** Every lever here grows revenue without cheapening the brand.

**The one move, if you do only one thing beyond the website:** turn on point-of-care rebooking and run a single reactivation broadcast to the dormant list. Near-zero cost, uses assets you already own, and it will out-earn the next dollar of ad spend.
