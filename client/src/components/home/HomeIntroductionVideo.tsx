import React, { useEffect, useRef, useState } from "react";
import type { HomeLocale } from "./overviewContent";
import { HOME_INTRODUCTION_COPY, HOME_INTRODUCTION_MEDIA, introductionSource } from "./homeIntroductionContent";
import "./HomeIntroductionVideo.css";

export default function HomeIntroductionVideo({ language }: { language: HomeLocale }) {
  const copy = HOME_INTRODUCTION_COPY[language];
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); observer.disconnect(); }
    }, { threshold: .2 });
    if (frame.current) observer.observe(frame.current);
    const pauseWhenHidden = () => { if (document.hidden) video.current?.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseWhenHidden); };
  }, []);

  const play = () => {
    const player = video.current;
    if (!player) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setFailed(false);
    setStarted(true);
    // Attach the source inside the click handler: no MP4 request before the visitor presses play.
    player.src = introductionSource(window.matchMedia("(max-width: 767px)").matches, connection?.saveData);
    player.controls = true;
    player.focus();
    void player.play().catch(() => { /* Native controls remain usable if playback is prevented. */ });
  };

  return <section className="home-film" id="meet-dm-labs" lang={language} dir={language === "he" ? "rtl" : "ltr"} aria-labelledby="home-film-title">
    <div className="container">
      <header className="home-film-heading">
        <div><p className="brand-micro">{copy.label}</p><h2 id="home-film-title">{copy.title}</h2></div>
      </header>
      <div className="home-film-frame" ref={frame} data-revealed={revealed} data-started={started}>
        <div className="home-film-player">
          <video ref={video} preload="none" playsInline controls={started} poster={HOME_INTRODUCTION_MEDIA.poster} width={1920} height={1080} tabIndex={started ? 0 : -1} aria-hidden={!started} aria-label={copy.play} onError={() => setFailed(true)} />
          {!started && <button className="home-film-play" type="button" onClick={play}><span className="home-film-play-symbol" aria-hidden="true">▶</span><span className="home-film-play-label">{copy.play}</span></button>}
        </div>
      </div>
      {failed && <div className="home-film-error" role="alert"><p>{copy.error}</p><button type="button" onClick={play}>{copy.retry}</button><a href={HOME_INTRODUCTION_MEDIA.desktop} target="_blank" rel="noreferrer">{copy.open}</a></div>}
    </div>
  </section>;
}
