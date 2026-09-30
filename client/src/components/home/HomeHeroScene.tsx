import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function motionPreference() { return window.matchMedia(REDUCED_MOTION_QUERY).matches; }
function serverMotionPreference() { return true; }

/** Motion enhances an already complete image; no content depends on its playback. */
export default function HomeHeroScene() {
  const scope = useRef<HTMLDivElement>(null);
  const inView = useInView(scope, { amount: .25 });
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, motionPreference, serverMotionPreference);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 24 });
  const springY = useSpring(y, { stiffness: 90, damping: 24 });
  const gradientId = useId();

  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth) setImageReady(true);
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const playing = imageReady && inView && pageVisible && !reducedMotion;
  useEffect(() => {
    if (!playing) { x.set(0); y.set(0); }
  }, [playing, x, y]);

  return (
    <div className="home-hero-scene" ref={scope} data-motion={reducedMotion ? "reduced" : playing ? "playing" : "paused"}>
      <div className="home-hero-art" aria-hidden="true"
        onPointerMove={event => {
          if (!playing || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return;
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
              <path className="home-hero-orbit-light" pathLength="1" d="M66 397 C-20 265 486 31 568 158 C654 290 148 524 66 397Z" />
            </g>
              <path className="home-hero-orbit-light home-hero-orbit-light--secondary" pathLength="1" d="M117 95 C277 -26 646 477 491 594 C331 715 -38 212 117 95Z" />
          </svg></div>
          <div className="home-hero-sculpture">
            <img ref={imageRef}
              src="/media/brand-v1/home-glass-sculpture-960.webp"
              srcSet="/media/brand-v1/home-glass-sculpture-480.webp 480w, /media/brand-v1/home-glass-sculpture-960.webp 960w"
              sizes="(max-width: 1023px) 110vw, 46vw"
              alt="" width="960" height="1091" fetchPriority="high" decoding="async"
              onLoad={() => setImageReady(true)} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
