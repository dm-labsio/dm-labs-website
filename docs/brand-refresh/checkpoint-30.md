# Checkpoint 30: Softer glass icons and restrained motion

30 September 2026. Preview only, on `codex/brand-refresh`.

- Softened the nine Services overview illustrations with 84% brightness and 76% saturation while preserving their blue/violet glass appearance.
- Composited the dark artwork edges against each card's explicit navy backdrop with `mix-blend-mode: lighten`. This removes the visible dark halos in both resting and highlighted states without replacing or increasing the image assets.
- Added a single 1.8-second perspective turn when an icon enters the viewport. Hover and keyboard focus trigger a separate 1.6-second swivel; the care gears have a slightly larger roll. Motion settles, rather than continuously competing with the descriptions.
- Motion is enabled only under `prefers-reduced-motion: no-preference`. Static images remain visible without animation. Existing full-card links, accessible names, underlined titles, responsive image sizes and lazy loading remain intact.

## Validation

- TypeScript check and all 273 tests across 46 files pass.
- Full build passes: 91 canonical routes, 11 example wrappers and zero rendered SEO audit issues.
- Browser layout checks: English, Greek and Hebrew at 320, 390, 768 and 1440 pixels. Nine cards in every view, no horizontal page overflow, no clipped descriptions or failed loaded icon images.
- Visual checks: English desktop/mobile, Greek mobile and Hebrew mobile. The dark outlines are absent and highlights are visibly calmer.
- Keyboard focus triggers the swivel; icons below the viewport wait until scrolled into view. The lower Greek cards received their entrance animation, and the care card opened the correct Greek service page. No browser console errors observed.
- Reduced-motion behavior verified by the CSS media-query scope. Responsive checks used browser viewport emulation, not physical devices.
- Live Preview verification and unchanged main/production evidence are recorded separately in workspace QA artifacts after deployment.
