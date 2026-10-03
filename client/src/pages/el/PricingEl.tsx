import { useSEO } from "@/hooks/useSEO";
import PricingPage from "@/components/pricing/PricingPage";

export default function PricingEl() {
  useSEO({ title: "Πόσο κοστίζει μια ιστοσελίδα; Τιμές κατασκευής | DM-Labs.io", description: "Τιμές κατασκευής ιστοσελίδας χωρίς ψιλά γράμματα: τα πακέτα, τι περιλαμβάνει το καθένα και πόσο κοστίζουν η φιλοξενία και η συντήρηση." });
  return <PricingPage key="el" locale="el" />;
}
