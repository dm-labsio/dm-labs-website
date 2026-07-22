/* ============================================================
   dm-labs.io - Greek FAQ Page (v2.0)
   ============================================================ */
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { ChevronDown, MessageCircle } from "lucide-react";

const FAQS = [
  { q: "Πόσο κοστίζει μια ιστοσελίδα;", a: "Τα πακέτα μας ξεκινούν από €299 για το Launch Website. Το Growth Website είναι €749 και το Pro Website €1.499. Για custom projects, επικοινωνήστε μαζί μας για προσαρμοσμένη πρόταση." },
  { q: "Πόσος χρόνος χρειάζεται για να φτιαχτεί η ιστοσελίδα μου;", a: "Οι περισσότερες ιστοσελίδες παραδίδονται σε 5-14 ημέρες από την έγκριση του σχεδιασμού. Το χρονοδιάγραμμα εξαρτάται από την πολυπλοκότητα και την ταχύτητα παροχής περιεχομένου από εσάς." },
  { q: "Χρειάζομαι να παρέχω περιεχόμενο;", a: "Ναι, χρειαζόμαστε τα κείμενα, τις εικόνες και τα λογότυπά σας. Μπορούμε να βοηθήσουμε με copywriting και επιλογή εικόνων αν χρειαστεί." },
  { q: "Η ιστοσελίδα θα είναι mobile-friendly;", a: "Απολύτως. Κάθε ιστοσελίδα που φτιάχνουμε είναι mobile-first - σχεδιάζεται πρώτα για κινητά και μετά για desktop." },
  { q: "Τι περιλαμβάνεται στο SEO;", a: "Κάθε ιστοσελίδα περιλαμβάνει βασικά SEO θεμέλια: σωστή δομή HTML, meta tags, schema markup, γρήγορη φόρτωση και ρύθμιση Google Search Console." },
  { q: "Μπορώ να επεξεργαστώ μόνος μου την ιστοσελίδα;", a: "Ναι, αν επιλέξετε CMS (WordPress ή άλλο). Για στατικές ιστοσελίδες, χειριζόμαστε εμείς τις αλλαγές μέσω του Care Plan." },
  { q: "Τι είναι το Care Plan;", a: "Το Care Plan είναι μηνιαία συνδρομή για ενημερώσεις, backup, τεχνική υποστήριξη και (στο Pro) μηνιαία αναφορά SEO. Basic €29/μήνα, Pro €79/μήνα." },
  { q: "Δουλεύετε με επιχειρήσεις εκτός Κύπρου;", a: "Ναι! Δουλεύουμε με επιχειρήσεις σε Κύπρο, Ελλάδα και παγκοσμίως. Η επικοινωνία γίνεται εξ αποστάσεως μέσω WhatsApp, email και video call." },
];

export default function FAQElPage() {
  useSEO({
    title: "Συχνές Ερωτήσεις | dm-labs.io - Web Design Κύπρος",
    description: "Απαντήσεις στις πιο συχνές ερωτήσεις για τις υπηρεσίες web design της dm-labs.io. Τιμές, χρόνοι παράδοσης, SEO και πολλά άλλα.",
  });

  const [open, setOpen] = useState<number | null>(null);

  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)" }}>
      <section style={{ paddingTop: "140px", paddingBottom: "120px" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up" delay={0.1}>
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>FAQ</p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.2}>
            <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--mist)", marginBottom: "60px" }}>
              Συχνές Ερωτήσεις
            </h1>
          </AnimateIn>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {FAQS.map((faq, i) => (
              <AnimateIn key={i} variant="fade-up" delay={i * 0.05}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    style={{ width: "100%", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  >
                    <span style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--mist)" }}>{faq.q}</span>
                    <ChevronDown size={18} style={{ color: "var(--cyan)", flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                  </button>
                  {open === i && (
                    <div style={{ padding: "0 28px 24px" }}>
                      <p style={{ fontSize: "0.9375rem", color: "rgba(238,241,248,0.7)", lineHeight: 1.75 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn variant="fade-up" delay={0.4}>
            <div style={{ marginTop: "60px", padding: "40px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
              <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--mist)", marginBottom: "12px" }}>Δεν βρήκατε την απάντησή σας;</p>
              <p style={{ fontSize: "0.9rem", color: "rgba(238,241,248,0.6)", marginBottom: "24px" }}>Επικοινωνήστε μαζί μας απευθείας.</p>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={16} /> Ρωτήστε μας στο WhatsApp
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
