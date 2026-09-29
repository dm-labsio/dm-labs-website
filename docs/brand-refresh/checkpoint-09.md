# Checkpoint 09 — homepage glass and light motion

29 September 2026. Preview-only hero update in EN/EL/HE, after the approved pricing checkpoint. Research and concept decisions are in [hero-motion-research.md](hero-motion-research.md).

## Change

The shared hero now stages the supplied glass sculpture with two orbital paths, a traveling light trace and a short depth/scale entrance. The visual area is larger on phones and the scene starts when it enters view. Motion settles after 4.4 seconds; localized pause/resume/replay controls remain available. Fine-pointer desktop interaction adds small spring-based depth, with the heading and CTA fixed in place.

Uses the already installed Framer Motion 12.23.22. No dependency, lockfile, source asset, Blob or commercial-copy change. The existing 480/960 WebP images are reused. Native scrolling, the free-consultation offer, all localized links and approved typography roles are retained. A homepage-scoped overflow fix keeps the shared header sticky, matching the previous FAQ/pricing fix.

The entire scene supports initial and live reduced-motion preferences, offscreen/document visibility pauses, manual pause and navigation cleanup. First-render HTML contains readable copy and a full static decorative image/SVG composition. Home prerendering explicitly requests reduced motion to avoid saving an intermediate animated frame or inactive playback control.

## Verification

- TypeScript and 165 tests across 33 files pass. The initial SSR test exposed a missing React import in the new component; corrected before publication.
- Full link/build/prerender: 91 canonical routes, 11 demos and static 404, zero errors. Three generated home documents inspected: reduced-motion still scene, no playback control and no partial path offset. Existing bundle-size warning remains. Main application JS grows from 552.70 KB gzip to 556.08 KB gzip (+3.38 KB in the local Vite report).
- Local browser: EN/EL/HE at actual 320, 768 and 1440px, plus Greek 375px. No page/hero overflow; intended display/body/UI fonts loaded. Hebrew label bounds fit inside the CTA; its larger scrollWidth is the existing off-canvas decorative button sheen, not clipped text. Supplied artwork remains unmirrored.
- All six consultation/examples links clicked and correct localized destinations confirmed. Header language switch from Hebrew to Greek applies Greek route, direction and typeface. Native phone scrolling and sticky header checked.
- At Greek 375×700, the below-fold scene stays idle until scrolling into view, then plays. Keyboard Space pauses; Enter resumes; replay works. Paused frame stability, automatic offscreen pause (unchanged transform/path offset across separate observations) and visible path/trace progression checked. A CSS rule initially overrode animated SVG presentation attributes; corrected and computed path progression verified.
- Temporary development-only harness exercised the actual component: initial reduced motion, preference change during a paused sequence, restoration of static transforms/paths, hidden controls, touch-only pointer suppression, fine-pointer depth and unmount/remount. No observed application console errors. The harness and concept pages are archived outside the app and excluded from publication.

Browser automation covers responsive desktop rendering, not physical touch devices or battery/GPU profiling. Native device checks, full zoom and screen-reader checks remain final gates. This verifies hero typography only; whole-site multilingual finishing is still open.

## Next bounded phase

Continue with services and process editorial layouts in EN/EL/HE: dark supplied backgrounds, stronger visual hierarchy, purposeful section transitions and remaining generic decoration. Other homepage sections, contact's remaining light surfaces and the wider route-by-route refresh remain staged. Do not declare those complete from this hero pass.

Publish only codex/brand-refresh to Vercel Preview. Record live deployment and main/production identity checks in the external Preview-Deployment.md and checkpoint-09-qa.json.
