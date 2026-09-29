import React from "react";
import type { HomeLocale } from "./overviewContent";
import { INDUSTRY_IDS, INDUSTRY_COPY, INDUSTRY_UI, INDUSTRY_IMAGES } from "./industryContent";
import "./HomeIndustryGallery.css";

export default function HomeIndustryGallery({ language }: { language: HomeLocale }) {
  const t = INDUSTRY_UI[language];
  const contact = `${language === "en" ? "" : `/${language}`}/contact/`;
  return <section id="industries" tabIndex={-1} className="industry-gallery" lang={language} dir={language === "he" ? "rtl" : "ltr"} aria-labelledby="industry-gallery-title"><div className="container">
    <header className="industry-gallery-heading"><p className="brand-micro">{t.label}</p><h2 id="industry-gallery-title">{t.title}</h2><p>{t.intro}</p></header>
    <div className="industry-gallery-list">{INDUSTRY_COPY[language].map((item, i) => <details className="industry-gallery-item" key={INDUSTRY_IDS[i]} id={`industry-${INDUSTRY_IDS[i]}`}>
      <summary><div className="industry-gallery-image"><img src={INDUSTRY_IMAGES[i].src} srcSet={`${INDUSTRY_IMAGES[i].small} 480w, ${INDUSTRY_IMAGES[i].src} 800w`} sizes="(max-width: 599px) calc(100vw - 48px), 380px" alt="" width="800" height="600" loading="lazy" decoding="async" /></div><div className="industry-gallery-copy"><span className="brand-micro industry-gallery-number" aria-hidden="true"><bdi dir="ltr">0{i + 1}</bdi></span><h3>{item.name}</h3><p>{item.lead}</p><span className="industry-gallery-prompt"><span className="industry-gallery-open-label">{t.more}</span><span className="industry-gallery-close-label">{t.less}</span></span></div><span className="industry-gallery-toggle" aria-hidden="true" /></summary>
      <div className="industry-gallery-detail"><ul>{item.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul><a href={contact}>{t.contact}<span aria-hidden="true">{language === "he" ? "←" : "→"}</span></a></div>
    </details>)}</div>
    <p className="industry-gallery-note">{t.note}</p>
    <aside className="industry-gallery-other"><div><h3>{t.other}</h3><p>{t.otherCopy}</p></div><a href={contact}>{t.cta}<span aria-hidden="true">{language === "he" ? "←" : "→"}</span></a></aside>
  </div></section>;
}
