# Checkpoint 12 — visual rework of the first service batch

29 September 2026. The user paused progression to the next service topics and asked to fix the text density, weak responsive mockup and lack of visual flow in checkpoint 11. Scope remains custom design, mobile-first and performance in EN/EL/HE. Preview only.

## Design changes

- Replaced the pasted triangle mockup with an original FORM / STUDIO architectural website concept: a masthead, full-bleed supplied architectural image, localized display headline, editorial content, collection row and composed graphic detail. One content tree adapts between phone, tablet and desktop. The concept is explicitly illustrative, not a client claim. No simulated menu or sample CTA is exposed as a working control.
- Custom design now uses a layered composition of supplied monitor artwork, a localized type specimen and brand swatches. Performance uses selectable loading/response/stability scenes with drawn paths, staged loading and a response marker; no invented timing or benchmark score.
- Three selectable illustrated chapters replace the three simultaneous body-copy columns. One explanation is visible at a time; all original copy remains in the rendered document. On phones the chapter controls precede the changing artwork.
- Large supplied image breaks separate the chapters from the detailed scope. The full scope and four process explanations use native disclosures. All scope, commercial qualifications, FAQ answers, canonical URLs and related/contact/pricing/process destinations remain available. The service and FAQ metadata still derive from the same content source.
- Maintains dark page surfaces, localized type roles, natural scrolling and unmirrored artwork. Generic decorative icon capsules are not used. The existing bottom-alignment and possible light hero-video feedback remains deferred; neither Services overview nor Pricing changed.

## Animation and media

Installed the user-requested Anime.js 4.5.0 from its official npm package, pinned exactly. A narrow lazy entry exports only animate/createScope/stagger. The final engine chunk is 15.25 KB gzip (reduced from the initial 43.16 KB full entry). Main JS is 559.01 KB gzip, previously 554.92 KB; the existing large-bundle issue remains separate.

Artwork animates once when it enters view, or when the visitor changes a scene/replays it. Sequences finish in approximately 1.3 seconds; there are no loops or scroll scrubbing. Copy, consultation links and native scrolling remain available throughout. Scoped cleanup restores static styles when leaving a scene, navigating away, hiding the document or enabling reduced motion. Reduced motion bypasses the engine load and hides replay controls. CSS also disables layout transitions. Deferred import failures preserve the complete static composition.

Primary references: [Anime.js installation](https://animejs.com/documentation/getting-started/installation/), [React lifecycle](https://animejs.com/documentation/getting-started/using-with-react/), [animation cleanup](https://animejs.com/documentation/animation/animation-methods/revert/). No third-party example design or paid template was copied.

Four optimized derivatives of supplied art: IMG-019 design review (84,172 bytes), IMG-020 phone in hand (59,704), IMG-008 glass performance composition (70,312) and IMG-033 architectural model (67,470). Total 281,658 bytes. Original files and Blob objects remain unchanged. Existing monitor and dark-background assets are reused.

## Verification

- TypeScript and 193 tests in 36 files pass. Seven new lifecycle tests cover initial/live reduced-motion preference, cleanup, hidden/offscreen scenes, deferred-import navigation races and failed animation chunks. Existing nine-route content/schema coverage now verifies preserved content and initial disclosure/chapter state.
- Full link/build/prerender passes: 91 canonical pages, 11 demos and static 404, zero errors. All nine generated service documents have one H1/main, correct canonical and full scope/chapter content.
- Browser checks cover all nine routes at 320/768/1440px. One narrow Greek process-text problem was fixed with single-row phone disclosures. Expanded scope and all four steps fit in every locale. All 27 chapter selections operate with Enter/Space, update the associated visual and display one explanation. Supplied art loads; EN/HE use Rubik, Greek M PLUS Rounded 1c.
- Visual review covers the replacement phone/desktop concept, layered custom-design board and chapters, Greek phone typography, Hebrew phone chapters and performance diagrams. Live intermediate/final style observations confirm Anime.js playback settles. Native-device, screen-reader and OS preference emulation remain later validation gates; lifecycle tests are not represented as physical-device testing.

Live Preview checks and unchanged main/production identities are recorded externally after deployment. The next service batch stays on hold while the user reviews this revised visual direction.
