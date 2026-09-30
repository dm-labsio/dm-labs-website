# Checkpoint 01: isolated baseline

28 September 2026. Local execution checkpoint; no push or deployment.

## Branch and baseline

- Refresh branch: `codex/brand-refresh`, in a separate Git worktree.
- Original checkout remains on `codex/hebrew-homepage` at `aacb9d0`.
- Latest remote main content imported: `504824239fde763b149bb851182b180fb0fb704b`.
- Integrated baseline commit: `91716f2`.
- Local main remains at `efa5d1031b5b5e6822ff9be609d679d8465ba16a`; no main commit or push.
- Hebrew merge resolution uses the newer upstream positioning and preserves staged team biographies, portrait handling, mobile expansion and scoped typography. English/Greek also retain the shared team component.

The current route inventory is 91 canonical pages (39 EN, 33 EL, 19 HE), 11 demo pages and a static 404. The original planning inventory had 90; importing current main adds the online-shop article. There are 72 component TSX files after importing the existing StarButton.

## QA performed

- Installed frozen dependencies with Node 24.19.0 and pnpm 10.4.1; no lockfile changes.
- TypeScript: passed.
- Unit tests: 138 passed in 28 files.
- Link integrity: 154 source files, zero issues.
- Complete build/prerender: 91 canonical pages and 11 demos, zero errors; static 404 generated.
- Browser baseline: English desktop opening, English/Greek/Hebrew mobile homepages at a 375 × 812 viewport, mobile navigation, English → Greek → Hebrew switch, correct Hebrew RTL, and Hebrew biography expansion inspected.
- No console errors observed during the inspected homepage navigation. These are baseline smoke checks, not complete visual acceptance of every page.
- Existing large-bundle warning remains: main JS about 2.10 MB uncompressed / 554 KB gzip. Track during the performance stage.

Local setup issues resolved: default shell used Node 25 and a mismatched pnpm launcher; use Node 24 and the pinned pnpm version. The existing prerender build required Chromium headless shell, now installed from Playwright's official distribution. A busy local server port was left untouched; this checkpoint used a separate port.

## Homepage motion decision

The user explicitly requested removal of the scroll-scrub effect. Replace it across all three homepages during the hero task. The current scrub remains in this baseline so before/after behavior can be compared.

Replacement requirements:

- Normal document flow and native scrolling; no pinned scrub stage, scroll-driven video seeking or forced scroll distance.
- Heading and CTA visible and operable immediately, independent of animation/video loading.
- Art-directed desktop/mobile imagery from the supplied collection, with correct crop and readable text.
- Evaluate the seven supplied videos before selecting an ambient loop. A short decorative entrance is another option. Do not stack continuous effects or add a second engine without a concrete need.
- Static poster for reduced motion, loading and autoplay failure. Provide a pause control for continuous motion and pause offscreen/hidden media.
- Check touch scrolling, keyboard focus, long Greek labels, Hebrew direction, mobile browser controls, layout stability and CTA destinations.
- Replace scrub-specific assertions/traces when the feature is retired; retain meaningful route and interaction coverage.

## Next work packages

1. Finish video/artwork selection and responsive crop specifications.
2. Implement the shared multilingual typography and component foundation.
3. Replace the scrub with the new hero across EN/EL/HE and run its own QA checkpoint.

The working plan and image catalog are in the parent workspace under `output/website-refresh`. Brand contract and localized copy are under `output/brand-v0.7`.

## Preview deployment prerequisite

Before the first push/deploy, verify the Vercel project's current production-branch setting and explicit Preview target. The connector's get_project call currently returns a schema error, and the inspected dashboard browser is signed out. Continue local implementation; resolve this read-only configuration check before deploying.

The latest observed production deployment was `dpl_8ZjqD3Sfme2Za44kLmtYqSwHDpck`, built from main `5048242`. Recent feature-branch deployments were Preview. Those observations are a baseline, not a substitute for checking current settings.

Never push to main, merge this branch, promote to production, attach production domains, change production environment variables, or overwrite existing production assets. Only new versioned assets and Preview deployments are authorized.
