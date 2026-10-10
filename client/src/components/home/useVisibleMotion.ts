import { useEffect, useState, type RefObject } from "react";

/** Run decorative motion only while visible, with no per-frame React updates. */
export function useVisibleMotion(ref: RefObject<HTMLElement | null>) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    const sync = () => setPlaying(visible && !document.hidden && !preference.matches && !connection?.saveData);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .15 });
    if (ref.current) observer.observe(ref.current);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);
  return playing;
}
