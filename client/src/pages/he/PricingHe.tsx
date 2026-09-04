import { CheckCircle2, HelpCircle, MessageCircle, ShieldCheck, X } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";

const WA = "https://wa.me/35797472847?text=%D7%A9%D7%9C%D7%95%D7%9D%20DM-Labs.io%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%99%D7%99%D7%A2%D7%95%D7%A5.";

const plans = [
  ["Launch Website", "€299", "#5B8CFF", "נקודת פתיחה מקצועית ומזמינה לעסק בתחילת הדרך.", ["עמוד אחד או שניים קלים", "מותאם למובייל", "יסודות SEO", "WhatsApp ורשתות חברתיות", "2 סבבי תיקונים"]],
  ["Growth Website", "€749", "#8B5CFF", "אתר שעוזר ללקוחות הנכונים למצוא אתכם וליצור קשר בביטחון.", ["עד 4 עמודים", "טופס יצירת קשר", "Google Maps וביקורות", "SEO בסיסי", "Search Console ו-Analytics", "3 סבבי תיקונים"]],
  ["Pro Website", "€1,499", "#6B3FD4", "נוכחות דיגיטלית עשירה יותר, עם תוכן ותשתית חיפוש שמוכנים לצמוח איתכם.", ["עד 7 עמודים", "גלריה או תיק עבודות", "אנימציות Popup וגלילה", "מבנה SEO מלא", "בלוג או חבילת נכסים", "4 סבבי תיקונים"]],
] as const;

const carePlans = [
  ["Basic Care", "€69", "#5B8CFF", ["ניטור רציף של האתר והאירוח", "גיבויים ותיקוני תקלות", "תמיכה ב-WhatsApp", "עד 3 עדכוני תוכן קטנים בחודש"]],
  ["Complete Care", "€129", "#8B5CFF", ["כל מה שבתוכנית Basic Care", "עדכונים סבירים ללא הגבלה", "תמיכת WhatsApp בעדיפות", "בדיקת ביצועים חודשית", "עדכון באנר או אזור פשוט בחודש"]],
] as const;

const rows = [
  ["עמודים", "1 או 2 קלים", "עד 4", "עד 7"],
  ["מותאם למובייל", "✓", "✓", "✓"],
  ["WhatsApp ורשתות חברתיות", "✓", "✓", "✓"],
  ["יסודות SEO", "✓", "✓", "✓"],
  ["טופס יצירת קשר", "—", "✓", "✓"],
  ["Google Maps", "—", "✓", "✓"],
  ["גלריה או תיק עבודות", "—", "—", "✓"],
  ["אנימציות גלילה", "—", "—", "✓"],
  ["סבבי תיקונים", "2", "3", "4"],
] as const;

function PlanCell({ value, colour }: { value: string; colour: string }) {
  if (value === "✓") return <CheckCircle2 size={18} className="mx-auto" style={{ color: colour }} />;
  if (value === "—") return <X size={18} className="text-[#D1D5DB] mx-auto" />;
  return <span className="text-sm text-[#5B6472]">{value}</span>;
}

