import Script from 'next/script'
import AnalyticsEvents from './AnalyticsEvents'

/**
 * GA4 + (optional) Google Ads loader. Renders nothing unless NEXT_PUBLIC_GA_ID
 * is set, so it is a safe no-op until a measurement ID exists. Loaded
 * `afterInteractive` so it never blocks first paint (performance requirement).
 *
 * - NEXT_PUBLIC_GA_ID:        GA4 measurement ID (e.g. G-XXXXXXXXXX). Required.
 * - NEXT_PUBLIC_GADS_ID:      Google Ads conversion ID (e.g. AW-XXXXXXXXXX).
 *                             Optional; add once the Ads account + conversion
 *                             action exist on the production domain.
 *
 * gtag sends the initial pageview itself (reliable — no dependency on React
 * having mounted). <AnalyticsEvents/> only sends pageviews for App Router
 * client-side navigations, which gtag does not detect on its own; it skips the
 * first render so the initial load is not double-counted.
 *
 * Vercel Analytics can also be toggled on in the Vercel dashboard for this
 * project if you want it alongside GA4.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const adsId = process.env.NEXT_PUBLIC_GADS_ID
  if (!gaId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
          ${adsId ? `gtag('config', '${adsId}');` : ''}
        `}
      </Script>
      <AnalyticsEvents />
    </>
  )
}
