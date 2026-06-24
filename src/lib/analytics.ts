/**
 * Booking-funnel analytics helper (CRO research P0 events).
 *
 * Events are sent to GA4 via gtag. They are fired from <AnalyticsEvents/> (a
 * sitewide delegated click listener) — booking_start when any Jane App booking
 * link is clicked, phone_tap on any tel: link. Safe no-op until
 * NEXT_PUBLIC_GA_ID is set: track() does nothing on the server and logs to the
 * console in dev so funnel wiring can be verified before GA is live.
 */

type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: GtagFn
    dataLayer?: unknown[]
  }
}

export type BookingEvent =
  | 'booking_start'
  | 'phone_tap'
  | 'practitioner_viewed'
  | 'location_selected'
  | 'service_selected'
  | 'booking_complete'

export function track(event: BookingEvent, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  } else if (process.env.NODE_ENV === 'development') {
    // Visible in dev so funnel wiring can be verified before GA is live.
    console.debug('[analytics]', event, params)
  }
}
