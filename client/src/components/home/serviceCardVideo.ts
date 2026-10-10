/** Each decorative clip loads on interaction, loops, and stops outside view. */
export function attachCardVideo(video: HTMLVideoElement, source: string) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const network = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (preference.matches || network.connection?.saveData) return () => {};
  let visible = false;
  let disposed = false;
  const sync = () => {
    if (disposed) return;
    if (!visible || document.hidden || preference.matches) video.pause();
    else void video.play().catch(() => { /* The supplied poster remains the fallback. */ });
  };
  video.muted = true;
  video.loop = true;
  video.src = source;
  const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; sync(); }, { threshold: .15 });
  observer.observe(video);
  preference.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  return () => {
    disposed = true;
    observer.disconnect();
    preference.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
    video.pause();
    video.removeAttribute("src");
    video.load();
  };
}
