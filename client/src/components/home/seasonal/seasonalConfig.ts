/** One file to change seasons. Dates use an explicit timezone; end is exclusive.
 * This is an October 2026 campaign, not an automatically recurring holiday.
 * Setting enabled:false prevents even the decoration module from downloading.
 */
export const SEASONAL_CONFIG = {
  enabled: true,
  theme: "halloween" as const,
  id: "halloween-2026",
  startsAt: "2026-10-09T00:00:00+03:00",
  endsAt: "2026-11-01T00:00:00+02:00",
  banner: true,
  artwork: true,
  webs: true,
  // Photo-frame overlay slot; future seasons can provide another ornament here.
  photoOrnament: "webs" as "webs" | null,
  sitewideBats: true,
  // Manual quote adjustment for October enquiries; never changes pricing data.
  offer: { oneTimePercent: 10, monthlyPercent: 0, enquiryMonth: "2026-10" },
  particles: {
    enabled: true,
    desktopCount: 12,
    mobileCount: 5,
    bats: 2,
    ghosts: 1,
    durationMs: 4200,
    oncePerSession: true,
  },
};

export function isSeasonActive(now = Date.now(), config = SEASONAL_CONFIG) {
  return (
    config.enabled &&
    now >= Date.parse(config.startsAt) &&
    now < Date.parse(config.endsAt)
  );
}

export function isSeasonalHomepage(path: string) {
  return /^(?:\/|\/(?:el|he)\/?)$/.test(path);
}

/** Bounded deterministic particles: no random markup, animation loop or React frame updates. */
export function seasonalParticles(
  mobile: boolean,
  config = SEASONAL_CONFIG.particles
) {
  if (!config.enabled) return [];
  const count = Math.min(
    24,
    Math.max(0, mobile ? config.mobileCount : config.desktopCount)
  );
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    kind:
      index < config.bats
        ? "bat"
        : index < config.bats + config.ghosts
          ? "ghost"
          : "ember",
    x: 12 + ((index * 29) % 76),
    y: 15 + ((index * 19) % 57),
    delay: (index % 4) * 120,
    drift: index % 2 ? 42 : -42,
  }));
}
