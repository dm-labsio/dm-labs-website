# Checkpoint 08 — pricing choices in English, Greek and Hebrew

29 September 2026. Preview-only scope: pricing layout, comparison and the existing selection-to-consultation journey. The user approved the FAQ structure and reiterated that dark backgrounds must extend throughout the website. That broader work remains staged.

## Result

- One shared PricingPage replaces the separate English page and localized journey. Three open, full-width package rows distinguish the purpose and scope of Launch, Growth and Pro. Growth has a contrasting navy surface and an explicit recommendation. Selected choices have visible text, a cyan edge and pressed-button semantics; recommendation and selection remain different states.
- Every pricing surface is dark, including care, comparison, questions and consultation. Supplied IMG-055 (`V03-dark-nonlogo-atmosphere-v02.png`) was visually inspected and selected for its navy space and glass arcs. Aspect-preserving WebP copies: desktop 1680×938 / 71,306 bytes; small screen 760×424 / 22,404 bytes. No mirroring/recolouring; mobile background placement and stronger overlays protect copy. Original assets and shared Blob objects are unchanged.
- Preserved the English typography roles: Rubik 900/800 display and Rubik 800 prominent prices, Open Sans prose/UI, Fira Mono product micro-labels. Greek keeps M PLUS Rounded 1c for display; Hebrew follows RTL with English names and amounts individually isolated. No global type tokens are changed. English fractional amounts now show both decimal places.
- Removed pricing's generic icon decoration, floating badges, pale cards and video hero. Package/care feature lists and custom scope retain their content. Comparison uses 13 equivalent features in each locale, filling the four missing Hebrew comparison rows. The desktop table has proper row/column headers and localized inclusion labels. Phones use native expandable feature rows with all three values together, avoiding horizontal dragging. Included/excluded ticks are functional comparison indicators with accessible text.
- Monthly/yearly billing uses native radios. Prices remain €299/€749/€1,499; care remains €69/€129 monthly or €750/€1,395 yearly. Equivalents are €62.50/€116.25 per month and annual savings €78/€153. Scope, revision counts, taxes and third-party cost terms are retained; Enterprise remains quote-only with the same eight capability areas.
- Selection summary shows partial choices immediately, then separates one-time build and recurring care costs, with change links and a free-consultation CTA. It passes the same validated package/care/billing parameters into the localized contact form. Selecting a build scrolls and transfers keyboard focus to the care section. Choosing a package does not submit a request or purchase anything. Pricing selection remains page-local, as before; the existing contact-page language switch retains validated enquiry context.
- Seven related questions share the recently reconciled FAQ answers where applicable. Removed the unsupported “preview before paying” framing in favour of design approval before development, consistent with the existing terms. No payment, ownership or legal policy is changed. Hebrew contact/WhatsApp choices are now both visible, matching the other locales.

## Verification

- TypeScript passes. All 165 tests across 33 files pass, including 36 package/care/billing enquiry combinations, equivalent comparison rows, price calculations, native controls and localized destinations. Updated tests that asserted retired markup; commercial consistency and meaningful locale behavior remain covered.
- Full link check/build/prerender: 91 canonical routes, 11 demos and static 404; zero errors. Existing bundle-size warning remains. No dependency or lockfile changes.
- Local browser checks: EN/EL/HE at 320, 768 and 1440px, plus Greek at 375px. All intended fonts loaded, correct role/weight mapping, no page overflow or clipped button labels, correct art and Hebrew direction. Scoped viewport clipping keeps the shared header sticky. Desktop table scrolling is contained; phone comparisons use disclosures.
- Growth + Complete Care/yearly selected in all three languages at 320px and followed into the contact form: correct locale, URL parameters and localized prefilled question; no form submitted. Yearly totals/equivalents/savings and switching back to monthly checked. Build selection via Enter, native billing via Space, mobile comparison expansion and desktop table keyboard scrolling checked. Scrolled header language switching checked. No browser console errors observed.
- Native device/screen-reader and full zoom/motion checks remain final accessibility gates. This phase's typography evidence is limited to pricing, not the whole site.

## Next bounded work

Retain the user's approved FAQ direction and the requirement for dark imagery/video across every marketing page. Contact's remaining light form panels, home/services/process and other page families still need their staged dark/visual passes. Independent demos retain their own design systems.

Before the next broader page layout work, take the queued hero/motion research and desktop/mobile concept checkpoint: investigate the user's Anime.js reference, compare suitable primary library examples, and choose a purposeful direction without restoring the scrub effect. Services/process, editorial layout variety, remaining decorative icons and complete multilingual typography remain open.

Publish only codex/brand-refresh to Vercel Preview; verify the deployed result and unchanged main/production identity. Record deployment metadata and live checks in the external Preview-Deployment.md and checkpoint-08-qa.json.
