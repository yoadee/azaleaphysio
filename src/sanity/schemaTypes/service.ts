import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
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
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      description: 'One-sentence answer-first summary. AI and search extract this first.',
      validation: (r) => r.required().max(200),
    }),
    defineField({ name: 'whoThisHelps', title: 'Who this helps', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'whatWeDo', title: 'What we do', type: 'text', rows: 4 }),
    defineField({ name: 'description', title: 'Full description', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'relatedConditions',
      title: 'Related conditions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'condition' }] }],
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'excerpt' } },
})
