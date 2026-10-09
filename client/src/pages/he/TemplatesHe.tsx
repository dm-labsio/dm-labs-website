import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function TemplatesHe() {
  useSEO({
    title: "העבודות שלנו | עיצוב אתרים ומיתוג | DM-Labs.io",
    description:
      "גלו אתרי הדגמה וזהויות מותג של DM-Labs.io. הכירו את Hartley, AWAY ו-Sunday Boat דרך לוגואים, איורים, אריזות ועוד.",
    canonicalPath: "/he/templates/",
    ogLocale: "he_IL",
    noindex: true,
  });
  return <OurWorkPage locale="he" />;
}
