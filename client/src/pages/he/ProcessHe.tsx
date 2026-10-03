import { useSEO } from "@/hooks/useSEO";
import ProcessPage from "@/components/studio/ProcessPage";

export default function ProcessHe() {
  useSEO({ title: "תהליך בניית אתר: איך זה עובד אצלנו | DM-Labs.io", description: "משיחת היכרות בחינם ועד שהאתר באוויר: חמישה שלבים ברורים, לוח זמנים שמסכמים מראש, ותמיד יודעים מה השלב הבא.", ogLocale: "he_IL", noindex: true });
  return <ProcessPage locale="he" />;
}
