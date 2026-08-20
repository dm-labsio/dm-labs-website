import { useEffect, useRef, type ReactNode } from "react";
import "./HomeHeroScrub.css";

export const HERO_SCRUB_VIDEO_URL = "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm-labs-hero-tunnel-scrub_89732dad.mp4";
export const HERO_SCRUB_OPENING_POSTER_URL = "/media/hero/dm-labs-hero-tunnel-opening-poster_7b05ee6d.webp";
export const MOBILE_HERO_SCRUB_VIDEO_URL = "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm-labs-mobile-hero-scrub-fluid_658e00fd.mp4";
export const MOBILE_HERO_SCRUB_OPENING_POSTER_URL = "/media/hero/dm-labs-mobile-hero-opening-poster_6fc35873.webp";

const VIDEO_OPENING_PROGRESS = 0.15;
const MOBILE_VIDEO_OPENING_PROGRESS = 0.05;
const VIDEO_SCRUB_END = 0.6;
const COPY_REVEAL_START = 0.66;
const COPY_REVEAL_END = 0.8;
const COPY_INTERACTIVE_START = 0.8;
const MAX_PROGRESS_SPEED = 0.75;
const MOBILE_MAX_PROGRESS_SPEED = 0.5;
const HEBREW_MOBILE_MAX_PROGRESS_SPEED = 0.75;
const HEBREW_MOBILE_SCRUB_END = 0.82;
const HEBREW_MOBILE_COPY_REVEAL_START = 0.85;
const HEBREW_MOBILE_COPY_REVEAL_END = 0.94;
const MOBILE_VIEWPORT_QUERY = "(max-width: 767px)";
const SEEK_TOLERANCE = 1 / 120;
const MOBILE_SEEK_TOLERANCE = 1 / 24;
const FINAL_FRAME_TOLERANCE = 1 / 30;

const clamp = (value: number, minimum: number, maximum: number) => Math.max(minimum, Math.min(maximum, value));

type HomeHeroScrubProps = {
  children: ReactNode;
  variant?: "default" | "hebrew";
};

/**
 * A short, page-scoped scroll-to-video scrub. Scroll updates only a progress
 * target; one rAF controller advances toward it at a bounded rate and issues
 * at most one media seek at a time. This keeps the hero responsive on touch
 * devices and prevents rapid flicks from overwhelming the decoder.
 */
