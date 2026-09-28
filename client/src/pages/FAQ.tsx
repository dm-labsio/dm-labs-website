import FAQPage from "@/components/faq/FAQPage";
import { FAQ_COPY } from "@/components/faq/faqCopy";
import { useSEO } from "@/hooks/useSEO";

export default function FAQ() {
  useSEO({ title: FAQ_COPY.en.title, description: FAQ_COPY.en.description,
  });
  return <FAQPage key="en" locale="en" />;
}
