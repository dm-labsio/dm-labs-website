import FAQPage from "@/components/faq/FAQPage";
import { FAQ_COPY } from "@/components/faq/faqCopy";
import { useSEO } from "@/hooks/useSEO";

export default function FAQHe() {
  useSEO({ title: FAQ_COPY.he.title, description: FAQ_COPY.he.description,
    canonicalPath: "/he/faq/", ogLocale: "he_IL", noindex: true,
  });
  return <FAQPage key="he" locale="he" />;
}
