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
      "features-seo": { title: "Your website", intro: "Design that works for your business—and your visitors." },
      "website-care": { title: "Life after launch", intro: "What keeps your website running, supported and up to date." },
    },
  },
  el: {
    title: "Απαντήσεις για την ιστοσελίδα σας | DM Labs FAQ",
    description: "Ξεκάθαρες απαντήσεις για τη συνεργασία με την DM Labs: πακέτα, πληρωμή, σχεδιασμός, SEO και συνεχής φροντίδα. Ζητήστε δωρεάν συμβουλευτική.",
    label: "Συχνές ερωτήσεις", opening: "Οι ερωτήσεις σας.", payoff: "Οι απαντήσεις μας.",
    intro: "Πριν κάνετε το επόμενο βήμα, θέλετε να ξέρετε τι να περιμένετε. Ξεκινήστε εδώ. Κι αν η δική σας ερώτηση είναι διαφορετική, είμαστε εδώ να μιλήσουμε.",
    browse: "Βρείτε την απάντηση", help: "Κάθε ερώτηση έχει θέση εδώ.", helpCopy: "Δεν χρειάζεται να έχετε έτοιμο σχέδιο. Πείτε μας τι σκέφτεστε και θα βρούμε μαζί από πού να ξεκινήσετε.",
    cta: "Δωρεάν συμβουλευτική", whatsapp: "Ρωτήστε μας στο WhatsApp", reassurance: "Δωρεάν. Χωρίς καμία δέσμευση.",
    topics: {
      "getting-started": { title: "Η αρχή", intro: "Από την πρώτη ιδέα στη συμφωνημένη κατεύθυνση." },
      "packages-payment": { title: "Πακέτα & πληρωμή", intro: "Το εύρος, το κόστος και όσα σας ανήκουν." },
      "features-seo": { title: "Η ιστοσελίδα σας", intro: "Σχεδιασμός για την επιχείρηση και τους επισκέπτες σας." },
      "website-care": { title: "Μετά τη δημοσίευση", intro: "Όσα κρατούν την ιστοσελίδα σας ενεργή, υποστηριζόμενη και ενημερωμένη." },
    },
  },
  he: {
    title: "שאלות על האתר שלכם, עם תשובות | DM Labs",
    description: "תשובות ברורות על עבודה עם DM Labs: חבילות, תשלום, עיצוב, SEO ותחזוקה שוטפת. פנו לשיחת ייעוץ ללא עלות.",
    label: "שאלות ותשובות", opening: "השאלות שלכם.", payoff: "התשובות שלנו.",
    intro: "לפני הצעד הבא, כדאי לדעת למה לצפות. אפשר להתחיל כאן. ואם השאלה שלכם קצת אחרת, אנחנו כאן לדבר.",
    browse: "מצאו את התשובה", help: "יש מקום לכל שאלה.", helpCopy: "לא צריך להגיע עם תוכנית מוכנה. ספרו לנו על מה אתם חושבים, ונמצא יחד נקודת פתיחה מתאימה.",
    cta: "לשיחת ייעוץ ללא עלות", whatsapp: "שאלו אותנו בוואטסאפ", reassurance: "ללא עלות וללא התחייבות.",
    topics: {
      "getting-started": { title: "יוצאים לדרך", intro: "מהרעיון הראשון לכיוון שסיכמנו יחד." },
      "packages-payment": { title: "חבילות ותשלום", intro: "היקף העבודה, המחיר ומה נשאר שלכם." },
      "features-seo": { title: "האתר שלכם", intro: "עיצוב שעובד בשביל העסק ובשביל המבקרים באתר." },
      "website-care": { title: "אחרי ההשקה", intro: "מה משאיר את האתר פעיל, נתמך ומעודכן." },
    },
  },
};
