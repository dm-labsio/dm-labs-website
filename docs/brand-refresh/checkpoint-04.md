# Checkpoint 04 — normal-scroll homepage hero

28 September 2026. Branch: `codex/brand-refresh`. Preview only.

## Result

English, Greek and Hebrew now share a normal-flow hero. The complete approved headline and localized consultation/examples links appear in the initial HTML. Scrolling no longer seeks a video, pins the stage or delays the offer. The old scrub component, Hebrew canvas sequence, CSS, global poster preloads and obsolete verification scripts are retired.

The short body copy is adapted for each language. All three primary hero links lead to their own contact page; secondary links lead to their examples page. Hebrew previously opened WhatsApp directly from this hero. Its contact page and existing WhatsApp controls remain available. Other homepage sections retain their existing destinations.

## Artwork and motion

- Source: supplied IMG-053, `V01-dark-logo-hero-v02.png`, 2752 × 1536. Crop `(1400, 0, 2752, 1536)` isolates the complete glass sculpture and reflection from its unused copy area. No mirroring or geometric distortion.
- New versioned WebP derivatives: 480 × 545, 20,344 bytes; 960 × 1091, 56,956 bytes. Responsive selection, declared dimensions, high fetch priority and empty alt text for decorative artwork. The original remains outside Git.
- Midnight background, Pearl headline, Periwinkle accent/primary CTA, Cyan focus outline. Artwork sits beside copy on desktop and after the offer on mobile; Hebrew reorders the columns while preserving artwork orientation.
- One 2.6-second CSS light pass over the artwork, after a 0.2-second delay. No continuous hero animation, video request, scroll handler or new animation dependency. Motion is enabled only inside `prefers-reduced-motion: no-preference`; text and links never depend on it.
- Rubik 900 for EN/HE, M PLUS Rounded 1c 900 for EL, Open Sans for body/UI. Hero scale is 48–88px EN/HE and 48–56px Greek desktop, with the existing 32–48px Greek exception below 600px. This adapts the approved type system to a two-column composition without squeezing glyphs.

The seven supplied videos were inspected through metadata, sampled frames and browser playback. All are eight seconds, 1920 × 1080, H.264 at 24 fps with an AAC audio track, approximately 3.2–6.3 MB each. They contain baked black bars and relatively active light-background compositions (conversation bubbles, digital cards, rotating triangles, gallery panels, orbiting panels, editorial cards and growth bars). None was selected for this dark hero. Loop editing, audio removal and responsive treatment remain required before adopting one elsewhere; seamless loops have not been certified. Existing video usage elsewhere is outside this checkpoint.

## Related cleanup

The Hebrew cookie notice no longer polls the retired hero or waits for its scroll release. It uses the existing 1.2-second entry delay shared by the other languages, with cleanup on navigation. Consent copy, choices and persistence remain intact. The mobile Hebrew example-image containment rules remain independent of the retired hero CSS.

## Verification

- TypeScript and whitespace checks pass.
- 142 tests across 29 files pass, including three server-render checks for complete hero content, correct directions and localized destinations without JavaScript/media playback. Existing exact-headline, link integrity, typography and locale regressions pass.
- Full build/prerender: 91 canonical pages, 11 demo routes and static 404; zero errors. Existing bundle-size warning remains.
- Built homepage HTML independently checked for all three locales: complete offer, correct links and no retired scrub markup or hero video/canvas.
- Browser layout audit across EN/EL/HE at 320, 768 and 1440px: one H1, expected font family/size and direction, loaded responsive artwork, no horizontal page overflow. Additional visual checks at 375px Greek, narrow Hebrew and desktop English/Greek/Hebrew.
- All six hero links clicked: each consultation opens the localized contact page with its form, and each examples link opens the localized gallery. No customer form submitted.
- Native scrolling moves the entire hero out of the viewport; no pinned stage remains. Keyboard navigation reaches the secondary action with a visible 3px Cyan outline. No browser console errors during these checks.
- Fresh Hebrew cookie notice appears without scrolling; rejection dismisses it and survives reload.
- Reduced-motion behavior checked in the CSS and static-render implementation. OS-level reduced-motion emulation and a complete browser zoom/screen-reader audit were not performed in this checkpoint.

The homepage package remains in progress: remaining sections, example cards, shared button treatment, shell/logo, other page families and complete accessibility QA retain their separate checkpoints. This is a scoped hero replacement, not completion of the entire refresh.
