# Dr. Elara: considered care

8 October 2026. Preview-only rebuild of the fictional dental example; the real Dr. George case study is unchanged.

## Direction

Porcelain `#f6f5f0`, ink `#1c3049`, cobalt `#244ccb`, mist `#e7ecf5`. Hanken Grotesk and Newsreader. An open editorial masthead and panoramic practice image, an interactive care index, a personal comfort note, an educational film and a sample visit planner. No stock clinician portraits, invented qualifications, fabricated patient reviews or guaranteed clinical outcomes in this demo.

The care explorer takes inspiration from the accessible animated-tab patterns catalogued at https://21st.dev/community/components/explore/react-tabs and https://mcp.21st.dev/blog/react-tabs-components. The implementation is original, dependency-free code for this static iframe; no third-party component source is copied. All labels remain visible, keyboard arrows/Home/End work, and reduced motion disables transitions. Decorative line forms change with the selected care category.

The supplied root-canal film remains at its existing Vercel Blob URL. Playback starts only on request, native controls remain available, errors have retry, and offscreen video pauses. Educational copy was checked against https://www.nhs.uk/tests-and-treatments/root-canal-treatment/ on 8 October 2026. No individual suitability or treatment result is promised.

Comfort preferences carry into the appointment dialog. Sample dates are generated relative to the visit, choices remain editable, and the summary downloads as text. No personal data fields, server requests, bookings or messages. The concept status is explicit in the masthead, dialog and footer.

## Imagery

Generated with the built-in image-generation tool. Selected original: `/Users/anastacia/.codex/generated_images/01a0e7d6-dbeb-7f52-9b67-faf01914b5b0/exec-1d6876ca-68cf-46c4-b4b9-51cb8c20daf3.png`.

Project assets: `client/public/previews/elara/assets/clinic-800.webp` (60 KB) and `clinic-1600.webp` (200 KB), format/size derivatives of the generated image. The representative page capture is `client/public/media/examples/elara/cover.webp`, used by all three localized galleries and homepages.

Final generation prompt:

> Use case: photorealistic-natural. Create one ultra-realistic architectural editorial photograph for a fictional boutique dental clinic website called Dr Elara. Wide landscape 3:2 photograph, no text, no logos. View from the quiet waiting area looking through a broad open doorway into a believable spotless dental treatment room with ONE recognisable modern dental chair in muted blue-grey upholstery, dental light and compact articulated instrument unit correctly mounted, discreet sink cabinetry. Foreground: sculptural curved deep ink-blue reception desk at the left edge, two comfortable ivory upholstered waiting chairs at right, small brushed aluminium low table with closed magazines, one tall rubber plant. Off-white plaster walls, pale limestone floor with fine real grain, restrained cobalt-blue joinery accent. Human-scale real clinic, not palatial architecture or generic spa. Overcast diffuse daylight, no sunbeams, no harsh shadows, no dramatic lens flare. Slightly imperfect realistic material textures, careful architectural verticals, 35mm lens eye-level framing. Dental chair seen clearly beyond doorway toward right-center, reception desk left, useful wide quiet composition for website banner. Mood: considered, calm, elegant contemporary Mediterranean clinical interior. No people, no text, no floating objects, no impossible dental equipment, no gold, no marble veins, no teal. High-end professional interior photography, not 3D render.

## Verification

`scripts/qa-elara.mjs`: 320, 390, 768 and 1440 px; image loading, horizontal overflow, care selection, keyboard tabs, comfort preferences, dialog choices/editing, download, focus return, history, video playback/offscreen pause/error recovery. Screenshots and JSON report live in `../output/website-refresh/elara/`. Targeted unit tests preserve media and demo boundaries; full TypeScript/build checks also run. Preview route and parent return-position flow are checked separately after deployment.
