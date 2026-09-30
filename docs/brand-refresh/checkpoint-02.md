# Checkpoint 02 — homepage sections without decorative icon capsules

28 September 2026. Branch: `codex/brand-refresh`. Preview only.

## Delivered in this checkpoint

- Shared service, process and industry sections for English, Greek and Hebrew homepages. Six service descriptions and five process milestones are retained per language.
- Open service rows and numbered process steps replace generic pictograms and icon containers. Decorative checks, quote symbols and message icons are removed from homepage trust, pricing and CTA content; text and links remain.
- Four supplied brand still lifes now illustrate restaurant, beauty, clinic and fitness design concepts. Each links to its relevant demo and preserves the originating language on return. These are illustrations, not client or project evidence.
- Eight new, versioned WebP renditions (480/800 px, 4:3, approximately 248 KiB combined), lazy loaded with responsive sources and explicit dimensions. Original masters and all previously deployed asset paths remain intact.
- Localized section introductions and an “Ask us anything” contact link. Existing service scope, pricing, hero and team content are retained.
- The link checker now validates the URL path separately from interpolated query values. Media inventory checks include all eight new files and continue checking references, existence and file-size limits.

## Verification

- TypeScript: passes.
- Existing regression suite: 138 tests across 28 files pass.
- Link integrity: 156 source files, zero issues.
- Build/prerender: 91 canonical pages, 11 demo previews and the static 404 generated; zero errors. The existing large-bundle warning remains.
- Browser checks: desktop service/process/gallery composition; phone text wrapping and Hebrew RTL ordering; no horizontal overflow in checked viewports, including 320 px. Six services and five steps present per locale. Responsive brand images load.
- Restaurant and fitness example links open their corresponding demos; closing returns to the originating English or Hebrew homepage. Localized service and contact destinations checked. No customer forms submitted.
- React review: static data is shared, list keys are stable, no added runtime dependency or animation listener; keyboard focus remains visible. New sections are immediately readable and do not depend on motion to reveal content.

## Remaining work

This is a bounded visual increment, not completion of the homepage package. The approved Rubik / M PLUS Rounded 1c / Open Sans / Fira Mono system still needs a deliberate site-wide migration. The homepage scrub replacement, motion/button treatments, shared shell, example-card treatment and icon cleanup on other page families remain tracked in the refresh plan.

Existing Hebrew homepage pricing scope differs from English in places (for example Growth page count). Reconcile against the approved offer during the pricing/locale task rather than silently changing commercial terms in this visual checkpoint.

Before publication, verify remote main and production identity; publish only the refresh branch. Record the resulting deployment URL and target in the workspace Preview-Deployment report after Vercel reports Ready.
