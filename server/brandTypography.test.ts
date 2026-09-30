import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, it, expect } from "vitest";
import { getRouteLanguage } from "../client/src/lib/routeLanguage";

const root = resolve(import.meta.dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf8");
const directory = "client/public/fonts/brand-v1/";
const manifest = JSON.parse(read(directory + "manifest.json"));

describe("Brand font delivery and route language", () => {
  it("ships valid, licensed WOFF2 files matching the glyph-verified font manifest", () => {
    expect(manifest.faces.map((f: {family: string}) => f.family)).toEqual(["Rubik", "Open Sans", "M PLUS Rounded 1c", "M PLUS Rounded 1c", "Fira Mono"]);
    for (const face of manifest.faces) {
      const bytes = readFileSync(resolve(root, directory, face.file));
      expect(bytes.subarray(0, 4).toString()).toBe("wOF2");
      expect(bytes.length).toBeLessThan(100_000);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(face.sha256);
      expect(face.missingGlyphs).toEqual([]);
    }
    for (const name of ["rubik", "opensans", "mplusrounded1c", "firamono"]) {
      expect(read(directory + name + "-OFL.txt")).toContain("SIL OPEN FONT LICENSE");
    }
  });
  it("references local faces, real weights and no legacy display compression", () => {
    const css = read("client/src/styles/typography.css");
    for (const face of manifest.faces) expect(css).toContain(face.file);
    expect(css).toContain("font-synthesis: none");
    expect(css).toContain("font-weight: 900");
    expect(css).toContain("font-weight: 800");
    expect(css).toContain("--font-micro: \"Open Sans\"");
    expect(read("client/index.html")).not.toContain("fonts.googleapis.com");
    expect(read("client/src/index.css")).not.toMatch(/Anybody|Commissioner|Heebo|font-variation-settings/);
    expect(existsSync(resolve(root, "client/src/components/EditorialFitLine.tsx"))).toBe(false);
  });
  it.each([
    ["/", "en"], ["/contact/", "en"], ["/el", "el"], ["/el/services/", "el"],
    ["/he", "he"], ["/he/contact/", "he"], ["/hello/", "en"], ["/elsewhere/", "en"],
  ])("sets %s to %s before first paint and in React, independently of stored preference", (path, expected) => {
    const html: Record<string, string> = {};
    runInNewContext(read("client/public/brand-locale.js"), {
      window: { location: { pathname: path } }, document: { documentElement: html },
      get localStorage() { throw new Error("Stored preference must not override the route"); },
    });
    expect(html.lang).toBe(expected);
    expect(html.dir).toBe(expected === "he" ? "rtl" : "ltr");
    expect(getRouteLanguage(path)).toBe(expected);
  });
});
