import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function TemplatesEl() {
  useSEO({
    title: "Η δουλειά μας | Ιστοσελίδες, Branding & Βίντεο | DM-Labs.io",
    description:
      "Δείτε ιστοσελίδες, εταιρικές ταυτότητες και διαφημιστικά βίντεο από τη DM-Labs.io. Ανακαλύψτε brand films, reels και καμπάνιες για Hartley, AWAY και Sunday Boat.",
    canonicalPath: "/el/templates/",
  });
  return <OurWorkPage locale="el" />;
}
