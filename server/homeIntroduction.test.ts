import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomeIntroductionVideo from "../client/src/components/home/HomeIntroductionVideo";
import { HOME_INTRODUCTION_MEDIA, introductionSource } from "../client/src/components/home/homeIntroductionContent";

describe("Homepage introduction video delivery", () => {
  it.each(["en", "el", "he"] as const)("keeps %s initial HTML free of video downloads and autoplay", language => {
    const html = renderToStaticMarkup(createElement(HomeIntroductionVideo, { language }));
    const video = html.match(/<video\b[^>]*>/)?.[0];
    expect(video).toBeDefined();
    expect(video).toContain('preload="none"');
    expect(video).toContain('aria-hidden="true"');
    expect(video).toContain(`poster="${HOME_INTRODUCTION_MEDIA.poster}"`);
    expect(video).not.toMatch(/\ssrc=|autoplay|\scontrols/);
    expect(html).not.toMatch(/<source\b|\.mp4/);
    expect(html).toContain(`dir="${language === "he" ? "rtl" : "ltr"}"`);
    expect(html).toContain('<button');
  });

  it("uses the smaller version for phones or a data-saving connection", () => {
    expect(introductionSource(false)).toBe(HOME_INTRODUCTION_MEDIA.desktop);
    expect(introductionSource(true)).toBe(HOME_INTRODUCTION_MEDIA.mobile);
    expect(introductionSource(false, true)).toBe(HOME_INTRODUCTION_MEDIA.mobile);
  });
});
