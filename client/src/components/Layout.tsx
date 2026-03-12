/* ============================================================
   D&M LABS - Layout Component
   Glassmorphism nav, mobile hamburger, dark footer
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient, #0F172A dark
   ============================================================ */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AccessibilityWidget from "@/components/AccessibilityWidget";


const LOGO_URL = "/dmlabs-logo.png";

const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20D%26M%20Labs!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src={LOGO_URL} alt="D&M Labs" style={{ width: '140px', height: 'auto' }} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
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

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:flex btn-primary !h-11 !text-sm !px-6"
          >
            Get Started
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#111315]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
              href="/contact"
              className="btn-primary w-full mt-8"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PAGE CONTENT (wrapped for contrast filter — does NOT include fixed elements) ── */}
      <div id="a11y-content-wrapper" className="flex-1 flex flex-col">
      <main className="flex-1 pt-[72px]">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="dark-section">
        <div className="container section-spacing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img src={LOGO_URL} alt="D&M Labs" style={{ width: '140px', height: 'auto', marginBottom: '20px' }} />
                <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
                  A small, dedicated web design agency. We build professional, conversion-focused websites for businesses that want to stand out online.
                </p>
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-5">
                <a
                  href="https://www.instagram.com/dm_labs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow D&M Labs on Instagram"
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
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">Navigation</h4>
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
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">Contact</h4>
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
                  <span>Europe &amp; Worldwide</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#64748B]">
              &copy; {new Date().getFullYear()} D&amp;M Labs. All rights reserved.
            </p>
            <p className="text-xs text-[#64748B]">
              Crafted in Europe, delivered worldwide.
            </p>
          </div>
        </div>
      </footer>

      </div>{/* end a11y-content-wrapper */}

      {/* Accessibility Widget */}
      <AccessibilityWidget />
    </div>
  );
}
