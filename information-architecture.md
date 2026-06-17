# Information Architecture — Azalea Physiotherapy

## Audience & Mental Models

Patients don't think in service names — they think in problems. "My knee hurts after skiing." "I need to recover from surgery." "My elderly mother needs regular care." The IA must bridge from their language (conditions, problems) to the clinic's language (services, practitioners).

Key audience questions in order of priority:
1. Can this clinic fix my specific problem?
2. Are these practitioners qualified and trustworthy?
3. Is it convenient (location, hours)?
4. Is it covered by my insurance?
5. How do I book?

Every page answers at least one of these questions. The CTA closes every page.

---

## Sitemap

```
/ (Home)
│
├── /services
│   ├── /services/physiotherapy
│   ├── /services/sports-injury
│   ├── /services/acupuncture
│   ├── /services/weight-loss
│   ├── /services/occupational-therapy
│   ├── /services/kinesiology
│   ├── /services/osteopathy
│   ├── /services/chiropractic
│   ├── /services/yoga
│   └── /services/elderly-care
│
├── /team
│   └── /team/[slug] × 12 practitioners
│
├── /locations
│   ├── /locations/16th-street
│   └── /locations/ocean-walk
│
├── /about
├── /book
├── /insurance
│
├── /blog
│   └── /blog/[slug]
│
├── /careers
└── /privacy
```

**Pattern:** Hub-and-spoke for services and team. Flat for utility pages. All key pages reachable in 1–2 clicks from home.

---

## URL Structure

| Content type | Pattern | Example |
|---|---|---|
| Home | `/` | — |
| Services index | `/services` | — |
| Service detail | `/services/[slug]` | `/services/physiotherapy` |
| Team index | `/team` | — |
| Team member | `/team/[slug]` | `/team/mary-ghoroghi` |
| Location index | `/locations` | — |
| Location detail | `/locations/[slug]` | `/locations/16th-street` |
| Blog index | `/blog` | — |
| Blog post | `/blog/[slug]` | `/blog/what-to-expect-physio` |
| Static pages | `/[slug]` | `/about`, `/insurance`, `/book` |

**Rules:** lowercase, hyphen-separated, no dates, no trailing slashes, stable (no changes without redirects).

---

## Navigation

### Primary Navigation (desktop — left to right)
```
[Logo]   Services   Team   Locations   About   Insurance        [Book an Appointment →]
```

- 5 items + CTA button (dusty rose, always visible)
- "Book an Appointment" is a button, not a link — visually distinct
- Sticky on scroll — nav stays at top as user scrolls down

### Services Dropdown (on hover/click)
```
Services ▾
─────────────────────────────────────
Physiotherapy          Occupational Therapy
Sports Injury          Kinesiology
Acupuncture            Osteopathy
Weight Loss            Chiropractic
                       Yoga
                       Elderly Care
─────────────────────────────────────
→ View all services
```

### Mobile Navigation
- Hamburger menu (top right)
- Full-screen overlay
- Services expand in-place (accordion)
- "Book an Appointment" pinned to bottom of overlay
- Click-to-call phone numbers for both locations

### Breadcrumbs (all non-home pages)
```
Home > Services > Physiotherapy
Home > Team > Mary Ghoroghi
Home > Locations > 16th Street
```
Marked up with BreadcrumbList schema.

### Footer Navigation
```
[Logo + tagline: "For a healthier, longer life"]

Services                Team                    Visit Us
───────────             ────────                ──────────
Physiotherapy           Meet the Team           16th Street Clinic
Sports Injury           [All 12 names]          Ocean Walk Clinic
Acupuncture                                     Hours & Directions
Weight Loss             Company                 Insurance & Billing
Occupational Therapy    About Us                
Kinesiology             Blog                    Contact
Osteopathy              Careers                 (604) 281-3345
Chiropractic            Privacy Policy          (604) 281-3122
Yoga                                            info@azaleaphysio.com
Elderly Care            

© 2025 Azalea Physiotherapy. All rights reserved.
```

---

## Wireframes

