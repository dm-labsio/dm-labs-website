/** Runs against the DOM captured by the production prerender, not source strings. */
export function inspectSeoDocument(expectedUrl) {
  const errors = [];
  const expect = (condition, message) => { if (!condition) errors.push(message); };
  const normalize = value => value.normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
  const plain = value => { const el = document.createElement("div"); el.innerHTML = value; return el.textContent ?? ""; };
  const text = normalize(document.body.textContent ?? "");
  const path = new URL(expectedUrl).pathname;
  const locale = /^\/he\//.test(path) ? "he" : /^\/el\//.test(path) ? "el" : "en";
  const meta = key => {
    const tags = document.querySelectorAll(`meta[name="${key}"], meta[property="${key}"]`);
    expect(tags.length === 1 && !!tags[0]?.getAttribute("content"), `Missing or duplicate ${key}`);
    return tags[0]?.getAttribute("content") ?? "";
  };
  const title = document.title;
  expect(document.querySelectorAll("title").length === 1 && !!title, "Missing or duplicate title");
  const description = meta("description");
  expect(!/noindex|nosnippet/i.test(meta("robots")), "Indexable route disallows indexing or snippets");
  const canonical = [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.getAttribute("href"));
  expect(canonical.length === 1 && canonical[0] === expectedUrl, "Canonical disagrees with final production URL");
  expect(document.documentElement.lang === locale, "Wrong document language");
  expect((document.documentElement.dir || "ltr") === (locale === "he" ? "rtl" : "ltr"), "Wrong document direction");
  expect(document.querySelectorAll("h1").length === 1, "Expected one main heading");
  expect(meta("og:title") === title && meta("twitter:title") === title, "Sharing title differs from page title");
  expect(meta("og:description") === description && meta("twitter:description") === description, "Sharing description differs from page description");
  expect(meta("og:url") === expectedUrl, "Sharing URL differs from canonical");
  expect(meta("og:locale") === { en: "en_GB", el: "el_GR", he: "he_IL" }[locale], "Sharing locale differs from page language");
  const image = meta("og:image");
  expect(/^https:\/\//.test(image), "Sharing image must be absolute HTTPS");
  expect(meta("twitter:image") === image, "Twitter image differs from Open Graph");
  expect(meta("og:image:alt") === meta("twitter:image:alt"), "Sharing image descriptions differ");
  meta("twitter:card"); meta("og:type");
  const alternates = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(el => [el.getAttribute("hreflang"), el.getAttribute("href")]);
  expect(new Set(alternates.map(([lang]) => lang)).size === alternates.length, "Duplicate hreflang language");
  expect(alternates.some(([lang, href]) => lang === locale && href === expectedUrl), "Missing self hreflang");
  const images = [...document.querySelectorAll("img")];
  images.forEach(el => expect(el.hasAttribute("alt"), `Missing image alt: ${el.getAttribute("src")}`));
  const ids = [...document.querySelectorAll("[id]")].map(el => el.id);
  expect(new Set(ids).size === ids.length, "Duplicate element IDs");
  const nodes = [];
  const walk = value => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") { nodes.push(value); Object.values(value).forEach(walk); }
  };
  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try { walk(JSON.parse(script.textContent)); } catch { errors.push(`Invalid JSON-LD: ${script.id}`); }
  });
  const ofType = type => nodes.filter(node => node["@type"] === type);
  expect(ofType("WebSite").length === 1, "Expected one WebSite entity");
  expect(ofType("WebPage").some(node => node.url === expectedUrl && node.inLanguage === locale), "Missing localized WebPage entity");
  expect(ofType("Organization").some(node => node["@id"] === "https://dm-labs.io/#organization"), "Missing shared organization identity");
  expect(ofType("Review").length === 0 && ofType("AggregateRating").length === 0, "Unverified review markup is not allowed");
  expect(ofType("LocalBusiness").length === 0, "Regional service page must not invent a business location");
  expect(ofType("FAQPage").length <= 1, "Duplicate FAQPage markup");
  ofType("Question").forEach(node => {
    expect(node.name && text.includes(normalize(plain(node.name))), `FAQ question absent from content: ${node.name}`);
    const answer = node.acceptedAnswer;
    expect(answer?.["@type"] === "Answer" && answer.text && text.includes(normalize(plain(answer.text))), `FAQ answer differs from content: ${node.name}`);
  });
  const articleRoute = /^\/(?:(?:el|he)\/)?blog\/[^/]+\/$/.test(path);
  expect(ofType("BlogPosting").length === (articleRoute ? 1 : 0), "Article markup missing or leaked from another route");
  ofType("BlogPosting").forEach(node => {
    expect(normalize(node.headline) === normalize(document.querySelector("h1")?.textContent ?? ""), "Article headline differs from visible heading");
    expect(/^https:\/\//.test(node.image), "Article image must be absolute HTTPS");
    expect(node.inLanguage === locale, "Article language differs from page");
    expect(!!node.author && !!node.publisher && !!node.datePublished, "Article authorship/publication information missing");
    expect([...document.querySelectorAll("time[datetime]")].some(el => el.getAttribute("datetime") === node.datePublished), "Article publication date differs from visible date");
    expect(!node.dateModified || node.dateModified >= node.datePublished, "Article modification date predates publication");
  });
  if (/^\/(?:el\/|he\/)?(?:services\/[^/]+|web-design-[^/]+)\/$/.test(path)) expect(ofType("Service").some(node => node.url === expectedUrl), "Missing page-specific service entity");
  ofType("BreadcrumbList").forEach(node => {
    expect(node.itemListElement?.at(-1)?.item === expectedUrl, "Breadcrumb does not end at canonical");
    expect(node.itemListElement?.every((item, index) => item.position === index + 1), "Breadcrumb positions are not sequential");
  });
  const assets = new Set(images.map(el => el.getAttribute("src")).filter(Boolean));
  nodes.forEach(node => {
    for (const key of ["image", "logo", "thumbnailUrl", "contentUrl"]) if (typeof node[key] === "string") assets.add(node[key]);
    if (node["@type"] === "ImageObject" && node.url) assets.add(node.url);
  });
  assets.add(image);
  return { url: expectedUrl, title, description, locale, alternates, image, imageElements: images.length, faqAnswers: ofType("Question").length,
    schemaTypes: [...new Set(nodes.map(node => node["@type"]).filter(Boolean))],
    assets: [...assets], links: [...document.querySelectorAll("a[href]")].map(el => el.getAttribute("href")), errors };
}

export function validateSeoCollection(pages, sitemapUrls) {
  const errors = [];
  const byUrl = new Map(pages.map(page => [page.url, page]));
  for (const key of ["title", "description"]) {
    const seen = new Map();
    for (const page of pages) {
      if (seen.has(page[key])) errors.push(`Duplicate ${key}: ${seen.get(page[key])} and ${page.url}`);
      seen.set(page[key], page.url);
    }
  }
  for (const page of pages) {
    errors.push(...page.errors.map(error => `${page.url}: ${error}`));
    if (!sitemapUrls.includes(page.url)) errors.push(`Missing sitemap URL: ${page.url}`);
    for (const [locale, url] of page.alternates) {
      const target = byUrl.get(url);
      if (!target) errors.push(`Missing hreflang destination: ${page.url} -> ${url}`);
      else if (JSON.stringify([...target.alternates].sort()) !== JSON.stringify([...page.alternates].sort())) errors.push(`Non-reciprocal hreflang cluster: ${page.url} -> ${locale}`);
    }
  }
  for (const url of sitemapUrls) if (!byUrl.has(url)) errors.push(`Sitemap URL not prerendered: ${url}`);
  return errors;
}
