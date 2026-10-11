import type { SiteLanguage } from "@/lib/routeLanguage";

const COPY = {
  en: [
    "Questions about articles",
    "When you submit an article question, Web3Forms processes your display name, email address, question, article URL, language and publication permission, and sends them to DM Labs by email. We use these details to review and respond to your question. Drafts stay in page memory and are not sent until you submit. The form is excluded from PostHog capture and session replay.",
    "Submission does not publish anything. With your permission and after our review, we may publish your display name, question and our reply beneath the article. Your email address is not published. Do not include sensitive information. Private submissions are handled as enquiries under the retention provisions below; Web3Forms also retains submissions according to its service settings. Published questions remain on the article until removed. To withdraw publication permission or request removal, email info@dm-labs.io and include the article URL. Sending a question does not subscribe you to marketing.",
  ],
  el: [
    "Ερωτήσεις για τα άρθρα",
    "Όταν υποβάλλετε ερώτηση για ένα άρθρο, το Web3Forms επεξεργάζεται το όνομα εμφάνισης, τη διεύθυνση email, την ερώτηση, τον σύνδεσμο του άρθρου, τη γλώσσα και την άδεια δημοσίευσης και τα αποστέλλει στην DM Labs μέσω email. Χρησιμοποιούμε αυτά τα στοιχεία για να εξετάσουμε την ερώτηση και να απαντήσουμε. Το πρόχειρο κείμενο παραμένει στη μνήμη της σελίδας και δεν αποστέλλεται πριν από την υποβολή. Η φόρμα εξαιρείται από τη συλλογή δεδομένων και την καταγραφή συνεδριών του PostHog.",
    "Η υποβολή δεν συνεπάγεται δημοσίευση. Με την άδειά σας και αφού ελέγξουμε την ερώτηση, ενδέχεται να δημοσιεύσουμε το όνομα εμφάνισης, την ερώτηση και την απάντησή μας κάτω από το άρθρο. Η διεύθυνση email δεν δημοσιεύεται. Μην περιλαμβάνετε ευαίσθητα δεδομένα. Οι ιδιωτικές υποβολές αντιμετωπίζονται ως αιτήματα επικοινωνίας σύμφωνα με τις παρακάτω διατάξεις διατήρησης. Το Web3Forms διατηρεί επίσης τις υποβολές σύμφωνα με τις ρυθμίσεις της υπηρεσίας του. Οι δημοσιευμένες ερωτήσεις παραμένουν στο άρθρο μέχρι να αφαιρεθούν. Για να ανακαλέσετε την άδεια δημοσίευσης ή να ζητήσετε αφαίρεση, στείλτε email στο info@dm-labs.io μαζί με τον σύνδεσμο του άρθρου. Η υποβολή ερώτησης δεν σας εγγράφει σε επικοινωνίες μάρκετινγκ.",
  ],
  he: [
    "שאלות על מאמרים",
    "כשאתם שולחים שאלה על מאמר, Web3Forms מעבד את השם שבחרתם להצגה, כתובת האימייל, השאלה, קישור המאמר, השפה וההסכמה לפרסום, ושולח אותם ל-DM Labs באימייל. אנו משתמשים בפרטים אלה כדי לבדוק את השאלה ולהשיב עליה. טיוטת השאלה נשארת בזיכרון העמוד ואינה נשלחת לפני השליחה. הטופס מוחרג מאיסוף הנתונים ומתיעוד הביקורים של PostHog.",
    "שליחת שאלה אינה מפרסמת דבר. בהסכמתכם ולאחר בדיקה, אנו עשויים לפרסם מתחת למאמר את השם שבחרתם, את השאלה ואת תשובתנו. כתובת האימייל אינה מתפרסמת. אין לכלול מידע רגיש. פניות פרטיות מטופלות בהתאם להוראות שמירת המידע של פניות המפורטות בהמשך. גם Web3Forms שומר פניות בהתאם להגדרות השירות שלו. שאלות שפורסמו נשארות במאמר עד להסרתן. לביטול ההסכמה לפרסום או לבקשת הסרה, שלחו אימייל לכתובת info@dm-labs.io וציינו את קישור המאמר. שליחת שאלה אינה רושמת אתכם לדיוור שיווקי.",
  ],
};

export default function ArticleQuestionsPrivacy({
  locale,
}: {
  locale: SiteLanguage;
}) {
  const [title, ...paragraphs] = COPY[locale];
  return (
    <section
      id="article-questions-privacy"
      tabIndex={-1}
      style={{ scrollMarginTop: 100 }}
    >
      <h2 className="text-xl font-semibold text-[#111315] mb-3">{title}</h2>
      {paragraphs.map(p => (
        <p key={p} className="mt-3">
          {p}
        </p>
      ))}
    </section>
  );
}
