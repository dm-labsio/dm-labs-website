import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function TemplatesHe() {
  useSEO({
    title: "העבודות שלנו | אתרים, מיתוג וסרטונים | DM-Labs.io",
    description:
      "גלו אתרים, זהויות מותג וסרטוני קידום של DM-Labs.io. צפו בסרטוני מותג, רילז וקמפיינים של Hartley, AWAY ו-Sunday Boat.",
    canonicalPath: "/he/templates/",
    ogLocale: "he_IL",
    noindex: true,
  });
  return <OurWorkPage locale="he" />;
}
