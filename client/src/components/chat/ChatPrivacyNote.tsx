import type { SiteLanguage } from "@/lib/routeLanguage";

const COPY = {
  en: [
    "Website guide and conversations",
    "When you send a question in the website guide, we use Web3Forms to email the conversation to DM Labs, including your submitted questions, the guide’s replies, source links, page paths, timestamps and optional reply email. Draft questions are not sent. Answers are retrieved from our published website content without sending your question to an external AI provider. The chat panel is excluded from PostHog capture and session replay.",
    "A copy is kept in this browser tab’s session storage so you can continue across pages. Stored conversations older than 24 hours are discarded when the guide next loads. Start a new conversation to clear the local copy; this does not delete emails already sent. You can download your transcript. Opening WhatsApp shares a prefilled conversation with WhatsApp; you still press Send there to contact us. Long conversations can be copied or downloaded instead. Emailed conversations are handled as enquiries under this privacy policy.",
  ],
  el: [
    "Οδηγός ιστοσελίδας και συνομιλίες",
    "Όταν στέλνετε ερώτηση στον οδηγό, χρησιμοποιούμε το Web3Forms για να στείλουμε τη συνομιλία στην DM Labs μέσω email: ερωτήσεις, απαντήσεις του οδηγού, πηγές, διαδρομές σελίδων, ώρες και προαιρετικό email επικοινωνίας. Τα πρόχειρα ερωτήματα δεν στέλνονται. Οι απαντήσεις αντλούνται από το δημοσιευμένο περιεχόμενό μας, χωρίς αποστολή της ερώτησης σε εξωτερικό πάροχο AI. Το πλαίσιο συνομιλίας εξαιρείται από την καταγραφή του PostHog.",
    "Ένα αντίγραφο μένει στο session storage της καρτέλας για να συνεχίζετε σε άλλες σελίδες. Συνομιλίες παλαιότερες των 24 ωρών απορρίπτονται στην επόμενη φόρτωση. Η νέα συνομιλία διαγράφει το τοπικό αντίγραφο, όχι email που έχουν ήδη σταλεί. Μπορείτε να αποθηκεύσετε τη συνομιλία. Το άνοιγμα του WhatsApp μοιράζεται προσυμπληρωμένο κείμενο με το WhatsApp· χρειάζεται να πατήσετε Αποστολή εκεί. Οι μεγάλες συνομιλίες αντιγράφονται ή αποθηκεύονται. Τα email αντιμετωπίζονται ως αιτήματα επικοινωνίας βάσει της πολιτικής απορρήτου.",
  ],
  he: [
    "מדריך האתר והשיחות",
    "כששולחים שאלה במדריך, אנחנו משתמשים ב-Web3Forms כדי לשלוח את השיחה ל-DM Labs באימייל, כולל השאלות שנשלחו, תשובות המדריך, מקורות, נתיבי העמודים, זמנים ואימייל אופציונלי לתשובה. טיוטות של שאלות לא נשלחות. התשובות נלקחות מהתוכן שפרסמנו באתר, בלי לשלוח את השאלה לספק AI חיצוני. חלונית השיחה מוחרגת מאיסוף ומתיעוד הביקור ב-PostHog.",
    "עותק נשמר באחסון הזמני של הכרטיסייה כדי להמשיך בין עמודים. שיחות ישנות מ-24 שעות נמחקות בטעינה הבאה של המדריך. התחלת שיחה חדשה מוחקת את העותק המקומי, אך לא אימיילים שכבר נשלחו. אפשר להוריד את השיחה. פתיחת WhatsApp משתפת איתו טקסט מוכן; עדיין צריך ללחוץ שם על שליחה. שיחות ארוכות אפשר להעתיק או להוריד. שיחות באימייל מטופלות כפניות בהתאם למדיניות הפרטיות.",
  ],
};
export default function ChatPrivacyNote({ locale }: { locale: SiteLanguage }) {
  const [title, ...paragraphs] = COPY[locale];
  return (
    <section id="website-guide-privacy">
      <h2 className="text-xl font-semibold text-[#111315] mb-3">{title}</h2>
      {paragraphs.map(paragraph => (
        <p key={paragraph} className="mt-3">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
