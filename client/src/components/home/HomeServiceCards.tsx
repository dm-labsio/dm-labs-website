import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { overviewContent, type HomeLocale } from "./overviewContent";
import { SERVICE_CARD_MEDIA, SERVICE_CARD_COPY } from "./serviceCardContent";
import { attachCardVideo } from "./serviceCardVideo";
import "./HomeServiceCards.css";

export function HomeServiceCard({ language, index, open, onOpen, onToggle }: {
  language: HomeLocale; index: number; open: boolean; onOpen: () => void; onToggle: () => void;
}) {
  const item = overviewContent[language].services[index];
  const media = SERVICE_CARD_MEDIA[index];
  const copy = SERVICE_CARD_COPY[language];
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const id = `home-service-${item.slug}`;

  useEffect(() => {
    setReady(false);
    if (!open || !video.current) return;
    return attachCardVideo(video.current, media.video);
  }, [open, media.video]);

  return <article className="home-service-card" data-open={open} onPointerEnter={event => {
    if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1000px)").matches) onOpen();
  }}>
    <div className="home-service-card-media" aria-hidden="true">
      <img src={media.poster} width={960} height={364} loading="lazy" decoding="async" alt="" />
      <video ref={video} muted playsInline preload="none" tabIndex={-1} data-ready={open && ready} onLoadedData={() => setReady(true)} onError={() => setReady(false)} />
    </div>
    <div className="home-service-card-copy">
      <div className="home-service-card-meta"><span className="brand-latin-code" lang="en" dir="ltr">{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">{open ? copy.close : copy.open}</span></div>
      <h3><button type="button" aria-expanded={open} aria-controls={`${id}-detail`} onClick={onToggle}>{item.title}<span aria-hidden="true">{open ? "−" : "+"}</span></button></h3>
      {!open && <p className="home-service-card-summary">{copy.summaries[index]}</p>}
      <div id={`${id}-detail`} className="home-service-card-detail" hidden={!open}>
        <p>{item.body}</p>
        <Link href={`${language === "en" ? "" : `/${language}`}/services/${item.slug}/`} className="home-service-card-link">{copy.more}<span aria-hidden="true">{language === "he" ? "←" : "→"}</span></Link>
      </div>
    </div>
  </article>;
}

export default function HomeServiceCards({ language }: { language: HomeLocale }) {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  return <div className="home-service-cards" onKeyDown={event => { if (event.key === "Escape") { setActive(null); setPinned(false); } }}>
    {[0, 3].map(start => <div className="home-service-row" key={start} data-active={active !== null && active >= start && active < start + 3 ? active - start : "none"}>
      {[start, start + 1, start + 2].map(index => <HomeServiceCard key={index} language={language} index={index} open={active === index} onOpen={() => {
        if (active !== index) { setActive(index); setPinned(false); }
      }} onToggle={() => { setActive(active === index && pinned ? null : index); setPinned(!(active === index && pinned)); }} />)}
    </div>)}
  </div>;
}