### Homepage
```
┌─────────────────────────────────────────────────────────┐
│ STICKY NAV                                              │
│ [Logo]  Services  Team  Locations  About  Insurance     │
│                                    [Book an Appointment]│
├─────────────────────────────────────────────────────────┤
│ HERO                                                    │
│                                                         │
│  Expert care for every                                  │  ← Cormorant Garamond 60px
│  stage of your recovery.                                │
│                                                         │
│  West Vancouver's multi-disciplinary wellness clinic.   │  ← DM Sans 20px
│  Two locations. Direct billing. 14 years of expertise.  │
│                                                         │
│  [Book an Appointment]   [View Services]                │  ← CTA pair
│                                                         │
│                          [Clinic hero image]            │
├─────────────────────────────────────────────────────────┤
│ TRUST BAR                                               │
│  ✦ Direct Billing  ✦ 12 Practitioners  ✦ 2 Locations   │
│  ✦ 14+ Years       ✦ 10 Services       ✦ Insurance      │
├─────────────────────────────────────────────────────────┤
│ SERVICES                                                │
│  "Comprehensive care under one roof"                    │
│                                                         │
│  [Physio]  [Sports]  [Acupuncture]  [Weight Loss]       │
│  [OT]      [Kinesio] [Osteopathy]   [Chiropractic]      │
│  [Yoga]    [Elderly Care]                               │
│                                                         │
│                         → View all services             │
├─────────────────────────────────────────────────────────┤
│ WHY AZALEA (warm cream background)                      │
│                                                         │
│  [Direct Billing]   [Multilingual]   [2 Locations]      │
│  We bill directly   Persian, English  16th St + Ocean   │
│  to your insurer.   and more.        Walk clinics.      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ TEAM PREVIEW                                            │
│  "Meet your care team"                                  │
│                                                         │
│  [Photo] Mary G.   [Photo] Braedan L.                   │
│  Physiotherapist   Physiotherapist                      │
│                                                         │
│  [Photo] Ramin K.  [Photo] Mehdi T.                     │
│  Acupuncturist     Osteopath                            │
│                                                         │
│                         → Meet the full team            │
├─────────────────────────────────────────────────────────┤
│ TESTIMONIALS (warm cream background)                    │
│                                                         │
│  "Mary is exceptional..."   "The team at Azalea..."     │
│  — Patient name, Service    — Patient name, Service     │
│                                                         │
│              "I've been going for years..."             │
│              — Patient name, Service                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ LOCATIONS                                               │
│                                                         │
│  16th Street Clinic      │  Ocean Walk Clinic           │
│  585 16th St, W Van      │  1884 Marine Dr, W Van       │
│  (604) 281-3345          │  (604) 281-3122              │
│  Mon–Fri 8am–7pm         │  Mon–Fri 8:30am–7pm          │
│  Sat 9am–3pm             │  Sat 9am–3pm                 │
│  [Map]                   │  [Map]                       │
│  [Get Directions]        │  [Get Directions]            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ BLOG PREVIEW                                            │
│  "From the clinic"                                      │
│                                                         │
│  [Post 1]  [Post 2]  [Post 3]                           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ FINAL CTA (dusty rose background)                       │
│                                                         │
│   Ready to start your recovery?                         │
│                                                         │
│   [Book at 16th Street]  [Book at Ocean Walk]           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

---

### Service Page Template
```
┌─────────────────────────────────────────────────────────┐
│ NAV (sticky)                                            │
├─────────────────────────────────────────────────────────┤
│ BREADCRUMB: Home > Services > Physiotherapy             │
├─────────────────────────────────────────────────────────┤
│ SERVICE HERO                                            │
│                                                         │
│  Physiotherapy                           [Service image]│  ← H1
│  West Vancouver                                         │
│                                                         │
│  Expert physiotherapy for pain, injury,                 │
│  and post-surgical recovery. Two clinic                 │
│  locations with direct insurance billing.               │
│                                                         │
│  [Book an Appointment]                                  │
├─────────────────────────────────────────────────────────┤
│ WHAT IS IT                                              │
│  "What is physiotherapy?"               [Support image] │  ← H2 (AEO)
│  2–3 paragraphs of clear, factual copy                 │
├─────────────────────────────────────────────────────────┤
│ CONDITIONS TREATED                                      │
│  "Conditions we treat"                                  │
│  • Back pain    • Knee injuries    • Post-surgery       │
│  • Neck pain    • Shoulder pain    • Sports injuries    │
│  • Arthritis    • Headaches        • [+ more]           │
├─────────────────────────────────────────────────────────┤
│ WHAT TO EXPECT (warm cream bg)                          │
│  "What to expect at your first appointment"             │
│  1. Assessment   2. Treatment plan   3. Hands-on care   │
│  4. Home exercises   5. Follow-up                       │
├─────────────────────────────────────────────────────────┤
│ FAQ (AEO/GEO — FAQPage schema)                         │
│  "Frequently asked questions"                           │
│  Q: How much does physiotherapy cost in West Vancouver? │
│  A: ...                                                 │
│  Q: Is physiotherapy covered by insurance in BC?        │
│  A: ...                                                 │
│  Q: How long is a physiotherapy session?                │
│  A: ...                                                 │
│  Q: How many sessions will I need?                      │
│  A: ...                                                 │
├─────────────────────────────────────────────────────────┤
│ OUR PHYSIOTHERAPISTS                                    │
│  [Mary G.]  [Braedan L.]  [Noushin N.]  [Ali S.]        │
├─────────────────────────────────────────────────────────┤
│ TESTIMONIALS                                            │
│  2–3 quotes from patients who received this service     │
├─────────────────────────────────────────────────────────┤
│ CTA                                                     │
│  [Book a Physiotherapy Appointment]                     │
├─────────────────────────────────────────────────────────┤
│ RELATED SERVICES                                        │
│  [Sports Injury]  [Kinesiology]  [Osteopathy]           │
├─────────────────────────────────────────────────────────┤
│ FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

---

