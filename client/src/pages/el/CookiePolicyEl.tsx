import ChatPrivacyNote from "@/components/chat/ChatPrivacyNote";
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

            Επιστροφή στην αρχική σελίδα
          </Link>
          <div className="text-center">
            <div>
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Νομικά</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Πολιτική cookies</h1>
              <p className="text-sm text-[#5B6472]">Τελευταία ενημέρωση: 6 Οκτωβρίου 2026</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <div>
            <div className="space-y-8 text-[#5B6472] text-sm leading-relaxed">
              <ChatPrivacyNote locale="el" />

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">1. Τι είναι τα cookies</h2>
                <p>Τα cookies είναι μικρά αρχεία κειμένου που τοποθετούνται στη συσκευή σας (υπολογιστής, tablet ή κινητό τηλέφωνο) όταν επισκέπτεστε μια ιστοσελίδα. Χρησιμοποιούνται ευρέως για να λειτουργούν οι ιστοσελίδες πιο αποτελεσματικά, αλλά και για να δίνουν πληροφορίες στους ιδιοκτήτες τους. Τα cookies επιτρέπουν σε μια ιστοσελίδα να αναγνωρίζει τη συσκευή σας και να θυμάται ορισμένες πληροφορίες σχετικά με την επίσκεψή σας, όπως οι προτιμήσεις σας.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">2. Πώς χρησιμοποιούμε τα cookies</h2>
                <p>Η DM-Labs.io χρησιμοποιεί cookies για τους ακόλουθους σκοπούς:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li><strong className="text-[#111315]">Βασική λειτουργικότητα:</strong> Για να διασφαλίζεται η σωστή λειτουργία της ιστοσελίδας, συμπεριλαμβανομένης της αποθήκευσης των προτιμήσεών σας σχετικά με τα cookies.</li>
                  <li><strong className="text-[#111315]">Ανάλυση:</strong> Με τη ρητή συγκατάθεσή σας, για να καταλαβαίνουμε πώς χρησιμοποιούν οι επισκέπτες την ιστοσελίδα μας και να βελτιώνουμε το περιεχόμενο και την εμπειρία τους.</li>
                </ul>
                <p className="mt-3">Η αυτόματη εμφάνιση νομίσματος χρησιμοποιεί την εκτιμώμενη χώρα που παρέχει ο πάροχος φιλοξενίας μας. Δεν τοποθετεί ούτε διαβάζει cookies νομίσματος, δεν αποθηκεύει προτίμηση νομίσματος στην τοπική αποθήκευση (local storage) ή στην αποθήκευση συνεδρίας (session storage) και δεν ενεργοποιεί την ανάλυση επισκεψιμότητας. Αν απορρίψετε την ανάλυση, η λειτουργία αυτή εξακολουθεί να δουλεύει. Η πολιτική απορρήτου εξηγεί τον προσδιορισμό της χώρας και τα δικαιώματά σας σχετικά με τα προσωπικά δεδομένα.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">3. Ποια cookies χρησιμοποιούμε</h2>
                <div className="overflow-x-auto mt-4" role="region" aria-label="Στοιχεία cookies" tabIndex={0}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2E5EA]">
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Όνομα cookie</th>
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Τύπος</th>
                        <th className="py-3 pr-4 text-[#111315] font-semibold text-sm">Σκοπός</th>
                        <th className="py-3 text-[#111315] font-semibold text-sm">Διάρκεια</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#E2E5EA]/50">
                        <td className="py-3 pr-4 font-mono text-xs">dm_cookie_consent</td>
                        <td className="py-3 pr-4">Απαραίτητο</td>
                        <td className="py-3 pr-4">Αποθηκεύει την επιλογή σας στην τοπική αποθήκευση (local storage) του προγράμματος περιήγησης</td>
                        <td className="py-3">Μόνιμο</td>
                      </tr>
                      <tr className="border-b border-[#E2E5EA]/50">
                        <td className="py-3 pr-4 font-mono text-xs">ph_*</td>
                        <td className="py-3 pr-4">Ανάλυση</td>
                        <td className="py-3 pr-4">PostHog για ανάλυση επισκεψιμότητας, καταγραφή συνεδριών και παρακολούθηση σφαλμάτων (φορτώνεται μόνο με συγκατάθεση)</td>
                        <td className="py-3">12 μήνες</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">4. Απαραίτητα cookies</h2>
                <p>Τα απαραίτητα cookies είναι αυστηρά αναγκαία για τη λειτουργία της ιστοσελίδας. Ενεργοποιούν βασικές λειτουργίες, όπως η αποθήκευση της επιλογής συγκατάθεσης cookies. Αυτά τα cookies δεν συλλέγουν προσωπικές πληροφορίες και δεν μπορούν να απενεργοποιηθούν χωρίς να επηρεαστεί η λειτουργικότητα της ιστοσελίδας. Σύμφωνα με τον GDPR, τα απαραίτητα cookies δεν απαιτούν συγκατάθεση, καθώς είναι αναγκαία για την υπηρεσία που έχετε ζητήσει.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">5. Cookies ανάλυσης</h2>
                <p>Τα cookies ανάλυσης τοποθετούνται στη συσκευή σας μόνο εάν δώσετε ρητή συγκατάθεση μέσω του banner για τα cookies. Χρησιμοποιούμε εργαλεία ανάλυσης που σέβονται την ιδιωτικότητα και:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Δεν σας παρακολουθούν σε άλλες ιστοσελίδες</li>
                  <li>Δεν δημιουργούν διαφημιστικά προφίλ</li>
                  <li>Έχουν απενεργοποιημένη, στις ρυθμίσεις της ιστοσελίδας, τη συλλογή διευθύνσεων IP στο PostHog</li>
                  <li>Δεν μοιράζονται δεδομένα με τρίτους διαφημιστές</li>
                </ul>
                <p className="mt-3">Μπορείτε να ανακαλέσετε τη συγκατάθεσή σας οποιαδήποτε στιγμή: ανοίξτε τις «Ρυθμίσεις cookies» στο κάτω μέρος της σελίδας και επιλέξτε «Απόρριψη». Έτσι σταματά κάθε περαιτέρω ανάλυση και καταγραφή συνεδριών. Αν θέλετε να διαγραφούν και τα δεδομένα που έχουν ήδη συλλεχθεί, επικοινωνήστε μαζί μας.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">6. Cookies τρίτων</h2>
                <p>Δεν χρησιμοποιούμε cookies διαφήμισης τρίτων. Οι υπηρεσίες τρίτων που χρησιμοποιεί η ιστοσελίδα είναι:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li><strong className="text-[#111315]">PostHog (EU):</strong> Ο πάροχός μας για ανάλυση επισκεψιμότητας, καταγραφή συνεδριών και παρακολούθηση σφαλμάτων. Φορτώνεται μόνο αφού συναινέσετε στα cookies ανάλυσης.</li>
                  <li><strong className="text-[#111315]">Vercel Web Analytics:</strong> Ανάλυση της χρήσης χωρίς cookies, που ενεργοποιείται εδώ μόνο αν συναινέσετε στην ανάλυση.</li><li><strong className="text-[#111315]">Google Maps και εξωτερικά πολυμέσα:</strong> Οι πάροχοι των ενσωματωμένων χαρτών και των αρχείων από εξωτερικές πηγές μπορεί να λαμβάνουν τεχνικά στοιχεία σύνδεσης όταν αυτά φορτώνουν.</li><li><strong className="text-[#111315]">Web3Forms:</strong> Ο πάροχος της φόρμας επικοινωνίας μας, που λαμβάνει τα στοιχεία που συμπληρώνετε όταν στέλνετε ένα αίτημα.</li>
                  <li><strong className="text-[#111315]">WhatsApp:</strong> Το αιωρούμενο κουμπί WhatsApp οδηγεί σε εξωτερική σελίδα του WhatsApp και δεν τοποθετεί cookies στην ιστοσελίδα μας.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">7. Διαχείριση των προτιμήσεών σας</h2>
                <p className="mb-3">Μπορείτε να διαχειριστείτε τα cookies με τους ακόλουθους τρόπους:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Banner για τα cookies:</strong> Στην πρώτη σας επίσκεψη, το banner για τα cookies σάς επιτρέπει να αποδεχτείτε όλα τα cookies, να απορρίψετε τα μη απαραίτητα ή να προσαρμόσετε τις προτιμήσεις σας.</li>
                  <li><strong className="text-[#111315]">Ρυθμίσεις προγράμματος περιήγησης:</strong> Τα περισσότερα προγράμματα περιήγησης σάς επιτρέπουν να προβάλλετε, να διαχειρίζεστε και να διαγράφετε cookies. Σημειώστε ότι η απενεργοποίηση απαραίτητων cookies ενδέχεται να επηρεάσει τη λειτουργικότητα της ιστοσελίδας.</li>
                  <li><strong className="text-[#111315]">Επαναφορά προτιμήσεων:</strong> Ανοίξτε τις «Ρυθμίσεις cookies» στο κάτω μέρος της σελίδας για να δείτε ή να αλλάξετε την επιλογή σας. Η προτίμησή σας αποθηκεύεται στην τοπική αποθήκευση (local storage), οπότε η διαγραφή μόνο των cookies μπορεί να μην την επαναφέρει.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">8. Τα δικαιώματά σας</h2>
                <p>Σύμφωνα με τον GDPR, έχετε το δικαίωμα να:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Γνωρίζετε ποια cookies χρησιμοποιούνται και γιατί</li>
                  <li>Δίνετε ή αρνείστε τη συγκατάθεσή σας για τα μη απαραίτητα cookies</li>
                  <li>Ανακαλείτε τη συγκατάθεσή σας οποιαδήποτε στιγμή</li>
                  <li>Ζητάτε τη διαγραφή δεδομένων που συλλέχθηκαν μέσω cookies</li>
                </ul>
                <p className="mt-3">Για περισσότερες πληροφορίες σχετικά με τα δικαιώματά σας για την προστασία δεδομένων, δείτε την <Link href="/el/privacy/" className="text-[#5B8CFF] hover:underline">πολιτική απορρήτου</Link>.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">9. Αλλαγές στην πολιτική</h2>
                <p>Μπορεί να ενημερώνουμε την παρούσα πολιτική cookies κατά καιρούς για να αντικατοπτρίζουμε αλλαγές στις πρακτικές μας ή για νομικούς, λειτουργικούς ή κανονιστικούς λόγους. Η ενημερωμένη έκδοση θα δημοσιεύεται σε αυτή τη σελίδα με αναθεωρημένη ημερομηνία.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">10. Επικοινωνία</h2>
                <p>Εάν έχετε ερωτήσεις σχετικά με τη χρήση cookies από εμάς, επικοινωνήστε μαζί μας στο <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a>.</p>
              </div>

            </div>
            <div className="mt-10 pt-8 border-t border-[#E2E5EA] flex gap-4">
              <Link href="/el/privacy/" className="text-sm text-[#5B8CFF] hover:underline">Πολιτική απορρήτου</Link>
              <Link href="/el/terms/" className="text-sm text-[#5B8CFF] hover:underline">Όροι παροχής υπηρεσιών</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
