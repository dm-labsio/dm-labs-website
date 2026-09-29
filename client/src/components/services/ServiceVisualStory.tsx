import React, { useState } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { SERVICE_FEATURES, isFoundationService, type RefreshedService } from "./serviceFeatureContent";
import { FoundationComposition } from "./ServiceFoundationShowcase";
import { FOUNDATION_VISUALS } from "./serviceFoundationVisuals";
import { SERVICE_UI } from "./serviceFeatureUI";
import { SERVICE_VISUAL_COPY } from "./serviceVisualCopy";
import { DesignComposition, PerformanceComposition, WebsiteComposition } from "./ServiceShowcase";
import { useServiceMotion } from "./useServiceMotion";

export function ServiceVisualStory({ locale, serviceId }: { locale: SiteLanguage; serviceId: RefreshedService }) {
  const t = SERVICE_FEATURES[locale][serviceId];
  const ui = SERVICE_VISUAL_COPY[locale];
  const labels = isFoundationService(serviceId) ? FOUNDATION_VISUALS[locale][serviceId] : ui[serviceId === "custom-design" ? "design" : serviceId === "mobile-first" ? "mobile" : "performance"];
  const [chapter, setChapter] = useState(0);
  const { root } = useServiceMotion(chapter);
  return <section className="container studio-section service-story" aria-labelledby="service-why-title">
    <div className="service-story-heading"><p className="brand-micro">{ui.story}</p><h2 id="service-why-title">{SERVICE_UI[locale].whyTitle}</h2><p>{ui.choose}</p></div>
    <div className="service-story-grid">
      <div className="service-story-visual" ref={root}>
        {isFoundationService(serviceId) ? <FoundationComposition locale={locale} serviceId={serviceId} chapter={chapter} /> : serviceId === "custom-design" ? <DesignComposition locale={locale} variation={chapter} /> : serviceId === "performance" ? <PerformanceComposition locale={locale} phase={chapter} /> : <div className="story-mobile-composition" data-chapter={chapter} aria-hidden="true"><div className="story-mobile-grid" /><div className="story-mobile-device" data-motion-piece><WebsiteComposition locale={locale} /></div><span className="story-mobile-track" data-motion-line /><span className="story-touch-ring" data-motion-piece /></div>}
        <div className="story-visual-caption"><bdi dir="ltr">0{chapter + 1} / 03</bdi><span>{labels[chapter]}</span></div>
      </div>
      <div className="service-principles">{t.principles.map(([heading, body], i) => <article key={heading} data-active={chapter === i}>
        <h3><button type="button" onClick={() => setChapter(i)} aria-expanded={chapter === i} aria-controls={`service-chapter-${i}`}><bdi dir="ltr" aria-hidden="true">0{i + 1}</bdi><span>{labels[i]}</span><span aria-hidden="true">{chapter === i ? "−" : "+"}</span></button></h3>
        <div id={`service-chapter-${i}`} hidden={chapter !== i}><p className="service-chapter-heading">{heading}</p><p>{body}</p></div>
      </article>)}</div>
    </div>
  </section>;
}

export function ServiceImageBreak({ locale, serviceId }: { locale: SiteLanguage; serviceId: RefreshedService }) {
  const t = SERVICE_VISUAL_COPY[locale];
  const { root } = useServiceMotion(serviceId);
  const data = {
    "custom-design": { image: "/media/brand-refresh/v1/service-design-process.webp", title: t.filmTitle },
    "mobile-first": { image: "/media/brand-refresh/v1/service-mobile-inhand.webp", title: t.mobileTitle },
    performance: { image: "/media/brand-refresh/v1/service-performance-glass.webp", title: t.performanceTitle },
    seo: { image: "/media/brand-refresh/v1/service-architecture.webp", title: FOUNDATION_VISUALS[locale].seoTitle },
    security: { image: "/media/brand-refresh/v1/pricing-glass-arcs-desktop.webp", title: FOUNDATION_VISUALS[locale].securityTitle },
    turnaround: { image: "/media/brand-refresh/v1/service-design-process.webp", title: FOUNDATION_VISUALS[locale].turnaroundTitle },
  }[serviceId];
  return <div className="service-image-break" ref={root}><div className="container service-image-grid"><figure data-motion-piece><img src={data.image} alt="" width="1200" height="800" loading="lazy" /><figcaption>{t.filmCaption}</figcaption></figure><div className="service-image-statement"><p className="brand-micro">{t.before}<span aria-hidden="true"> — </span>{t.after}</p><p>{data.title[0]}<span>{data.title[1]}</span></p><div className="service-image-line" data-motion-line aria-hidden="true" /></div></div></div>;
}
