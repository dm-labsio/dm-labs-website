import type { WorkLocale } from "./workData";
const text = (
  en: string,
  el: string,
  he: string
): Record<WorkLocale, string> => ({ en, el, he });
export const brandingCopy = {
  title: text("Branding", "Σχεδιασμός ταυτότητας", "מיתוג"),
  intro: text(
    "A whole world, built around a brand.",
    "Ένας ολόκληρος κόσμος γύρω από ένα brand.",
    "עולם שלם סביב מותג."
  ),
  open: text(
    "Explore the identity",
    "Εξερευνήστε την ταυτότητα",
    "לגלות את המותג"
  ),
  close: text("Close project", "Κλείσιμο έργου", "סגירת הפרויקט"),
  back: text("Back to Our Work", "Πίσω στη δουλειά μας", "בחזרה לעבודות שלנו"),
  identity: text("The identity", "Η ταυτότητα", "זהות המותג"),
  palette: text("Colour palette", "Χρωματική παλέτα", "פלטת צבעים"),
  typography: text("Typography", "Τυπογραφία", "טיפוגרפיה"),
  details: text("A language of its own.", "Μια δική του γλώσσα.", "שפה משלו."),
  applications: text(
    "Out in the world.",
    "Στον πραγματικό κόσμο.",
    "המותג פוגש את העולם."
  ),
  next: text("Next identity", "Επόμενη ταυτότητα", "המותג הבא"),
  see: text(
    "Choose a brand to explore.",
    "Επιλέξτε ένα brand για να το εξερευνήσετε.",
    "בחרו מותג וגלו את העולם שלו."
  ),
};
export const brandProjects = [
  {
    id: "hartley",
    name: "Hartley",
    category: "cafe",
    cover: "collection",
    stack: ["poster", "bag"],
    logo: "/media/branding/hartley/logo.svg",
    symbol: "/media/branding/hartley/dog.webp",
    background: "#faf7f2",
    ink: "#082438",
    accent: "#ddb8ad",
    colors: ["#082438", "#DDB8AD", "#899ACA", "#FAF7F2"],
    display: "Rubik",
    body: "Jost",
    typeClass: "hartley",
    sample: "Your usual.\nAnything but ordinary.",
    title: text(
      "A familiar face. A character of its own.",
      "Ένα γνώριμο πρόσωπο. Ένας ξεχωριστός χαρακτήρας.",
      "פנים מוכרות. אופי משלו."
    ),
    story: text(
      "An English café identity with a little eccentricity. A confident wordmark, an illustrated dog and periwinkle botanicals carry the same welcoming character from the shopfront to the takeaway bag.",
      "Μια ταυτότητα αγγλικού καφέ με λίγη εκκεντρικότητα. Το λογότυπο, ο εικονογραφημένος σκύλος και τα άνθη βίνκας μεταφέρουν τον ίδιο φιλόξενο χαρακτήρα από την πρόσοψη μέχρι τη σακούλα πακέτου.",
      "זהות לבית קפה אנגלי עם טוויסט קטן. לוגו מלא נוכחות, כלב מאויר ופרחי וינקה יוצרים אופי מזמין, מחזית בית הקפה ועד לשקית הטייק אוויי."
    ),
    scope: text(
      "Visual identity · Illustration · Packaging · Print",
      "Οπτική ταυτότητα · Εικονογράφηση · Συσκευασία · Έντυπα",
      "זהות חזותית · איור · אריזות · דפוס"
    ),
    detail: "botanical",
    images: [
      [
        "sleeve",
        text(
          "A morning ritual, wrapped.",
          "Το πρωινό τελετουργικό, σε συσκευασία.",
          "טקס בוקר, באריזה."
        ),
      ],
      [
        "bag",
        text(
          "Good company, to go.",
          "Καλή παρέα, σε πακέτο.",
          "חברה טובה, לקחת."
        ),
      ],
      [
        "loyalty",
        text("For the regulars.", "Για τους θαμώνες.", "ללקוחות הקבועים."),
      ],
      [
        "menu",
        text(
          "The afternoon tea menu.",
          "Το μενού απογευματινού τσαγιού.",
          "תפריט תה של אחר הצהריים."
        ),
      ],
      [
        "poster",
        text(
          "A little time for tea.",
          "Λίγος χρόνος για τσάι.",
          "קצת זמן לתה."
        ),
      ],
      [
        "exterior",
        text(
          "The identity, at street level.",
          "Η ταυτότητα στον δρόμο.",
          "המותג, בגובה הרחוב."
        ),
      ],
    ] as const,
  },
  {
    id: "away",
    name: "AWAY",
    category: "hospitality",
    cover: "towels",
    stack: ["poster", "label"],
    logo: "/media/branding/away/logo.svg",
    symbol: "/media/branding/away/symbol.svg",
    background: "#f7f2f0",
    ink: "#3b261c",
    accent: "#dde5ed",
    colors: ["#3B261C", "#DDE5ED", "#526785", "#F7F2F0"],
    display: "Thasadith",
    body: "Pavanam",
    typeClass: "away",
    sample: "Wildly\ncomfortable.",
    title: text(
      "Closer to nature. Considered in every detail.",
      "Πιο κοντά στη φύση. Φροντίδα σε κάθε λεπτομέρεια.",
      "קרוב לטבע. מחשבה בכל פרט."
    ),
    story: text(
      "A quiet identity for an escape into the outdoors. An architectural wordmark and tent monogram meet soft blue, warm neutrals and delicate typography. The identity follows the guest from arrival to the smallest in-room detail.",
      "Μια ήρεμη ταυτότητα για μια απόδραση στη φύση. Το αρχιτεκτονικό λογότυπο και το μονόγραμμα σκηνής συνδυάζονται με απαλό μπλε, ζεστούς ουδέτερους τόνους και λεπτή τυπογραφία. Η ταυτότητα συνοδεύει τον επισκέπτη από την άφιξη μέχρι την πιο μικρή λεπτομέρεια του δωματίου.",
      "זהות שקטה לחופשה בטבע. לוגו אדריכלי וסמל אוהל פוגשים כחול רך, גוונים חמים וטיפוגרפיה עדינה. שפה שמלווה את האורחים מהרגע שמגיעים ועד לפרט הקטן בחדר."
    ),
    scope: text(
      "Visual identity · Guest experience · Print · Campaigns",
      "Οπτική ταυτότητα · Εμπειρία φιλοξενίας · Έντυπα · Καμπάνιες",
      "זהות חזותית · חוויית אירוח · דפוס · קמפיינים"
    ),
    detail: "label",
    images: [
      [
        "welcome",
        text("The first welcome.", "Το πρώτο καλωσόρισμα.", "קבלת הפנים."),
      ],
      [
        "key",
        text(
          "A key to switching off.",
          "Το κλειδί της χαλάρωσης.",
          "המפתח להתנתק."
        ),
      ],
      [
        "ceramics",
        text(
          "The everyday objects.",
          "Τα καθημερινά αντικείμενα.",
          "החפצים של היום יום."
        ),
      ],
      [
        "amenities",
        text(
          "A consistent guest experience.",
          "Μια ενιαία εμπειρία φιλοξενίας.",
          "חוויית אירוח שלמה."
        ),
      ],
      [
        "guide",
        text(
          "A guide to slowing down.",
          "Ένας οδηγός για πιο αργούς ρυθμούς.",
          "מדריך להאטת הקצב."
        ),
      ],
      [
        "social",
        text(
          "The invitation to get away.",
          "Η πρόσκληση για απόδραση.",
          "ההזמנה לצאת לחופשה."
        ),
      ],
    ] as const,
  },
  {
    id: "sunday-boat",
    name: "Sunday Boat",
    category: "restaurant",
    cover: "bag",
    stack: ["merch", "box"],
    logo: "/media/branding/sunday-boat/logo.svg",
    symbol: "/media/branding/sunday-boat/symbol.svg",
    background: "#ffffff",
    ink: "#154cdb",
    accent: "#dce5ba",
    colors: ["#154CDB", "#FFFFFF", "#DCE5BA", "#262626"],
    display: "Big Shoulders",
    body: "Hanken Grotesk",
    typeClass: "sunday",
    sample: "COME\nHUNGRY.",
    title: text(
      "Big appetite. Even bigger personality.",
      "Μεγάλη όρεξη. Ακόμα μεγαλύτερη προσωπικότητα.",
      "תיאבון גדול. אופי עוד יותר."
    ),
    story: text(
      "A fish restaurant with Sunday energy, every day. Bold cobalt, paired fish and generous lettering create a playful identity that works across the table, the takeaway counter and the things you take home.",
      "Ένα ψαροεστιατόριο με κυριακάτικη διάθεση, κάθε μέρα. Έντονο μπλε, ζευγάρια ψαριών και πληθωρικά γράμματα δημιουργούν μια παιχνιδιάρικη ταυτότητα στο τραπέζι, στον πάγκο και σε όσα παίρνετε μαζί σας.",
      "מסעדת דגים עם אווירה של יום חופש, בכל יום. כחול קובלט, זוג דגים ואותיות מלאות נוכחות יוצרים זהות שובבה, על השולחן, בדלפק ובכל מה שלוקחים הביתה."
    ),
    scope: text(
      "Visual identity · Packaging · Tableware · Merchandise",
      "Οπτική ταυτότητα · Συσκευασία · Επιτραπέζια είδη · Προϊόντα",
      "זהות חזותית · אריזות · כלי שולחן · מרצ׳נדייז"
    ),
    detail: "wrap",
    images: [
      [
        "box",
        text(
          "A takeaway worth keeping.",
          "Μια συσκευασία που κρατάς.",
          "אריזה שכיף לשמור."
        ),
      ],
      [
        "table",
        text(
          "Set for good company.",
          "Στρωμένο για καλή παρέα.",
          "ערוך לחברה טובה."
        ),
      ],
      [
        "merch",
        text(
          "Wear the Sunday feeling.",
          "Φορέστε την κυριακάτικη διάθεση.",
          "ללבוש את האווירה."
        ),
      ],
      [
        "cap",
        text(
          "A small mark with character.",
          "Ένα μικρό σήμα με χαρακτήρα.",
          "סימן קטן עם אופי."
        ),
      ],
      [
        "tote",
        text(
          "Come hungry. Leave with something.",
          "Ελάτε πεινασμένοι. Φύγετε με κάτι.",
          "בואו רעבים. צאו עם משהו."
        ),
      ],
      [
        "exterior",
        text(
          "The brand, from the outside in.",
          "Το brand, απ’ έξω προς τα μέσα.",
          "המותג, מבפנים ומבחוץ."
        ),
      ],
    ] as const,
  },
] as const;
export type BrandProject = (typeof brandProjects)[number];
export function findBrand(id: string | null) {
  return brandProjects.find(brand => brand.id === id);
}
