import ContactPage from "@/components/contact/ContactPage";
import { CONTACT_COPY } from "@/components/contact/contactCopy";
import { useSEO } from "@/hooks/useSEO";

export default function Contact() {
  useSEO({ title: CONTACT_COPY.en.title, description: CONTACT_COPY.en.description,
  });
  return <ContactPage locale="en" />;
}
