/** Return data belongs to one browser-history entry, not a global last-page value. */
export const PREVIEW_SOURCE_KEY = 'dmPreviewSource';
export const PREVIEW_ORIGIN_KEY = 'dmPreviewOrigin';
export interface PreviewSource {
  url: string;
  x: number;
  y: number;
  href: string;
  industry?: string;
  workGallery?: { position: number; selected: string };
  restoration?: ScrollRestoration;
}
export function safePreviewReturnPath(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/templates/';
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin || url.pathname.startsWith('/preview/')) return '/templates/';
    return url.pathname + url.search + url.hash;
  } catch { return '/templates/'; }
}
export function readPreviewSource(): PreviewSource | null {
  const source = window.history.state?.[PREVIEW_SOURCE_KEY];
  const here = window.location.pathname + window.location.search + window.location.hash;
  if (!source || source.url !== here || typeof source.href !== 'string' ||
    ![source.x, source.y].every(Number.isFinite)) return null;
  return source;
}
export function previewIndustry(): string {
  const industry = readPreviewSource()?.industry;
  return typeof industry === 'string' ? industry : 'all';
}
export function rememberPreviewSource(anchor: HTMLAnchorElement): PreviewSource {
  const gallery = window.history.state?.modal ? window.history.state.dmGalleryPosition : null;
  const work = anchor.closest<HTMLElement>("[data-work-gallery]");
  const position = Number(work?.dataset.carouselPosition);
  const source: PreviewSource = {
    url: window.location.pathname + window.location.search + window.location.hash,
    x: Number.isFinite(gallery?.x) ? gallery.x : window.scrollX,
    y: Number.isFinite(gallery?.y) ? gallery.y : window.scrollY,
    href: anchor.getAttribute('href') || '',
    restoration: window.history.scrollRestoration,
    ...(work && Number.isFinite(position) ? { workGallery: { position, selected: anchor.dataset.project || "" } } : {}),
    industry: document.querySelector<HTMLElement>('[data-example-industry]')?.dataset.exampleIndustry,
  };
  window.history.scrollRestoration = 'manual';
  window.history.replaceState({ ...window.history.state, [PREVIEW_SOURCE_KEY]: source }, '');
  return source;
}
/** Retry after fonts/images settle, but never fight a visitor's own scrolling. */
export function restorePreviewSource(source: PreviewSource): () => void {
  let frame = 0, stopped = false;
  const findAnchor = () => Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
    .find(a => a.getAttribute('href') === source.href);
  const restore = () => {
    if (stopped) return;
    window.scrollTo({ left: source.x, top: source.y, behavior: 'instant' });
  };
  const schedule = () => { if (stopped) return; cancelAnimationFrame(frame); frame = requestAnimationFrame(restore); };
  const observer = new ResizeObserver(schedule);
  const stop = () => {
    stopped = true;
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    observer.disconnect();
    window.history.scrollRestoration = source.restoration === "manual" ? "manual" : "auto";
    for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) window.removeEventListener(event, stop);
  };
  const timer = window.setTimeout(stop, 3000);
  for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) window.addEventListener(event, stop, { passive: true });
  observer.observe(document.body);
  document.fonts.ready.then(schedule);
  findAnchor()?.focus({ preventScroll: true });
  restore();
  schedule();
  return stop;
}
