import { HomeServices, HomeProcess, HomeIndustries } from "@/components/home/HomeOverviewSections";
import TeamProfiles from "@/components/TeamProfiles";
import "./HomeHe.css";
import StarButton from "@/components/ui/star-button";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import InteractiveExampleCard from "@/components/InteractiveExampleCard";
import HomeHeroScrub from "@/components/HomeHeroScrub";

const WHATSAPP_HEBREW = "https://wa.me/35797472847?text=%D7%A9%D7%9C%D7%95%D7%9D%20DM-Labs.io%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%9C%D7%92%D7%91%D7%99%20%D7%90%D7%AA%D7%A8%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%99.";
const GRADIENT_BG = "/media/cloudfront/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const DARK_CTA_BG = "/media/cloudfront/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";

const examples = [
  ["nomad-coffee", "Nomad Coffee", "מינימליזם אומנותי", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80", "דוגמה לאתר Nomad Coffee"],
  ["bella-salon", "Bella Salon", "אלגנטי ונשי", "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80", "דוגמה לאתר Bella Salon"],
  ["dr-elara-dental", "Dr. Elara Dental", "נקי ומקצועי", "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=80", "דוגמה לאתר Dr. Elara Dental"],
  ["verde-restaurant", "Verde Restaurant", "ים תיכוני ורענן", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", "דוגמה לאתר Verde Restaurant"],
] as const;

const pricing = [
  ["Launch Website", "€299", "מתאים לעסק חדש שצריך נוכחות דיגיטלית נקייה ומקצועית במהירות.", ["עמוד עסקי ממותג", "מותאם למובייל", "כפתור WhatsApp", "קישורים לרשתות חברתיות", "וידג׳ט נגישות", "2 סבבי תיקונים", "מסירה בתוך 5 עד 7 ימים"]],
  ["Growth Website", "€749", "לעסק מבוסס שזקוק לאתר שלם יותר וממוקד המרות.", ["עד 5 עמודים", "מותאם למובייל", "WhatsApp ורשתות חברתיות", "טופס יצירת קשר והזמנות", "Google Maps", "SEO בסיסי", "אופטימיזציית מהירות", "3 סבבי תיקונים", "מסירה בתוך 7 עד 10 ימים"]],
  ["Pro Website", "€1,499", "לעסק שרוצה אתר מותאם אישית, עשיר בפונקציונליות ובנוי לצמיחה.", ["עד 7 עמודים", "עיצוב מותאם אישית ואנימציות", "טופס יצירת קשר והזמנות", "גלריה ותוכן", "מבנה SEO מלא", "4 סבבי תיקונים", "מסירה בתוך 10 עד 14 ימים"]],
] as const;

export default function HomeHe() {
  useSEO({ title: "סוכנות עיצוב האתרים הטובה ביותר לעסקים בצמיחה | DM Labs", description: "נראות בולטת. אמון. יותר פניות. אתרים בהתאמה אישית, מסירה מהירה וליווי אישי לעסקים בכל מקום.", ogLocale: "he_IL", noindex: true });
  useEffect(() => {
    const id = "hebrew-home-webpage-schema";
    const script = document.createElement("script");
    script.id = id; script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "@id": "https://dm-labs.io/he/#webpage", url: "https://dm-labs.io/he/", name: "סוכנות עיצוב האתרים הטובה ביותר לעסקים בצמיחה | DM Labs", inLanguage: "he", isPartOf: { "@id": "https://dm-labs.io/#website" } });
    document.head.appendChild(script); return () => document.getElementById(id)?.remove();
  }, []);

  return <div className="hebrew-home hebrew-home-refresh" lang="he" dir="rtl">
    <HomeHeroScrub variant="hebrew">
      <div className="text-center">
        <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-[#5B8CFF]">אתרים מדויקים לעסקים עם שאיפות</p>
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#111315] leading-[1.1]">בונים לכם אתר שיביא יותר לקוחות</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#5B6472]">שדרו הצלחה. בנו אמון. הפכו את הפנייה הבאה לפשוטה. אנחנו בונים אתרים מרשימים ומהירים ומטפלים בפרטים הטכניים, כדי שתוכלו להתמקד בעסק. בכל מקום שבו העסק שלכם פועל.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><StarButton asChild><a href={WHATSAPP_HEBREW} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">שיחת ייעוץ ללא עלות </a></StarButton><a href="#examples" className="btn-secondary inline-flex items-center gap-2">דוגמאות לעבודה <ArrowLeft size={18} /></a></div>
      </div>
    </HomeHeroScrub>

    <section className="bg-white border-y border-[#E2E5EA]"><div className="container py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">{["עיצוב שבונה אמון", "מסירה בתוך ימים", "מותאם למובייל", "מוכן ל-SEO", "קשר ישיר עם טום ואנסטסיה"].map(item => <span key={item} className="flex items-center gap-2 text-sm font-medium text-[#5B6472]">{item}</span>)}</div></section>

    <section id="examples" className="section-spacing relative overflow-hidden"><div className="absolute inset-0 opacity-[0.04] pointer-events-none"><img src={GRADIENT_BG} alt="" role="presentation" className="h-full w-full object-cover" /></div><div className="container relative z-10"><AnimateIn className="text-center mb-10"><p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide">השראה לעיצוב</p><h2 className="text-3xl sm:text-4xl font-bold text-[#111315]">רושם ראשון שפותח דלתות</h2><p className="mt-4 mx-auto max-w-2xl text-lg text-[#5B6472] leading-relaxed">האתר שלכם מציג את הרמה שלכם עוד לפני השיחה הראשונה. אלו עיצובי קונספט להמחשה. את האתר שלכם נתכנן סביב המותג, הלקוחות והפעולה שתרצו שיעשו.</p></AnimateIn><StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">{examples.map(([id, title, subtitle, imageUrl, imageAlt]) => <StaggerItem key={id}><InteractiveExampleCard title={title} subtitle={subtitle} imageUrl={imageUrl} imageAlt={imageAlt} href={`/preview/${id}/?from=%2Fhe%2F`} actionText="לצפייה בדוגמה" /></StaggerItem>)}</StaggerContainer></div></section>

    <HomeServices language="he" />

    <HomeProcess language="he" />

    <section id="pricing" className="section-spacing relative overflow-hidden"><div className="absolute inset-0 opacity-[0.03] pointer-events-none"><img src={GRADIENT_BG} alt="" role="presentation" className="h-full w-full object-cover" /></div><div className="container relative z-10"><AnimateIn className="text-center mb-12"><p className="text-sm font-medium text-[#8B7355] mb-3">תמחור שקוף</p><h2 className="text-3xl sm:text-4xl font-bold text-[#111315]">השקעה בשלב הבא של העסק</h2><p className="mt-4 text-lg text-[#5B6472]">בוחרים את היקף האתר ואת תוכנית האירוח והתחזוקה. כל מה שכלול ברור מראש.</p></AnimateIn><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">{pricing.map(([name, price, intro, features], index) => <AnimateIn key={name}><article className={index === 1 ? "brand-gradient-border h-full" : "h-full"}><div className="dm-card h-full flex flex-col"><p className="text-sm font-semibold text-[#5B8CFF] tracking-wide mb-2" dir="ltr">{name}</p><p className="text-4xl font-bold text-[#111315]" dir="ltr">{price}</p><p className="text-sm text-[#5B6472]">תשלום חד פעמי</p><p className="text-sm text-[#5B6472] my-6">{intro}</p><ul className="space-y-3 flex-1">{features.map(feature => <li key={feature} className="flex gap-2 text-sm text-[#111315]">{feature}</li>)}</ul><StarButton asChild><a href={WHATSAPP_HEBREW} target="_blank" rel="noopener noreferrer" className="btn-primary mt-7 w-full justify-center">שיחת ייעוץ ללא עלות</a></StarButton></div></article></AnimateIn>)}</div><AnimateIn className="mt-8 max-w-5xl mx-auto"><div className="rounded-2xl p-8 bg-[#0F172A] text-white flex flex-col lg:flex-row gap-8 items-start"><div className="lg:w-72 lg:order-2"><span className="text-xs px-3 py-1 rounded-full bg-[#5B8CFF]">מותאם במיוחד לכם</span><p className="mt-4 font-semibold" dir="ltr">Enterprise / Custom</p><p className="text-3xl font-bold mt-1 enterprise-scope-title" dir="rtl">מחיר מותאם להיקף הפרויקט</p><p className="text-sm text-white/65 mt-3">לארגונים ולעסקים שזקוקים לפתרון שנבנה סביב היעדים שלהם.</p></div><div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">{[{ label: "עיצוב מלא מהיסוד" }, { label: "עמודים ללא הגבלה" }, { label: "CRM והזמנות" }, { label: "תמיכה רב לשונית" }, { label: "מנהל פרויקט" }, { label: "תמיכה בעדיפות" }, { label: "ליווי מתמשך" }, { label: "אסטרטגיית SEO" }].map(({ label }) => <span key={label} className="flex gap-2 text-sm text-white/80">{label}</span>)}</div></div></AnimateIn></div></section>

    <HomeIndustries language="he" />

    <section className="relative overflow-hidden py-16 sm:py-20 bg-[#0F172A]"><div className="container"><StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">{[["5-14","ימים עד להשקה","מהשיחה הראשונה"],["5★","שביעות רצון","הסטנדרט שלנו"],["100%","מותאם למובייל","בכל פרויקט"],["∞","ליווי מתמשך","אנחנו כאן בשבילכם"]].map(([value,label,sub]) => <StaggerItem key={label}><div className="text-center"><p className="text-4xl sm:text-5xl font-bold text-[#6FE3FF]" dir="ltr">{value}</p><p className="text-base font-semibold text-white mt-2">{label}</p><p className="text-xs text-[#94A3B8]">{sub}</p></div></StaggerItem>)}</StaggerContainer></div></section>

    <TeamProfiles language="he" />

    <section className="relative overflow-hidden"><div className="absolute inset-0 bg-[#0F172A]"><img src={DARK_CTA_BG} alt="" role="presentation" className="absolute inset-0 h-full w-full object-cover opacity-40" /></div><div className="container relative z-10 section-spacing text-center"><AnimateIn><p className="text-sm font-medium text-[#6FE3FF] mb-4">מוכנים להתחיל?</p><h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">תנו ללקוחות סיבה לבחור בכם</h2><p className="mx-auto mt-6 mb-10 max-w-xl text-lg text-[#94A3B8]">ספרו לנו לאן אתם רוצים לקחת את העסק. נגדיר יחד את האתר, היקף העבודה והצעדים הבאים. אתם בקשר ישיר עם מי שבונה אותו.</p><StarButton asChild><a href={WHATSAPP_HEBREW} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">שיחת ייעוץ ללא עלות</a></StarButton></AnimateIn></div></section>
  </div>;
}