export default function PricingHe() {
  useSEO({
    title: "מחירי עיצוב אתרים | DM-Labs.io",
    description: "כמה עולה אתר? השוו חבילות אתר ותוכניות תחזוקה שקופות של DM-Labs.io, החל מ-€299.",
    ogLocale: "he_IL",
    noindex: true,
  });

  return (
    <main className="hebrew-home pricing-editorial" dir="rtl">
      <section className="pricing-editorial-hero relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="pricing-editorial-label">מחירים שקופים</p>
            <h1 className="pricing-editorial-hero-heading">מחירי <span><em>עיצוב אתרים</em></span></h1>
            <p className="pricing-editorial-hero-lead">כמה עולה אתר? השוו חבילות ברורות ומצאו יחד איתנו את נקודת הפתיחה הנכונה לעסק שלכם.</p>
          </AnimateIn>
        </div>
      </section>

      <section className="pricing-editorial-assurance bg-[#EEF3FF] border-y border-[#5B8CFF]/20 py-4">
        <div className="container text-center"><p>כל פרויקט מתחיל בשיחת ייעוץ ללא עלות, כדי להתאים את ההיקף הנכון עוד לפני שמתחילים.</p></div>
      </section>

      <section className="pricing-editorial-plans section-spacing bg-white">
        <div className="container">
          <AnimateIn className="pricing-editorial-section-intro text-center">
            <p className="pricing-editorial-label">בחרו היקף</p>
            <h2 className="pricing-editorial-section-heading">שלוש חבילות ברורות.</h2>
            <p>כל חבילה נותנת בסיס מדויק, בלי מורכבות מיותרת.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map(([name, price, color, summary, features], index) => (
              <AnimateIn key={name} delay={index * .1}>
                <article className={`pricing-editorial-plan-card dm-card h-full flex flex-col relative${index === 1 ? " pricing-editorial-plan-card--recommended" : ""}`}>
                  {index === 1 && <span className="pricing-editorial-recommended">מומלץ</span>}
                  <p className="pricing-editorial-plan-label" style={{ color }} dir="ltr">{name}</p>
                  <div className="pricing-editorial-price-row">
                    <span className="pricing-editorial-plan-price" dir="ltr">{price}</span>
                    <span className="pricing-editorial-price-unit" dir="ltr">one-time</span>
                  </div>
                  <p className="pricing-editorial-plan-summary">{summary}</p>
                  <ul className="pricing-editorial-feature-list flex-1">
                    {features.map(feature => <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={16} style={{ color }} className="shrink-0 mt-0.5" />{feature}</li>)}
                  </ul>
                  <a className={`${index === 1 ? "btn-primary" : "btn-secondary"} pricing-editorial-card-cta w-full justify-center`} href={WA}>שיחת ייעוץ ללא עלות</a>
                </article>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn className="mt-8 max-w-5xl mx-auto">
            <div className="pricing-editorial-custom-panel rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8">
                <div className="flex-shrink-0 lg:w-72">
                  <span className="pricing-editorial-custom-kicker">נבנה לפי ההיקף שלכם</span>
                  <p className="pricing-editorial-plan-label" dir="ltr">Enterprise / Custom</p>
                  <p className="pricing-editorial-custom-price" dir="ltr">מחיר מותאם להיקף הפרויקט</p>
                  <p className="pricing-editorial-custom-note">הצעת מחיר לפי היקף</p>
                  <p className="pricing-editorial-custom-copy">לאינטגרציות, אתרים רב לשוניים, CMS, AI, צ׳אטבוטים, CRM, הזמנות, אנימציות מורכבות או נפח תוכן חריג.</p>
                  <a className="pricing-editorial-custom-cta" href={WA}><MessageCircle size={16} />בקשת הצעת מחיר</a>
                </div>
                <StaggerContainer className="pricing-editorial-custom-grid flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4" staggerDelay={0.09}>
                  {["אינטגרציות מותאמות, CRM או הזמנות", "אתר רב לשוני ו-CMS לעריכה עצמית", "יכולות AI או צ׳אטבוט", "אנימציות מורכבות או היקף תוכן חריג"].map(item => <StaggerItem key={item} className="pricing-editorial-custom-feature flex items-start gap-2.5"><CheckCircle2 size={16} className="shrink-0 mt-0.5" /><span>{item}</span></StaggerItem>)}
                </StaggerContainer>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="pricing-editorial-care section-spacing bg-white">
        <div className="container max-w-4xl">
          <AnimateIn className="pricing-editorial-section-intro text-center">
            <p className="pricing-editorial-label">שומרים על האתר בריא</p>
            <h2 className="pricing-editorial-section-heading">תוכניות <em>תחזוקה</em></h2>
            <p>שקט נפשי למי שרוצה אתר מנוטר, מעודכן ונתמך גם אחרי ההשקה.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {carePlans.map(([name, price, color, features], index) => (
              <article key={name} className={`pricing-editorial-care-card dm-card h-full flex flex-col relative${index === 1 ? " pricing-editorial-plan-card--recommended" : ""}`}>
                {index === 1 && <span className="pricing-editorial-recommended">המקיפה ביותר</span>}
                <p className="pricing-editorial-plan-label" style={{ color }} dir="ltr">{name}</p>
                <div className="pricing-editorial-price-row">
                  <span className="pricing-editorial-care-price" dir="ltr">{price}</span>
                  <span className="pricing-editorial-price-unit" dir="ltr">per month</span>
                </div>
                <ul className="pricing-editorial-feature-list">
                  {features.map(feature => <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={15} style={{ color }} className="shrink-0 mt-0.5" />{feature}</li>)}
                </ul>
                <a className={`${index === 1 ? "btn-primary" : "btn-secondary"} pricing-editorial-card-cta w-full justify-center`} href={WA}>שאלו על {name}</a>
              </article>
            ))}
          </div>
          <div className="pricing-editorial-scope-guardrail flex gap-3 rounded-xl px-5 py-4 mt-8"><ShieldCheck size={19} className="text-[#5B8CFF] shrink-0" /><p><strong>הבהרת היקף:</strong> עמודים חדשים, כתיבה, סבבי תיקונים נוספים, אינטגרציות, עיצוב מחדש, SEO מתקדם והעברת תוכן מורכבת מתומחרים בנפרד.</p></div>
        </div>
      </section>

      <section className="pricing-editorial-compare section-spacing">
        <div className="container">
          <AnimateIn className="pricing-editorial-section-intro text-center"><p className="pricing-editorial-label">הפרטים</p><h2 className="pricing-editorial-section-heading">השוואת <em>חבילות</em></h2></AnimateIn>
          <div className="overflow-x-auto rounded-2xl border border-[#E8EAF0] max-w-4xl mx-auto">
            <table className="text-sm" style={{ minWidth: 560, width: "100%" }}><thead><tr className="border-b border-[#E8EAF0]"><th className="text-right py-4 px-4 font-semibold text-[#111315]">תכונה</th><th className="py-4 px-4 font-semibold text-[#5B8CFF] text-center" dir="ltr">Launch<br /><span className="font-normal text-xs text-[#5B6472]">€299</span></th><th className="py-4 px-4 font-semibold text-[#8B5CFF] text-center bg-[#8B5CFF]/[0.03]" dir="ltr">Growth<br /><span className="font-normal text-xs text-[#5B6472]">€749</span></th><th className="py-4 px-4 font-semibold text-center" style={{ color: "#6B3FD4" }} dir="ltr">Pro<br /><span className="font-normal text-xs text-[#5B6472]">€1,499</span></th></tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={row[0]} className={rowIndex % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}><td className="py-3.5 px-4 text-[#111315] font-medium">{row[0]}</td><td className="py-3.5 px-4 text-center"><PlanCell value={row[1]} colour="#5B8CFF" /></td><td className="py-3.5 px-4 text-center bg-[#8B5CFF]/[0.03]"><PlanCell value={row[2]} colour="#8B5CFF" /></td><td className="py-3.5 px-4 text-center"><PlanCell value={row[3]} colour="#6B3FD4" /></td></tr>)}</tbody></table>
          </div>
        </div>
      </section>

      <section className="pricing-editorial-questions section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn className="pricing-editorial-section-intro text-center"><p className="pricing-editorial-label">טוב לדעת</p><h2 className="pricing-editorial-section-heading">שאלות <em>נפוצות</em></h2></AnimateIn>
          {[["אפשר לראות תצוגה לפני תשלום?", "כן. אנחנו משתפים כיוון עיצובי לאישור לפני שהפיתוח מתקדם."], ["אפשר לשדרג בהמשך?", "כן. נוכל לתמחר היקף נוסף אם תצטרכו עוד עמודים או תכונות."], ["יש עלויות נסתרות?", "לא. מסכימים על ההיקף והמחיר מראש."], ["האם האתר שייך לי?", "כן. אחרי התשלום, האתר והתוכן שלו שייכים לכם."]].map(([question, answer]) => <article key={question} className="dm-card !p-6 mb-4 flex gap-3"><HelpCircle size={20} className="text-[#5B8CFF] shrink-0" /><div><h3>{question}</h3><p>{answer}</p></div></article>)}
        </div>
      </section>

      <section className="pricing-editorial-cta-section section-spacing"><div className="container max-w-3xl text-center"><h2 className="pricing-editorial-cta-heading">לא בטוחים איזו <em>חבילה</em> מתאימה?</h2><p>שתפו אותנו במה שהעסק שלכם צריך, ונמצא יחד את נקודת ההתחלה המדויקת ביותר.</p><a className="btn-primary" href={WA}><MessageCircle size={18} />קובעים שיחה ללא עלות</a></div></section>
    </main>
  );
}
