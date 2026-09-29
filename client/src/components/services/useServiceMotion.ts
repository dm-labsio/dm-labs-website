import { useEffect, useRef, useState } from "react";

type AnimeModule = Pick<typeof import("animejs"), "animate" | "createScope" | "stagger">;

/** Independent lifecycle so preference, navigation and deferred-load races can be verified. */
export function attachServiceMotion(element: HTMLElement, loadAnime: () => Promise<AnimeModule> = () => import("./serviceAnimationEngine")) {
    let disposed = false;
    let started = false;
    let inView = false;
    let scope: { revert: () => void } | undefined;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => { scope?.revert(); scope = undefined; };
    const play = async () => {
      if (started || preference.matches || document.hidden) return;
      started = true;
      try {
        const { animate, createScope, stagger } = await loadAnime();
        if (disposed || !inView || preference.matches || document.hidden) return;
        scope = createScope({ root: element }).add(() => {
          const pieces = element.querySelectorAll<HTMLElement>("[data-motion-piece]");
          const lines = element.querySelectorAll<HTMLElement>("[data-motion-line]");
          const loads = element.querySelectorAll<HTMLElement>("[data-motion-load]");
          const taps = element.querySelectorAll<HTMLElement>("[data-motion-tap]");
          const cards = element.querySelectorAll<HTMLElement>("[data-motion-card]");
          if (cards.length) animate(cards, { x: [12, 0], opacity: [.85, 1], duration: 350, ease: "out(3)" });
          if (pieces.length) animate(pieces, { y: [26, 0], scale: [.97, 1], opacity: [.6, 1], duration: 900, delay: stagger(90), ease: "out(4)" });
          if (lines.length) animate(lines, { scaleX: [0, 1], duration: 1200, delay: stagger(100), ease: "inOut(3)" });
          if (loads.length) animate(loads, { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], duration: 1100, delay: stagger(160), ease: "out(3)" });
          if (taps.length) animate(taps, { scale: [1.7, 1], opacity: [.2, 1], duration: 900, ease: "out(3)" });
        });
      } catch { /* Keep the complete static artwork if the optional chunk is unavailable. */ }
    };
    const observer = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (inView) void play();
      else if (started) settle();
    }, { threshold: .15 });
    observer.observe(element);
    const onPreference = () => { if (preference.matches) settle(); };
    const onVisibility = () => { if (document.hidden) settle(); };
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposed = true;
      observer.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      settle();
    };

}

/** Animate artwork only. The complete composition and copy are the static default. */
export function useServiceMotion(scene: string | number) {
  const root = useRef<HTMLDivElement>(null);
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    if (!root.current) return;
    return attachServiceMotion(root.current);
  }, [scene, replay]);
  return { root, replay: () => setReplay(value => value + 1) };
}
