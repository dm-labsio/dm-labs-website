/* ============================================================
   DM-Labs.io - Layout Component
   Glassmorphism nav, mobile hamburger, dark footer
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient, #0F172A dark
   Language toggle: flag-based EN/EL, visible on mobile as floating pill
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, Instagram, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import NeonCursorTrail from "@/components/NeonCursorTrail";
import dmLabsLogo from "@/assets/dmLabsLogo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  getGreekLanguageTogglePath,
  getHebrewLanguageTogglePath,
  getHreflangRouteSet,
  normalizeRoutePath,
  withTrailingSlash,
} from "@/lib/seoRoutes";


const BrandMark = ({ dark = false }: { dark?: boolean }) => (
  <span
    className={`text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap ${dark ? "text-white" : "text-[#111315]"}`}
    aria-label="DM-Labs.io"
  >
    <span className="brand-gradient-text">DM</span><span>-Labs.io</span>
  </span>
);

const HeaderBrandMark = () => (
  <img
    src={dmLabsLogo}
    alt="DM-Labs.io"
    className="block h-7 w-auto max-w-[7.75rem] object-contain sm:h-8 sm:max-w-[9rem]"
  />
);

const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const EN_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Process", href: "/process/" },
  { label: "Examples", href: "/templates/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

const EXCLUDED_ENGLISH_LOCATION_ROUTES = new Set([
  "/web-design-paphos",
  "/web-design-limassol",
  "/web-design-cyprus",
  "/web-design-crete",
  "/web-design-nicosia",
  "/web-design-thessaloniki",
  "/web-design-restaurants-cyprus",
]);

const EL_NAV_LINKS = [
  { label: "Αρχική", href: "/el/" },
  { label: "Υπηρεσίες", href: "/el/services/" },
  { label: "Διαδικασία", href: "/el/process/" },
  { label: "Παραδείγματα", href: "/el/templates/" },
  { label: "Τιμές", href: "/el/pricing/" },
  { label: "Άρθρα", href: "/el/blog/" },
  { label: "FAQ", href: "/el/faq/" },
  { label: "Επικοινωνία", href: "/el/contact/" },
];

const HE_NAV_LINKS = [
  { label: "דף הבית", href: "/he/" },
  { label: "שירותים", href: "/he/services/" },
  { label: "תהליך", href: "/he/process/" },
  { label: "דוגמאות", href: "/he/templates/" },
  { label: "תמחור", href: "/he/pricing/" },
  { label: "שאלות נפוצות", href: "/he/faq/" },
  { label: "יצירת קשר", href: "/he/contact/" },
];

const HEBREW_WHATSAPP_URL = "https://wa.me/35797472847?text=%D7%A9%D7%9C%D7%95%D7%9D%20DM-Labs.io%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%9C%D7%92%D7%91%D7%99%20%D7%90%D7%AA%D7%A8%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%99.";

/* ── Flag SVGs (inline, no external deps) ── */
const FlagUK = () => (
  <svg width="20" height="14" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ borderRadius: "2px", display: "block" }}>
    <rect width="60" height="40" fill="#012169"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7"/>
  </svg>
);

const FlagGR = () => (
  <svg width="20" height="14" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ borderRadius: "2px", display: "block" }}>
    <rect width="60" height="40" fill="#0D5EAF"/>
    <rect y="0"  width="60" height="4.44" fill="#0D5EAF"/>
    <rect y="4.44"  width="60" height="4.44" fill="#fff"/>
    <rect y="8.88"  width="60" height="4.44" fill="#0D5EAF"/>
    <rect y="13.32" width="60" height="4.44" fill="#fff"/>
    <rect y="17.76" width="60" height="4.44" fill="#0D5EAF"/>
    <rect y="22.2"  width="60" height="4.44" fill="#fff"/>
    <rect y="26.64" width="60" height="4.44" fill="#0D5EAF"/>
    <rect y="31.08" width="60" height="4.44" fill="#fff"/>
    <rect y="35.52" width="60" height="4.44" fill="#0D5EAF"/>
    <rect width="24" height="22.2" fill="#0D5EAF"/>
    <rect x="8.88" y="0" width="6.24" height="22.2" fill="#fff"/>
    <rect y="8.88" width="24" height="4.44" fill="#fff"/>
  </svg>
);

