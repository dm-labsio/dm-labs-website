import React, { useState } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import type { FoundationService } from "./serviceFeatureContent";
import { FOUNDATION_VISUALS } from "./serviceFoundationVisuals";
import { SERVICE_VISUAL_COPY } from "./serviceVisualCopy";
import { useServiceMotion } from "./useServiceMotion";
import "./ServiceFoundationShowcase.css";

/** Each choice replaces the illustration, rather than highlighting a shared diagram. */
export function FoundationComposition({ locale, serviceId, chapter }: { locale: SiteLanguage; serviceId: FoundationService; chapter: number }) {
  const t = FOUNDATION_VISUALS[locale];
  return <div className={`foundation-card foundation-card--${serviceId}`} data-chapter={chapter} data-scene={`${serviceId}-${chapter}`} aria-hidden="true" data-motion-card>
    <div className="foundation-card-heading"><bdi dir="ltr">0{chapter + 1}</bdi><span>{t[serviceId][chapter]}</span><bdi dir="ltr">/ 03</bdi></div>
    {serviceId === "seo" && (chapter === 0 ? <div className="search-discovery"><div className="search-prompt">{t.search}<span>↵</span></div><div className="search-answer"><bdi lang="en" dir="ltr">DM-LABS.IO</bdi><p>{t.result}</p><span>{t.description}</span><div className="search-result-lines"><i /><i /></div></div></div> : chapter === 1 ? <div className="search-content"><bdi lang="en" dir="ltr">DM / LABS</bdi><p>{t.page}</p><div className="search-content-sections">{t.pageParts.map((label, i) => <div key={label}><bdi dir="ltr">0{i + 1}</bdi><strong>{label}</strong><i /><i /></div>)}</div></div> : <div className="search-map"><div className="search-map-root">{t.path[0]}</div><div className="search-map-stem" /><div className="search-map-branches">{t.path.slice(1).map(label => <div key={label}><span>{label}</span><i /><i /><i /></div>)}</div></div>)}
    {serviceId === "security" && (chapter === 0 ? <div className="connection-scene"><p>{t.layers[0]}</p><div className="connection-nodes"><span>{t.endpoints[0]}</span><div className="connection-transfer"><i /><bdi dir="ltr" lang="en">HTTPS</bdi><i /></div><span>{t.endpoints[1]}</span></div><div className="connection-ribbon"><i /><i /><i /><i /><i /></div></div> : chapter === 1 ? <div className="care-scene"><p>{t.layers[1]}</p><div>{t.care.map((label, i) => <div className="care-task" key={label}><bdi dir="ltr">0{i + 1}</bdi><span>{label}</span><div className={`care-trace care-trace--${i}`}><i /><i /><i /><i /><i /></div></div>)}</div></div> : <div className="recovery-scene"><p>{t.recovery}</p><div className="recovery-stack">{t.versions.map((label, i) => <div key={label}><bdi dir="ltr">0{i + 1}</bdi><span>{label}</span><i /></div>)}</div><div className="recovery-return"><span aria-hidden="true">↳</span><strong>{t.restore}</strong></div></div>)}
    {serviceId === "turnaround" && (chapter === 0 ? <div className="prepare-scene"><p>{t.milestones[0]}</p><div className="brief-sheets">{t.materials.map((label, i) => <div key={label}><bdi dir="ltr">0{i + 1}</bdi><span>{label}</span><i /><i /></div>)}</div></div> : chapter === 1 ? <div className="preview-scene"><p>{t.milestones[1]}</p><div className="preview-photo"><img src="/media/brand-refresh/v1/studio-tablet.webp" alt="" width="960" height="640" /><span>{t.review[0]}</span></div><div className="preview-feedback"><span>↳</span><strong>{t.review[1]}</strong><i /><i /></div></div> : <div className="launch-scene"><p>{t.milestones[2]}</p><div className="launch-route">{t.launch.map((label, i) => <div key={label}><bdi dir="ltr">0{i + 1}</bdi><span>{label}</span></div>)}</div><bdi className="launch-destination" dir="ltr" lang="en">WWW<span>↗</span></bdi></div>)}
  </div>;
}

export default function ServiceFoundationShowcase({ locale, serviceId }: { locale: SiteLanguage; serviceId: FoundationService }) {
  const [chapter, setChapter] = useState(0);
  const { root, replay } = useServiceMotion(chapter);
  const t = FOUNDATION_VISUALS[locale];
  return <div className="service-foundation-study" ref={root}>
    <div className="foundation-card-controls" role="group" aria-label={t.note}>{t[serviceId].map((label, i) => <button key={label} type="button" aria-pressed={chapter === i} aria-controls="foundation-hero-scene" onClick={() => setChapter(i)}><bdi dir="ltr" aria-hidden="true">0{i + 1}</bdi><span>{label}</span></button>)}</div>
    <figure><div id="foundation-hero-scene"><FoundationComposition key={chapter} locale={locale} serviceId={serviceId} chapter={chapter} /></div><figcaption aria-live="polite" aria-atomic="true"><bdi dir="ltr">0{chapter + 1}</bdi><span>{t[serviceId][chapter]}</span></figcaption></figure>
    <div className="foundation-study-footer"><p className="service-study-note">{t.note}</p><button className="service-motion-replay" type="button" onClick={replay}>{SERVICE_VISUAL_COPY[locale].replay}<span aria-hidden="true">↻</span></button></div>
  </div>;
}
