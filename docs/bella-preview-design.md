# Bella Salon editorial preview

Single-page fictional salon concept at `/preview/bella-salon/` and `/previews/bella-salon.html`. No real salon claims, contact details, appointment submission, or personal-data collection. The existing preview wrapper and return navigation are preserved.

## Design and motion

Cherry / ivory art direction, Cormorant Garamond with Manrope, generated campaign portrait, editorial service columns, retained salon interior image, and a typographic closing section. Entrance sequencing, slow portrait movement, scroll-linked image offset, service marquee, and one-time section reveals. A persistent pause button and OS reduced-motion support disable decorative motion. All content remains visible if JavaScript is unavailable.

The native dialog is a demonstrative appointment interaction, explicitly labelled as a demo. It only selects a service and explains the next step; it does not send a request or collect personal information.

## Generated image

- Tool: built-in image generation (not CLI/API fallback).
- Final project asset: `client/public/media/bella-editorial-portrait.webp`.
- Original generated PNG retained in Codex's generated-images directory. The deployed asset is a WebP encoding of that portrait, without compositional edits.
- Existing interior photograph is retained from the prior Bella example: `https://images.unsplash.com/photo-1560066984-138dadb4c035`.

Final generation prompt:

> Use case: photorealistic-natural. Asset type: editorial beauty photography for a fictional premium hair salon website called Bella, no text. Create a luxurious fashion-magazine campaign portrait, vertical 4:5 composition. Adult woman around 30 with natural olive skin texture, deep brown flowing glossy wavy hair, brown eyes, subtle sophisticated makeup and deep cherry lipstick, wearing an elegant opaque dark burgundy high-neck sleeveless top. Three-quarter torso crop with face centered slightly above midpoint, head subtly turned toward camera, relaxed poised confident expression. Realistic voluminous hair fans out softly to the right as if moved by a gentle studio breeze, long flowing strands and beautiful highlights. Warm ivory seamless studio background, warm directional sunlight from upper left, crisp rich photographic detail, subtle analog grain, professional beauty editorial art direction, warm and elegant not plastic or over-retouched. Keep complete head and generous space above hair and on left and right, no cropped crown. 85mm portrait lens. No jewelry clutter, no hands in frame, no text, no typography, no logos, no watermark, no website UI. This is standalone photography to integrate into a burgundy and ivory editorial web design.

## Verification

Run `node scripts/qa-bella-preview.mjs` against the existing local server, or provide `BELLA_QA_URL` for a deployed preview. Checks desktop, mobile, narrow/reduced-motion layouts, images, overflow, animation controls, service-specific demo selection, Escape dismissal, JavaScript errors, and preview history/close behavior. Screenshots are saved under `/private/tmp/bella-*`.
