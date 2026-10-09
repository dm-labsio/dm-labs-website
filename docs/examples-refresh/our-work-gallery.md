# Our Work: Web Design gallery

Preview-only redesign of /templates/, /el/templates/, /he/templates/. Keep existing canonical URLs and indexability settings. The page title remains Our Work in each language; the first service collection is Web Design, containing all nine Website Demos.

Reference: [Arc Flow Carousel by Hyperiux](https://21st.dev/@hyperiux/components/arc-flow-carousel). The public preview and documented configuration informed the motion. Full source was locked; the implementation is original and does not copy gated source, sample imagery or add GSAP.

- Brand navy surface with existing dark glass artwork, approved locale typography, and no intermediate detail modal.
- Gentle parabolic arc with modular positions. One real link per project, no cloned focus targets, no empty end of the loop.
- Hover pauses and raises a card; one desktop click opens its demo. On touch, first tap selects and reveals View website; second tap opens. Swipe, trackpad horizontal scrolling, keyboard arrows, and Previous/Next browse. Vertical page scrolling remains native.
- Idle movement resumes after touch selection (four seconds). Offscreen/hidden pages stop movement; reduced-motion mode is stationary but retains manual navigation.
- Existing preview viewer and close button remain. History stores carousel phase and chosen project alongside exact page scroll coordinates. X and browser Back restore both.
- Portrait covers are composed from actual responsive demos at 600×900, with smaller 360×540 WebP sources, full bleed without distortion. Homepage landscape covers remain intact.
- Keep future service galleries separate; do not publish placeholder branding/video collections before assets and scope are approved.

Validation: scripts/qa-our-work.mjs exercises real touch input, desktop hover, direct navigation, X and Back restoration, loop seam, reduced motion, localized layouts, and console/overflow checks. TypeScript, relevant route/SEO/typography unit tests and the full prerender build also run before publishing.
