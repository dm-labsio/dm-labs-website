# D&M Labs Complete Redesign — Todo

## Phase 1: Brand Foundation
- [ ] Upload D&M Labs logo to CDN
- [ ] Rewrite index.css with brand colors (#F6F6F4, #0F172A, gradient #5B8CFF→#6FE3FF→#8B5CFF)
- [ ] Set up Inter font with proper weights (Regular, Medium, SemiBold, Bold)
- [ ] Define spacing tokens (8px grid), radius system, animation timing variables
- [ ] Update index.html with new title "D&M Labs" and meta tags

## Phase 2: Generate Visual Assets
- [ ] Generate hero device mockup (laptop + phone with abstract website UI)
- [ ] Generate gradient mesh background for hero
- [ ] Generate floating triangle geometry SVG/PNG
- [ ] Generate ambient glow elements

## Phase 3: Navigation + Layout
- [ ] Glassmorphism sticky nav (rgba(246,246,244,0.75) + backdrop-blur)
- [ ] D&M Labs logo in nav
- [ ] Gradient CTA button "Get Started"
- [ ] Mobile hamburger with slide panel
- [ ] Dark footer (#0F172A) with brand identity

## Phase 4: Hero Section
- [ ] Left: headline + subtitle + dual CTAs
- [ ] Right: floating device mockups with parallax
- [ ] Background gradient atmosphere layers
- [ ] Floating triangle animation (20s+ loop)
- [ ] Trust strip below hero

## Phase 5: Homepage Sections
- [ ] Services grid (3 cards with icons)
- [ ] Process flow (4 steps with "You do / We do")
- [ ] Pricing comparison (Starter / Business / Maintenance)
- [ ] Business types grid
- [ ] Stats section
- [ ] Final CTA (dark section)

## Phase 6: Sub-pages
- [ ] Services page with new design system
- [ ] Process page with new design system
- [ ] Pricing page with new design system
- [ ] FAQ page with new design system
- [ ] Contact page with new design system
- [ ] Legal pages with new design system

## Phase 7: Motion System
- [ ] Scroll reveal animations (fade + 20px upward, 450ms)
- [ ] Card hover effects (elevation + shadow)
- [ ] Button hover (lift + glow)
- [ ] Nav scroll transition (opacity + blur)
- [ ] FAQ accordion (250ms smooth)
- [ ] prefers-reduced-motion respect

## Phase 8: QA
- [ ] Desktop QA all pages
- [ ] Mobile QA all pages
- [ ] All links working
- [ ] WhatsApp number correct (+972584928177)
- [ ] Email correct (dudeandmadame@gmail.com)
- [ ] Performance check

---

## Current Sprint: Bug Fixes + Content Updates (Mar 2026)

### Phase 2: Bug Fixes
- [ ] Industry bar on homepage: add left/right scroll arrows
- [ ] Modal desktop view: fix image cut/not responsive when viewed on mobile
- [ ] Process page: fix connector line z-index so it goes BEHIND icons, not over them
- [ ] Remove all 50/50 payment references — replace with upfront payment framing
- [ ] Footer: replace "Chat on WhatsApp" with link to /contact page

### Phase 3: UI Changes
- [ ] Templates page: change "Get This Template" CTA to "View Pricing" → /pricing
- [ ] Plan sticker colours: unified — one colour per plan (Starter=blue, Business=purple, Professional=teal)
- [ ] Add "Custom Website" blank template card — first position in ALL industries
- [ ] British English pass across all pages
- [ ] Contact form: wire up to send email
- [ ] Location: update to "Based in Europe & Worldwide Service"

### Phase 4: Pricing & Add-ons
- [ ] Restructure pricing: Starter €250 (1-page), Business €350 (3-5 pages, RECOMMENDED), Professional €450 (5-7 pages)
- [ ] Add-ons: Multilingual (2 lang €80 / 4 lang €150), Booking redirect €30, Pop-up €40, Accessibility audit €40
- [ ] Maintenance: Essential €39/mo, Premium €59/mo with full descriptions
- [ ] Free consultation — make clear everywhere
- [ ] Accessibility: UserWay widget free in all plans, full audit as €40 add-on
- [ ] Revisions: Starter 1 round, Business 2 rounds, Professional 3 rounds
- [ ] Pop-up: included in Professional, €40 add-on for others

---

## Current Sprint: Mar 31, 2026

### Fix homepage example cards
- [ ] Replace iframe-based HomepageTemplateThumb with static card mockups for all 3 featured templates
- [ ] Ensure Bella Salon and Dr. Elara Dental have clear hero imagery like Nomad Coffee

### Remove e-commerce/shop references
- [ ] Home.tsx Enterprise: remove e-commerce from feature text
- [ ] Services.tsx Enterprise: remove e-commerce from feature text
- [ ] Pricing.tsx Enterprise: remove e-commerce from feature text + FAQ
- [ ] Olio Deli card: Shop -> Menu/Products, Shop Now -> Browse Products

### Remove calendar references from mini-sites
- [ ] Check pulse-gym.html Schedule references (keep - this is class schedule, not calendar widget)
- [ ] Check serenity-yoga.html Schedule references (keep - this is class schedule, not calendar widget)

### Rename Templates to Examples everywhere
- [ ] Layout.tsx nav link
- [ ] Templates.tsx page hero text
- [ ] Templates.tsx waMessage strings
- [ ] Templates.tsx hover text and copy
- [ ] Home.tsx any visible template references

### Full QA audit
- [ ] All 11 preview URLs load
- [ ] Industry filters work
- [ ] Modal and full preview flow
- [ ] No em/en dashes
- [ ] No emojis
- [ ] TypeScript 0 errors

---

## Blog SEO Fixes (Jul 2026)
- [x] Restaurant blog metaTitle: changed from "Restaurant Website Design Cyprus | ..." to "Why Cyprus Restaurants Need More Than Facebook | DM-Labs.io" (no longer competing with /web-design-restaurants-cyprus)
- [x] Restaurant blog pricing: updated €249/€399/€699 (Starter/Business/Premium) to €299/€749/€1,499 (Launch/Growth/Pro)
- [x] Restaurant blog CTA: changed from /contact to /web-design-restaurants-cyprus with "See Our Restaurant Packages" label
- [x] Added inbound link to /web-design-paphos from restaurant blog (mentions Paphos in Google search context)
- [x] Added inbound link to /web-design-cyprus from wix-vs-designer blog ("small business in Cyprus" sentence)
- [x] Added inbound link to /web-design-crete from Greece guide blog (Greek islands mention)
- [x] Added inbound link to /web-design-restaurants-cyprus from restaurant blog body text and CTA
- [x] Fixed old pricing in website-cost blog (EN): table row €299-€699 → €299-€1,499; package names updated
- [x] Fixed old pricing in nail salon blog (EN): metaDescription and body text €249 → €299
- [x] Fixed old pricing in yoga blog (EN): body text €249 → €299
- [x] Fixed old pricing in Greece guide blog (EN): table row and DM-Labs.io paragraph €299-€699 → €299-€1,499
- [x] Fixed old pricing in Greek website cost blog (WebsiteCostEl.tsx): section header €299-€699 → €299-€1.499; CTA text Starter/Business/Premium → Launch/Growth/Pro
- [x] Fixed old pricing in Greek nail salon blog (NailSalonEl.tsx): €299 Starter/€399 Business → €299 Launch/€749 Growth
- [x] Fixed old pricing in Greek Greece guide blog (WebDesignGreeceEl.tsx): table row €299-€699 → €299-€1.499; paragraph updated to Launch/Pro package names

## Full-page prerender — hard requirement (Jul 2026)

- [x] STOPGAP: Add ROUTE_FALLBACKS entries for restaurant blog, wix-vs-designer blog, greece guide blog with real internal links in static HTML
- [x] REAL FIX: Install Playwright and write scripts/prerender-full.mjs — starts production server, visits each route headlessly, waits for React hydration, saves full rendered DOM as route index.html
- [x] prerender-full.mjs must preserve all canonical/hreflang/og meta tags currently injected by prerender-meta.mjs (React useSEO hook writes them at render time; Playwright captures them)
- [ ] Retire prerender-meta.mjs and ROUTE_FALLBACKS entirely once full-DOM snapshot is in place — must not coexist as a fourth sync point
- [x] Update package.json build script: replace prerender-meta.mjs call with prerender-full.mjs
- [x] Verify every route's raw HTML (curl --no-js) contains full article body and all internal links before JS runs — confirmed: restaurant blog has 11,470 words, all location links present, no data-seo-fallback block
- [ ] Add as hard requirement to site redesign brief: every route's raw HTML must contain full real content (not a fallback snippet) before JavaScript runs

## v2.0 Redesign (Jul 22 2026)

### Phase 1: Assets
- [x] Encode dmlabshomepagevideo.mp4 with ffmpeg all-keyframe for scroll scrubbing
- [x] Upload hero video, logo, backgrounds, and decorative assets to CDN

### Phase 2: Design System
- [x] Replace index.css with v2.0 tokens (--ink, --mist, --cyan, --blue, --violet, --blush, --grad)
- [x] Add Satoshi (fontshare) and Space Mono (Google Fonts) to index.html
- [x] Sharp geometry: border-radius 0, --chamfer 14px, clip-path utilities
- [x] Glass panel component (.panel with gradient border, backdrop-filter)
- [x] Grain overlay (body::after, opacity .035)
- [x] Rectangular buttons (.btn-primary, .btn-ghost, Space Mono 11px)
- [x] .mono utility (Space Mono 11px, .2em, uppercase)
- [x] .grad-text utility with @supports fallback
- [x] .reveal animation (IntersectionObserver, translateY 26px)

### Phase 3: Layout and Nav
- [x] Rebuild Layout.tsx header (sharp, glass, Space Mono labels, new logo)
- [x] Update footer (Space Mono annotation, coordinates, WhatsApp)
- [x] Remove all "D&M Labs" from Layout.tsx
- [x] Update WhatsApp prefill text to "DM-Labs.io"
- [x] New OG image (logo + title overlay) - generated and deployed to /og-image.png

### Phase 4: Homepage
- [x] VideoScrollHero component (GSAP ScrollTrigger, currentTime scrubbing)
- [x] ProofBar ticker (Space Mono, availability/delivery/stack)
- [x] Capabilities glass panels
- [x] Four-up Work grid (2x2, 16:10, gap 2px, sharp, hover meta reveal)
- [x] Process horizontal pinned track (5 steps, DAY 01-DAY 14)
- [x] Team section (AI-leverage story)
- [x] Pricing section (no animation)
- [x] CTA section (full-bleed, magnetic button)
- [x] Remove: mesh gradients, duplicated team cards, stats row, industries grid

### Phase 5: Blog System
- [x] Blog desktop metaphor (icon grid, menu bar, dock)
- [x] Window chrome system (.win, title bar, dots, progress bar)
- [x] Post reading window (62-68ch, Satoshi 400 18px, 1.75 leading)
- [x] /blog/all plain list fallback page

### Phase 6: Other Pages
- [x] Services, Pricing, Contact, FAQ, Process, Templates pages updated
- [x] All 7 EN + 5 Greek location pages updated
- [x] All Greek main pages updated (HomeEl, ServicesEl, PricingEl, ContactEl, FAQEl, ProcessEl, BlogEl)

### Phase 7: Audit
- [x] Zero "D&M Labs" anywhere (27 files fixed)
- [x] Zero long em dashes anywhere (27 files fixed)
- [x] Zero rounded corners on rectangular surfaces (border-radius: 0 in design system)
- [x] Pricing unchanged (€299/€749/€1,499) - verified
- [x] prefers-reduced-motion: all animations disabled via CSS media query in index.css
- [x] Save checkpoint
