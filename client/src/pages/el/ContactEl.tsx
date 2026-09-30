import ContactPage from "@/components/contact/ContactPage";
import { CONTACT_COPY } from "@/components/contact/contactCopy";
import { useSEO } from "@/hooks/useSEO";

export default function ContactEl() {
  useSEO({ title: CONTACT_COPY.el.title, description: CONTACT_COPY.el.description,
  });
  return <ContactPage locale="el" />;
}
