import { useSEO } from "@/hooks/useSEO";
import OurWorkPage from "@/components/work/OurWorkPage";

export default function TemplatesEl() {
  useSEO({
    title: "Η δουλειά μας | Demo ιστοσελίδων | DM-Labs.io",
    description:
      "Demo ιστοσελίδων για εστιατόρια, σαλόνια ομορφιάς, ιατρεία, ξενοδοχεία και άλλα. Δείτε πώς θα μπορούσε να είναι και η δική σας.",
    canonicalPath: "/el/templates/",
  });
  return <OurWorkPage locale="el" />;
}
