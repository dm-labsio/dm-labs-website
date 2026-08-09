import { useEffect, useRef, type ReactNode } from "react";

export const HERO_SCRUB_VIDEO_URL = "/manus-storage/dm-labs-hero-tunnel-scrub_89732dad.mp4";
export const HERO_SCRUB_OPENING_POSTER_URL = "/manus-storage/dm-labs-hero-tunnel-opening-poster_7b05ee6d.jpg";

const REVEAL_START = 0.82;
const INTERACTION_START = 0.9;
const SCRUB_SCROLL_RATIO = 0.72;
const VIDEO_OPENING_PROGRESS = 0.15;
const MAX_PROGRESS_SPEED = 0.75;
const SEEK_TOLERANCE = 1 / 120;

const clamp = (value: number, minimum: number, maximum: number) => Math.max(minimum, Math.min(maximum, value));

type HomeHeroScrubProps = {
  children: ReactNode;
};

/**
 * A short, page-scoped scroll-to-video scrub. Scroll updates only a progress
 * target; one rAF controller advances toward it at a bounded rate and issues
 * at most one media seek at a time. This keeps the hero responsive on touch
 * devices and prevents rapid flicks from overwhelming the decoder.
 */
export default function HomeHeroScrub({ children }: HomeHeroScrubProps) {
  const scopeRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!scope || !stage || !video) return;

    video.setAttribute("webkit-playsinline", "true");

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let metadataReady = false;
    let useFallback = false;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastFrameTime = performance.now();
    let seekReady = true;
    let duration = 0;
    let frameId = 0;
    let timeoutId = 0;
    let unlocked = false;
    const scrubStart = Math.max(scope.getBoundingClientRect().top + window.scrollY - 72, 0);

    const applyVisualProgress = (progress: number) => {
      const reveal = clamp((progress - REVEAL_START) / (1 - REVEAL_START), 0, 1);
      scope.style.setProperty("--hero-progress", progress.toFixed(4));
      scope.style.setProperty("--hero-copy-progress", reveal.toFixed(4));
      scope.dataset.interactive = String(progress > INTERACTION_START);
    };

    const activateFallback = () => {
      if (useFallback) return;
      useFallback = true;
      scope.dataset.mode = "fallback";
      scope.dataset.ready = "false";
      scope.dataset.interactive = "true";
      scope.dataset.active = "true";
      scope.style.setProperty("--hero-progress", "1");
      scope.style.setProperty("--hero-copy-progress", "1");
      video.pause();
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const scheduleController = () => {
      if (!frameId && !useFallback) frameId = window.requestAnimationFrame(runController);
    };

    const runController = (now: number) => {
      frameId = 0;
      const elapsedSeconds = Math.max((now - lastFrameTime) / 1000, 0);
      lastFrameTime = now;
      const maxStep = MAX_PROGRESS_SPEED * elapsedSeconds;
      const delta = targetProgress - currentProgress;

      if (Math.abs(delta) > 0.0001) {
        currentProgress += Math.sign(delta) * Math.min(Math.abs(delta), maxStep || 0.0001);
        applyVisualProgress(currentProgress);
      }

      const desiredTime = duration * (VIDEO_OPENING_PROGRESS + (currentProgress * (1 - VIDEO_OPENING_PROGRESS)));
      if (
        metadataReady &&
        seekReady &&
        !video.seeking &&
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        Math.abs(video.currentTime - desiredTime) > SEEK_TOLERANCE
      ) {
        seekReady = false;
        video.currentTime = desiredTime;
      }

      const needsAnotherFrame =
        Math.abs(targetProgress - currentProgress) > 0.0001 ||
        !seekReady ||
        (metadataReady && Math.abs(video.currentTime - desiredTime) > SEEK_TOLERANCE);

      if (needsAnotherFrame && !useFallback) frameId = window.requestAnimationFrame(runController);
    };

    const updateFromScroll = () => {
      const scopeRect = scope.getBoundingClientRect();
      const scrollSpan = Math.max(scope.offsetHeight * SCRUB_SCROLL_RATIO, 1);
      targetProgress = clamp((window.scrollY - scrubStart) / scrollSpan, 0, 1);
      scope.dataset.active = String(scopeRect.bottom > 0);
      scheduleController();
    };

    const onSeeked = () => {
      seekReady = true;
      scheduleController();
    };

    const onLoadedMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0 || useFallback) return;
      duration = video.duration;
      metadataReady = true;
      scope.dataset.ready = "true";
      window.clearTimeout(timeoutId);
      updateFromScroll();
    };

    const unlockVideoSeeking = () => {
      if (unlocked || useFallback) return;
      unlocked = true;
      void video.play().then(() => {
        video.pause();
      }).catch(() => undefined);
      window.removeEventListener("pointerdown", unlockVideoSeeking);
      window.removeEventListener("touchstart", unlockVideoSeeking);
      window.removeEventListener("click", unlockVideoSeeking);
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) activateFallback();
    };

    if (motion.matches) {
      activateFallback();
      return;
    }

    scope.dataset.mode = "scrub";
    applyVisualProgress(0);
    timeoutId = window.setTimeout(activateFallback, 2500);

    video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", activateFallback, { once: true });
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll, { passive: true });
    window.addEventListener("pointerdown", unlockVideoSeeking, { passive: true });
    window.addEventListener("touchstart", unlockVideoSeeking, { passive: true });
    window.addEventListener("click", unlockVideoSeeking, { passive: true });
    motion.addEventListener("change", onMotionChange);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onLoadedMetadata();
    updateFromScroll();

    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) window.cancelAnimationFrame(frameId);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", activateFallback);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      window.removeEventListener("pointerdown", unlockVideoSeeking);
      window.removeEventListener("touchstart", unlockVideoSeeking);
      window.removeEventListener("click", unlockVideoSeeking);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section
      ref={scopeRef}
      className="hero-scrub-scope"
      data-mode="scrub"
      data-ready="false"
      data-interactive="false"
      data-active="true"
      aria-label="DM-Labs introduction"
    >
      <div ref={stageRef} className="hero-scrub-stage">
        <img
          src={HERO_SCRUB_OPENING_POSTER_URL}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="hero-scrub-poster"
        />
        <video
          ref={videoRef}
          src={HERO_SCRUB_VIDEO_URL}
          poster={HERO_SCRUB_OPENING_POSTER_URL}
          muted
          playsInline
          preload="auto"
          className="hero-scrub-video"
          aria-hidden="true"
        />
        <div className="hero-scrub-wash" aria-hidden="true" />
        <div className="hero-scrub-copy">
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
