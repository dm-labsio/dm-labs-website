import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { motion, useAnimate, useInView, useMotionValue, useSpring } from "framer-motion";
import type { SiteLanguage } from "@/lib/routeLanguage";

const MOTION_COPY = {
  en: { pause: "Pause animation", resume: "Resume animation", replay: "Replay animation" },
  el: { pause: "Παύση κίνησης", resume: "Συνέχεια κίνησης", replay: "Επανάληψη κίνησης" },
  he: { pause: "השהיית האנימציה", resume: "המשך האנימציה", replay: "ניגון האנימציה מחדש" },
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function motionPreference() { return window.matchMedia(REDUCED_MOTION_QUERY).matches; }
function serverMotionPreference() { return true; }

/** Motion enhances an already complete image; no content depends on its playback. */
export default function HomeHeroScene({ language }: { language: SiteLanguage }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { amount: .25 });
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, motionPreference, serverMotionPreference);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  const [state, setState] = useState<"idle" | "playing" | "paused" | "finished">("idle");
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  const manuallyPaused = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 24 });
  const springY = useSpring(y, { stiffness: 90, damping: 24 });
  const gradientId = useId();
  const sceneId = useId();
  const copy = MOTION_COPY[language];

  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth) setImageReady(true);
  }, []);

  useEffect(() => {
    if (inView && imageReady && reducedMotion === false) setStarted(true);
  }, [inView, imageReady, reducedMotion]);

  useEffect(() => {
    if (!started || reducedMotion !== false) return;
    let active = true;
    manuallyPaused.current = false;
    // Each property has a single owner. The outer spring layer handles pointer depth.
    const sequence = animate([
      [".home-hero-sculpture", { transform: ["translateY(40px) scale(.82)", "translateY(-8px) scale(1.025)", "translateY(0px) scale(1)"] }, { duration: 3.8, ease: [0.16, 1, 0.3, 1], at: 0 }],
      [".home-hero-orbits", { transform: ["rotate(-32deg) scale(.72)", "rotate(0deg) scale(1)"] }, { duration: 4.4, ease: [0.16, 1, 0.3, 1], at: 0 }],
      [".home-hero-orbit-line", { strokeDashoffset: [1, 0] }, { duration: 3.6, ease: "easeInOut", at: .15 }],
      [".home-hero-orbit-light", { strokeDashoffset: [1.1, -.9], opacity: [0, 1, 1, 0] }, { duration: 4.2, ease: "easeInOut", at: .2 }],
      [".home-hero-aura", { opacity: [.3, .95, .5], transform: ["scale(.65)", "scale(1.1)", "scale(1)"] }, { duration: 4.4, at: 0 }],
    ]);
    controls.current = sequence;
    setState("playing");
    sequence.then(() => { if (active) setState("finished"); });
    return () => {
      active = false;
      sequence.stop();
      controls.current = null;
    };
  }, [animate, started, run, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !inView) {
      x.set(0);
      y.set(0);
    }
    const current = controls.current;
    if (!current || state === "finished") return;
    if (!inView || document.hidden) current.pause();
    else if (!document.hidden && !manuallyPaused.current) current.play();
  }, [inView, reducedMotion, state, x, y]);

  useEffect(() => {
    function handleVisibility() {
      const current = controls.current;
      if (!current || state === "finished") return;
      if (document.hidden) current.pause();
      else if (inView && !manuallyPaused.current) current.play();
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [inView, state]);

  function togglePlayback() {
    if (state === "playing") {
      manuallyPaused.current = true;
      controls.current?.pause();
      x.set(0);
      y.set(0);
      setState("paused");
    } else if (state === "paused") {
      manuallyPaused.current = false;
      controls.current?.play();
      setState("playing");
    } else {
      setRun(value => value + 1);
    }
  }

  return (
    <div className="home-hero-scene" ref={scope} data-motion={reducedMotion ? "reduced" : state}>
      <div id={sceneId} className="home-hero-art" aria-hidden="true"
        onPointerMove={event => {
          if (reducedMotion !== false || manuallyPaused.current || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          x.set(((event.clientX - bounds.left) / bounds.width - .5) * 18);
          y.set(((event.clientY - bounds.top) / bounds.height - .5) * 14);
        }}
        onPointerLeave={() => { x.set(0); y.set(0); }}>
        <div className="home-hero-aura" />
        <motion.div className="home-hero-depth" style={{ x: springX, y: springY }}>
          <div className="home-hero-orbits"><svg viewBox="0 0 640 640" fill="none" focusable="false">
            <defs><linearGradient id={gradientId} x1="50" y1="480" x2="570" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#70D7F0" /><stop offset=".5" stopColor="#A8B8FF" /><stop offset="1" stopColor="#A68CE8" /></linearGradient></defs>
            <g stroke={`url(#${gradientId})`}>
              <path className="home-hero-orbit-line" pathLength="1" d="M66 397 C-20 265 486 31 568 158 C654 290 148 524 66 397Z" />
              <path className="home-hero-orbit-line home-hero-orbit-secondary" pathLength="1" d="M117 95 C277 -26 646 477 491 594 C331 715 -38 212 117 95Z" />
              <path className="home-hero-orbit-light" opacity="0" pathLength="1" d="M66 397 C-20 265 486 31 568 158 C654 290 148 524 66 397Z" />
            </g>
          </svg></div>
          <div className="home-hero-sculpture">
            <img ref={imageRef}
              src="/media/brand-v1/home-glass-sculpture-960.webp"
              srcSet="/media/brand-v1/home-glass-sculpture-480.webp 480w, /media/brand-v1/home-glass-sculpture-960.webp 960w"
              sizes="(max-width: 767px) 88vw, (max-width: 1023px) 440px, 46vw"
              alt="" width="960" height="1091" fetchPriority="high" decoding="async"
              onLoad={() => setImageReady(true)} />
          </div>
        </motion.div>
      </div>
      {started && reducedMotion === false && (
        <button type="button" className="home-hero-motion-toggle" onClick={togglePlayback} aria-controls={sceneId}>
          <span aria-hidden="true">{state === "playing" ? "Ⅱ" : "↻"}</span>
          {state === "playing" ? copy.pause : state === "paused" ? copy.resume : copy.replay}
        </button>
      )}
    </div>
  );
}
