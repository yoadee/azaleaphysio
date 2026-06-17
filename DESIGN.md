# Design — Azalea Physiotherapy

Visual system for the azaleaphysio.com rebuild. Read alongside PRODUCT.md and HANDOFF.md.

---

## Direction

**Palette B — Warm Stone + Restrained Rose.**

Warm stone left, white body, dark sections for rhythm. Rose appears only on interactive elements (buttons). Never as a background, never as a section fill. The warmth comes from the stone surface and the clinic photography — not from the palette screaming.

Approved wireframe: `public/wireframe-b.html`

---

## Color Tokens

```css
/* Brand */
--rose:       #C97B8A;   /* restrained accent — buttons only */
--rose-dark:  #A05A6A;   /* rose hover state */
--gold:       #C4973A;   /* data points and citations in dark sections */

/* Light surfaces */
--bg:         #FFFFFF;   /* page body, white sections */
--stone:      #EDEAE6;   /* hero panel, team section bg, location cards */
--border:     #DDD9D4;   /* all borders and dividers */
--text:       #1C1917;   /* primary text */
--muted:      #706B66;   /* secondary text, metadata */

/* Dark sections */
--dark:       #1C1917;   /* trust strip, about, testimonial, final CTA */
--dark-text:  #EDE9E4;   /* body text on dark */
--footer:     #131110;   /* footer only */
```