export default function HomeHeroScrub({ children, variant = "default" }: HomeHeroScrubProps) {
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
    let targetVideoProgress = 0;
    let currentVideoProgress = 0;
    let pendingSeekTime: number | null = null;
    let lastFrameTime = performance.now();
    let seekReady = true;
    let duration = 0;
    let frameId = 0;
    let timeoutId = 0;
    let unlocked = false;
    let scrollProgress = 0;
    let released = false;
    let finalFrameReady = false;
    let initialFrameReady = false;
    const isMobileViewport = window.matchMedia(MOBILE_VIEWPORT_QUERY).matches;
    const isHebrewMobile = isMobileViewport && variant === "hebrew";
    const scrubEnd = isHebrewMobile ? HEBREW_MOBILE_SCRUB_END : VIDEO_SCRUB_END;
    const copyRevealStart = isHebrewMobile ? HEBREW_MOBILE_COPY_REVEAL_START : COPY_REVEAL_START;
    const copyRevealEnd = isHebrewMobile ? HEBREW_MOBILE_COPY_REVEAL_END : COPY_REVEAL_END;
    const copyInteractiveStart = isHebrewMobile ? HEBREW_MOBILE_COPY_REVEAL_END : COPY_INTERACTIVE_START;
    const openingProgress = isMobileViewport ? MOBILE_VIDEO_OPENING_PROGRESS : VIDEO_OPENING_PROGRESS;
    const seekTolerance = isMobileViewport ? MOBILE_SEEK_TOLERANCE : SEEK_TOLERANCE;
    const scrubStart = Math.max(scope.getBoundingClientRect().top + window.scrollY - 72, 0);

    scope.dataset.mobile = String(isMobileViewport);
    scope.dataset.video = isMobileViewport ? "mobile" : "desktop";

    const applyVisualProgress = (progress: number) => {
      const copyProgress = clamp(
        (progress - copyRevealStart) / (copyRevealEnd - copyRevealStart),
        0,
        1,
      );
      scope.style.setProperty("--hero-progress", progress.toFixed(4));
      scope.style.setProperty("--hero-copy-progress", copyProgress.toFixed(4));
      scope.dataset.interactive = String(progress >= copyInteractiveStart);
      released = progress >= 1 && finalFrameReady;
      scope.dataset.released = String(released);
      scope.dataset.phase = released
        ? "released"
          : progress >= copyRevealEnd
            ? "final-copy"
            : progress >= scrubEnd
            ? "copy-reveal"
            : "scrubbing";
    };

    const activateFallback = () => {
      if (useFallback) return;
      useFallback = true;
      scope.dataset.mode = "fallback";
      scope.dataset.ready = "false";
      applyVisualProgress(1);
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
      const progressElapsedSeconds = isMobileViewport ? Math.min(elapsedSeconds, 1 / 30) : elapsedSeconds;
      const maxStep = (isHebrewMobile ? HEBREW_MOBILE_MAX_PROGRESS_SPEED : isMobileViewport ? MOBILE_MAX_PROGRESS_SPEED : MAX_PROGRESS_SPEED) * progressElapsedSeconds;
      const delta = targetVideoProgress - currentVideoProgress;
      const canAdvanceProgress = !isMobileViewport || (seekReady && !video.seeking);

      if (isHebrewMobile) {
        // Keep the rendered frame tied to the latest scroll position. Seeking itself
        // remains coalesced below, so quick wheel/touch movement cannot queue seeks.
        currentVideoProgress = targetVideoProgress;
      } else if (canAdvanceProgress && Math.abs(delta) > 0.0001) {
        currentVideoProgress += Math.sign(delta) * Math.min(Math.abs(delta), maxStep || 0.0001);
      }

      const desiredTime = duration * (openingProgress + (currentVideoProgress * (1 - openingProgress)));
      if (metadataReady && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        if (isHebrewMobile && (video.seeking || !seekReady)) {
          pendingSeekTime = desiredTime;
        } else if (seekReady && !video.seeking && Math.abs(video.currentTime - desiredTime) > seekTolerance) {
          seekReady = false;
          video.currentTime = desiredTime;
        }
      }

      const finalFrameVisible =
        metadataReady &&
        currentVideoProgress >= 1 - 0.0001 &&
        (video.currentTime >= duration - FINAL_FRAME_TOLERANCE ||
          Math.abs(video.currentTime - desiredTime) <= seekTolerance);
      if (finalFrameVisible && !finalFrameReady) {
        finalFrameReady = true;
        scope.dataset.finalReady = "true";
        applyVisualProgress(scrollProgress);
      }

      const needsAnotherFrame =
        Math.abs(targetVideoProgress - currentVideoProgress) > 0.0001 ||
        !seekReady ||
        (metadataReady && Math.abs(video.currentTime - desiredTime) > seekTolerance);

      if (needsAnotherFrame && !useFallback) frameId = window.requestAnimationFrame(runController);
    };

    const updateFromScroll = () => {
      const scrollSpan = Math.max(scope.offsetHeight - stage.offsetHeight, 1);
      const rawProgress = clamp((window.scrollY - scrubStart) / scrollSpan, 0, 1);
      scrollProgress = rawProgress;
      if (rawProgress < VIDEO_SCRUB_END && finalFrameReady) {
        finalFrameReady = false;
        scope.dataset.finalReady = "false";
      }
      applyVisualProgress(rawProgress);
      targetVideoProgress = clamp(rawProgress / scrubEnd, 0, 1);

      if (!released && rawProgress >= 1 && !finalFrameReady) {
        const holdBoundary = scrubStart + scrollSpan;
        if (Math.abs(window.scrollY - holdBoundary) > 1) {
          window.scrollTo({ top: holdBoundary, left: 0, behavior: "auto" });
        }
      }

      scheduleController();
    };

      const onSeeked = () => {
        seekReady = true;
      if (!initialFrameReady) {
        initialFrameReady = true;
        scope.dataset.ready = "true";
        window.clearTimeout(timeoutId);
        updateFromScroll();
        return;
        }
      if (isHebrewMobile && pendingSeekTime !== null && Math.abs(video.currentTime - pendingSeekTime) > seekTolerance) {
        const nextTime = pendingSeekTime;
        pendingSeekTime = null;
        seekReady = false;
        video.currentTime = nextTime;
        return;
      }
      scheduleController();
    };

    const onLoadedMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0 || useFallback) return;
      duration = video.duration;
      metadataReady = true;
      const openingTime = duration * openingProgress;
      if (Math.abs(video.currentTime - openingTime) > seekTolerance) {
        seekReady = false;
        video.currentTime = openingTime;
        return;
      }
      initialFrameReady = true;
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
    if (!isHebrewMobile) {
      timeoutId = window.setTimeout(activateFallback, 2500);
    }

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
      className={`hero-scrub-scope${variant === "hebrew" ? " hero-scrub-scope--hebrew" : ""}`}
      data-mode="scrub"
      data-ready="false"
      data-interactive="false"
      data-released="false"
      data-mobile="false"
      data-video="desktop"
      data-phase="scrubbing"
      data-final-ready="false"
      aria-label="DM-Labs introduction"
    >
      <div ref={stageRef} className="hero-scrub-stage">
        <picture>
          <source media={MOBILE_VIEWPORT_QUERY} srcSet={MOBILE_HERO_SCRUB_OPENING_POSTER_URL} />
          <img
            src={HERO_SCRUB_OPENING_POSTER_URL}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="hero-scrub-poster"
          />
        </picture>
        <video
          ref={videoRef}
          poster={HERO_SCRUB_OPENING_POSTER_URL}
          muted
          playsInline
          preload="auto"
          className="hero-scrub-video"
          aria-hidden="true"
        >
          <source media={MOBILE_VIEWPORT_QUERY} src={MOBILE_HERO_SCRUB_VIDEO_URL} type="video/mp4" />
          <source src={HERO_SCRUB_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="hero-scrub-wash" aria-hidden="true" />
        <div className="hero-scrub-copy">
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
