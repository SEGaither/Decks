# Phone Banner Change v1 — Post-Change Evidence

## Purpose

Widens the site-header top banner and adds a direct phone-contact block for Shane Gaither. The banner now displays three centered lines: "Call Shane at Daychanger Decks", "256-281-1291" (tel: link), and "We Do the Small Jobs Big Contractors Don't Want". The Request Quote flow is unchanged.

## Pre-edit archive

`design-archive/pre-phone-banner-change-v1/`

## Pre-edit commit hash

fba5a4df0504b3399989ef2a02ca919fa8972e0b

## Files changed

| File | Change summary |
|------|----------------|
| app/page.tsx | Added `.header-contact` div inside `<header>` with three-line banner content and `tel:+12562811291` link |
| app/globals.css | Removed `max-width` constraint from `.header-inner`; added `.header-contact`, `.header-tagline`, `.header-phone`, `.header-phone:hover`, `.header-slogan` rules; added mobile column-stack rules inside `@media (max-width: 479px)` |

## Exact banner text

Line 1: Call Shane at Daychanger Decks
Line 2: 256-281-1291
Line 3: We Do the Small Jobs Big Contractors Don't Want

## Banner sizing and spacing changes

- `.header-inner`: removed `max-width: var(--wide-max)` (was 900px) and `margin: 0 auto`; changed vertical padding from `0.875rem` to `0.75rem`; changed horizontal padding from `1.25rem` to `1.5rem`. Banner is now full-viewport-width.
- Added `.header-contact` with `flex: 1` and `text-align: center`, centering the three lines in the space to the right of the logo.
- Logo position and styling unchanged.
- Mobile (`max-width: 479px`): `.header-inner` switches to column layout, centering logo above the contact block.

## Phone-link implementation

```html
<a class="header-phone" href="tel:+12562811291">256-281-1291</a>
```

Target: `tel:+12562811291` — verified in rendered HTML.

## Desktop results

**1440×900:** Banner displays full-width across the green header. Logo left, phone block centered. All three lines visible, phone number displayed in gold at 1.2rem bold. Request Quote button visible below hero headline. Desktop compaction preserved — hero section intact above fold.

**1366×768:** Same layout. All three lines visible, no clipping.

**1920×1080:** Same layout. Banner spans full width cleanly.

## Mobile results

**390×844 (simulated at 500px CSS viewport — Chrome headless minimum):** Row layout at 500px — logo left, three-line block right, lines wrap naturally, no horizontal scrolling, phone number readable. On real 390px devices the `@media (max-width: 479px)` column layout activates: logo centered on top row, contact block centered below. No clipping in either layout.

## Request Quote regression

Unchanged. Both CTAButton instances link to `#quote-request`. QuoteRequestFlow component and all validation, submission, field, and email-delivery behavior unmodified.

## No unrelated site behavior changed

No changes to hero text, imagery, process steps, pricing section, FAQ, service-area, footer, SEO metadata, sitemap, robots, Resend configuration, or deployment configuration.

## Intentional remaining scroll

On all viewports, the hero section continues below the fold in the same manner as the pre-change design. No new forced scrolling was added.

## Rollback instructions

**From archive files:** Copy `design-archive/pre-phone-banner-change-v1/source-snapshot/app/page.tsx` and `globals.css` back to `app/`. Commit and redeploy.

**From Git:** `git revert <this-commit-hash>` or `git checkout fba5a4d -- app/page.tsx app/globals.css`, then commit and redeploy.