**Rose discipline:** Rose (#C97B8A) appears on exactly 4 elements per page — nav CTA, hero primary button, each location "Book Here" button. That's it. Any new rose use needs a reason.

---

## Typography

### Fonts

```html
<!-- In <head> -->
<link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

- **Spectral** (Google Fonts) — display/headline. Use weight 300, italic variant for hero and section h2. Weight 400 for names, citations.
- **Satoshi** (Fontshare) — all UI text, body copy, labels, navigation.

### Scale

| Role | Size | Weight | Style | Font |
|---|---|---|---|---|
| Hero h1 | `clamp(60px, 7vw, 104px)` | 300 | italic | Spectral |
| Section h2 | `clamp(34px, 3.6vw, 54px)` | 300 | italic or normal | Spectral |
| Service name | `clamp(22px, 2.4vw, 36px)` | 300 | normal | Spectral |
| Team name | 19px | 400 | normal | Spectral |
| Testimonial | `clamp(26px, 3vw, 46px)` | 300 | italic | Spectral |
| Location h3 | 26px | 400 | normal | Spectral |
| Body copy | 15px | 400 | — | Satoshi |
| UI label | 11px | 500 | uppercase, ls 0.1em | Satoshi |
| Footer col label | 9px | 700 | uppercase, ls 0.2em | Satoshi |
| Stat number (dark) | 32–52px | 300 | — | Spectral |

**Letter-spacing:** `-0.02em` to `-0.025em` on all display headings. Never positive tracking on large Spectral.  
**Line-height:** `0.96` on hero h1 (tight, intentional). `1.1–1.15` on section h2. `1.9` on body copy.  
**text-wrap: balance** on all h1–h3.

---

## Layout

### Hero (home page)

```
grid-template-columns: 60% 40%
min-height: 100vh
```

- Left (60%): warm stone `#EDEAE6`. Nav is `position: absolute` over it. Location tag → h1 → CTAs → stats bar at bottom.
- Right (40%): clinic photography, `background-size: cover`. Subtle gradient seam on the left edge so the panels breathe together.

### Section rhythm

| Section | Background | Notes |
|---|---|---|
| Nav | absolute over hero | dark text on stone |
| Hero | `--stone` left / photo right | |
| Trust strip | `--dark` | slim, 20px padding |
| Services | `--bg` white | editorial index, sticky intro |
| About | `--dark` | 40/60 grid, photo left |
| Team | `--stone` | photos land naturally on warm surface |
| Testimonial | `--dark` | centered, large italic quote |
| Locations | `--bg` white | stone cards |
| Final CTA | `--dark` | |
| Footer | `#131110` | |

### Services section

Editorial index — not a card grid.

```
grid-template-columns: 300px 1fr
gap: 96px
```

Left column: sticky intro text. Right column: vertical list of 10 services, each a full-width row with number + name + metadata. Hover: `padding-left: 10px` slide + name color → rose.

### Team section

4-column portrait grid on stone surface. `gap: 3px`. Cards `aspect-ratio: 3/4`. Photo desaturated slightly (`filter: saturate(0.75)`). Dark gradient overlay fading up from bottom. Name in Spectral 19px over overlay.

---

## Components

### Buttons

```css
/* Primary — rose, used for all booking CTAs */
.btn-rose { background: #C97B8A; color: white; padding: 15px 40px; }
.btn-rose:hover { background: #A05A6A; }

/* Ghost on stone/light backgrounds */
.btn-outline-dark {
  border: 1.5px solid rgba(28,25,23,0.22);
  color: rgba(28,25,23,0.6);
  padding: 14px 32px;
}

/* Ghost on dark backgrounds */
.btn-ghost-dim {
  border: 1.5px solid rgba(237,233,228,0.14);
  color: rgba(237,233,228,0.38);
  padding: 15px 44px;
}
```

All buttons: `font-size: 11–12px`, `font-weight: 700`, `letter-spacing: 0.1em`, `text-transform: uppercase`, Satoshi.  
No border-radius on any button. Square corners throughout.

### Trust strip

Dark background, 4 items flex-justified. Gold (`#C4973A`) for the value label. No icons.

### Stats (dark sections)

Spectral 300 at 32–52px in white or gold. Label: 10px Satoshi 700 uppercase. Separated by `1px solid rgba(237,233,228,0.08)` verticals.

### Location cards

Stone `#EDEAE6` surface, 1px border `#DDD9D4`. 52px padding. Map placeholder `height: 170px`. CTA row: rose primary + outline secondary.

---

## Spacing

- Section vertical padding: `100–140px` top and bottom.
- Max content width: `1200px`, centered.
- Horizontal page padding: `56px` left/right.
- Grid gaps vary — `96px` for 2-column editorial, `28–32px` for location cards, `3px` for team grid (intentional tight bleed).

---

## Imagery

### What exists

`public/images/existing/` — 10 team headshots only. Light backgrounds, professional portraits. Suitable for team grid section. Not suitable as hero imagery.

### Generated

`public/images/generated/clinic-hero.jpg` — AI-generated treatment room (Higgsfield / nano_banana_pro). Pacific Northwest clinic interior: white treatment table, floor-to-ceiling wooden-framed windows, water and forest view, fiddle leaf fig, warm natural light. 848×1264px.

**Used in:** hero right panel.

### Still needed

- Professional clinic photography: treatment rooms, reception area, exterior of both locations. Required before launch for the about section and any interior-forward pages.
- The about section currently uses Mary's headshot desaturated as a placeholder — replace with a real clinic interior shot.

---

## What's locked

- Palette B: warm stone + restrained rose ✓
- Spectral + Satoshi font pair ✓
- Hero 60/40 layout with clinic image ✓
- Services as editorial index (not card grid) ✓
- Rose on buttons only ✓
- Section order and rhythm ✓
- No border-radius anywhere ✓
- No gradient text, no glassmorphism, no eyebrow labels on every section ✓

## What's open

- Booking system integration (Jane App assumed — confirm with client)
- Insurance providers list (needed for Insurance page)
- Farsi version (design RTL-ready from the start — use logical CSS properties)
- Blog layout (not in wireframe yet)
- Mobile/responsive breakpoints (wireframe is desktop-only)
- Actual clinic photography shoot

---

## Build order (suggested)

1. Tailwind config — translate CSS variables to Tailwind tokens
2. `globals.css` — font imports, base resets, token definitions
3. Global layout — `<Nav>` and `<Footer>` components
4. Home page — section by section following wireframe-b.html
5. Sanity schemas — services, team members, testimonials, locations, blog posts
6. Services index + detail pages
7. Team index + bio pages
8. Locations page
9. About page
10. Insurance/billing page
11. Blog index + post layout
12. Book / confirmation pages
13. Careers + Privacy (static)
