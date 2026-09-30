import { describe, expect, it } from "vitest";
import { getActiveNavHref, getNavigation } from "../client/src/components/siteNavigation";

describe("Shared navigation destinations", () => {
  it.each(["en", "el", "he"] as const)("preserves the %s home and consultation destinations", language => {
    const prefix = language === "en" ? "" : `/${language}`;
    const links = getNavigation(language);
    expect(links[0].href).toBe(`${prefix}/`);
    expect(links.at(-1)?.href).toBe(`${prefix}/contact/`);
    expect(new Set(links.map(link => link.href)).size).toBe(links.length);
    expect(getActiveNavHref(`${prefix}/services/custom-design/`, language)).toBe(`${prefix}/services/`);
    expect(getActiveNavHref(`${prefix}/process`, language)).toBe(`${prefix}/process/`);
    expect(getActiveNavHref(`${prefix}/services-unrelated/`, language)).toBeUndefined();
  });
  it("does not offer a nonexistent Hebrew blog", () => {
    expect(getNavigation("he").some(link => link.href.includes("/blog"))).toBe(false);
  });
});
