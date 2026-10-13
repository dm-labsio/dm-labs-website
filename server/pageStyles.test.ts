import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const src = resolve(import.meta.dirname, "../client/src");
const listed = readFileSync(join(src, "pageStyles.ts"), "utf8");

function resolveImport(from: string, spec: string): string | null {
  if (!spec.startsWith(".") && !spec.startsWith("@/")) return null;
  const base = spec.startsWith("@/")
    ? join(src, spec.slice(2))
    : resolve(dirname(from), spec);
  for (const candidate of [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    join(base, "index.tsx"),
    join(base, "index.ts"),
  ]) {
    if (existsSync(candidate) && /\.(tsx?|css)$/.test(candidate))
      return candidate;
  }
  return null;
}

/** Every stylesheet reachable from the app entry, through static and on-demand imports. */
function reachableStylesheets(): Set<string> {
  const seen = new Set<string>();
  const styles = new Set<string>();
  const queue = [join(src, "main.tsx")];
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    const code = readFileSync(file, "utf8");
    for (const [, spec] of code
      .matchAll(
        /(?:import|export)\s[^;]*?from\s+["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)|import\s+["']([^"']+)["']/g
      )
      .map(m => [m[0], m[1] ?? m[2] ?? m[3]])) {
      const target = resolveImport(file, spec);
      if (!target) continue;
      if (target.endsWith(".css")) styles.add(relative(src, target));
      else queue.push(target);
    }
  }
  return styles;
}

describe("stylesheet order", () => {
  it("loads every stylesheet the site uses up front, so the cascade never depends on page order", () => {
    const styles = reachableStylesheets();
    // The global stylesheet comes last (main.tsx); seasonal styles load with their on-demand layer.
    styles.delete("index.css");
    styles.delete("components/home/seasonal/HalloweenLayer.css");
    expect(styles.size).toBeGreaterThan(20);
    expect(
      [...styles].filter(path => !listed.includes(`import "./${path}";`))
    ).toEqual([]);
  });
});
