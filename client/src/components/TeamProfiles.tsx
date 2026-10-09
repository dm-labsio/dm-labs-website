import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "wouter";
import "./TeamProfiles.css";

const profiles = {
  en: [
    [
      "Anastacia B.",
      "Creative Director & AI Specialist",
      "I’ve worked with technology companies on digital products and AI implementation. Today, I bring together design, content, and technology to give each business a website with its own character.",
      "I start by getting to know the business and the people behind it. I want to understand what makes you different and how you want to present yourselves. That helps me choose the words, colours, and details that feel like you.",
    ],
    [
      "Tom B.",
      "Technical Director & SEO Expert",
      "My background is in development, automation, and connecting systems. Today, I focus on building websites that are easy to use and easy for search engines to understand, with careful attention to speed, structure, and content.",
      "I start by understanding what your customers search for on Google and how they describe the service they need. Then I work on page structure, headings, and content to help the right people find your business and understand what you offer.",
    ],
  ],
  he: [
    [
      "אנסטסיה",
      "מנהלת קריאייטיב ומומחית AI",
      "עבדתי עם חברות טכנולוגיה על מוצרים דיגיטליים והטמעת AI. היום אני מחברת בין עיצוב, תוכן וכלים טכנולוגיים כדי לתת לכל עסק אתר עם אופי משלו.",
      "אני מתחילה בהיכרות עם העסק ועם האנשים שמאחוריו. חשוב לי להבין מה מייחד אתכם ואיך אתם רוצים להציג את עצמכם, ומשם לבחור את הסגנון, הצבעים והפרטים שמתאימים בדיוק לכם.",
    ],
    [
      "תום",
      "מנהל טכנולוגי ומומחה SEO",
      "הרקע שלי הוא בפיתוח, אוטומציה וחיבור בין מערכות. היום אני מתמקד בבניית אתרים שקל להשתמש בהם ושקל למנועי חיפוש להבין, עם תשומת לב למהירות, למבנה ולתוכן.",
      "קודם כול אני בודק מה הלקוחות שלכם מחפשים בגוגל ואיך הם מתארים את השירות שהם צריכים. משם אני עובד על מבנה העמודים, הכותרות והתוכן, כדי לעזור לאנשים הנכונים למצוא את העסק שלכם ולהבין מה אתם מציעים.",
    ],
  ],
  el: [
    [
      "Anastacia B.",
      "Διευθύντρια δημιουργικού και ειδικός AI",
      "Έχω δουλέψει με εταιρείες τεχνολογίας πάνω σε ψηφιακά προϊόντα και εφαρμογές τεχνητής νοημοσύνης. Σήμερα παντρεύω τον σχεδιασμό, το περιεχόμενο και την τεχνολογία, ώστε κάθε επιχείρηση να έχει μια ιστοσελίδα που δεν μοιάζει με καμία άλλη.",
      "Ξεκινάω γνωρίζοντας την επιχείρηση και τους ανθρώπους της. Θέλω να καταλάβω τι σας κάνει διαφορετικούς και πώς θέλετε να σας βλέπουν. Από εκεί διαλέγω τις λέξεις, τα χρώματα και τις λεπτομέρειες που σας ταιριάζουν.",
    ],
    [
      "Tom B.",
      "Τεχνικός διευθυντής και ειδικός SEO",
      "Έρχομαι από τον χώρο της ανάπτυξης λογισμικού, των αυτοματισμών και της διασύνδεσης συστημάτων. Σήμερα φτιάχνω ιστοσελίδες που είναι εύκολες στη χρήση και ξεκάθαρες για τις μηχανές αναζήτησης, με έμφαση στην ταχύτητα, τη δομή και το περιεχόμενο.",
      "Ξεκινάω από το τι ψάχνουν οι πελάτες σας στο Google και με ποια λόγια περιγράφουν αυτό που χρειάζονται. Μετά δουλεύω τη δομή των σελίδων, τους τίτλους και το περιεχόμενο, ώστε οι σωστοί άνθρωποι να βρίσκουν την επιχείρησή σας και να καταλαβαίνουν αμέσως τι προσφέρετε.",
    ],
  ],
} as const;
const labels = {
  en: {
    meet: "Meet",
    approach: "How I work",
    close: "Close profile",
    contact: "Let’s talk about your website",
    hint: "Two people. Direct collaboration.",
    browse: "Meet the people behind DM Labs",
  },
  el: {
    meet: "Γνωρίστε",
    approach: "Πώς δουλεύω",
    close: "Κλείσιμο προφίλ",
    contact: "Ας μιλήσουμε για την ιστοσελίδα σας",
    hint: "Δύο άνθρωποι. Άμεση συνεργασία.",
    browse: "Γνωρίστε τους ανθρώπους της DM Labs",
  },
  he: {
    meet: "נעים להכיר",
    approach: "איך אני עובד/ת",
    close: "סגירת הפרופיל",
    contact: "בואו נדבר על האתר שלכם",
    hint: "שני אנשים. עבודה ישירה יחד.",
    browse: "האנשים שמאחורי DM Labs",
  },
} as const;
const images = [
  "/media/manus/AtkkCmVLLZyIDtDx.webp",
  "/media/manus/DVIoYisVQvzbqoiR.webp",
];
type Language = keyof typeof profiles;

export default function TeamProfiles({ language }: { language: Language }) {
  const t = labels[language];
  return (
    <div
      className="team-showcase"
      lang={language}
      dir={language === "he" ? "rtl" : "ltr"}
    >
      <p className="team-showcase-note">{t.hint}</p>
      <div className="team-profiles" aria-label={t.browse}>
        {profiles[language].map(([name, role, background, approach], index) => (
          <article className="team-profile" key={name}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="team-portrait-card"
                  aria-label={`${t.meet} ${name}`}
                >
                  <span className="team-profile-photo-frame">
                    <img
                      className="team-profile-photo"
                      src={images[index]}
                      alt={name}
                      width={index === 0 ? 859 : 880}
                      height={1280}
                      loading="lazy"
                    />
                  </span>
                  <span className="team-portrait-caption">
                    <span className="team-portrait-name">{name}</span>
                    <span className="team-portrait-role">{role}</span>
                    <span className="team-portrait-action">
                      {t.meet} {name}
                      <span aria-hidden="true">+</span>
                    </span>
                  </span>
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="team-bio-backdrop" />
                <Dialog.Content
                  className="team-bio"
                  lang={language}
                  dir={language === "he" ? "rtl" : "ltr"}
                  data-brand="dm-labs"
                  aria-describedby={undefined}
                >
                  <Dialog.Close className="team-bio-close" aria-label={t.close}>
                    <span aria-hidden="true">×</span>
                  </Dialog.Close>
                  <div className="team-bio-layout">
                    <div className="team-bio-image">
                      <img
                        src={images[index]}
                        alt={name}
                        width={index === 0 ? 859 : 880}
                        height={1280}
                      />
                    </div>
                    <div className="team-bio-copy">
                      <Dialog.Title className="team-bio-name">
                        {name}
                      </Dialog.Title>
                      <p className="team-bio-role">{role}</p>
                      <p>{background}</p>
                      <h3>
                        {language === "he"
                          ? index === 0
                            ? "איך אני עובדת"
                            : "איך אני עובד"
                          : t.approach}
                      </h3>
                      <p>{approach}</p>
                      <Dialog.Close asChild>
                        <Link
                          className="team-bio-contact"
                          href={`${language === "en" ? "" : `/${language}`}/contact/`}
                        >
                          {t.contact}
                        </Link>
                      </Dialog.Close>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </article>
        ))}
      </div>
    </div>
  );
}
