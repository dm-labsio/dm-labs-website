import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SERVICE_CARD_MEDIA } from "../client/src/components/home/serviceCardContent";
import { HOME_INTRODUCTION_MEDIA } from "../client/src/components/home/homeIntroductionContent";
import { CAPABILITY_IDS } from "../client/src/components/studio/studioCopy";

const projectRoot = resolve(import.meta.dirname, "..");
const clientRoot = resolve(projectRoot, "client");
const mediaRoot = resolve(clientRoot, "public/media");

const textExtensions = new Set([".css", ".html", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);

function collectFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = resolve(directory, entry.name);
    return entry.isDirectory() ? collectFiles(fullPath) : [fullPath];
  });
}

const clientTextFiles = collectFiles(clientRoot).filter(path => {
  if (path.startsWith(mediaRoot)) return false;
  return textExtensions.has(extname(path).toLowerCase());
});
const clientSource = clientTextFiles.map(path => readFileSync(path, "utf8")).join("\n");
const repositorySource = [
  clientSource,
  ...[resolve(projectRoot, "server"), resolve(projectRoot, "scripts")].flatMap(directory =>
    collectFiles(directory)
      .filter(path => textExtensions.has(extname(path).toLowerCase()))
      .map(path => readFileSync(path, "utf8")),
  ),
  readFileSync(resolve(projectRoot, "vite.config.ts"), "utf8"),
].join("\n");
const allMediaFiles = collectFiles(mediaRoot);
const mediaFiles = allMediaFiles.filter(path => extname(path) === ".webp");
const serviceMarkAssets = CAPABILITY_IDS.flatMap(id => [160, 320].map(size => `/media/brand-refresh/v2/service-${id}-${size}.webp`));

describe("GitHub-backed static media migration", () => {
  it("keeps compressed introduction and service-card videos within their playback budgets", () => {
    const videos = allMediaFiles.filter(path => extname(path) !== ".webp");
    const caseStudyVideo = "/media/case-studies/dr-george/walkthrough.mp4";
    const expected = [HOME_INTRODUCTION_MEDIA.desktop, HOME_INTRODUCTION_MEDIA.mobile, ...SERVICE_CARD_MEDIA.map(media => media.video), caseStudyVideo];
    expect(videos.map(path => `/${relative(resolve(clientRoot, "public"), path)}`).sort()).toEqual([...expected].sort());
    for (const [path, budget] of [[expected[0], 7_000_000], [expected[1], 3_500_000], ...SERVICE_CARD_MEDIA.map(media => [media.video, 450_000] as const), [caseStudyVideo, 5_000_000]] as const) {
      const file = readFileSync(resolve(clientRoot, "public", path.slice(1)));
      expect(file.length).toBeLessThan(budget);
      const atoms: string[] = [];
      for (let offset = 0; offset + 8 <= file.length;) {
        const size = file.readUInt32BE(offset);
        atoms.push(file.toString("ascii", offset + 4, offset + 8));
        if (!size) break;
        offset += size;
      }
      expect(atoms).toContain("moov");
      expect(atoms).toContain("mdat");
      expect(atoms.indexOf("moov")).toBeLessThan(atoms.indexOf("mdat"));
    }
  });

  it("keeps current and retired versioned WebP assets below the one-megabyte checkpoint cap", () => {
    expect(mediaFiles).toHaveLength(169 + serviceMarkAssets.length);

    const mediaReferences = new Set([...(clientSource.match(/\/media\/[A-Za-z0-9._/-]+\.webp/g) ?? []), ...serviceMarkAssets]);
    expect(mediaReferences.size).toBe(164 + serviceMarkAssets.length);
    const retiredHeroAssets = new Set([
      "/media/cloudfront/services-hero-bg-bfPgb525LqzgdU7JVYn89M.webp",
      "/media/hero/dm-labs-hero-tunnel-opening-poster_7b05ee6d.webp",
      "/media/hero/dm-labs-mobile-hero-opening-poster_6fc35873.webp",
      "/media/hero/hebrew-mobile-hero-sprite.webp",
      "/media/hero/hebrew-mobile-hero-static-frame.webp",
    ]);

    for (const mediaFile of mediaFiles) {
      expect(extname(mediaFile)).toBe(".webp");
      expect(statSync(mediaFile).size).toBeLessThan(1_000_000);
      const publicPath = `/${relative(resolve(clientRoot, "public"), mediaFile).replaceAll("\\", "/")}`;
      expect(mediaReferences.has(publicPath) || retiredHeroAssets.has(publicPath), publicPath).toBe(true);
    }

    for (const mediaReference of mediaReferences) {
      expect(existsSync(resolve(clientRoot, "public", mediaReference.slice(1))), mediaReference).toBe(true);
    }
    for (const size of [160, 320]) {
      const bytes = serviceMarkAssets.filter(path => path.endsWith(`-${size}.webp`))
        .reduce((total, path) => total + statSync(resolve(clientRoot, "public", path.slice(1))).size, 0);
      expect(bytes).toBeLessThan(size === 160 ? 120_000 : 330_000);
    }
  });

  it("removes every migrated image host, retired storage route, and broken dormant Clinic 3 object", () => {
    expect(clientSource).not.toContain("private-us-east-1.manuscdn.com");
    expect(clientSource).not.toContain("cloudfront.net");
    expect(clientSource).not.toContain("gSjiYlaDNuHSgRBB.jpg");
    expect(repositorySource).not.toContain(["/manus", "storage/"].join("-"));
  });

  it("preserves the remaining demo and seven cinematic Blob videos after curating the example collection", () => {
    const blobVideoReferences = new Set(
      clientSource.match(/https:\/\/zcqnftsc7hsxgrnx\.public\.blob\.vercel-storage\.com\/[^\s"'()]+\.mp4/g) ?? [],
    );
    expect(blobVideoReferences).toEqual(new Set([
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dr-elara-root-canal-treatment_dc985187.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_futuristic_conversation_animation.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_futuristic_digitalflow_animation.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_futuristic_herobackground_animation.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_hightech_gallery_animation.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_premium_technology_animation.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/futuristic_editorial_animation_from_this_exact_image.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/premium_growth_animation_from_this_exact_image.mp4",
    ]));

    const unsplashObjects = new Set(
      [...clientSource.matchAll(/https:\/\/images\.unsplash\.com\/([^?\s"'()]+)/g)].map(
        match => match[1],
      ),
    );
    // The curated collection retains only the image objects still used by the site.
    // Nomad now uses original local imagery instead of nine stock objects.
    expect(unsplashObjects.size).toBe(52);
  });
});
