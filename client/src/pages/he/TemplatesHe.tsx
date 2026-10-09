import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function TemplatesHe() {
  useSEO({
    title: "העבודות שלנו | אתרי הדגמה | DM-Labs.io",
    description:
      "אתרי הדגמה של מסעדות, סלונים, מרפאות, אירוח ואדריכלות ועוד. תגללו, תלחצו ותראו איך האתר של העסק שלכם יכול להיראות.",
    canonicalPath: "/he/templates/",
    ogLocale: "he_IL",
    noindex: true,
  });
  return <OurWorkPage locale="he" />;
}
