import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const component = readFileSync(resolve(root, "client/src/components/CinematicBanner.tsx"), "utf8");
const layout = readFileSync(resolve(root, "client/src/components/Layout.tsx"), "utf8");

describe("cinematic banner delivery", () => {
  it("keeps decorative video out of the mobile, reduced-motion, and save-data paths", () => {
    expect(component).toContain("(prefers-reduced-motion: reduce)");
    expect(component).toContain("(min-width: 768px)");
    expect(component).toContain("network.connection?.saveData");
    expect(component).toContain("preload=\"auto\"");
    expect(component).toContain("muted");
    expect(component).toContain("loop");
    expect(component).toContain("playsInline");
    expect(component).toContain("src={videoSrc}");
    expect(component).toContain("IntersectionObserver");
    expect(component).toContain('rootMargin: "1200px 0px"');
  });

  it("maps all seven supplied videos to a language-neutral page family", () => {
    const suppliedUrls = [
      "futuristic_conversation_animation.mp4",
      "futuristic_digitalflow_animation.mp4",
      "futuristic_herobackground_animation.mp4",
      "hightech_gallery_animation.mp4",
      "premium_technology_animation.mp4",
      "futuristic_editorial_animation_from_this_exact_image.mp4",
      "premium_growth_animation_from_this_exact_image.mp4",
    ];
    const pageFamilies = ['"/"', '"/services"', '"/process"', '"/templates"', '"/pricing"', '"/faq"', '"/contact"'];

    suppliedUrls.forEach((url) => expect(layout).toContain(url));
    pageFamilies.forEach((route) => expect(layout).toContain(route));
    expect(layout).not.toContain('"/blog": {');
    expect(layout).toContain('"/faq": {');
    expect(layout).toContain('normalizedLocation.replace(/^\\/(?:el|he)(?=\\/|$)/, "") || "/"');
  });
});
