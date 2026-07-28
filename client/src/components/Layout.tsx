/* ============================================================
   DM-Labs.io - Layout Component
   Glassmorphism nav, mobile hamburger, dark footer
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient, #0F172A dark
   Language toggle: flag-based EN/EL, visible on mobile as floating pill
   ============================================================ */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import NeonCursorTrail from "@/components/NeonCursorTrail";


const BrandMark = ({ dark = false }: { dark?: boolean }) => (
  <span
    className={`text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap ${dark ? "text-white" : "text-[#111315]"}`}
    aria-label="DM-Labs.io"
  >
    <span className="brand-gradient-text">DM</span><span>-Labs.io</span>
  </span>
);

const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const EN_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Examples", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const EL_NAV_LINKS = [
  { label: "Αρχική", href: "/el" },
  { label: "Υπηρεσίες", href: "/el/services" },
  { label: "Διαδικασία", href: "/el/process" },
  { label: "Παραδείγματα", href: "/el/templates" },
  { label: "Τιμές", href: "/el/pricing" },
  { label: "Άρθρα", href: "/el/blog" },
  { label: "FAQ", href: "/el/faq" },
  { label: "Επικοινωνία", href: "/el/contact" },
];

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

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isGreek = location.startsWith("/el");
  const NAV_LINKS = isGreek ? EL_NAV_LINKS : EN_NAV_LINKS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    // Use requestAnimationFrame to scroll after the new page has painted,
    // preventing the brief flash/jump to the footer on language switch.
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(raf);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Slug mapping for pages where EN and EL paths differ (e.g. blog posts)
  const SLUG_MAP_EN_TO_EL: Record<string, string> = {
    "/blog/website-cost-cyprus-2026-guide": "/el/blog/posso-kostizei-istoselidha-kypros",
    "/blog/web-design-nail-salon-beauty-studio-cyprus": "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
    "/blog/yoga-pilates-studio-website-cyprus": "/el/blog/istoselidha-yoga-pilates-studio-kypros",
    "/blog/how-to-get-found-on-google-cyprus": "/el/blog/pos-na-vretheite-google-kypros",
    "/blog/restaurant-website-design-cyprus": "/el/blog/istoselidha-estiatorio-kypros",
    "/blog/wix-vs-professional-web-designer-cyprus": "/el/blog/wix-vs-epaggelmatias-web-designer-kypros",
    "/blog/web-design-greece-guide-2026": "/el/blog/web-design-ellada-odigos-2026",
    "/el/blog/web-design-ellada-odigos-2026": "/blog/web-design-greece-guide-2026",
  };
  const SLUG_MAP_EL_TO_EN: Record<string, string> = Object.fromEntries(
    Object.entries(SLUG_MAP_EN_TO_EL).map(([en, el]) => [el, en])
  );

  // Derive the alternate-language URL for the current page
  function getAltLangHref(targetLang: "en" | "el"): string {
    if (targetLang === "el" && !isGreek) {
      const mapped = SLUG_MAP_EN_TO_EL[location];
      return mapped ?? (location === "/" ? "/el" : "/el" + location);
    } else if (targetLang === "en" && isGreek) {
      const mapped = SLUG_MAP_EL_TO_EN[location];
      return mapped ?? (location.replace(/^\/el/, "") || "/");
    }
    return location;
  }

  // Flag-based language toggle — uses real <a href> for crawlability (Task 3)
  const LangToggle = ({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" }) => {
    const isSmall = size === "sm";
    const enHref = isGreek ? getAltLangHref("en") : location;
    const elHref = isGreek ? location : getAltLangHref("el");
    return (
      <div
        className={`flex items-center rounded-full border border-[#E2E5EA] bg-white shadow-sm overflow-hidden ${className}`}
        style={{ padding: "2px" }}
      >
        <a
          href={enHref}
          aria-label="Switch to English"
          title="English"
          aria-current={!isGreek ? "true" : undefined}
          className={`flex items-center gap-1.5 rounded-full transition-all duration-200 font-semibold ${
            isSmall ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-xs"
          } ${
            !isGreek
              ? "bg-[#5B8CFF] text-white shadow-sm"
              : "text-[#5B6472] hover:bg-[#F0F4FF] hover:text-[#5B8CFF]"
          }`}
          onClick={(e) => { e.preventDefault(); navigate(enHref); }}
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
          onClick={(e) => { e.preventDefault(); navigate(elHref); }}
        >
          <FlagGR />
          <span>EL</span>
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── NAVIGATION ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "glass-nav shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between" style={{ height: "72px" }}>
          {/* Logo */}
          <Link href={isGreek ? "/el" : "/"} className="flex items-center gap-2 shrink-0">
            <BrandMark />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${
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
            <Link
              href={isGreek ? "/el/contact" : "/contact"}
              className="btn-primary !h-11 !text-sm !px-6"
            >
              {isGreek ? "Δωρεάν Συμβουλευτική" : "Free Consultation"}
            </Link>
          </div>

          {/* Mobile: lang toggle pill + hamburger */}
          {/* aria-hidden: desktop LangToggle is the canonical crawlable version; mobile is a visual duplicate */}
          <div className="lg:hidden flex items-center gap-2" aria-hidden="true">
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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#F6F6F4] pt-20 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-4 text-lg font-medium border-b border-[#E2E5EA] transition-colors ${
                    location === link.href
                      ? "text-[#5B8CFF]"
                      : "text-[#111315]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href={isGreek ? "/el/contact" : "/contact"}
              className="btn-primary w-full mt-6"
            >
              {isGreek ? "Δωρεάν Συμβουλευτική" : "Free Consultation"}
            </Link>
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
                  {isGreek
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
                {isGreek ? "Πλοήγηση" : "Navigation"}
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
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">{isGreek ? "Νομικά" : "Legal"}</h4>
              <ul className="space-y-3">
                {isGreek ? (
                  <>
                    <li><Link href="/el/privacy" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Πολιτική Απορρήτου</Link></li>
                    <li><Link href="/el/cookie-policy" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Πολιτική Cookies</Link></li>
                    <li><Link href="/el/terms" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Όροι Χρήσης</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/privacy" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/cookies" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Cookie Policy</Link></li>
                    <li><Link href="/terms" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Terms of Service</Link></li>
                  </>
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">
                {isGreek ? "Επικοινωνία" : "Contact"}
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
                  <span>{isGreek ? "Ευρώπη και Παγκοσμίως" : "Europe & Worldwide"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#64748B]">
              &copy; {new Date().getFullYear()} DM-Labs.io. {isGreek ? "Με επιφύλαξη παντός δικαιώματος." : "All rights reserved."}
            </p>
            <p className="text-xs text-[#64748B]">
              {isGreek ? "Σχεδιασμένο στην Ευρώπη, παραδίδεται παγκοσμίως." : "Crafted in Europe, delivered worldwide."}
            </p>
            {/* Crawlable language link in footer (Task 3) */}
            <a
              href={isGreek ? getAltLangHref("en") : getAltLangHref("el")}
              onClick={(e) => { e.preventDefault(); navigate(isGreek ? getAltLangHref("en") : getAltLangHref("el")); }}
              className="text-xs text-[#64748B] hover:text-white transition-colors underline underline-offset-2"
              lang={isGreek ? "en" : "el"}
            >
              {isGreek ? "View in English" : "Δείτε στα Ελληνικά"}
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
