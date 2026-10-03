import { useSEO } from "@/hooks/useSEO";
import ProcessPage from "@/components/studio/ProcessPage";

export default function ProcessEl() {
  useSEO({
    title: "Πώς κατασκευάζουμε ιστοσελίδες, βήμα βήμα | DM-Labs.io",
    description: "Από τη δωρεάν γνωριμία μέχρι να βγει η ιστοσελίδα στον αέρα: πέντε ξεκάθαρα βήματα, χρονοδιάγραμμα που συμφωνούμε από πριν, και ξέρετε πάντα τι ακολουθεί.",
  });
  return <ProcessPage locale="el" />;
}
