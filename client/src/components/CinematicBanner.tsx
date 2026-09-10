import { useEffect, useRef, useState } from "react";

export type CinematicBannerProps = {
  videoSrc: string;
  label: string;
  accent?: "cyan" | "violet" | "blue";
};

/**
 * Decorative desktop-only media break.
 *
 * The MP4 URL is deliberately not attached until the banner is near the viewport.
 * Mobile, reduced-motion, and data-saving visitors keep the lightweight brand fallback.
 */
export default function CinematicBanner({ videoSrc, label, accent = "cyan" }: CinematicBannerProps) {
  const bannerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const network = navigator as Navigator & { connection?: { saveData?: boolean } };

    if (motionQuery.matches || !desktopQuery.matches || network.connection?.saveData || !bannerRef.current) return;

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setShouldLoad(entry.isIntersecting);
      },
      { rootMargin: "1200px 0px", threshold: 0.01 },
    );

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.08 },
    );

    preloadObserver.observe(bannerRef.current);
    visibilityObserver.observe(bannerRef.current);
    return () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isVisible) {
      const play = video.play();
      void play?.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible, shouldLoad]);

  return (
    <section
      ref={bannerRef}
      className={`cinematic-banner cinematic-banner--${accent}`}
      aria-label={label}
    >
      <div className="cinematic-banner__fallback" aria-hidden="true" />
      {shouldLoad ? (
        <video
          ref={videoRef}
          className={`cinematic-banner__video ${isReady ? "is-ready" : ""}`}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
        />
      ) : null}
      <div className="cinematic-banner__wash" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </section>
  );
}
