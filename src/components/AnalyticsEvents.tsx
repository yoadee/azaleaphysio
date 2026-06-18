'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'

/**
 * Owns the two things gtag's auto-config cannot do on its own for an App Router
 * site:
 *
 *  1. Pageviews on client-side navigation. gtag only fires page_view on hard
 *     load; SPA route changes are invisible to it. We send page_view on every
 *     pathname change (window.location read directly so gclid / query params are
 *     captured without forcing useSearchParams — which would deopt static pages
 *     out of prerendering).
 *
 *  2. Conversion events. Every booking CTA is a plain <a> to the ClinicMaster
 *     portal and every phone CTA is a tel: link, scattered across ~35 files. A
 *     single delegated click listener catches them all (and any future CTA) so
 *     we never have to wire onClick per button. booking_start + phone_tap are
 *     the P0 funnel events; mark them as conversions in GA4 (and map to a
 *     Google Ads conversion action once Ads is live).
 */
export default function AnalyticsEvents() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  // gtag's config call already sends the pageview for the initial load, so skip
  // the first render here (avoids double-counting) and send a pageview only on
  // subsequent client-side navigations, which gtag does not detect on its own.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname])

  // Delegated click tracking for booking + phone links, attached once.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''

      if (href.startsWith('tel:')) {
        track('phone_tap', { number: href.replace('tel:', '') })
        return
      }

      // The ClinicMaster booking portal — any link to it is a booking start,
      // wherever it lives (nav, hero, BookCta band, footer, blog inline).
      if (href.includes('clinicmaster.com')) {
        track('booking_start', { destination: href, source_path: pathname })
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname])

  return null
}
