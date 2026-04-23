import { useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";
import { ChevronDown } from "lucide-react";

// Greek FAQ page — /el/faq
// Primary keyword: "συχνές ερωτήσεις κατασκευή ιστοσελίδας"

const faqs = [
  {
    q: "Πόσο κοστίζει μια επαγγελματική ιστοσελίδα;",
    a: "Οι τιμές μας ξεκινούν από €299 για το Starter πακέτο (1 σελίδα), €399 για το Business (έως 5 σελίδες) και €699 για το Premium (έως 7 σελίδες με SEO άρθρα). Όλες οι τιμές είναι εφάπαξ - χωρίς μηνιαίες συνδρομές."
  },
  {
    q: "Πόσο καιρό παίρνει να φτιαχτεί η ιστοσελίδα μου;",
    a: "Το Starter παραδίδεται σε 5-7 ημέρες, το Business σε 7-10 ημέρες και το Premium σε 10-14 ημέρες από τη στιγμή που έχουμε το περιεχόμενό σας (κείμενα, φωτογραφίες). Αν δεν έχετε περιεχόμενο, σας βοηθάμε να το δημιουργήσετε."
  },
  {
    q: "Χρειάζομαι τεχνικές γνώσεις;",
    a: "Καθόλου. Δεν χρειάζεστε να καταλαβαίνετε από hosting, SEO, κώδικα ή οτιδήποτε τεχνικό. Εσείς φέρτε την επιχείρησή σας και τις ιδέες σας - εμείς αναλαμβάνουμε τα υπόλοιπα."
  },
  {
    q: "Τι γίνεται με το hosting και το domain;",
    a: "Σας καθοδηγούμε για το πώς να αποκτήσετε το δικό σας domain (όνομα ιστοσελίδας) και hosting. Θέλουμε εσείς να είστε ιδιοκτήτες της ιστοσελίδας σας. Το κόστος domain και hosting είναι συνήθως €10-30 ετησίως."
  },
  {
    q: "Μπορώ να κάνω αλλαγές μετά την παράδοση;",
    a: "Φυσικά. Για μικρές αλλαγές (κείμενα, φωτογραφίες, τιμές) επικοινωνείτε μαζί μας και τις κάνουμε γρήγορα. Για μεγαλύτερες αλλαγές ή νέες σελίδες, συμφωνούμε σε μια μικρή αμοιβή ανάλογα με το εύρος."
  },
  {
    q: "Η ιστοσελίδα μου θα εμφανίζεται στη Google;",
    a: "Κάθε ιστοσελίδα παραδίδεται με σωστή SEO δομή - σωστούς τίτλους, meta descriptions, heading structure, image alt texts και γρήγορους χρόνους φόρτωσης. Σας βοηθάμε επίσης να ρυθμίσετε το Google Business Profile σας."
  },
  {
    q: "Σε ποιες περιοχές εξυπηρετείτε;",
    a: "Εξυπηρετούμε επιχειρήσεις σε ολόκληρη την Κύπρο (Λεμεσός, Λευκωσία, Λάρνακα, Πάφος) και την Ελλάδα (Θεσσαλονίκη, Κρήτη, Αθήνα και αλλού). Δουλεύουμε εξ αποστάσεως, οπότε η τοποθεσία δεν αποτελεί εμπόδιο."
  },
  {
    q: "Χρησιμοποιείτε AI στη δουλειά σας;",
    a: "Ναι, χρησιμοποιούμε τα καλύτερα AI εργαλεία της αγοράς για να παραδώσουμε πιο αποτελεσματικές ιστοσελίδες. Αυτό δεν σημαίνει ότι το AI κάνει τη δουλειά - κάθε ιστοσελίδα σχεδιάζεται και ελέγχεται από εμάς για να είναι σωστή, μοναδική και κατάλληλη για την επιχείρησή σας."
  },
  {
    q: "Σε ποια γλώσσα παρέχεται η υπηρεσία;",
    a: "Η υπηρεσία παρέχεται στα αγγλικά, αλλά επικοινωνούμε μαζί σας στα ελληνικά. Μπορείτε να μας στείλετε email, WhatsApp ή να μας τηλεφωνήσετε στα ελληνικά - δεν υπάρχει πρόβλημα."
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-[#E8EAF0] shadow-sm overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-6 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-bold text-[#111315] text-base pr-4">{q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#5B8CFF] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-[#5B6472] text-sm leading-relaxed border-t border-[#E8EAF0] pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQEl() {
  useHreflang();
  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">FAQ</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Συχνές Ερωτήσεις
          </h1>
          <p className="text-lg text-[#5B6472] mb-3 leading-relaxed">
            Απαντάμε στις πιο συχνές ερωτήσεις για την κατασκευή ιστοσελίδων, τις τιμές και τη διαδικασία μας.
          </p>
          <p className="text-sm text-[#9CA3AF] italic">
            Η υπηρεσία παρέχεται στα αγγλικά. Επικοινωνούμε μαζί σας στα ελληνικά.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Δεν βρήκατε την απάντησή σας;</h2>
          <p className="text-blue-100 text-lg mb-8">
            Επικοινωνήστε μαζί μας απευθείας - απαντάμε μέσα σε 24 ώρες.
          </p>
          <Link href="/el/contact">
            <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
              Επικοινωνήστε μαζί μας
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
