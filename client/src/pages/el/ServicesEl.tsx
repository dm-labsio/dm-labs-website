import { useSEO } from "@/hooks/useSEO";
import ServicesPage from "@/components/studio/ServicesPage";

export default function ServicesEl() {
  useSEO({
    title: "Υπηρεσίες κατασκευής ιστοσελίδων | DM-Labs.io",
    description: "Όλα όσα χρειάζεται η ιστοσελίδα σας σε ένα σημείο: σχεδιασμός στα μέτρα σας, προσαρμογή σε κινητά, SEO, ταχύτητα, ασφάλεια και συντήρηση.",
  });
  return <ServicesPage locale="el" />;
}
