/* ============================================================
   DM-Labs.io v2.0 - Layout
   Sharp geometry · Space Mono nav labels · Glass on scroll
   Footer: coordinates, WhatsApp, mono annotation
   ============================================================ */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle } from "lucide-react";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import NeonCursorTrail from "@/components/NeonCursorTrail";

const LOGO_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ofdIwdWPHQdHPziu.png?Expires=1816249782&Signature=LoO2fRZYNZvSveh4CGYmFIJpMhvkRDBwPzatZ87rgA2AIvSrkRrUimHDf6Lkhmd1lTBfHI43XJyr6vNxZr3fDoLjcz4neDCgL2~2KSZeL01Jkmh~2ihjqY~VeKz~U1JxXgr3B9D34MNd15HRw0r3MyxNjvWnkelK8psyBi74060KNFyrAL10z6hIDNBahlm6tzMSi~4ajix~yrkGaK7Pzpbo4Or-TosEbmyroEOGQarX9IEsu40sJxt4wIyMVjDGOx4RhJhu49osOAHhdDOjUA7UaYHeMQeMGRX97TSsEoky3o9-F0uUmIGAUdRo0FumxuEsBtDvCTYf5s~IdWKb4w__&Key-Pair-Id=K2HSFNDJXOU9YS";

const WHATSAPP_URL =
  "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const EN_NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Process",  href: "/process" },
  { label: "Examples", href: "/templates" },
  { label: "Pricing",  href: "/pricing" },
  { label: "Blog",     href: "/blog" },
  { label: "FAQ",      href: "/faq" },
  { label: "Contact",  href: "/contact" },
];

const EL_NAV_LINKS = [
  { label: "Αρχική",      href: "/el" },
  { label: "Υπηρεσίες",  href: "/el/services" },
  { label: "Διαδικασία", href: "/el/process" },
  { label: "Παραδείγματα", href: "/el/examples" },
  { label: "Τιμές",      href: "/el/pricing" },
  { label: "Άρθρα",      href: "/el/blog" },
  { label: "FAQ",         href: "/el/faq" },
  { label: "Επικοινωνία", href: "/el/contact" },
];

/* ── Flag SVGs ───────────────────────────────────────────── */
const FlagUK = () => (
  <svg width="18" height="12" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="60" height="40" fill="#012169"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7"/>
  </svg>
);

const FlagGR = () => (
  <svg width="18" height="12" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="60" height="40" fill="#0D5EAF"/>
    <rect y="4.44"  width="60" height="4.44" fill="#fff"/>
    <rect y="13.32" width="60" height="4.44" fill="#fff"/>
    <rect y="22.2"  width="60" height="4.44" fill="#fff"/>
    <rect y="31.08" width="60" height="4.44" fill="#fff"/>
    <rect width="24" height="22.2" fill="#0D5EAF"/>
    <rect x="8.88" y="0" width="6.24" height="22.2" fill="#fff"/>
    <rect y="8.88" width="24" height="4.44" fill="#fff"/>
  </svg>
);

