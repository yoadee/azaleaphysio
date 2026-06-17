import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'patientName', title: 'Patient name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'patientDetail', title: 'Patient detail', type: 'string', description: 'e.g. "ski instructor, North Vancouver"' }),
    defineField({ name: 'service', title: 'Related service', type: 'reference', to: [{ type: 'service' }] }),
    defineField({ name: 'condition', title: 'Related condition', type: 'reference', to: [{ type: 'condition' }] }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'patientName', subtitle: 'quote' } },
})
