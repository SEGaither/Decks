# Desktop Homepage Compaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compact the Daychanger Decks homepage hero section so the headline, service description, Request Quote button, and before/after project images are all visible within a 1440×900 desktop viewport without scrolling.

**Architecture:** All changes are desktop-only CSS within the existing `@media (min-width: 1024px)` block in `app/globals.css`. No structural HTML changes. No new breakpoints. No mobile impact.

**Tech Stack:** Next.js 14, CSS (no Tailwind), Vercel deployment

---

## Measured Layout at 1440×900 (baseline)

```
Header (sticky):          ~58px
hero-text top padding:    4.5rem × 18px root = 81px   ← primary culprit
h1 "STEP OUT—NOT DOWN":   ~135px (2 lines at 3.1rem, line-height 1.05)
hero-description:         ~122px (3 lines at 1.1rem, line-height 1.6)
cta-primary button:       ~100px (min-height 60px + margins)
cta-reassurance + area:   ~58px
hero-text bottom padding: 2.25rem × 18px = 40.5px
────────────────────────────────
Total above photos:       ~594px
Viewport remaining:        306px
Before/after photo height: ~295px (4/3 ratio, ~392px wide in 900px container)

Result: photos cut off — only ~11px visible below fold
```

## Target After Changes

```
hero-text top padding:    2.25rem × 18px = 40.5px  (save 40.5px)
hero-text bottom padding: 1.25rem × 18px = 22.5px  (save 18px)
────────────────────────────────
Total above photos:       ~535px
Viewport remaining:        365px  ← photos (295px) fully visible with 70px headroom
```

## Files Changed

- Modify: `app/globals.css` lines 920–933 (`@media (min-width: 1024px)` block)

No other files change.

---

## Task 1: Apply CSS desktop compaction

**Files:**
- Modify: `app/globals.css` (lines 920–933)

- [ ] **Step 1: Read the current 1024px media query block**

  Confirm current values match the plan before editing:
  ```
  @media (min-width: 1024px) {
    .page-section            { padding: 5rem 2.5rem; }
    .hero-text               { padding: 4.5rem 2.5rem 2.25rem; }
    .before-after-container  { padding: 0 2.5rem 5rem; gap: 1.375rem; }
  }
  ```

- [ ] **Step 2: Edit the 1024px+ media query in `app/globals.css`**

  Find the block starting at line 920. Replace the three rules inside it with:

  ```css
  @media (min-width: 1024px) {
    .page-section {
      padding: 3.5rem 2.5rem;
    }

    .hero-text {
      padding: 2.25rem 2.5rem 1.25rem;
    }

    .before-after-container {
      padding: 0 2.5rem 2.5rem;
      gap: 1.375rem;
    }
  }
  ```

  **What each change does:**
  - `.page-section`: `5rem → 3.5rem` — reduces inter-section padding from 90px to 63px each side, improving overall page density. Still comfortable for readability.
  - `.hero-text` top: `4.5rem → 2.25rem` — removes 40.5px of empty air above the headline. The header is sticky, so there is no nav overlap risk.
  - `.hero-text` bottom: `2.25rem → 1.25rem` — tightens the gap between the last hero text element and the photos by 18px.
  - `.before-after-container` bottom: `5rem → 2.5rem` — removes excess padding below photos (they need none after the section transition handles the visual break).

- [ ] **Step 3: Verify mobile breakpoints are untouched**

  The 640px block (lines 904–917) must still read:
  ```css
  @media (min-width: 640px) {
    .page-section            { padding: 3.75rem 2rem; }
    .hero-text               { padding: 3.5rem 2rem 2rem; }
    .before-after-container  { padding: 0 2rem 3.75rem; gap: 1.125rem; }
  }
  ```
  If it does, mobile is safe — these breakpoints are unchanged.

---

## Task 2: Run build and type checks

**Files:** none modified

- [ ] **Step 1: Run the production build**

  ```bash
  npm run build
  ```

  Expected: Build completes with no errors. Exit code 0.

- [ ] **Step 2: If build fails, inspect output**

  CSS-only changes should not affect TypeScript types. If the build fails, it is unrelated to these changes. Check `next.config.ts` or a pre-existing error before proceeding.

---

## Task 3: Capture screenshots and validate viewports

**Files:**
- Create: `design-archive/desktop-compaction-v1/desktop-1440x900-full.png`
- Create: `design-archive/desktop-compaction-v1/desktop-1440x900-viewport.png`
- Create: `design-archive/desktop-compaction-v1/mobile-390x844-full.png`
- Create: `design-archive/desktop-compaction-v1/README.md`

- [ ] **Step 1: Start dev server**

  ```bash
  npm run dev
  ```

  Expected: Server starts on http://localhost:3000

