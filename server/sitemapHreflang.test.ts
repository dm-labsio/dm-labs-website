import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const read = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

const sitemap = read("client/public/sitemap.xml");
const seoRoutes = read("client/src/lib/seoRoutes.ts");

type Entry = { loc: string; alts: Record<string, string> };

const entries: Entry[] = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  loc: block.match(/<loc>https:\/\/dm-labs\.io([^<]*)<\/loc>/)![1],
  alts: Object.fromEntries(
    [...block.matchAll(/hreflang="([^"]+)" href="https:\/\/dm-labs\.io([^"]*)"/g)].map(m => [m[1], m[2]]),
  ),
}));

const byLoc = new Map(entries.map(entry => [entry.loc, entry]));
const withTrailingSlash = (path: string) => (path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`);

function parsePathMap(exportName: string): Record<string, string> {
  const block = seoRoutes.match(new RegExp(`export const ${exportName}[^{]*\\{([\\s\\S]*?)\\n\\};`))![1];
  return Object.fromEntries(
    [...block.matchAll(/"([^"]+)":\s*(?:"([^"]+)"|null)/g)]
      .filter(match => match[2])
      .map(match => [match[1], match[2]]),
  );
}

describe("sitemap hreflang", () => {
  it("declares every alternate reciprocally, so Google cannot discard the cluster", () => {
    const problems: string[] = [];

    for (const entry of entries) {
      for (const [lang, target] of Object.entries(entry.alts)) {
        if (lang === "x-default") continue;

        const targetEntry = byLoc.get(target);
        if (!targetEntry) {
          problems.push(`${entry.loc} -> ${lang} ${target} (target missing from sitemap)`);
          continue;
        }
        if (!Object.values(targetEntry.alts).includes(entry.loc)) {
          problems.push(`${entry.loc} -> ${lang} ${target} (target does not link back)`);
        }
      }
    }

    expect(problems).toEqual([]);
  });

  it("gives every page with a real Hebrew translation the same he/he-IL alternates the <head> emits", () => {
    const enToHe = parsePathMap("EN_TO_HE_PATHS");
    const missing: string[] = [];

    for (const [enPath, hePath] of Object.entries(enToHe)) {
      const heLoc = withTrailingSlash(hePath);
      const enLoc = withTrailingSlash(enPath);
      const elLoc = enLoc === "/" ? "/el/" : `/el${enLoc}`;

      for (const loc of [enLoc, elLoc, heLoc]) {
        const entry = byLoc.get(loc);
        if (!entry) {
          missing.push(`${loc} (absent from sitemap)`);
          continue;
        }
        if (entry.alts.he !== heLoc) missing.push(`${loc} (he alternate should be ${heLoc}, got ${entry.alts.he ?? "none"})`);
        if (entry.alts["he-IL"] !== heLoc) missing.push(`${loc} (he-IL alternate should be ${heLoc}, got ${entry.alts["he-IL"] ?? "none"})`);
      }
    }

    expect(missing).toEqual([]);
  });

  it("never points an alternate at a URL that is not itself a listed, crawlable page", () => {
    const dangling = entries.flatMap(entry =>
      Object.values(entry.alts)
        .filter(target => !byLoc.has(target))
        .map(target => `${entry.loc} -> ${target}`),
    );

    expect(dangling).toEqual([]);
  });
});
