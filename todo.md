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
