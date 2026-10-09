import type { WorkLocale } from "./workData";
const text = (
  en: string,
  el: string,
  he: string
): Record<WorkLocale, string> => ({ en, el, he });
export const filmCopy = {
  title: text(
    "Brand & promotional videos",
    "Βίντεο για brands & καμπάνιες",
    "סרטוני מותג וקמפיינים"
  ),
  intro: text(
    "Brand stories, social reels and campaigns. Your identity, set in motion.",
    "Ιστορίες brands, reels και καμπάνιες. Η ταυτότητά σας σε κίνηση.",
    "סיפורי מותג, רילז וקמפיינים. הזהות שלכם בתנועה."
  ),
  watch: text("Watch the films", "Δείτε τα βίντεο", "לצפייה בסרטונים"),
  close: text("Close video", "Κλείσιμο βίντεο", "סגירת הסרטון"),
  choose: text("Choose a video", "Επιλέξτε βίντεο", "בחירת סרטון"),
  portrait: text("Portrait", "Κάθετο", "אנכי"),
  landscape: text("Landscape", "Οριζόντιο", "אופקי"),
  contact: text(
    "Let’s make yours",
    "Ας φτιάξουμε το δικό σας",
    "בואו ניצור את שלכם"
  ),
  error: text(
    "This video couldn’t load. Try again.",
    "Το βίντεο δεν φορτώθηκε. Δοκιμάστε ξανά.",
    "הסרטון לא נטען. נסו שוב."
  ),
  retry: text("Try again", "Δοκιμή ξανά", "ניסיון נוסף"),
};
export type FilmClip = {
  id: string;
  title: Record<WorkLocale, string>;
  duration: number;
  width: number;
  height: number;
};
export type FilmProject = {
  id: string;
  name: string;
  category: Record<WorkLocale, string>;
  description: Record<WorkLocale, string>;
  formats: Record<WorkLocale, string>;
  clips: FilmClip[];
};
export const filmProjects: FilmProject[] = [
  {
    id: "sunday-boat",
    name: "Sunday Boat",
    category: text(
      "Brand films & menu reels",
      "Ταυτότητα & reels μενού",
      "סרטוני מותג ורילז לתפריט"
    ),
    description: text(
      "Bold type, a playful fish and a menu with personality. A brand identity film and a social reel, each with its own rhythm.",
      "Έντονη τυπογραφία, παιχνιδιάρικα ψάρια και ένα μενού με χαρακτήρα. Ένα βίντεο ταυτότητας και ένα reel, το καθένα με τον δικό του ρυθμό.",
      "טיפוגרפיה בולטת, דג שובב ותפריט עם אופי. סרטון זהות מותג וריל לרשתות, כל אחד בקצב שלו."
    ),
    formats: text(
      "Social + widescreen",
      "Κάθετο + οριζόντιο",
      "לרשתות ולמסך רחב"
    ),
    clips: [
      {
        id: "sunday-portrait",
        title: text("Come hungry", "Ελάτε πεινασμένοι", "בואו רעבים"),
        duration: 19.29,
        width: 1080,
        height: 1920,
      },
      {
        id: "sunday-landscape",
        title: text(
          "A brand in motion",
          "Μια ταυτότητα σε κίνηση",
          "מותג בתנועה"
        ),
        duration: 30,
        width: 1920,
        height: 1080,
      },
    ],
  },
  {
    id: "hartley",
    name: "Hartley",
    category: text("Brand story", "Ιστορία του brand", "סיפור מותג"),
    description: text(
      "From the first mark to the first coffee. An editorial reel bringing the café’s identity, details and atmosphere together.",
      "Από το πρώτο σήμα στον πρώτο καφέ. Ένα reel που συνδυάζει την ταυτότητα, τις λεπτομέρειες και την ατμόσφαιρα του café.",
      "מהסימן הראשון ועד הקפה הראשון. ריל שמחבר את הזהות, הפרטים והאווירה של בית הקפה."
    ),
    formats: text("Social reel", "Reel για social media", "ריל לרשתות"),
    clips: [
      {
        id: "hartley",
        title: text(
          "Meet Hartley",
          "Γνωρίστε το Hartley",
          "נעים להכיר, Hartley"
        ),
        duration: 48.53,
        width: 720,
        height: 1280,
      },
    ],
  },
  {
    id: "away",
    name: "AWAY",
    category: text(
      "Hospitality films",
      "Βίντεο φιλοξενίας",
      "סרטונים למותגי אירוח"
    ),
    description: text(
      "A feel for the place before you arrive. Two edits that bring the suites, scenery and slower moments into focus.",
      "Η αίσθηση του τόπου, πριν φτάσετε. Δύο εκδοχές με σουίτες, τοπία και στιγμές χαλάρωσης.",
      "להרגיש את המקום עוד לפני שמגיעים. שתי גרסאות שמציגות את הסוויטות, הנוף והרגעים השקטים."
    ),
    formats: text(
      "Social + widescreen",
      "Κάθετο + οριζόντιο",
      "לרשתות ולמסך רחב"
    ),
    clips: [
      {
        id: "away-portrait",
        title: text("Wildly comfortable", "Άνεση στη φύση", "נוחות בטבע"),
        duration: 15,
        width: 1080,
        height: 1920,
      },
      {
        id: "away-landscape",
        title: text(
          "The great outside",
          "Στην αγκαλιά της φύσης",
          "בחוץ, בטבע"
        ),
        duration: 15,
        width: 1920,
        height: 1080,
      },
    ],
  },
  {
    id: "dm-labs",
    name: "DM Labs",
    category: text(
      "Promotional campaign",
      "Διαφημιστική καμπάνια",
      "קמפיין קידום מכירות"
    ),
    description: text(
      "One Halloween offer, three creative directions. Short promotional spots with character, movement and a clear call to action.",
      "Μία προσφορά Halloween, τρεις δημιουργικές ιδέες. Σύντομα διαφημιστικά με χαρακτήρα, κίνηση και ξεκάθαρο μήνυμα.",
      "מבצע Halloween אחד, שלושה כיוונים יצירתיים. סרטוני קידום קצרים עם אופי, תנועה וקריאה ברורה לפעולה."
    ),
    formats: text(
      "Three campaign reels",
      "Τρία reels καμπάνιας",
      "שלושה סרטוני קמפיין"
    ),
    clips: [
      {
        id: "dm-boo",
        title: text("Boo!", "Boo!", "בו!"),
        duration: 12.6,
        width: 1080,
        height: 1920,
      },
      {
        id: "dm-treat",
        title: text("Trick or treat", "Trick or treat", "תעלול או ממתק"),
        duration: 14.2,
        width: 1080,
        height: 1920,
      },
      {
        id: "dm-scarier",
        title: text(
          "Scarier than Halloween",
          "Πιο τρομακτικό από το Halloween",
          "מפחיד יותר מ-Halloween"
        ),
        duration: 16.8,
        width: 1080,
        height: 1920,
      },
    ],
  },
];
export const filmSource = (clip: FilmClip) =>
  `/media/work-films/${clip.id}.mp4`;
export const filmPoster = (clip: FilmClip) =>
  `/media/work-films/${clip.id}.webp`;
export const filmDuration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
export const filmFormat = (clip: FilmClip, locale: WorkLocale) =>
  `${clip.width > clip.height ? filmCopy.landscape[locale] : filmCopy.portrait[locale]} · ${clip.width > clip.height ? "16:9" : "9:16"}`;
