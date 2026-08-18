import { readFileSync, statSync } from "fs";
import { resolve } from "path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const socialCardPath = resolve(projectRoot, "client/public/social/dm-labs-website-social-card.png");
const indexHtml = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
const seoHook = readFileSync(resolve(projectRoot, "client/src/hooks/useSEO.ts"), "utf8");
const prerenderMeta = readFileSync(resolve(projectRoot, "scripts/prerender-meta.mjs"), "utf8");

const socialCardUrl = "https://dm-labs.io/social/dm-labs-website-social-card.png";
const socialCardAlt = "We build your website. Unbeatable prices. DM-Labs.io";

describe("social sharing card metadata", () => {
  it("ships the supplied social artwork as a 1200×675 public PNG below 1 MB", () => {
    const buffer = readFileSync(socialCardPath);

    expect(statSync(socialCardPath).size).toBeLessThan(1_000_000);
    expect(buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))).toBe(true);
    expect(buffer.readUInt32BE(16)).toBe(1200);
    expect(buffer.readUInt32BE(20)).toBe(675);
  });

  it("uses the same absolute image, dimensions, MIME type, and alt text in the static HTML shell", () => {
    expect(indexHtml).toContain(`<meta property="og:image" content="${socialCardUrl}" />`);
    expect(indexHtml).toContain(`<meta property="og:image:secure_url" content="${socialCardUrl}" />`);
    expect(indexHtml).toContain('<meta property="og:image:type" content="image/png" />');
    expect(indexHtml).toContain('<meta property="og:image:width" content="1200" />');
    expect(indexHtml).toContain('<meta property="og:image:height" content="675" />');
    expect(indexHtml).toContain(`<meta property="og:image:alt" content="${socialCardAlt}" />`);
    expect(indexHtml).toContain(`<meta name="twitter:image" content="${socialCardUrl}" />`);
    expect(indexHtml).toContain(`<meta name="twitter:image:alt" content="${socialCardAlt}" />`);
  });

  it("keeps the browser hook and prerender injector aligned with the static social-card metadata", () => {
    expect(seoHook).toContain(`const DEFAULT_OG_IMAGE = "${socialCardUrl}"`);
    expect(seoHook).toContain(`const DEFAULT_OG_IMAGE_ALT = "${socialCardAlt}"`);
    expect(prerenderMeta).toContain('const DEFAULT_OG_IMAGE = `${BASE_URL}/social/dm-labs-website-social-card.png`');
    expect(prerenderMeta).toContain(`const DEFAULT_OG_IMAGE_ALT = "${socialCardAlt}"`);
    expect(prerenderMeta).toContain('og:image:width" content="1200"');
    expect(prerenderMeta).toContain('og:image:height" content="675"');
    expect(prerenderMeta).toContain('twitter:image:alt" content="${DEFAULT_OG_IMAGE_ALT}"');
    expect(seoHook).not.toContain("https://dm-labs.io/og-image.png");
    expect(readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8")).not.toContain("https://dm-labs.io/og-image.png");
  });
});
