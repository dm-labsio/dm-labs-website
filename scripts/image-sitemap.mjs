const escapeXml = value =>
  value.replace(
    /[&<>"']/g,
    char =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]
  );
/** Generated from canonical page HTML. No unused uploads, decorative art, or noindex demos. */
export function createImageSitemap(pages) {
  const rows = pages.flatMap(page => {
    const images = [
      ...new Set(
        (page.contentImages ?? [])
          .flatMap(image => [image.src, ...image.variants])
          .filter(Boolean)
          .map(src => new URL(src, page.url).href)
      ),
    ].filter(src => {
      const url = new URL(src);
      return (
        url.origin === "https://dm-labs.io" &&
        /\.(?:png|jpe?g|webp|avif|gif|svg)$/i.test(url.pathname) &&
        !/\/brand\//.test(url.pathname)
      );
    });
    if (!images.length) return [];
    return [
      `  <url>\n    <loc>${escapeXml(page.url)}</loc>\n${images
        .slice(0, 1000)
        .map(
          src =>
            `    <image:image><image:loc>${escapeXml(src)}</image:loc></image:image>`
        )
        .join("\n")}\n  </url>`,
    ];
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${rows.join("\n")}\n</urlset>\n`;
}
