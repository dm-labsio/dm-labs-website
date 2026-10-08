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

## Tour movement and material close-ups (7 October 2026)

The tour now follows the hero immediately and also opens directly from the hero
CTA. Its heading explicitly identifies the house tour. Hover/focus intent warms
the local viewer and two panorama assets; subsequent movement preloads the target
before animating. A 600 ms camera push towards the opening leads into a short
400 ms snapshot blend and arrival zoom. This is an animated transition between
two illustrations, not continuous captured video or free movement through 3D
geometry. No new images or video were generated for this refinement.

The central text hotspot is replaced by a white ground chevron. The toolbar has
left/right look arrows and forward/back viewpoint arrows with accessible names
and explicit disabled states where no further viewpoint exists. Up/Down keys
move between viewpoints; Left/Right turn. Reduced motion bypasses travel and
blending. Closing or changing motion preferences cancels pending travel. The
long visible technical note has been removed; the existing site footer continues
to identify the fictional, AI-generated architectural concept.

Removed the plan's “Ground floor · Furnished concept” caption. The furnished plan
and enlargement are otherwise retained. Material selections now enable a larger
4× lens with separate focal positions for stone, limewash and oak. Direct image
click or Enter/Space toggles 2×/4×; pointer exploration remains available. Lens
position clamping no longer changes which part of the photograph is sampled,
which matters when magnifying the oak near the edge on mobile.

Additional QA: scripts/qa-arcos-walkthrough.mjs exercises direct hero entry,
section order, animated forward/back movement without an opaque loading flash,
arrow states, distinct material positions and magnification, closing mid-glide,
and switching to reduced motion during travel at desktop and mobile sizes.

## Spatial continuity research and replacement direction (7 October 2026)

Status: research and an offline geometry study only. No website deployment or
runtime changes in this pass. The previous tour is a prototype to replace, not
the visual-quality reference for the final feature. Passing interaction tests
did not establish that the pictured architecture was spatially consistent.

### What fails in the current tour

- The living panorama faces out of the west wing toward the east. The courtyard
  panorama's central view faces back west into the living space. `loadScene`
  resets the yaw to each image's independent default; stepping forward therefore
  changes orientation almost 180 degrees without an intentional user turn.
- The generated images contain different arrangements of wings, openings and
  furniture. Shared material/style prompts and reference images did not lock
  architectural geometry. The living view suggests dining across the courtyard
  where the plan places the sleeping wing and passage.
- Both files are 1774×887 and used as bounded 180°×90° illustrations. They are
  not validated full-sphere photographic projections. A 2:1 aspect ratio alone
  does not establish an equirectangular panorama.
- The animation changes field of view and crossfades snapshots. The camera
  never translates through a shared 3D scene, so it cannot produce geometric
  parallax, reveal correctly hidden surfaces or pass through a real doorway.
- Screen-space chevrons and a toolbar mixing turning with travelling do not
  clearly communicate a reachable destination. Their position is hand-authored
  in angular image coordinates, not attached to a walkable physical surface.

### Decision

Use one authored 3D house based on the approved SVG plan, with one scene origin,
room adjacency, lighting setup and set of furnishings. An optimized real-time
mesh viewed in Three.js is the preferred primary experience: it supports genuine
camera translation and full looking around without changing photographs.
Use baked lighting/materials where appropriate and small deliberate walking
paths, rather than a keyboard-game interface. Blender is already installed on
this Mac; an offline study using it successfully produced a .blend, a GLB and
consistent perspective renders from the same scene.

An important limitation: a controllable geometric model solves spatial drift,
but does not automatically achieve photographic art direction. The clay study
is a structural test only. Refined joinery, foliage, furniture, textures and
lighting are separate production work; browser performance also remains to be
tested. Do not present the study as a finished replacement or promise perfection.

Alternatives researched:

| Approach | Fit and trade-off |
| --- | --- |
| Authored 3D model + real-time viewer | Preferred: one consistent building, actual movement, reliable door and floor interaction. Requires material, lighting and mobile optimization work. |
| Panoramas rendered from that model + depth/proxy geometry | Good photorealistic guided-tour alternative. krpano supports depth and model projections, but unseen surfaces can stretch or become visible as holes. Needs closely spaced registered cameras, licensing review and transition QA. |
| Model-rendered ordinary panorama nodes | Useful fallback for low-power or unsupported devices. Full rotation and consistent views are possible, but crossfades remain node changes rather than continuous walking. |
| Marble/Chisel + a supplied 3D layout | Optional experiment: the official workflow accepts blocked walls, doors and GLB/FBX geometry. It does not establish architectural precision for this specific floor plan without testing. Commercial/export entitlements must be checked before use; no upload, purchase or generation was performed. |
| NeRF / Gaussian-splat reconstruction from existing illustrations | Do not use this input set. Reconstruction expects mutually consistent images and camera poses; unrelated invented views do not become one correctly mapped house through a different viewer. |
| AI video bridging two pictures | Does not satisfy interactive 360° inspection or reliable return paths, and may morph the geometry. Not the primary solution. |

