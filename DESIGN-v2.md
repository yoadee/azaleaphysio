# Design v2 — Azalea Physiotherapy (Logo-Matched Blue & Gold)

An **experimental palette** for the `site-v2` branch. Same site, same typography, same layout and components as `mvp-rebuild` — only the color system changes. The goal: pull the identity directly from the existing logo (azure blue + amber gold) instead of the warm-stone + rose of v1.

Read alongside `DESIGN.md` (v1). Everything not in this file (type scale, spacing, layout, component shapes, motion) is **unchanged** from v1.

> Status: preview / not locked. Built to answer "how does the site look in the logo's colours?"

---

## 1. Where the colours come from

Sampled directly from `public/images/existing/logo.png` (dominant non-background colours):

| Logo element | Sampled hex | Role in palette |
|---|---|---|
| Figure + "AZALEA" wordmark | **#00AEFB** (azure), shading to #009FE1 → #0076A5 | source of the brand blue |
| Accent limb + "PHYSIOTHERAPY" | **#FDA000** (amber), with #FB9200 / #FEAC00 | source of the brand gold |

The raw logo azure (#00AEFB) is too light for white text or for body text on white, so the **usable** brand blue is a deepened version of the same hue. The gold is used close to source.

---

## 2. Colour tokens (the v2 system)

These map onto the **same token names** as v1 (`globals.css` `@theme`), so the whole site re-themes by value alone, with no component edits. Token names like `--color-rose` are retained from v1 for now; in v2 that slot simply holds the brand **blue** (the CTA colour). If v2 is adopted, rename later.

```css
@theme {
  /* ── Brand accents ── */
  --color-rose:       #00AEFB;  /* PRIMARY / all CTAs — TRUE logo azure (was rose) */
  --color-rose-dark:  #0094D6;  /* CTA hover (deeper azure) */
  --color-gold:       #FDA000;  /* logo amber — accents, stats, labels, rating stars */

  /* ── Light surfaces ── */
  --color-bg:         #FFFFFF;  /* page body */
  --color-stone:      #E9EEF3;  /* cool pale blue-grey panel (was warm stone #EDEAE6) */
  --color-border:     #D5DDE4;  /* cool borders + dividers */
  --color-text:       #0F2230;  /* deep blue-charcoal (was warm #1C1917) */
  --color-muted:      #4C5A65;  /* cool slate — secondary text */

  /* ── Dark sections ── */
  --color-dark:       #0E2231;  /* deep navy — trust strip, about, CTA (was warm near-black) */
  --color-dark-text:  #E8EEF3;  /* cool off-white on navy */
  --color-footer:     #0A1A26;  /* near-black navy */
}
```

Plus two non-token rules: (1) azure buttons get **dark navy text** (`color: var(--color-text)` on `a.bg-rose`/`button.bg-rose` in `globals.css`), because white on bright azure fails contrast; (2) the hardcoded divider/overlay `rgba(237,233,228, …)` becomes `rgba(232,238,242, …)` (cool) sitewide.

### Full reference

| Token | Hex | RGB | HSL | Notes |
|---|---|---|---|---|
| Brand azure (CTA) | `#00AEFB` | 0,174,251 | 198° 100% 49% | the true logo blue; buttons use dark navy text |
| Azure hover | `#0094D6` | 0,148,214 | 199° 100% 42% | |
| Gold | `#FDA000` | 253,160,0 | 38° 100% 50% | true logo amber — accents + emphasis |
| White | `#FFFFFF` | 255,255,255 | — | body |
| Stone (cool) | `#E9EEF3` | 233,238,243 | 210° 30% 93% | hero panel, cards |
| Border | `#D5DDE4` | 213,221,228 | 208° 22% 86% | |
| Text | `#0F2230` | 15,34,48 | 205° 52% 12% | |
| Muted | `#4C5A65` | 76,90,101 | 206° 14% 35% | |
| Dark | `#0E2231` | 14,34,49 | 206° 56% 12% | |
| Dark text | `#E8EEF3` | 232,238,243 | 210° 30% 93% | |
| Footer | `#0A1A26` | 10,26,38 | 206° 58% 9% | |

The neutrals all sit in the ~205° blue family, so white/grey/navy read as one cool family with the gold (~39°) as the complementary accent. Classic blue-and-amber.

---

## 3. Contrast (WCAG)

Same bar as v1: dark body copy passes AA; nothing washed out (per the project's crisp-type rule).

| Pairing | Ratio | Verdict |
|---|---|---|
| Text `#0F2230` on white | ~15.8:1 | AAA |
| Text `#0F2230` on stone `#E9EEF3` | ~13:1 | AAA |
| Muted `#4C5A65` on white | ~5.3:1 | AA (body) |
| Muted `#4C5A65` on stone | ~4.7:1 | AA (body) |
| Dark navy text `#0F2230` on azure button `#00AEFB` | ~6.7:1 | AA (button text) |
| Dark-text `#E8EEF3` on dark `#0E2231` | ~15:1 | AAA |
| Gold `#FDA000` on dark `#0E2231` | ~9:1 | AAA |

Focus ring uses the brand azure (`--color-rose`).

**Why dark text on the buttons:** the true logo azure (`#00AEFB`) is too light for white text (only ~2.5:1, fails). Using it faithfully means the button label is dark navy, which reads at ~6.7:1. The alternative (a darker blue with white text) was rejected because it no longer looks like the logo.

---

## 4. Usage hierarchy & rules

- **Neutrals dominate.** White body, cool-stone panels, navy dark sections. Colour is the exception, not the field.
- **Blue is for action.** Every booking CTA is bright azure (`--color-rose` slot), with dark navy text. Blue is *not* a background or section fill — same discipline rose had in v1 (buttons only).
- **Gold is the warm counter-note, used in two ways:** (1) **as text on dark** — trust-band labels, stat numbers, rating stars, dark-section eyebrows (high contrast on navy); (2) **as a thin graphic accent rule** (`bg-gold`, 3px) on light surfaces — under the hero headline and above the booking band — where gold *text* would fail contrast but a gold *line* reads fine. This is what makes gold feel present site-wide. Never gold body text on white.
- **Dark sections are navy**, giving the same rhythm as v1 but tying the darks to the brand hue.

### Allowed pairings
- Blue CTA on white, on cool-stone, and on navy.
- Gold on navy / dark only.
- Text/muted on white and on cool-stone.
- White / dark-text on navy.

### Forbidden pairings
- Gold text on white or stone (decorative single glyphs like a ★ excepted).
- Raw logo azure `#00AEFB` as button fill with white text (too light — use `#0A6EB4`).
- Blue as a large background fill or section band (keep it to interactive elements).
- Navy text on navy, or stone on white for type (insufficient contrast).

---

## 5. Dos & don'ts

**Do**
- Keep blue strictly on buttons / interactive affordances and the focus ring.
- Let the cool-stone panels and navy sections carry the brand feel; the photography still does the heavy lifting.
- Use gold sparingly as the warm counter-note against the cool field.

**Don't**
- Don't recolour the logo. The logo art stays as-is (it already is the blue + gold source).
- Don't add a third accent. Blue + gold + neutrals only.
- Don't introduce gradients, glassmorphism, or border-radius — all the v1 "what's locked" rules still apply.
- Don't tint the photography to match. Images stay natural.

---

## 6. What changed vs v1, in one line

`warm stone → cool blue-grey` · `warm near-black → deep navy` · `rose CTA → logo-azure CTA` · `antique gold → logo amber`. Typography, layout, spacing, motion, and component shapes are identical to `DESIGN.md`.
