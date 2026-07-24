# Phone Banner Typography v2 — Evidence Archive

## Purpose

Increased the desktop font size of both the left-side Daychanger Decks business
name and the centered three-line contact message to make each as large as
practical while preserving the above-the-fold composition at 1440×900.

Switched the desktop header layout from flex to CSS grid
(`grid-template-columns: 1fr auto 1fr`) so the contact block achieves true
visual centering across the full banner width, not merely within the leftover
space to the right of the logo.

## Starting Commit

91ac275 — Add direct-call banner to Daychanger Decks homepage

## Rollback References

- Git: `git checkout 91ac275 -- app/globals.css`
- Pre-phone-banner archive: `design-archive/pre-phone-banner-change-v1/`
- Post-phone-banner baseline: `design-archive/phone-banner-change-v1/`

## Files Changed

- `app/globals.css` — Added enlarged header typography rules and CSS grid
  layout to the existing `@media (min-width: 1024px)` block; reduced
  `.hero-text` top padding at desktop to offset banner height gain.

## Previous vs Final Values

### Daychanger Decks business name (left)
| Measurement | Before | After (desktop ≥1024px) |
|---|---|---|
| font-size | 1.075rem | 1.7rem |
| logo-mark | 30px | 40px |

### Centered contact block
| Line | Before | After (desktop ≥1024px) |
|---|---|---|
| header-tagline | 0.8rem | 1.05rem |
| header-phone | 1.2rem | 1.65rem |
| header-slogan | 0.75rem | 0.9rem |

Mobile values are unchanged (base CSS not modified).

### Header height (estimated at 1440px viewport, 16px root)
| | Before | After |
|---|---|---|
| Header inner content height | ~66px | ~84px |
| Header vertical padding | 24px (0.75rem × 2) | 24px (unchanged) |
| Total header height | ~90px | ~108px |

### Gap below banner (hero-text top padding, desktop ≥1024px)
| | Before | After |
|---|---|---|
| padding-top | 2.25rem (36px) | 1.25rem (20px) |

Net above-fold change: banner +18px, hero gap −16px → approximately neutral.

### Hero vertical position at 1440×900
STEP OUT—NOT DOWN begins at approximately the same vertical position as before.
No material increase in initial-page scrolling introduced.

## Desktop Validation

### 1366×768
- PASS
- Daychanger Decks name substantially larger ✓
- Phone number is strongest contact line ✓
- Contact block visually centered ✓
- Hero heading, service description, Request Quote, service-area text, and
  both before/after project images all visible above the fold ✓
- No overlap, no clipping, no horizontal scroll, no inappropriate wrapping ✓

### 1440×900
- PASS
- Same as above ✓
- Both project images substantially visible at bottom of initial viewport ✓

### 1920×1080
- PASS
- Full before/after images with labels (BEFORE / AFTER) visible in initial
  viewport ✓
- Ample above-the-fold composition maintained ✓

## Mobile Validation (390×844)

- PASS
- Existing stacked layout preserved ✓
- All banner text readable ✓
- Phone link tappable ✓
- No excessive header height ✓
- No horizontal scroll ✓
- Hero content visible without excessive scrolling ✓
- No regressions introduced ✓

## Phone-Link Verification

href="tel:+12562811291" — confirmed unchanged in app/page.tsx ✓

## Request Quote Regression

QuoteRequestFlow component is unchanged. Both Request Quote buttons (hero and
final CTA section) open the approved quote flow requesting only name, phone
number, and project address. No behavior changes.

## Build and Test Result

`npm run build` — PASS (0 errors, 0 type errors, all pages statically generated)

## Screenshot Archive

```
phone-banner-typography-v2/
  desktop-1366x768-viewport.png
  desktop-1440x900-viewport.png
  desktop-1440x900-full.png
  desktop-1920x1080-viewport.png
  mobile-390x844-viewport.png
  mobile-390x844-full.png
  README.md
```

## Maximum Practical Font-Size Limitation

At 1.7rem for the business name and 1.65rem for the phone number, further
enlargement would begin to increase the banner height enough to push the
before/after images closer to or below the initial viewport fold at 1366×768.
These values represent the practical maximum under the above-the-fold
constraint.

## Rollback Instructions

**Using Git:**
```bash
git checkout 91ac275 -- app/globals.css
npm run build
```

**Using archive:**
Copy `design-archive/phone-banner-change-v1/source-snapshot/app/globals.css`
back to `app/globals.css`.
