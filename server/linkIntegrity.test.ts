import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const tsx = resolve(projectRoot, "node_modules/.bin/tsx");

describe("Link integrity", () => {
  it("finds zero broken internal hrefs across client/src", () => {
    const output = execFileSync(tsx, ["scripts/check-link-integrity.ts"], {
      cwd: projectRoot,
      encoding: "utf8",
    });
    expect(output).toContain("Link integrity OK");
  });
});
