# Website demo covers

9 October 2026. Approved Hartley changes released to main at 14a6c285ff0f5803a29b6a28b3bd3f16fd474547. This subsequent cover presentation is for Preview review only.

Seven complete header-and-hero captures replace the fixed-height crops and obsolete Bella/Pulse mockups. Shared DemoPreviewArtwork shows each screenshot edge to edge at its natural aspect ratio, without a coloured mat, image padding or cropped UI. Responsive 720/1200px WebP sources, explicit intrinsic dimensions, lazy loading and no live thumbnail iframes. All fourteen derivatives together are approximately 737KB; each card loads one appropriate source.

Our Work shows two columns on larger screens, one on phones. Captions contain the project name, a short description and an underlined action. A real button extends over each cover for whole-card pointer access and native Enter/Space interaction. The custom-build invitation follows the actual work. Homepage examples and detail modals share the same cover component across EN/EL/HE. Existing URLs, industry filters and return-position handling are retained. Bella's summary now matches the actual monochrome editorial design. Hover feedback stays on the action text; screenshots remain stationary so their edges stay flush and their content stays complete.

QA: TypeScript; 26 targeted unit tests for gallery navigation, return state, editorial typography and SEO; complete build with 97 canonical pages, seven preview wrappers and no render/SEO issues; responsive visual checks and keyboard opening for all seven covers across EN/EL/HE at 320/390/768/1440px; the four homepage covers in each language; existing Hartley/Elara gallery and homepage return journeys. The static Hartley robots directive was aligned with the other standalone demos (noindex, nofollow); public wrapper indexing behavior is unchanged. Browser viewport emulation, not physical-device testing.

Sources: client/public/media/examples/covers/SOURCES.txt. Original captures: ../output/demo-covers. Unrelated local Arcos changes are excluded.

Review refinement: removed the coloured framing and uniform image ratio. Full-bleed imagery now fills each cover naturally across the homepage, Our Work and detail modals.

Equal-size refinement: recaptured all seven real demos onto an 8:5 canvas with capture-only hero composition. No letterboxing, decorative mat or image distortion. The shared cover uses the same ratio everywhere; caption space accommodates translated labels, and homepage grid rows equalize to the tallest card. The interactive demo pages themselves are unchanged.
