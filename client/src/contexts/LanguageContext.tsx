import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { getRouteLanguage, type SiteLanguage } from "@/lib/routeLanguage";

type LanguageContextValue = { lang: SiteLanguage; isGreek: boolean; isHebrew: boolean };
const LanguageContext = createContext<LanguageContextValue>({ lang: "en", isGreek: false, isHebrew: false });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const lang = getRouteLanguage(location);
  // Initial document attributes are set in brand-locale.js before first paint.
  // Keep client-side navigation in sync before the browser paints its next frame.
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);
  return <LanguageContext.Provider value={{ lang, isGreek: lang === "el", isHebrew: lang === "he" }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
