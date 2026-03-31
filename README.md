# D&M Labs — Agency Website

> **Live site:** [dm-labs.io](https://dm-labs.io)

The production codebase for the D&M Labs agency website. D&M Labs designs and builds professional, fast, and conversion-focused websites for businesses across Cyprus, Greece, Israel, and the UK — starting from €299.

This repository serves as a public showcase of the quality and technical approach we bring to every client project.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Build tool | Vite |
| Routing | Wouter |
| Animations | Framer Motion |
| Deployment | Manus (custom domain: dm-labs.io) |

---

## Project Structure

```
client/
  public/
    previews/       ← Mini-site HTML examples (Nomad Coffee, Bella Salon, etc.)
  src/
    pages/          ← Page-level components (Home, Services, Pricing, Blog, etc.)
    components/     ← Reusable UI components and layout
    hooks/          ← Custom hooks (useSEO, useScrollReveal, etc.)
    data/           ← Blog posts, service definitions, template data
    lib/            ← Utility helpers
    App.tsx         ← Routes and top-level layout
    index.css       ← Design tokens and global styles
```

---

## Features

- **Fully custom design** — no off-the-shelf templates; every section is hand-crafted
- **Mobile-first** — designed and tested on all screen sizes
- **SEO-ready** — dynamic canonical tags, per-page meta titles and descriptions, structured data
- **Live example previews** — interactive mini-site demos embedded directly in the browser
- **Performance-optimised** — lazy loading, code splitting, minimal dependencies
- **Accessibility** — WCAG-compliant focus management, ARIA labels, keyboard navigation

---

## Running Locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

Requires Node.js 18+ and pnpm.

---

## About D&M Labs

D&M Labs is a web design studio founded by Anastacia and Tom. We build websites that look great, load fast, and convert visitors into customers. Every project is delivered in 5–14 business days with full mobile optimisation and SEO foundations built in from day one.

[Get in touch](https://dm-labs.io/contact) · [See our work](https://dm-labs.io/examples) · [View pricing](https://dm-labs.io/pricing)

---

<sub>© D&M Labs · dm-labs.io</sub>
