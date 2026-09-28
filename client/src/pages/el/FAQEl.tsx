import FAQPage from "@/components/faq/FAQPage";
import { FAQ_COPY } from "@/components/faq/faqCopy";
import { useSEO } from "@/hooks/useSEO";

export default function FAQEl() {
  useSEO({ title: FAQ_COPY.el.title, description: FAQ_COPY.el.description,
  });
  return <FAQPage key="el" locale="el" />;
}
