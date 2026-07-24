# Desktop Compaction v1

## Purpose

Compact the Daychanger Decks homepage so that the primary business message, service explanation, project imagery, and Request Quote action are visible within one 1440×900 desktop viewport without harming readability, accessibility, or the mobile experience.

## Baseline Reference

- **Baseline tag:** `daychanger-decks-design-baseline-v1`
- **Baseline commit:** `0e3ac3ca84fe851919c964fe30ab6372ec699eb0`
- **Baseline archive:** `design-archive/baseline-v1/`

## Files Changed

- `app/globals.css` — desktop media query only (`@media (min-width: 1024px)`)

No HTML, component, lead flow, API, or configuration files were changed.

## Layout Changes (desktop 1024px+ only)

| Rule | Before | After | Effect |
|---|---|---|---|
| `.hero-text` top padding | `4.5rem` (81px) | `2.25rem` (40.5px) | Removes 40.5px of empty air above headline |
| `.hero-text` bottom padding | `2.25rem` (40.5px) | `1.25rem` (22.5px) | Tightens gap between hero text and photos by 18px |
| `.before-after-container` bottom | `5rem` (90px) | `2.5rem` (45px) | Reduces excess padding below photos |
| `.page-section` padding | `5rem` (90px each side) | `3.5rem` (63px each side) | Reduces inter-section whitespace for better desktop density |

All changes are inside the existing `@media (min-width: 1024px)` block. The 640px breakpoint and base styles were not modified.

## Desktop Viewport Results

### 1440×900 (primary target)
- Identity: PASS — "Daychanger Decks" header visible
- Headline: PASS — "STEP OUT—NOT DOWN" visible without scrolling
- Service description: PASS — full description visible
- Request Quote button: PASS — button clearly visible
- Project imagery: PASS — both before/after photos fully visible within viewport
- No overlap: PASS
- No clipped text: PASS
- No horizontal scroll: PASS

### 1366×768
- Headline, description, button: PASS — all visible
- Photos: PARTIAL — photo tops visible; user scrolls ~100px to see full photos. Acceptable at this tight viewport.
- No overlap: PASS
- No horizontal scroll: PASS

### 1920×1080
- All hero content and photos: PASS — fully visible with next section visible below
- No overlap: PASS
- Well-proportioned layout: PASS

## Mobile Regression Result (390×844)

- Layout: PASS — no regression from baseline
- Before/after photos: PASS — stacked vertically as designed
- Buttons: PASS — large and tappable
- No horizontal scroll: PASS
- No overlap: PASS

## Page Height Measurements (at 1440×900)

| State | Page Height |
|---|---|
| Before (baseline) | 6480px |
| After (compaction) | 5837px |
| Reduction | 643px (≈10%) |

## Intentional Remaining Scrolling

All content below the hero section (The Back-Door Step Problem, Small Deck Projects, How It Works, Free On-Site Quote, From Shane, Where We Work, Request a Quote form, Common Questions, Final CTA, Footer) remains below the fold by design. These sections provide supporting information for visitors who want to learn more before requesting a quote. No content was removed.

## Lead Flow Verification

- Both "Request Quote" buttons (hero section and final CTA section) open the quote request flow
- The flow collects exactly: Name, Phone number, Project address
- No additional fields were added or removed
- Review step unchanged
- Submission behavior unchanged
- Email delivery configuration unchanged

## Build Result

- `npm run build`: PASS — compiled successfully, types valid, static pages generated
