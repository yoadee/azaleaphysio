import { SITE, services, conditions, locations } from '@/lib/clinic'

/**
 * /llms.txt — a plain-text map of the site for AI crawlers and answer engines.
 * Served as text/plain so it is trivially parseable. Answer-first facts up top so
 * an assistant can quote them directly for "physio West Vancouver" style queries.
 */
export function GET() {
  const base = SITE.url

  const serviceLines = services
    .map((s) => `- [${s.name}](${base}/services/${s.slug}): ${s.excerpt}`)
    .join('\n')

  const conditionLines = conditions
    .map((c) => `- [${c.name}](${base}/conditions/${c.slug}): ${c.short}`)
    .join('\n')

  const locationLines = locations
    .map(
      (l) =>
        `- [${l.name}](${base}/locations/${l.slug}): ${l.street}, West Vancouver, BC ${l.postal}. Phone ${l.telLabel}. ${l.hours
          .map((h) => `${h.days} ${h.time}`)
          .join(', ')}.`
    )
    .join('\n')

  const body = `# Azalea Physiotherapy

> A multidisciplinary physiotherapy clinic in West Vancouver, BC, offering a range of rehabilitation and wellness services across two locations, with direct billing to ICBC, WorkSafeBC, and extended health insurers. No referral required. Treatment available in English and Farsi.

Azalea Physiotherapy has served the North Shore since 2011. The clinic employs eight registered practitioners across physiotherapy and a range of allied disciplines (the full, current list is under Services below). Owner Mary Ghoroghi is a registered physiotherapist known for finding the underlying cause of a problem rather than treating only the symptom. Several practitioners treat in Farsi (Persian) as well as English.

## Key facts
- No doctor's referral is required to see a physiotherapist in British Columbia. You can book directly.
- Direct billing to ICBC, WorkSafeBC, and most major extended health plans. You pay only the portion your plan does not cover.
- ICBC pre-approves 25 physiotherapy visits in the first 12 weeks after a car accident, billed directly to ICBC, with no referral or adjuster approval needed (just a claim number).
- WorkSafeBC physiotherapy is covered for workplace injuries once a claim is active; Azalea is a WorkSafeBC provider and bills directly.
- Fees: initial physiotherapy assessment roughly $110 to $135 CAD; follow-up visits roughly $90 to $110 CAD. ICBC and WorkSafeBC visits are typically covered in full with nothing to pay upfront.
- Appointments are usually available the same week. Weekday hours run until 7pm, plus Saturday mornings.
- Treatment is available in English and Farsi.
- Two locations, both in West Vancouver, serving the whole North Shore (West Vancouver and North Vancouver).
- Google rating: ${SITE.googleRating} out of 5 from ${SITE.reviewCount} reviews.
- Online booking: ${SITE.booking}

## High-intent pages
- [ICBC Physiotherapy](${base}/icbc): How to start ICBC physiotherapy after a car accident. 25 pre-approved visits, no referral, direct billing.
- [WorkSafeBC Physiotherapy](${base}/worksafebc): Physiotherapy for a workplace injury. WorkSafeBC provider, direct billing, return-to-work reporting.
- [Pricing](${base}/pricing): Transparent fees and what insurance covers.

## Services
${serviceLines}

## Conditions we treat
${conditionLines}

## Practitioners
- [Team overview](${base}/team): Eight registered practitioners with credentials and focus areas. Physiotherapists are registered with the College of Physical Therapists of British Columbia.

## Insurance and billing
- [Insurance & Billing](${base}/insurance): Direct billing to ICBC, WorkSafeBC, Pacific Blue Cross, Sun Life, Manulife, Canada Life, Green Shield, Desjardins and more.

## Locations
${locationLines}

## Clinic information
- [Your First Visit](${base}/what-to-expect): Step-by-step first-visit guide.
- [FAQ](${base}/faq): Referrals, insurance, first visits, ICBC, Farsi availability, and direct billing.
- [About](${base}/about): Clinic history and approach.
- [Book an appointment](${base}/book): Online, or by phone at ${locations[0].telLabel} (16th Street) or ${locations[1].telLabel} (Ocean Walk). Email ${SITE.email}.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
