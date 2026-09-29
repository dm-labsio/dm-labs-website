/** Keep the next step below the sticky header and move keyboard focus with it. */
export function movePricingTo(id: string) {
  const target = document.getElementById(id);
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
}

/** A brief selection confirmation, cancelled on another action or route change. */
export function schedulePricingAdvance(id: string) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    movePricingTo(id);
    return () => {};
  }
  const timer = window.setTimeout(() => movePricingTo(id), 360);
  return () => window.clearTimeout(timer);
}
