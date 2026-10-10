import { useEffect, useRef, useState, type CSSProperties } from "react";
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
      <div className="film-gallery" aria-describedby="film-gallery-hint">
        {[filmProjects.slice(0, 2), filmProjects.slice(2)].map(
          (projects, row) => (
            <div
              className={`film-row film-row-${row === 0 ? "stories" : "campaigns"}`}
              key={row}
            >
              {projects.flatMap(project =>
                project.clips.map(clip => (
                  <button
                    type="button"
                    key={clip.id}
                    className={`film-cover ${clip.width > clip.height ? "film-wide" : "film-portrait"}`}
                    style={
                      {
                        "--film-ratio": clip.width / clip.height,
                      } as CSSProperties
                    }
                    data-clip={clip.id}
                    data-project={project.id}
                    aria-label={`${copy.watch[locale]}: ${project.name}, ${clip.title[locale]}`}
                    aria-haspopup="dialog"
                    onClick={event => open(project, clip, event.currentTarget)}
                  >
                    <img
                      src={filmPoster(clip)}
                      alt={`${project.name}: ${clip.title[locale]}`}
                      width={clip.width}
                      height={clip.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))
              )}
            </div>
          )
        )}
      </div>
      <p className="film-gallery-hint" id="film-gallery-hint">
        {copy.galleryHint[locale]}
      </p>
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
