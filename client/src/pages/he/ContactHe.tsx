import ContactPage from "@/components/contact/ContactPage";
import { CONTACT_COPY } from "@/components/contact/contactCopy";
import { useSEO } from "@/hooks/useSEO";

export default function ContactHe() {
  useSEO({ title: CONTACT_COPY.he.title, description: CONTACT_COPY.he.description,
    canonicalPath: "/he/contact/", ogLocale: "he_IL", noindex: true,
  });
  return <ContactPage locale="he" />;
}
