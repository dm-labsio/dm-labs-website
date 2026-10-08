# Dr. Elara: clinical clarity

8 October 2026. Preview-only revision following the user's review. Replaces the initial porcelain/editorial direction. The real Dr. George case study is unchanged.

## Identity

Pure white #ffffff, ink #14212c, electric blue #185ce5, ice #f1f6fb. Sora display type and Source Sans 3 body type, checked against the current retained demos. No cream surfaces, decorative half-circle, abstract care rings or “person first / patient second” section.

## Component references

- [Container Scroll Animation by Aceternity](https://ui.aceternity.com/components/container-scroll-animation), [21st registry](https://21st.dev/r/aceternity/container-scroll-animation): perspective/scale pattern adapted into original vanilla JS. Native scroll transforms the photo from tilted to flat and expands it. No pinned scroll, wheel interception or long scrub. Reduced motion gives the final static view.
- [Button Magnetic by UI Layouts on 21st](https://21st.dev/@uilayout.contact/components/button-magnetic), [source reference](https://cursify.vercel.app/components/magnetic-cursor): original lightweight adaptation moves the text within a fixed clickable area; hover/focus gets a sliding background. Touch and reduced-motion labels stay still.
- Original full-screen image gallery: two image views, crossfade, pointer/touch swipe, buttons, keyboard arrows, Escape and focus restoration. No autoplay.

These are original implementations of the referenced patterns fitted to the existing static iframe. No third-party source copied verbatim; no added runtime dependencies.

## Request, not booking

Every appointment CTA requests an appointment. Demonstration includes name/email, care topic and preferred contact time. No dates, available slots, reservation, booking confirmation or sample-plan download. Completion says the real practice would contact the visitor to confirm availability. Demo notice asks for sample details; no network submission or persistent storage. Closing clears entered details. Dental iframe download permission removed.

## Approved film

Existing supplied root-canal MP4, on-demand native controls, offscreen pause and retry preserved. Existing explanation, previously checked against the [NHS](https://www.nhs.uk/tests-and-treatments/root-canal-treatment/), is retained.

## Generated assets

Built-in image-generation tool. Final project assets: client/public/previews/elara/assets/clinical-800.webp, clinical-1600.webp, detail-800.webp, detail-1600.webp. The real page capture at client/public/media/examples/elara/cover.webp is shared by all three gallery locales and homepages. Earlier warm imagery is no longer referenced by this demo.

Clinic prompt:

> Photorealistic architectural editorial photograph for fictional Dr Elara dental practice. Landscape 3:2 wide. A striking modern SURGICAL WHITE dental clinic, photographed through full-height glass treatment room walls. Bright PURE WHITE resin floor and seamless white cabinetry, polished stainless-steel handles, cool silver metal, one precisely built contemporary pale blue dental chair in the right half and genuine-looking dental examination lamp. On left a white consultation table with two transparent chairs, recessed cobalt blue shelving detail. Sleek rectilinear architecture with a floating white ceiling, broad diffuse daylight from full-height windows, clinically clean yet believable. Crisp cool neutral white balance. NO cream, beige, wood, stone, yellow light, gold, sun rays, harsh shadows, plants, arches, people, text or logos. Strong perspective lines and exquisite photographic material detail. Eye level 28mm architecture lens, generous horizontal composition, controlled realistic reflections in glass. This is a dental clinic, not a generic office or spa. Light editorial photography with bright whites and restrained cobalt, precise spatial proportions. No excessive CGI perfection.

Detail prompt:

> Photorealistic editorial still-life photography for a high-end modern dental clinic website. Landscape 3:2. Extreme crisp close-up of a stainless steel dental examination mirror and a slim dental probe laid parallel on a pristine sealed white instrument tray, a neatly folded pure white sterile drape, a small clear glass of water near the rear edge. A second empty white tray recedes softly in the background. A muted small cobalt blue dental glove packet out of focus at far back, no readable writing. Bright PURE WHITE and cool silver palette, cobalt only as very small accent. Camera low diagonal viewpoint so mirror handle leads into frame and circular mirror is in sharp focus, lifelike finely machined steel, soft restrained specular highlights. Professional commercial macro photo 85mm lens f/5.6 natural depth of field. Diffuse cool studio light. Surgical precision, not bloody or alarming. No people, hands, teeth, mouths, branding or text. No cream, beige, gold, wood, neon, sunbeams, hard shadows. Highly realistic photographed material imperfections but instruments are spotless. Sophisticated negative space upper left. One authentic dental mirror and one dental probe only, no impossible duplicate instruments.

## QA

scripts/qa-elara.mjs checks 320/390/768/1440 px, valid section links, no overflow, white background, fonts, keyboard tabs, request validation/edit/reset with no network submission, gallery drag/navigation/focus, changing hero perspective, stable magnetic hitbox and video playback/retry. Reports: ../output/website-refresh/elara-clinical/.

scripts/qa-elara-gallery.mjs checks EN/EL/HE homepages and galleries → iframe → appointment request → exact original scroll position. TypeScript, targeted tests and the full build run before preview release.
