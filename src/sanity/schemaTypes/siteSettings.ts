import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton: only one document. Hide the "create new" affordance via desk structure.
  fields: [
    defineField({ name: 'businessName', title: 'Business name', type: 'string', initialValue: 'Azalea Physiotherapy' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'googleRating', title: 'Google rating', type: 'number', validation: (r) => r.min(0).max(5) }),
    defineField({ name: 'reviewCount', title: 'Review count label', type: 'string', description: 'e.g. "75+"' }),
    defineField({ name: 'insurers', title: 'Insurers (direct billing)', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'social',
      title: 'Social profiles',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'Used for sameAs in Organization schema.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
