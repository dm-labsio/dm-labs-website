import { useEffect } from "react";
import { CheckCircle2, Globe, MessageCircle, Search, Shield, Smartphone, Sparkles, Zap } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const WHATSAPP_HEBREW = "https://wa.me/35797472847?text=%D7%A9%D7%9C%D7%95%D7%9D%20DM-Labs.io%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%9C%D7%92%D7%91%D7%99%20%D7%90%D7%AA%D7%A8%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%99.";

const services = [
  { icon: Globe, title: "עיצוב אתרים בהתאמה אישית", body: "אתר שמרגיש כמו המותג שלכם, ונבנה מהיסוד סביב היעדים והקהל שלכם." },
  { icon: Smartphone, title: "פיתוח שמתחיל במובייל", body: "חוויה מהירה, ברורה ונוחה בכל מסך, מהטלפון ועד למחשב." },
  { icon: Search, title: "תשתית SEO", body: "מבנה נכון למנועי חיפוש כדי שהלקוחות המתאימים יוכלו למצוא אתכם בגוגל." },
  { icon: Zap, title: "ביצועים מהירים", body: "קוד ונכסים מותאמים למהירות, כי ביצועים טובים משפיעים על אמון והמרות." },
  { icon: Shield, title: "אבטחה ואמינות", body: "SSL, אירוח מאובטח וגיבויים שוטפים כדי שהאתר שלכם יישאר זמין ומוגן." },
  { icon: Sparkles, title: "תהליך ברור", body: "תהליך ממוקד ומסודר, משיחת ההיכרות ועד להשקה." },
];

const process = [
  ["01", "שיחת היכרות", "נבין את העסק, היעדים והקהל שלכם."],
  ["02", "כיוון עיצובי", "נבנה שפה חזותית ברורה שמתאימה למותג."],
  ["03", "פיתוח", "נהפוך את העיצוב לאתר מהיר, נגיש ומוכן לחיפוש."],
  ["04", "דיוקים", "נחדד את הפרטים לפי המשוב שלכם."],
  ["05", "השקה", "נחבר את הדומיין ונבדוק שהכול עובד כמו שצריך."],
];

