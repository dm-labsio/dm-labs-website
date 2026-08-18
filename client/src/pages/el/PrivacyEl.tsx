/* D&M LABS - Πολιτική Απορρήτου (Συμμόρφωση GDPR) */
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { ChevronLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function PrivacyEl() {
  useSEO({
    title: "Πολιτική Απορρήτου | DM-Labs.io",
    description: "Πολιτική απορρήτου της DM-Labs.io. Πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα σύμφωνα με τον GDPR.",
    canonicalPath: "/el/privacy/",
  });

  return (
    <>
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}>
        <div className="container relative z-10">
          <Link href="/el/" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8">
            <ChevronLeft size={16} />
            Επιστροφή στην Αρχική
          </Link>
          <div className="text-center">
            <AnimateIn>
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Νομικά</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">Πολιτική Απορρήτου</h1>
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
                <h2 className="text-xl font-semibold text-[#111315] mb-3">1. Υπεύθυνος Επεξεργασίας</h2>
                <p>Η DM-Labs.io ("εμείς", "μας") είναι ο υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων. Παρέχουμε υπηρεσίες σχεδιασμού και ανάπτυξης ιστοσελίδων για επιχειρήσεις. Μπορείτε να επικοινωνήσετε μαζί μας στο <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a> ή μέσω WhatsApp στο +357 97472847.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">2. Πληροφορίες που Συλλέγουμε</h2>
                <p className="mb-3">Συλλέγουμε τις ακόλουθες κατηγορίες προσωπικών δεδομένων:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Στοιχεία επικοινωνίας:</strong> Όνομα, διεύθυνση email, αριθμός τηλεφώνου και επωνυμία επιχείρησης — παρέχονται όταν συμπληρώνετε τη φόρμα επικοινωνίας ή μας στέλνετε μήνυμα στο WhatsApp.</li>
                  <li><strong className="text-[#111315]">Πληροφορίες έργου:</strong> Λεπτομέρειες σχετικά με την επιχείρησή σας, τις προτιμήσεις σχεδιασμού και τις απαιτήσεις ιστοσελίδας — παρέχονται κατά τις συνεδρίες διαβούλευσης.</li>
                  <li><strong className="text-[#111315]">Τεχνικά δεδομένα:</strong> Διεύθυνση IP, τύπος προγράμματος περιήγησης, τύπος συσκευής και σελίδες που επισκεφθήκατε — συλλέγονται αυτόματα μέσω απαραίτητων cookies και cookies ανάλυσης (με τη συγκατάθεσή σας).</li>
                  <li><strong className="text-[#111315]">Πληροφορίες πληρωμής:</strong> Στοιχεία χρέωσης που επεξεργάζονται με ασφάλεια μέσω τρίτων παρόχων πληρωμών. Δεν αποθηκεύουμε αριθμούς πιστωτικών καρτών.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">3. Νομική Βάση Επεξεργασίας</h2>
                <p className="mb-3">Βάσει του Γενικού Κανονισμού Προστασίας Δεδομένων (GDPR), επεξεργαζόμαστε τα δεδομένα σας με βάση τις ακόλουθες νομικές βάσεις:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Συμβατική αναγκαιότητα:</strong> Για την παροχή των υπηρεσιών σχεδιασμού ιστοσελίδας που έχετε ζητήσει.</li>
                  <li><strong className="text-[#111315]">Έννομο συμφέρον:</strong> Για την απάντηση σε ερωτήματα, τη βελτίωση των υπηρεσιών μας και τη διασφάλιση της ασφάλειας της ιστοσελίδας.</li>
                  <li><strong className="text-[#111315]">Συγκατάθεση:</strong> Για cookies ανάλυσης και επικοινωνίες μάρκετινγκ (όπου εφαρμόζεται). Μπορείτε να αποσύρετε τη συγκατάθεσή σας ανά πάσα στιγμή.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">4. Πώς Χρησιμοποιούμε τα Δεδομένα σας</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Για να απαντάμε στα ερωτήματά σας και να παρέχουμε προσφορές</li>
                  <li>Για να σχεδιάζουμε, αναπτύσσουμε και παραδίδουμε το έργο ιστοσελίδας σας</li>
                  <li>Για να επικοινωνούμε ενημερώσεις και χρονοδιαγράμματα έργου</li>
                  <li>Για να επεξεργαζόμαστε πληρωμές για τις υπηρεσίες μας</li>
                  <li>Για να παρέχουμε συντήρηση και υποστήριξη μετά την έναρξη λειτουργίας</li>
                  <li>Για να βελτιώνουμε την ιστοσελίδα και τις υπηρεσίες μας μέσω ανωνυμοποιημένης ανάλυσης</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">5. Κοινοποίηση Δεδομένων</h2>
                <p className="mb-3">Δεν πωλούμε, ενοικιάζουμε ή εμπορευόμαστε τα προσωπικά σας δεδομένα. Ενδέχεται να κοινοποιήσουμε δεδομένα στις ακόλουθες κατηγορίες αποδεκτών, αποκλειστικά για την παροχή των υπηρεσιών μας:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Πάροχοι φιλοξενίας:</strong> Για τη φιλοξενία και εξυπηρέτηση της ιστοσελίδας σας.</li>
                  <li><strong className="text-[#111315]">Επεξεργαστές πληρωμών:</strong> Για την ασφαλή επεξεργασία πληρωμών.</li>
                  <li><strong className="text-[#111315]">Πάροχοι ανάλυσης:</strong> Φιλικά προς την ιδιωτικότητα αναλυτικά στοιχεία (με τη συγκατάθεσή σας) που δεν σας παρακολουθούν σε άλλες ιστοσελίδες.</li>
                  <li><strong className="text-[#111315]">Επεξεργαστές φορμών:</strong> Web3Forms, για την παράδοση υποβολών φόρμας επικοινωνίας στο email μας.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">6. Διατήρηση Δεδομένων</h2>
                <p>Διατηρούμε τα προσωπικά σας δεδομένα μόνο για όσο χρόνο είναι απαραίτητο για την εκπλήρωση των σκοπών για τους οποίους συλλέχθηκαν. Συγκεκριμένα:</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li>Υποβολές φόρμας επικοινωνίας: 12 μήνες μετά την τελευταία επικοινωνία</li>
                  <li>Δεδομένα έργου πελάτη: Διάρκεια του έργου συν 24 μήνες</li>
                  <li>Αρχεία πληρωμών: Όπως απαιτείται από την ισχύουσα φορολογική και λογιστική νομοθεσία</li>
                  <li>Δεδομένα ανάλυσης: 26 μήνες (ανωνυμοποιημένα)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">7. Τα Δικαιώματά σας Βάσει GDPR</h2>
                <p className="mb-3">Ως υποκείμενο δεδομένων, έχετε τα ακόλουθα δικαιώματα:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-[#111315]">Δικαίωμα πρόσβασης:</strong> Αίτηση αντιγράφου των προσωπικών δεδομένων που διατηρούμε για εσάς.</li>
                  <li><strong className="text-[#111315]">Δικαίωμα διόρθωσης:</strong> Αίτηση διόρθωσης ανακριβών ή ελλιπών δεδομένων.</li>
                  <li><strong className="text-[#111315]">Δικαίωμα διαγραφής:</strong> Αίτηση διαγραφής των προσωπικών σας δεδομένων ("δικαίωμα στη λήθη").</li>
                  <li><strong className="text-[#111315]">Δικαίωμα περιορισμού επεξεργασίας:</strong> Αίτηση περιορισμού του τρόπου χρήσης των δεδομένων σας.</li>
                  <li><strong className="text-[#111315]">Δικαίωμα φορητότητας δεδομένων:</strong> Λήψη των δεδομένων σας σε δομημένη, αναγνώσιμη από μηχανή μορφή.</li>
                  <li><strong className="text-[#111315]">Δικαίωμα εναντίωσης:</strong> Εναντίωση στην επεξεργασία βάσει εννόμου συμφέροντος.</li>
                  <li><strong className="text-[#111315]">Δικαίωμα ανάκλησης συγκατάθεσης:</strong> Ανάκληση συγκατάθεσης για cookies ανάλυσης ή μάρκετινγκ ανά πάσα στιγμή.</li>
                </ul>
                <p className="mt-3">Για να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα, επικοινωνήστε μαζί μας στο <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a>. Θα απαντήσουμε εντός 30 ημερών.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">8. Cookies</h2>
                <p>Χρησιμοποιούμε απαραίτητα cookies για τη λειτουργία της ιστοσελίδας και cookies ανάλυσης (με τη συγκατάθεσή σας) για να κατανοήσουμε πώς οι επισκέπτες χρησιμοποιούν την ιστοσελίδα μας. Για πλήρεις λεπτομέρειες, δείτε την <Link href="/el/cookies/" className="text-[#5B8CFF] hover:underline">Πολιτική Cookies</Link>.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">9. Διεθνείς Μεταφορές</h2>
                <p>Τα δεδομένα σας ενδέχεται να υποβληθούν σε επεξεργασία από παρόχους υπηρεσιών εκτός του Ευρωπαϊκού Οικονομικού Χώρου (ΕΟΧ). Όταν συμβαίνει αυτό, διασφαλίζουμε ότι υπάρχουν κατάλληλες εγγυήσεις, όπως Τυπικές Συμβατικές Ρήτρες εγκεκριμένες από την Ευρωπαϊκή Επιτροπή.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">10. Ασφάλεια</h2>
                <p>Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας δεδομένων από μη εξουσιοδοτημένη πρόσβαση, τροποποίηση, αποκάλυψη ή καταστροφή. Αυτό περιλαμβάνει κρυπτογράφηση SSL, ασφαλή φιλοξενία και ελέγχους πρόσβασης.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">11. Αλλαγές στην Παρούσα Πολιτική</h2>
                <p>Ενδέχεται να ενημερώνουμε την παρούσα Πολιτική Απορρήτου κατά καιρούς. Τυχόν αλλαγές θα δημοσιεύονται σε αυτή τη σελίδα με ενημερωμένη ημερομηνία αναθεώρησης. Σας ενθαρρύνουμε να ελέγχετε αυτή την πολιτική περιοδικά.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#111315] mb-3">12. Επικοινωνία &amp; Καταγγελίες</h2>
                <p>Εάν έχετε ερωτήσεις σχετικά με αυτή την πολιτική ή επιθυμείτε να υποβάλετε καταγγελία, επικοινωνήστε μαζί μας στο <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a>. Έχετε επίσης το δικαίωμα να υποβάλετε καταγγελία στην αρμόδια εποπτική αρχή της χώρας διαμονής σας.</p>
              </div>

            </div>
            <div className="mt-10 pt-8 border-t border-[#E2E5EA] flex gap-4">
              <Link href="/el/cookies/" className="text-sm text-[#5B8CFF] hover:underline">Πολιτική Cookies</Link>
              <Link href="/el/terms/" className="text-sm text-[#5B8CFF] hover:underline">Όροι Χρήσης</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
