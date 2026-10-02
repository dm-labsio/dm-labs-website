import { useId, useState } from "react";
import AnimateIn from "./AnimateIn";
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
      "אני מתחילה בהיכרות עם העסק ועם האנשים שמאחוריו. חשוב לי להבין מה מייחד אתכם ואיך אתם רוצים להציג את עצמכם, ומשם לבחור את השפה, הצבעים והפרטים שירגישו שלכם.",
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
      "Διευθύντρια Δημιουργικού & Ειδικός AI",
      "Έχω δουλέψει με εταιρείες τεχνολογίας πάνω σε ψηφιακά προϊόντα και εφαρμογές τεχνητής νοημοσύνης. Σήμερα παντρεύω τον σχεδιασμό, το περιεχόμενο και την τεχνολογία, ώστε κάθε επιχείρηση να έχει μια ιστοσελίδα με τον δικό της χαρακτήρα.",
      "Ξεκινάω γνωρίζοντας την επιχείρηση και τους ανθρώπους της. Θέλω να καταλάβω τι σας κάνει διαφορετικούς και πώς θέλετε να σας βλέπουν. Από εκεί διαλέγω τις λέξεις, τα χρώματα και τις λεπτομέρειες που σας μοιάζουν.",
    ],
    [
      "Tom B.",
      "Τεχνικός Διευθυντής & Ειδικός SEO",
      "Έρχομαι από τον χώρο της ανάπτυξης λογισμικού, των αυτοματισμών και της διασύνδεσης συστημάτων. Σήμερα φτιάχνω ιστοσελίδες που είναι εύκολες στη χρήση και ξεκάθαρες για τις μηχανές αναζήτησης, με έμφαση στην ταχύτητα, τη δομή και το περιεχόμενο.",
      "Ξεκινάω από το τι ψάχνουν οι πελάτες σας στη Google και με ποια λόγια περιγράφουν αυτό που χρειάζονται. Μετά δουλεύω τη δομή των σελίδων, τους τίτλους και το περιεχόμενο, ώστε οι σωστοί άνθρωποι να βρίσκουν την επιχείρησή σας και να καταλαβαίνουν αμέσως τι προσφέρετε.",
    ],
  ],
} as const;
const labels = {
  en: ["Read more", "Read less"],
  he: ["קראו עוד", "הצגת פחות"],
  el: ["Περισσότερα", "Λιγότερα"],
} as const;
const images = [
  "/media/manus/AtkkCmVLLZyIDtDx.webp",
  "/media/manus/DVIoYisVQvzbqoiR.webp",
];

type Language = keyof typeof profiles;

function ProfileCard({
  profile,
  image,
  language,
}: {
  profile: readonly [string, string, string, string];
  image: string;
  language: Language;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailId = useId();
  const [name, role, background, approach] = profile;
  return (
    <article className="team-profile">
      <div className="team-profile-photo-frame"><img
        className="team-profile-photo"
        src={image}
        alt={name}
        width={image === images[0] ? 859 : 880}
        height={1280}
        loading="lazy"
      /></div>
      <header className="team-profile-heading">
        <h3 className={language === "en" ? "editorial-card-title" : undefined}>
          {name}
        </h3>
        <p className="team-profile-role">{role}</p>
      </header>
      <div className="team-profile-copy">
        <p>{background}</p>
        <p
          id={detailId}
          className="team-profile-detail"
          data-expanded={expanded}
        >
          {approach}
        </p>
        <button
          type="button"
          className="team-profile-toggle"
          aria-expanded={expanded}
          aria-controls={detailId}
          onClick={() => setExpanded(value => !value)}
        >
          {labels[language][expanded ? 1 : 0]}
          <span className="sr-only">: {name}</span>
        </button>
      </div>
    </article>
  );
}

export default function TeamProfiles({ language }: { language: Language }) {
  return (
    <div
      className="team-profiles"
      lang={language}
      dir={language === "he" ? "rtl" : "ltr"}
    >
      {profiles[language].map((profile, index) => (
        <AnimateIn key={profile[0]} delay={index * 0.1}>
          <ProfileCard
            profile={profile}
            image={images[index]}
            language={language}
          />
        </AnimateIn>
      ))}
    </div>
  );
}
