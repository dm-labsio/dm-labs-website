/* D&M LABS - Πολιτική Cookies (Συμμόρφωση GDPR) */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { ChevronLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

export default function CookiePolicyEl() {
  useSEO({
    title: "Πολιτική Cookies | DM-Labs.io",
    description: "Πολιτική cookies της DM-Labs.io. Πώς χρησιμοποιούμε τα cookies σύμφωνα με τον GDPR.",
    canonicalPath: "/el/cookie-policy"
  });
  useHreflang();

  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10">
          <Link href="/el" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8">
            <ChevronLeft size={16} />
            Επιστροφή στην Αρχική
          </Link>
          <div className="text-center">
            <AnimateIn>
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Νομικά</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Πολιτική Cookies</h1>
              <p className="text-sm text-[#5B6472]">Τελευταία ενημέρωση: Μάρτιος 2026</p>
            </AnimateIn>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <AnimateIn>
            <div className="space-y-8 text-[#5B6472] text-sm leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">1. Τι Είναι τα Cookies</h2>
                <p>Τα cookies είναι μικρά αρχεία κειμένου που τοποθετούνται στη συσκευή σας (υπολογιστής, tablet ή κινητό τηλέφωνο) όταν επισκέπτεστε μια ιστοσελίδα. Χρησιμοποιούνται ευρέως για να κάνουν τις ιστοσελίδες να λειτουργούν αποτελεσματικότερα, καθώς και για να παρέχουν πληροφορίες στους ιδιοκτήτες της ιστοσελίδας. Τα cookies επιτρέπουν σε μια ιστοσελίδα να αναγνωρίζει τη συσκευή σας και να θυμάται ορισμένες πληροφορίες σχετικά με την επίσκεψή σας, όπως οι προτιμήσεις σας.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">2. Πώς Χρησιμοποιούμε τα Cookies</h2>
                <p>Η DM-Labs.io χρησιμοποιεί cookies για τους ακόλουθους σκοπούς:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li><strong className="text-[#111315]">Βασική λειτουργικότητα:</strong> Για να διασφαλίζεται η σωστή λειτουργία της ιστοσελίδας, συμπεριλαμβανομένης της αποθήκευσης των προτιμήσεών σας σχετικά με τα cookies.</li>
                  <li><strong className="text-[#111315]">Ανάλυση:</strong> Με τη ρητή συγκατάθεσή σας, για να κατανοούμε πώς οι επισκέπτες αλληλεπιδρούν με την ιστοσελίδα μας, ώστε να βελτιώνουμε το περιεχόμενο και την εμπειρία χρήστη.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">3. Τύποι Cookies που Χρησιμοποιούμε</h2>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2E5EA]">
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Όνομα Cookie</th>
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Τύπος</th>
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Σκοπός</th>
                        <th className="py-3 text-[#111315] font-semibold text-sm">Διάρκεια</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#E2E5EA]/50">
                        <td className="py-3 pr-4 font-mono text-xs">dm_cookie_consent</td>
                        <td className="py-3 pr-4">Απαραίτητο</td>
                        <td className="py-3 pr-4">Αποθηκεύει τις προτιμήσεις συγκατάθεσης cookies</td>
                        <td className="py-3">Μόνιμο</td>
                      </tr>
                      <tr className="border-b border-[#E2E5EA]/50">
                        <td className="py-3 pr-4 font-mono text-xs">_analytics</td>
                        <td className="py-3 pr-4">Ανάλυση</td>
                        <td className="py-3 pr-4">Παρακολουθεί προβολές σελίδων και συμπεριφορά επισκεπτών (ανωνυμοποιημένα)</td>
                        <td className="py-3">26 μήνες</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">4. Απαραίτητα Cookies</h2>
                <p>Τα απαραίτητα cookies είναι αυστηρά αναγκαία για τη λειτουργία της ιστοσελίδας. Ενεργοποιούν βασικές λειτουργίες, όπως η αποθήκευση της επιλογής συγκατάθεσης cookies. Αυτά τα cookies δεν συλλέγουν προσωπικές πληροφορίες και δεν μπορούν να απενεργοποιηθούν χωρίς να επηρεαστεί η λειτουργικότητα της ιστοσελίδας. Βάσει GDPR, τα απαραίτητα cookies δεν απαιτούν συγκατάθεση, καθώς είναι αναγκαία για την υπηρεσία που έχετε ζητήσει.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">5. Cookies Ανάλυσης</h2>
                <p>Τα cookies ανάλυσης τοποθετούνται στη συσκευή σας μόνο εάν δώσετε ρητή συγκατάθεση μέσω του banner cookies μας. Χρησιμοποιούμε αναλυτικά στοιχεία φιλικά προς την ιδιωτικότητα που:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Δεν σας παρακολουθούν σε άλλες ιστοσελίδες</li>
                  <li>Δεν δημιουργούν διαφημιστικά προφίλ</li>
                  <li>Ανωνυμοποιούν τη διεύθυνση IP σας</li>
                  <li>Δεν μοιράζονται δεδομένα με τρίτους διαφημιστές</li>
                </ul>
                <p className="mt-3">Μπορείτε να αποσύρετε τη συγκατάθεσή σας για cookies ανάλυσης ανά πάσα στιγμή, διαγράφοντας τα cookies του προγράμματος περιήγησής σας και επισκεπτόμενοι ξανά την ιστοσελίδα μας, όπου θα εμφανιστεί ξανά το banner cookies.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">6. Cookies Τρίτων</h2>
                <p>Δεν χρησιμοποιούμε cookies διαφήμισης τρίτων. Οι μόνες υπηρεσίες τρίτων που ενδέχεται να ορίσουν cookies είναι:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li><strong className="text-[#111315]">Web3Forms:</strong> Ο επεξεργαστής φόρμας επικοινωνίας μας. Το Web3Forms ενδέχεται να ορίσει απαραίτητα cookies για την αποτροπή ανεπιθύμητων υποβολών.</li>
                  <li><strong className="text-[#111315]">WhatsApp:</strong> Το αιωρούμενο widget WhatsApp συνδέεται με εξωτερική σελίδα WhatsApp και δεν ορίζει cookies στην ιστοσελίδα μας.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">7. Διαχείριση Προτιμήσεων Cookies</h2>
                <p className="mb-3">Μπορείτε να διαχειριστείτε τα cookies με τους ακόλουθους τρόπους:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Banner cookies:</strong> Κατά την πρώτη επίσκεψή σας στην ιστοσελίδα μας, ένα banner cookies σάς επιτρέπει να αποδεχτείτε όλα τα cookies, να απορρίψετε τα μη απαραίτητα ή να προσαρμόσετε τις προτιμήσεις σας.</li>
                  <li><strong className="text-[#111315]">Ρυθμίσεις προγράμματος περιήγησης:</strong> Τα περισσότερα προγράμματα περιήγησης σάς επιτρέπουν να προβάλλετε, να διαχειρίζεστε και να διαγράφετε cookies. Σημειώστε ότι η απενεργοποίηση απαραίτητων cookies ενδέχεται να επηρεάσει τη λειτουργικότητα της ιστοσελίδας.</li>
                  <li><strong className="text-[#111315]">Επαναφορά προτιμήσεων:</strong> Διαγράψτε τα cookies του προγράμματος περιήγησής σας για την ιστοσελίδα μας και το banner συγκατάθεσης θα εμφανιστεί ξανά κατά την επόμενη επίσκεψή σας.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">8. Τα Δικαιώματά σας</h2>
                <p>Βάσει GDPR, έχετε το δικαίωμα να:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Γνωρίζετε ποια cookies χρησιμοποιούνται και γιατί</li>
                  <li>Συναινείτε ή να αρνείστε τα μη απαραίτητα cookies</li>
                  <li>Αποσύρετε τη συγκατάθεσή σας ανά πάσα στιγμή</li>
                  <li>Ζητάτε τη διαγραφή δεδομένων που συλλέχθηκαν μέσω cookies</li>
                </ul>
                <p className="mt-3">Για περισσότερες πληροφορίες σχετικά με τα δικαιώματά σας για την προστασία δεδομένων, δείτε την <Link href="/el/privacy" className="text-[#5B8CFF] hover:underline">Πολιτική Απορρήτου</Link>.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">9. Αλλαγές στην Παρούσα Πολιτική</h2>
                <p>Ενδέχεται να ενημερώνουμε την παρούσα Πολιτική Cookies κατά καιρούς για να αντικατοπτρίζουμε αλλαγές στις πρακτικές μας ή για νομικούς, λειτουργικούς ή κανονιστικούς λόγους. Η ενημερωμένη έκδοση θα δημοσιεύεται σε αυτή τη σελίδα με αναθεωρημένη ημερομηνία.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">10. Επικοινωνήστε μαζί μας</h2>
                <p>Εάν έχετε ερωτήσεις σχετικά με τη χρήση cookies από εμάς, επικοινωνήστε μαζί μας στο <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a>.</p>
              </div>

            </div>
            <div className="mt-10 pt-8 border-t border-[#E2E5EA] flex gap-4">
              <Link href="/el/privacy" className="text-sm text-[#5B8CFF] hover:underline">Πολιτική Απορρήτου</Link>
              <Link href="/el/terms" className="text-sm text-[#5B8CFF] hover:underline">Όροι Χρήσης</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