- [ ] **Step 2: Capture screenshots using Playwright or browser DevTools**

  Using Playwright (Node.js, installed in project or globally):
  ```js
  const { chromium } = require('playwright');
  (async () => {
    const browser = await chromium.launch();

    // 1440×900 full page
    const p1 = await browser.newPage();
    await p1.setViewportSize({ width: 1440, height: 900 });
    await p1.goto('http://localhost:3000');
    await p1.screenshot({ path: 'design-archive/desktop-compaction-v1/desktop-1440x900-full.png', fullPage: true });

    // 1440×900 viewport only
    await p1.screenshot({ path: 'design-archive/desktop-compaction-v1/desktop-1440x900-viewport.png', fullPage: false });

    // 390×844 full page
    const p2 = await browser.newPage();
    await p2.setViewportSize({ width: 390, height: 844 });
    await p2.goto('http://localhost:3000');
    await p2.screenshot({ path: 'design-archive/desktop-compaction-v1/mobile-390x844-full.png', fullPage: true });

    await browser.close();
  })();
  ```

  If Playwright is not available, use Chrome DevTools:
  - Open http://localhost:3000
  - DevTools → Device Toolbar → set 1440×900
  - Cmd+Shift+P → "Capture full size screenshot" → save as `desktop-1440x900-full.png`
  - "Capture screenshot" → save as `desktop-1440x900-viewport.png`
  - Repeat at 390×844 for mobile

- [ ] **Step 3: Validate 1440×900 viewport screenshot**

  Confirm all four elements are visible without scrolling:
  - [ ] "Daychanger Decks" identity in header
  - [ ] "STEP OUT—NOT DOWN" headline
  - [ ] Service description paragraph
  - [ ] "Request Quote" button
  - [ ] Before/after deck photos (both images must be substantially visible)

- [ ] **Step 4: Validate 1366×768 in browser**

  Open http://localhost:3000, set viewport to 1366×768.
  Confirm:
  - [ ] No overlap or clipped text
  - [ ] No horizontal scrolling
  - [ ] Request Quote button visible
  - [ ] Photos visible or nearly visible (768px is tighter; at minimum the headline + button must be clear)

- [ ] **Step 5: Validate 1920×1080 in browser**

  Set viewport to 1920×1080. Confirm:
  - [ ] No overlap or clipped text
  - [ ] No excessive whitespace introduced
  - [ ] All content readable and well-proportioned

- [ ] **Step 6: Validate 390×844 mobile**

  Review the `mobile-390x844-full.png` screenshot.
  Confirm:
  - [ ] No layout regression from baseline
  - [ ] No horizontal scrolling
  - [ ] Buttons large and tappable
  - [ ] Before/after photos render correctly (stacked vertically per `@media (max-width: 479px)` rule)

- [ ] **Step 7: Verify both Request Quote buttons**

  At http://localhost:3000:
  - Click the hero "Request Quote" button → confirm the quote flow opens (name step shown)
  - Scroll to the final CTA section → click its "Request Quote" button → confirm the same flow
  - Do NOT submit a real lead

- [ ] **Step 8: Write README**

  Save `design-archive/desktop-compaction-v1/README.md` with:
  - Purpose of the compaction
  - Baseline tag (`daychanger-decks-design-baseline-v1`) and commit (`0e3ac3ca`)
  - Files changed (`app/globals.css`)
  - High-level layout changes (padding reductions listed above)
  - Desktop viewport result at 1440×900
  - Mobile regression result at 390×844
  - Intentional remaining scrolling (all sections below hero are below fold by design)
  - Before/after page-height at 1440×900
  - Confirmation lead flow was not changed

---

## Task 4: Commit, push, deploy

- [ ] **Step 1: Stage only intended files**

  ```bash
  git add app/globals.css design-archive/desktop-compaction-v1/
  git status
  ```

  Confirm only `app/globals.css` and the new archive folder appear. Do NOT stage:
  - `resend api key.txt`
  - `anthropic-api-key.txt`
  - `Mailer.docx`
  - Any `.env` file

- [ ] **Step 2: Commit**

  ```bash
  git commit -m "Compact Daychanger Decks desktop homepage layout"
  ```

- [ ] **Step 3: Push**

  ```bash
  git push origin main
  ```

- [ ] **Step 4: Wait for Vercel deployment**

  Monitor https://vercel.com or run:
  ```bash
  vercel --prod
  ```
  Wait for deployment to complete (~60–90 seconds).

- [ ] **Step 5: Verify production**

  - https://daychangerdecks.com loads successfully
  - https://www.daychangerdecks.com redirects to https://daychangerdecks.com
  - At 1440×900: headline, description, button, and photos visible without scrolling
  - Both Request Quote buttons open the flow
  - Mobile layout unaffected

---

## Halt Conditions

Stop without deploying if:

- Build fails (npm run build exits non-zero)
- At 1440×900, photos are not visible without scrolling after the changes
- Mobile layout regresses (horizontal scroll, overlapping content, button too small)
- The quote flow fields change (must collect only name, phone, project address)
- Any unrelated untracked file appears in `git status` that would create an unsafe commit boundary

---

## Self-Review Against Spec

| Spec Requirement | Covered |
|---|---|
| Desktop-only padding reduction | ✓ All changes inside `@media (min-width: 1024px)` |
| No mobile impact | ✓ 640px block and base styles untouched |
| Preserve visual identity | ✓ No color, font, or component changes |
| No content/copy changes | ✓ HTML unchanged |
| Both Request Quote buttons work | ✓ Verified in Task 3 Step 7 |
| No new dependencies | ✓ CSS only |
| Archive screenshots saved | ✓ Task 3 saves three screenshots + README |
| Commit message exact | ✓ "Compact Daychanger Decks desktop homepage layout" |
| No secrets committed | ✓ Checked in Task 4 Step 1 |
