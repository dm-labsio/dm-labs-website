import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path: string) => readFileSync(join(projectRoot, path), "utf8");
const englishTerms = read("client/src/pages/Terms.tsx");
const greekTerms = read("client/src/pages/el/TermsEl.tsx");

function count(source: string, tag: "h2" | "h3") {
  return (source.match(new RegExp(`<${tag}\\b`, "g")) ?? []).length;
}

function words(source: string) {
  return (source.match(/[\p{L}\p{N}]+/gu) ?? []).length;
}

describe("Greek Terms of Service parity", () => {
  it("matches the English legal structure", () => {
    expect(count(englishTerms, "h2")).toBe(16);
    expect(count(greekTerms, "h2")).toBe(16);
    expect(count(englishTerms, "h3")).toBe(3);
    expect(count(greekTerms, "h3")).toBe(3);
    expect(greekTerms).toContain("7. Τι συμβαίνει όταν λήξει ένα πλάνο");
    expect(greekTerms).toContain("Τελευταία ενημέρωση: 19 Αυγούστου 2026");
  });

  it("retains the English legal timeframes and monetary values", () => {
    for (const value of ["€299", "€80", "€45", "€25", "€50", "€60", "14", "30", "45", "4", "7"]) {
      expect(englishTerms).toContain(value);
      expect(greekTerms).toContain(value);
    }
  });

  it("is a full Greek translation rather than the former short form", () => {
    expect(words(greekTerms)).toBeGreaterThanOrEqual(Math.floor(words(englishTerms) * 0.7));
    expect(greekTerms).not.toContain("Χρησιμοποιώντας την ιστοσελίδα dm-labs.io, αποδέχεστε τους παρακάτω όρους χρήσης.");
  });

  it("keeps both legal documents immediately visible without reveal animation", () => {
    expect(englishTerms).not.toContain("AnimateIn");
    expect(greekTerms).not.toContain("AnimateIn");
  });
});
