import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'practitioner',
  title: 'Practitioner',
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
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'credentials', title: 'Credentials', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'languages', title: 'Languages', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'focus', title: 'Focus areas', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 5 }),
    defineField({ name: 'bookingUrl', title: 'Booking URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
