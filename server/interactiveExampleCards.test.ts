import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(serverDirectory, "..");
const homeSource = readFileSync(resolve(projectDirectory, "client/src/pages/Home.tsx"), "utf8");
const greekHomeSource = readFileSync(resolve(projectDirectory, "client/src/pages/el/HomeEl.tsx"), "utf8");
const cardSource = readFileSync(resolve(projectDirectory, "client/src/components/InteractiveExampleCard.tsx"), "utf8");

const expectedExamples = ["nomad-coffee", "bella-salon", "dr-elara-dental", "arcos-architecture"];

function featuredExampleIds(source: string) {
  const match = source.match(/const FEATURED_TEMPLATES = \[([\s\S]*?)\n\];/);
  return [...(match?.[1].matchAll(/id: "([^"]+)"/g) ?? [])].map((item) => item[1]);
}

describe("homepage interactive example cards", () => {
  it("uses exactly four existing examples in the English and Greek inspiration grids", () => {
    expect(featuredExampleIds(homeSource)).toEqual(expectedExamples);
    expect(featuredExampleIds(greekHomeSource)).toEqual(expectedExamples);
    expect(homeSource).toContain('grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4');
    expect(greekHomeSource).toContain('grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4');
  });

  it("keeps each card linked directly to its existing preview destination", () => {
    for (const preview of [
      "/previews/nomad-coffee.html",
      "/previews/bella-salon.html",
      "/previews/dr-elara-dental.html",
      "/previews/arcos-architecture.html",
    ]) {
      expect(homeSource).toContain(`previewUrl: "${preview}"`);
      expect(greekHomeSource).toContain(`previewUrl: "${preview}"`);
    }
    expect(homeSource).toContain('href={`/preview/${tpl.id}/?from=%2F`}');
    expect(greekHomeSource).toContain('href={`/preview/${tpl.id}/?from=%2Fel%2F`}');
  });

  it("keeps native keyboard navigation without per-pointer state updates", () => {
    expect(cardSource).toContain('aria-label={`${actionText}: ${title}`}');
    expect(cardSource).not.toContain("useState");
    expect(cardSource).toContain("href={href}");
  });
});
