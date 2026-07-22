/* ============================================================
   dm-labs.io - Greek Pricing Page (v2.0)
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Launch Website",
    price: "€299",
    accent: "var(--cyan)",
    highlight: false,
    description: "Για μια μικρή επιχείρηση που χρειάζεται μια καθαρή, επαγγελματική online παρουσία.",
    features: ["Μικρή ιστοσελίδα μίας ή ελαφριάς δύο σελίδων", "Responsive κατασκευή", "Βασικές SEO βάσεις", "WhatsApp και σύνδεσμοι social media", "2 γύροι αναθεωρήσεων"],
  },
  {
    name: "Growth Website",
    price: "€749",
    accent: "var(--blue)",
    highlight: true,
    description: "Για επιχειρήσεις που χρειάζονται περισσότερες υπηρεσίες, πληροφορίες και καθαρές διαδρομές επικοινωνίας.",
    features: ["Έως 4 σελίδες", "Φόρμα επικοινωνίας", "Google Maps και reviews / testimonials", "Βασικό SEO", "Ρύθμιση Search Console και Analytics", "3 γύροι αναθεωρήσεων"],
  },
  {
    name: "Pro Website",
    price: "€1.499",
    accent: "var(--violet)",
    highlight: false,
    description: "Για επιχειρήσεις που χρειάζονται πλουσιότερη παρουσίαση και πιο ολοκληρωμένη SEO δομή.",
    features: ["Έως 7 σελίδες", "Gallery ή portfolio", "Pop-up και animations με scroll", "Πλήρης SEO δομή", "Ρύθμιση blog ή website visual pack", "4 γύροι αναθεωρήσεων"],
  },
];

const addons = [
  { name: "Επιπλέον Σελίδα", price: "€80", desc: "Κάθε σελίδα πέρα από το πακέτο." },
  { name: "Blog Setup", price: "€120", desc: "Πλήρης ρύθμιση blog με κατηγορίες και RSS." },
  { name: "Πολύγλωσση Έκδοση", price: "€199", desc: "Προσθήκη δεύτερης γλώσσας με σωστό hreflang." },
  { name: "Ενσωμάτωση Κρατήσεων", price: "€250", desc: "Σύνδεση με Calendly, OpenTable ή άλλο σύστημα." },
  { name: "Care Plan - Basic", price: "€29/μήνα", desc: "Ενημερώσεις, backup και τεχνική υποστήριξη." },
  { name: "Care Plan - Pro", price: "€79/μήνα", desc: "Basic + μηνιαία αναφορά SEO και προτεραιότητα υποστήριξης." },
];

export default function PricingElPage() {
  useSEO({
    title: "Τιμές Web Design Κύπρος | dm-labs.io - Από €299",
    description: "Σαφείς τιμές για επαγγελματικές ιστοσελίδες στην Κύπρο. Launch από €299, Growth €749, Pro €1.499. Χωρίς κρυφές χρεώσεις.",
  });

  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)" }}>
      {/* HERO */}
      <section style={{ paddingTop: "140px", paddingBottom: "80px", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up" delay={0.1}>
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>Τιμές</p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.2}>
            <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--mist)", marginBottom: "24px" }}>
              Σαφείς τιμές,{" "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                χωρίς εκπλήξεις
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.3}>
            <p style={{ fontSize: "1.15rem", color: "rgba(238,241,248,0.7)", lineHeight: 1.65, marginBottom: "0" }}>
              Όλα τα πακέτα περιλαμβάνουν εφάπαξ τιμή. Χωρίς μηνιαίες χρεώσεις για τη βασική ιστοσελίδα.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* PACKAGES */}
      <section style={{ padding: "60px 0 100px" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
            {packages.map((pkg, i) => (
              <AnimateIn key={pkg.name} variant="fade-up" delay={i * 0.1}>
                <div className="glass-panel" style={{ padding: "40px", height: "100%", display: "flex", flexDirection: "column", ...(pkg.highlight ? { border: "1px solid var(--cyan)" } : {}) }}>
                  {pkg.highlight && <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Δημοφιλέστερο</p>}
                  <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--mist)", marginBottom: "8px" }}>{pkg.name}</p>
                  <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "2.8rem", letterSpacing: "-0.02em", color: pkg.accent, marginBottom: "12px" }}>{pkg.price}</p>
                  <p style={{ fontSize: "0.875rem", color: "rgba(238,241,248,0.6)", lineHeight: 1.6, marginBottom: "28px" }}>{pkg.description}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", flex: 1 }}>
                    {pkg.features.map(f => (
                      <li key={f} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.875rem", color: "rgba(238,241,248,0.75)" }}>
                        <CheckCircle2 size={14} style={{ color: pkg.accent, flexShrink: 0, marginTop: "2px" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/el/contact" className={pkg.highlight ? "btn-primary" : "btn-ghost"} style={{ display: "block", textAlign: "center" }}>
                    Δωρεάν Συμβουλευτική
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Enterprise */}
          <AnimateIn variant="fade-up" delay={0.3}>
            <div style={{ marginTop: "2px", padding: "40px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p className="mono" style={{ color: "var(--violet)", marginBottom: "8px" }}>Enterprise / Custom</p>
                <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "1.8rem", color: "var(--mist)", letterSpacing: "-0.02em", marginBottom: "8px" }}>Προσαρμοσμένη τιμολόγηση</p>
                <p style={{ fontSize: "0.9rem", color: "rgba(238,241,248,0.6)", maxWidth: "560px", lineHeight: 1.65 }}>
                  Για integrations, πολύγλωσσες ιστοσελίδες, CMS αυτοεπεξεργασία, AI ή chatbot χαρακτηριστικά, σύνθετη κίνηση, CRM ή κράτηση.
                </p>
              </div>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flexShrink: 0 }}>
                <MessageCircle size={16} /> Επικοινωνήστε μαζί μας
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ADD-ONS */}
      <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up">
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Προσθήκες</p>
            <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.028em", color: "var(--mist)", marginBottom: "48px" }}>
              Επεκτείνετε οποιοδήποτε πακέτο
            </h2>
          </AnimateIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px" }}>
            {addons.map((a, i) => (
              <AnimateIn key={a.name} variant="fade-up" delay={i * 0.07}>
                <div className="glass-panel" style={{ padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
                  <div>
                    <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "var(--mist)", marginBottom: "6px" }}>{a.name}</p>
                    <p style={{ fontSize: "0.8125rem", color: "rgba(238,241,248,0.55)", lineHeight: 1.55 }}>{a.desc}</p>
                  </div>
                  <p className="mono" style={{ color: "var(--cyan)", fontSize: "0.875rem", whiteSpace: "nowrap", flexShrink: 0 }}>{a.price}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
