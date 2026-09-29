# Checkpoint 16 — dark homepage and introduction video

29 September 2026. Preview only on `codex/brand-refresh`. The user paused the next roadmap batch to make the homepage dark and add the supplied introduction video.

## Homepage

English, Greek and Hebrew now use navy surfaces throughout the homepage. The supplied pearl arches, glass arcs and folded-glass backgrounds appear behind examples, process, pricing, team and the closing invitation. Existing hero motion, links and other page content remain. The new introduction section sits after the hero/trust strip and before examples, with a large headline, poster and play button. Labels and summaries are localized; the original video remains in English and is identified as such. Hebrew is RTL.

## Media delivery

The original 31.1-second 1920×1080 60fps H.264 file is approximately 58 MiB and remains unchanged on the Mac. Web copies preserve the complete video and audio:

- Desktop: 1920×1080, 60fps, H.264 CRF21, AAC128, 6,569,366 bytes.
- Mobile/data-saving mode: 1280×720, 30fps, H.264 CRF22, AAC128, 3,012,217 bytes.
- Both MP4s place the `moov` metadata before media data for progressive playback. The poster is a small WebP from the opening brand message.

For this checkpoint the compressed, content-versioned copies are served as static files by the Vercel Preview CDN. The connected Vercel tools could deploy but offered no Blob upload capability, and the dashboard was signed out. No Blob store was created or modified. A later migration to the existing public Blob store can change the two source constants without changing the player; the wider source-asset library remains outside this deployment.

The player has no source until a visitor presses play, uses `preload="none"`, preserves the full 16:9 frame and exposes native playback, seeking, volume and fullscreen controls. It does not autoplay or loop, pauses when the document is hidden, and offers retry/direct-video links on media errors. No player library or runtime dependency was added. Only the poster loads with the page; the MP4s are separate URL requests.

## Verification

TypeScript and 217 tests in 37 files pass. Full build: 91 canonical routes, 11 demos and static 404, zero errors. Generated homepage HTML has one H1 and no video source or autoplay. New checks cover delayed loading, responsive source selection, video size limits and fast-start MP4 structure. Both optimized files decode without errors.

Local browser checks cover all three homepages at 320, 768 and 1440px: no horizontal overflow, play labels fit, no white content sections, correct locale heading fonts and Hebrew direction. Desktop full-HD and mobile 720p playback, keyboard pause, native controls and dark section readability were checked. No observed console errors. Live Preview checks and unchanged production/main identities are recorded in the external QA/deployment notes. Physical-device testing and translated video captions remain future finishing work.

The next maps/forms/social batch, broader multilingual copy/typography work and package alignment remain on the roadmap.
