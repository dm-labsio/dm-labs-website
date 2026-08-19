import { Link } from "wouter";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { ArrowLeft, CheckCircle2, ChevronLeft, Globe, MessageCircle } from "lucide-react";

const GRADIENT_BG = "/media/cloudfront/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const TRIANGLE_GEO = "/media/cloudfront/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "/media/cloudfront/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";
const ACCENT = "#5B8CFF";

const WHY_IT_MATTERS = [
  {
    heading: "הרושם הראשון קובע",
    body: "מבקרים מגבשים דעה על העסק שלכם בתוך 50 אלפיות השנייה מרגע הנחיתה באתר. עיצוב גנרי משדר חוסר תשומת לב לפרטים. עיצוב מותאם אישית משדר מקצועיות, אמון והקפדה על איכות.",
  },
  {
    heading: "המותג שלכם, לא שלנו",
    body: "אנחנו לומדים את הלוגו, הצבעים, טון הדיבור והמתחרים שלכם עוד לפני כתיבת שורת קוד אחת. התוצאה היא אתר שמרגיש כמו הרחבה של העסק שלכם, לא אתר שיכול להשתייך לכל אחד.",
  },
  {
    heading: "מעוצב כדי להמיר",
    body: "עיצוב יפה הוא רק חצי מהעבודה. אנחנו בונים כל עמוד מתוך מחשבה על המרות, עם הנעות ברורות לפעולה, היררכיית מידע הגיונית ומסלולים פשוטים ליצירת קשר או לרכישה.",
  },
] as const;

const DELIVERABLES = [
  "זהות חזותית מותאמת אישית בכל עמוד",
  "פריסה ייחודית שנבנית סביב התוכן שלכם",
  "פלטת צבעים, טיפוגרפיה ואיקונים שמתאימים למותג",
  "אזורי פתיחה, כרטיסי שירותים, המלצות והנעות לפעולה",
  "שילוב של איורים מותאמים או צילומים",
  "שפת עיצוב עקבית במחשב ובמובייל",
  "2 סבבי תיקונים ב-Launch, 3 ב-Growth ו-4 ב-Pro",
] as const;

const PROCESS = [
  { step: "01", title: "היכרות", desc: "אנחנו מתחילים בשיחה קצרה כדי להבין את העסק, הקהל ומה תרצו שהמבקרים יעשו באתר." },
  { step: "02", title: "Moodboard וכיוון", desc: "נציג לכם כיוון חזותי עם פלטת צבעים, טיפוגרפיה וסגנון פריסה לאישור לפני כתיבת קוד." },
  { step: "03", title: "עיצוב ובנייה", desc: "אנחנו מעצבים ומפתחים במקביל, כך שתראו אתר אמיתי שעובד, לא מוקאפ סטטי." },
  { step: "04", title: "סקירה וליטוש", desc: "אתם סוקרים את האתר ומבקשים שינויים. אנחנו משפרים עד שתהיו מרוצים ואז עולים לאוויר." },
] as const;

const FAQS = [
  { q: "האם אתם משתמשים ב-Wix, Squarespace או בוני אתרים?", a: "לא. אנחנו כותבים קוד נקי שנבנה בעבודת יד באמצעות React וטכנולוגיות ווב מודרניות. כך מקבלים ביצועים טובים יותר, גמישות רבה יותר וללא תלות בפלטפורמה." },
  { q: "אפשר לספק עיצוב או מיתוג משלי?", a: "בהחלט. אם יש לכם מדריך מותג, לוגו או העדפות עיצוב, נעבוד לפי ההנחיות האלה. אם עדיין אין לכם, נעזור לפתח זהות חזותית מתאימה." },
  { q: "כמה עמודים כלולים?", a: "חבילת Launch כוללת עמוד עסקי ממותג. Growth כוללת עד 4 עמודים ו-Pro כוללת עד 7 עמודים. אפשר להוסיף עמודים נוספים בתוספת קטנה." },
  { q: "מה קורה אם ארצה שינויים לאחר ההשקה?", a: "עדכונים קטנים כלולים בתוכניות התחזוקה שלנו. עיצובים מחדש בהיקף גדול מתומחרים בנפרד." },
] as const;

