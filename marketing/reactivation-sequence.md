# Sequence: Lapsed-patient reactivation

**Trigger:** No visit in 6-24 months, marketing consent on file.
**Goal:** Re-book a dormant patient (the fastest, near-zero-cost revenue available).
**Audience:** Past patients, dormant 6-24 months. Segment by last service where possible so the copy can name the body part.
**Length:** 3 emails over ~3 weeks.
**Voice:** Premium, warm, human, restrained. No discounts, no urgency gimmicks, no AI filler. Lead with care, not a sale.

---

## Before you send (mechanics)

- **Include:** patients whose last visit was 6-24 months ago, with marketing consent.
- **Exclude:** anyone seen in the last 6 months (still active), anyone who has unsubscribed, and anyone with no consent. Suppress duplicates across both locations.
- **CASL:** rely on the existing-business-relationship implied consent for recent patients, include a working unsubscribe in every email, and add an express marketing-consent checkbox at intake going forward (especially as patient data moves into Jane).
- **From name / reply-to:** a real human and a monitored inbox (e.g. "Mary at Azalea Physiotherapy" / info@azaleaphysio.com). Replies will come; route them to the front desk so they can book on the spot.
- **CTA link:** the live booking portal (`SITE.booking`; the Jane URL once migrated). Always pair the button with the clinic phone numbers, since many physio bookings, especially older patients, happen by phone.
- **Send the first round as a one-time broadcast** to the current dormant list, then leave the 3-email flow on as an evergreen trigger for anyone who crosses 6 months.
- **Emails 2 and 3 go only to people who have not opened or booked** from the prior email.
- **Personalization:** `{{first_name}}` and, where you have it, `{{last_service_area}}` (e.g. "back", "knee", "shoulder"). Generic fallbacks are written in below.
- **Mobile-first:** most opens are on phones. Short paragraphs, one button, test on a phone before sending.
- **Measure:** open rate, click rate, and the only number that matters, **bookings recovered** (reconcile against Jane, not the email tool).

---

## Email 1 — Warm check-in (day 0)

**Send:** Trigger / day 0 (or the broadcast date)
**Subject:** A quick check-in from Azalea
**Subject variants (A/B):** "How's your {{last_service_area}} holding up?" · "It's been a while, {{first_name}}"
**Preview:** No agenda, just making sure you're doing well.

Hi {{first_name}},

It has been a while since we saw you at Azalea, and I wanted to check in.

Pain has a way of coming back quietly. The {{last_service_area}} feels fine for months, then a busy week or a cold spell brings it back. If anything has been nagging at you, it is worth looking at before it settles in.

If you would like to come in, we are the same team you remember. No referral needed, we bill ICBC, WorkSafeBC and most extended health directly, and we can usually find you a spot the same week, including evenings and Saturdays.

And if you are feeling great, that is the best outcome of all. Either way, it was good to think of you.

**[ Book a visit ]**

Or call the clinic closest to you: 16th Street (604) 281-3345 · Ocean Walk (604) 281-3122.

Warmly,
Mary Ghoroghi
Azalea Physiotherapy, West Vancouver

*Generic fallback for `{{last_service_area}}`: "An old injury feels fine for months, then a busy week brings it back."*

**Primary CTA:** Book a visit
**CTA URL:** live booking link (SITE.booking / Jane once migrated)

---

## Email 2 — Why people come back to us (day 7, non-responders only)

**Send:** Day 7, only to those who did not open or book from Email 1
**Subject:** Still the clinic that looks for the cause
**Subject variants (A/B):** "The reason your pain keeps returning" · "Same-week appointments, English and Farsi"
**Preview:** Treating the symptom is easy. Finding the cause is the point.

Hi {{first_name}},

Most {{last_service_area}} pain that keeps returning was never fully resolved, only quieted. The exercise helped, the ache faded, but the thing causing it stayed.

That is the part we focus on. Our patients tell us the difference is that we look for the cause, not just the symptom, so the relief actually lasts. It is why people come back to us and send their family.

If something has been bothering you, let's get to the bottom of it.

**[ Book a visit ]**

Prefer to talk first? Call 16th Street (604) 281-3345 or Ocean Walk (604) 281-3122.

Warmly,
The team at Azalea Physiotherapy

*Generic fallback: "Most pain that keeps returning was never fully resolved, only quieted."*

**Primary CTA:** Book a visit
**CTA URL:** live booking link

---

## Email 3 — Soft last touch and list hygiene (day 21, still non-responders)

**Send:** Day 21, only to those who still have not opened or booked
**Subject:** Should we leave you be?
**Subject variants (A/B):** "We won't crowd your inbox" · "One last note from Azalea"
**Preview:** No pressure either way. We just want to do right by you.

Hi {{first_name}},

I will not keep landing in your inbox. If now is not the time, that is completely fine, and I hope it means you are feeling well.

If anything changes, you know where we are. Same team, direct billing, no referral, and usually a same-week appointment.

**[ Book a visit ]**

If you would rather not hear from us, you can update your preferences any time below. No hard feelings.

Take care,
Mary Ghoroghi
Azalea Physiotherapy, West Vancouver

**Primary CTA:** Book a visit
**Secondary:** Update email preferences / unsubscribe
**CTA URL:** live booking link

---

## Notes for later

- **Farsi variant:** translate the full sequence for Farsi-speaking patients. This is a genuine differentiator and the Persian audience responds to being addressed in their own language. Use the Farsi-speaking team for the translation so the tone is right, not a machine translation.
- **Segment versions:** an ICBC/car-accident segment can swap the body for "if your symptoms have come back since your claim closed" framing. A post-surgical segment can frame around long-term maintenance.
- **Cadence after this:** patients who re-book move into the normal post-discharge follow-up and (Phase 2) the monthly newsletter. Patients who go quiet after Email 3 should not be emailed again until they return, to protect deliverability.
