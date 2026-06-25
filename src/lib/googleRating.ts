import { cache } from 'react'
import { SITE } from './clinic'

/**
 * Live Google rating for the 16th Street clinic (the established location with the
 * full review history). The newer Ocean Walk clinic is deliberately excluded so a
 * handful of early reviews don't drag the displayed number.
 *
 * Reads from the Google Places API (New), cached for 24h. Falls back to the
 * hardcoded SITE.googleRating / SITE.reviewCount whenever the API key or Place ID
 * is missing, or any request fails, so the site never shows a broken rating.
 *
 * Setup (production): set two env vars in Vercel (Production + Preview):
 *   GOOGLE_PLACES_API_KEY  — a key with "Places API (New)" enabled
 *   GOOGLE_PLACE_ID_MAIN   — the Place ID for the 16th Street clinic
 */
export type GoogleRating = { rating: number; reviewCount: string; live: boolean }

const FALLBACK: GoogleRating = {
  rating: SITE.googleRating,
  reviewCount: SITE.reviewCount,
  live: false,
}

// `cache` dedupes within a single render; the fetch `revalidate` caches across
// requests for 24h, so we hit Google at most once a day regardless of traffic.
export const getGoogleRating = cache(async (): Promise<GoogleRating> => {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID_MAIN
  if (!key || !placeId) return FALLBACK

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return FALLBACK
    const data: { rating?: number; userRatingCount?: number } = await res.json()
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') {
      return FALLBACK
    }
    return {
      rating: Math.round(data.rating * 10) / 10, // one decimal, e.g. 4.6
      reviewCount: String(data.userRatingCount),
      live: true,
    }
  } catch {
    return FALLBACK
  }
})
