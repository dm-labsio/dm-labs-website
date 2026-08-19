import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const readSource = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("Hebrew shared shell and staged entry route", () => {
  it("exposes a substantive Hebrew homepage with self-canonical staging metadata", () => {
    const home = readSource("client/src/pages/he/HomeHe.tsx");

    expect(home).toContain('title: "DM-Labs.io | עיצוב אתרים מקצועי לעסקים"');
    expect(home).toContain("noindex: true");
    expect(home).toContain('url: "https://dm-labs.io/he/"');
    expect(home).toContain('inLanguage: "he"');
    expect(home).toContain("€299");
    expect(home).toContain("€749");
    expect(home).toContain("€1,499");
  });

  it("adds an accessible Hebrew selector and localized shared controls", () => {
    const layout = readSource("client/src/components/Layout.tsx");
    const cookieBanner = readSource("client/src/components/CookieBanner.tsx");
    const whatsapp = readSource("client/src/components/WhatsAppFloat.tsx");
    const accessibility = readSource("client/src/components/AccessibilityWidget.tsx");

    expect(layout).toContain("const FlagIL");
    expect(layout).toContain("const HE_NAV_LINKS");
    expect(layout).toContain('aria-label="מעבר לעברית"');
    expect(layout).toContain("getHebrewLanguageTogglePath");
    expect(cookieBanner).toContain("he: {");
    expect(whatsapp).toContain("const WA_HE");
    expect(accessibility).toContain("אפשרויות נגישות");
  });

  it("keeps the Hebrew staging route real while protecting unknown child paths with a noindex 404", () => {
    const app = readSource("client/src/App.tsx");
    const prerender = readSource("scripts/prerender-full.mjs");
    const serverRoutes = readSource("server/_core/vite.ts");
    const notFound = readSource("client/src/pages/NotFound.tsx");

    expect(app).toContain('<Route path="/he" component={HomeHe} />');
    expect(prerender).toContain('"/he"');
    expect(serverRoutes).toContain('"/he"');
    expect(serverRoutes).toContain("הדף לא נמצא | DM-Labs.io");
    expect(notFound).toContain("הדף לא נמצא");
    expect(app).toContain('<Route path="/he/services" component={ServicesHe} />');
    expect(app).not.toContain('path="/he/blog"');
  });
});
