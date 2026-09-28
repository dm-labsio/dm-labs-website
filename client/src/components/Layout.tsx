/* Shared marketing shell. Navigation and CTA styling live in shared components. */
import { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import NeonCursorTrail from "@/components/NeonCursorTrail";
import CinematicBanner, { type CinematicBannerProps } from "@/components/CinematicBanner";
import BrandLogo from "./BrandLogo";
import SiteHeader from "./SiteHeader";
import { getNavigation } from "./siteNavigation";
import { getRouteLanguage } from "@/lib/routeLanguage";
import { getGreekLanguageTogglePath, getHebrewLanguageTogglePath, getHreflangRouteSet, normalizeRoutePath, withTrailingSlash } from "@/lib/seoRoutes";

const CINEMATIC_BANNERS: Record<string, CinematicBannerProps> = {
  "/": {
    label: "Abstract digital studio motion",
    accent: "blue",
    videoSrc: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_futuristic_herobackground_animation.mp4",
  },
  "/services": {
    label: "Premium technology motion",
    accent: "cyan",
    videoSrc: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_premium_technology_animation.mp4",
  },
  "/process": {
    label: "Digital flow motion",
    accent: "violet",
    videoSrc: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_futuristic_digitalflow_animation.mp4",
  },
  "/templates": {
    label: "High technology gallery motion",
    accent: "blue",
    videoSrc: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_hightech_gallery_animation.mp4",
  },
  "/pricing": {
    label: "Premium growth motion",
    accent: "violet",
    videoSrc: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/premium_growth_animation_from_this_exact_image.mp4",
  },
  "/faq": {
    label: "Editorial insight motion",
    accent: "cyan",
    videoSrc: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/futuristic_editorial_animation_from_this_exact_image.mp4",
  },
  "/contact": {
    label: "Conversation motion",
    accent: "blue",
    videoSrc: "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm%20labs%20assets/create_a_seamless_10second_futuristic_conversation_animation.mp4",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const languageSwitchScrollRef = useRef<number | null | undefined>(undefined);

  const normalizedLocation = normalizeRoutePath(location);
  const isGreek = normalizedLocation === "/el" || normalizedLocation.startsWith("/el/");
  const isHebrew = normalizedLocation === "/he" || normalizedLocation.startsWith("/he/");
  const isStandalonePreview = normalizedLocation.startsWith("/preview/");
  const isEnglishHomepage = normalizedLocation === "/";
  const isTemplatesIndex = normalizedLocation === "/templates";
  const NAV_LINKS = getNavigation(getRouteLanguage(location));
  const languageNeutralPath = normalizedLocation.replace(/^\/(?:el|he)(?=\/|$)/, "") || "/";
  const cinematicBanner = isStandalonePreview ? null : CINEMATIC_BANNERS[languageNeutralPath] ?? null;
  const cinematicInterlude = languageNeutralPath === "/" || languageNeutralPath === "/contact" ? cinematicBanner : null;

  useEffect(() => {
    // Preserve reading position only for direct translations. A fallback such
    // as Blog -> Hebrew home deliberately starts at the top.
    const languageSwitchScroll = languageSwitchScrollRef.current;
    languageSwitchScrollRef.current = undefined;
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: languageSwitchScroll ?? 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(raf);
  }, [location]);

  // Derive the alternate-language URL for the current page
  function getAltLangHref(targetLang: "en" | "el" | "he"): string {
    const routes = getHreflangRouteSet(normalizedLocation);
    if (targetLang === "en") return withTrailingSlash(routes.en);
    if (targetLang === "el") return withTrailingSlash(getGreekLanguageTogglePath(normalizedLocation));
    return withTrailingSlash(getHebrewLanguageTogglePath(normalizedLocation));
  }

  function navigateLanguage(targetLang: "en" | "el" | "he", href: string) {
    if (href === withTrailingSlash(normalizedLocation)) return;
    const routes = getHreflangRouteSet(normalizedLocation);
    const hasDirectTranslation = targetLang === "en" || (targetLang === "el" ? routes.el !== null : routes.he !== null);
    languageSwitchScrollRef.current = hasDirectTranslation ? window.scrollY : null;
    navigate(href);
  }

  function handleBrandClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const homeHref = isHebrew ? "/he/" : isGreek ? "/el/" : "/";
    if (withTrailingSlash(normalizedLocation) !== homeHref) return;
    event.preventDefault();
    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    scrollToTop();
    window.requestAnimationFrame(scrollToTop);
  }

  return (
    <div data-brand="dm-labs" className={`min-h-screen flex flex-col ${isEnglishHomepage ? "editorial-home-shell" : ""} ${isTemplatesIndex ? "templates-editorial-shell" : ""} ${isHebrew ? "hebrew-shell" : ""}`} dir={isHebrew ? "rtl" : undefined}>
      <SiteHeader location={location} getLanguageHref={getAltLangHref} onLanguageNavigate={navigateLanguage} onBrandClick={handleBrandClick} />

      {/* PAGE CONTENT (wrapped for contrast filter - does NOT include fixed elements) */}
      <div id="a11y-content-wrapper" className="flex-1 flex flex-col">
      <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>

      {cinematicInterlude ? <CinematicBanner {...cinematicInterlude} tall={languageNeutralPath === "/contact"} /> : null}

      {/* ── FOOTER ── */}
      <footer className="dark-section">
        <div className="container section-spacing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div style={{ marginBottom: "20px" }}><BrandLogo full /></div>
                <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
                  {isHebrew
                    ? "בלטו בשוק. בנו אמון. הפכו עניין לפניות. אתרים בהתאמה אישית וליווי אישי מטום ואנסטסיה, לעסקים בכל מקום."
                    : isGreek
                      ? "Ξεχωρίστε. Κερδίστε εμπιστοσύνη. Μετατρέψτε το ενδιαφέρον σε επαφές. Custom ιστοσελίδες και προσωπική φροντίδα από τον Tom και την Anastacia, σε επιχειρήσεις παντού."
                      : "Stand out. Earn trust. Turn interest into enquiries. Custom websites and personal care from Tom and Anastacia, for businesses worldwide."
                  }
                </p>
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-5">
                <a
                  href="https://www.instagram.com/dm_labs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow DM-Labs.io on Instagram"
                  className="group flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #5B8CFF22 0%, #A855F722 100%)", border: "1px solid rgba(91,140,255,0.2)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(135deg, #5B8CFF44 0%, #A855F744 100%)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(135deg, #5B8CFF22 0%, #A855F722 100%)")}
                >
                  <Instagram size={16} className="text-[#5B8CFF] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">
                {isHebrew ? "ניווט" : isGreek ? "Πλοήγηση" : "Navigation"}
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">{isHebrew ? "מידע משפטי" : isGreek ? "Νομικά" : "Legal"}</h4>
              <ul className="space-y-3">
                {isHebrew ? (
                  <>
                    <li><Link href="/he/privacy/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">מדיניות פרטיות</Link></li>
                    <li><Link href="/he/cookies/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">מדיניות עוגיות</Link></li>
                    <li><Link href="/he/terms/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">תנאי שירות</Link></li>
                  </>
                ) : isGreek ? (
                  <>
                    <li><Link href="/el/privacy/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Πολιτική Απορρήτου</Link></li>
                    <li><Link href="/el/cookies/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Πολιτική Cookies</Link></li>
                    <li><Link href="/el/terms/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Όροι Χρήσης</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/privacy/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/cookies/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Cookie Policy</Link></li>
                    <li><Link href="/terms/" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Terms of Service</Link></li>
                  </>
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">
                {isHebrew ? "יצירת קשר" : isGreek ? "Επικοινωνία" : "Contact"}
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <Phone size={16} className="text-[#5B8CFF] shrink-0" />
                  <a href="tel:+35797472847" className="hover:text-white transition-colors">+357 97 472 847</a>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <Mail size={16} className="text-[#5B8CFF] shrink-0" />
                  <a href="mailto:info@dm-labs.io" className="hover:text-white transition-colors">info@dm-labs.io</a>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#94A3B8]">
                  <MapPin size={16} className="text-[#5B8CFF] shrink-0 mt-0.5" />
                  <span>{isHebrew ? "אירופה והעולם" : isGreek ? "Ευρώπη και Παγκοσμίως" : "Europe & Worldwide"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#64748B]">
              &copy; {new Date().getFullYear()} DM-Labs.io. {isHebrew ? "כל הזכויות שמורות." : isGreek ? "Με επιφύλαξη παντός δικαιώματος." : "All rights reserved."}
            </p>
            <p className="text-xs text-[#64748B]">
              {isHebrew ? "מעוצב באירופה, נמסר לכל העולם." : isGreek ? "Σχεδιασμένο στην Ευρώπη, παραδίδεται παγκοσμίως." : "Crafted in Europe, delivered worldwide."}
            </p>
            {/* Crawlable language link in footer (Task 3) */}
            <a
              href={isHebrew ? getAltLangHref("en") : isGreek ? getAltLangHref("en") : getAltLangHref("el")}
              onClick={(e) => { e.preventDefault(); navigate(isHebrew || isGreek ? getAltLangHref("en") : getAltLangHref("el")); }}
              className="text-xs text-[#64748B] hover:text-white transition-colors underline underline-offset-2"
              lang={isHebrew || isGreek ? "en" : "el"}
            >
              {isHebrew ? "View in English" : isGreek ? "View in English" : "Δείτε στα Ελληνικά"}
            </a>
          </div>
        </div>
      </footer>

      </div>{/* end a11y-content-wrapper */}

      {/* Accessibility Widget - bottom-left, z-[9998] (defined in component) */}
      <AccessibilityWidget />
      {/* Neon cursor trail - canvas overlay, pointer-events: none, desktop only */}
      <NeonCursorTrail />
    </div>
  );
}
