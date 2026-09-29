import React, { useEffect } from "react";
import BrandButton from "@/components/ui/brand-button";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { useSEO } from "@/hooks/useSEO";
import { StudioRule } from "@/components/studio/StudioShared";
import { studioRoute } from "@/components/studio/studioCopy";
import { SERVICE_FEATURES, SERVICE_NAMES, SERVICE_RELATED, serviceFeatureRoute, serviceFeatureSchema, type RefreshedService } from "./serviceFeatureContent";
import { SERVICE_UI } from "./serviceFeatureUI";
import ServiceShowcase from "./ServiceShowcase";
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
  const route = (path: string) => studioRoute(locale, path);
  return <div className={`studio-page service-feature service-feature--${serviceId}`} lang={locale} dir={locale === "he" ? "rtl" : "ltr"} data-button-surface="dark">
    <section className="service-feature-hero" aria-labelledby="service-feature-title"><div className="container">
      <a className="service-feature-back" href={route("services")}><span aria-hidden="true">←</span>{ui.back}</a>
      <div className="service-hero-grid"><div><p className="brand-micro">{t.name}</p><h1 id="service-feature-title">{t.title[0]} <span>{t.title[1]}</span></h1><p className="service-feature-lead">{t.lead}</p><div className="service-feature-actions"><BrandButton asChild><a href={route("contact")}>{ui.consultation}</a></BrandButton><a className="service-text-link" href="#service-deliverables">{ui.deliver}</a></div></div><ServiceShowcase locale={locale} serviceId={serviceId} /></div>
      <p className="service-feature-intro">{t.intro}</p>
    </div></section>
    <section className="container studio-section" aria-labelledby="service-why-title"><p className="brand-micro">{ui.why}</p><h2 id="service-why-title" className="service-section-title">{ui.whyTitle}</h2><div className="service-principles">{t.principles.map(([heading, body], i) => <article key={heading}><p className="service-open-number" aria-hidden="true"><bdi dir="ltr">0{i + 1}</bdi></p><h3>{heading}</h3><p>{body}</p></article>)}</div></section>
    <section className="service-deliverables" id="service-deliverables" tabIndex={-1} aria-labelledby="service-deliver-title"><div className="container studio-section service-deliver-grid"><div><p className="brand-micro">{ui.deliver}</p><h2 id="service-deliver-title">{ui.deliverTitle}</h2><p>{ui.scope}</p><a className="service-text-link" href={route("pricing")}>{ui.pricing}</a></div><ul role="list">{t.deliverables.map((item, i) => <li key={item}><span className="brand-latin-code" aria-hidden="true"><bdi dir="ltr">{String(i + 1).padStart(2, "0")}</bdi></span><span>{item}</span></li>)}</ul></div></section>
    <section className="container studio-section" aria-labelledby="service-process-title"><div className="service-section-heading"><div><p className="brand-micro">{ui.process}</p><h2 id="service-process-title">{ui.processTitle}</h2></div><a className="service-text-link" href={route("process")}>{ui.processLink}</a></div><StudioRule /><ol className="service-steps" role="list">{t.steps.map(([heading, body], i) => <li key={heading}><bdi className="brand-latin-code" dir="ltr" aria-hidden="true">0{i + 1}</bdi><h3>{heading}</h3><p>{body}</p></li>)}</ol></section>
    <section className="service-faq"><div className="container studio-section service-faq-grid"><h2 id="service-faq-title">{ui.questions}</h2><div aria-labelledby="service-faq-title">{t.faqs.map(faq => <details key={faq.q}><summary><h3>{faq.q}</h3><span aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></div></section>
    <section className="container studio-section service-related" aria-labelledby="service-related-title"><h2 id="service-related-title">{ui.related}</h2><div>{SERVICE_RELATED[serviceId].map(id => <a href={serviceFeatureRoute(locale, id)} key={id}><span>{SERVICE_NAMES[locale][id]}</span><span aria-hidden="true">↗</span></a>)}</div></section>
    <section className="service-feature-closing"><div className="container studio-section"><p className="brand-micro">{ui.consultation}</p><h2>{ui.closing}</h2><p>{ui.closingCopy}</p><div className="service-feature-actions"><BrandButton asChild><a href={route("contact")}>{ui.consultation}</a></BrandButton><a className="service-text-link" href={route("pricing")}>{ui.pricing}</a></div></div></section>
  </div>;
}
