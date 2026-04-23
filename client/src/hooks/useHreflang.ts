/* ============================================================
   D&M LABS - useHreflang Hook
   Injects <link rel="alternate" hreflang="..."> tags into <head>
   for every page, telling Google about the EN/EL alternates.

   Rules:
   - Every English page points to itself (en) and its /el/ counterpart (el)
   - Every Greek page points to its English counterpart (en) and itself (el)
   - x-default always points to the English version
   ============================================================ */
import { useEffect } from "react";
import { useLocation } from "wouter";

const BASE_URL = "https://dm-labs.io";

export function useHreflang() {
  const [location] = useLocation();

  useEffect(() => {
    // Remove any existing hreflang tags to avoid duplicates
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    const isGreek = location.startsWith("/el");

    // Derive the canonical path for each language
    let enPath: string;
    let elPath: string;

    if (isGreek) {
      // Strip /el prefix to get English path
      enPath = location.replace(/^\/el/, "") || "/";
      elPath = location;
    } else {
      enPath = location;
      elPath = "/el" + (location === "/" ? "" : location);
    }

    // Normalise trailing slashes
    if (enPath !== "/" && enPath.endsWith("/")) enPath = enPath.slice(0, -1);
    if (elPath !== "/el" && elPath.endsWith("/")) elPath = elPath.slice(0, -1);

    const enUrl = `${BASE_URL}${enPath}`;
    const elUrl = `${BASE_URL}${elPath}`;

    const tags: { hreflang: string; href: string }[] = [
      { hreflang: "en", href: enUrl },
      { hreflang: "el", href: elUrl },
      { hreflang: "x-default", href: enUrl },
    ];

    tags.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", hreflang);
      link.setAttribute("href", href);
      document.head.appendChild(link);
    });

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, [location]);
}
