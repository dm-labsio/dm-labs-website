import { Link } from "wouter";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { ArrowLeft, CheckCircle2, ChevronLeft, MessageCircle, Smartphone } from "lucide-react";

const GRADIENT_BG = "/media/cloudfront/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const TRIANGLE_GEO = "/media/cloudfront/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "/media/cloudfront/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";
const ACCENT = "#6FE3FF";

const WHY_IT_MATTERS = [
  { heading: "רוב המבקרים שלכם במובייל", body: "ברוב הענפים, 60 עד 70 אחוז מהמבקרים מגיעים מסמארטפון. אם האתר איטי, קשה לניווט או נשבר במובייל, אתם מאבדים את רוב הלקוחות הפוטנציאליים עוד לפני שקראו מילה." },
  { heading: "Google מדרגת אתרים ידידותיים למובייל גבוה יותר", body: "Google משתמשת באינדוקס mobile-first, כלומר בודקת את גרסת המובייל של האתר כשמחליטה היכן לדרג אותו בתוצאות החיפוש. חוויית מובייל חלשה פוגעת ישירות ב-SEO." },
  { heading: "אינטראקציה שנוחה למגע", body: "משתמשי מובייל מתנהגים אחרת ממשתמשי מחשב. אנחנו מעצבים מתוך מחשבה על מגע, עם אזורי לחיצה גדולים יותר, גלריות שאפשר להחליק, ניווט דביק וטפסים שעובדים היטב עם מקלדות מובייל." },
] as const;

const DELIVERABLES = [
  "ארכיטקטורת פריסה בגישת mobile-first",
  "עיצוב רספונסיבי לכל גודל מסך, מ-320px עד 2560px",
  "ניווט וכפתורים שמותאמים למגע",
  "טפסים ושדות קלט נוחים למובייל",
  "תמונות מותאמות לטעינה מהירה במובייל",
  "בדיקות ב-iOS Safari, Android Chrome ובדפדפנים מרכזיים",
  "ללא גלילה אופקית או שבירת פריסה באף מכשיר",
] as const;

const PROCESS = [
  { step: "01", title: "קודם פריסת מובייל", desc: "אנחנו מעצבים את פריסת המובייל לפני כל דבר אחר, כדי שחוויית הליבה תהיה מצוינת גם במסכים הקטנים ביותר." },
  { step: "02", title: "שיפור הדרגתי", desc: "אחר כך אנחנו משפרים את הפריסה לטאבלטים ולמחשבים, ומוסיפים מורכבות חזותית במקום שבו גודל המסך מאפשר זאת." },
  { step: "03", title: "בדיקות בין מכשירים", desc: "אנחנו בודקים במכשירים אמיתיים ובאמולטורים ב-iOS וב-Android כדי לאתר בעיות פריסה לפני ההשקה." },
  { step: "04", title: "אימות ביצועים", desc: "אנחנו מריצים בדיקות Lighthouse ו-PageSpeed במובייל כדי לוודא זמני טעינה מהירים גם בחיבורי 4G ו-5G." },
] as const;

const FAQS = [
  { q: "האם mobile-first אומר שהאתר ייראה פחות טוב במחשב?", a: "ממש לא. mobile-first היא שיטת פיתוח, לא מגבלת עיצוב. פריסות המחשב מתוכננות במלואן ולעיתים הן עשירות יותר מבחינה חזותית מהגרסאות למובייל." },
  { q: "באילו מכשירים אתם בודקים?", a: "אנחנו בודקים ב-iPhone עם Safari, ב-Android עם Chrome, ב-iPad ובמגוון דפדפני מחשב, כולל Chrome, Firefox ו-Edge." },
  { q: "ומה לגבי טלפונים ישנים מאוד?", a: "אנחנו מכוונים למכשירים עם iOS 14 ומעלה ו-Android 8 ומעלה, שמכסים יותר מ-95 אחוז ממשתמשי המובייל הפעילים." },
] as const;

