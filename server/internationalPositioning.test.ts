import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const countries = /\b(?:Cyprus|Greece|Israel|Cypriot|Israeli)\b|Κ[ύυ]πρ[\p{L}]*|Ελλάδ[\p{L}]*|Ισραήλ|(?<![א-ת])(?:[בלמ]?קפריסין|[בלמ]?יוון|[בלמ]?ישראל)(?![א-ת])/iu;
function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]);
}
function withoutTechnicalReferences(text: string) {
  // Preserve existing indexed URLs, asset names and internal IDs; these are not marketing copy.
  return text.replace(/(?:https?:\/\/|\/)[^\s"'<>`]+|[\w-]+-(?:cyprus|greece|israel)[\w-]*/gi, "");
}

describe("International positioning", () => {
  it("uses the approved natural Hebrew homepage headline", () => {
    const home = readFileSync(resolve(root, "client/src/pages/he/HomeHe.tsx"), "utf8");
    expect(home).toContain(">בונים לכם אתר שיביא יותר לקוחות</h1>");
    expect(home).not.toContain("סוכנות האתרים שנבנתה");
  });

  it("keeps countries out of customer-facing copy and metadata in every locale", () => {
    const violations: string[] = [];
    const paths = [...files(resolve(root, "client/src")).filter(p => /\.(tsx?|jsx?)$/.test(p)), resolve(root, "scripts/prerender-meta.mjs")];
    for (const file of paths) {
      const source = readFileSync(file, "utf8");
      const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith("tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
      function visit(node: ts.Node) {
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node)) {
          const text = withoutTechnicalReferences(node.getText(ast));
          if (countries.test(text)) violations.push(`${file}:${source.slice(0, node.getStart(ast)).split("\n").length}: ${text.slice(0, 160)}`);
        }
        ts.forEachChild(node, visit);
      }
      visit(ast);
    }
    expect(violations).toEqual([]);
  });

  it("also covers the static entry, AI summary, and standalone design previews", () => {
    const paths = [resolve(root, "client/index.html"), resolve(root, "client/public/llms.txt"), ...files(resolve(root, "client/public/previews")).filter(p => p.endsWith(".html"))];
    for (const file of paths) {
      const source = readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
      expect(withoutTechnicalReferences(source), file).not.toMatch(countries);
    }
  });
});
