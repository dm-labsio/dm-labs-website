import React, { useState } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import type { RefreshedService } from "./serviceFeatureContent";
import { SERVICE_UI } from "./serviceFeatureUI";
import { SERVICE_VISUAL_COPY } from "./serviceVisualCopy";
import { useServiceMotion } from "./useServiceMotion";

/** A complete editorial concept, with one content tree at every screen size. */
export function WebsiteComposition({ locale }: { locale: SiteLanguage }) {
  const t = SERVICE_VISUAL_COPY[locale];
  return <div className="concept-site">
    <div className="concept-masthead"><bdi dir="ltr" lang="en">{t.project}</bdi><span aria-hidden="true">≡</span></div>
    <div className="concept-cover">
      <img src="/media/brand-refresh/v1/service-architecture.webp" alt="" aria-hidden="true" width="960" height="720" />
      <div className="concept-cover-copy"><p>{t.siteEyebrow}</p><p className="concept-title">{t.siteTitle}</p><span className="concept-action">{t.siteAction}<span aria-hidden="true">↗</span></span></div>
    </div>
    <div className="concept-editorial"><span className="concept-edition" aria-hidden="true">01 — 03</span><div><p>{t.siteBottom}</p><span>{t.siteBody}</span></div><div className="concept-mini-art" aria-hidden="true"><i /><i /><i /></div></div>
    <div className="concept-footnote"><span>{t.siteCollection}</span><span aria-hidden="true">↗</span></div>
  </div>;
}

function ResponsiveStudy({ locale }: { locale: SiteLanguage }) {
  const t = SERVICE_UI[locale];
  const copy = SERVICE_VISUAL_COPY[locale];
  const [view, setView] = useState(0);
  const { root } = useServiceMotion(view);
  return <div className="service-responsive-study" ref={root}>
    <div className="service-view-controls" role="group" aria-label={t.demoTitle}>{t.views.map((label, index) => <button key={label} type="button" aria-pressed={view === index} aria-controls="service-layout-study" onClick={() => setView(index)}>{label}</button>)}</div>
    <figure id="service-layout-study" className="service-layout-study" data-view={["phone", "tablet", "desktop"][view]}>
      <div className="device-stage"><div className="device-orbit" aria-hidden="true" /><div className="concept-device" data-motion-piece><div className="device-toolbar" aria-hidden="true"><i /><i /><i /><span>FORM / STUDIO</span></div><WebsiteComposition locale={locale} /></div><span className="device-measure" aria-hidden="true" data-motion-line /></div>
      <figcaption aria-live="polite" aria-atomic="true">{t.views[view]} · {copy.concept}</figcaption>
    </figure>
    <p className="service-study-note">{t.demoNote}</p>
  </div>;
}

export function DesignComposition({ locale, variation = 0 }: { locale: SiteLanguage; variation?: number }) {
  const t = SERVICE_VISUAL_COPY[locale];
  return <div className={`design-composition design-composition--${variation}`} aria-hidden="true">
    <div className="design-grid" />
    <div className="design-photo" data-motion-piece><img src="/media/brand-refresh/v1/service-design-monitor.webp" alt="" width="960" height="640" /></div>
    <div className="design-type" data-motion-piece><span>{locale === "he" ? "אב" : locale === "el" ? "Αα" : "Aa"}</span><small>{t.type}</small></div>
    <div className="design-palette" data-motion-piece><i /><i /><i /><i /><span>{t.colour}</span></div>
    <span className="design-baseline" data-motion-line />
    <div className="design-caption">{t.layout}</div>
  </div>;
}

export function PerformanceComposition({ locale, phase = 0 }: { locale: SiteLanguage; phase?: number }) {
  const t = SERVICE_VISUAL_COPY[locale];
  return <div className="performance-composition" data-phase={phase} aria-hidden="true">
    <div className="performance-orbit" /><div className="flow-path" data-motion-line />
    <div className="flow-browser" data-motion-piece><div className="flow-browser-top"><i /><i /><i /></div><div className="flow-browser-content"><div className="flow-picture" data-motion-load={phase === 0 ? "" : undefined} /><div className="flow-type" data-motion-load={phase === 0 ? "" : undefined}><i /><i /><i /></div><div className="flow-button">{t.siteAction}<span>↗</span></div><div className="flow-bottom"><i /><i /><i /></div></div></div>
    <div className="flow-label"><bdi dir="ltr" lang="en">{["LCP", "INP", "CLS"][phase]}</bdi><span>{t.performance[phase]}</span></div>
    <div className="flow-signal" data-motion-piece><i /><i /><i /><i /><i /></div>
    <div className="flow-point" data-motion-tap={phase === 1 ? "" : undefined} />
  </div>;
}

function PerformanceStudy({ locale }: { locale: SiteLanguage }) {
  const t = SERVICE_VISUAL_COPY[locale];
  const ui = SERVICE_UI[locale];
  const [phase, setPhase] = useState(0);
  const { root, replay } = useServiceMotion(phase);
  return <div className="service-performance-study" ref={root}>
    <div className="service-view-controls" role="group" aria-label={ui.experience}>{t.performance.map((label, i) => <button key={label} type="button" onClick={() => setPhase(i)} aria-pressed={phase === i} aria-controls="performance-scene">{label}</button>)}</div>
    <div id="performance-scene"><PerformanceComposition locale={locale} phase={phase} /></div>
    <div className="performance-feedback" aria-live="polite"><p>{ui.metrics[phase][1]}</p></div>
    <button className="service-motion-replay" type="button" onClick={replay}>{t.replay}<span aria-hidden="true">↻</span></button>
    <p className="service-study-note">{t.flowNote}</p>
  </div>;
}

function DesignStudy({ locale }: { locale: SiteLanguage }) {
  const { root, replay } = useServiceMotion(locale);
  const t = SERVICE_UI[locale];
  return <div className="service-design-study" ref={root}><DesignComposition locale={locale} /><p className="service-study-note">{t.studyNote}</p><button className="service-motion-replay" onClick={replay} type="button">{SERVICE_VISUAL_COPY[locale].replay}<span aria-hidden="true">↻</span></button></div>;
}

export default function ServiceShowcase({ locale, serviceId }: { locale: SiteLanguage; serviceId: RefreshedService }) {
  if (serviceId === "mobile-first") return <ResponsiveStudy key={locale} locale={locale} />;
  if (serviceId === "custom-design") return <DesignStudy locale={locale} />;
  return <PerformanceStudy locale={locale} />;
}
