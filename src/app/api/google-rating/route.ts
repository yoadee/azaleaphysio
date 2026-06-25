import { NextResponse } from 'next/server'
import { getGoogleRating } from '@/lib/googleRating'

/**
 * JSON endpoint for the live Google rating, used by the client-rendered home page
 * (server components read getGoogleRating directly instead). Cached daily via the
 * underlying fetch; falls back to the hardcoded rating when the API isn't configured.
 */
export const revalidate = 86400

export async function GET() {
  const rating = await getGoogleRating()
  return NextResponse.json(rating)
}
