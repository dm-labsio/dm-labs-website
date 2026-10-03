import "@/styles/legal.css";
/* D&M LABS - Πολιτική Cookies (Συμμόρφωση GDPR) */
import { Link } from "wouter";


import { useSEO } from "@/hooks/useSEO";

export default function CookiePolicyEl() {
  // No canonicalPath override — useSEO derives canonical from the current route.
  // /el/cookies/ self-canonicalises to https://dm-labs.io/el/cookies/
  // /el/cookie-policy/ 301s to /el/cookies/ at the server level
  useSEO({
    title: "Πολιτική cookies | DM-Labs.io",
    description: "Ποια cookies χρησιμοποιεί η ιστοσελίδα, για ποιο λόγο και πώς μπορείτε να αλλάξετε τις ρυθμίσεις σας, σύμφωνα με τον GDPR.",
  });

  return (
    <div className="legal-document">
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10">
          <Link href="/el/" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8">

            Επιστροφή στην Αρχική
          </Link>
          <div className="text-center">
            <div>
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Νομικά</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Πολιτική Cookies</h1>
              <p className="text-sm text-[#5B6472]">Τελευταία ενημέρωση: 30 Σεπτεμβρίου 2026</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <div>
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
                <p className="mt-3">Η αυτόματη εμφάνιση νομίσματος χρησιμοποιεί την εκτιμώμενη χώρα που παρέχει ο πάροχος φιλοξενίας μας. Δεν τοποθετεί ούτε διαβάζει cookies νομίσματος, δεν αποθηκεύει προτίμηση νομίσματος στην τοπική αποθήκευση ή στην αποθήκευση συνεδρίας και δεν ενεργοποιεί αναλυτικά στοιχεία. Η απόρριψη αναλυτικών στοιχείων δεν απενεργοποιεί αυτή τη λειτουργία. Η Πολιτική Απορρήτου εξηγεί τον προσδιορισμό της χώρας και τα δικαιώματά σας σχετικά με τα προσωπικά δεδομένα.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">3. Τύποι Cookies που Χρησιμοποιούμε</h2>
                <div className="overflow-x-auto mt-4" role="region" aria-label="Στοιχεία cookies" tabIndex={0}>
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
                        <td className="py-3 pr-4">Αποθηκεύει την επιλογή συγκατάθεσης στο local storage του browser</td>
                        <td className="py-3">Μόνιμο</td>
                      </tr>
                      <tr className="border-b border-[#E2E5EA]/50">
                        <td className="py-3 pr-4 font-mono text-xs">ph_*</td>
                        <td className="py-3 pr-4">Ανάλυση</td>
                        <td className="py-3 pr-4">PostHog για αναλυτικά στοιχεία, καταγραφή συνεδριών και παρακολούθηση σφαλμάτων (φορτώνεται μόνο με συγκατάθεση)</td>
                        <td className="py-3">12 μήνες</td>
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
                  <li>Έχουν απενεργοποιημένη τη συλλογή διεύθυνσης IP στο PostHog από τη ρύθμιση του site</li>
                  <li>Δεν μοιράζονται δεδομένα με τρίτους διαφημιστές</li>
                </ul>
                <p className="mt-3">Μπορείτε να αποσύρετε τη συγκατάθεση από τις Ρυθμίσεις cookies στο υποσέλιδο, επιλέγοντας Απόρριψη. Σταματά η περαιτέρω ανάλυση και καταγραφή συνεδριών. Επικοινωνήστε μαζί μας και για διαγραφή δεδομένων που έχουν ήδη συλλεχθεί.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">6. Cookies Τρίτων</h2>
                <p>Δεν χρησιμοποιούμε cookies διαφήμισης τρίτων. Οι υπηρεσίες τρίτων που χρησιμοποιεί το site περιλαμβάνουν:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li><strong className="text-[#111315]">PostHog (EU):</strong> Ο πάροχός μας για αναλυτικά στοιχεία, καταγραφή συνεδριών και παρακολούθηση σφαλμάτων. Φορτώνεται μόνο αφού συναινέσετε στα analytics cookies.</li>
                  <li><strong className="text-[#111315]">Vercel Web Analytics:</strong> Ανάλυση χρήσης χωρίς cookies, ενεργή μόνο με συγκατάθεση analytics.</li><li><strong className="text-[#111315]">Google Maps και εξωτερικά πολυμέσα:</strong> Οι ενσωματωμένοι χάρτες και τα αρχεία σε εξωτερικούς servers μπορεί να διαβιβάσουν τεχνικά στοιχεία σύνδεσης κατά τη φόρτωσή τους.</li><li><strong className="text-[#111315]">Web3Forms:</strong> Ο πάροχος της φόρμας επικοινωνίας μας, που λαμβάνει τα στοιχεία που συμπληρώνετε όταν στέλνετε ένα αίτημα.</li>
                  <li><strong className="text-[#111315]">WhatsApp:</strong> Το αιωρούμενο widget WhatsApp συνδέεται με εξωτερική σελίδα WhatsApp και δεν ορίζει cookies στην ιστοσελίδα μας.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">7. Διαχείριση Προτιμήσεων Cookies</h2>
                <p className="mb-3">Μπορείτε να διαχειριστείτε τα cookies με τους ακόλουθους τρόπους:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Banner cookies:</strong> Κατά την πρώτη επίσκεψή σας στην ιστοσελίδα μας, ένα banner cookies σάς επιτρέπει να αποδεχτείτε όλα τα cookies, να απορρίψετε τα μη απαραίτητα ή να προσαρμόσετε τις προτιμήσεις σας.</li>
                  <li><strong className="text-[#111315]">Ρυθμίσεις προγράμματος περιήγησης:</strong> Τα περισσότερα προγράμματα περιήγησης σάς επιτρέπουν να προβάλλετε, να διαχειρίζεστε και να διαγράφετε cookies. Σημειώστε ότι η απενεργοποίηση απαραίτητων cookies ενδέχεται να επηρεάσει τη λειτουργικότητα της ιστοσελίδας.</li>
                  <li><strong className="text-[#111315]">Επαναφορά προτιμήσεων:</strong> Ανοίξτε τις Ρυθμίσεις cookies στο υποσέλιδο για αλλαγή επιλογής. Η προτίμηση αποθηκεύεται σε local storage, οπότε μόνο η διαγραφή cookies μπορεί να μην την επαναφέρει.</li>
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
                <p className="mt-3">Για περισσότερες πληροφορίες σχετικά με τα δικαιώματά σας για την προστασία δεδομένων, δείτε την <Link href="/el/privacy/" className="text-[#5B8CFF] hover:underline">Πολιτική Απορρήτου</Link>.</p>
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
              <Link href="/el/privacy/" className="text-sm text-[#5B8CFF] hover:underline">Πολιτική Απορρήτου</Link>
              <Link href="/el/terms/" className="text-sm text-[#5B8CFF] hover:underline">Όροι Χρήσης</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