### Team Member Page Template
```
┌─────────────────────────────────────────────────────────┐
│ NAV (sticky)                                            │
├─────────────────────────────────────────────────────────┤
│ BREADCRUMB: Home > Team > Mary Ghoroghi                 │
├─────────────────────────────────────────────────────────┤
│ PRACTITIONER HERO                                       │
│                                                         │
│  [Large editorial photo]   Mary Ghoroghi                │  ← H1
│                            Registered Physiotherapist   │
│                            MPT, CMA, MCPA               │
│                            14+ Years Experience         │
│                                                         │
│                            [Book with Mary →]           │
├─────────────────────────────────────────────────────────┤
│ ABOUT                                                   │
│  Bio — 2–3 paragraphs (Companion tone, first person or │
│  third person — consistent across all bios)             │
│                                                         │
│  Education & Certifications (list)                      │
├─────────────────────────────────────────────────────────┤
│ SPECIALTIES                                             │
│  • Musculoskeletal rehabilitation                       │
│  • Post-surgical recovery                               │
│  • Sports injuries    [etc.]                            │
├─────────────────────────────────────────────────────────┤
│ SERVICES OFFERED                                        │
│  [Physio card]  [Sports Injury card]                    │
├─────────────────────────────────────────────────────────┤
│ LOCATION & AVAILABILITY                                 │
│  16th Street Clinic — Mon, Wed, Fri                     │
│  Ocean Walk Clinic — Tue, Thu                           │
├─────────────────────────────────────────────────────────┤
│ PATIENT TESTIMONIALS                                    │
│  2–3 quotes that mention this practitioner by name      │
├─────────────────────────────────────────────────────────┤
│ CTA                                                     │
│  [Book an Appointment with Mary]                        │
├─────────────────────────────────────────────────────────┤
│ FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

---

### Locations Page
```
┌─────────────────────────────────────────────────────────┐
│ NAV (sticky)                                            │
├─────────────────────────────────────────────────────────┤
│ HERO                                                    │
│  "Two clinics in West Vancouver"                        │  ← H1 (local SEO)
│  Serving the North Shore community since 2011.          │
├─────────────────────────────────────────────────────────┤
│ LOCATION CARDS (two column)                             │
│                                                         │
│  16th Street Clinic      │  Ocean Walk Clinic           │
│  ─────────────────        ─────────────────             │
│  #207-585 16th St         1884 Marine Drive             │
│  West Vancouver, BC       West Vancouver, BC            │
│  V7V 3R8                  V6B 5C6                       │
│                                                         │
│  📞 (604) 281-3345        📞 (604) 281-3122             │
│  📠 (604) 281-3346        📠 (604) 281-3123             │
│                                                         │
│  Mon–Fri: 8:00am–7:00pm   Mon–Fri: 8:30am–7:00pm       │
│  Saturday: 9:00am–3:00pm  Saturday: 9:00am–3:00pm      │
│  Sunday: Closed           Sunday: Closed                │
│                                                         │
│  [Google Map embed]       [Google Map embed]            │
│                                                         │
│  [Get Directions]         [Get Directions]              │
│  [Book Here →]            [Book Here →]                 │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ GETTING HERE                                            │
│  Parking notes, transit, accessibility info             │
│  (one section per clinic)                               │
├─────────────────────────────────────────────────────────┤
│ CONTACT US                                              │
│  info@azaleaphysio.com                                  │
│  Simple contact form (name, email, message, location)   │
├─────────────────────────────────────────────────────────┤
│ CTA                                                     │
│  [Book at 16th Street]   [Book at Ocean Walk]           │
├─────────────────────────────────────────────────────────┤
│ FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

---

## Taxonomy

### Service Categories (controlled — 10 items, fixed)
Physiotherapy · Sports Injury · Acupuncture · Weight Loss · Occupational Therapy · Kinesiology · Osteopathy · Chiropractic · Yoga · Elderly Care

### Blog Categories (controlled — 6 items)
Injury & Recovery · Exercise & Movement · Pain Management · Nutrition & Wellness · Clinic News · Patient Stories

### Blog Tags (open, governed — add only when 3+ posts would use the tag)
Examples: back-pain, knee-injury, west-vancouver, sports-rehabilitation, insurance, direct-billing, acupuncture-benefits, elderly-care, yoga-therapy

### Practitioner Specialties (used on team profiles)
Musculoskeletal · Sports Rehabilitation · Post-Surgical · Neurological · Pediatric · Geriatric · Women's Health · Pain Management · Mental Health

---

## Implementation Notes

- Services dropdown in nav renders from Sanity `service` schema — adding a service automatically adds it to the nav
- Team member slugs are auto-generated from name in Sanity (`mary-ghoroghi`)
- Breadcrumbs rendered via Next.js App Router segment config + BreadcrumbList JSON-LD
- Location phone numbers rendered as `<a href="tel:+16042813345">` for click-to-call on mobile
- All maps use Google Maps embed API (no key required for basic embeds)
- Blog category and tag pages generate via `generateStaticParams` in Next.js
