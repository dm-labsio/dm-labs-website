import type { HomeLocale } from "./overviewContent";

export const HOME_INTRODUCTION_MEDIA = {
  desktop: "/media/brand-refresh/v1/dm-labs-introduction-1080p-5f9cd1c3d2.mp4",
  mobile: "/media/brand-refresh/v1/dm-labs-introduction-720p-1ed099ec98.mp4",
  poster: "/media/brand-refresh/v1/dm-labs-introduction-poster.webp",
};

export const HOME_INTRODUCTION_COPY = {
  en: {
    label: "A little about us", title: "Built for you. Cared for by us.",
    play: "Watch our introduction",
    error: "The video couldn’t load. Try again or open it directly.", retry: "Try again", open: "Open video",
  },
  el: {
    label: "Λίγα λόγια για εμάς", title: "Φτιάχνουμε το site σας και μετά το προσέχουμε σαν τα μάτια μας.",
    play: "Δείτε ποιοι είμαστε",
    error: "Το βίντεο δεν φορτώθηκε. Δοκιμάστε ξανά ή ανοίξτε το απευθείας.", retry: "Δοκιμάστε ξανά", open: "Άνοιγμα βίντεο",
  },
  he: {
    label: "קצת עלינו", title: "אנחנו בונים לכם את האתר, ואחרי ההשקה שומרים עליו כמו על הבייבי שלנו.",
    play: "מכירים אותנו מקרוב",
    error: "הסרטון לא נטען. אפשר לנסות שוב או לפתוח אותו ישירות.", retry: "לנסות שוב", open: "לפתיחת הסרטון",
  },
} satisfies Record<HomeLocale, unknown>;

export function introductionSource(smallScreen: boolean, saveData = false) {
  return smallScreen || saveData ? HOME_INTRODUCTION_MEDIA.mobile : HOME_INTRODUCTION_MEDIA.desktop;
}
