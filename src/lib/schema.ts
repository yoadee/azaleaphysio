import { SITE, type Service, type Practitioner, type Faq } from './clinic'

/** Helper to render a JSON-LD object as a <script> payload string. */
export const jsonLdString = (obj: unknown) => JSON.stringify(obj)

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: `${service.name} in West Vancouver`,
    description: service.excerpt,
    procedureType: 'https://schema.org/TherapeuticProcedure',
    howPerformed: service.whatWeDo,
    provider: {
      '@type': 'MedicalBusiness',
      name: SITE.name,
      url: SITE.url,
    },
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
