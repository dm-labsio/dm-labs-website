import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const table = readFileSync(resolve(root, "client/src/pageRoutes.ts"), "utf8");

function appRoutes() {
  const routes: Array<[string, string | null]> = [];
  const switchBlock = app.slice(
    app.indexOf("<Switch>"),
    app.indexOf("</Switch>")
  );
  for (const match of switchBlock.matchAll(
    /<Route path="([^"]+)"(?: component=\{(\w+)\})?\s*\/?>(.*)/g
  )) {
    const [, path, component, rest] = match;
    routes.push([
      path,
      component ?? (rest.includes("BrandCaseStudy") ? "BrandCaseStudy" : null),
    ]);
  }
  return routes;
}

describe("page code splitting", () => {
  it("lists every App.tsx route, in the same order, with the same page", () => {
    const block = table.slice(table.indexOf("export const PAGE_ROUTES"));
    const listed = [
      ...block.matchAll(/^ {2}\[\s*"([^"]+)",\s*(\w+),?\s*\],$/gm),
    ].map(([, path, page]) => [path, page === "null" ? null : page]);
    expect(listed).toEqual(appRoutes());
    expect(listed.length).toBeGreaterThan(100);
  });

  it("imports every page from the lazy table, never directly", () => {
    expect(app).not.toMatch(/^import \w+ from "\.\/pages\//m);
    expect(app).toContain('} from "./pageRoutes";');
    expect(app).toContain("<Router hook={useReadyLocation}>");
  });

  it("matches paths the way the router does", async () => {
    const pages = await import("../client/src/pageRoutes");
    expect(pages.pageFor("/")).toBe(pages.Home);
    expect(pages.pageFor("/services/")).toBe(pages.Services);
    expect(pages.pageFor("/SERVICES")).toBe(pages.Services);
    expect(pages.pageFor("/services/seo/")).toBe(pages.ServiceDetail);
    expect(pages.pageFor("/he/")).toBe(pages.HomeHe);
    expect(pages.pageFor("/he/services/seo/")).toBe(pages.SeoHe);
    expect(pages.pageFor("/el/services/seo/")).toBe(pages.ServiceDetailEl);
    expect(pages.pageFor("/blog/some-post/")).toBe(pages.BlogPost);
    expect(pages.pageFor("/templates/branding/away/")).toBe(
      pages.BrandCaseStudy
    );
    expect(pages.pageFor("/preview/bella-salon/")).toBe(pages.PreviewPage);
    expect(pages.pageFor("/cookie-policy/")).toBeNull();
    expect(pages.pageFor("/does-not-exist/")).toBe(pages.NotFound);
  });
});
