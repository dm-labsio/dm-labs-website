import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { seasonalArtwork, SEASONAL_CONFIG } from "./seasonalConfig";

function Spider() {
  return (
    <svg viewBox="0 0 40 110" fill="none" focusable="false">
      <path d="M20 0v79" stroke="currentColor" strokeWidth=".7" opacity=".55" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="m16 86-8-9-4 5m12 7-10-3-3 5m13 1-10 3-2 6m13-6-8 7 1 5m14-21 8-9 4 5m-12 7 10-3 3 5m-13 1 10 3 2 6m-13-6 8 7-1 5" />
      </g>
      <ellipse cx="20" cy="92" rx="6" ry="8" fill="currentColor" />
      <circle cx="20" cy="82" r="4" fill="currentColor" />
    </svg>
  );
}

/** One small entrance per ornament per session, never a continuous scroll loop. */
export default function SeasonalSection({
  index,
  web,
  bat,
}: {
  index: number;
  web: ReactNode;
  bat: ReactNode;
}) {
  const anchor = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const kind = seasonalArtwork(index + 1); // The hero uses amber; continue the cycle.
  useEffect(() => {
    if (!SEASONAL_CONFIG.scrollMotion.enabled) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const key = `dm-season-scroll:${SEASONAL_CONFIG.id}:${location.pathname}:${index}`;
    let played = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      played = !!sessionStorage.getItem(key);
    } catch {
      /* Optional preference. */
    }
    const stop = () => {
      setRunning(false);
      if (timer) clearTimeout(timer);
    };
    const preferenceChanged = () => {
      if (motion.matches || document.hidden) stop();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stop();
          return;
        }
        if (played || motion.matches || connection?.saveData || document.hidden)
          return;
        played = true;
        try {
          sessionStorage.setItem(key, "1");
        } catch {
          /* Still once this mount. */
        }
        setRunning(true);
        timer = setTimeout(
          stop,
          Math.min(4500, SEASONAL_CONFIG.scrollMotion.durationMs)
        );
      },
      { threshold: 0.25 }
    );
    if (anchor.current) observer.observe(anchor.current);
    motion.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", preferenceChanged);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      motion.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", preferenceChanged);
    };
  }, [index]);
  return (
    <div
      className={`seasonal-section-decor seasonal-section-decor--${index % 3}`}
      data-seasonal-runtime="ornament"
      aria-hidden="true"
    >
      {web}
      <div
        ref={anchor}
        className={`seasonal-scroll-scene seasonal-scroll-scene--${index % 2 ? "left" : "right"}`}
        data-motion={running ? "playing" : "still"}
        style={
          {
            "--scroll-duration": `${Math.min(4500, SEASONAL_CONFIG.scrollMotion.durationMs)}ms`,
          } as CSSProperties
        }
      >
        {SEASONAL_CONFIG.artwork ? (
          <img
            className="seasonal-single"
            data-artwork={kind}
            src={`/media/seasonal/halloween-2026/${kind}-320.webp`}
            width="320"
            height="320"
            alt=""
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        ) : null}
        {SEASONAL_CONFIG.scrollMotion.enabled ? (
          index % 2 === 0 ? (
            <span className="seasonal-scroll-spider">
              <Spider />
            </span>
          ) : (
            <span className="seasonal-scroll-bat">{bat}</span>
          )
        ) : null}
      </div>
    </div>
  );
}
