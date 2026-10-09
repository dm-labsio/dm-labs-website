import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { SiteLanguage } from "@/lib/routeLanguage";
import {
  isSeasonActive,
  SEASONAL_CONFIG,
  seasonalParticles,
} from "./seasonalConfig";
import "./HalloweenLayer.css";
import SeasonalSection from "./SeasonalSection";

const COPY = {
  en: {
    text: "Happy Halloween!",
    offer:
      "Contact us this October for 10% off your one-time website build. Monthly fees excluded.",
    link: "Let’s talk",
    close: "Hide Halloween decorations",
  },
  el: {
    text: "Καλό Halloween!",
    offer:
      "Μιλήστε μας μέσα στον Οκτώβριο και κερδίστε 10% έκπτωση στην κατασκευή της ιστοσελίδας σας. Δεν ισχύει για τις μηνιαίες χρεώσεις.",
    link: "Επικοινωνία",
    close: "Απόκρυψη διακόσμησης Halloween",
  },
  he: {
    text: "האלווין שמח!",
    offer:
      "פנו אלינו באוקטובר ותקבלו 10% הנחה על התשלום החד־פעמי לבניית האתר. ההנחה לא חלה על התשלומים החודשיים.",
    link: "צרו קשר",
    close: "הסתרת קישוטי האלווין",
  },
};
const PLAYED_KEY = `dm-season-played:${SEASONAL_CONFIG.id}`;
const HIDDEN_KEY = `dm-season-hidden:${SEASONAL_CONFIG.id}`;

export function Bat() {
  return (
    <svg viewBox="0 0 80 36" fill="currentColor" focusable="false">
      <path d="M40 15 35 6 33 14C23 14 13 5 3 2c4 7 3 14-2 21 10-3 18-1 22 6 7-3 12-2 17 7 5-9 10-10 17-7 4-7 12-9 22-6-5-7-6-14-2-21-10 3-20 12-30 12L45 6Z" />
    </svg>
  );
}
export function Ghost() {
  return (
    <svg viewBox="0 0 40 52" fill="currentColor" focusable="false">
      <path d="M5 23C5 1 35 1 35 23v25l-8-5-7 6-7-6-8 5Z" />
      <ellipse cx="15" cy="23" rx="2" ry="3" fill="#262139" />
      <ellipse cx="25" cy="23" rx="2" ry="3" fill="#262139" />
    </svg>
  );
}
export function Web({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth=".7">
        <path d="M0 0 198 0M0 0 190 65M0 0 145 145M0 0 65 190M0 0 0 198" />
        {[35, 70, 110, 155, 195].map(r => (
          <path
            key={r}
            d={`M${r} 0 Q${r * 0.74} ${r * 0.09} ${r * 0.94} ${r * 0.32} Q${r * 0.65} ${r * 0.35} ${r * 0.7} ${r * 0.7} Q${r * 0.35} ${r * 0.65} ${r * 0.32} ${r * 0.94} Q${r * 0.09} ${r * 0.74} 0 ${r}`}
          />
        ))}
      </g>
    </svg>
  );
}