export default function HomeHe() {
  useSEO({
    title: "DM-Labs.io | עיצוב אתרים מקצועי לעסקים",
    description: "DM-Labs.io בונה אתרים מקצועיים, מהירים ומותאמים למובייל לעסקים. תהליך ברור, תשתית SEO וחבילות החל מ-€299.",
    ogLocale: "he_IL",
    noindex: true,
  });

  useEffect(() => {
    const id = "hebrew-home-webpage-schema";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://dm-labs.io/he/#webpage",
      url: "https://dm-labs.io/he/",
      name: "DM-Labs.io | עיצוב אתרים מקצועי לעסקים",
      inLanguage: "he",
      isPartOf: { "@id": "https://dm-labs.io/#website" },
    });
    document.head.appendChild(script);
    return () => document.getElementById(id)?.remove();
  }, []);

  return (
    <div className="hebrew-home" dir="rtl">
      <section className="relative overflow-hidden bg-[#F8FAFF] px-4 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className="absolute inset-0 opacity-50" aria-hidden="true" style={{ background: "radial-gradient(circle at 70% 20%, rgba(111,227,255,.25), transparent 34%), radial-gradient(circle at 25% 85%, rgba(139,92,255,.18), transparent 38%)" }} />
        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-5 text-sm font-semibold tracking-[0.18em] text-[#5B8CFF]">פתרונות דיגיטליים לעסקים</p>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.08] text-[#111315] sm:text-6xl lg:text-7xl">
            העסק שלכם מצוין.<br />האתר שלכם צריך להראות את זה.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[#5B6472] sm:text-xl">
            אנחנו בונים אתרים מקצועיים, מהירים ומוכווני המרות לעסקים שרוצים להיראות טוב, להיות קלים למציאה ולגדול בביטחון. החבילות מתחילות ב-€299.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href={WHATSAPP_HEBREW} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              שיחת ייעוץ ללא עלות <MessageCircle size={18} />
            </a>
            <a href="#services" className="inline-flex items-center justify-center rounded-xl border border-[#5B8CFF] px-6 py-3 text-sm font-semibold text-[#315CD4] transition-colors hover:bg-[#EEF3FF]">
              מה אנחנו עושים
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E2E5EA] bg-white">
        <div className="container mx-auto flex flex-wrap justify-center gap-x-9 gap-y-3 px-4 py-6 text-sm font-medium text-[#4E5968]">
          {["תמחור ברור", "מותאם למובייל", "תשתית SEO", "צוות אירופי", "תהליך מסודר"].map((item) => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-[#5B8CFF]" />{item}</span>)}
        </div>
      </section>

      <section id="services" className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-[#5B8CFF]">השירותים שלנו</p>
            <h2 className="text-3xl font-extrabold text-[#111315] sm:text-5xl">כל מה שהנוכחות הדיגיטלית שלכם צריכה</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5B6472]">מעיצוב ועד להשקה, אנו מחברים בין אסטרטגיה, ביצועים ותוכן כדי לייצר אתר שעובד עבור העסק שלכם.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-[#E2E5EA] bg-[#FCFDFE] p-6 shadow-sm">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#5B8CFF]"><Icon size={24} /></div>
                <h3 className="text-xl font-bold text-[#111315]">{title}</h3>
                <p className="mt-3 leading-relaxed text-[#5B6472]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section-spacing bg-[#F5F8FF]">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-[#5B8CFF]">איך זה עובד</p>
            <h2 className="text-3xl font-extrabold text-[#111315] sm:text-5xl">מרעיון להשקה בחמישה שלבים</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map(([step, title, body]) => (
              <article key={step} className="rounded-2xl border border-[#DCE5FF] bg-white p-5 text-center">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#5B8CFF] text-sm font-bold text-white">{step}</span>
                <h3 className="mt-4 text-lg font-bold text-[#111315]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-[#5B8CFF]">תמחור שקוף</p>
            <h2 className="text-3xl font-extrabold text-[#111315] sm:text-5xl">חבילות ברורות. החלטה קלה יותר.</h2>
            <p className="mt-5 text-lg text-[#5B6472]">היקף עבודה מוגדר, תמחור שקוף ושיחת ייעוץ ללא עלות לפני שמחליטים.</p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {[
              ["Launch Website", "€299", "נוכחות מקצועית ומדויקת לעסק חדש שרוצה לצאת לדרך בצורה ברורה."],
              ["Growth Website", "€749", "אתר שממוקד בהמרות לעסק שרוצה להימצא, לבנות אמון ולקבל פניות."],
              ["Pro Website", "€1,499", "נוכחות דיגיטלית מקיפה יותר, עם תוכן עשיר, תנועה ותשתית חיפוש חזקה."],
            ].map(([name, price, body], index) => (
              <article key={name} className={`rounded-2xl border p-7 ${index === 1 ? "border-[#5B8CFF] bg-[#F7FAFF] shadow-lg" : "border-[#E2E5EA]"}`}>
                <p className="text-sm font-semibold tracking-wide text-[#5B8CFF]">{name}</p>
                <p className="mt-4 text-4xl font-extrabold text-[#111315]">{price}</p>
                <p className="mt-1 text-sm text-[#5B6472]">תשלום חד-פעמי</p>
                <p className="mt-5 leading-relaxed text-[#5B6472]">{body}</p>
                <a href={WHATSAPP_HEBREW} target="_blank" rel="noopener noreferrer" className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold ${index === 1 ? "btn-primary" : "border border-[#5B8CFF] text-[#315CD4] hover:bg-[#EEF3FF]"}`}>
                  לפרטים ושיחת ייעוץ
                </a>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#5B6472]">לפרויקטים מורכבים או בהתאמה אישית, המחיר מתחיל ב-€1,499 ונקבע לפי היקף העבודה.</p>
        </div>
      </section>

      <section className="bg-[#0F172A] px-4 py-20 text-center text-white sm:py-28">
        <div className="container mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-[#6FE3FF]">מוכנים להתחיל?</p>
          <h2 className="text-3xl font-extrabold leading-tight sm:text-5xl">בואו נבנה אתר שעובד קשה בשביל העסק שלכם.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#CBD5E1]">ספרו לנו על העסק שלכם. נחזור אליכם עם כיוון ברור, היקף עבודה והצעה שמתאימה לצרכים שלכם.</p>
          <a href={WHATSAPP_HEBREW} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9 inline-flex items-center gap-2">דברו איתנו ב-WhatsApp <MessageCircle size={18} /></a>
        </div>
      </section>
    </div>
  );
}
