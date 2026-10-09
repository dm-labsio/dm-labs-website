import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function TemplatesEl() {
  useSEO({
    title: "Η δουλειά μας | Ιστοσελίδες & Branding | DM-Labs.io",
    description:
      "Δείτε δείγματα ιστοσελίδων και ταυτότητες brands από τη DM-Labs.io. Ανακαλύψτε τα Hartley, AWAY και Sunday Boat μέσα από λογότυπα, εικονογραφήσεις και συσκευασίες.",
    canonicalPath: "/el/templates/",
  });
  return <OurWorkPage locale="el" />;
}
