import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ServiceFeatureContent } from "../client/src/components/services/ServiceFeaturePage";
import { REFRESHED_SERVICES, SERVICE_FEATURES, SERVICE_RELATED, isFoundationService, isRefreshedService, serviceFeatureRoute, serviceFeatureSchema } from "../client/src/components/services/serviceFeatureContent";
import { SERVICE_UI } from "../client/src/components/services/serviceFeatureUI";
import { FOUNDATION_VISUALS } from "../client/src/components/services/serviceFoundationVisuals";
import { SERVICE_VISUAL_COPY } from "../client/src/components/services/serviceVisualCopy";
import { FoundationComposition } from "../client/src/components/services/ServiceFoundationShowcase";
import { getHreflangRouteSet } from "../client/src/lib/seoRoutes";

const locales = ["en", "el", "he"] as const;
const escaped = (text: string) => renderToStaticMarkup(React.createElement(React.Fragment, null, text));
const cases = locales.flatMap(locale => REFRESHED_SERVICES.map(serviceId => ({ locale, serviceId })));

describe("shared service-detail refresh batches", () => {
  it("removes the rejected room metaphors from shared copy in every language", () => {
    const copy = JSON.stringify([SERVICE_FEATURES, SERVICE_VISUAL_COPY, SERVICE_UI, FOUNDATION_VISUALS]);
    expect(copy).not.toMatch(/\brooms?\b|Χώρος για|Προσεγμένοι χώροι|מקום ל|חללים/i);
  });
  it.each(cases)("preserves the full content and localized journey for $locale/$serviceId", ({locale, serviceId}) => {
    const t = SERVICE_FEATURES[locale][serviceId];
    const html = renderToStaticMarkup(React.createElement(ServiceFeatureContent, { locale, serviceId }));
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).not.toContain("<main");
    expect(html).toContain(`lang="${locale}" dir="${locale === "he" ? "rtl" : "ltr"}"`);
    expect(t.principles).toHaveLength(3);
    expect(t.deliverables).toHaveLength(serviceId === "seo" ? 9 : ["performance", "security"].includes(serviceId) ? 8 : 7);
    expect(html.match(/<details\b/g)).toHaveLength(t.faqs.length + 1);
    for (const text of [t.name, ...t.title, t.lead, t.intro, ...t.principles.flat(), ...t.deliverables, ...t.faqs.flatMap(faq => [faq.q, faq.a])]) expect(html).toContain(escaped(text));
    for (const path of ["contact", "pricing", "services", "process"]) expect(html).toContain(`href="${locale === "en" ? "" : `/${locale}`}/${path}/"`);
    for (const id of SERVICE_RELATED[serviceId]) {
      const route = serviceFeatureRoute(locale, id);
      expect(html).toContain(`href="${route}"`);
      expect(getHreflangRouteSet(route)[locale]).toBe(route.slice(0, -1));
    }
    expect(html).toContain('href="#service-story"');
    expect(html).toContain('id="service-deliverables" tabindex="-1"');
    expect(html).toContain(escaped(SERVICE_UI[locale].scope));
    expect(html).not.toMatch(/<svg|<video|opacity:0|icon-container/);
    expect(html).toContain('<details class="service-scope-disclosure" open="">');
    expect(html.match(/<details[^>]* open=""/g)).toHaveLength(t.faqs.length + 1);
    expect(html).not.toContain('class="service-journey"');
    if (isFoundationService(serviceId)) {
      expect(html).toContain('data-reading-layout=');
      expect(html).not.toContain('class="service-principles"');
      expect(html).not.toContain('class="service-image-break"');
      expect(html.match(/data-scene=/g)).toHaveLength(1);
    } else {
      expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
      expect(html.match(/aria-expanded="false"/g)).toHaveLength(2);
    }
    expect(html).not.toContain("home-glass-sculpture-480.webp");
    if (serviceId === "mobile-first") {
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      expect(html.match(/aria-pressed="false"/g)).toHaveLength(2);
      expect(html).toContain('aria-controls="service-layout-study"');
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain(escaped(SERVICE_UI[locale].demoNote));
    }
  });

  it.each(cases)("keeps FAQ and service metadata tied to the visible $locale/$serviceId content", ({locale, serviceId}) => {
    const t = SERVICE_FEATURES[locale][serviceId];
    const schema = serviceFeatureSchema(locale, serviceId);
    expect(schema["@graph"][0]).toMatchObject({ "@type": "Service", name: t.name, description: t.intro, url: `https://dm-labs.io${serviceFeatureRoute(locale, serviceId)}`, areaServed: "Worldwide" });
    expect(schema["@graph"][1]).toMatchObject({ "@type": "FAQPage", inLanguage: locale, mainEntity: t.faqs.map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) });
    expect(JSON.stringify(schema)).not.toMatch(/AggregateRating|reviewRating|"Review"/);
  });

  it("keeps the three later service topics on their legacy pages", () => {
    for (const id of ["maps", "forms", "social", "unknown"]) expect(isRefreshedService(id)).toBe(false);
    for (const page of ["ServiceDetail.tsx", "el/ServiceDetailEl.tsx"]) {
      const source = readFileSync(resolve(import.meta.dirname, "../client/src/pages", page), "utf8");
      expect(source).toContain("isRefreshedService(serviceId)");
      expect(source).toContain("<LegacyServiceDetailPage />");
      for (const id of ["maps", "forms", "social"]) expect(source).toContain(`"${id}": {`);
    }
  });

  it.each(locales)("keeps the new %s illustrations selectable without pretending to be live data", locale => {
    for (const serviceId of ["seo", "security", "turnaround"] as const) {
      const html = renderToStaticMarkup(React.createElement(ServiceFeatureContent, { locale, serviceId }));
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      expect(html.match(/aria-pressed="false"/g)).toHaveLength(2);
      expect(html.match(/id="foundation-hero-scene"/g)).toHaveLength(1);
      expect(html).toContain('aria-controls="foundation-hero-scene"');
      expect(html).toContain('aria-live="polite" aria-atomic="true"');
      expect(html).toContain(escaped(FOUNDATION_VISUALS[locale].note));
      expect(html).not.toMatch(/99\.9%|24\/7|100% secure|daily backups|live dashboard/);
    }
  });

  it.each(locales)("replaces the %s artwork for each selection and removes the repeated SEO tiles", locale => {
    const copy = FOUNDATION_VISUALS[locale];
    const render = (serviceId: "seo" | "security" | "turnaround", chapter: number) => renderToStaticMarkup(React.createElement(FoundationComposition, { locale, serviceId, chapter }));
    expect(render("security", 0)).toContain("HTTPS");
    expect(render("security", 1)).not.toContain("HTTPS");
    expect(render("security", 1)).toContain(escaped(copy.care[0]));
    expect(render("security", 2)).not.toContain(escaped(copy.care[0]));
    expect(render("security", 2)).toContain(escaped(copy.restore));
    expect(render("seo", 0)).toContain(escaped(copy.search));
    expect(render("seo", 1)).not.toContain(escaped(copy.search));
    expect(render("seo", 1)).toContain(escaped(copy.page));
    expect(render("seo", 2)).not.toContain(escaped(copy.page));
    expect(render("seo", 2)).toContain(escaped(copy.path[0]));
    expect(render("turnaround", 0)).not.toContain("<img");
    expect(render("turnaround", 1)).toContain("<img");
    expect(render("turnaround", 2)).not.toContain("<img");
    const seo = renderToStaticMarkup(React.createElement(ServiceFeatureContent, { locale, serviceId: "seo" }));
    expect(seo).not.toMatch(/service-architecture|Room to live|Χώρος για ζωή|מקום לחיות|search-page|service-image-break/);
  });

  it("removes unsupported statistics and score guarantees while retaining commercial scope", () => {
    const content = JSON.stringify(SERVICE_FEATURES);
    expect(content).not.toMatch(/50 milliseconds|60-70%|over 95%|LCP, FID|score 90\+|πάνω από 95/);
    expect(SERVICE_FEATURES.en["custom-design"].faqs[2].a).toContain("up to 4 pages and 3 rounds; Pro includes up to 7 pages and 4 rounds");
    expect(SERVICE_FEATURES.en.performance.faqs[1].a).toContain("Complete Care includes a monthly performance check");
    for (const locale of locales) expect(SERVICE_FEATURES[locale].performance.deliverables.join(" ")).toMatch(/LCP, INP/);
  });
});
