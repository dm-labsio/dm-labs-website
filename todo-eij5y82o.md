# Project TODO

- [x] Inspect the current shared header and baseline English and Greek preview routes.
- [x] Tightly crop and optimize the supplied transparent DM-Labs.io logo PNG without clipping any logo content, save it as `client/src/assets/dm-labs-logo-header.png`, and expose it through `client/src/assets/dmLabsLogo.ts`.
- [x] Replace only the shared text-based header brand with a responsive linked image using `alt="DM-Labs.io"`.
- [x] Verify desktop and mobile rendering on English and Greek pages and clean browser consoles; focused tests and the production build passed, while the unchanged project-wide TypeScript check remains blocked by five pre-existing errors outside the logo files.
- [x] Inspect the current NeonCursorTrail implementation, baseline preview, and the supplied reference repository’s ribbon-trail approach.
- [x] Replace smoky cursor particles with a full-screen, pointer-events-disabled fluid neon ribbon driven by requestAnimationFrame and capped history, without React state updates per pointer move.
- [x] Preserve and validate the existing click ripple effect alongside the new ribbon trail.
- [x] Add focused automated coverage for the fluid ribbon, click ripple, canvas overlay, requestAnimationFrame scheduling, and no-state-update safeguards.
- [x] Verify desktop, mobile, console health, and the production build; the focused test and production build/prerender passed, while the unchanged project-wide TypeScript check remains blocked by five baseline errors outside the cursor files.
