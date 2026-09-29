# Checkpoint 21: shared package visuals, homepage gallery and sticky navigation

29 September 2026. Preview only on `codex/brand-refresh`.

- Services now uses the approved pricing artwork, amounts, bullet lists, aligned buttons and full-surface colour feedback for website and care cards. These are whole-card links to the corresponding Pricing section; they do not select a plan or run the pricing wizard. Enterprise remains an enclosed custom option with its full scope list.
- Homepages and all nine individual service routes use compact, shared package previews. EN/EL/HE use canonical package amounts and names. This removes duplicated homepage feature lists, including the stale Hebrew Growth page count. Care timing and separate costs remain visible. The existing Pricing selection, automatic progression and payment calculations are unchanged.
- Homepage video-card bodies use softer navy surfaces with light text. Original videos, posters, on-demand loading, touch controls and reduced-motion handling remain.
- Replaced the four industry-to-demo links with a vertical, native-disclosure gallery covering the nine existing industry categories. Each has localized benefits and a consultation link. A final custom-industry card invites other businesses to get in touch. No clinic card routes visitors to a generic demo. Existing example previews elsewhere remain available.
- Reused the supplied industry artwork. Added 480px and 800px WebP derivatives for property, childcare, architecture, deli and legal. The food still life suits both restaurants and deli categories. All images load lazily; original files are unchanged. Ten derivatives total 303,842 bytes, with the largest 72,170 bytes.
- Fixed sticky-header behaviour globally by clipping horizontal decoration without creating another vertical scrolling container. Route navigation now respects existing URL fragments and focuses their target; direct language changes still preserve reading position. Pricing anchors include clearance for both the header and step bar.

## Verification

TypeScript and 258 tests in 43 files pass. Tests cover localized package destinations, existing pricing anchor targets, preserved full package and care scope, all nine localized industry descriptions, and versioned asset budgets. Updated previous source-only assertions to follow the shared components. Full build: 91 canonical routes, 11 example routes and the static 404, zero errors.

Browser checks cover home, Services and a shared individual service at 320, 768 and 1440px in EN/EL/HE. Header remains at the top, no horizontal overflow, and prices use Rubik in every locale. Corrected Pro-price clipping found at 320px and rechecked all three languages. All nine gallery disclosures opened without clipping at 320px in each language. Verified desktop button alignment, keyboard disclosure/focus feedback, full care-card link hit area, deep links with no preselection, monthly and annual pricing calculations, darker video-card playback, and mobile-menu navigation from a long scroll. No observed browser console errors.

Live Preview verification and branch/production identity checks are recorded in external checkpoint-21 QA notes. Physical-device and screen-reader checks remain part of the later finishing pass.
