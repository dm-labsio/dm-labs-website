# Checkpoint 24: QA repairs and quieter page furniture

30 September 2026. Preview only on `codex/brand-refresh`.

## Changes

- Article titles now have explicit reading-scale sizes. English image heroes grow with their content instead of clipping long titles; all eight Greek article titles use the same responsive role. This is a repair, not the deferred blog redesign.
- Homepage orbital highlights run continuously while visible. They stop offscreen, in background tabs and for the system reduced-motion preference. Mobile and tablet artwork sits behind the hero with a dark veil, preserving text contrast and eliminating the separate illustration row. Desktop retains the split layout.
- Removed visible animation pause/resume/replay controls, the homepage trust strip, service-card numbering and open/close labels, decorative FAQ/menu/package numbers, scope fractions and redundant chapter instructions. Meaningful process steps, pricing steps, legal references and deliverable bullets remain. Native explanatory-video playback controls remain available.
- WhatsApp links use localized greetings to the DM-Labs team. Enquiry context and pricing selections are preserved.
- Privacy, terms and cookie pages share a readable dark legal layout in English, Greek and Hebrew. Legal content no longer depends on scroll-reveal effects. Cookie tables have readable headers and keyboard-accessible horizontal scrolling on narrow screens.
- Removed the footer language shortcut and the crafted-in-Europe strapline. Header language switching remains available.
- Removed the process timing comparison and fixed website-delivery promises in the affected service, local landing, homepage, metadata, article CTA and terms copy. Project scope and estimated scheduling are agreed in writing. Payment, cancellation, defect-reporting and privacy-response periods remain intact because they serve different purposes.

## Verification

- TypeScript passes; all 260 tests in 44 files pass.
- Full build produces 91 canonical routes, 11 example wrappers and the static 404 with zero errors.
- All 20 available English/Greek articles checked at 320 and 1440px for title clipping and document overflow. Hebrew retains the existing blog fallback; there are no authored Hebrew articles in this release.
- All nine privacy/terms/cookie pages checked at 320 and 1440px. No page overflow or hidden legal content found. Final Hebrew cookie-table headers and horizontal scroll region checked after the contrast fix.
- Homepage EN/EL/HE checked at 320, 768 and 1440px, plus phone visual checks. Orbital motion is infinite, advances over time, and pauses offscreen. Reduced-motion behavior is preserved in source and CSS; this checkpoint does not claim a full accessibility certification.
- Home service-card expansion, initially open service scope, close/reopen behavior and the existing Growth + Basic monthly pricing flow checked. Build-first and monthly-care-after-launch explanation remains intact. No enquiry or WhatsApp message was sent.
- Rendered-content and WhatsApp audit results are saved with the external checkpoint record. No runtime console errors were observed during the browser checks.

## Legal and accessibility boundaries

Delivery wording now distinguishes estimates from expressly agreed commitments and preserves non-excludable statutory rights. This is a content consistency pass, not a legal opinion or a review of the business's contracts. The [EU contract information guidance](https://europa.eu/youreurope/citizens/consumers/shopping/contract-information/index_en.htm) supports clear pre-contract information and understandable terms; it does not certify this site's compliance.

The user explicitly requested removal of visible animation controls. OS reduced-motion support remains, but continuous automatic motion without an in-page control must not be described as fully conformant with [WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide).

## Scope after this checkpoint

Keep the broader blog redesign, remaining service-page redesign and service-offering changes deferred as requested. Multilingual visual consistency remains a priority; the comprehensive copy pass stays at the end. Maintain Preview-only publication and do not change main or production.
