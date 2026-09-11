import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const component = readFileSync(resolve(root, "client/src/components/CinematicBanner.tsx"), "utf8");
const heroComponent = readFileSync(resolve(root, "client/src/components/CinematicHeroBackground.tsx"), "utf8");
const layout = readFileSync(resolve(root, "client/src/components/Layout.tsx"), "utf8");
const cinematicStyles = readFileSync(resolve(root, "client/src/index.css"), "utf8");
const prerender = readFileSync(resolve(root, "scripts/prerender-full.mjs"), "utf8");

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

  it("uses the five shared routes, matched Contact routes, and English/Greek Blog as protected Hero media", () => {
    const heroKinds = ["services", "process", "templates", "pricing", "faq"] as const;
    const pagesByLocale = [
      ["Services.tsx", "Process.tsx", "Templates.tsx", "Pricing.tsx", "FAQ.tsx"],
      ["el/ServicesEl.tsx", "el/ProcessEl.tsx", "el/TemplatesEl.tsx", "el/PricingEl.tsx", "el/FAQEl.tsx"],
      ["he/ServicesHe.tsx", "he/ProcessHe.tsx", "he/TemplatesHe.tsx", "he/PricingHe.tsx", "he/FAQHe.tsx"],
    ];

    pagesByLocale.forEach((pages) => pages.forEach((page, index) => {
      const source = readFileSync(resolve(root, "client/src/pages", page), "utf8");
      expect(source).toContain('className="cinematic-hero-surface');
      expect(source).toContain(`<CinematicHeroBackground kind="${heroKinds[index]}" />`);
    }));

    [...heroKinds, "contact", "blog"].forEach((kind) => expect(heroComponent).toContain(`${kind}: "https://`));
    ["Contact.tsx", "el/ContactEl.tsx", "he/ContactHe.tsx"].forEach((page) => {
      const source = readFileSync(resolve(root, "client/src/pages", page), "utf8");
      expect(source).toContain('className="cinematic-hero-surface');
      expect(source).toContain('<CinematicHeroBackground kind="contact" />');
    });
    ["Blog.tsx", "el/BlogEl.tsx"].forEach((page) => {
      const source = readFileSync(resolve(root, "client/src/pages", page), "utf8");
      expect(source).toContain('className="cinematic-hero-surface');
      expect(source).toContain('<CinematicHeroBackground kind="blog" />');
    });
    expect(heroComponent).toContain("network.connection?.saveData");
    expect(heroComponent).toContain("(min-width: 768px)");
    expect(heroComponent).toContain("IntersectionObserver");
    expect(heroComponent).toContain('rootMargin: "180px 0px"');
    expect(heroComponent).toContain("preload=\"auto\"");
    expect(prerender).toContain('locator(".cinematic-hero-media__video")');
    expect(prerender).toContain("videos.forEach((video) => video.remove())");
    expect(heroComponent).toContain('cinematic-hero-media--${kind}');
    expect(cinematicStyles).toContain(".cinematic-hero-media--process .cinematic-hero-media__video");
    expect(cinematicStyles).toContain(".cinematic-hero-media--templates .cinematic-hero-media__video");
    expect(cinematicStyles).toContain("transform: scale(1.28)");
    expect(cinematicStyles).toContain("opacity: .82");
    expect(cinematicStyles).toContain("brightness(1.06)");
  });

  it("keeps the approved homepage interlude and reserves the taller lower-page treatment for Contact", () => {
    expect(layout).toContain('languageNeutralPath === "/" || languageNeutralPath === "/contact"');
    expect(layout).toContain('tall={languageNeutralPath === "/contact"}');
    expect(cinematicStyles).toContain(".cinematic-banner--tall");
    expect(cinematicStyles).toContain("min-height: clamp(19rem, 28vw, 27rem)");
    expect(cinematicStyles).toContain(".cinematic-hero-media { display: none; }");
  });
});
