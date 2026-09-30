import { useSEO } from "@/hooks/useSEO";
import ServicesPage from "@/components/studio/ServicesPage";

export default function ServicesEl() {
  useSEO({
    title: "Υπηρεσίες Σχεδιασμού Ιστοσελίδων | DM-Labs.io",
    description: "Επαγγελματικές υπηρεσίες web design. Custom ιστοσελίδες, mobile-first ανάπτυξη, SEO βελτιστοποίηση και συντήρηση. Γρήγορη παράδοση και προσωπική φροντίδα.",
  });
  return <ServicesPage locale="el" />;
}
