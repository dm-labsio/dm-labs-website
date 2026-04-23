/* ============================================================
   D&M LABS - Language Context
   Manages EN / EL language state.
   - Reads initial language from localStorage (persists across sessions)
   - Provides useLanguage() hook for all components
   - Language is also derived from the URL prefix (/el/ = Greek)
   ============================================================ */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

type Lang = "en" | "el";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  isGreek: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  isGreek: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  // Derive language from URL prefix - this is the source of truth for SEO
  const isGreekUrl = location.startsWith("/el") || location === "/el";
  const urlLang: Lang = isGreekUrl ? "el" : "en";

  const [lang, setLangState] = useState<Lang>(() => {
    // On first load, prefer URL-derived language, then localStorage
    if (isGreekUrl) return "el";
    try {
      const stored = localStorage.getItem("dm-lang") as Lang | null;
      if (stored === "el" || stored === "en") return stored;
    } catch {}
    return "en";
  });

  // Keep lang in sync with URL changes
  useEffect(() => {
    setLangState(urlLang);
  }, [urlLang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("dm-lang", l); } catch {}
  };

  // Set html lang attribute for accessibility and SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isGreek: lang === "el" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
