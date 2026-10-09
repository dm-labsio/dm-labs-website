import { useEffect, useState, type CSSProperties } from "react";
import { Bat } from "./HalloweenLayer";
import { isSeasonActive, SEASONAL_CONFIG } from "./seasonalConfig";

/** A few edge silhouettes, with one short flight on first entry to each route. */
export default function SeasonalBats() {
  const [visible, setVisible] = useState(isSeasonActive);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const key = `dm-season-bats:${SEASONAL_CONFIG.id}:${location.pathname.replace(/\/$/, "") || "/"}`;
    let played = false;
    try {
      played =
        SEASONAL_CONFIG.particles.oncePerSession &&
        !!sessionStorage.getItem(key);
    } catch {
      /* Optional. */
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stop = () => setRunning(false);
    const hide = () => setVisible(false);
    const check = () => {
      if (!isSeasonActive()) hide();
      if (document.hidden || motion.matches) stop();
    };
    if (
      !played &&
      !motion.matches &&
      !connection?.saveData &&
      !document.hidden &&
      SEASONAL_CONFIG.particles.enabled
    ) {
      setRunning(true);
      try {
        if (SEASONAL_CONFIG.particles.oncePerSession)
          sessionStorage.setItem(key, "1");
      } catch {
        /* Optional. */
      }
      timer = setTimeout(
        stop,
        Math.min(4500, SEASONAL_CONFIG.particles.durationMs)
      );
    }
    const expiry = setInterval(check, 60_000);
    window.addEventListener("dm-season-hide", hide);
    document.addEventListener("visibilitychange", check);
    motion.addEventListener("change", check);
    return () => {
      if (timer) clearTimeout(timer);
      clearInterval(expiry);
      window.removeEventListener("dm-season-hide", hide);
      document.removeEventListener("visibilitychange", check);
      motion.removeEventListener("change", check);
    };
  }, []);
  if (!visible) return null;
  return (
    <div
      className="seasonal-bats"
      data-seasonal-runtime="bats"
      data-motion={running ? "playing" : "still"}
      aria-hidden="true"
      style={
        {
          "--bat-duration": `${Math.min(4500, SEASONAL_CONFIG.particles.durationMs)}ms`,
        } as CSSProperties
      }
    >
      {[0, 1, 2, 3].map(index => (
        <span
          key={index}
          className={`seasonal-edge-bat seasonal-edge-bat--${index}`}
        >
          <Bat />
        </span>
      ))}
    </div>
  );
}
