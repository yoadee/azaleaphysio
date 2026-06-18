import type { MetadataRoute } from 'next'
import { SITE, services, conditions, team } from '@/lib/clinic'
import { posts } from '@/content/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  // High-intent money pages (ICBC, WorkSafeBC, pricing, per-location) carry a
  // higher priority: they are the message-matched Google Ads landing targets.
  const highIntentRoutes = ['/icbc', '/worksafebc', '/pricing', '/locations/16th-street', '/locations/ocean-walk']

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
    '/refer',
    '/careers',
    '/privacy',
  ]

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/book' ? 0.9 : 0.7,
  }))

  for (const path of highIntentRoutes) {
    entries.push({ url: `${base}${path}`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 })
  }

  for (const s of services) {
    entries.push({ url: `${base}/services/${s.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })
  }
  for (const c of conditions) {
    entries.push({ url: `${base}/conditions/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })
  }
  for (const p of team) {
    entries.push({ url: `${base}/team/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 })
  }
  for (const p of posts) {
    entries.push({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return entries
}
