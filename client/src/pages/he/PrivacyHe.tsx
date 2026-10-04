import "@/styles/legal.css";
import { Link } from "wouter";

import { useSEO } from "@/hooks/useSEO";

const sectionTitle = "text-xl font-semibold text-[#111315] mb-3";
const bodyClass = "space-y-8 text-[#5B6472] text-sm leading-relaxed";
const listClass = "list-disc pr-5 space-y-2";
const strongClass = "text-[#111315]";

export default function PrivacyHe() {
  useSEO({
    title: "מדיניות פרטיות | DM-Labs.io",
    description: "איך DM-Labs.io אוספת, משתמשת ושומרת על המידע האישי שלכם, ומה הזכויות שלכם.",
    canonicalPath: "/he/privacy/",
    ogLocale: "he_IL",
    noindex: true,
  });

  return (
    <div className="legal-document">
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10">
          <Link href="/he/" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8">
             חזרה לדף הבית
          </Link>
          <div className="text-center">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">משפטי</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">מדיניות פרטיות</h1>
            <p className="text-sm text-[#5B6472]">עודכנה לאחרונה: 30 בספטמבר 2026</p>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <div className={bodyClass}>
            <div><h2 className={sectionTitle}>1. בעל השליטה בנתונים</h2><p>DM-Labs.io ("אנחנו", "אותנו", "שלנו") היא בעלת השליטה האחראית על הנתונים האישיים שלכם. אנו מספקים שירותי עיצוב ופיתוח אתרים לעסקים. ניתן ליצור איתנו קשר בכתובת <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline" dir="ltr">info@dm-labs.io</a> או ב-WhatsApp במספר <span dir="ltr">+357 97472847</span>.</p></div>
            <div><h2 className={sectionTitle}>2. מידע שאנו אוספים</h2><p className="mb-3">אנו אוספים את הקטגוריות הבאות של נתונים אישיים:</p><ul className={listClass}>
              <li><strong className={strongClass}>פרטי קשר:</strong> שם, כתובת אימייל, מספר טלפון ושם העסק, הנמסרים בעת מילוי טופס יצירת הקשר או שליחת הודעה ב-WhatsApp.</li>
              <li><strong className={strongClass}>מידע על הפרויקט:</strong> פרטים על העסק, העדפות עיצוב ודרישות האתר, הנמסרים במהלך פגישות ייעוץ.</li>
              <li><strong className={strongClass}>נתונים טכניים:</strong> ספקי האחסון מקבלים נתוני חיבור טכניים, כולל כתובת IP, כדי להציג את האתר ולהגן עליו. בהסכמה לאנליטיקה נאספים גם נתוני דפדפן, מכשיר ושימוש בעמודים. איסוף כתובות IP ב־PostHog מושבת בהגדרות האתר.</li>
              <li><strong className={strongClass}>פרטי תשלום:</strong> פרטי חיוב המעובדים בבטחה באמצעות ספקי תשלום חיצוניים. איננו שומרים מספרי כרטיסי אשראי.</li>
            </ul><p className="mt-3">לצורך הצגת מטבע אוטומטית, ספק האחסון שלנו, Vercel, מסיק מדינה משוערת מכתובת ה-IP המתקבלת בעת טיפול בבקשה שלכם. היישום שלנו משתמש במדינה זו רק לבחירת מטבע לתצוגה ומחזיר לדפדפן שלכם את המטבע בלבד. תכונה זו אינה מבקשת גישה ל-GPS או למיקום מדויק של המכשיר ואינה מעריכה את ההתנהגות שלכם או את הנכונות שלכם לשלם.</p></div>
            <div><h2 className={sectionTitle}>3. הבסיס המשפטי לעיבוד</h2><p className="mb-3">לפי תקנות הגנת המידע הכלליות של האיחוד האירופי (GDPR), אנו מעבדים את הנתונים שלכם על בסיס:</p><ul className={listClass}>
              <li><strong className={strongClass}>צורך חוזי:</strong> כדי לספק את שירותי עיצוב האתר שביקשתם.</li>
              <li><strong className={strongClass}>אינטרס לגיטימי:</strong> כדי להשיב לפניות, לשפר את השירותים שלנו ולהבטיח את אבטחת האתר.</li>
              <li><strong className={strongClass}>הסכמה:</strong> עבור עוגיות אנליטיקה ותקשורת שיווקית, ככל שרלוונטי. ניתן לבטל הסכמה בכל עת.</li>
            </ul><p className="mt-3">לצורך ההתאמה המוגבלת הזו בין מדינה למטבע, אנו מסתמכים על האינטרס הלגיטימי שלנו בהצגת מחירים במטבע מוכר (סעיף 6(1)(f) ל-GDPR). אנו משתמשים רק במידע על המדינה הדרוש למטרה זו, ללא מזהה קבוע של מטבע. ניתן להתנגד לעיבוד זה באמצעות פנייה אלינו בפרטי הקשר שבהמשך. אפשר גם לבקש הצעת מחיר בכתב במטבע המתאים.</p></div>
            <div><h2 className={sectionTitle}>4. כיצד אנו משתמשים בנתונים שלכם</h2><ul className={listClass}><li>להשיב לפניותיכם ולספק הצעות מחיר</li><li>לעצב, לפתח ולמסור את פרויקט האתר שלכם</li><li>לתקשר עדכוני פרויקט ולוחות זמנים</li><li>לעבד תשלומים עבור השירותים שלנו</li><li>לספק תחזוקה ותמיכה לאחר ההשקה</li><li>להבין את השימוש באתר ולאבחן תקלות באמצעות אנליטיקה ותיעוד ביקורים בהסכמה. שדות הטפסים מוסתרים בתיעוד. מזהי האנליטיקה הם פסאודונימיים, ואינם אנונימיים לחלוטין.</li></ul></div>
            <div><h2 className={sectionTitle}>5. שיתוף נתונים</h2><p className="mb-3">איננו מוכרים, משכירים או סוחרים בנתונים האישיים שלכם. אנו עשויים לשתף נתונים עם הקטגוריות הבאות של נמענים, ורק לצורך אספקת שירותינו:</p><ul className={listClass}>
              <li><strong className={strongClass}>ספקי אחסון:</strong> לאחסון האתר שלכם ולהצגתו.</li><li><strong className={strongClass}>מעבדי תשלומים:</strong> לעיבוד תשלומים מאובטח.</li><li><strong className={strongClass}>ספקי אנליטיקה:</strong> PostHog (EU) לאנליטיקה, לתיעוד ביקורים ולמעקב שגיאות, ו־Vercel Web Analytics לניתוח השימוש באתר. שניהם מופעלים רק לאחר הסכמה לאנליטיקה.</li><li><strong className={strongClass}>מעבדי טפסים:</strong> Web3Forms, להעברת טפסי יצירת קשר לאימייל שלנו.</li>
            </ul></div>
            <div><h2 className={sectionTitle}>6. שמירת נתונים</h2><p>אנו שומרים נתונים אישיים רק למשך הזמן הנחוץ למטרות שלשמן נאספו. בפרט:</p><ul className={`${listClass} mt-3`}><li>טפסי יצירת קשר: 12 חודשים לאחר התקשורת האחרונה</li><li>נתוני פרויקט לקוח: משך הפרויקט בתוספת 24 חודשים</li><li>רשומות תשלום: כנדרש לפי דיני מס וחשבונאות רלוונטיים</li><li>תיעוד ביקורים: 30 ימים לפי הגדרת הפרויקט הנוכחית. נתוני אנליטיקה ושגיאות נשמרים לצורך ניתוח שימוש ואבחון תקלות, בכפוף להגדרות השמירה של הספק ולצורך בנתונים.</li></ul><p className="mt-3">תכונת המטבע אינה יוצרת רשומה נפרדת ושמורה של כתובת ה-IP או המדינה שלכם ואינה מוסיפה עוגיות או אחסון בדפדפן לצורך המטבע. המטבע שנבחר מוחזק בזיכרון במהלך הביקור הנוכחי בעמוד. ספקי אחסון עשויים לעבד בנפרד נתוני חיבור ביומני תפעול ואבטחה, כפי שמתואר במדיניות זו. תכונה זו אינה משנה עיבוד זה. אם תשלחו פנייה עם חבילה שנבחרה, המטבע והסכומים המוצגים יהפכו לחלק מהפנייה ויישמרו בהתאם לתקופות השמירה של פניות או רשומות לקוחות המפורטות לעיל.</p></div>
            <div><h2 className={sectionTitle}>7. הזכויות שלכם לפי GDPR</h2><p className="mb-3">כנושאי מידע, עומדות לכם הזכויות הבאות:</p><ul className={listClass}>
              <li><strong className={strongClass}>זכות עיון:</strong> לבקש עותק של הנתונים האישיים שאנו מחזיקים עליכם.</li><li><strong className={strongClass}>זכות לתיקון:</strong> לבקש תיקון נתונים לא מדויקים או חסרים.</li><li><strong className={strongClass}>זכות למחיקה:</strong> לבקש למחוק את הנתונים האישיים שלכם, הידועה גם כזכות להישכח.</li><li><strong className={strongClass}>זכות להגבלת עיבוד:</strong> לבקש שנגביל את אופן השימוש בנתונים שלכם.</li><li><strong className={strongClass}>זכות לניידות נתונים:</strong> לקבל את הנתונים בפורמט מובנה וקריא למכונה.</li><li><strong className={strongClass}>זכות להתנגד:</strong> להתנגד לעיבוד המבוסס על אינטרס לגיטימי.</li><li><strong className={strongClass}>זכות לביטול הסכמה:</strong> לבטל בכל עת הסכמה לעוגיות אנליטיקה או לשיווק.</li>
            </ul><p className="mt-3">כדי לממש זכויות אלה, צרו איתנו קשר בכתובת <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline" dir="ltr">info@dm-labs.io</a>. נשיב בתוך 30 ימים.</p></div>
            <div><h2 className={sectionTitle}>8. עוגיות</h2><p>אנו משתמשים בעוגיות חיוניות לתפעול האתר ובעוגיות אנליטיקה, בהסכמתכם, כדי להבין כיצד מבקרים משתמשים באתר. לפרטים מלאים ראו את <Link href="/he/cookies/" className="text-[#5B8CFF] hover:underline">מדיניות העוגיות</Link>.</p></div>
            <div><h2 className={sectionTitle}>9. העברות בין-לאומיות</h2><p>הנתונים שלכם עשויים להיות מעובדים בידי ספקי שירות מחוץ לאזור הכלכלי האירופי (EEA). במקרים אלה אנו מבטיחים קיום אמצעי הגנה מתאימים, כגון סעיפים חוזיים סטנדרטיים שאושרו בידי הנציבות האירופית.</p></div>
            <div><h2 className={sectionTitle}>10. אבטחה</h2><p>אנו מיישמים אמצעים טכניים וארגוניים מתאימים להגנה על הנתונים האישיים שלכם מפני גישה, שינוי, חשיפה או השמדה בלתי מורשים. אלה כוללים הצפנת SSL, אחסון מאובטח ובקרות גישה.</p></div>
            <div><h2 className={sectionTitle}>11. שינויים במדיניות זו</h2><p>אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. כל שינוי יפורסם בדף זה עם תאריך עדכון חדש. אנו ממליצים לעיין במדיניות זו מדי פעם.</p></div>
            <div><h2 className={sectionTitle}>12. יצירת קשר ותלונות</h2><p>אם יש לכם שאלות על מדיניות זו או ברצונכם להגיש תלונה, צרו איתנו קשר בכתובת <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline" dir="ltr">info@dm-labs.io</a>. עומדת לכם גם הזכות להגיש תלונה לרשות פיקוח במדינת מגוריכם.</p></div>
          </div>
          <div className="mt-10 pt-8 border-t border-[#E2E5EA] flex gap-4">
            <Link href="/he/cookies/" className="text-sm text-[#5B8CFF] hover:underline">מדיניות עוגיות</Link>
            <Link href="/he/terms/" className="text-sm text-[#5B8CFF] hover:underline">תנאי שירות</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
