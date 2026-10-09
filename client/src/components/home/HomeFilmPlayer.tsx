/** Adapted from Chetan Verma's MIT Video Player (21st.dev / chetanverma UI).
 * Keeps the animated floating controls; adds touch, keyboard, native ranges,
 * event-driven playback state, lazy source selection and fullscreen fallbacks.
 * See docs/licenses/chetan-verma-video-player.txt. */
import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
} from "lucide-react";
import {
  HOME_INTRODUCTION_COPY,
  HOME_INTRODUCTION_MEDIA,
  introductionSource,
} from "./homeIntroductionContent";
import type { HomeLocale } from "./overviewContent";

export function filmTime(seconds: number) {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  return `${Math.floor(safe / 60)}:${Math.floor(safe % 60)
    .toString()
    .padStart(2, "0")}`;
}
type SafariVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };
export default function HomeFilmPlayer({
  language,
  cover,
}: {
  language: HomeLocale;
  cover: ReactNode;
}) {
  const copy = HOME_INTRODUCTION_COPY[language];
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touch, setTouch] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const reduced = useReducedMotion();
  const ended = duration > 0 && currentTime >= duration - 0.05;
  const visible = started && (touch || hovered || focused || !isPlaying);

  useEffect(() => {
    const preference = matchMedia("(hover: none)");
    const updateTouch = () => setTouch(preference.matches);
    const updateFullscreen = () =>
      setFullscreen(document.fullscreenElement === frameRef.current);
    const pauseWhenHidden = () => {
      if (document.hidden) videoRef.current?.pause();
    };
    updateTouch();
    setCanFullscreen(
      Boolean(
        document.fullscreenEnabled ||
          (videoRef.current as SafariVideo)?.webkitEnterFullscreen
      )
    );
    preference.addEventListener("change", updateTouch);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => {
      preference.removeEventListener("change", updateTouch);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      document.removeEventListener("fullscreenchange", updateFullscreen);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    const frame = requestAnimationFrame(() =>
      frameRef.current
        ?.querySelector<HTMLButtonElement>(".home-film-toggle")
        ?.focus({ preventScroll: true })
    );
    return () => cancelAnimationFrame(frame);
  }, [started]);

  const play = () => {
    const player = videoRef.current;
    if (!player) return;
    if (!player.getAttribute("src") || failed) {
      const connection = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      player.src = introductionSource(
        matchMedia("(max-width: 767px)").matches,
        connection?.saveData
      );
    }
    setFailed(false);
    setStarted(true);
    setLoading(true);
    if (player.ended) player.currentTime = 0;
    // Keep play within the user's gesture so iOS can start with sound.
    void player.play().catch(() => {
      setLoading(false);
    });
  };
  const togglePlay = () => {
    if (videoRef.current?.paused) play();
    else videoRef.current?.pause();
  };
  const seek = (value: number) => {
    if (videoRef.current && Number.isFinite(duration) && duration > 0) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, value));
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  const toggleMute = () => {
    const player = videoRef.current;
    if (!player) return;
    const silent = player.muted || player.volume === 0;
    if (player.volume === 0) player.volume = 0.6;
    player.muted = !silent;
  };
  const toggleFullscreen = async () => {
    const frame = frameRef.current;
    const player = videoRef.current as SafariVideo | null;
    if (!frame || !player) return;
    try {
      if (document.fullscreenElement === frame) await document.exitFullscreen();
      else if (document.fullscreenEnabled && frame.requestFullscreen)
        await frame.requestFullscreen();
      else player.webkitEnterFullscreen?.();
    } catch {
      /* Playback remains inline if fullscreen is unavailable. */
    }
  };
  return (
    <div className="home-film-frame" ref={frameRef} data-started={started}>
      <div
        className="home-film-player"
        tabIndex={started ? 0 : -1}
        role="group"
        aria-label={copy.play}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === " " || event.key === "k") {
            event.preventDefault();
            togglePlay();
          }
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            seek(currentTime + (event.key === "ArrowRight" ? 5 : -5));
          }
        }}
        onPointerEnter={event => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null))
            setFocused(false);
        }}
      >
        <video
          ref={videoRef}
          preload="none"
          playsInline
          poster={HOME_INTRODUCTION_MEDIA.poster}
          width={1920}
          height={1080}
          aria-label={copy.play}
          aria-hidden={!started}
          tabIndex={-1}
          onLoadedMetadata={event =>
            setDuration(
              Number.isFinite(event.currentTarget.duration)
                ? event.currentTarget.duration
                : 0
            )
          }
          onTimeUpdate={event =>
            setCurrentTime(event.currentTarget.currentTime)
          }
          onPlay={() => setIsPlaying(true)}
          onPlaying={() => {
            setIsPlaying(true);
            setReady(true);
            setLoading(false);
          }}
          onPause={() => {
            setIsPlaying(false);
            setLoading(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setLoading(false);
          }}
          onWaiting={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          onVolumeChange={event => {
            setMuted(event.currentTarget.muted);
            setVolume(event.currentTarget.volume);
          }}
          onRateChange={event => setRate(event.currentTarget.playbackRate)}
          onError={() => {
            setFailed(true);
            setIsPlaying(false);
            setLoading(false);
          }}
        />
        {!ready && (
          <div className="home-film-cover">
            {cover}
            <button
              className="home-film-start"
              onClick={play}
              aria-label={copy.play}
            >
              <span className="home-film-cover-play">
                <Play fill="currentColor" strokeWidth={1} aria-hidden="true" />
              </span>
              <span className="home-film-cover-cta">{copy.play}</span>
            </button>
          </div>
        )}
        {started && (
          <button
            className="home-film-surface"
            onClick={togglePlay}
            aria-label={isPlaying ? copy.pause : copy.resume}
            tabIndex={-1}
          />
        )}
        {started && loading && !failed && (
          <span className="home-film-loading" role="status">
            {copy.loading}
          </span>
        )}
        <AnimatePresence initial={false}>
          {visible && (
            <motion.div
              className="home-film-controls"
              dir="ltr"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: reduced ? 0 : 0.18 }}
            >
              <div className="home-film-timeline">
                <span>{filmTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={Math.min(currentTime, duration || 1)}
                  disabled={!duration || failed}
                  aria-label={copy.seek}
                  aria-valuetext={`${filmTime(currentTime)} / ${filmTime(duration)}`}
                  onChange={event => seek(Number(event.target.value))}
                  style={
                    {
                      "--film-progress": `${duration ? (currentTime / duration) * 100 : 0}%`,
                    } as CSSProperties
                  }
                />
                <span>{filmTime(duration)}</span>
              </div>
              <div className="home-film-control-row">
                <div className="home-film-audio">
                  <button
                    className="home-film-toggle"
                    onClick={togglePlay}
                    aria-label={
                      isPlaying ? copy.pause : ended ? copy.replay : copy.resume
                    }
                  >
                    {isPlaying ? (
                      <Pause aria-hidden="true" />
                    ) : ended ? (
                      <RotateCcw aria-hidden="true" />
                    ) : (
                      <Play aria-hidden="true" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    aria-label={muted || volume === 0 ? copy.unmute : copy.mute}
                  >
                    {muted || volume === 0 ? (
                      <VolumeX aria-hidden="true" />
                    ) : (
                      <Volume2 aria-hidden="true" />
                    )}
                  </button>
                  <input
                    className="home-film-volume"
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={muted ? 0 : volume}
                    aria-label={copy.volume}
                    onChange={event => {
                      if (videoRef.current) {
                        videoRef.current.volume = Number(event.target.value);
                        videoRef.current.muted = false;
                      }
                    }}
                    style={
                      {
                        "--film-progress": `${(muted ? 0 : volume) * 100}%`,
                      } as CSSProperties
                    }
                  />
                </div>
                <div className="home-film-options">
                  <select
                    aria-label={copy.speed}
                    value={rate}
                    onChange={event => {
                      if (videoRef.current)
                        videoRef.current.playbackRate = Number(
                          event.target.value
                        );
                    }}
                  >
                    {[0.5, 1, 1.5, 2].map(speed => (
                      <option key={speed} value={speed}>
                        {speed}×
                      </option>
                    ))}
                  </select>
                  {canFullscreen && (
                    <button
                      onClick={() => void toggleFullscreen()}
                      aria-label={
                        fullscreen ? copy.exitFullscreen : copy.fullscreen
                      }
                    >
                      {fullscreen ? (
                        <Minimize aria-hidden="true" />
                      ) : (
                        <Maximize aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {failed && (
          <div className="home-film-error" role="alert">
            <p>{copy.error}</p>
            <button onClick={play}>{copy.retry}</button>
            <a
              href={HOME_INTRODUCTION_MEDIA.desktop}
              target="_blank"
              rel="noreferrer"
            >
              {copy.open}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
