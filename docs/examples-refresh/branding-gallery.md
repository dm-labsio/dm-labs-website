# Branding gallery and project views

Preview only. Added after Web Design on Our Work, in English, Greek and Hebrew.

## Asset review

The supplied libraries are sufficient for three substantial brand-identity showcases:

- Hartley: vector logos, dog and periwinkle illustrations, pattern tiles, palette, Rubik/Jost, packaging, loyalty stationery, tea menu, posters and café applications.
- AWAY: four identity lockups, six illustrations, 14 photographic mockups, resort photography, social/poster artwork, guest stationery, menus and wayfinding. The library manifest lists 103 assets. Original vector masters remain the identity source; photographic mockups are presentation material.
- Sunday Boat: logo suite, fish symbols, patterns, supplied fonts and colour tokens, packaging, tableware, merchandise and restaurant applications.

These are finished identities, with no documented previous identity supplied. The public section therefore says Branding, not a fabricated before/after rebrand or client-results claim.

26 selected images are exported at up to 1400px with original aspect ratios, plus nine 480px gallery thumbnails. No original source files are modified, and no new AI imagery is needed. SOURCES.txt records provenance. Logos and fonts reuse the approved local demo assets. Only the thumbnail set loads with the gallery; project imagery is lazy-loaded on opening/scrolling. The complete export set is about 3.3MiB, spread across all three projects.

## Interaction reference

https://21st.dev/@alexperezcedeno/components/interactive-folder-gallery

Inspected the public description and preview: a spring-like folder opening into a fan of images. Component.tsx is explicitly locked on 21st. No gated code was accessed or copied. This implementation is original CSS/React, inspired by the fanning interaction, adapted into brand presentation stacks without desktop folder chrome.

- Desktop: three stacks, hover/focus fans the sheets apart; click opens the project.
- Mobile: native horizontal snap gallery, three named navigation controls, active stack fans out. One tap opens the selected project.
- Each brand opens in a native full-screen dialog: identity, short concept, supplied type specimen and palette, illustration/detail, six applications.
- The X, Escape, and browser Back close the view and preserve the gallery's exact page and horizontal position. Focus returns to the originating card. Native dialog keeps keyboard focus and background interaction contained.
- `?brand=hartley`, `?brand=away`, and `?brand=sunday-boat` support direct project links. Next identity replaces the current project entry so Back returns to the gallery in one step.
- Reduced motion removes opening and stack transitions. Hebrew uses RTL layout with original English brand artwork/specimens preserved.

## Verification

`scripts/qa-branding.mjs`: 390px English, 320px Hebrew, 768px Greek, 1440px English; every brand; image loading; overflow; next project; X/Back/Escape; focus and exact scroll restoration; direct/invalid links; reduced motion.

Also run existing Our Work viewer regression, TypeScript, relevant preview/typography/SEO tests and full production build/prerender audit.

## Release note

Main advanced to 8f49612 (seasonal homepage release) during this work. This change is scoped to Preview and does not modify those production changes. Preserve/integrate the seasonal release when eventually merging the approved Our Work redesign.
