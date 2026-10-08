# Dr. Elara: interactive clinical clarity

8 October 2026. Preview-only revision following the user's review. Replaces the photo-viewer hero with a generated tooth sculpture and an interactive particle scan. Adds two complete sections: an outside/inside tooth-condition explorer and personal visit preferences. The real Dr. George case study is unchanged.

## Identity

Pure white #ffffff, ink #14212c, electric blue #185ce5, ice #f1f6fb. Sora display type and Source Sans 3 body type, checked against the current retained demos. No cream surfaces, decorative half-circle, abstract care rings or “person first / patient second” section.

## Component references

- [Logo Particles by Vaibhav Kumar Singh on 21st](https://21st.dev/@vaib215/components/logo-particles): the image-to-particles and pointer-displacement pattern becomes an original tooth scan. A native slider dissolves the sculpture into a sampled point cloud. A gentle 14-second cycle continuously moves from sculpture to scan and back while visible. User input pauses the loop for at least six seconds and while the slider has focus. Reduced motion disables automatic movement. Canvas redraws only when the scan or pointer response changes, and stops offscreen or hidden. A static image remains if canvas is unavailable.
- [Compare by Aceternity](https://ui.aceternity.com/components/compare), also represented in the [Aceternity collection on 21st](https://preview.21st.dev/@manuarora700/library/aceternity-ui): the drag-to-reveal pattern becomes an original SVG tooth cross-section. The diagram handle and native range both work; keyboard-accessible condition tabs replace both the external and internal problem artwork and explanations. This is a simplified illustration, not a patient scan. Text checked against the [American Dental Association tooth guide](https://www.mouthhealthy.org/all-topics-a-z/tooth).
- [Expanding Cards on 21st](https://mcp.21st.dev/@vaib215/components/expanding-cards): selection/expansion feedback adapted into original native checkbox cards. Descriptions stay readable before selection. The chosen visit preferences appear in the appointment form and its demo confirmation. No data leaves the page.
- [Button Magnetic by UI Layouts on 21st](https://21st.dev/@uilayout.contact/components/button-magnetic), [source reference](https://cursify.vercel.app/components/magnetic-cursor): original lightweight adaptation moves the text within a fixed clickable area; hover/focus gets a sliding background. Touch and reduced-motion labels stay still.
- The rejected perspective image viewer, its controls and full-screen gallery have been removed. The approved white clinic photograph is now part of visit preparation.

These are original implementations of the referenced interaction patterns fitted to the existing static iframe, not installed React components. No third-party source copied verbatim; no added runtime dependencies. The sculpture adds a single optimised transparent WebP. Existing white/silver/cobalt identity and Sora/Source Sans 3 pairing are retained.

## Request, not booking

Every appointment CTA requests an appointment. Demonstration includes name/email, care topic and preferred contact time. No dates, available slots, reservation, booking confirmation or sample-plan download. Completion says the real practice would contact the visitor to confirm availability. Demo notice asks for sample details; no network submission or persistent storage. Closing clears entered details. Dental iframe download permission removed.

## Approved film

Existing supplied root-canal MP4, on-demand native controls, offscreen pause and retry preserved. Existing explanation, previously checked against the [NHS](https://www.nhs.uk/tests-and-treatments/root-canal-treatment/), is retained.

## Generated assets

Built-in image-generation tool. Final project assets: client/public/previews/elara/assets/clinical-800.webp, clinical-1600.webp, detail-800.webp, detail-1600.webp. The real page capture at client/public/media/examples/elara/cover-interactive.webp is shared by all three gallery locales and homepages. Earlier warm imagery is no longer referenced by this demo.

Clinic prompt:

> Photorealistic architectural editorial photograph for fictional Dr Elara dental practice. Landscape 3:2 wide. A striking modern SURGICAL WHITE dental clinic, photographed through full-height glass treatment room walls. Bright PURE WHITE resin floor and seamless white cabinetry, polished stainless-steel handles, cool silver metal, one precisely built contemporary pale blue dental chair in the right half and genuine-looking dental examination lamp. On left a white consultation table with two transparent chairs, recessed cobalt blue shelving detail. Sleek rectilinear architecture with a floating white ceiling, broad diffuse daylight from full-height windows, clinically clean yet believable. Crisp cool neutral white balance. NO cream, beige, wood, stone, yellow light, gold, sun rays, harsh shadows, plants, arches, people, text or logos. Strong perspective lines and exquisite photographic material detail. Eye level 28mm architecture lens, generous horizontal composition, controlled realistic reflections in glass. This is a dental clinic, not a generic office or spa. Light editorial photography with bright whites and restrained cobalt, precise spatial proportions. No excessive CGI perfection.

Detail prompt:

> Photorealistic editorial still-life photography for a high-end modern dental clinic website. Landscape 3:2. Extreme crisp close-up of a stainless steel dental examination mirror and a slim dental probe laid parallel on a pristine sealed white instrument tray, a neatly folded pure white sterile drape, a small clear glass of water near the rear edge. A second empty white tray recedes softly in the background. A muted small cobalt blue dental glove packet out of focus at far back, no readable writing. Bright PURE WHITE and cool silver palette, cobalt only as very small accent. Camera low diagonal viewpoint so mirror handle leads into frame and circular mirror is in sharp focus, lifelike finely machined steel, soft restrained specular highlights. Professional commercial macro photo 85mm lens f/5.6 natural depth of field. Diffuse cool studio light. Surgical precision, not bloody or alarming. No people, hands, teeth, mouths, branding or text. No cream, beige, gold, wood, neon, sunbeams, hard shadows. Highly realistic photographed material imperfections but instruments are spotless. Sophisticated negative space upper left. One authentic dental mirror and one dental probe only, no impossible duplicate instruments.

## QA

scripts/qa-elara.mjs checks 320/390/768/1440 px, valid section links, no overflow, white background, fonts, keyboard tabs and ranges, anatomical drag, visit preferences carried into the request, request validation/edit/reset with no network submission, particle movement and a continuous scan loop, stable magnetic hitbox and video playback/retry. Reports: ../output/website-refresh/elara-interactive/.

scripts/qa-elara-gallery.mjs checks EN/EL/HE homepages and galleries → iframe → appointment request → exact original scroll position. TypeScript, targeted tests and the full build run before preview release.

## New sculpture asset and prompt

Built-in image-generation tool; optimised with alpha preserved to `client/public/previews/elara/assets/tooth-sculpture.webp` (960 × 960). The shared gallery cover is recaptured from the actual updated page at `client/public/media/examples/elara/cover-interactive.webp`.

> Use case: stylized-concept. Asset type: transparent hero sculpture for a high-end white clinical dental website. Create one exceptionally refined three-dimensional molar tooth, front three-quarter view, upright with crown above and two gently separated tapered roots below. Natural believable molar crown with organic cusps and grooves, smooth porcelain-white enamel with faint cool blue subsurface tones. Elegant scientific product photography, not a cartoon or icon. Soft large studio lighting with beautifully controlled silver-blue edges, tactile smooth surface. Centered full object filling 80% of a square frame with generous clear margins around roots. Genuinely transparent background, no floor, no cast shadow, no environment, no circular platform, no rings, no sparkles, no text, no labels, no branding. No beige or yellow, no pink gums, no blood, no face, no metallic chrome. Crisp realistic polished tooth sculpture, elegant museum object.

## Outside/inside revision

The user requested meaningful comparisons. Cavity, crack and root infection each have distinct SVG marks on both the external and internal views, registered to the same tooth geometry. Switching conditions resets the divider to the same 55% position, so differences come from the illustration rather than an arbitrary slider shift. Labels say Inside/Outside; this is not a before/after treatment claim. Descriptions use conditional/example wording and each condition links to its source.

Sources checked: [NHS tooth decay](https://www.nhs.uk/conditions/tooth-decay/), [AAE cracked teeth](https://www.aae.org/patients/dental-symptoms/cracked-teeth/), [AAE root canal explanation](https://www.aae.org/patients/root-canal-treatment/what-is-a-root-canal/root-canal-explained/), [NHS dental abscess](https://www.nhs.uk/conditions/dental-abscess/). The abscess example directs suspected cases to urgent care from a real dentist.

Mobile hero spacing was tightened without hiding the main content. On the 390 × 844 test viewport, the slider ends at y=760, above the first-screen fold. Phone checks are browser simulations, not physical-device testing.
