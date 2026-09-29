import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription } from "../ui/dialog";
import type { HomeLocale } from "./overviewContent";
import { INDUSTRY_IDS, INDUSTRY_COPY, INDUSTRY_UI, INDUSTRY_IMAGES } from "./industryContent";
import "./HomeIndustryGallery.css";

const contactPath = (language: HomeLocale) => `${language === "en" ? "" : `/${language}`}/contact/`;
const closeLabel = { en: "Close", el: "Κλείσιμο", he: "סגירה" };

export function IndustryDetails({ language, index }: { language: HomeLocale; index: number }) {
  const item = INDUSTRY_COPY[language][index];
  return <div className="industry-gallery-detail"><ul>{item.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul><a href={contactPath(language)}>{INDUSTRY_UI[language].contact}<span aria-hidden="true">{language === "he" ? "←" : "→"}</span></a></div>;
}

export default function HomeIndustryGallery({ language }: { language: HomeLocale }) {
  const t = INDUSTRY_UI[language];
  return <section id="industries" tabIndex={-1} className="industry-gallery" lang={language} dir={language === "he" ? "rtl" : "ltr"} aria-labelledby="industry-gallery-title"><div className="container">
    <header className="industry-gallery-heading"><p className="brand-micro">{t.label}</p><h2 id="industry-gallery-title">{t.title}</h2><p>{t.intro}</p></header>
    <div className="industry-gallery-list">{INDUSTRY_COPY[language].map((item, i) => <Dialog key={INDUSTRY_IDS[i]}>
      <DialogTrigger asChild><button type="button" className="industry-gallery-card" id={`industry-${INDUSTRY_IDS[i]}`}>
        <span className="industry-gallery-image"><img src={INDUSTRY_IMAGES[i].src} srcSet={`${INDUSTRY_IMAGES[i].small} 480w, ${INDUSTRY_IMAGES[i].src} 800w`} sizes="(max-width: 599px) 280px, (max-width: 999px) 33vw, 240px" alt="" width="800" height="600" loading="lazy" decoding="async" /></span>
        <span className="industry-gallery-copy"><span className="industry-gallery-card-title">{item.name}</span><span className="industry-gallery-prompt">{t.more}<span aria-hidden="true">{language === "he" ? "←" : "→"}</span></span></span>
      </button></DialogTrigger>
      <DialogContent className="industry-dialog" showCloseButton={false} data-brand="dm-labs" lang={language} dir={language === "he" ? "rtl" : "ltr"}>
        <DialogClose className="industry-dialog-close">{closeLabel[language]}<span aria-hidden="true">×</span></DialogClose>
        <img className="industry-dialog-image" src={INDUSTRY_IMAGES[i].src} alt="" width="800" height="600" />
        <div className="industry-dialog-copy"><DialogTitle>{item.name}</DialogTitle><DialogDescription>{item.lead}</DialogDescription><IndustryDetails language={language} index={i} /></div>
      </DialogContent>
    </Dialog>)}
      <aside className="industry-gallery-other"><h3>{t.other}</h3><p>{t.otherCopy}</p><a href={contactPath(language)}>{t.cta}<span aria-hidden="true">{language === "he" ? "←" : "→"}</span></a></aside>
    </div>
    <p className="industry-gallery-note">{t.note}</p>
  </div></section>;
}
