# Nomad carousel and video revision

7 October 2026. Preview only. Supersedes the original optional-film treatment in nomad-coffee-direction.md.

## Changes

The existing coffee film now fills the hero image area and loops silently. It was re-encoded locally as a silent 1280 × 720 H.264 MP4 with network-ready metadata: 942,087 bytes, versus 5,959,529 bytes for the original. Its source is attached only when visible and motion/data-saving preferences permit; it pauses offscreen and in a hidden document. A poster from the actual film covers loading, blocked playback and reduced-motion/data-saving use.

A manual, horizontally scrolling carousel introduces hot coffee, iced coffee and food. It supports native swiping, trackpads, Previous/Next, keyboard Left/Right/Home/End, scroll snapping and a progress bar. Full cards select the relevant menu category and navigate within the same page. No automatic slide rotation or decorative arrow buttons.

The brew guide now says “Make a better cup at home” and explains the actual job of the calculator. “Ground coffee” replaces “Coffee dose”; instructions explain wetting the grounds instead of assuming visitors understand “bloom”.

## Saved assets

All in client/public/previews/nomad/assets:

- coffee-banner.mp4: compressed existing film, 942,087 bytes.
- coffee-banner-poster.webp: frame extracted from the existing film.
- iced-coffee.webp: generated editorial image, 73,068 bytes.
- croissant.webp: generated editorial image, 104,086 bytes.

The two new images use the built-in image generation tool and retain the established vermilion, butter-yellow and directional-daylight palette. Generated originals remain in the generation library; optimized files above are committed with the site.

## Exact generation prompts

### Iced coffee

Use case: photorealistic-natural. Asset: portrait 4:5 editorial product photograph for fictional NOMAD coffee bar, matching its warm butter-yellow and vermilion photographic palette. One clear straight-sided glass of iced espresso with a natural layer of foam and distinct ice cubes, on a deep vermilion red square coaster on a pale butter yellow slightly worn café tabletop. Small orange peel to one side, restrained composition. Hard warm morning sunlight from upper left, real shadows to lower right, tiny condensation droplets, dark brown coffee with real translucence, tactile analogue photographic grain. Close three-quarter camera angle, whole glass visible with some surrounding space. No text, logos, hands, floating objects, excessive splash, artificial steam, plastic or 3D rendering. Beautiful credible food editorial photography, not a stock collage.

### Pastry

Use case: photorealistic-natural. Asset: portrait 4:5 editorial food photograph for fictional NOMAD coffee bar, matching a vermilion red / warm pale butter-yellow palette and directional morning sunlight. A single beautifully flaky imperfect butter croissant on a red glazed ceramic plate on a pale butter-yellow worn café tabletop. A folded off-white linen napkin sits loosely under one edge of the plate. Natural tiny pastry crumbs, visible real laminated layers and golden browned crust, no synthetic gloss. Close three-quarter overhead camera angle, strong warm light from upper left and clear angled shadows. Whole pastry visible with calm surrounding space. Restrained analogue food editorial photography with real material texture, no steam, no people, no hands, no logo, no text, no graphic elements, no floating objects or exaggerated crumbs.

## QA

Browser checks at desktop and 390px mobile verified looping, muted hero playback, stopping offscreen, Previous/Next in both directions, native horizontal scrolling to the last slide, no document overflow, and carousel-to-category selection inside the gallery iframe. The existing calculator tests pass. Full suite: 292 passed and the same eight pre-existing failures. Production build: 97 canonical pages, six previews, zero prerender errors and zero SEO audit issues. No main or production changes.