export default function CustomDesignHe() {
  useSEO({
    title: "עיצוב אתרים בהתאמה אישית | DM-Labs.io",
    description: "עיצוב אתרים בהתאמה אישית לעסקים, עם זהות מותג ברורה, חוויית משתמש ממוקדת המרות וביצועים מודרניים.",
    canonicalPath: "/he/services/custom-design/",
    ogLocale: "he_IL",
    noindex: true,
  });

  useEffect(() => {
    const schemaId = "service-jsonld-schema";
    const serviceUrl = "https://dm-labs.io/he/services/custom-design/";
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${serviceUrl}#service`,
          name: "עיצוב אתרים בהתאמה אישית",
          description: "עיצוב אתרים מותאם אישית עם זהות מותג ברורה וחוויית משתמש ממוקדת המרות.",
          serviceType: "עיצוב אתרים בהתאמה אישית",
          url: serviceUrl,
          provider: { "@id": "https://dm-labs.io/#professionalservice" },
          areaServed: [
            { "@type": "Country", name: "Cyprus" },
            { "@type": "Country", name: "Greece" },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        },
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
        <div className="absolute inset-0 z-0"><img src={GRADIENT_BG} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" aria-hidden="true" /></div>
        <div className="absolute top-0 left-0 h-[400px] w-[400px] opacity-[0.05] pointer-events-none z-0"><img src={TRIANGLE_GEO} alt="" className="h-full w-full object-contain" aria-hidden="true" /></div>
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full blur-[100px] opacity-[0.07] pointer-events-none z-0" style={{ backgroundColor: ACCENT }} />
        <div className="container relative z-10">
          <AnimateIn variant="fade-up" delay={0.05}><Link href="/he/services/" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8"><ChevronLeft size={16} />חזרה לשירותים</Link></AnimateIn>
          <div className="max-w-3xl">
            <AnimateIn variant="fade-up" delay={0.1}><div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `${ACCENT}15` }}><Globe size={32} style={{ color: ACCENT }} strokeWidth={1.75} /></div></AnimateIn>
            <AnimateIn variant="fade-up" delay={0.2}><h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-4 leading-tight">עיצוב אתרים בהתאמה אישית</h1></AnimateIn>
            <AnimateIn variant="fade-up" delay={0.3}><p className="text-xl text-[#5B6472] mb-6 leading-relaxed">אתר שנראה ומרגיש כמו המותג שלכם, לא כמו עיצוב גנרי.</p></AnimateIn>
            <AnimateIn variant="fade-up" delay={0.4}><p className="text-base text-[#5B6472] leading-relaxed max-w-2xl">כל עסק שונה, וגם האתר שלו צריך לשקף זאת. אנחנו מעצבים כל אתר מהיסוד, החל מזהות המותג, הקהל והיעדים שלכם. בלי בוני עמודים ובלי פריסות ממוחזרות, רק נוכחות דיגיטלית מדויקת שנבנית במיוחד עבורכם.</p></AnimateIn>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white"><div className="container"><AnimateIn className="mb-12"><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">למה זה חשוב</p><h2 className="text-3xl font-bold text-[#111315]">הגישה שלנו לעיצוב מדויק</h2></AnimateIn><StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">{WHY_IT_MATTERS.map((item, index) => <StaggerItem key={item.heading}><div className="dm-card h-full"><div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ background: `${ACCENT}15` }}><span className="text-sm font-bold" style={{ color: ACCENT }} dir="ltr">{String(index + 1).padStart(2, "0")}</span></div><h3 className="text-lg font-semibold text-[#111315] mb-3">{item.heading}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{item.body}</p></div></StaggerItem>)}</StaggerContainer></div></section>

      <section className="section-spacing relative overflow-hidden"><div className="absolute inset-0 opacity-[0.04] pointer-events-none"><img src={GRADIENT_BG} alt="" className="h-full w-full object-cover" aria-hidden="true" /></div><div className="container relative z-10"><div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><AnimateIn><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">מה מקבלים</p><h2 className="text-3xl font-bold text-[#111315] mb-6">כל מה שנכלל, בלי תוספות נסתרות</h2><p className="text-base text-[#5B6472] leading-relaxed mb-8">כל הפריטים הבאים כלולים בפרויקט האתר שלכם. אין עלויות נסתרות ואין תוספות אופציונליות שאמורות להיות הסטנדרט.</p><Link href="/he/contact/" className="btn-primary"><ArrowLeft size={16} />מתחילים את הפרויקט</Link></AnimateIn><AnimateIn delay={0.2}><ul className="space-y-3">{DELIVERABLES.map((item) => <li key={item} className="flex items-start gap-3"><CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: ACCENT }} /><span className="text-sm text-[#111315] leading-relaxed">{item}</span></li>)}</ul></AnimateIn></div></div></section>

      <section className="section-spacing bg-white"><div className="container"><AnimateIn className="text-center mb-12"><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">התהליך</p><h2 className="text-3xl font-bold text-[#111315] mb-4">כך נבנה את האתר יחד</h2></AnimateIn><StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{PROCESS.map((item) => <StaggerItem key={item.step}><div className="text-center"><div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5" style={{ background: `${ACCENT}12` }}><span className="text-sm font-bold" style={{ color: ACCENT }} dir="ltr">{item.step}</span></div><h3 className="text-base font-semibold text-[#111315] mb-2">{item.title}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{item.desc}</p></div></StaggerItem>)}</StaggerContainer></div></section>

      <section className="section-spacing relative overflow-hidden"><div className="absolute inset-0 opacity-[0.04] pointer-events-none"><img src={GRADIENT_BG} alt="" className="h-full w-full object-cover" aria-hidden="true" /></div><div className="container relative z-10 max-w-3xl mx-auto"><AnimateIn className="text-center mb-12"><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">שאלות נפוצות</p><h2 className="text-3xl font-bold text-[#111315]">שקיפות מלאה, מההתחלה</h2></AnimateIn><StaggerContainer className="space-y-4">{FAQS.map((faq) => <StaggerItem key={faq.q}><div className="dm-card"><h3 className="text-base font-semibold text-[#111315] mb-3">{faq.q}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{faq.a}</p></div></StaggerItem>)}</StaggerContainer></div></section>

      <section className="relative overflow-hidden"><div className="absolute inset-0 z-0" style={{ background: "#0F172A" }}><img src={DARK_CTA_BG} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" aria-hidden="true" /></div><div className="container relative z-10 section-spacing text-center"><AnimateIn><p className="text-sm font-medium text-[#6FE3FF] mb-4 tracking-wide">מוכנים להתחיל?</p><h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">נבנה את האתר שלכם עם עיצוב מותאם אישית כבר מהיום הראשון.</h2><p className="text-base text-[#94A3B8] mb-10 max-w-lg mx-auto">שלחו הודעה ונכיר את הפרויקט שלכם בתוך כמה שעות.</p><div className="flex flex-wrap justify-center gap-4"><Link href="/he/contact/" className="btn-primary !h-14 !text-base !px-8"><MessageCircle size={20} />יצירת קשר</Link><Link href="/he/pricing/" className="inline-flex items-center gap-2 px-8 h-14 rounded-xl border-2 border-white/20 text-white font-semibold hover:border-white/40 transition-all duration-300 text-base">לתמחור <ArrowLeft size={18} /></Link></div></AnimateIn></div></section>
    </main>
  );
}
