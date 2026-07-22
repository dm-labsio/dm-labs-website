/* ============================================================
   dm-labs.io - Greek Process Page (v2.0)
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { MessageCircle, ArrowRight } from "lucide-react";

const STEPS = [
  { num: "01", title: "Αρχική Συζήτηση", duration: "Ημέρα 1", desc: "Μιλάμε για την επιχείρησή σας, τους στόχους σας και το τι χρειάζεστε. Μπορεί να γίνει μέσω WhatsApp, email ή video call. Δεν χρειάζεται τίποτα προετοιμασμένο." },
  { num: "02", title: "Πρόταση & Εγκριση", duration: "Ημέρα 1-2", desc: "Στέλνουμε σαφή πρόταση με scope, τιμή και χρονοδιάγραμμα. Μόλις εγκριθεί, ξεκινάμε αμέσως." },
  { num: "03", title: "Σχεδιασμός", duration: "Ημέρα 2-5", desc: "Δημιουργούμε το οπτικό σχέδιο της ιστοσελίδας σας. Βλέπετε πώς θα μοιάζει πριν γραφτεί κώδικας και μπορείτε να ζητήσετε αλλαγές." },
  { num: "04", title: "Ανάπτυξη", duration: "Ημέρα 5-10", desc: "Χτίζουμε την ιστοσελίδα με καθαρό κώδικα, βελτιστοποιημένη για ταχύτητα, SEO και mobile. Ενημερώσεις καθ' όλη τη διάρκεια." },
  { num: "05", title: "Αναθεωρήσεις", duration: "Ημέρα 10-12", desc: "Βλέπετε την ολοκληρωμένη ιστοσελίδα και κάνετε τις αλλαγές σας (εντός του αριθμού αναθεωρήσεων του πακέτου σας)." },
  { num: "06", title: "Παράδοση", duration: "Ημέρα 12-14", desc: "Η ιστοσελίδα σας πηγαίνει live. Ρυθμίζουμε Google Search Console, Analytics και SSL. Λαμβάνετε πλήρη οδηγό χρήσης." },
];

export default function ProcessElPage() {
  useSEO({
    title: "Πώς Δουλεύουμε | dm-labs.io - Web Design Κύπρος",
    description: "Η διαδικασία μας για την κατασκευή ιστοσελίδων: από την αρχική συζήτηση έως την παράδοση σε 5-14 ημέρες.",
  });

  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)" }}>
      <section style={{ paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up" delay={0.1}>
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>Διαδικασία</p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.2}>
            <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--mist)", marginBottom: "24px" }}>
              Από τη συζήτηση{" "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                στο live σε 14 ημέρες
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.3}>
            <p style={{ fontSize: "1.1rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.7, marginBottom: "80px" }}>
              Μια σαφής, δοκιμασμένη διαδικασία που σας κρατά ενήμερους σε κάθε βήμα.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section style={{ padding: "0 0 120px" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {STEPS.map((step, i) => (
              <AnimateIn key={step.num} variant="fade-up" delay={i * 0.08}>
                <div className="glass-panel" style={{ padding: "36px 40px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "32px", alignItems: "start" }}>
                  <div>
                    <p className="mono" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--cyan)", lineHeight: 1 }}>{step.num}</p>
                    <p className="mono" style={{ fontSize: "0.7rem", color: "var(--slate-soft)", marginTop: "4px" }}>{step.duration}</p>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.125rem", color: "var(--mist)", marginBottom: "10px" }}>{step.title}</h2>
                    <p style={{ fontSize: "0.9rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.75 }}>{step.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn variant="fade-up" delay={0.5}>
            <div style={{ marginTop: "60px", padding: "40px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--mist)", marginBottom: "8px" }}>Έτοιμοι να ξεκινήσουμε;</p>
                <p style={{ fontSize: "0.875rem", color: "rgba(238,241,248,0.6)" }}>Η πρώτη συζήτηση είναι δωρεάν και χωρίς δεσμεύσεις.</p>
              </div>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={16} /> Ξεκινήστε Τώρα
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
