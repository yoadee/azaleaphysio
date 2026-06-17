/**
 * Booking-funnel analytics helper (CRO research P0 events).
 *
 * PLACEHOLDER: events are sent to GA4 via gtag when NEXT_PUBLIC_GA_ID is set.
 * Until a measurement ID is configured (and/or a booking system is wired up),
 * track() is a safe no-op in the browser and does nothing on the server.
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
