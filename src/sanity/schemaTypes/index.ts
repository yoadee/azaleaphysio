import { type SchemaTypeDefinition } from 'sanity'

import service from './service'
import practitioner from './practitioner'
import condition from './condition'
import testimonial from './testimonial'
import location from './location'
import faq from './faq'
import post from './post'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, practitioner, condition, testimonial, location, faq, post, siteSettings],
}
