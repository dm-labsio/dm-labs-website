import { workProjects, workCopy } from "../client/src/components/work/workData";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(serverDirectory, "..");
const cardSource = readFileSync(resolve(projectDirectory, "client/src/components/InteractiveExampleCard.tsx"), "utf8");

describe("website demo cards", () => {
  it("provides both portrait cover sizes and a real preview for every project", () => {
    for (const { id } of workProjects) {
      for (const width of [360, 600]) {
        expect(existsSync(resolve(projectDirectory, `client/public/media/examples/portraits/${id}-${width}.webp`))).toBe(true);
      }
      expect(existsSync(resolve(projectDirectory, `client/public/previews/${id}.html`))).toBe(true);
    }
  });

  it("has unique destinations and translated category names for every locale", () => {
    expect(new Set(workProjects.map(project => project.id)).size).toBe(workProjects.length);
    for (const project of workProjects) {
      for (const locale of ["en", "el", "he"] as const) {
        expect(workCopy[locale].categories[project.category].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps native keyboard navigation without per-pointer state updates", () => {
    expect(cardSource).toContain('aria-label={`${actionText}: ${title}`}');
    expect(cardSource).not.toContain("useState");
    expect(cardSource).toContain("href={href}");
  });
});
