import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  filmProjects,
  filmCopy as copy,
  filmSource,
  filmPoster,
  filmDuration,
  filmFormat,
  type FilmProject,
  type FilmClip,
} from "./filmData";
import type { WorkLocale } from "./workData";
import "./films.css";

function FilmCover({ project }: { project: FilmProject }) {
  if (project.id === "sunday-boat")
    return (
      <div className="film-art film-art-sunday" aria-hidden="true">
        <img
          className="film-fish"
          src="/media/branding/sunday-boat/symbol.svg"
          alt=""
          width="300"
          height="150"
          loading="lazy"
        />
        <img
          className="film-brand"
          src="/media/branding/sunday-boat/logo.svg"
          alt=""
          width="400"
          height="260"
          loading="lazy"
        />
        <span className="film-art-line" />
      </div>
    );
  if (project.id === "dm-labs")
    return (
      <div className="film-art film-art-dm" aria-hidden="true">
        <span className="film-boo">BOO!</span>
        <img
          className="film-pumpkin"
          src="/media/seasonal/halloween-2026/glass-pumpkins-560.webp"
          alt=""
          width="560"
          height="420"
          loading="lazy"
        />
        <img
          className="film-ghost"
          src="/media/seasonal/halloween-2026/glass-ghost-320.webp"
          alt=""
          width="320"
          height="320"
          loading="lazy"
        />
      </div>
    );
  return (
    <div className={`film-art film-art-${project.id}`} aria-hidden="true">
      <img
        className="film-photo"
        src={`/media/work-films/${project.id}-cover.webp`}
        alt=""
        width="600"
        height="800"
        loading="lazy"
        decoding="async"
      />
      <img
        className="film-brand"
        src={`/media/branding/${project.id}/logo.svg`}
        alt=""
        width="400"
        height="150"
        loading="lazy"
      />
    </div>
  );
}

function FilmPlayer({ clip, locale }: { clip: FilmClip; locale: WorkLocale }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    const hide = () => {
      if (document.hidden) video?.pause();
    };
    document.addEventListener("visibilitychange", hide);
    // A blocked autoplay still leaves the native play control available.
    video?.play().catch(() => {});
    return () => {
      document.removeEventListener("visibilitychange", hide);
      video?.pause();
    };
  }, []);
  return (
    <div
      className="film-player"
      data-format={clip.width > clip.height ? "landscape" : "portrait"}
    >
      <video
        ref={ref}
        src={filmSource(clip)}
        poster={filmPoster(clip)}
        controls
        playsInline
        preload="metadata"
        width={clip.width}
        height={clip.height}
        aria-label={clip.title[locale]}
        onError={() => setFailed(true)}
      />
      {failed && (
        <div className="film-error" role="alert">
          <p>{copy.error[locale]}</p>
          <button
            onClick={() => {
              setFailed(false);
              ref.current?.load();
              ref.current?.play().catch(() => {});
            }}
          >
            {copy.retry[locale]}
          </button>
        </div>
      )}
    </div>
  );
}

