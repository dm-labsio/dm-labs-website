# Homepage introduction player

Preview-only refresh of the film immediately after the homepage hero. The cover uses the existing brand glass artwork, a shorter localized headline and a full-frame play target. The hero and film spacing is tighter without changing the other homepage sections.

The player adapts Chetan Verma's MIT-licensed 21st.dev component (attribution in `docs/licenses/chetan-verma-video-player.txt`). It adds native keyboard-accessible seek/volume ranges, replay, fullscreen with an iOS fallback, localized controls, loading/error recovery and event-driven playback state. Phone controls remain visible below the picture. Reduced-motion preferences disable control/cover transitions.

The existing video sources and VideoObject metadata are retained. No MP4 is requested until a visitor presses play. Phones and data-saving connections use the existing 720p file; larger screens use 1080p. The custom cover remains until the first frame is playing.

Validation: TypeScript; 25 focused tests covering introduction metadata, preview return paths, typography and SEO; browser checks at 320, 390, 768 and 1440 pixels across Hebrew, English and Greek. Browser checks exercise actual playback, source selection, seek, pause/resume, mute, rate, replay, fullscreen, failed-load retry, reduced motion, overflow and section spacing. Browser automation uses Chromium; physical iPhone/Safari validation remains a manual check.

Also updates an outdated test assertion to the already-approved Our Work title containing Web Design & Branding.
