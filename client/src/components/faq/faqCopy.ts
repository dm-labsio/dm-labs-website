import type { SiteLanguage } from "@/lib/routeLanguage";
import type { TopicId } from "./faqContent";

type Copy = {
  title: string; description: string; label: string; opening: string; payoff: string; intro: string;
  browse: string; help: string; helpCopy: string; cta: string; whatsapp: string; reassurance: string;
  topics: Record<TopicId, { title: string; intro: string }>;
};
export const FAQ_COPY: Record<SiteLanguage, Copy> = {
  en: {
    title: "Website questions, answered | DM Labs FAQ",
    description: "Clear answers about working with DM Labs: website packages, payment, design, SEO and ongoing care. Ask us for a free consultation.",
    label: "Questions, answered", opening: "Good questions.", payoff: "Clear answers.",
    intro: "Before you take the next step, you should know what to expect. Start here. And if your question is a little different, we’re here to talk.",
    browse: "Find your answer", help: "Your question is welcome.", helpCopy: "You don’t need a finished brief. Tell us what you’re thinking about, and we’ll find a useful starting point together.",
    cta: "Get a free consultation", whatsapp: "Ask us on WhatsApp", reassurance: "Free. No obligation.",
    topics: {
      "getting-started": { title: "Getting started", intro: "From your first idea to an agreed direction." },
      "packages-payment": { title: "Packages & payment", intro: "Know the scope, the cost and what belongs to you." },
      "features-seo": { title: "Your website", intro: "Design that works for your business and your visitors." },
      "website-care": { title: "Life after launch", intro: "What keeps your website running, supported and up to date." },
    },
  },
  el: {
    title: "Συχνές ερωτήσεις για την κατασκευή ιστοσελίδας | DM Labs",
    description: "Πόσο χρόνο παίρνει, τι περιλαμβάνει κάθε πακέτο, πώς γίνεται η πληρωμή και τι γίνεται μετά τη δημοσίευση. Όλες οι απαντήσεις σε ένα σημείο.",
    label: "Συχνές ερωτήσεις", opening: "Οι ερωτήσεις σας.", payoff: "Οι απαντήσεις μας.",
    intro: "Πριν κάνετε το επόμενο βήμα, είναι λογικό να θέλετε να ξέρετε τι σας περιμένει. Εδώ θα βρείτε τις πιο συχνές απορίες, κι αν η δική σας δεν είναι ανάμεσά τους, απλώς ρωτήστε μας.",
    browse: "Βρείτε την απάντηση", help: "Καμία ερώτηση δεν είναι χαζή.", helpCopy: "Δεν χρειάζεται να έχετε έτοιμο σχέδιο. Γράψτε μας δυο λόγια και θα βρούμε μαζί από πού να ξεκινήσετε.",
    cta: "Δωρεάν συμβουλευτική", whatsapp: "Ρωτήστε μας στο WhatsApp", reassurance: "Δωρεάν και χωρίς καμία δέσμευση.",
    topics: {
      "getting-started": { title: "Πώς ξεκινάμε", intro: "Από την πρώτη ιδέα μέχρι να συμφωνήσουμε τι θα φτιάξουμε." },
      "packages-payment": { title: "Πακέτα και πληρωμή", intro: "Τι περιλαμβάνεται, πόσο κοστίζει και τι είναι δικό σας." },
      "features-seo": { title: "Η ιστοσελίδα σας", intro: "Σχεδιασμός για την επιχείρηση και τους επισκέπτες σας." },
      "website-care": { title: "Μετά τη δημοσίευση", intro: "Πώς κρατάμε την ιστοσελίδα σας online, ενημερωμένη και ασφαλή." },
    },
  },
  he: {
    title: "שאלות נפוצות על בניית אתר | DM Labs",
    description: "כמה זמן לוקח לבנות אתר, מה כלול בכל חבילה, איך משלמים ומה קורה אחרי ההשקה. כל התשובות במקום אחד, ואם משהו חסר, פשוט תשאלו.",
    label: "שאלות ותשובות", opening: "השאלות שלכם.", payoff: "התשובות שלנו.",
    intro: "לפני שמתקדמים, טבעי לרצות לדעת למה לצפות. ריכזנו כאן את השאלות שהכי שואלים אותנו, ואם השאלה שלכם לא כאן, פשוט תשאלו.",
    browse: "מצאו את התשובה", help: "אין שאלות מטופשות.", helpCopy: "לא צריך להגיע עם תוכנית מוכנה. ספרו לנו על מה אתם חושבים, ונמצא יחד נקודת פתיחה מתאימה.",
    cta: "לשיחת ייעוץ בחינם", whatsapp: "שאלו אותנו ב-WhatsApp", reassurance: "בחינם וללא התחייבות.",
    topics: {
      "getting-started": { title: "יוצאים לדרך", intro: "מהרעיון הראשון ועד שסוגרים יחד מה בונים." },
      "packages-payment": { title: "חבילות ותשלום", intro: "מה כלול, כמה זה עולה ומה נשאר שלכם." },
      "features-seo": { title: "האתר שלכם", intro: "עיצוב שעובד בשביל העסק ובשביל המבקרים באתר." },
      "website-care": { title: "אחרי ההשקה", intro: "איך שומרים שהאתר יישאר באוויר, מעודכן ובידיים טובות." },
    },
  },
};
