import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import ServicesPage from "../client/src/components/studio/ServicesPage";
import ProcessPage from "../client/src/components/studio/ProcessPage";
import { CAPABILITY_IDS, STUDIO_COPY, studioRoute } from "../client/src/components/studio/studioCopy";
import { BUILD_PLANS, BUILD_PRICES, CARE_FEATURES, CARE_PLANS, pricingMoney } from "../client/src/components/pricing/pricingContent";
import { PRICING_COPY } from "../client/src/components/pricing/pricingCopy";

const locales = ["en", "el", "he"] as const;
const escaped = (value: string) => renderToStaticMarkup(React.createElement(React.Fragment, null, value));

describe("Services and process multilingual journey", () => {
  it.each(locales)("preserves package scope, care and nine detail destinations in %s", locale => {
    const html = renderToStaticMarkup(React.createElement(ServicesPage, { locale }));
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).not.toContain("<main");
    for (const plan of BUILD_PLANS[locale]) {
      expect(html).toContain(plan.name);
      for (const feature of plan.features) expect(html).toContain(escaped(feature));
    }
    for (const amount of [...BUILD_PRICES, ...CARE_PLANS.map(plan => plan.monthly)]) expect(html).toContain(escaped(pricingMoney(locale, amount)));
    for (const feature of CARE_FEATURES[locale].flat()) expect(html).toContain(escaped(feature));
    for (const feature of PRICING_COPY[locale].customFeatures) expect(html).toContain(escaped(feature));
    expect(html).toContain(escaped(PRICING_COPY[locale].careIntro));
    expect(html).toContain(escaped(PRICING_COPY[locale].scopeText));
    expect(STUDIO_COPY[locale].services.capabilities).toHaveLength(9);
    for (const id of CAPABILITY_IDS) {
      expect(html).toContain(`id="${id}" tabindex="-1"`);
      expect(html).toContain(`href="${studioRoute(locale, `services/${id}`)}"`);
    }
    for (const path of ["contact", "pricing", "process", "terms"]) expect(html).toContain(`href="${studioRoute(locale, path)}"`);
  });

  it.each(locales)("renders five complete process chapters and qualified timing in %s", locale => {
    const html = renderToStaticMarkup(React.createElement(ProcessPage, { locale }));
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html.match(/<li\b/g)).toHaveLength(5);
    for (const [i, step] of STUDIO_COPY[locale].process.steps.entries()) {
      expect(html).toContain(`id="step-${i + 1}"`);
      for (const text of [step.title, step.copy, step.output]) expect(html).toContain(escaped(text));
    }
    for (const range of ["5–7", "7–10", "10–14"]) expect(html).toContain(`<bdi dir="ltr">${range}</bdi>`);
    expect(html).toContain(escaped(STUDIO_COPY[locale].process.timingLead));
    expect(html).toContain(escaped(STUDIO_COPY[locale].process.days));
    for (const path of ["contact", "pricing", "services", "faq"]) expect(html).toContain(`href="${studioRoute(locale, path)}"`);
  });

  it.each(locales)("keeps readable static content, correct direction and working anchors in %s", locale => {
    for (const component of [ServicesPage, ProcessPage]) {
      const html = renderToStaticMarkup(React.createElement(component, { locale }));
      expect(html).toContain(`lang="${locale}" dir="${locale === "he" ? "rtl" : "ltr"}"`);
      expect(html).not.toMatch(/<svg|<video|opacity:0|icon-container/);
      for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) expect(html).toContain(`id="${anchor}" tabindex="-1"`);
      expect(html).toContain(escaped(STUDIO_COPY[locale].consultation));
    }
  });

  it("keeps the new pages on shared components, preserves Hebrew indexing and limits motion to decoration", () => {
    for (const [locale, suffix, prefix] of [["en", "", ""], ["el", "El", "el/"], ["he", "He", "he/"]]) {
      for (const family of ["Services", "Process"]) {
        const source = readFileSync(resolve(import.meta.dirname, `../client/src/pages/${prefix}${family}${suffix}.tsx`), "utf8");
        expect(source).toContain(`<${family}Page locale="${locale}" />`);
        if (locale === "he") expect(source).toContain("noindex: true");
      }
    }
    const styles = readFileSync(resolve(import.meta.dirname, "../client/src/components/studio/StudioPage.css"), "utf8");
    expect(styles).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(styles).toContain(".studio-rule[data-visible=\"true\"] span");
    expect(styles).toContain('font-family: "Rubik", Arial, sans-serif; font-weight: 800');
    expect(styles).not.toContain("infinite");
    expect(STUDIO_COPY.en.services.capabilitiesLead).toContain("depends on your package and agreed scope");
    expect(STUDIO_COPY.en.process.steps[1].copy).toContain("paid in full before work begins");
    expect(STUDIO_COPY.en.process.steps[3].copy).toContain("Launch includes 2 revision rounds, Growth includes 3 and Pro includes 4");
  });
});