export default function MobileFirstHe() {
  useSEO({
    title: "פיתוח אתרים בגישת Mobile-First | DM-Labs.io",
    description: "פיתוח אתרים בגישת mobile-first עם עיצוב רספונסיבי, חוויית מגע נוחה וביצועים מהירים בכל מסך.",
    canonicalPath: "/he/services/mobile-first/",
    ogLocale: "he_IL",
    noindex: true,
  });

  useEffect(() => {
    const schemaId = "service-jsonld-schema";
    const serviceUrl = "https://dm-labs.io/he/services/mobile-first/";
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Service", "@id": `${serviceUrl}#service`, name: "פיתוח אתרים בגישת Mobile-First", description: "פיתוח אתרים רספונסיבי בגישת mobile-first עם חוויית מגע נוחה וביצועים מהירים.", serviceType: "פיתוח אתרים בגישת Mobile-First", url: serviceUrl, provider: { "@id": "https://dm-labs.io/#professionalservice" }, areaServed: [{ "@type": "Country", name: "Cyprus" }, { "@type": "Country", name: "Greece" }] },
        { "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
      ],
    };
    const existing = document.getElementById(schemaId);
    const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    if (!existing) document.head.appendChild(script);
    return () => document.getElementById(schemaId)?.remove();
  }, []);

  return (
    <main className="hebrew-home" dir="rtl">
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 7rem)", paddingBottom: "clamp(3rem, 6vh, 5rem)" }}>
        <div className="absolute inset-0 z-0"><img src={GRADIENT_BG} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" aria-hidden="true" /></div><div className="absolute top-0 left-0 h-[400px] w-[400px] opacity-[0.05] pointer-events-none z-0"><img src={TRIANGLE_GEO} alt="" className="h-full w-full object-contain" aria-hidden="true" /></div><div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full blur-[100px] opacity-[0.07] pointer-events-none z-0" style={{ backgroundColor: ACCENT }} />
        <div className="container relative z-10"><AnimateIn variant="fade-up" delay={0.05}><Link href="/he/services/" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8"><ChevronLeft size={16} />חזרה לשירותים</Link></AnimateIn><div className="max-w-3xl"><AnimateIn variant="fade-up" delay={0.1}><div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `${ACCENT}15` }}><Smartphone size={32} style={{ color: ACCENT }} strokeWidth={1.75} /></div></AnimateIn><AnimateIn variant="fade-up" delay={0.2}><h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-4 leading-tight">פיתוח עם מובייל <span className="whitespace-nowrap">במחשבה תחילה</span></h1></AnimateIn><AnimateIn variant="fade-up" delay={0.3}><p className="text-xl text-[#5B6472] mb-6 leading-relaxed">רוב האנשים יפגשו את האתר שלכם קודם בסמארטפון. לכן הוא צריך להרגיש מצוין בכל מסך.</p></AnimateIn><AnimateIn variant="fade-up" delay={0.4}><p className="text-base text-[#5B6472] leading-relaxed max-w-2xl">גישת mobile-first אינה פיצ׳ר שמוסיפים בסוף, אלא הדרך שבה אנחנו בונים כבר מההתחלה. כל פריסה, כפתור ותמונה מתוכננים קודם למסך קטן ואז משתכללים למסכים גדולים יותר. התוצאה היא אתר שנעים להשתמש בו בטלפון, בטאבלט ובמחשב.</p></AnimateIn></div></div>
      </section>
      <section className="section-spacing bg-white"><div className="container"><AnimateIn className="mb-12"><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">למה זה חשוב</p><h2 className="text-3xl font-bold text-[#111315]">חוויית מובייל שעובדת באמת</h2></AnimateIn><StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">{WHY_IT_MATTERS.map((item, index) => <StaggerItem key={item.heading}><div className="dm-card h-full"><div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ background: `${ACCENT}15` }}><span className="text-sm font-bold" style={{ color: ACCENT }} dir="ltr">{String(index + 1).padStart(2, "0")}</span></div><h3 className="text-lg font-semibold text-[#111315] mb-3">{item.heading}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{item.body}</p></div></StaggerItem>)}</StaggerContainer></div></section>
      <section className="section-spacing relative overflow-hidden"><div className="absolute inset-0 opacity-[0.04] pointer-events-none"><img src={GRADIENT_BG} alt="" className="h-full w-full object-cover" aria-hidden="true" /></div><div className="container relative z-10"><div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><AnimateIn><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">מה מקבלים</p><h2 className="text-3xl font-bold text-[#111315] mb-6">כל מה שנכלל, בלי תוספות נסתרות</h2><p className="text-base text-[#5B6472] leading-relaxed mb-8">כל הפריטים הבאים כלולים בפרויקט האתר שלכם. אין עלויות נסתרות ואין תוספות אופציונליות שאמורות להיות הסטנדרט.</p><Link href="/he/contact/" className="btn-primary"><ArrowLeft size={16} />מתחילים את הפרויקט</Link></AnimateIn><AnimateIn delay={0.2}><ul className="space-y-3">{DELIVERABLES.map((item) => <li key={item} className="flex items-start gap-3"><CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: ACCENT }} /><span className="text-sm text-[#111315] leading-relaxed">{item}</span></li>)}</ul></AnimateIn></div></div></section>
      <section className="section-spacing bg-white"><div className="container"><AnimateIn className="text-center mb-12"><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">התהליך</p><h2 className="text-3xl font-bold text-[#111315] mb-4">כך אנחנו מספקים את השירות</h2></AnimateIn><StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{PROCESS.map((item) => <StaggerItem key={item.step}><div className="text-center"><div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5" style={{ background: `${ACCENT}12` }}><span className="text-sm font-bold" style={{ color: ACCENT }} dir="ltr">{item.step}</span></div><h3 className="text-base font-semibold text-[#111315] mb-2">{item.title}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{item.desc}</p></div></StaggerItem>)}</StaggerContainer></div></section>
      <section className="section-spacing relative overflow-hidden"><div className="absolute inset-0 opacity-[0.04] pointer-events-none"><img src={GRADIENT_BG} alt="" className="h-full w-full object-cover" aria-hidden="true" /></div><div className="container relative z-10 max-w-3xl mx-auto"><AnimateIn className="text-center mb-12"><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">שאלות נפוצות</p><h2 className="text-3xl font-bold text-[#111315]">מה כדאי לדעת</h2></AnimateIn><StaggerContainer className="space-y-4">{FAQS.map((faq) => <StaggerItem key={faq.q}><div className="dm-card"><h3 className="text-base font-semibold text-[#111315] mb-3">{faq.q}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{faq.a}</p></div></StaggerItem>)}</StaggerContainer></div></section>
      <section className="relative overflow-hidden"><div className="absolute inset-0 z-0" style={{ background: "#0F172A" }}><img src={DARK_CTA_BG} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" aria-hidden="true" /></div><div className="container relative z-10 section-spacing text-center"><AnimateIn><p className="text-sm font-medium text-[#6FE3FF] mb-4 tracking-wide">מוכנים להתחיל?</p><h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">נבנה את האתר שלכם עם חוויית מובייל מצוינת כבר מהיום הראשון.</h2><p className="text-base text-[#94A3B8] mb-10 max-w-lg mx-auto">שלחו הודעה ונכיר את הפרויקט שלכם בתוך כמה שעות.</p><div className="flex flex-wrap justify-center gap-4"><Link href="/he/contact/" className="btn-primary !h-14 !text-base !px-8"><MessageCircle size={20} />יצירת קשר</Link><Link href="/he/pricing/" className="inline-flex items-center gap-2 px-8 h-14 rounded-xl border-2 border-white/20 text-white font-semibold hover:border-white/40 transition-all duration-300 text-base">לתמחור <ArrowLeft size={18} /></Link></div></AnimateIn></div></section>
    </main>
  );
}
