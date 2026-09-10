import { useEffect, useRef, useState } from "react";

export type CinematicHeroKind = "services" | "process" | "templates" | "pricing" | "faq" | "contact";

const HERO_VIDEO_SOURCES: Record<CinematicHeroKind, string> = {
  services: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_premium_technology_animation.mp4",
  process: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_futuristic_digitalflow_animation.mp4",
  templates: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_hightech_gallery_animation.mp4",
  pricing: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/premium_growth_animation_from_this_exact_image.mp4",
  faq: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/futuristic_editorial_animation_from_this_exact_image.mp4",
  contact: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_futuristic_conversation_animation.mp4",
};

type CinematicHeroBackgroundProps = {
  kind: CinematicHeroKind;
  position?: string;
};

/**
 * Decorative Hero motion for desktop devices.
 *
 * The MP4 source is absent from initial HTML and only attaches once the Hero
 * enters the nearby viewport. Mobile, reduced-motion, and Save-Data visitors
 * retain the existing static Hero design without creating a video element.
 */
export default function CinematicHeroBackground({
  kind,
  position = "68% center",
}: CinematicHeroBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const network = navigator as Navigator & { connection?: { saveData?: boolean } };

    if (motionQuery.matches || !desktopQuery.matches || network.connection?.saveData || !rootRef.current) return;

    const preloadObserver = new IntersectionObserver(
      ([entry]) => setShouldLoad(Boolean(entry?.isIntersecting)),
      { rootMargin: "180px 0px", threshold: 0.01 },
    );
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.08 },
    );

    preloadObserver.observe(rootRef.current);
    visibilityObserver.observe(rootRef.current);
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
    <div ref={rootRef} className="cinematic-hero-media" aria-hidden="true">
      <div className="cinematic-hero-media__fallback" />
      {shouldLoad ? (
        <video
          ref={videoRef}
          className={`cinematic-hero-media__video ${isReady ? "is-ready" : ""}`}
          src={HERO_VIDEO_SOURCES[kind]}
          style={{ objectPosition: position }}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
        />
      ) : null}
      <div className="cinematic-hero-media__wash" />
    </div>
  );
}
