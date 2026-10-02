# Greek and Hebrew copy audit: plan

Goal: every Greek and Hebrew page should read as if a native copywriter wrote it for that market, not as a translation of the English. Meaning, facts and commitments stay the same. Wording, sentence shape and idiom are free.

Scope: 33 Greek pages, 19 Hebrew pages, the shared parts every page uses, and the Google titles, descriptions and share previews. English stays as the reference (default, see "Open decisions").

All work happens on the `preview` branch. Nothing goes to `main` or production without the owner's explicit go-ahead.

## Step 0: Voice guide

`voice-guide.md` in this folder. Tone, form of address, phrases to avoid, fixed terms, search terms to keep. Every batch follows it.

## Step 1: Audit (read-only)

`audit-report.md` in this folder. Every Greek and Hebrew page rated:

- 🔴 wrong meaning or nonsense
- 🟠 robotic, word-for-word copy of the English
- 🟡 correct but dry or generic
- 🟢 fine

Also flagged: English leftovers, the same thing called by different names, and facts that differ from English.

## Step 2: Rewrite in batches

| Batch | What | Languages |
|---|---|---|
| A | Homepage and shared parts: menu, footer, buttons, cookie banner, WhatsApp button, 404 page, team bios, accessibility labels | EL + HE |
| B | Pricing (including plan picker and currency notes), Contact (form labels, errors, success), FAQ | EL + HE |
| C | Services overview, the 9 service pages, Process | EL + HE |
| D | Examples page | EL + HE |
| E | Greek city pages (5), blog index and 8 posts | EL |
| F | Google titles, descriptions and share previews for every page | EL + HE |
| G | Terms, Privacy, Cookies: clearer wording only, no slang, legal meaning unchanged | EL + HE |

Each batch:

1. Rewrite from the meaning, following the voice guide.
2. Check facts against English: prices, plan names, scope, timelines, promises.
3. Write `batch-<x>-before-after.md` with an English back-translation of every new line.
4. Run type check, tests, link check and full build. Take phone-size screenshots to catch long Greek words, Hebrew right-to-left problems and labels that don't fit.
5. Push to `preview`. The owner reviews on a phone. Fix, then move to the next batch.

Batch A is the voice checkpoint: nothing else starts until the owner is happy with how the homepage sounds.

## Step 3: Final sweep and release

- One consistency pass across the whole site: same terms and button labels everywhere.
- Suggested: a native Greek reader spends 20 minutes on the homepage and pricing.
- Full checks again.
- Release to `main` only when the owner says so.

## Open decisions

Defaults in use because the owner had not chosen yet. Either can change at any batch.

1. Greek form of address: polite plural "εσείς", written warmer. Alternative: casual "εσύ".
2. English: unchanged. Alternative: the same tone lift in English so all three languages share one personality.
