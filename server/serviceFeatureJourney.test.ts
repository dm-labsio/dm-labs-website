import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ServiceFeatureContent } from "../client/src/components/services/ServiceFeaturePage";
import { REFRESHED_SERVICES, SERVICE_FEATURES, SERVICE_RELATED, isRefreshedService, serviceFeatureRoute, serviceFeatureSchema } from "../client/src/components/services/serviceFeatureContent";
import { SERVICE_UI } from "../client/src/components/services/serviceFeatureUI";
import { getHreflangRouteSet } from "../client/src/lib/seoRoutes";

const locales = ["en", "el", "he"] as const;
const escaped = (text: string) => renderToStaticMarkup(React.createElement(React.Fragment, null, text));
const cases = locales.flatMap(locale => REFRESHED_SERVICES.map(serviceId => ({ locale, serviceId })));

describe("first service-detail refresh batch", () => {
  it.each(cases)("preserves the full content and localized journey for $locale/$serviceId", ({locale, serviceId}) => {
    const t = SERVICE_FEATURES[locale][serviceId];
    const html = renderToStaticMarkup(React.createElement(ServiceFeatureContent, { locale, serviceId }));
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).not.toContain("<main");
    expect(html).toContain(`lang="${locale}" dir="${locale === "he" ? "rtl" : "ltr"}"`);
    expect(t.principles).toHaveLength(3);
    expect(t.steps).toHaveLength(4);
    expect(t.deliverables).toHaveLength(serviceId === "performance" ? 8 : 7);
    expect(html.match(/<details\b/g)).toHaveLength(serviceId === "custom-design" ? 9 : 8);
    for (const text of [t.name, ...t.title, t.lead, t.intro, ...t.principles.flat(), ...t.deliverables, ...t.steps.flat(), ...t.faqs.flatMap(faq => [faq.q, faq.a])]) expect(html).toContain(escaped(text));
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
    expect(html).toContain('<details class="service-scope-disclosure">');
    expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
    expect(html.match(/aria-expanded="false"/g)).toHaveLength(2);
    expect(html).toContain('id="service-chapter-1" hidden=""');
    expect(html).toContain('id="service-chapter-2" hidden=""');
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

  it("keeps the six later service topics on their legacy pages", () => {
    for (const id of ["seo", "security", "turnaround", "maps", "forms", "social", "unknown"]) expect(isRefreshedService(id)).toBe(false);
    for (const page of ["ServiceDetail.tsx", "el/ServiceDetailEl.tsx"]) {
      const source = readFileSync(resolve(import.meta.dirname, "../client/src/pages", page), "utf8");
      expect(source).toContain("isRefreshedService(serviceId)");
      expect(source).toContain("<LegacyServiceDetailPage />");
      for (const id of ["seo", "security", "turnaround", "maps", "forms", "social"]) expect(source).toContain(`"${id}": {`);
    }
  });

  it("removes unsupported statistics and score guarantees while retaining commercial scope", () => {
    const content = JSON.stringify(SERVICE_FEATURES);
    expect(content).not.toMatch(/50 milliseconds|60-70%|over 95%|LCP, FID|score 90\+|πάνω από 95/);
    expect(SERVICE_FEATURES.en["custom-design"].faqs[2].a).toContain("up to 4 pages and 3 rounds; Pro includes up to 7 pages and 4 rounds");
    expect(SERVICE_FEATURES.en.performance.faqs[1].a).toContain("Complete Care includes a monthly performance check");
    for (const locale of locales) expect(SERVICE_FEATURES[locale].performance.deliverables.join(" ")).toMatch(/LCP, INP/);
  });
});
