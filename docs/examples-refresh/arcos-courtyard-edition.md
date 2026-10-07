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

## Panoramic tour and furnished plan refinement (7 October 2026)

The house now has two connected, original concept panorama views: living space
and courtyard. Pannellum 2.5.7 is vendored locally with its MIT license. The engine
and images load only when the tour opens. The native dialog works inside the
showcase wrapper without requesting fullscreen or device-sensor permissions.
Visitors can drag, use touch, follow a viewpoint hotspot, select either viewpoint,
turn with labeled controls or arrow keys, zoom, reset and close with Escape.
Closing releases the renderer and returns focus. Failed image loads have a retry
control; unsupported viewers leave the page's normal photographs available.
Reduced motion removes scene fades and drag inertia. No automatic rotation.

Research compared Marzipano, Photo Sphere Viewer, Pannellum and a real NeRF /
photogrammetry workflow. Independent generated images are not a multiview capture
of one physical building, so they cannot honestly produce a measured 3D model.
Initial full-sphere rendering was visually unsuitable. Pannellum's partial
panorama support gave a much cleaner bounded 180° horizontal / 90° vertical
concept view. The UI calls this a panoramic concept tour, never a 3D scan or
full 360° walkthrough. Source originals remain unmodified in the asset bank;
web versions are format-compressed only. Prompts are in arcos-assets.json.

The plan is now a reusable original SVG with clear section-cut walls, genuine
openings in the wall drawing, sliding glazing, door swing arcs, kitchen counters,
dining furniture, living furniture, a bathroom, two bedrooms and a continuous
passage. Room labels occupy reserved empty areas. Selection controls sit below
the drawing; selected areas highlight without covering labels. A separate native
dialog enlarges the drawing, with horizontal scrolling on narrow screens.
It remains a conceptual layout, explicitly not to scale and not construction
information. The generated images are illustrative, not exact model renders.

Sources:
- https://pannellum.org/documentation/reference/
- https://pannellum.org/documentation/examples/partial-panorama/
- https://www.marzipano.net/docs.html
- https://photo-sphere-viewer.js.org/plugins/virtual-tour.html
- https://docs.nerf.studio/quickstart/custom_dataset.html

Verification: scripts/qa-arcos-tour.mjs covers five widths, the wrapped preview,
keyboard and touch drag, scene controls and hotspots, lazy loading, cleanup,
image-failure retry, early close during loading, landscape controls, enlarged
plan access and control/drawing separation. scripts/qa-arcos.mjs retains coverage
for the existing brief builder/download, material lens and photo gallery.
