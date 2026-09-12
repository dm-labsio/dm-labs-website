/**
 * Static link-integrity check.
 *
 * Scans every internal href emitted by client/src (both plain string hrefs
 * and template-literal hrefs) and fails if any of them:
 *   1. lacks a trailing slash on a directory-style internal URL,
 *   2. leaks an un-interpolated template artifact (a literal "${" or a bare
 *      "$" as the whole path) into the rendered markup, or
 *   3. is a fully static path that isn't a real route, a known redirect
 *      source, or a static asset.
 *
 * Route truth comes directly from server/_core/vite.ts (STATIC_ROUTES,
 * DYNAMIC_PATTERNS, VALID_PREVIEW_IDS, isKnownRoute, REDIRECTS) so this
 * check can never drift from what the production server actually serves.
 *
 * Run directly: `tsx scripts/check-link-integrity.ts`
 * Wired into `pnpm build` so a broken internal link fails the build.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DYNAMIC_PATTERNS,
  REDIRECTS,
  STATIC_ROUTES,
  VALID_PREVIEW_IDS,
  isKnownRoute,
} from "../server/_core/vite";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC_DIR = join(ROOT, "client", "src");

const ASSET_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".svg", ".ico", ".webp", ".gif", ".avif",
  ".xml", ".txt", ".pdf", ".json", ".webmanifest", ".html", ".css", ".js",
]);

// Non-route static mounts that are legitimately fetched/linked directly
// (not app routes, so they're exempt from the trailing-slash + route rules).
const STATIC_MOUNT_PREFIXES = ["/media/", "/social/", "/previews/"];

type Finding = { file: string; href: string; reason: string };

function collectSourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...collectSourceFiles(full));
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

function isExternalOrNonRoute(href: string): boolean {
  if (href === "" || href === "#") return true;
  if (href.startsWith("#")) return true; // in-page anchor
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return true; // http:, mailto:, tel:, https:, whatsapp:
  if (href.startsWith("//")) return true; // protocol-relative external
  if (!href.startsWith("/")) return true; // relative, not site-internal
  return false;
}

function stripQueryAndHash(path: string): string {
  return path.split("?")[0].split("#")[0];
}

function hasKnownAssetExtension(path: string): boolean {
  return ASSET_EXTENSIONS.has(extname(path).toLowerCase());
}

function checkHref(file: string, rawHref: string, isTemplate: boolean, findings: Finding[]) {
  if (isExternalOrNonRoute(rawHref)) return;

  // Rule 2: an un-interpolated template artifact leaking into a plain string href.
  if (!isTemplate && (rawHref.includes("${") || rawHref === "$")) {
    findings.push({ file, href: rawHref, reason: "unrendered template literal artifact" });
    return;
  }

  if (isTemplate) {
    // For a template literal, validate the STATIC suffix after the last
    // interpolation — that's the part guaranteed not to depend on runtime data.
    const lastInterpolationEnd = rawHref.lastIndexOf("}");
    const suffix = lastInterpolationEnd === -1 ? rawHref : rawHref.slice(lastInterpolationEnd + 1);
    const suffixPath = stripQueryAndHash(suffix);
    if (suffixPath !== "" && !suffixPath.startsWith("/")) {
      findings.push({ file, href: rawHref, reason: "dynamic href is missing a trailing slash before its query/hash" });
    } else if (suffixPath === "" && suffix !== "" && !suffix.startsWith("?") && !suffix.startsWith("#")) {
      findings.push({ file, href: rawHref, reason: "dynamic href has no trailing slash" });
    } else if (suffixPath === "" && suffix === "") {
      findings.push({ file, href: rawHref, reason: "dynamic href has no trailing slash" });
    }
    return; // Full existence check isn't possible for interpolated segments.
  }

  const path = stripQueryAndHash(rawHref);

  // Rule 1: directory-style internal URL must end in "/".
  if (path !== "/" && !hasKnownAssetExtension(path) && !path.endsWith("/")) {
    findings.push({ file, href: rawHref, reason: "missing trailing slash" });
    return;
  }

  // Rule 3: fully static path must resolve to a real route, a known static
  // mount, or a known redirect source.
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  if (hasKnownAssetExtension(path)) return;
  if (STATIC_MOUNT_PREFIXES.some((prefix) => path.startsWith(prefix))) return;
  if (isKnownRoute(normalized)) return;
  if (Object.prototype.hasOwnProperty.call(REDIRECTS, normalized)) return;

  findings.push({ file, href: rawHref, reason: "not a known route, static mount, or redirect source" });
}

function main() {
  const files = collectSourceFiles(SRC_DIR);
  const findings: Finding[] = [];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const relPath = relative(ROOT, file);
    const staticRe = /href="([^"]*)"/g;
    const templateRe = /href=\{`([^`]*)`\}/g;
    let match: RegExpExecArray | null;
    while ((match = staticRe.exec(source))) {
      checkHref(relPath, match[1], false, findings);
    }
    while ((match = templateRe.exec(source))) {
      checkHref(relPath, match[1], true, findings);
    }
  }

  if (findings.length > 0) {
    console.error(`\nLink integrity check FAILED — ${findings.length} issue(s) found:\n`);
    for (const { file, href, reason } of findings) {
      console.error(`  ${file}\n    href: ${href}\n    ${reason}\n`);
    }
    console.error(`Checked ${files.length} source files against ${STATIC_ROUTES.size} static routes, ${DYNAMIC_PATTERNS.length} dynamic patterns, and ${VALID_PREVIEW_IDS.size} preview IDs.\n`);
    process.exit(1);
  }

  console.log(`Link integrity OK — checked ${files.length} source files, 0 issues found.`);
}

main();
