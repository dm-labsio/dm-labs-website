import type { HomeLocale } from "./overviewContent";

export const HOME_INTRODUCTION_MEDIA = {
  desktop: "/media/brand-refresh/v1/dm-labs-introduction-1080p-5f9cd1c3d2.mp4",
  mobile: "/media/brand-refresh/v1/dm-labs-introduction-720p-1ed099ec98.mp4",
  poster: "/media/brand-refresh/v1/dm-labs-introduction-poster.webp",
};

export const HOME_INTRODUCTION_COPY = {
  en: {
    pause: "Pause",
    resume: "Play",
    replay: "Replay",
    mute: "Mute",
    unmute: "Unmute",
    volume: "Volume",
    seek: "Seek video",
    speed: "Playback speed",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit fullscreen",
    loading: "Loading video…",
    label: "A little about us",
    title: "Built for you.\nCared for by us.",
    play: "Watch our introduction",
    error: "The video couldn’t load. Try again or open it directly.",
    retry: "Try again",
    open: "Open video",
  },
  el: {
    pause: "Παύση",
    resume: "Αναπαραγωγή",
    replay: "Από την αρχή",
    mute: "Σίγαση",
    unmute: "Ενεργοποίηση ήχου",
    volume: "Ένταση",
    seek: "Θέση αναπαραγωγής",
    speed: "Ταχύτητα αναπαραγωγής",
    fullscreen: "Πλήρης οθόνη",
    exitFullscreen: "Έξοδος από πλήρη οθόνη",
    loading: "Φόρτωση βίντεο…",
    label: "Λίγα λόγια για εμάς",
    title: "Για εσάς.\nΔίπλα σας.",
    play: "Δείτε ποιοι είμαστε",
    error: "Το βίντεο δεν φορτώθηκε. Δοκιμάστε ξανά ή ανοίξτε το απευθείας.",
    retry: "Δοκιμάστε ξανά",
    open: "Άνοιγμα βίντεο",
  },
  he: {
    pause: "השהיה",
    resume: "הפעלה",
    replay: "ניגון מחדש",
    mute: "השתקה",
    unmute: "הפעלת קול",
    volume: "עוצמת קול",
    seek: "מיקום בסרטון",
    speed: "מהירות ניגון",
    fullscreen: "מסך מלא",
    exitFullscreen: "יציאה ממסך מלא",
    loading: "טוענים את הסרטון…",
    label: "קצת עלינו",
    title: "נבנה בשבילכם.\nנשארים לצידכם.",
    play: "מכירים אותנו מקרוב",
    error: "הסרטון לא נטען. אפשר לנסות שוב או לפתוח אותו ישירות.",
    retry: "לנסות שוב",
    open: "לפתיחת הסרטון",
  },
} satisfies Record<HomeLocale, unknown>;

export function introductionSource(smallScreen: boolean, saveData = false) {
  return smallScreen || saveData
    ? HOME_INTRODUCTION_MEDIA.mobile
    : HOME_INTRODUCTION_MEDIA.desktop;
}
