# Design Assets Notes — DM-Labs.io Redesign

## Asset Inventory (from /home/ubuntu/upload/)

### Key Decorative Assets (transparent PNG/WebP)
- `ChatGPTImageJul22,2026,11_22_34AM(1).png` — Radial bloom / glow orb (cyan-violet, transparent bg)
- `ChatGPTImageJul22,2026,11_22_38AM(10).png` — Glass search pill / card with glass ring (cyan-violet gradient edge, transparent bg)
- `ChatGPTImageJul22,2026,11_51_42AM.png` — Three glass triangles floating on misty lavender/cyan background (1672×941) — KEY HERO ASSET
- `ChatGPTImageJul22,2026,11_30_20AM(1).png` — Glass phone mockup (cyan-to-violet gradient edge, transparent bg)
- Multiple other glass/refractive assets in the (2)-(10) series

### Hero Background
- `dml-a01-hero-base-field-2560x1440.webp` — Soft iridescent field: mostly white/mist with cyan top-right and violet/purple bottom-left. Very subtle, atmospheric. Exactly matches the design bible "cool atmospheric field" description.

### Hero Video
- `dmlabshomepagevideo.mp4` — 13.7MB video for scroll-scrubbed hero

### Logo
- `officiallogo.png` — Official DM-Labs.io logo mark (946KB)

### Frames
- `/home/ubuntu/upload/frames/` — Pre-extracted video frames for canvas scrubbing

## Design Bible Key Points (from pasted_content_11.txt)

### Color Tokens
```
--mist: #EEF1F8
--cloud: #F7F9FC
--ink: #0B1B36
--slate: #5A6B87
--slate-soft: #8B99B0
--cyan: #22D3EE
--blue: #3B82F6
--violet: #8B5CF6
--blush: #E879F9 (gradient tail ONLY)
--grad: linear-gradient(100deg,#22D3EE,#3B82F6,#8B5CF6,#E879F9)
```

### Typography
- **Satoshi** (from fontshare) — display/body
- **Space Mono** (Google Fonts) — eyebrow labels, numbering, metadata, buttons
- Display XL: Satoshi 900, clamp(2.4rem, 6.6vw, 5.6rem), tracking -.03em
- Buttons: Space Mono 11px, 0.2em tracking, uppercase, rectangular (border-radius: 0)

### Geometry: SHARP
- Default border-radius: 0 (all cards, panels, inputs)
- Chamfer (cut corner) as accent: clip-path polygon
- Circular elements (dots, avatars) stay circular

### Homepage Structure
```
[00] HERO — Image sequence scrubbing + typewriter + gradient headline
[01] PROOF BAR — Mono ticker
[02] CAPABILITIES — Panels demonstrating capabilities
[03] WORK — 4-up preview grid (2×2, gap 2px)
[04] PROCESS — Horizontal pinned 5-step track
[05] TEAM — AI-leverage story
[06] PRICING — Deliberately still, no animation
[07] CTA — Full-bleed, single action
FOOTER
```

### What the Previous Redesign Did Wrong
- Used GSAP video scroll hero (correct technique but wrong execution)
- "XP Windows" blog metaphor (this IS in the design bible — desktop metaphor IS correct)
- Sharp geometry design system (also correct per design bible)
- The user said "I can't find one good thing" — so the issue was execution quality, not direction

### Key Constraints
- No pricing in the hero
- Show craft first, reveal €299 late
- Pricing: €299 Launch / €749 Growth / €1,499 Pro (NEVER CHANGE)
- No em dashes
- Brand: DM-Labs.io
- Mobile is primary (65-75% phone traffic)
- prefers-reduced-motion: full static site

## ASSET CDN URLs (check ASSET_URLS.md for current URLs)
