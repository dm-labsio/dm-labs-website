import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const staticServer = readFileSync(resolve(projectRoot, "server/_core/vite.ts"), "utf8");
const robots = readFileSync(resolve(projectRoot, "client/public/robots.txt"), "utf8");
const layout = readFileSync(resolve(projectRoot, "client/src/components/Layout.tsx"), "utf8");
const prerenderMeta = readFileSync(resolve(projectRoot, "scripts/prerender-meta.mjs"), "utf8");

describe("GSC 404 remediation and missing Greek translations", () => {
  it("keeps only the three verified GSC paths as permanent redirects", () => {
    expect(staticServer).toContain('"/blog/wix-vs-epaggelmatias-web-designer-kypros": "/el/blog/wix-vs-epaggelmatias-web-designer-kypros/"');
    expect(staticServer).toContain('"/el/web-design-paphos": "/el/web-design-cyprus/"');
    expect(staticServer).toContain('"/el/web-design-restaurants-cyprus": "/el/web-design-cyprus/"');
    expect(staticServer).not.toContain('"/cdn-cgi/l/email-protection":');
    expect(robots).toContain("Disallow: /cdn-cgi/");
  });

  it("sends missing-Greek visitor toggles to Greek Cyprus without manufacturing hreflang", () => {
    expect(layout).toContain("getGreekLanguageTogglePath(normalizedLocation)");
    const paphosMetadata = prerenderMeta.match(/path: "\/web-design-paphos"[\s\S]*?\n  \}/)?.[0] ?? "";
    const restaurantsMetadata = prerenderMeta.match(/path: "\/web-design-restaurants-cyprus"[\s\S]*?\n  \}/)?.[0] ?? "";
    expect(paphosMetadata).not.toContain("elPath:");
    expect(restaurantsMetadata).not.toContain("elPath:");
  });
});
