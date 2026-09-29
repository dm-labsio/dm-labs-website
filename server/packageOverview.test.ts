import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PackageOverview, { PackageCards, CarePackageCards } from "../client/src/components/pricing/PackageOverview";
import PricingPage from "../client/src/components/pricing/PricingPage";
import { BUILD_PLANS, BUILD_PRICES, CARE_PLANS, pricingMoney } from "../client/src/components/pricing/pricingContent";
import { BUILD_ANCHORS, CARE_ANCHORS } from "../client/src/components/pricing/packageVisuals";
import HomeIndustryGallery, { IndustryDetails } from "../client/src/components/home/HomeIndustryGallery";
import { INDUSTRY_IDS, INDUSTRY_COPY, INDUSTRY_IMAGES, INDUSTRY_UI } from "../client/src/components/home/industryContent";

const locales = ["en", "el", "he"] as const;
const escape = (text: string) => renderToStaticMarkup(React.createElement(React.Fragment, null, text));

describe("Shared package previews and industry gallery", () => {
  it.each(locales)("links every %s package to an existing pricing target without a second selection flow", locale => {
    const preview = renderToStaticMarkup(React.createElement(PackageOverview, { locale }));
    const care = renderToStaticMarkup(React.createElement(CarePackageCards, { locale }));
    const pricing = renderToStaticMarkup(React.createElement(PricingPage, { locale }));
    for (const id of [...BUILD_ANCHORS, ...CARE_ANCHORS, "custom-project", "maintenance"]) {
      expect(preview + care).toContain(`href="${locale === "en" ? "" : `/${locale}`}/pricing/#${id}"`);
      expect(pricing).toContain(`id="${id}"`);
    }
    for (const amount of [...BUILD_PRICES, ...CARE_PLANS.map(plan => plan.monthly)]) expect(preview + care).toContain(escape(pricingMoney(locale, amount)));
    expect(preview + care).not.toMatch(/aria-pressed|<button|<input|your-selection/);
    expect(preview).not.toContain('class="pricing-features"');
    const full = renderToStaticMarkup(React.createElement(PackageCards, { locale }));
    for (const plan of BUILD_PLANS[locale]) for (const feature of plan.features) expect(full).toContain(escape(feature));
  });

  it.each(locales)("offers all nine industries with distinct useful %s content instead of demo navigation", language => {
    const html = renderToStaticMarkup(React.createElement(HomeIndustryGallery, { language }));
    expect(INDUSTRY_COPY[language]).toHaveLength(9);
    expect(html.match(/aria-haspopup="dialog"/g)).toHaveLength(9);
    expect(html).not.toMatch(/industry-gallery-number|<details/);
    expect(new Set(INDUSTRY_IMAGES.map(image => image.src)).size).toBe(9);
    for (const [i, id] of INDUSTRY_IDS.entries()) {
      expect(html).toContain(`id="industry-${id}"`);
      expect(html).toContain(`src="${INDUSTRY_IMAGES[i].src}"`);
      expect(html).toContain(escape(INDUSTRY_COPY[language][i].name));
      const details = renderToStaticMarkup(React.createElement(IndustryDetails, { language, index: i }));
      for (const benefit of INDUSTRY_COPY[language][i].benefits) expect(details).toContain(escape(benefit));
      expect(details).toContain(`href="${language === "en" ? "" : `/${language}`}/contact/"`);
    }
    expect(html).toContain(escape(INDUSTRY_UI[language].other));
    expect(html).toContain(`href="${language === "en" ? "" : `/${language}`}/contact/"`);
    expect(html).not.toMatch(/\/preview\/|<iframe|<video|—/);
    expect(html).toContain(`dir="${language === "he" ? "rtl" : "ltr"}"`);
  });
});
