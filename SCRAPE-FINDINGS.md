# Old-site scrape findings (azaleaphysio.com)

Extracted from the existing Joomla site + its live team profiles on 2026-06-19, to inform the rebuild. Brand/positioning/history copy was deliberately discarded (the rebuild revamps everything from the ground up except the logo and name). Kept here: pricing, data flags, and service facts worth preserving.

---

## 1. Fee schedule (NEEDS MARY'S CONFIRMATION before publishing)

These are old-site rates. Treat as a starting point to confirm, not as current truth.

| Service | Initial | Subsequent | Notes |
|---|---|---|---|
| Physiotherapy | $105 | $95 | Multiple areas / extended time: $160 |
| Massage therapy | — | — | 30 min $50 · 45 min $70 · 60 min $90 |
| Osteopathy | $80 | $75 | |
| Acupuncture | $110 | $100 | |
| Active rehab / kinesiology | $90 | $85 | ICBC / WCB: no user fee |
| Exercise programs | $70 | — | per session |
| MSP (gov't assistance) | $60 / session | | max 10 visits/yr (see flag) |
| ICBC | $0 | | with accepted claim |
| WorkSafeBC | $0 | | no fee for accepted claims |

**Pricing flags:**
- The rebuild `/pricing` quotes physio at **$110-135 / $90-110**; the old site says **$105 / $95**. They disagree, so the "verified" physio fee needs a real source. Confirm with Mary.
- **MSP self-contradiction on the old page:** "$60 per session" in one place, "$40 per treatment, max 10" in another. Confirm the true MSP user fee.
- **Massage therapy is priced and offered** but has no service page on the rebuild and no RMT on the team list. Decide whether to add a massage page.

## 2. Data flags to fix

- **Ocean Walk postal code:** old site (and the rebuild's `clinic.ts`) both use **V6B 5C6**, which is a downtown-Vancouver code, not West Vancouver. Likely an error carried over. Verify the real Ocean Walk postal code (16th St V7V 3R8 is correct).
- **Melina's surname:** RESOLVED — it is **Raad** (Abtin confirmed). The old index showed "Asbaghi"; ignore that.

## 3. Service facts worth preserving (fold into the rebuild where they fit)

- **Acupuncture:** offers **IMS (Intramuscular Stimulation)** as a distinct technique; typical treatment "8-10 needles for 15-20 minutes"; fresh disposable needles each session.
- **Elderly Care (ECP):** offered in **home and clinic settings** (home visits are a real differentiator). Gait re-education, balance/strength work, mobility aids, TENS, three-phase assessment. CONFIRM home visits are still offered before publishing as a claim.
- **Weight loss:** one-on-one, "4-10 sessions over 1-2 months," 45-60 min sessions.
- **Osteopathy:** OMT, myofascial release, muscle energy techniques, joint mobilization, craniosacral; whole-body, cause-distant-from-symptom framing.
- **Sports injury:** athletic taping and bracing, event/team coverage (confirm the clinic still does on-site event coverage before claiming it).

## 4. Promos — none real

The "Patient Perks" page is empty Lorem Ipsum and the "Student Discount Program" page does not exist. There are no real promos to migrate. Consistent with the premium, no-discount positioning: drop both.

## 5. Team bios

The live azaleaphysio.com team profiles match the current 12-person roster and carry far richer credentials than the rebuild had. Those credentials were pulled and reworked into `clinic.ts` (see commit history). Source of truth for the deep detail is the live profiles, captured at scrape time.

## 6. Confirmed (no action)

- Booking now runs on Jane App (`https://azaleaphysiotherapyclinic.janeapp.com/`), wired in `SITE.booking`. Migrated off the old ClinicMaster `clinicId 1897` link.
- Email `info@azaleaphysio.com`, both clinic phones/faxes and hours all match the rebuild.
- Social: Facebook, Instagram, Twitter/X (confirm the Twitter/X account still exists or drop it).
