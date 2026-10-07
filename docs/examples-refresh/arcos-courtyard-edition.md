# Arcos: Courtyard House edition

7 October 2026. Preview only. Follows the user's approval of PulseGym and request to move to the next example.

## Direction

Keep Arcos as an architecture concept, with its sharp geometry, Syne display typography and terracotta accent. Give it an architectural-journal composition with a full-width photograph, a schematic project explorer, an asymmetric photo gallery and a dark material study. IBM Plex Sans supplies quiet body and drawing labels.

The earlier assortment of unrelated stock projects, invented studio awards, completed-project statistics, contact details and business schema are replaced by one clearly fictional house. Original generated exterior, interior and detail views use the same pale limestone, limewash and oak vocabulary. The plan communicates three wings and a central courtyard; it is labelled not to scale and is not a construction drawing.

## Complete visitor flow

- Explore courtyard, living and threshold on a clickable plan. Each selection changes the highlighted area, photograph and explanation.
- Save an architectural idea or a material into the project brief, and remove it again from either source or summary.
- Open the photographs in a native modal with previous/next, keyboard, Escape, touch-swipe and focus return.
- Inspect material texture using a magnifying lens, with fixed material positions available on touch and keyboard. Cursor movement is optional and disabled for reduced motion.
- Choose project type and priorities, add optional notes, create a sample brief, edit it and download a text copy. All values are inserted as text. Nothing is submitted or stored remotely; inputs are kept only in the current page.
- Navigate within the page without adding iframe history entries. Mobile menu closes and focus moves to the chosen section.

The preview wrapper permits user-triggered downloads for Arcos and Pulse only. All other examples retain the previous sandbox settings. There are no new dependencies, backend endpoints, secrets or environment changes.

## Component research

[Aceternity Lens](https://ui.aceternity.com/components/lens), found in the [21st.dev collection](https://21st.dev/community/components/explore/parallax-components), informed the material magnifier. [Tracing Beam](https://ui.aceternity.com/components/tracing-beam) informed the restrained drawing/progress motion. These are original lightweight implementations inspired by those interaction patterns, not copies of paid source. Attribution and the distinction are recorded in the public SOURCES.txt.

## Assets and gallery

Three images were generated with the built-in image_gen tool. Full prompts and reference relationships are in [arcos-assets.json](arcos-assets.json). Original PNGs are preserved outside the repository in output/website-refresh/arcos/originals. Responsive WebP assets live in client/public/media/examples/arcos. The gallery cover is a browser capture of the real design, shared by all three localized galleries; homepages use the new courtyard image. Gallery feature descriptions now match the implemented concept.

## QA scope

scripts/qa-arcos.mjs covers 320, 390, 768, 1024 and 1440 px: navigation, plan selection, material selection, saved ideas, removal, safe free-text rendering, brief editing and actual downloaded content, lightbox controls, image decoding, overflow, browser errors, iframe download/navigation, pointer lens and reduced motion. Artifacts and the report are saved to output/website-refresh/arcos/qa outside the repository. TypeScript, the full production build and localized gallery handoff are checked before Preview publication.
