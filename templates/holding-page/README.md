# Project holding page

A single self-contained page to put in front of a client project whose environment
we've paused. One file, no build step, no dependencies, no network assets except
the Google Fonts stylesheet — drop `index.html` anywhere static and it works.

## Reusing it

Copy `index.html` into the new project and edit the `CONFIG` block near the top.
Nothing else needs to change.

```js
var CONFIG = {
  projectName: "דוראל מוניציפאל",   // shown under the headline; "" hides that line
  lang: "he",                       // starting language: "he" | "en" | "el"
  showLangSwitch: true,             // language chips under the card
  email:    "info@dm-labs.io",
  whatsapp: "35797472847",          // digits only, international, no "+"
  website:  "https://dm-labs.io",
  websiteLabel: "dm-labs.io"
};
```

Copy is in three languages (Hebrew RTL, English, Greek) in the `T` dictionary in
the second `<script>`. `dir` flips to `rtl` automatically for Hebrew.

## Deploying it on Vercel

The point is to swap what production serves **without touching the project's
`main` branch**, so the real site stays exactly as it is and restoring is one
setting.

1. Create an orphan branch in the project repo holding only this page plus a
   `vercel.json` (see below):

   ```
   git checkout --orphan holding
   git rm -rf .
   # add index.html + vercel.json
   git commit -m "Add holding page"
   git push -u origin holding
   ```

2. Vercel → Project → Settings → Git → **Production Branch** → `holding`.
3. Vercel → Project → Settings → Deployment Protection → enable
   **Vercel Authentication** for Preview deployments.

Result: the public production URL serves this page, while the real site stays
reachable at `<project>-git-main-<team>.vercel.app` for anyone logged into our
Vercel team. Restoring is Production Branch back to `main`.

`vercel.json` for the holding branch — it overrides whatever build the project
normally runs, so no framework or install step happens:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "buildCommand": null,
  "installCommand": null,
  "outputDirectory": ".",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

The rewrite matters: it means any deep link the client has bookmarked
(`/about`, `/calculator`, …) lands on the holding page instead of a 404.

## Notes

- `<meta name="robots" content="noindex, nofollow">` is set, so a paused project
  never gets indexed under this page.
- The logo is inlined as a base64 PNG (quantised to 128 colours, ~6 KB) taken
  from `client/public/dmlabs-logo.png`, alpha-trimmed to its bounding box. Whole
  file is ~31 KB.
- Brand tokens match `client/src/index.css`: base `#F6F6F4`, ink `#111315`,
  dark `#0F172A`, gradient `#5B8CFF → #6FE3FF → #8B5CFF`, Inter + Heebo.
- The primary button is brand dark rather than the gradient on purpose: white on
  `#5B8CFF` is 3.16:1, which fails WCAG AA for button-sized text. Every text node
  on the page was measured and passes AA in all three languages. The gradient is
  used for the top rule, the status dot and the ambient aura instead.
- Respects `prefers-reduced-motion`. No horizontal overflow at 320 / 390 / 768 /
  1440.