export default function FilmGallery({ locale }: { locale: WorkLocale }) {
  const [selected, setSelected] = useState<{
    project: FilmProject;
    clip: FilmClip;
  } | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const pushed = useRef(false);
  const returnPosition = useRef<{
    x: number;
    y: number;
    restoration: ScrollRestoration;
  } | null>(null);
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      const params = new URLSearchParams(location.search);
      const project = filmProjects.find(p => p.id === params.get("film"));
      setSelected(
        project
          ? {
              project,
              clip:
                project.clips.find(c => c.id === params.get("clip")) ??
                project.clips[0],
            }
          : null
      );
      if (!project && returnPosition.current) {
        const position = returnPosition.current;
        // Wait until history traversal and dialog teardown have finished.
        // Otherwise returning to #brand-films can jump to its anchor.
        frame = requestAnimationFrame(() => {
          window.scrollTo({
            left: position.x,
            top: position.y,
            behavior: "instant",
          });
          history.scrollRestoration = position.restoration;
          returnPosition.current = null;
          pushed.current = false;
        });
      }
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      cancelAnimationFrame(frame);
      if (returnPosition.current)
        history.scrollRestoration = returnPosition.current.restoration;
    };
  }, []);
  const open = (
    project: FilmProject,
    clip: FilmClip,
    button: HTMLButtonElement
  ) => {
    trigger.current = button;
    returnPosition.current = {
      x: window.scrollX,
      y: window.scrollY,
      restoration: history.scrollRestoration,
    };
    history.scrollRestoration = "manual";
    const url = new URL(location.href);
    url.searchParams.set("film", project.id);
    url.searchParams.set("clip", clip.id);
    // Keep the page's scroll position and other navigation state intact.
    history.pushState({ ...history.state, workFilm: true }, "", url);
    pushed.current = true;
    setSelected({ project, clip });
  };
  const close = () => {
    setSelected(null);
    if (pushed.current) {
      pushed.current = false;
      history.back();
    } else {
      const url = new URL(location.href);
      url.searchParams.delete("film");
      url.searchParams.delete("clip");
      history.replaceState(history.state, "", url);
    }
  };
  const switchClip = (clip: FilmClip) => {
    if (!selected) return;
    const url = new URL(location.href);
    url.searchParams.set("clip", clip.id);
    history.replaceState(history.state, "", url);
    setSelected({ project: selected.project, clip });
  };
  return (
    <section
      className="film-section container"
      id="brand-films"
      aria-labelledby="film-heading"
    >
      <div className="film-heading">
        <h2 id="film-heading">{copy.title[locale]}</h2>
        <p>{copy.intro[locale]}</p>
      </div>
      <div className="film-gallery" onMouseLeave={() => setHover(null)}>
        {filmProjects.map(project => (
          <article
            key={project.id}
            className="film-card"
            data-active={hover === project.id}
          >
            <button
              className="film-cover"
              onMouseEnter={() => setHover(project.id)}
              onFocus={() => setHover(project.id)}
              onBlur={() => setHover(null)}
              onClick={event => open(project, project.clips[0], event.currentTarget)}
              aria-label={`${copy.watch[locale]}: ${project.name}`}
            >
              <FilmCover project={project} />
              <span className="film-format-label">
                {project.formats[locale]}
              </span>
              <span className="film-play">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 4.5v15L20 12z" />
                </svg>
                <span>{copy.watch[locale]}</span>
              </span>
            </button>
            <div className="film-caption">
              <h3 dir="ltr">{project.name}</h3>
              <p>{project.category[locale]}</p>
            </div>
          </article>
        ))}
      </div>
      <Dialog.Root
        open={!!selected}
        onOpenChange={value => {
          if (!value) close();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="film-overlay" />
          <Dialog.Content
            className="film-dialog"
            dir={locale === "he" ? "rtl" : "ltr"}
            lang={locale}
            onCloseAutoFocus={event => {
              event.preventDefault();
              trigger.current?.focus({ preventScroll: true });
            }}
          >
            {selected && (
              <>
                <header className="film-dialog-header">
                  <Dialog.Title>{selected.project.name}</Dialog.Title>
                  <Dialog.Close
                    className="film-close"
                    aria-label={copy.close[locale]}
                  >
                    ×
                  </Dialog.Close>
                </header>
                <div className="film-cinema">
                  <FilmPlayer
                    key={selected.clip.id}
                    clip={selected.clip}
                    locale={locale}
                  />
                  <aside className="film-programme">
                    <p className="film-category">
                      {selected.project.category[locale]}
                    </p>
                    <h3>{selected.clip.title[locale]}</h3>
                    <Dialog.Description>
                      {selected.project.description[locale]}
                    </Dialog.Description>
                    <div
                      className="film-clip-list"
                      aria-label={copy.choose[locale]}
                    >
                      {selected.project.clips.map(clip => (
                        <button
                          key={clip.id}
                          onClick={() => switchClip(clip)}
                          aria-pressed={clip.id === selected.clip.id}
                        >
                          <img
                            src={filmPoster(clip)}
                            alt=""
                            width="45"
                            height="60"
                            loading="lazy"
                          />
                          <span>
                            <strong>{clip.title[locale]}</strong>
                            <small>
                              {filmFormat(clip, locale)}{" "}
                              <bdi>{filmDuration(clip.duration)}</bdi>
                            </small>
                          </span>
                        </button>
                      ))}
                    </div>
                    <a
                      className="film-contact"
                      href={`${locale === "en" ? "" : `/${locale}`}/contact/`}
                    >
                      {copy.contact[locale]}
                    </a>
                  </aside>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
