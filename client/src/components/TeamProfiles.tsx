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
      "אני מתחילה מלהכיר את העסק ואת האנשים שמאחוריו. חשוב לי להבין מה מייחד אתכם ואיך אתם רוצים להציג את עצמכם, ומשם לבחור את השפה, הצבעים והפרטים שירגישו שלכם.",
    ],
    [
      "תום",
      "מנהל טכנולוגי ומומחה SEO",
      "הרקע שלי הוא בפיתוח, אוטומציה וחיבור בין מערכות. היום אני מתמקד בבניית אתרים שקל להשתמש בהם ושקל למנועי חיפוש להבין, עם תשומת לב למהירות, למבנה ולתוכן.",
      "אני מתחיל מלהבין מה הלקוחות שלכם מחפשים בגוגל ואיך הם מתארים את השירות שהם צריכים. משם אני עובד על מבנה העמודים, הכותרות והתוכן, כדי לעזור לאנשים הנכונים למצוא את העסק שלכם ולהבין מה אתם מציעים.",
    ],
  ],
  el: [
    [
      "Anastacia B.",
      "Διευθύντρια Δημιουργικού & Ειδικός AI",
      "Έχω συνεργαστεί με εταιρείες τεχνολογίας σε ψηφιακά προϊόντα και στην εφαρμογή τεχνητής νοημοσύνης. Σήμερα συνδυάζω τον σχεδιασμό, το περιεχόμενο και την τεχνολογία, ώστε κάθε επιχείρηση να αποκτήσει μια ιστοσελίδα με τον δικό της χαρακτήρα.",
      "Ξεκινώ γνωρίζοντας την επιχείρηση και τους ανθρώπους πίσω από αυτήν. Θέλω να καταλάβω τι σας ξεχωρίζει και πώς θέλετε να παρουσιάζεστε. Έτσι επιλέγω τις λέξεις, τα χρώματα και τις λεπτομέρειες που σας εκφράζουν.",
    ],
    [
      "Tom B.",
      "Τεχνικός Διευθυντής & Ειδικός SEO",
      "Το υπόβαθρό μου είναι στην ανάπτυξη λογισμικού, στους αυτοματισμούς και στη διασύνδεση συστημάτων. Σήμερα εστιάζω στη δημιουργία ιστοσελίδων που είναι εύχρηστες και κατανοητές από τις μηχανές αναζήτησης, με ιδιαίτερη προσοχή στην ταχύτητα, στη δομή και στο περιεχόμενο.",
      "Ξεκινώ κατανοώντας τι αναζητούν οι πελάτες σας στο Google και πώς περιγράφουν την υπηρεσία που χρειάζονται. Στη συνέχεια δουλεύω πάνω στη δομή των σελίδων, στις επικεφαλίδες και στο περιεχόμενο, για να βοηθήσω τους κατάλληλους ανθρώπους να βρουν την επιχείρησή σας και να καταλάβουν τι προσφέρετε.",
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
      <img
        className="team-profile-photo"
        src={image}
        alt={name}
        width={image === images[0] ? 859 : 880}
        height={1280}
        loading="lazy"
      />
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
