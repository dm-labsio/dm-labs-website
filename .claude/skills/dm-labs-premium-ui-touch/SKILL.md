---
name: dm-labs-premium-ui-touch
description: "DM Labs' premium UI polish kit — the pass that makes a client site feel expensive. Use when building, reviewing or improving any web UI for a DM Labs client: animations and transitions, hover/press/focus states, easing and timing, carousels, tabs, galleries, sticky navs, mobile and touch feel (sticky hover, tap flash, 100vh, safe areas), RTL/Hebrew layouts, stress-testing components with worst-case content, choosing a UI library, toasts (Sonner), Apple-style motion, React Native/Expo animation, or Swift. Triggers on 'polish', 'make it feel premium', 'improve the animations', 'what could animate here', 'feels janky on my phone', 'review this UI', 'break this component', 'what's this effect called'."
---

# DM Labs Premium UI Touch

One entry point for the UI craft guides DM Labs uses on client sites. The
guides themselves are Emil Kowalski's design-engineering skills (MIT, see
`guides/LICENSE`); this file adds how DM Labs applies them.

## How to use this skill

1. Pick the guide(s) for the task from the table below.
2. Read the guide's `GUIDE.md` in full before writing or reviewing code. Load
   its supporting files (`RECIPES.md`, `AUDIT.md`, …) when the guide says to.
3. Each guide opens with an "Initial Response" section telling you to reply
   with a canned line. **Ignore those sections** — they are for when a guide
   is invoked on its own with no task. Here there is always a task: do it.
4. Apply the DM Labs house rules below on top of whatever the guide says.

| The task | Read |
| --- | --- |
| General polish pass, "make it feel premium", reviewing a page or component | `guides/emil-design-eng/GUIDE.md` (always start here for a review) |
| Building a new animation or transition | `guides/animate/GUIDE.md` + `guides/animate/RECIPES.md` |
| Reviewing existing motion code or a diff with animations | `guides/review-animations/GUIDE.md` + `STANDARDS.md` |
| Auditing all motion across a codebase, producing a plan | `guides/improve-animations/GUIDE.md` + `AUDIT.md` + `PLAN-TEMPLATE.md` |
| "What could be animated here?" (read-only proposals) | `guides/find-animation-opportunities/GUIDE.md` |
| Feels wrong on a phone, PWA, touch, carousels, sheets, full-screen layouts | `guides/mobile-native/GUIDE.md` |
| Gestures, springs, drag/swipe, materials, Apple-style feel | `guides/apple-design/GUIDE.md` |
| Stress-testing a component with long/empty/odd content | `guides/break-ui/GUIDE.md` + `CATALOG.md` |
| Choosing a library (toasts, charts, OTP, command menu, DnD, …) | `guides/pick-ui-library/GUIDE.md` |
| Several design variants to compare live (only when explicitly asked) | `guides/prototype/GUIDE.md` + `PICKER.md` |
| Naming an effect the client described vaguely | `guides/animation-vocabulary/GUIDE.md` |
| Sonner toasts | `guides/ask-sonner/GUIDE.md` + `API.md` |
| React Native / Expo motion | `guides/animate-expo/GUIDE.md` + `RECIPES.md` |
| Swift / iOS code | `guides/write-swift/GUIDE.md` |
| Animation performance questions | `guides/performance-cheatsheet.md` |

## DM Labs house rules

These come from real client passes (first used on the Doral Municipal home
page). They win over a guide where the two disagree.

**Scope and comparison**
- Work one page at a time, starting with the home page, and let the client QA
  it on a Vercel preview before rolling the same treatment to other pages.
- Put the work on its own branch; never on `main`.
- Keep page-specific polish in one stylesheet scoped under the page's root
  class (e.g. `pages/home-polish.css`, every selector prefixed `.home-focus`),
  so other pages are untouched and the diff is easy to compare.
- Don't re-indent whole files (e.g. wrapping a page in a new provider). If
  a change would, find a smaller route so the review diff shows only real
  changes.

**Before you change anything**
- Screenshot the page at desktop (1440×900) and phone (390×844) widths.
  Full-page captures can leave lazy images blank; check suspicious gaps with
  viewport screenshots before calling them bugs.
- List findings as a Before / After / Why table (the format
  `emil-design-eng` requires) and fix the ones that matter.

**Defaults that apply to every DM Labs site**
- Hover styles go behind `@media (hover: hover) and (pointer: fine)`; every
  pressable gets an `:active` press (scale 0.96–0.98, 100–160ms).
- `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation`
  on links and buttons.
- One ease-out curve for entrances across the page:
  `cubic-bezier(0.23, 1, 0.32, 1)`. Animate transform and opacity only, never
  padding/width/height.
- Tab and gallery swaps: no wait-for-exit (`AnimatePresence mode="wait"`
  doubles the delay). Fade the new content in over ~200–300ms, optionally from
  `blur(4–6px)`. Preload the next image on pointer-enter/focus.
- A sticky in-page nav uses one sliding indicator (translate + scaleX), stays
  on one line on phones and scrolls sideways, and re-measures after
  `document.fonts.ready`.
- Respect `prefers-reduced-motion`: keep fades, drop movement.
- `text-wrap: pretty` on body copy, `balance` on headings.

**RTL / Hebrew sites**
- No letter-spacing on Hebrew text; tracking that suits Latin caps pulls
  Hebrew letters apart. Use ~0.01–0.02em at most.
- "Forward" arrows point left (←). Nudge them with `translateX(-4px)`.
- `scrollLeft` is negative in RTL scroll containers; measure positions with
  `getBoundingClientRect()` relative to the container instead of trusting
  `offsetLeft`.

**Finishing**
- Run the repo's typecheck, build and tests, and Prettier on touched files
  (check `main` was already clean first so you don't reformat unrelated code).
- Re-screenshot desktop and phone, and click through every changed
  interaction (tabs, carousels, nav) in a headless browser, checking the
  console for errors.
- Push, wait for the Vercel preview, verify it serves the new build, and give
  the client both links: the preview and current production.
- Say plainly what could not be verified, especially anything that needs a
  real phone (the `mobile-native` guide explains why emulation isn't enough).
