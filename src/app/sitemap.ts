import type { MetadataRoute } from 'next'
import { SITE, services, conditions, team } from '@/lib/clinic'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  const staticRoutes = [
    '',
    '/services',
    '/conditions',
    '/team',
    '/about',
    '/locations',
    '/insurance',
    '/what-to-expect',
    '/faq',
    '/book',
    '/blog',
    '/careers',
    '/privacy',
  ]

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/book' ? 0.9 : 0.7,
  }))

  for (const s of services) {
    entries.push({ url: `${base}/services/${s.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })
  }
  for (const c of conditions) {
    entries.push({ url: `${base}/conditions/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })
  }
  for (const p of team) {
    entries.push({ url: `${base}/team/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 })
  }

  return entries
}
