import { SITE, locations, type Service, type Practitioner, type Faq } from './clinic'

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
