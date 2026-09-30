# Hero motion research — checkpoint 09

29 September 2026. Scope: desktop/mobile homepage hero in English, Greek and Hebrew; Preview only. Native scrolling and immediately available content are requirements. Supplied IMG-053 remains the original artwork; no generated client proof or modified official logo.

## Primary-source comparison

| Option | Evidence and fit | Cost / maintenance / decision |
| --- | --- | --- |
| Anime.js | [Public homepage](https://animejs.com/) inspected visually. [Scope](https://animejs.com/documentation/scope/) supports responsive media queries and batch cleanup; [SVG drawing](https://animejs.com/documentation/svg/createdrawable/) suits coordinated paths. [MIT license](https://github.com/juliangarnier/anime/blob/master/LICENSE.md). | Strong option for intricate staggered sequences and SVG choreography. A new dependency and second animation lifecycle in this repository. Keep as a candidate for later editorial sequences; no package installed now. No marketing-site bundle figure is treated as a measured project cost. |
| Existing Framer Motion 12.23.22 | [SVG animation](https://motion.dev/docs/react-svg-animation), [scoped sequencing and cleanup](https://motion.dev/docs/react-use-animate), [public path-drawing example](https://examples.motion.dev/react/path-drawing). [MIT license](https://github.com/motiondivision/motion/blob/main/LICENSE.md). | Selected: the site already uses it. Scoped finite timeline, spring values for small pointer depth, native React lifecycle. Original artwork and path composition; no paid Motion+ templates or code used. Keep the existing package/import path. |
| Three.js | [Responsive rendering guidance](https://threejs.org/manual/pages/responsive.html) explains canvas sizing and the GPU cost of high-density rendering. [MIT license](https://github.com/mrdoob/three.js/blob/dev/LICENSE). | True refractive 3D could support a future custom scene, but supplied assets are raster art, not 3D models. Requires a separately authored model/material, renderer, resolution limits, context-loss and static fallbacks. Not justified for this checkpoint. No WebGL proof-of-performance claim or Three.js prototype. |
| CSS/native Web Animations | Suitable for the short art-direction studies and the existing cool-light button. | Best for simple isolated effects; manual sequencing/cleanup would duplicate the motion stack. Keep button CSS independent of the hero scene's properties. |

These are implementation judgments, not comparative device benchmarks. Production bundle change recorded with the build below. Browser previews are not a substitute for native iOS/Android profiling.

## Three local visual studies

The temporary `__hero-concepts.html` compared three original compositions with the same copy, palette, glass asset and CTA. Study source is archived outside the app at `output/website-refresh/hero-concepts-checkpoint-09.html`; it is not a public site route. Studies use CSS to compare the visual ideas, not implementations of every candidate engine.

1. **Cinematic macro:** an oversized crop moves outward into a close-up. Strong scale, but the phone crop loses too much of the full silhouette and feels like another image pan.
2. **Drawn blueprint:** triangular outline drawing over subdued glass. Clear craft/construction cue, but too diagrammatic for the primary brand entrance and visually flattens the supplied glass.
3. **Glass in orbit — selected:** full sculpture, intersecting cool light paths and a larger dedicated visual area. Preserves material depth, settles into a complete composition, and reads at phone scale without pointer interaction. Desktop concept screenshots and selected phone composition were inspected before implementation.

The supplied videos remain unselected: earlier inspection found light scenes and baked black bars; using them here would require a separate crop/loop/poster edit. No video or large asset upload is needed for this direction.

## Implementation contract

- Sequence starts only after the art image loads and at least 25% of its area is visible. Runs once for 4.4 seconds, then rests; no loop or scroll scrubbing.
- A localized native button pauses/resumes and replays. Pause also resets/disables pointer depth. Offscreen and hidden-document playback pauses. Component cleanup stops the sequence.
- Pointer depth is limited to 18px horizontal / 14px vertical total range, on mouse + fine-hover devices at desktop widths. Copy and CTA never move. Mobile gets the same visible sequence without requiring hover, drag or cursor interaction.
- Motion preferences have a live subscription; changing to reduced motion stops the sequence, restores complete paths and still artwork, and removes playback controls. CSS enforces the static fallback too. The installed Motion hook was inspected and does not itself subscribe React state to later changes, so the component uses `useSyncExternalStore`.
- First HTML, image loading and JavaScript failures retain the full offer and navigable links. Prerender captures home routes with reduced motion to save complete artwork rather than an intermediate animation frame.
- One engine per animated property. Pointer translation is on an outer element; sequence transforms are on inner layers. No text animation, forced scroll, SVG morphing of the logo, generic decorative pictograms or icon capsules.
- Preserve approved headlines and EN/EL/HE type roles. Layout order follows Hebrew direction; the supplied image is never mirrored. Existing cool-light primary button continues the chosen interpretation of the user's button references.

## Deferred work

This is a bounded hero direction, not completion of the homepage. Dark backgrounds across the remaining home sections, services/process editorial compositions, icon audit, whole-site multilingual type parity and native-device/zoom/accessibility finishing remain open. The three concept studies are for design comparison; final QA covers the selected direction only.
