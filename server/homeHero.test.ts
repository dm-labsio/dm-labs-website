import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomeHero from "../client/src/components/home/HomeHero";
import { HOME_HERO_COPY } from "../client/src/components/home/homeHeroContent";

describe("Homepage entry without JavaScript or media playback", () => {
  it.each(["en", "el", "he"] as const)("renders the complete %s offer and localized destinations in the initial HTML", language => {
    const html = renderToStaticMarkup(createElement(HomeHero, { language }));
    const copy = HOME_HERO_COPY[language];
    const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, "");
    expect(heading).toBe(`${copy.opening} ${copy.payoff}`);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain(`lang="${language}"`);
    expect(html).toContain(`dir="${language === "he" ? "rtl" : "ltr"}"`);
    expect(html).toContain(`href="${copy.contactHref}"`);
    expect(html).toContain(`href="${copy.examplesHref}"`);
    expect(html).toContain(copy.consultation);
    expect(html).not.toContain("home-hero-note");
    expect(html).toContain('alt=""');
    expect(html).not.toMatch(/<video|<canvas|hidden=""|aria-hidden="true"[^>]*>[^<]*<h1/);
  });
});
