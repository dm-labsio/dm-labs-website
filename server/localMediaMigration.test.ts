import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

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
const mediaFiles = collectFiles(mediaRoot);

describe("GitHub-backed static media migration", () => {
  it("stores every migrated file as a referenced WebP below the one-megabyte checkpoint cap", () => {
    expect(mediaFiles).toHaveLength(116);

    const mediaReferences = new Set(clientSource.match(/\/media\/[A-Za-z0-9._/-]+\.webp/g) ?? []);
    expect(mediaReferences.size).toBe(116);

    for (const mediaFile of mediaFiles) {
      expect(extname(mediaFile)).toBe(".webp");
      expect(statSync(mediaFile).size).toBeLessThan(1_000_000);
      const publicPath = `/${relative(resolve(clientRoot, "public"), mediaFile).replaceAll("\\", "/")}`;
      expect(mediaReferences.has(publicPath), publicPath).toBe(true);
    }

    for (const mediaReference of mediaReferences) {
      expect(existsSync(resolve(clientRoot, "public", mediaReference.slice(1))), mediaReference).toBe(true);
    }
  });

  it("removes every migrated image host, retired storage route, and broken dormant Clinic 3 object", () => {
    expect(clientSource).not.toContain("private-us-east-1.manuscdn.com");
    expect(clientSource).not.toContain("cloudfront.net");
    expect(clientSource).not.toContain("gSjiYlaDNuHSgRBB.jpg");
    expect(repositorySource).not.toContain(["/manus", "storage/"].join("-"));
  });

  it("uses the four Vercel Blob MP4 videos and leaves 79 Unsplash image objects unchanged in scope", () => {
    const blobVideoReferences = new Set(
      clientSource.match(/https:\/\/zcqnftsc7hsxgrnx\.public\.blob\.vercel-storage\.com\/[^\s"'()]+\.mp4/g) ?? [],
    );
    expect(blobVideoReferences).toEqual(new Set([
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm-labs-hero-tunnel-scrub_89732dad.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm-labs-mobile-hero-scrub-fluid_658e00fd.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dr-elara-root-canal-treatment_dc985187.mp4",
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/nomad-coffee-scroll-video-all-intra_ab16c684.mp4",
    ]));

    const unsplashObjects = new Set(
      [...clientSource.matchAll(/https:\/\/images\.unsplash\.com\/([^?\s"'()]+)/g)].map(
        match => match[1],
      ),
    );
    expect(unsplashObjects.size).toBe(79);
  });
});
