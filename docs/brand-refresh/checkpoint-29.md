# Checkpoint 29: Glass service illustrations

30 September 2026. Preview only, on `codex/brand-refresh`.

## Artwork and layout

- Replaced all nine line drawings on the Services overview with newly generated glass illustrations. The supplied social-highlight images were style references only; none is used as a website icon.
- Subjects: palette/stylus for custom design; phone/tablet for mobile; magnifying glass/search results for SEO; speedometer for performance; shield/lock for security; pin/map for location; form/stylus for enquiries; connected speech bubbles for social channels; gears for ongoing care.
- Consistent translucent blue glass, cyan highlights and violet rim lighting. All original generated masters retain alpha and are saved separately in the workspace's `output/website-refresh/glass-service-icons/masters/`, alongside `generation-prompts.json` and `asset-manifest.json`. Generation used the built-in image tool, one image per service.
- Website delivery uses 160px and 320px WebP variants in `/media/brand-refresh/v2/`. The complete 160px set is 98,396 bytes; the 320px set is 281,374 bytes. Responsive image selection, lazy loading, asynchronous decoding and explicit dimensions keep delivery compact and reserve layout space. Full-resolution PNGs are not shipped to the website.
- Illustrations display at 144px on desktop/tablet and 64–80px on mobile. They supplement the existing underlined titles and complete-card links; they remain decorative for assistive technology. The original user-supplied files are unchanged.
- Plans and prices remain absent from the three Services overview pages. No copy, destinations, pricing page behavior or unrelated page layout was changed.

## QA

- TypeScript and all 273 tests across 46 files pass. The existing static-media inventory check now covers all 18 responsive icon files and their combined delivery budgets.
- Full build passes with 91 canonical routes, 11 example wrappers and zero rendered SEO-audit issues.
- Browser checks cover English, Greek and Hebrew at 320, 390, 768 and 1440 pixels. All nine illustrations load in every view; there is no page overflow or clipped service/hero text.
- Visual checks: English desktop/mobile, Greek mobile and Hebrew 320px. Clicking an illustration opens the intended detail page. Existing semantic links, visible underlines and reduced-motion rules remain intact. No browser console errors were observed.
- These responsive checks use browser viewport emulation, not physical devices. Live Preview asset checks, commit/deployment identity and unchanged main/production evidence are recorded after deployment in the workspace QA artifacts.
