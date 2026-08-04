import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(serverDirectory, "..");
const homeSource = readFileSync(resolve(projectDirectory, "client/src/pages/Home.tsx"), "utf8");
const greekHomeSource = readFileSync(resolve(projectDirectory, "client/src/pages/el/HomeEl.tsx"), "utf8");
const previewSource = readFileSync(resolve(projectDirectory, "client/src/pages/PreviewPage.tsx"), "utf8");

describe("homepage preview return paths", () => {
  it("opens English and Greek example cards in the in-app preview with explicit source paths", () => {
    expect(homeSource).toContain('href={`/preview/${tpl.id}?from=%2F`}');
    expect(greekHomeSource).toContain('href={`/preview/${tpl.id}?from=%2Fel%2F`}');
  });

  it("uses the passed source path for X close, Escape, error recovery, and browser back", () => {
    expect(previewSource).toContain('const DEFAULT_RETURN_PATH = "/templates/";');
    expect(previewSource).toContain('new URLSearchParams(window.location.search).get("from")');
    expect(previewSource).toContain('const returnPath = useMemo(getReturnPath, []);');
    expect(previewSource).toContain('navigate(returnPath);');
    expect(previewSource).toContain('aria-label="Close preview"');
  });

  it("rejects unsafe return destinations and keeps the templates page as the safe fallback", () => {
    expect(previewSource).toContain('!requestedPath.startsWith("/") || requestedPath.startsWith("//")');
    expect(previewSource).toContain('return DEFAULT_RETURN_PATH;');
  });
});
