/** Each decorative clip loads on interaction, loops, and stops outside view. */
export function attachCardVideo(video: HTMLVideoElement, source: string, onBlocked?: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const network = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (preference.matches || network.connection?.saveData) return () => {};
  let visible = false;
  let disposed = false;
  const sync = () => {
    if (disposed) return;
    if (!visible || document.hidden || preference.matches) video.pause();
    else void video.play().catch(error => {
      if (!disposed && visible && error?.name === "NotAllowedError") onBlocked?.();
    });
  };
  // Safari checks the default muted state as well as the current property.
  video.defaultMuted = true;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.addEventListener("canplay", sync);
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
    video.removeEventListener("canplay", sync);
    video.pause();
    video.removeAttribute("src");
    video.load();
  };
}
