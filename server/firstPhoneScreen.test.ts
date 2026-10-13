import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("first phone screen", () => {
  it("shows the opening words of the full consent text in the phone cookie bar", () => {
    const banner = readSource("client/src/components/CookieBanner.tsx");
    const bodies = [...banner.matchAll(/ body: "([^"]+)",\n {4}short: "([^"]+)",/g)];
    expect(bodies).toHaveLength(3);
    for (const [, body, short] of bodies) {
      // The bar never rewords consent: it is the start of the same sentence.
      expect(body.startsWith(short.replace(/\.$/, ""))).toBe(true);
    }
    // Accept and Reject stay equal buttons; Manage still opens the full text.
    expect(banner).toContain("onClick={() => save(true)}>{t.acceptAll}");
    expect(banner).toContain("onClick={() => save(false)}>{t.reject}");
    expect(banner).toContain("onClick={openPrefs}>{t.manage}");
  });

  it("keeps the chat launcher off the first phone screen until the visitor scrolls", () => {
    const guide = readSource("client/src/components/chat/WebsiteGuide.tsx");
    const css = readSource("client/src/components/chat/WebsiteGuide.css");
    expect(guide).toContain('data-waiting={waiting ? "" : undefined}');
    expect(css).toMatch(/@media \(max-width: 767px\) \{\n {2}\.dm-chat-launcher\[data-waiting\]/);
  });
});
