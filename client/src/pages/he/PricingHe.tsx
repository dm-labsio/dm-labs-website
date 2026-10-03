import { useSEO } from "@/hooks/useSEO";
import PricingPage from "@/components/pricing/PricingPage";

export default function PricingHe() {
  useSEO({
    title: "כמה עולה לבנות אתר? מחירים ברורים | DM-Labs.io",
    description: "כמה עולה אתר לעסק? כאן תמצאו את כל החבילות והמחירים, מה כלול בכל אחת וכמה עולים אחסון ותחזוקה. בלי אותיות קטנות.",
    ogLocale: "he_IL",
    noindex: true,
  });
  return <PricingPage key="he" locale="he" />;
}
