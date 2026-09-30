import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import BrandLogo from "../client/src/components/BrandLogo";

describe("Supplied logo suite", () => {
  it.each([
    [false, "dm-labs-horizontal-small-flat-dark.svg", "9d33ad62ea0fa36991bbd81455c701bbea03004f03b5e7cc2d40becfba19507e"],
    [true, "dm-labs-horizontal-glass-dark.svg", "193805e87cc40069cef9ffc721fda12d74c5bcb8df15e6a634a92275960d64aa"],
  ] as const)("uses the exact approved vector for full=%s", (full, filename, checksum) => {
    const html = renderToStaticMarkup(createElement(BrandLogo, { full }));
    expect(html).toContain(`src="/brand/v1/${filename}"`);
    expect(html).toContain('alt="DM-labs.io"');
    expect(html).toContain('width="200" height="40"');
    const svg = readFileSync(new URL(`../client/public/brand/v1/${filename}`, import.meta.url));
    expect(createHash("sha256").update(svg).digest("hex")).toBe(checksum);
  });
});
