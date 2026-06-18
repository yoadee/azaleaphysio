export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-16'

// Project ID and dataset are public (non-secret) Sanity identifiers. Fall back to
// the known values so a deploy never fails on missing env config; an env var still
// overrides for a different project/dataset.
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ksdjppy7'
