import { SITE, services, conditions } from '@/lib/clinic'

/**
 * /llms.txt — a plain-text map of the site for AI crawlers and answer engines.
 * Served as text/plain so it is trivially parseable.
 */
export function GET() {
  const base = SITE.url

  const serviceLines = services
    .map((s) => `- [${s.name}](${base}/services/${s.slug}): ${s.excerpt}`)
    .join('\n')

  const conditionLines = conditions
    .map((c) => `- [${c.name}](${base}/conditions/${c.slug}): ${c.short}`)
    .join('\n')

  const body = `# Azalea Physiotherapy

> A multidisciplinary physiotherapy clinic in West Vancouver, BC, offering ten rehabilitation and wellness services across two locations, with direct billing to ICBC, WorkSafeBC, and extended health insurers. No referral required.

Azalea Physiotherapy has served the North Shore since 2011. The clinic employs twelve registered practitioners across physiotherapy, sports injury, acupuncture, occupational therapy, kinesiology, osteopathy, chiropractic, weight loss programs, yoga therapy, and elderly care. Several practitioners treat in Farsi as well as English.

## Services
${serviceLines}

## Conditions we treat
${conditionLines}

## Practitioners
- [Team overview](${base}/team): Twelve registered practitioners with credentials and focus areas.

## Insurance and billing
- [Insurance & Billing](${base}/insurance): Direct billing to ICBC, WorkSafeBC, Pacific Blue Cross, Sun Life, Manulife, Canada Life, Green Shield, and Desjardins.

## Clinic information
- [Locations & Hours](${base}/locations): 16th Street and Ocean Walk, both in West Vancouver.
- [Your First Visit](${base}/what-to-expect): Step-by-step first-visit guide.
- [FAQ](${base}/faq): Referrals, insurance, first visits, ICBC, and direct billing.
- [About](${base}/about): Clinic history and approach.
- [Book an appointment](${base}/book): By phone at (604) 281-3345 (16th Street) or (604) 281-3122 (Ocean Walk).
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
