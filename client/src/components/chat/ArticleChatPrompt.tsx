import { ArrowUpRight } from "lucide-react";
import type { SiteLanguage } from "@/lib/routeLanguage";

export default function ArticleChatPrompt({
  locale,
}: {
  locale: SiteLanguage;
}) {
  const copy = {
    en: [
      "Make it useful for your business.",
      "Wondering how this applies to you? Ask a question or talk it through with us.",
      "Ask DM Labs",
    ],
    el: [
      "Κάντε το χρήσιμο για την επιχείρησή σας.",
      "Αναρωτιέστε πώς σας αφορά; Ρωτήστε μας ή συζητήστε το μαζί μας.",
      "Ρωτήστε την DM Labs",
    ],
    he: [
      "הפכו את זה לשימושי לעסק שלכם.",
      "תוהים איך זה מתאים לכם? שאלו שאלה או דברו איתנו.",
      "שאלו את DM Labs",
    ],
  }[locale];
  return (
    <section className="dm-chat-article-cta" lang={locale}>
      <div className="container">
        <div>
          <h2>{copy[0]}</h2>
          <p>{copy[1]}</p>
        </div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("dm-labs-open-guide"))}
        >
          {copy[2]}
          <ArrowUpRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