### Shared scene and route specification

Keep the plan's west living wing, north kitchen/dining wing, east sleeping wing,
central olive tree and south opening to the landscape. The existing SVG is the
position source, not the generated photographs. For the offline study only,
1 drawing unit = 0.025 m, walls are 3 m high, and eye height is 1.6 m. These are
explicit fictional-design assumptions, not measurements. They can be adjusted
before finishing; all output views must regenerate from the same revision.

The initial route uses plan coordinates:

| Point | SVG x,y | Purpose |
| --- | --- | --- |
| Living | 185,330 | Begin near the north side of the living space, looking east |
| Living opening | 270,330 | Pass through the existing wide opening |
| Courtyard landing | 315,330 | Continue east; do not turn toward the room just left |
| North courtyard | 320,295 | Turn around the planting area on a clear path |
| Dining approach | 400,265 | Reach the north wing's actual courtyard opening |
| Dining interior | 400,230 | Stop before the dining chairs, not inside furniture |

The study samples the route against plan wall segments, main furniture bounds
with clearance, and the tree planting zone. This is not yet a complete navigation
mesh or collision system. North-up mini-map coordinates and Three.js y-up world
coordinates must share an explicit transform with Blender's z-up coordinates.
Store camera location and bearing in world coordinates. Preserve the user's
bearing when stepping; backwards travel must not force a turnaround. Looking
back should reveal the same opening, at the same scale and position.

### Asset production order

1. Finish the common building mesh: wall thicknesses, apertures, ceiling/roof,
   tracks, reveals and thresholds. Fix sliding-panel positions once per scene.
2. Create one furniture/vegetation set: one olive tree, one sofa, one coffee table,
   one dining set, kitchen joinery and the plan's sleeping-wing volumes. Objects
   are reusable meshes and stay put across every camera.
3. Create six coordinated material families: pale limestone masonry, limewash,
   honey oak, bronze, limestone floor and courtyard gravel. Prefer procedural
   materials or licensed PBR sets; Poly Haven offers CC0 material assets. Use
   generated images as material/art-direction references only where useful.
   A generated color image is not automatically a physically correct normal,
   height or roughness map. Calibrate physical texture scale and remove baked-in
   lighting from albedo maps used under the scene's lights.
4. Use one sky/sun direction, exposure and color treatment. Bake lighting after
   geometry is locked; keep reflective/glass shading separate as needed.
5. Export an optimized GLB and compressed textures for the live tour. Load after
   entry intent, dispose on close, adapt resolution for device capability and
   keep readable loading/error/fallback states. Size and frame-rate budgets are
   targets to validate on real devices, not current performance claims.
6. Render six true 360°×180° equirectangular fallback views from these same camera
   locations, with recorded pose metadata. Work at 8192×4096 masters if render
   quality permits; deliver lower-resolution/multires variants after testing.
   Validate seams, zenith/nadir, shared world north and projection. More nodes
   alone cannot create continuous 3D movement.
7. Render a replacement hero, two gallery views and the material-detail view
   from the same final scene. Regenerate the tour poster and gallery cover too.
   Do not mix the corrected tour with contradictory building photographs.

No new independent room panoramas should be prompted. If AI styling is tested,
provide the actual grey model render plus its floor plan, camera position,
depth/normal maps where supported, the fixed materials and one lighting brief.
Explicitly lock openings, horizon, furniture, tree and floor boundaries. Compare
against the geometry, reject shifted silhouettes, and transfer approved surface
appearance back into the model. An image prompt is not a geometry constraint.

### Interaction and acceptance

Replace the present large chevrons with small ground-aligned destination marks
anchored to walkable geometry. Raycast/occlude them so they never appear through
walls or on furniture. Click/tap a nearby point to move along a collision-safe
path; drag to look. Offer an optional small plan with current location/bearing
and accessible named destinations. Keep 44px touch targets even when the visual
mark is smaller. Avoid automatic spins, forced pointer lock, bobbing and zoom
pulses. Reduced motion skips travel but preserves the same destination/bearing.

QA must include forward, reverse and deliberate turn-around paths; 360° rotation;
door-frame parallax; consistent tree/furniture placement; no model/image swaps;
path clearance around walls, chairs and vegetation; touch drag versus tap;
portrait/landscape controls; focus/keyboard/close/reopen; slow loading and graphics
failure; and real iOS/Android performance. Existing script passes cover functional
controls but are not substitutes for spatial or aesthetic review.

Next implementation milestone: one polished living-to-courtyard traversal with
correct geometry and movement, then its mobile proof. Expand to dining only once
that short stretch meets the quality bar. Keep all website work Preview-only.

