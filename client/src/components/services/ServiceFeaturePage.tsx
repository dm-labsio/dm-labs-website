import React, { useEffect } from "react";
import BrandButton from "@/components/ui/brand-button";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { useSEO } from "@/hooks/useSEO";
import "@/components/studio/StudioPage.css";
import { ServiceVisualStory, ServiceImageBreak } from "./ServiceVisualStory";
import { SERVICE_VISUAL_COPY } from "./serviceVisualCopy";
import { studioRoute } from "@/components/studio/studioCopy";
import { isFoundationService, SERVICE_FEATURES, SERVICE_NAMES, SERVICE_RELATED, serviceFeatureRoute, serviceFeatureSchema, type RefreshedService } from "./serviceFeatureContent";
import { SERVICE_UI } from "./serviceFeatureUI";
import ServiceShowcase from "./ServiceShowcase";
import ServiceFoundationStory from "./ServiceFoundationStory";
import { FOUNDATION_COPY } from "./serviceFoundationCopy";
import "./ServiceFeaturePage.css";

export default function ServiceFeaturePage({ locale, serviceId }: { locale: SiteLanguage; serviceId: RefreshedService }) {
  const content = SERVICE_FEATURES[locale][serviceId];
  useSEO({ title: `${content.name} | DM-Labs.io`, description: content.intro, canonicalPath: serviceFeatureRoute(locale, serviceId), ...(locale === "he" ? { ogLocale: "he_IL", noindex: true } : {}) });
  useEffect(() => {
    const schemaId = "service-jsonld-schema";
    const existing = document.getElementById(schemaId);
    const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(serviceFeatureSchema(locale, serviceId));
    if (!existing) document.head.appendChild(script);
    return () => script.remove();
  }, [locale, serviceId]);
  return <ServiceFeatureContent locale={locale} serviceId={serviceId} />;
}

export function ServiceFeatureContent({ locale, serviceId }: { locale: SiteLanguage; serviceId: RefreshedService }) {
  const t = SERVICE_FEATURES[locale][serviceId];
  const ui = SERVICE_UI[locale];
  const visual = SERVICE_VISUAL_COPY[locale];
  const route = (path: string) => studioRoute(locale, path);
  return <div className={`studio-page service-feature service-feature--${serviceId}${isFoundationService(serviceId) ? " service-feature--text" : ""}`} lang={locale} dir={locale === "he" ? "rtl" : "ltr"} data-button-surface="dark">
    <section className="service-feature-hero" aria-labelledby="service-feature-title"><div className="container">
      <a className="service-feature-back" href={route("services")}><span aria-hidden="true">←</span>{ui.back}</a>
      <div className={isFoundationService(serviceId) ? "service-hero-text" : "service-hero-grid"}><div><p className="brand-micro">{t.name}</p><h1 id="service-feature-title">{t.title[0]} <span>{t.title[1]}</span></h1><p className="service-feature-lead">{t.lead}</p><div className="service-feature-actions"><BrandButton asChild><a href={route("contact")}>{ui.consultation}</a></BrandButton><a className="service-text-link" href="#service-story">{visual.explore}</a></div></div>{!isFoundationService(serviceId) && <ServiceShowcase locale={locale} serviceId={serviceId} />}</div>

    </div></section>
    <div id="service-story" tabIndex={-1}>{isFoundationService(serviceId) ? <ServiceFoundationStory locale={locale} serviceId={serviceId} /> : <><ServiceVisualStory key={`${locale}-${serviceId}`} locale={locale} serviceId={serviceId} /><ServiceImageBreak locale={locale} serviceId={serviceId} /></>}</div>
    <section className="container studio-section service-scope-section" id="service-deliverables" tabIndex={-1} aria-labelledby="service-deliver-title">
      <div className="service-scope-intro"><div><p className="brand-micro">{ui.deliver}</p><h2 id="service-deliver-title">{isFoundationService(serviceId) ? FOUNDATION_COPY[locale].scope[serviceId] : visual.scopeShort}</h2></div><p>{t.intro}</p></div>
      <details className="service-scope-disclosure" open><summary><span>{visual.scope}</span><bdi aria-hidden="true" dir="ltr">01 — {String(t.deliverables.length).padStart(2, "0")}<span className="service-disclosure-symbol" /></bdi></summary><div className="service-deliver-grid"><div><p>{ui.scope}</p><a className="service-text-link" href={route("pricing")}>{ui.pricing}</a><br /><a className="service-text-link" href={route("process")}>{ui.processLink}</a></div><ul role="list">{t.deliverables.map((item, i) => <li key={item}><span className="brand-latin-code" aria-hidden="true"><bdi dir="ltr">{String(i + 1).padStart(2, "0")}</bdi></span><span>{item}</span></li>)}</ul></div></details>
    </section>
    <section className="service-faq"><div className="container studio-section service-faq-grid"><h2 id="service-faq-title">{ui.questions}</h2><div aria-labelledby="service-faq-title">{t.faqs.map(faq => <details key={faq.q} open><summary><h3>{faq.q}</h3><span className="service-disclosure-symbol" aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div></div></section>
    <section className="container studio-section service-related" aria-labelledby="service-related-title"><h2 id="service-related-title">{ui.related}</h2><div>{SERVICE_RELATED[serviceId].map(id => <a href={serviceFeatureRoute(locale, id)} key={id}><span>{SERVICE_NAMES[locale][id]}</span><span aria-hidden="true">↗</span></a>)}</div></section>
    <section className="service-feature-closing"><div className="container studio-section"><p className="brand-micro">{ui.consultation}</p><h2>{ui.closing}</h2><p>{ui.closingCopy}</p><div className="service-feature-actions"><BrandButton asChild><a href={route("contact")}>{ui.consultation}</a></BrandButton><a className="service-text-link" href={route("pricing")}>{ui.pricing}</a></div></div></section>
  </div>;
}
