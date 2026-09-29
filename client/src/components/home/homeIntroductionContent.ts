import type { HomeLocale } from "./overviewContent";

export const HOME_INTRODUCTION_MEDIA = {
  desktop: "/media/brand-refresh/v1/dm-labs-introduction-1080p-5f9cd1c3d2.mp4",
  mobile: "/media/brand-refresh/v1/dm-labs-introduction-720p-1ed099ec98.mp4",
  poster: "/media/brand-refresh/v1/dm-labs-introduction-poster.webp",
};

export const HOME_INTRODUCTION_COPY = {
  en: {
    label: "A little about us", title: "Built for you. Cared for by us.",
    intro: "Your website is just the beginning. Here’s how we bring it to life — and stay by your side.",
    play: "Watch our introduction", language: "English video", duration: "31 seconds",
    summary: "Custom websites. Care after launch. A direct line to the people who know your business.",
    error: "The video couldn’t load. Try again or open it directly.", retry: "Try again", open: "Open video",
  },
  el: {
    label: "Λίγα λόγια για εμάς", title: "Φτιαγμένο για εσάς. Με τη δική μας φροντίδα.",
    intro: "Η ιστοσελίδα σας είναι μόνο η αρχή. Δείτε πώς της δίνουμε ζωή και παραμένουμε δίπλα σας.",
    play: "Δείτε ποιοι είμαστε", language: "Βίντεο στα αγγλικά", duration: "31 δευτερόλεπτα",
    summary: "Custom ιστοσελίδες. Φροντίδα μετά τη δημοσίευση. Άμεση επαφή με τους ανθρώπους που γνωρίζουν την επιχείρησή σας.",
    error: "Το βίντεο δεν φορτώθηκε. Δοκιμάστε ξανά ή ανοίξτε το απευθείας.", retry: "Δοκιμάστε ξανά", open: "Άνοιγμα βίντεο",
  },
  he: {
    label: "קצת עלינו", title: "נבנה בשבילכם. מטופל על ידינו.",
    intro: "האתר שלכם הוא רק ההתחלה. כך אנחנו בונים אותו וממשיכים להיות לצדכם.",
    play: "מכירים אותנו מקרוב", language: "סרטון באנגלית", duration: "31 שניות",
    summary: "אתר בעיצוב אישי. טיפול גם אחרי ההשקה. קשר ישיר עם האנשים שמכירים את העסק שלכם.",
    error: "הסרטון לא נטען. אפשר לנסות שוב או לפתוח אותו ישירות.", retry: "לנסות שוב", open: "לפתיחת הסרטון",
  },
} satisfies Record<HomeLocale, unknown>;

export function introductionSource(smallScreen: boolean, saveData = false) {
  return smallScreen || saveData ? HOME_INTRODUCTION_MEDIA.mobile : HOME_INTRODUCTION_MEDIA.desktop;
}