const FlagIL = () => (
  <svg width="24" height="16" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ borderRadius: "2px", display: "block" }}>
    <rect width="60" height="40" fill="#fff" />
    <rect y="3" width="60" height="5" fill="#0038B8" />
    <rect y="32" width="60" height="5" fill="#0038B8" />
    <path d="M30 14 L38.5 27 H21.5 Z M30 26 L38.5 13 H21.5 Z" fill="none" stroke="#0038B8" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageSheetOpen, setLanguageSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const languageSwitchScrollRef = useRef<number | null | undefined>(undefined);

  const normalizedLocation = normalizeRoutePath(location);
  const isGreek = normalizedLocation === "/el" || normalizedLocation.startsWith("/el/");
  const isHebrew = normalizedLocation === "/he" || normalizedLocation.startsWith("/he/");
  const isEnglish = !isGreek && !isHebrew;
  const isStandalonePreview = normalizedLocation.startsWith("/preview/");
  const isEnglishHomepage = normalizedLocation === "/";
  const isTemplatesIndex = normalizedLocation === "/templates";
  const isEnglishTypographyRoute = !isGreek && !isHebrew && !isStandalonePreview && !EXCLUDED_ENGLISH_LOCATION_ROUTES.has(normalizedLocation);
  const NAV_LINKS = isHebrew ? HE_NAV_LINKS : isGreek ? EL_NAV_LINKS : EN_NAV_LINKS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLanguageSheetOpen(false);
    // Preserve reading position only for direct translations. A fallback such
    // as Blog -> Hebrew home deliberately starts at the top.
    const languageSwitchScroll = languageSwitchScrollRef.current;
    languageSwitchScrollRef.current = undefined;
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: languageSwitchScroll ?? 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(raf);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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

  // The Hebrew option safely falls back to the completed Hebrew home until the
  // matching child route has been translated. Hreflang never uses that fallback.
  const LangToggle = ({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" }) => {
    const isSmall = size === "sm";
    const enHref = isGreek || isHebrew ? getAltLangHref("en") : withTrailingSlash(normalizedLocation);
    const elHref = isGreek ? withTrailingSlash(normalizedLocation) : getAltLangHref("el");
    const heHref = isHebrew ? withTrailingSlash(normalizedLocation) : getAltLangHref("he");

    const currentLanguage = isHebrew
      ? { code: "HE", name: "עברית", flag: <FlagIL /> }
      : isGreek
        ? { code: "EL", name: "Ελληνικά", flag: <FlagGR /> }
        : { code: "EN", name: "English", flag: <FlagUK /> };
    const sheetTitle = isHebrew ? "בחירת שפה" : isGreek ? "Επιλογή γλώσσας" : "Choose language";

    if (isSmall) {
      const languageOptions = [
        { code: "EN", name: "English", href: enHref, isActive: isEnglish, flag: <FlagUK />, target: "en" as const },
        { code: "EL", name: "Ελληνικά", href: elHref, isActive: isGreek, flag: <FlagGR />, target: "el" as const },
        { code: "HE", name: "עברית", href: heHref, isActive: isHebrew, flag: <FlagIL />, target: "he" as const },
      ];

      return (
        <Sheet open={languageSheetOpen} onOpenChange={setLanguageSheetOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={`${sheetTitle}: ${currentLanguage.name}`}
              className={`inline-flex h-9 items-center gap-1.5 rounded-full border border-[#E2E5EA] bg-white px-2.5 text-xs font-semibold text-[#334155] shadow-sm transition-colors hover:border-[#B8C9FF] hover:bg-[#F6F8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8CFF] focus-visible:ring-offset-2 ${className}`}
            >
              {currentLanguage.flag}
              <span>{currentLanguage.code}</span>
              <ChevronDown size={14} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            dir={isHebrew ? "rtl" : "ltr"}
            className="rounded-t-[1.5rem] border-[#E2E5EA] bg-[#F6F6F4] px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3"
          >
            <SheetHeader className={isHebrew ? "px-1 pb-2 text-right" : "px-1 pb-2 text-left"}>
              <SheetTitle className="text-base font-semibold text-[#111315]">{sheetTitle}</SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 px-1 pb-1">
              {languageOptions.map((language) => (
                <SheetClose asChild key={language.code}>
                  <a
                    href={language.href}
                    lang={language.target}
                    aria-current={language.isActive ? "true" : undefined}
                    className={`flex min-h-14 items-center justify-between rounded-2xl border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8CFF] focus-visible:ring-offset-2 ${
                      language.isActive
                        ? "border-[#AFC5FF] bg-[#EAF0FF] text-[#285EDB]"
                        : "border-[#E2E5EA] bg-white text-[#334155] hover:border-[#B8C9FF] hover:bg-[#F6F8FF]"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      setLanguageSheetOpen(false);
                      navigateLanguage(language.target, language.href);
                    }}
                  >
                    <span className="flex items-center gap-3">
                      {language.flag}
                      <span>{language.name}</span>
                    </span>
                    <span className="text-xs font-bold tracking-[0.08em] text-current">{language.code}</span>
                  </a>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        className={`flex items-center rounded-full border border-[#E2E5EA] bg-white shadow-sm overflow-hidden ${isEnglishHomepage ? "editorial-home-language-toggle" : ""} ${className}`}
        style={{ padding: "2px" }}
      >
        <a
          href={enHref}
          aria-label="Switch to English"
          title="English"
          aria-current={isEnglish ? "true" : undefined}
          className={`flex items-center gap-1.5 rounded-full transition-all duration-200 font-semibold ${
            isSmall ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-xs"
          } ${
            isEnglish
              ? "bg-[#5B8CFF] text-white shadow-sm"
              : "text-[#5B6472] hover:bg-[#F0F4FF] hover:text-[#5B8CFF]"
          }`}
          onClick={(e) => { e.preventDefault(); navigateLanguage("en", enHref); }}
        >
          <FlagUK />
          <span>EN</span>
        </a>
        <a
          href={elHref}
          aria-label="Εναλλαγή σε Ελληνικά"
          title="Ελληνικά"
          aria-current={isGreek ? "true" : undefined}
          className={`flex items-center gap-1.5 rounded-full transition-all duration-200 font-semibold ${
            isSmall ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-xs"
          } ${
            isGreek
              ? "bg-[#5B8CFF] text-white shadow-sm"
              : "text-[#5B6472] hover:bg-[#F0F4FF] hover:text-[#5B8CFF]"
          }`}
          onClick={(e) => { e.preventDefault(); navigateLanguage("el", elHref); }}
        >
          <FlagGR />
          <span>EL</span>
        </a>
        <a
          href={heHref}
          aria-label="מעבר לעברית"
          title="עברית"
          aria-current={isHebrew ? "true" : undefined}
          className={`flex items-center gap-1.5 rounded-full transition-all duration-200 font-semibold ${
            isSmall ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-xs"
          } ${
            isHebrew
              ? "bg-[#5B8CFF] text-white shadow-sm"
              : "text-[#5B6472] hover:bg-[#F0F4FF] hover:text-[#5B8CFF]"
          }`}
          onClick={(e) => { e.preventDefault(); navigateLanguage("he", heHref); }}
        >
          <FlagIL />
          <span>עב</span>
        </a>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${isEnglishTypographyRoute ? "english-commissioner-base" : ""} ${isEnglishHomepage ? "editorial-home-shell" : ""} ${isTemplatesIndex ? "templates-editorial-shell" : ""} ${isHebrew ? "hebrew-shell" : ""}`} dir={isHebrew ? "rtl" : undefined}>
      {/* ── NAVIGATION ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isEnglishHomepage ? "editorial-home-header" : ""} ${
          isHebrew
            ? "border-b border-[#E2E5EA] bg-[#F6F6F4] shadow-sm"
            : scrolled
              ? "glass-nav shadow-sm"
              : "bg-transparent"
        }`}
        dir={isHebrew ? "rtl" : undefined}
      >
        <div className="container flex items-center justify-between" style={{ height: "72px" }}>
          {/* Logo */}
          <Link href={isHebrew ? "/he/" : isGreek ? "/el/" : "/"} className="flex items-center gap-2 shrink-0">
            <HeaderBrandMark />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${isEnglishHomepage ? "editorial-home-nav-link" : ""} ${
                  location === link.href
                    ? "text-[#5B8CFF]"
                    : "text-[#111315] hover:text-[#5B8CFF]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: lang toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LangToggle />
            {isHebrew ? (
              <a href={HEBREW_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !h-11 !text-sm !px-6">
                ייעוץ ללא עלות
              </a>
            ) : (
              <Link href={isGreek ? "/el/contact/" : "/contact/"} className={`btn-primary !h-11 !text-sm !px-6 ${isEnglishHomepage ? "editorial-home-header-cta" : ""}`}>
                {isGreek ? "Δωρεάν Συμβουλευτική" : "Free Consultation"}
              </Link>
            )}
          </div>

          {/* Mobile: lang toggle pill + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <LangToggle size="sm" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#111315]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: isHebrew ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isHebrew ? "-100%" : "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-0 z-40 bg-[#F6F6F4] pt-20 px-6 lg:hidden ${isEnglishHomepage ? "editorial-home-mobile-menu" : ""}`}
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-4 text-lg font-medium border-b border-[#E2E5EA] transition-colors ${isEnglishHomepage ? "editorial-home-mobile-link" : ""} ${
                    location === link.href
                      ? "text-[#5B8CFF]"
                      : "text-[#111315]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {isHebrew ? (
              <a href={HEBREW_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full mt-6">
                ייעוץ ללא עלות
              </a>
            ) : (
              <Link href={isGreek ? "/el/contact/" : "/contact/"} className={`btn-primary w-full mt-6 ${isEnglishHomepage ? "editorial-home-mobile-cta" : ""}`}>
                {isGreek ? "Δωρεάν Συμβουλευτική" : "Free Consultation"}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAGE CONTENT (wrapped for contrast filter - does NOT include fixed elements) */}
      <div id="a11y-content-wrapper" className="flex-1 flex flex-col">
      <main className="flex-1 pt-[72px]">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="dark-section">
        <div className="container section-spacing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div style={{ marginBottom: "20px" }}><BrandMark dark /></div>
                <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
                  {isHebrew
                    ? "סטודיו קטן ומסור לעיצוב אתרים. אנחנו בונים אתרים מקצועיים וממוקדי המרות לעסקים שרוצים לבלוט אונליין."
                    : isGreek
                      ? "Μια μικρή, αφοσιωμένη εταιρεία web design. Κατασκευάζουμε επαγγελματικές ιστοσελίδες για επιχειρήσεις που θέλουν να ξεχωρίζουν online."
                      : "A small, dedicated web design agency. We build professional, conversion-focused websites for businesses that want to stand out online."
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