### Research sources

- [Blender panoramic cameras](https://docs.blender.org/manual/id/5.0/render/cycles/object_settings/cameras.html): true spherical output from fixed scene positions.
- [Blender baking](https://docs.blender.org/manual/id/5.0/render/cycles/baking.html): precompute surface/lighting information.
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html): common model interchange and compressed texture/geometry support.
- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html): identify surfaces under a pointer; navigation constraints are additional logic.
- [krpano depth/model documentation](https://krpano.com/docu/xml/#depthmap): depth-assisted perspective and visibility limitations.
- [krpano examples](https://krpano.com/examples/): Gravina Apartment and Abu Simbel depthmap tours as interaction references.
- [Marble Chisel](https://docs.worldlabs.ai/marble/create/chisel-tools/chisel-basics): control coarse walls, apertures and camera layout before world generation.
- [Marble plans](https://marble.worldlabs.ai/pricing): export and commercial-use entitlements vary by plan.
- [Nerfstudio custom data](https://docs.nerf.studio/quickstart/custom_dataset.html): overlapping imagery and camera poses for reconstruction.
- [PlayCanvas Gaussian splatting](https://developer.playcanvas.com/user-manual/gaussian-splatting/): a browser rendering option for valid splat assets, not an architectural-consistency fix.
- [Poly Haven asset license](https://polyhaven.com/license): CC0 assets usable for the material pipeline.

Local study deliverables: output/website-refresh/arcos/spatial-study/ in the parent
workspace, outside the deployable repository. The original plan and website
images remain unchanged during this research pass.

Study verification: Blender 5.1.2 rendered living, threshold, courtyard, deliberate
look-back and roof-off overview views from the same scene. The saved model and
GLB are reusable geometry drafts. A separate 2048×1024 Cycles equirectangular test
was rendered from the living camera, proving the spherical projection pipeline
without asking an image generator to invent a sphere. These flat-color outputs
are not final photorealistic assets. The annotated visual study was rendered and
checked for image decoding and layout overflow at 390 and 1280 px. No live tour
replacement, real-device benchmark, material bake or finished asset generation
has been completed in this research pass.


## 8 October 2026: first working shared-model milestone

Implemented a true camera-translation tour on the Preview branch. The model uses
the plan's wall and opening coordinates, the same fixed courtyard tree, and a
sampled clear route from living through the court to dining. The camera moves
continuously; no panorama is swapped or stretched to imitate walking.

- Six route stops, three destination shortcuts, floor targets and a position map.
- Forward/back preserves bearing; destination shortcuts frame their destination.
- Pointer/touch look, keyboard navigation, reduced-motion instant moves.
- Lazy loading, recoverable model fetch failure, close/reopen cleanup and cancellation.
- Three.js 0.186.1, original procedural geometry, CC0 photographed surfaces.
- Asset: 3.76 MB compressed from 19.12 MB; local engine approximately 840 kB
  before HTTP compression. The initial page does not request the engine/model.
- Local checks: 320/390/768/1440 px, short landscape, real Chromium touch events,
  continuous intermediate camera positions, direction, map coordinates, failure/retry,
  close while loading/moving, re-entry, and the outer preview iframe all passed.
- Existing page checks passed at 320/390/768/1024/1440 px: gallery, material lens,
  lightbox, floor plan, brief builder and download. Build: 97 canonical pages and
  6 previews passed; SEO audit returned zero issues.

This is a spatial/interaction milestone, **not the final photorealistic finish**.
The model still needs richer furnishings, more natural vegetation, improved
lighting, and final art direction. Existing gallery mood images are deliberately
not being presented as exact renders of this model. Replace those only after
the model's visual finish is approved; generate all final views from that same
scene. The tour cover already matches the browser model. No new unrelated AI
interior images were generated. Physical iPhone/Android and Safari performance
remain unverified. The route is constrained, not a general free-walking navmesh.

Rebuild: `python3 scripts/arcos/prepare-assets.py`, then Blender 5.1.2 with
`--background --factory-startup --python scripts/arcos/build-house.py -- --no-render`.
Run glTF Transform 4.3.0 `optimize` on the exported GLB using `--compress meshopt
--texture-compress webp --texture-size 1024 --simplify false`, writing to a separate
output before replacing the public GLB. Do not publish raw PNG renders or the
uncompressed model. `node scripts/qa-arcos-3d.mjs` checks the interactive flow;
`ARCOS_QA_URL` can target a deployment.

Hosted verification refinement: the initial screen-space ambient-occlusion pass
was too expensive in software WebGL. Removed it, cached the static sun-shadow
map, and added frame-pressure-based resolution scaling for slower devices.
Movement tests now sample positions within the rendering loop rather than rely
on one externally timed screenshot. This does not establish physical-phone FPS.
