import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
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
    defineField({ name: 'street', title: 'Street address', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string', initialValue: 'West Vancouver, BC' }),
    defineField({ name: 'postal', title: 'Postal code', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({
      name: 'hours',
      title: 'Opening hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'days', title: 'Days', type: 'string' },
            { name: 'time', title: 'Time', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'mapEmbedUrl', title: 'Map embed URL', type: 'url' }),
    defineField({ name: 'bookingUrl', title: 'Booking URL', type: 'url' }),
  ],
  preview: { select: { title: 'name', subtitle: 'street' } },
})
