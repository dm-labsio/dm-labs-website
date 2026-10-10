import React, { useRef, useState } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { useVisibleMotion } from "./useVisibleMotion";
import "./HomeServiceRibbon.css";

const COPY = {
  en: { items: ["Custom websites", "Distinctive branding", "Promotional videos", "Personal support"], pause: "Pause service ribbon", resume: "Resume service ribbon" },
  el: { items: ["Ιστοσελίδες στα μέτρα σας", "Ξεχωριστή εταιρική ταυτότητα", "Διαφημιστικά βίντεο", "Προσωπική υποστήριξη"], pause: "Παύση κίνησης υπηρεσιών", resume: "Συνέχιση κίνησης υπηρεσιών" },
  he: { items: ["אתרים בעיצוב אישי", "מיתוג עם אופי", "סרטוני תדמית ופרסום", "ליווי אישי"], pause: "עצירת רצועת השירותים", resume: "הפעלת רצועת השירותים" },
};

export default function HomeServiceRibbon({ language }: { language: SiteLanguage }) {
  const ref = useRef<HTMLDivElement>(null);
  const playing = useVisibleMotion(ref);
  const [paused, setPaused] = useState(false);
  const copy = COPY[language];
  return <div ref={ref} className="home-service-ribbon" dir={language === "he" ? "rtl" : "ltr"} data-motion={playing && !paused ? "playing" : "paused"}>
    <button type="button" className="home-service-ribbon-control" onClick={() => setPaused(value => !value)} aria-label={`${paused ? copy.resume : copy.pause}: ${copy.items.join(" · ")}`} aria-pressed={paused}>
      <span className="home-service-ribbon-track">
        {[0, 1].map(repeat => <span key={repeat} className="home-service-ribbon-copy" aria-hidden={repeat === 1 ? true : undefined}>
          {copy.items.map(item => <span className="home-service-ribbon-item" key={item}><span>{item}</span><span className="home-service-ribbon-spark" aria-hidden="true">✳</span></span>)}
        </span>)}
      </span>
    </button>
  </div>;
}
