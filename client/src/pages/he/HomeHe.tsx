import PackageOverview from "@/components/pricing/PackageOverview";
import HomeIntroductionVideo from "@/components/home/HomeIntroductionVideo";
import "@/components/home/HomePageDark.css";
import { HomeServices, HomeProcess, HomeIndustries } from "@/components/home/HomeOverviewSections";
import TeamProfiles from "@/components/TeamProfiles";
import "./HomeHe.css";
import StarButton from "@/components/ui/star-button";

import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import InteractiveExampleCard from "@/components/InteractiveExampleCard";
import HomeHero from "@/components/home/HomeHero";

const WHATSAPP_HEBREW = "https://wa.me/35797472847?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%9C%D7%A6%D7%95%D7%95%D7%AA%20DM-Labs%21%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%9C%D7%92%D7%91%D7%99%20%D7%90%D7%AA%D7%A8%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%99.";
const DARK_CTA_BG = "/media/brand-refresh/v1/faq-pearl-arcs-desktop.webp";

const examples = [
  ["nomad-coffee", "Nomad Coffee", "מינימליזם אומנותי", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80", "דוגמה לאתר Nomad Coffee"],
  ["bella-salon", "Bella Salon", "אלגנטי ונשי", "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80", "דוגמה לאתר Bella Salon"],
  ["dr-elara-dental", "Dr. Elara Dental", "נקי ומקצועי", "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=80", "דוגמה לאתר Dr. Elara Dental"],
  ["verde-restaurant", "Verde Restaurant", "ים תיכוני ורענן", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", "דוגמה לאתר Verde Restaurant"],
] as const;



export default function HomeHe() {
  useSEO({ title: "סוכנות עיצוב האתרים הטובה ביותר לעסקים בצמיחה | DM Labs", description: "נראות בולטת. אמון. יותר פניות. אתרים בהתאמה אישית, מסירה מהירה וליווי אישי לעסקים בכל מקום.", ogLocale: "he_IL", noindex: true });


  return <div className="hebrew-home hebrew-home-refresh home-page--dark" lang="he" dir="rtl" data-button-surface="dark">
    <HomeHero language="he" />



      <HomeIntroductionVideo language="he" />

    <section id="examples" className="home-examples section-spacing relative overflow-hidden"><div className="container relative z-10"><AnimateIn className="text-center mb-10"><p className="text-sm font-medium text-[#b8bfff] mb-3 tracking-wide">השראה לעיצוב</p><h2 className="text-3xl sm:text-4xl font-bold text-[#edf2ff]">רושם ראשון שפותח דלתות</h2><p className="mt-4 mx-auto max-w-2xl text-lg text-[#bdc9df] leading-relaxed">האתר שלכם מציג את הרמה שלכם עוד לפני השיחה הראשונה. אלו עיצובי קונספט להמחשה. את האתר שלכם נתכנן סביב המותג, הלקוחות והפעולה שתרצו שיעשו.</p></AnimateIn><StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">{examples.map(([id, title, subtitle, imageUrl, imageAlt]) => <StaggerItem key={id}><InteractiveExampleCard title={title} subtitle={subtitle} imageUrl={imageUrl} imageAlt={imageAlt} href={`/preview/${id}/?from=%2Fhe%2F`} actionText="לצפייה בדוגמה" /></StaggerItem>)}</StaggerContainer></div></section>

    <HomeServices language="he" />

    <HomeProcess language="he" />

      <PackageOverview locale="he" />

    <HomeIndustries language="he" />


    <section className="home-team section-spacing"><div className="container"><TeamProfiles language="he" /></div></section>

    <section className="relative overflow-hidden"><div className="absolute inset-0 bg-[#0F172A]"><img src={DARK_CTA_BG} alt="" role="presentation" className="absolute inset-0 h-full w-full object-cover opacity-40" /></div><div className="container relative z-10 section-spacing text-center"><AnimateIn><p className="text-sm font-medium text-[#6FE3FF] mb-4">מוכנים להתחיל?</p><h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">תנו ללקוחות סיבה לבחור בכם</h2><p className="mx-auto mt-6 mb-10 max-w-xl text-lg text-[#94A3B8]">ספרו לנו לאן אתם רוצים לקחת את העסק. נגדיר יחד את האתר, היקף העבודה והצעדים הבאים. אתם בקשר ישיר עם מי שבונה אותו.</p><StarButton asChild><a href={WHATSAPP_HEBREW} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">שיחת ייעוץ ללא עלות</a></StarButton></AnimateIn></div></section>
  </div>;
}
