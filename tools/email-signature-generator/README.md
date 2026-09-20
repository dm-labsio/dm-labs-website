# Email signature generator

A single-page tool that generates a table-based HTML email signature. Employees
fill in five fields, pick Hebrew or English, and copy the result straight into
Gmail or Outlook. The logo, brand colour, social icons and the links behind them
are hardcoded, so every signature in the company comes out identical.

One HTML file plus two icons. No build step, no dependencies.

## Where this came from

Built for Doral Municipal and deployed to Vercel directly from the CLI, so it
never existed in a repository — the only copy lived inside a single Vercel
deployment. These files were recovered from that deployment
(`doral-signature`, `dpl_BZbgXVbndYKgwNhMkadrKVxsZmKu`) so the tool survives
independently of it.

The recovered copy was verified, not assumed: rendering it and generating a
Hebrew signature produces output byte-identical to a signature generated from
the live site, once the host in the icon URLs is normalised.

## Reusing it for another client

Everything client-specific is in one block at the top of the `<script>`:

```js
const LOGO_URL  = 'https://….public.blob.vercel-storage.com/Doral/Doral_sign_gif.gif';
const LOGO_W    = 170;
const LOGO_H    = 60;
const SOCIAL    = [ { name:'LinkedIn', url:'…', icon: ORIGIN + '/linkedin.png' }, … ];
const BRAND_HEX = '#34535F';
const TABLE_W   = 450;
```

Below that, `buildHebrew()` and `buildEnglish()` are two separate table builders
(logo right / logo left). Change the layout in one without touching the other.
UI strings live in the `T` dictionary further down.

The default field values are the demo employee's details — replace them for a
new client.

## Two things to know before you deploy it

**The logo is not served from this project.** It sits in Vercel Blob storage
(`…public.blob.vercel-storage.com`), which is a separate resource. Deleting or
moving that blob breaks the logo in every signature already installed in every
employee's mail client, including in emails already sitting in other people's
inboxes. Signature images are fetched from the network each time a message is
opened, so changes there are retroactive, not just forward-looking.

**The social icons *are* served from this project**, at `/linkedin.png` and
`/facebook.png`. `ORIGIN` resolves to `location.origin` when the page is served
over http(s), falling back to `PROD_ORIGIN` otherwise. The same retroactive
caveat applies: if this project stops serving those two paths, every installed
signature shows broken-image placeholders.

If you ever replace what this project serves — a holding page, a redirect,
anything — decide deliberately what should happen to those two paths. Keeping
them served leaves existing signatures intact; removing them breaks them
visibly; swapping them for a 1×1 transparent PNG makes the icons disappear
cleanly without a broken-image box.

## Deploying

```
vercel deploy --prod
```

`vercel.json` contains only an alias so `/public/<file>` also resolves to
`/<file>`:

```json
{ "rewrites": [{ "source": "/public/:path*", "destination": "/:path*" }] }
```
