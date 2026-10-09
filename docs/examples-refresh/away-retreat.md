# AWAY retreat demo

## Direction

A photography-led luxury canvas retreat built from the owner's complete AWAY library.
Pale blue, wine, warm timber, and light paper follow the supplied identity. Exact
vector branding and Thasadith/Pavanam typography give it an independent character.
The design avoids generic icon grids, pill buttons, ratings, and invented testimonials.
No specific location or Indigenous cultural affiliation is invented.

## Experience

- Full-bleed, responsive blue-hour opening. Three landscape choices reveal through
  an iris from the interaction point. Native animation respects reduced motion.
- Three suite types with different photographs and concrete amenities, accessible
  keyboard tabs, and full-image galleries with keyboard and touch navigation.
- A seasonal camp explorer with four place selections and contextual photographs.
  It is a conceptual orientation view, not a measured property map.
- A photographic day selector, working dining menus, and rectangular curtain-fill buttons.
- A local stay planner with suite selection, bounded guest controls, date validation,
  and editable itinerary. Explicit demo status at the point of use; no request sent,
  personal details collected, payment taken, or availability claimed.
- In-page anchors preserve the wrapper's history so closing the demo can restore
  the visitor to their previous place in the main website.

## References and source handling

Hospitality research: Aman Camp Sarika and Singita's accommodation information.
21st.dev concepts: Kedhareswer Naidu's Aperture Reveal Image Carousel and
iamsatish4564's Curtain Button. Implementations are original, lightweight code;
no inaccessible third-party component source is claimed or copied.
Full URLs and asset provenance are in `client/public/previews/away/SOURCES.txt`.

Supplied photos are exported at two responsive sizes. Fonts are served locally with
OFL licenses. Heavy source files stay outside the repository. Two truncated PNGs
(photography 5 and 30) use intact supplied WebP versions. Only hero imagery is eager;
below-the-fold photography is lazy, with further selections loaded on interaction.

## Integration and release scope

Added as Hospitality in English, Greek, and Hebrew Our Work galleries, with the same
8:5 full-bleed cover format as the existing demos. The demo itself is English.
Registered in client, server, and prerender route lists. Demo remains noindex.
Preview branch only; no main or production deployment for this work.

## Verification

TypeScript check and focused existing preview/gallery/SEO regression checks.
Desktop and mobile browser checks cover image loading, horizontal overflow, menu
keyboard behavior, suite tabs and galleries, all seasonal/place/day controls, dining
menus, planner dates and guest limits, itinerary editing, and reduced motion.
Tested viewport widths 320, 390, 768, and 1440 pixels. These are browser emulations,
not physical-device tests. Production build and deployed-preview smoke check are
required before marking this release complete.

## Illustrated arrival refinement

The cup now retains its natural square proportions with no crop. The hero opens
through two illustrated forest panels, reveals the exact oversized AWAY wordmark,
and uses staggered cut-reveal type. Landscape selections have photographic
previews and horizontal touch gestures. The backdrop stays anchored during native
scrolling and pointer movement to avoid competing animation transforms.
A slow photographic sequence runs while visible, stops after manual selection or
keyboard focus, and suspends for hidden tabs, offscreen sections, and open dialogs.
Reduced motion removes the entrance and automatic scene changes.

A new comfort explorer uses all six supplied illustrations. Every selection
reveals the corresponding space or branded object with its own description.
Blanket, bathroom amenities, and woven-label photography make the brand tangible.
The opening sequence is finite (under five seconds), with no scroll pinning or
blocked interaction. Source references are recorded in SOURCES.txt.

## Hero stability QA (9 October 2026)

Reproduced two defects: the prerendered srcdoc played the entrance before React
recreated the viewer, and scroll/pointer transforms exposed a pale strip at the
top when quickly returning to the hero. The static AWAY route now saves an inert
first-frame poster. The live iframe starts one opening after loading and decoding
its critical artwork/fonts; the poster is removed when the iframe loads.
The illustrated opening, finite photo zoom, iris reveals and swipe controls remain.

`qa-away-stability.mjs` verifies the built route with delayed JavaScript/fonts at
390, 768 and 1440 pixels: exactly one entrance on cold load and reload, continuous
backdrop coverage during rapid scroll reversals, stable pointer movement, rapid
photo selections settling correctly, and close navigation. A 320-pixel reduced-
motion case verifies no entrance or overflow. Existing functional/motion browser
suites, TypeScript, build, 97-page SEO audit and 10 preview-routing tests passed.
These checks use browser viewport emulation, not physical phones.
