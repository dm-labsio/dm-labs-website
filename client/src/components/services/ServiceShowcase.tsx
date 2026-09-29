import React, { useState } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import type { RefreshedService } from "./serviceFeatureContent";
import { SERVICE_UI } from "./serviceFeatureUI";

function ResponsiveStudy({ locale }: { locale: SiteLanguage }) {
  const t = SERVICE_UI[locale];
  const [view, setView] = useState(0);
  return <div className="service-responsive-study">
    <p className="brand-micro">{t.demoTitle}</p>
    <div className="service-view-controls" role="group" aria-label={t.demoTitle}>{t.views.map((label, index) => <button key={label} type="button" aria-pressed={view === index} aria-controls="service-layout-study" onClick={() => setView(index)}>{label}</button>)}</div>
    <p className="service-study-note">{t.demoNote}</p>
    <figure id="service-layout-study" className="service-layout-study" data-view={["phone", "tablet", "desktop"][view]}>
      <div className="service-demo-canvas"><div className="service-demo-brand">{t.demoLabel}</div><div className="service-demo-content"><div><p className="service-demo-heading">{t.demoHeading}</p><p>{t.demoBody}</p><span className="service-demo-action">{t.demoAction}</span></div><img src="/media/brand-v1/home-glass-sculpture-480.webp" alt="" aria-hidden="true" width="480" height="545" /></div></div>
      <figcaption aria-live="polite" aria-atomic="true">{t.views[view]} · {t.demoCaption}</figcaption>
    </figure>
  </div>;
}

export default function ServiceShowcase({ locale, serviceId }: { locale: SiteLanguage; serviceId: RefreshedService }) {
  const t = SERVICE_UI[locale];
  if (serviceId === "mobile-first") return <ResponsiveStudy key={locale} locale={locale} />;
  if (serviceId === "custom-design") return <figure className="service-design-study"><img src="/media/brand-refresh/v1/service-design-monitor.webp" width="960" height="640" alt="" aria-hidden="true" fetchPriority="high" /><figcaption><p>{t.study}</p><span>{t.studyNote}</span></figcaption></figure>;
  return <div className="service-performance-study"><p className="brand-micro">{t.experience}</p><dl>{t.metrics.map(([label, description], i) => <div key={label}><dt><bdi lang="en" dir="ltr">{["LCP", "INP", "CLS"][i]}</bdi><span>{label}</span></dt><dd>{description}</dd></div>)}</dl><p className="service-study-note">{t.metricNote}</p></div>;
}
