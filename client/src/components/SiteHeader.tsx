import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import BrandLogo from "./BrandLogo";
import BrandButton from "./ui/brand-button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { getRouteLanguage, type SiteLanguage } from "@/lib/routeLanguage";
import { normalizeRoutePath } from "@/lib/seoRoutes";
import { getNavigation, getActiveNavHref, NAV_COPY } from "./siteNavigation";
import "./SiteHeader.css";

type HeaderProps = {
  location: string;
  getLanguageHref: (language: SiteLanguage) => string;
  onLanguageNavigate: (language: SiteLanguage, href: string) => void;
  onBrandClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function isPlainClick(event: React.MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

const LANGUAGES = [
  { target: "en", code: "EN", name: "English" },
  { target: "el", code: "EL", name: "Ελληνικά" },
  { target: "he", code: "HE", name: "עברית" },
] as const;

function LanguageMenu({ language, getLanguageHref, onLanguageNavigate }: Pick<HeaderProps, "getLanguageHref" | "onLanguageNavigate"> & { language: SiteLanguage }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(option => option.target === language)!;
  // A language picker must not lock body scrolling: that moves sticky headers offscreen.
  return <DropdownMenu modal={false} open={open} onOpenChange={setOpen} dir={language === "he" ? "rtl" : "ltr"}>
    <DropdownMenuTrigger asChild>
      <button type="button" className="site-language-trigger" aria-label={`${NAV_COPY[language].language}: ${current.name}`}>
        <span>{current.code}</span>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" sideOffset={12} className="site-language-menu" lang={language}>
      {LANGUAGES.map(option => <DropdownMenuItem key={option.target} asChild>
        <a href={getLanguageHref(option.target)} lang={option.target} dir={option.target === "he" ? "rtl" : "ltr"}
          aria-current={language === option.target ? "true" : undefined}
          onClick={event => {
            if (!isPlainClick(event)) return;
            event.preventDefault(); setOpen(false);
            onLanguageNavigate(option.target, getLanguageHref(option.target));
          }}>
          <span className="site-language-name">{option.target === "en" ? <FlagUK /> : option.target === "el" ? <FlagGR /> : <FlagIL />}{option.name}</span>
          <span className="site-language-code" aria-hidden="true">{option.code}</span>
        </a>
      </DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu>;
}

export default function SiteHeader({ location, getLanguageHref, onLanguageNavigate, onBrandClick }: HeaderProps) {
  const language = getRouteLanguage(location);
  const direction = language === "he" ? "rtl" : "ltr";
  const copy = NAV_COPY[language];
  const links = getNavigation(language);
  const home = links[0].href;
  const contact = links[links.length - 1].href;
  const active = getActiveNavHref(location, language);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1440px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const current = (href: string) => active === href ? (normalizeRoutePath(location) === normalizeRoutePath(href) ? "page" as const : "location" as const) : undefined;

  return <>
    <a className="site-skip-link" href="#main-content">{copy.skip}</a>
    <header className="site-header" dir={direction} lang={language}>
      <div className="site-header-inner">
        <Link href={home} className="site-brand-link" aria-label={copy.home} onClick={onBrandClick}><BrandLogo /></Link>
        <nav className="site-desktop-nav" aria-label={copy.navigation}>
          {links.slice(1, -1).map(link => <Link key={link.href} href={link.href} aria-current={current(link.href)}>{link.label}</Link>)}
        </nav>
        <div className="site-header-actions">
          <LanguageMenu language={language} getLanguageHref={getLanguageHref} onLanguageNavigate={onLanguageNavigate} />
          <BrandButton asChild className="site-header-cta"><Link href={contact}>{copy.consultation}</Link></BrandButton>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild><button type="button" className="site-menu-trigger" aria-label={copy.open}><Menu size={24} aria-hidden="true" /></button></SheetTrigger>
            <SheetContent side={language === "he" ? "left" : "right"} className="site-menu-panel" dir={direction} lang={language} data-brand="dm-labs" closeLabel={copy.close} aria-describedby={undefined}>
              <SheetTitle className="sr-only">{copy.navigation}</SheetTitle>
              <SheetClose asChild><Link href={home} className="site-menu-brand" aria-label={copy.home} onClick={onBrandClick}><BrandLogo /></Link></SheetClose>
              <nav aria-label={copy.navigation}>
                {links.map((link, index) => <SheetClose asChild key={link.href}>
                  <Link href={link.href} className="site-menu-link" aria-current={current(link.href)}>
                    <span>{link.label}</span>
                  </Link>
                </SheetClose>)}
              </nav>
              <div className="site-menu-offer">
                <p>{copy.note}</p>
                <SheetClose asChild><BrandButton asChild><Link href={contact}>{copy.consultation}</Link></BrandButton></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  </>;
}

/* ── Flag marks ── */
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
  <img
    src="/media/icons/israel-flag-icon.webp"
    alt=""
    aria-hidden="true"
    width="20"
    height="20"
    className="block h-5 w-5 shrink-0 object-contain"
  />
);

