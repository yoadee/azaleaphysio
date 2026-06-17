import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/clinic'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow everything except the CMS and Next internals.
      { userAgent: '*', allow: '/', disallow: ['/studio', '/studio/'] },
      // Explicitly welcome AI crawlers. Visibility in AI answers matters more
      // than blocking them for a local clinic (AEO/GEO).
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
