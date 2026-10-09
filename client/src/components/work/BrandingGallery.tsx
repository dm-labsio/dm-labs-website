import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  brandProjects,
  brandingCopy as copy,
  findBrand,
  type BrandProject,
} from "./brandingData";
import { workCopy, type WorkLocale } from "./workData";
import dimensions from "../../../public/media/branding/assets.json";
import "./branding.css";

const asset = (brand: string, name: string, small = false) =>
  `/media/branding/${brand}/${name}${small ? "-small" : ""}.webp`;
const tokens = (brand: BrandProject) =>
  ({
    "--case-paper": brand.background,
    "--case-ink": brand.ink,
    "--case-accent": brand.accent,
  }) as CSSProperties;
function BrandImage({
  brand,
  name,
  alt = "",
  className,
}: {
  brand: string;
  name: string;
  alt?: string;
  className?: string;
}) {
  const size = dimensions[`${brand}/${name}` as keyof typeof dimensions];
  return (
    <img
      className={className}
      src={asset(brand, name)}
      alt={alt}
      width={size.width}
      height={size.height}
      loading="lazy"
      decoding="async"
    />
  );
}

function BrandStory({
  brand,
  locale,
  close,
  next,
}: {
  brand: BrandProject;
  locale: WorkLocale;
  close: () => void;
  next: () => void;
}) {
  return (
    <article
      className={`brand-story brand-story-${brand.typeClass}`}
      style={tokens(brand)}
    >
      <header className="brand-story-nav">
        <span dir="ltr">{brand.name}</span>
        <button
          onClick={close}
          aria-label={copy.close[locale]}
          className="brand-close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div className="brand-story-hero">
        <div className="brand-story-mark">
          <p>{workCopy[locale].categories[brand.category]}</p>
          <img src={brand.logo} alt={brand.name} width="500" height="180" />
          <p>{brand.scope[locale]}</p>
        </div>
        <BrandImage
          brand={brand.id}
          name={brand.cover}
          alt={brand.name}
          className="brand-story-cover"
        />
      </div>
      <section className="brand-story-intro">
        <h2 id="brand-story-title">{brand.title[locale]}</h2>
        <p>{brand.story[locale]}</p>
      </section>
      <section className="brand-system" aria-label={copy.identity[locale]}>
        <div className="brand-type">
          <p className="brand-case-label">{copy.typography[locale]}</p>
          <p
            className={`brand-type-sample brand-type-${brand.typeClass}`}
            dir="ltr"
            lang="en"
          >
            {brand.sample}
          </p>
          <p className="brand-font-names" dir="ltr">
            {brand.display} / {brand.body}
          </p>
        </div>
        <div className="brand-palette">
          <p className="brand-case-label">{copy.palette[locale]}</p>
          <div className="brand-swatches" dir="ltr">
            {brand.colors.map(color => (
              <div key={color}>
                <span style={{ background: color }} />
                <small>{color}</small>
              </div>
            ))}
          </div>
          <img
            className="brand-symbol"
            src={brand.symbol}
            alt=""
            loading="lazy"
          />
        </div>
      </section>
      <section className="brand-detail-pair">
        <div>
          <h3>{copy.details[locale]}</h3>
          <img src={brand.symbol} alt="" loading="lazy" />
        </div>
        <BrandImage brand={brand.id} name={brand.detail} />
      </section>
      <section className="brand-applications">
        <h3>{copy.applications[locale]}</h3>
        <div className="brand-application-grid">
          {brand.images.map(([name, caption]) => (
            <figure key={name}>
              <BrandImage
                brand={brand.id}
                name={name}
                alt={`${brand.name}: ${caption[locale]}`}
              />
              <figcaption>{caption[locale]}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <footer className="brand-story-footer">
        <button onClick={close}>{copy.back[locale]}</button>
        <button onClick={next}>{copy.next[locale]}</button>
      </footer>
    </article>
  );
}

export default function BrandingGallery({ locale }: { locale: WorkLocale }) {
  const [selected, setSelected] = useState<BrandProject | undefined>();
  const [active, setActive] = useState<string>(brandProjects[0].id);
  const dialog = useRef<HTMLDialogElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const isOpen = Boolean(selected);

  useEffect(() => {
    const sync = () =>
      setSelected(
        findBrand(new URLSearchParams(window.location.search).get("brand"))
      );
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    const y = window.scrollY;
    const x = window.scrollX;
    const bodyStyle = document.body.style.overflow;
    const restore = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = bodyStyle;
      window.history.scrollRestoration = restore;
      window.scrollTo({ left: x, top: y, behavior: "instant" });
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (selected) {
      dialog.current?.scrollTo({ top: 0, behavior: "instant" });
      dialog.current
        ?.querySelector<HTMLButtonElement>(".brand-close")
        ?.focus({ preventScroll: true });
    }
  }, [selected]);

  useEffect(() => {
    const root = rail.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries)
          if (entry.isIntersecting && entry.intersectionRatio > 0.7)
            setActive((entry.target as HTMLElement).dataset.brand!);
      },
      { root, threshold: 0.75 }
    );
    root
      .querySelectorAll("[data-brand-project]")
      .forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const open = (brand: BrandProject, element: HTMLElement) => {
    trigger.current = element;
    const url = new URL(window.location.href);
    url.searchParams.set("brand", brand.id);
    window.history.pushState(
      { ...window.history.state, dmBrandProject: true },
      "",
      url
    );
    setSelected(brand);
  };
  const close = () => {
    if (window.history.state?.dmBrandProject) window.history.back();
    else {
      const url = new URL(window.location.href);
      url.searchParams.delete("brand");
      window.history.replaceState(window.history.state, "", url);
      setSelected(undefined);
    }
  };
  const next = () => {
    const brand =
      brandProjects[
        (brandProjects.findIndex(item => item.id === selected?.id) + 1) %
          brandProjects.length
      ];
    const url = new URL(window.location.href);
    url.searchParams.set("brand", brand.id);
    window.history.replaceState(window.history.state, "", url);
    setSelected(brand);
  };
  const choose = (id: string) => {
    const card = rail.current?.querySelector<HTMLElement>(
      `[data-brand="${id}"]`
    );
    card?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
      inline: "center",
    });
    setActive(id);
  };

  return (
    <section
      className="branding-section"
      id="branding"
      aria-labelledby="branding-title"
    >
      <div className="work-service-heading container">
        <h2 id="branding-title">{copy.title[locale]}</h2>
        <p>{copy.intro[locale]}</p>
      </div>
      <div className="brand-projects container" ref={rail}>
        {brandProjects.map(brand => (
          <button
            key={brand.id}
            data-brand-project
            data-active={active === brand.id}
            data-brand={brand.id}
            className="brand-project"
            style={tokens(brand)}
            aria-label={`${brand.name}: ${copy.open[locale]}`}
            aria-haspopup="dialog"
            onClick={event => open(brand, event.currentTarget)}
          >
            <span className="brand-fan" aria-hidden="true">
              {brand.stack.map((name, i) => (
                <span key={name} className={`brand-sheet brand-sheet-${i}`}>
                  <img
                    src={asset(brand.id, name, true)}
                    alt=""
                    loading="lazy"
                    width="480"
                    height="600"
                  />
                </span>
              ))}
              <span className="brand-sheet brand-sheet-front">
                <span className="brand-sheet-logo">
                  <img src={brand.logo} alt="" loading="lazy" />
                </span>
                <img
                  src={asset(brand.id, brand.cover, true)}
                  alt=""
                  loading="lazy"
                  width="480"
                  height="600"
                />
              </span>
            </span>
            <span className="brand-project-caption">
              <span>
                <strong dir="ltr">{brand.name}</strong>
                <small>{workCopy[locale].categories[brand.category]}</small>
              </span>
              <span className="brand-project-open">{copy.open[locale]}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="brand-mobile-nav container" aria-label={copy.see[locale]}>
        {brandProjects.map(brand => (
          <button
            key={brand.id}
            aria-pressed={active === brand.id}
            onClick={() => choose(brand.id)}
          >
            {brand.name}
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="brand-dialog"
        dir={locale === "he" ? "rtl" : "ltr"}
        aria-labelledby="brand-story-title"
        onCancel={event => {
          event.preventDefault();
          close();
        }}
      >
        {selected && (
          <BrandStory
            brand={selected}
            locale={locale}
            close={close}
            next={next}
          />
        )}
      </dialog>
    </section>
  );
}
