import Script from 'next/script'

/**
 * GA4 loader. Renders nothing unless NEXT_PUBLIC_GA_ID is set, so it is a safe
 * placeholder until a measurement ID exists. Loaded `afterInteractive` so it
 * never blocks first paint (performance requirement).
 *
 * Vercel Analytics can be toggled on in the Vercel dashboard for this project;
 * if you prefer the package, add `@vercel/analytics` and render <Analytics/>.
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (!id) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
