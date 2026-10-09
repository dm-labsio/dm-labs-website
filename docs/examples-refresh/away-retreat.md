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
