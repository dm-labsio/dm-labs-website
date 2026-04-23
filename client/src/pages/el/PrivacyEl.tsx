import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

export default function PrivacyEl() {
  useSEO({
    title: "Πολιτική Απορρήτου | D&M Labs",
    description: "Πολιτική απορρήτου της D&M Labs. Πώς συλλέγουμε και χρησιμοποιούμε τα προσωπικά σας δεδομένα.",
    canonicalPath: "/el/privacy"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <div className="container max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-extrabold text-[#111315] mb-6">Πολιτική Απορρήτου</h1>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Η D&M Labs σέβεται την ιδιωτικότητά σας. Αυτή η σελίδα εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR).
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Ποια Δεδομένα Συλλέγουμε</h2>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Συλλέγουμε μόνο τα δεδομένα που μας παρέχετε εσείς οικειοθελώς: όνομα, email, τηλέφωνο και μήνυμα όταν συμπληρώνετε τη φόρμα επικοινωνίας. Δεν συλλέγουμε δεδομένα χωρίς τη συγκατάθεσή σας.
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Πώς Χρησιμοποιούμε τα Δεδομένα σας</h2>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Τα δεδομένα σας χρησιμοποιούνται αποκλειστικά για να επικοινωνήσουμε μαζί σας σχετικά με την υπηρεσία που ζητήσατε. Δεν τα μοιραζόμαστε με τρίτους και δεν τα χρησιμοποιούμε για marketing χωρίς τη συγκατάθεσή σας.
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Επικοινωνία</h2>
        <p className="text-[#5B6472] leading-relaxed">
          Για οποιαδήποτε ερώτηση σχετικά με την πολιτική απορρήτου μας, επικοινωνήστε μαζί μας στο info@dm-labs.io.
        </p>
      </div>
    </main>
  );
}
