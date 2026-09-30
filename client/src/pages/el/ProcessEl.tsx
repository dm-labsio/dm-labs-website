import { useSEO } from "@/hooks/useSEO";
import ProcessPage from "@/components/studio/ProcessPage";

export default function ProcessEl() {
  useSEO({
    title: "Η Διαδικασία μας | Πώς Κατασκευάζουμε Ιστοσελίδες | DM-Labs.io",
    description: "Από τη δωρεάν κλήση γνωριμίας μέχρι τη δημοσίευση και τη συνεχή φροντίδα. Πέντε βήματα, με χρονοδιάγραμμα που συμφωνούμε για το έργο σας.",
  });
  return <ProcessPage locale="el" />;
}
