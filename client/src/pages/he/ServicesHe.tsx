import { useSEO } from "@/hooks/useSEO";
import ServicesPage from "@/components/studio/ServicesPage";

export default function ServicesHe() {
  useSEO({ title: "שירותי עיצוב אתרים לעסקים | DM-Labs.io", description: "עיצוב מרשים, פיתוח מהיר, יסודות SEO ותחזוקה שוטפת. אתרים שבונים אמון ויוצרים דרך ברורה לפנייה.", ogLocale: "he_IL", noindex: true });
  return <ServicesPage locale="he" />;
}
