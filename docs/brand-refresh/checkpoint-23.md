# Checkpoint 23: one-row gallery and simpler actions

29 September 2026. Preview only on `codex/brand-refresh`.

## Changes

- The industry gallery is now a single horizontal row at every breakpoint. Portrait images, square corners, nine localized detail panels and the final custom-industry card remain. A styled native scrollbar, touch/trackpad scrolling and keyboard access make the whole row reachable, including RTL Hebrew.
- Removed the gallery scope note, the homepage statistics strip, and the hero's no-pressure reassurance in English, Greek and Hebrew.
- Removed arrow icons and arrow characters from marketing buttons and action links, including packages, pricing, services, examples, blog navigation, FAQ, policy/back links, video fallback and replay controls. Pricing labels are centered. Functional carousel controls now use words instead of arrows, with the original handlers and accessible labels preserved. Language choice retains its labelled dropdown semantics.
- Blog indexes sort automatically by publication date, newest first, in English and Greek. Search preserves that order. Related article candidates and displayed results are also ordered by date without mutating source data. The existing Hebrew blog fallback is unchanged; Hebrew articles have not been authored yet.

## Verification

TypeScript and all 260 tests in 44 files pass. The new ordering checks cover both available blog locales and source-data preservation. Full build: 91 canonical routes, 11 example wrappers and the static 404, zero errors. A rendered-HTML audit checks all 103 generated marketing/wrapper documents for arrows inside buttons and links.

Browser QA covers all three homepage galleries at 320, 768 and 1440px: one row, no document overflow, visible scrollbar, reachable final industry, working detail panels and Escape/focus return. Verified Hebrew mobile service navigation using text controls; pricing build/care selection and monthly payment explanation; Greek example controls without empty buttons; and complete descending publication dates for English and Greek blog lists. No observed console errors. Physical-device and screen-reader checks remain for the finishing pass.

## Suggested next sequence

1. Apply the compact dark reading treatment to individual blog articles, including related articles and Greek article layouts.
2. Finish the remaining Maps, Forms and Social service pages across EN/EL/HE.
3. Run the full multilingual copy and typography pass, followed by physical-device, keyboard/screen-reader, media-performance and caption checks.

Standing preference: no decorative arrows on buttons/action links. Keep the approved homepage/price direction, square portrait industry cards and Preview-only workflow.
