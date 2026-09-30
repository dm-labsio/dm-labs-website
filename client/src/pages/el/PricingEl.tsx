import { useSEO } from "@/hooks/useSEO";
import PricingPage from "@/components/pricing/PricingPage";

export default function PricingEl() {
  useSEO({ title: "Τιμές Κατασκευής Ιστοσελίδας | DM-Labs.io", description: "Πόσο κοστίζει μια ιστοσελίδα; Δείτε καθαρές τιμές web design, πακέτα ιστοσελίδας και custom scope από το DM-Labs.io." });
  return <PricingPage key="el" locale="el" />;
}
