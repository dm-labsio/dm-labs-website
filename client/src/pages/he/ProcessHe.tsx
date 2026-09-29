import { useSEO } from "@/hooks/useSEO";
import ProcessPage from "@/components/studio/ProcessPage";

export default function ProcessHe() {
  useSEO({ title: "תהליך בניית אתר | DM-Labs.io", description: "משיחת היכרות ללא עלות ועד להשקה ותחזוקה שוטפת. חמישה שלבים ברורים, עם זמן בנייה משוער של 5–14 ימי עסקים.", ogLocale: "he_IL", noindex: true });
  return <ProcessPage locale="he" />;
}
