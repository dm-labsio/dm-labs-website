/* ============================================================
   D&M LABS - Language Context
   - URL is the language source of truth for SEO.
   - Hebrew support is prepared before public Hebrew routes are exposed.
   ============================================================ */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

type Lang = "en" | "el" | "he";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  isGreek: boolean;
  isHebrew: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  isGreek: false,
  isHebrew: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isGreekUrl = location === "/el" || location.startsWith("/el/");
  const isHebrewUrl = location === "/he" || location.startsWith("/he/");
  const urlLang: Lang = isHebrewUrl ? "he" : isGreekUrl ? "el" : "en";

  const [lang, setLangState] = useState<Lang>(() => {
    if (isHebrewUrl) return "he";
    if (isGreekUrl) return "el";
    try {
      const stored = localStorage.getItem("dm-lang") as Lang | null;
      if (stored === "he" || stored === "el" || stored === "en") return stored;
    } catch {}
    return "en";
  });

  useEffect(() => {
    setLangState(urlLang);
  }, [urlLang]);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    try { localStorage.setItem("dm-lang", nextLang); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isGreek: lang === "el", isHebrew: lang === "he" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