export default function HalloweenLayer({
  language,
}: {
  language: SiteLanguage;
}) {
  const [visible, setVisible] = useState(isSeasonActive);
  const [running, setRunning] = useState(false);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<Element[]>([]);
  const [photoFrames, setPhotoFrames] = useState<Element[]>([]);
  const copy = COPY[language];

  useEffect(() => {
    // Portals add ornaments to existing section gutters without duplicating content.
    setSections(
      Array.from(
        document.querySelectorAll(
          ".home-film, .home-examples, .home-overview-services, .home-overview-process, .home-stories, .package-overview, .industry-gallery, .home-team"
        )
      )
    );
    setPhotoFrames(
      Array.from(
        document.querySelectorAll(".home-team .team-profile-photo-frame")
      )
    );
  }, []);

  useEffect(() => {
    if (!visible) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = matchMedia("(max-width: 767px)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let played = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      played =
        SEASONAL_CONFIG.particles.oncePerSession &&
        !!sessionStorage.getItem(PLAYED_KEY);
    } catch {
      /* Optional. */
    }
    const resize = () => setMobile(narrow.matches);
    resize();
    const stop = () => {
      setRunning(false);
      if (timer) clearTimeout(timer);
    };
    const updateMotion = () => {
      if (motion.matches) stop();
    };
    const updateVisibility = () => {
      if (!isSeasonActive()) setVisible(false);
      if (document.hidden) stop();
    };
    const expiry = setInterval(updateVisibility, 60_000);
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) {
          stop();
          return;
        }
        if (
          played ||
          motion.matches ||
          document.hidden ||
          connection?.saveData ||
          !SEASONAL_CONFIG.particles.enabled
        )
          return;
        played = true;
        try {
          if (SEASONAL_CONFIG.particles.oncePerSession)
            sessionStorage.setItem(PLAYED_KEY, "1");
        } catch {
          /* Optional. */
        }
        setRunning(true);
        timer = setTimeout(
          stop,
          Math.min(4500, SEASONAL_CONFIG.particles.durationMs)
        );
      },
      { threshold: 0.2 }
    );
    if (root.current) observer.observe(root.current);
    motion.addEventListener("change", updateMotion);
    narrow.addEventListener("change", resize);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      clearInterval(expiry);
      if (timer) clearTimeout(timer);
      motion.removeEventListener("change", updateMotion);
      narrow.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [visible]);

  if (!visible) return null;
  const hide = () => {
    try {
      sessionStorage.setItem(HIDDEN_KEY, "1");
    } catch {
      /* Still hides for this visit. */
    }
    // Move focus to the unchanged main CTA before removing the focused close button.
    root.current
      ?.closest(".home-hero")
      ?.querySelector<HTMLAnchorElement>(".home-hero-primary")
      ?.focus({ preventScroll: true });
    setVisible(false);
    window.dispatchEvent(new Event("dm-season-hide"));
  };
  return (
    <div
      ref={root}
      className="seasonal-layer"
      data-seasonal-runtime="halloween"
      data-motion={running ? "playing" : "still"}
    >
      {SEASONAL_CONFIG.banner ? (
        <aside
          className="seasonal-banner"
          data-nosnippet=""
          aria-label={language === "he" ? "האלווין" : "Halloween"}
        >
          <svg
            className="seasonal-banner-drips"
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M0 0H1000V5H956v7a4 4 0 0 1-8 0V5H848v13a5 5 0 0 1-10 0V5H730v5a3 3 0 0 1-6 0V5H568v9a4 4 0 0 1-8 0V5H390v15a4 4 0 0 1-8 0V5H240v7a4 4 0 0 1-8 0V5H112v12a5 5 0 0 1-10 0V5H44v4a3 3 0 0 1-6 0V5H0Z"
              fill="currentColor"
            />
          </svg>
          <img
            className="seasonal-banner-mark"
            src="/media/seasonal/halloween-2026/glass-skeleton-320.webp"
            width="320"
            height="320"
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="low"
          />
          <div className="seasonal-banner-copy">
            <strong>{copy.text}</strong>
            <span>
              {copy.offer.split("10%")[0]}
              <b>10%</b>
              {copy.offer.split("10%")[1]}
            </span>
          </div>
          <a href={language === "en" ? "/contact/" : `/${language}/contact/`}>
            {copy.link}
            <span aria-hidden="true">{language === "he" ? "↖" : "↗"}</span>
          </a>
          <button type="button" onClick={hide} aria-label={copy.close}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m6 6 8 8M14 6l-8 8" />
            </svg>
          </button>
        </aside>
      ) : null}
      <div className="seasonal-decor" aria-hidden="true">
        {SEASONAL_CONFIG.webs ? (
          <>
            <Web className="seasonal-web seasonal-web--start" />
            <Web className="seasonal-web seasonal-web--end" />
          </>
        ) : null}
        <div className="seasonal-stage">
          <div className="seasonal-amber" />
          {SEASONAL_CONFIG.artwork ? (
            <img
              className="seasonal-glass"
              data-artwork="amber-pumpkin"
              src="/media/seasonal/halloween-2026/amber-pumpkin-320.webp"
              width="320"
              height="320"
              alt=""
              fetchPriority="low"
              decoding="async"
            />
          ) : null}
          {running ? (
            <div className="seasonal-particles">
              {seasonalParticles(mobile).map(particle => (
                <span
                  key={particle.id}
                  className={`seasonal-particle seasonal-particle--${particle.kind}`}
                  style={
                    {
                      "--x": `${particle.x}%`,
                      "--y": `${particle.y}%`,
                      "--delay": `${particle.delay}ms`,
                      "--drift": `${particle.drift}px`,
                      "--duration": `${Math.max(200, Math.min(4500, SEASONAL_CONFIG.particles.durationMs) - 400)}ms`,
                    } as CSSProperties
                  }
                >
                  {particle.kind === "bat" ? (
                    <Bat />
                  ) : particle.kind === "ghost" ? (
                    <Ghost />
                  ) : null}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {SEASONAL_CONFIG.webs && SEASONAL_CONFIG.photoOrnament === "webs"
        ? photoFrames.map((frame, index) =>
            createPortal(
              <div
                className="seasonal-photo-ornament"
                data-seasonal-runtime="photo-ornament"
                data-ornament="webs"
                aria-hidden="true"
              >
                <Web className="seasonal-photo-web seasonal-photo-web--top" />
                <Web className="seasonal-photo-web seasonal-photo-web--bottom" />
              </div>,
              frame,
              `seasonal-photo-${index}`
            )
          )
        : null}
      {sections.map((section, index) =>
        createPortal(
          <SeasonalSection
            index={index}
            web={
              SEASONAL_CONFIG.webs ? (
                <Web className="seasonal-section-web" />
              ) : null
            }
            bat={<Bat />}
          />,
          section,
          `seasonal-section-${index}`
        )
      )}
    </div>
  );
}
