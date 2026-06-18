import { SITE, locations, type Location, type Service, type Practitioner, type Faq } from './clinic'

/** Helper to render a JSON-LD object as a <script> payload string. */
export const jsonLdString = (obj: unknown) => JSON.stringify(obj)

// Shared area + languages: the areaServed and Persian-language signals are direct
// AEO wins (AI assistants quote availableLanguage for "Farsi physio" queries).
const AREA_SERVED = ['West Vancouver', 'North Vancouver', 'North Shore']

/** The clinic as a structured provider entity, reused across page schemas. */
export function clinicProvider() {
  const primary = locations[0]
  return {
    '@type': 'MedicalClinic',
    name: SITE.name,
    url: SITE.url,
    telephone: primary.telLabel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: primary.street,
      addressLocality: 'West Vancouver',
      addressRegion: 'BC',
      postalCode: primary.postal,
      addressCountry: 'CA',
    },
    areaServed: AREA_SERVED,
    availableLanguage: ['English', 'Persian'],
    paymentAccepted: 'ICBC, WorkSafeBC, extended health insurance, debit, credit',
  }
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: `${service.name} in West Vancouver`,
    description: service.excerpt,
    procedureType: 'https://schema.org/TherapeuticProcedure',
    howPerformed: service.whatWeDo,
    areaServed: AREA_SERVED,
    provider: clinicProvider(),
    url: `${SITE.url}/services/${service.slug}`,
  }
}

export function practitionerSchema(p: Practitioner) {
  return {
    '@context': 'https://schema.org',
    '@type': p.role.toLowerCase().includes('physiotherap') ? 'Physician' : 'Person',
    name: p.name,
    jobTitle: p.role,
    description: p.bio,
    knowsLanguage: p.languages,
    knowsAbout: p.focus,
    ...(p.registration
      ? {
          memberOf: {
            '@type': 'Organization',
            name: 'College of Physical Therapists of British Columbia',
          },
        }
      : {}),
    worksFor: {
      '@type': 'MedicalBusiness',
      name: SITE.name,
      url: SITE.url,
    },
    url: `${SITE.url}/team/${p.slug}`,
  }
}

export function faqPageSchema(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function howToSchema(name: string, steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

// Parse a clock label like "8am", "8:30am", "7pm" into 24-hour "HH:MM".
function to24h(label: string): string {
  const m = label.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i)
  if (!m) return label
  let h = parseInt(m[1], 10)
  const min = m[2] ?? '00'
  const ap = m[3].toLowerCase()
  if (ap === 'pm' && h !== 12) h += 12
  if (ap === 'am' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${min}`
}

const DAY_MAP: Record<string, string[]> = {
  'Mon to Fri': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  Saturday: ['Saturday'],
  Sunday: ['Sunday'],
}

/** Per-location MedicalClinic schema with NAP, hours, languages and rating. */
export function locationSchema(loc: Location) {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'Physiotherapy'],
    '@id': `${SITE.url}/locations/${loc.slug}`,
    name: `${SITE.name}, ${loc.name.replace(' Clinic', '')}`,
    url: `${SITE.url}/locations/${loc.slug}`,
    telephone: loc.telLabel,
    faxNumber: loc.fax,
    email: SITE.email,
    priceRange: '$$',
    paymentAccepted: 'ICBC, WorkSafeBC, extended health insurance, debit, credit',
    currenciesAccepted: 'CAD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.street,
      addressLocality: 'West Vancouver',
      addressRegion: 'BC',
      postalCode: loc.postal,
      addressCountry: 'CA',
    },
    areaServed: AREA_SERVED,
    availableLanguage: ['English', 'Persian'],
    hasMap: loc.maps,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(SITE.googleRating),
      reviewCount: SITE.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: loc.hours.map((h) => {
      const [opens, closes] = h.time.split(' to ').map(to24h)
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_MAP[h.days] ?? [h.days],
        opens,
        closes,
      }
    }),
  }
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}
