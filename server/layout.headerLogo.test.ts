import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const layoutSource = readFileSync(
  resolve(process.cwd(), "client", "src", "components", "Layout.tsx"),
  "utf8",
);

describe("shared header logo", () => {
  it("uses the official responsive image asset with accessible alternative text", () => {
    expect(layoutSource).toContain('import dmLabsLogo from "@/assets/dmLabsLogo";');
    expect(layoutSource).toContain('src={dmLabsLogo}');
    expect(layoutSource).toContain('alt="DM-Labs.io"');
    expect(layoutSource).toContain('<HeaderBrandMark />');
  });
});