/* ── Slug map for language switching ─────────────────────── */
const SLUG_MAP_EN_TO_EL: Record<string, string> = {
  "/blog/website-cost-cyprus-2026-guide": "/el/blog/posso-kostizei-istoselidha-kypros",
  "/blog/web-design-nail-salon-beauty-studio-cyprus": "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
  "/blog/yoga-pilates-studio-website-cyprus": "/el/blog/istoselidha-yoga-pilates-studio-kypros",
  "/blog/how-to-get-found-on-google-cyprus": "/el/blog/pos-na-vretheite-google-kypros",
  "/blog/restaurant-website-design-cyprus": "/el/blog/istoselidha-estiatorio-kypros",
  "/blog/wix-vs-professional-web-designer-cyprus": "/el/blog/wix-vs-epaggelmatias-web-designer-kypros",
  "/blog/web-design-greece-guide-2026": "/el/blog/web-design-ellada-odigos-2026",
};
const SLUG_MAP_EL_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_MAP_EN_TO_EL).map(([en, el]) => [el, en])
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
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(raf);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function handleLangToggle(targetLang: "en" | "el") {
    if (targetLang === "el" && !isGreek) {
      const mapped = SLUG_MAP_EN_TO_EL[location];
      navigate(mapped ?? (location === "/" ? "/el" : "/el" + location));
    } else if (targetLang === "en" && isGreek) {
      const mapped = SLUG_MAP_EL_TO_EN[location];
      navigate(mapped ?? (location.replace(/^\/el/, "") || "/"));
    }
  }

  const LangToggle = ({ className = "" }: { className?: string }) => (
    <div
      className={`flex items-center border border-[var(--hairline)] overflow-hidden ${className}`}
      style={{ background: "var(--glass)", backdropFilter: "blur(12px)" }}
    >
      <button
        onClick={() => handleLangToggle("en")}
        aria-label="Switch to English"
        title="English"
        className="flex items-center gap-1.5 px-2.5 py-1.5 transition-all duration-200"
        style={{
          background: !isGreek ? "var(--ink)" : "transparent",
          color: !isGreek ? "#fff" : "var(--slate)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          letterSpacing: ".15em",
          textTransform: "uppercase",
        }}
      >
        <FlagUK />
        <span>EN</span>
      </button>
      <button
        onClick={() => handleLangToggle("el")}
        aria-label="Εναλλαγή σε Ελληνικά"
        title="Ελληνικά"
        className="flex items-center gap-1.5 px-2.5 py-1.5 transition-all duration-200"
        style={{
          background: isGreek ? "var(--ink)" : "transparent",
          color: isGreek ? "#fff" : "var(--slate)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          letterSpacing: ".15em",
          textTransform: "uppercase",
        }}
      >
        <FlagGR />
        <span>EL</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "var(--glass-deep)"
            : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
          boxShadow: scrolled ? "var(--lift-1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "68px" }}>
          {/* Logo mark + wordmark */}
          <Link href={isGreek ? "/el" : "/"} className="flex items-center gap-2.5 shrink-0">
            <img
              src={LOGO_URL}
              alt="DM-Labs.io logo"
              width={28}
              height={28}
              style={{ display: "block", objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 900,
                fontSize: "1.05rem",
                letterSpacing: "-.02em",
                color: "var(--ink)",
              }}
            >
              DM-Labs.io
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase" as const,
                  textIndent: ".18em",
                  color: location === link.href ? "var(--blue)" : "var(--slate)",
                  transition: "color 150ms",
                  textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = location === link.href ? "var(--blue)" : "var(--slate)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: lang + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LangToggle />
            <Link
              href={isGreek ? "/el/contact" : "/contact"}
              className="btn btn-primary"
              style={{ padding: "11px 22px", fontSize: "10px" }}
            >
              {isGreek ? "Δωρεάν Συμβουλευτική" : "Free Consultation"}
            </Link>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <LangToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2"
              aria-label="Toggle menu"
              style={{ color: "var(--ink)" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden flex flex-col"
          style={{
            background: "var(--glass-deep)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            paddingTop: "68px",
          }}
        >
          <nav className="flex flex-col px-6 pt-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-4 border-b"
                style={{
                  borderColor: "var(--hairline)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase" as const,
                  textIndent: ".18em",
                  color: location === link.href ? "var(--blue)" : "var(--ink)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 pt-6">
            <Link
              href={isGreek ? "/el/contact" : "/contact"}
              className="btn btn-primary w-full justify-center"
            >
              {isGreek ? "Δωρεάν Συμβουλευτική" : "Free Consultation"}
            </Link>
          </div>
        </div>
      )}

      {/* ── PAGE CONTENT ───────────────────────────────────── */}
      <div id="a11y-content-wrapper" className="flex-1 flex flex-col">
        <main className="flex-1 pt-[68px]">{children}</main>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer style={{ background: "var(--ink)", color: "var(--mist)" }}>
          <div className="container" style={{ paddingTop: "72px", paddingBottom: "48px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

              {/* Brand column */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2.5 mb-5">
                  <img src={LOGO_URL} alt="DM-Labs.io" width={26} height={26} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "1rem", letterSpacing: "-.02em", color: "#fff" }}>
                    DM-Labs.io
                  </span>
                </div>
                <p style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", lineHeight: 1.65, maxWidth: "22ch" }}>
                  {isGreek
                    ? "Μικρή, αφοσιωμένη εταιρεία web design. Επαγγελματικές ιστοσελίδες που αποδίδουν."
                    : "A small, dedicated web design agency. Professional websites that perform."}
                </p>

                {/* Coordinates annotation */}
                <div className="mt-5" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(238,241,248,.3)", lineHeight: 1.8 }}>
                  <div>34.7757 N / 32.4341 E</div>
                  <div>Paphos, Cyprus</div>
                </div>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/dm_labs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow DM-Labs.io on Instagram"
                  className="inline-flex items-center gap-2 mt-5"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    color: "rgba(238,241,248,.45)",
                    textDecoration: "none",
                    transition: "color 200ms",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.45)")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @dm_labs.io
                </a>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="mono mb-5" style={{ color: "rgba(238,241,248,.35)" }}>
                  {isGreek ? "Πλοήγηση" : "Navigation"}
                </h4>
                <ul className="space-y-3">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="mono mb-5" style={{ color: "rgba(238,241,248,.35)" }}>
                  {isGreek ? "Νομικά" : "Legal"}
                </h4>
                <ul className="space-y-3">
                  {isGreek ? (
                    <>
                      <li><Link href="/el/privacy" style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}>Πολιτική Απορρήτου</Link></li>
                      <li><Link href="/el/cookie-policy" style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}>Πολιτική Cookies</Link></li>
                      <li><Link href="/el/terms" style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}>Όροι Χρήσης</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link href="/privacy" style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}>Privacy Policy</Link></li>
                      <li><Link href="/cookies" style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}>Cookie Policy</Link></li>
                      <li><Link href="/terms" style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}>Terms of Service</Link></li>
                    </>
                  )}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="mono mb-5" style={{ color: "rgba(238,241,248,.35)" }}>
                  {isGreek ? "Επικοινωνία" : "Contact"}
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a href="tel:+35797472847" style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}>
                      +357 97 472 847
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@dm-labs.io" style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(238,241,248,.55)")}>
                      info@dm-labs.io
                    </a>
                  </li>
                  <li style={{ fontSize: ".875rem", color: "rgba(238,241,248,.55)" }}>
                    {isGreek ? "Ευρώπη και Παγκοσμίως" : "Europe and Worldwide"}
                  </li>
                </ul>

                {/* WhatsApp CTA */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 btn btn-ghost"
                  style={{
                    padding: "10px 18px",
                    fontSize: "10px",
                    background: "rgba(255,255,255,.06)",
                    borderColor: "rgba(255,255,255,.12)",
                    color: "#fff",
                    backdropFilter: "none",
                  }}
                >
                  <MessageCircle size={13} />
                  {isGreek ? "WhatsApp" : "WhatsApp"}
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
              style={{ borderTop: "1px solid rgba(238,241,248,.08)" }}
            >
              <p className="mono" style={{ color: "rgba(238,241,248,.25)", letterSpacing: ".12em" }}>
                &copy; {new Date().getFullYear()} DM-Labs.io. {isGreek ? "Με επιφύλαξη παντός δικαιώματος." : "All rights reserved."}
              </p>
              <p className="mono" style={{ color: "rgba(238,241,248,.25)", letterSpacing: ".12em" }}>
                {isGreek ? "Σχεδιασμένο στην Ευρώπη." : "Crafted in Europe."}
              </p>
            </div>
          </div>
        </footer>
      </div>

      <AccessibilityWidget />
      <NeonCursorTrail />
    </div>
  );
}
