import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'condition',
  title: 'Condition',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'short', title: 'Short description', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'intro',
      title: 'Intro (answer-first)',
      type: 'text',
      rows: 3,
      description: 'Opens with a direct answer. Used at the top of the condition page and for extraction.',
    }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'relatedServices',
      title: 'Related services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'name', subtitle: 'short', media: 'image' } },
})
