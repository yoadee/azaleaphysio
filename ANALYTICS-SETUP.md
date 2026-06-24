# Analytics setup — Azalea Physiotherapy

The code is fully wired. Nothing fires until `NEXT_PUBLIC_GA_ID` is set, so this is a safe no-op until you create the GA4 property. Do the GA4 steps now (you can verify on the Vercel preview); do the Google Ads steps after the site is on the production domain.

## What's already wired in code

- **`src/components/Analytics.tsx`** — loads gtag.js after first paint, configures GA4 with `anonymize_ip` and `send_page_view: false`, and (optionally) Google Ads if `NEXT_PUBLIC_GADS_ID` is set. Renders nothing without a GA ID.
- **`src/components/AnalyticsEvents.tsx`** — sends a `page_view` on first load and on every client-side route change, and runs one sitewide click listener that fires:
  - **`booking_start`** — any click on a Jane App booking link (nav, hero, BookCta band, footer, blog inline — all of them).
  - **`phone_tap`** — any click on a `tel:` link.
- **`src/lib/analytics.ts`** — the `track()` helper. In dev it logs events to the console so you can confirm the wiring before GA is live.

## Step 1 — Create the GA4 property (do now)

1. analytics.google.com → Admin → Create Property → "Azalea Physiotherapy".
2. Create a **Web** data stream for `https://www.azaleaphysio.com`.
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`).

## Step 2 — Add the env var in Vercel (do now)

In Vercel → project `azaleaphysio` → Settings → Environment Variables:

- Name: `NEXT_PUBLIC_GA_ID`
- Value: `G-XXXXXXXXXX`
- Environments: Production + Preview (add Preview too so you can test before launch).

Redeploy (or it applies on the next push). For local testing, uncomment the line in `.env.local`.

## Step 3 — Mark conversions in GA4 (do now)

GA4 → Admin → Events. After the events have fired at least once (click a booking button on the preview), toggle these as **Key events (conversions)**:

- `booking_start`
- `phone_tap`

> `booking_start` = intent to book (click-through to the portal). True booking completion happens inside Jane App, which we don't control — so `booking_start` is the conversion we optimize Ads against. If Jane App ever exposes a thank-you URL or callback, we can add a `booking_complete` event then.

## Step 4 — Verify

On the preview (or prod), open the site with GA4 DebugView or the Realtime report. Click a "Book online" button and a phone number — you should see `page_view`, `booking_start`, and `phone_tap` land. In local dev they print to the browser console.

## Step 5 — Google Ads (do AFTER production launch)

Only meaningful once ads can point at the live domain.

1. Create the Google Ads account; link it to the GA4 property (GA4 Admin → Google Ads Links).
2. Import `booking_start` (and `phone_tap`) from GA4 as **conversion actions** in Google Ads. This is the cleanest path — no extra tags needed.
3. (Optional) If you want Google Ads' own tag too, create the conversion ID (`AW-XXXXXXXXXX`), set `NEXT_PUBLIC_GADS_ID` in Vercel, and add a `gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXXX/label' })` call — tell me and I'll wire the specific conversion label into the click handler.
4. Verify Search Console on the production domain while you're there (separate from GA, needed for organic).

**Do not start ad spend until Step 4 passes on production** — confirming the conversion fires is prerequisite #1 in MARKETING-STRATEGY.md.
