import { useSEO } from "@/hooks/useSEO";
import PricingPage from "@/components/pricing/PricingPage";

export default function PricingHe() {
  useSEO({
    title: "מחירי עיצוב אתרים | DM-Labs.io",
    description: "השוו חבילות אתר ותוכניות אירוח ותחזוקה של DM-Labs.io. היקף ברור, חיוב שקוף ואפשרויות מותאמות לעסקים בצמיחה.",
    ogLocale: "he_IL",
    noindex: true,
  });
  return <PricingPage key="he" locale="he" />;
}
