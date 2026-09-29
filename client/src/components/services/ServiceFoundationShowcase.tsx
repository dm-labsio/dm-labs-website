import React, { useState } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import type { FoundationService } from "./serviceFeatureContent";
import { FOUNDATION_VISUALS } from "./serviceFoundationVisuals";
import { SERVICE_VISUAL_COPY } from "./serviceVisualCopy";
import { useServiceMotion } from "./useServiceMotion";
import "./ServiceFoundationShowcase.css";

/** Decorative concept only: its native controls and accessible caption live outside the artwork. */
export function FoundationComposition({ locale, serviceId, chapter }: { locale: SiteLanguage; serviceId: FoundationService; chapter: number }) {
  const t = FOUNDATION_VISUALS[locale];
  if (serviceId === "seo") return <div className="foundation-scene search-composition" data-chapter={chapter} aria-hidden="true">
    <div className="search-grid" /><div className="search-query" data-motion-piece><span>{t.search}</span><span>↵</span></div>
    <div className="search-result" data-motion-piece><bdi lang="en" dir="ltr">FORM / STUDIO</bdi><p className="search-result-title">{t.result}</p><p>{t.description}</p><div className="search-sitelinks">{t.path.map(label => <span key={label}>{label}</span>)}</div></div>
    <div className="search-page" data-motion-piece><img src="/media/brand-refresh/v1/service-architecture.webp" alt="" width="960" height="720" /><span>{t.page}</span></div>
    <div className="search-connector" data-motion-line /><div className="foundation-index"><bdi dir="ltr">0{chapter + 1}</bdi><span>{t.seo[chapter]}</span></div>
  </div>;
  if (serviceId === "security") return <div className="foundation-scene care-composition" data-chapter={chapter} aria-hidden="true">
    <div className="care-atmosphere"><img src="/media/brand-refresh/v1/pricing-glass-arcs-desktop.webp" alt="" width="1680" height="938" /></div>
    <div className="care-planes">{t.layers.map((label, i) => <div className={`care-plane care-plane--${i}`} data-active={i === chapter} key={label}><div data-motion-piece><bdi dir="ltr">0{i + 1}</bdi><span>{label}</span><div className="care-plane-detail">{i === 0 ? <bdi lang="en" dir="ltr">HTTPS</bdi> : i === 1 ? <div className="care-signal">{[0, 1, 2, 3, 4, 5, 6].map(n => <i key={n} />)}</div> : t.versions.map(version => <small key={version}>{version}</small>)}</div></div></div>)}</div>
    <div className="care-rail" data-motion-line /><p className="care-statement">{t.layerNote}</p>
  </div>;
  return <div className="foundation-scene delivery-composition" data-chapter={chapter} aria-hidden="true">
    <div className="delivery-grid" /><div className="delivery-art"><img src="/media/brand-refresh/v1/studio-tablet.webp" alt="" width="960" height="640" /></div>
    <div className="delivery-sheet" data-motion-piece><div className="delivery-sheet-top"><bdi lang="en" dir="ltr">DM / LABS</bdi><bdi dir="ltr">0{chapter + 1} — 03</bdi></div><p className="delivery-project">{t.project}</p><div className="delivery-focus"><bdi dir="ltr">0{chapter + 1}</bdi><p>{t.milestones[chapter]}</p></div><span className="delivery-rule" data-motion-line /><p className="delivery-notes">{t.deliveryNotes[chapter]}</p></div>
    <div className="delivery-track">{t.turnaround.map((label, i) => <div key={label} data-active={i === chapter}><bdi dir="ltr">0{i + 1}</bdi><span>{label}</span></div>)}</div>
  </div>;
}

export default function ServiceFoundationShowcase({ locale, serviceId }: { locale: SiteLanguage; serviceId: FoundationService }) {
  const [chapter, setChapter] = useState(0);
  const { root, replay } = useServiceMotion(chapter);
  const t = FOUNDATION_VISUALS[locale];
  return <div className="service-foundation-study" ref={root}>
    <div className="service-view-controls" role="group" aria-label={t.note}>{t[serviceId].map((label, i) => <button key={label} type="button" aria-pressed={chapter === i} aria-controls="foundation-hero-scene" onClick={() => setChapter(i)}>{label}</button>)}</div>
    <figure><div id="foundation-hero-scene"><FoundationComposition locale={locale} serviceId={serviceId} chapter={chapter} /></div><figcaption aria-live="polite" aria-atomic="true">{t[serviceId][chapter]}<span aria-hidden="true"> — </span>{serviceId === "seo" ? t.result : serviceId === "security" ? t.layers[chapter] : t.milestones[chapter]}</figcaption></figure>
    <p className="service-study-note">{t.note}</p><button className="service-motion-replay" type="button" onClick={replay}>{SERVICE_VISUAL_COPY[locale].replay}<span aria-hidden="true">↻</span></button>
  </div>;
}
