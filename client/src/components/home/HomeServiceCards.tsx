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
      <img src={media.poster} width={960} height={542} loading="lazy" decoding="async" alt="" />
      <video ref={video} muted playsInline preload="none" tabIndex={-1} data-ready={open && ready} onLoadedData={() => setReady(true)} onError={() => setReady(false)} />
    </div>
    <div className="home-service-card-copy">
      <h3><button type="button" aria-expanded={open} aria-controls={`${id}-detail`} onClick={onToggle}>{item.title}<span aria-hidden="true">{open ? "−" : "+"}</span></button></h3>
      {!open && <p className="home-service-card-summary">{copy.summaries[index]}</p>}
      <div id={`${id}-detail`} className="home-service-card-detail" hidden={!open}>
        <p>{item.body}</p>
        <Link href={`${language === "en" ? "" : `/${language}`}/services/${item.slug}/`} className="home-service-card-link">{copy.more}</Link>
      </div>
    </div>
  </article>;
}

export default function HomeServiceCards({ language }: { language: HomeLocale }) {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);
  const controls = {
    en: { hint: "Swipe to explore our services", previous: "Previous service", next: "Next service", previousText: "Previous", nextText: "Next" },
    el: { hint: "Σύρετε για να δείτε τις υπηρεσίες", previous: "Προηγούμενη υπηρεσία", next: "Επόμενη υπηρεσία", previousText: "Πίσω", nextText: "Επόμενο" },
    he: { hint: "החליקו כדי לגלות את השירותים", previous: "השירות הקודם", next: "השירות הבא", previousText: "הקודם", nextText: "הבא" },
  }[language];
  useEffect(() => () => { if (frame.current !== null) cancelAnimationFrame(frame.current); }, []);
  function updateCurrent() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const root = track.current;
      if (!root) return;
      const bounds = root.getBoundingClientRect();
      let closest = 0;
      let distance = Infinity;
      root.querySelectorAll<HTMLElement>(".home-service-card").forEach((card, index) => {
        const box = card.getBoundingClientRect();
        const delta = Math.abs(language === "he" ? box.right - bounds.right : box.left - bounds.left);
        if (delta < distance) { distance = delta; closest = index; }
      });
      setCurrent(closest);
      frame.current = null;
    });
  }
  function moveTo(index: number) {
    const root = track.current;
    const card = root?.querySelectorAll<HTMLElement>(".home-service-card")[index];
    if (!root || !card) return;
    const bounds = root.getBoundingClientRect();
    const box = card.getBoundingClientRect();
    root.scrollBy({ left: language === "he" ? box.right - bounds.right : box.left - bounds.left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className="home-service-carousel">
    <div className="home-service-carousel-controls"><p>{controls.hint}</p><div><button type="button" aria-label={controls.previous} disabled={current === 0} onClick={() => moveTo(current - 1)}>{controls.previousText}</button><button type="button" aria-label={controls.next} disabled={current === 5} onClick={() => moveTo(current + 1)}>{controls.nextText}</button></div></div>
    <div className="home-service-cards" ref={track} onScroll={updateCurrent} onKeyDown={event => { if (event.key === "Escape") { setActive(null); setPinned(false); } }}>
    {[0, 3].map(start => <div className="home-service-row" key={start} data-active={active !== null && active >= start && active < start + 3 ? active - start : "none"}>
      {[start, start + 1, start + 2].map(index => <HomeServiceCard key={index} language={language} index={index} open={active === index} onOpen={() => {
        if (active !== index) { setActive(index); setPinned(false); }
      }} onToggle={() => { setActive(active === index && pinned ? null : index); setPinned(!(active === index && pinned)); }} />)}
    </div>)}
  </div></div>;
}
