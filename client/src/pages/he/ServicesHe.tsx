import { useSEO } from "@/hooks/useSEO";
import ServicesPage from "@/components/studio/ServicesPage";

export default function ServicesHe() {
  useSEO({ title: "שירותי בניית ועיצוב אתרים לעסקים | DM-Labs.io", description: "כל מה שהאתר שלכם צריך במקום אחד: עיצוב בהתאמה אישית, התאמה למובייל, קידום אורגני, מהירות טעינה, אבטחה ותחזוקה. אתם מתעסקים בעסק, ואנחנו בכל השאר.", ogLocale: "he_IL", noindex: true });
  return <ServicesPage locale="he" />;
}
