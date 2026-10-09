import type { SiteLanguage } from "@/lib/routeLanguage";
import { normalizeRoutePath } from "@/lib/seoRoutes";

export const EN_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Process", href: "/process/" },
  { label: "Our Work", href: "/templates/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

export const EL_NAV_LINKS = [
  { label: "Αρχική", href: "/el/" },
  { label: "Υπηρεσίες", href: "/el/services/" },
  { label: "Διαδικασία", href: "/el/process/" },
  { label: "Η δουλειά μας", href: "/el/templates/" },
  { label: "Τιμές", href: "/el/pricing/" },
  { label: "Άρθρα", href: "/el/blog/" },
  { label: "Ερωτήσεις", href: "/el/faq/" },
  { label: "Επικοινωνία", href: "/el/contact/" },
];

export const HE_NAV_LINKS = [
  { label: "דף הבית", href: "/he/" },
  { label: "שירותים", href: "/he/services/" },
  { label: "תהליך", href: "/he/process/" },
  { label: "העבודות שלנו", href: "/he/templates/" },
  { label: "מחירים", href: "/he/pricing/" },
  { label: "מאמרים", href: "/he/blog/" },
  { label: "שאלות נפוצות", href: "/he/faq/" },
  { label: "צרו קשר", href: "/he/contact/" },
];


export const getNavigation = (language: SiteLanguage) => language === "he" ? HE_NAV_LINKS : language === "el" ? EL_NAV_LINKS : EN_NAV_LINKS;

export function getActiveNavHref(location: string, language: SiteLanguage) {
  const path = normalizeRoutePath(location);
  const links = getNavigation(language);
  return links.find(link => normalizeRoutePath(link.href) === path)?.href
    ?? links.find(link => link !== links[0] && path.startsWith(`${normalizeRoutePath(link.href)}/`))?.href;
}

export const NAV_COPY = {
  en: { home: "DM Labs home", navigation: "Main navigation", open: "Open menu", close: "Close menu", language: "Choose language", consultation: "Free consultation", skip: "Skip to content", note: "A good website starts with a conversation." },
  el: { home: "DM Labs: Αρχική", navigation: "Κύρια πλοήγηση", open: "Άνοιγμα μενού", close: "Κλείσιμο μενού", language: "Επιλογή γλώσσας", consultation: "Δωρεάν συμβουλευτική", skip: "Μετάβαση στο περιεχόμενο", note: "Κάθε καλή ιστοσελίδα ξεκινά με μια κουβέντα." },
  he: { home: "DM Labs: דף הבית", navigation: "ניווט ראשי", open: "פתיחת תפריט", close: "סגירת תפריט", language: "בחירת שפה", consultation: "ייעוץ בחינם", skip: "דילוג לתוכן", note: "אתר טוב מתחיל בשיחה." },
};
