/* ============================================================
   dm-labs.io - Greek Contact Page (v2.0)
   ============================================================ */
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";
import { MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react";

export default function ContactElPage() {
  useSEO({
    title: "Επικοινωνία | dm-labs.io - Web Design Κύπρος",
    description: "Επικοινωνήστε με την dm-labs.io για την ιστοσελίδα σας. WhatsApp, email ή φόρμα επικοινωνίας. Απαντάμε εντός 24 ωρών.",
  });

  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)" }}>
      <section style={{ paddingTop: "140px", paddingBottom: "120px" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          {/* Left */}
          <AnimateIn variant="fade-up">
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>Επικοινωνία</p>
            <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--mist)", marginBottom: "24px" }}>
              Ας μιλήσουμε για{" "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                την ιστοσελίδα σας
              </span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.7, marginBottom: "48px" }}>
              Πείτε μας για την επιχείρησή σας και θα σας στείλουμε μια σαφή πρόταση εντός 24 ωρών. Χωρίς δεσμεύσεις.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "20px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "var(--mist)" }}>
                <MessageCircle size={20} style={{ color: "var(--cyan)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "0.9375rem", marginBottom: "2px" }}>WhatsApp</p>
                  <p className="mono" style={{ fontSize: "0.8125rem", color: "rgba(238,241,248,0.5)" }}>+357 97 472 847</p>
                </div>
                <ArrowRight size={16} style={{ marginLeft: "auto", color: "var(--slate-soft)" }} />
              </a>
              <a href="mailto:info@dm-labs.io" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "20px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "var(--mist)" }}>
                <Mail size={20} style={{ color: "var(--cyan)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "0.9375rem", marginBottom: "2px" }}>Email</p>
                  <p className="mono" style={{ fontSize: "0.8125rem", color: "rgba(238,241,248,0.5)" }}>info@dm-labs.io</p>
                </div>
                <ArrowRight size={16} style={{ marginLeft: "auto", color: "var(--slate-soft)" }} />
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "20px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <MapPin size={20} style={{ color: "var(--cyan)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "0.9375rem", marginBottom: "2px" }}>Τοποθεσία</p>
                  <p className="mono" style={{ fontSize: "0.8125rem", color: "rgba(238,241,248,0.5)" }}>Πάφος, Κύπρος · 34.7754N 32.4242E</p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: Form */}
          <AnimateIn variant="fade-up" delay={0.15}>
            {submitted ? (
              <div className="glass-panel" style={{ padding: "60px 40px", textAlign: "center" }}>
                <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "1.5rem", color: "var(--mist)", marginBottom: "16px" }}>Ευχαριστούμε!</p>
                <p style={{ color: "rgba(238,241,248,0.65)", lineHeight: 1.65 }}>Λάβαμε το μήνυμά σας και θα επικοινωνήσουμε εντός 24 ωρών.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { id: "name", label: "Ονοματεπώνυμο", type: "text", placeholder: "Το όνομά σας" },
                  { id: "email", label: "Email", type: "email", placeholder: "email@example.com" },
                  { id: "business", label: "Επιχείρηση", type: "text", placeholder: "Τι κάνει η επιχείρησή σας;" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label className="mono" style={{ display: "block", fontSize: "0.75rem", color: "var(--slate-soft)", marginBottom: "8px" }}>{label}</label>
                    <input
                      type={type}
                      value={form[id as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [id]: e.target.value }))}
                      placeholder={placeholder}
                      required
                      style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--mist)", fontFamily: "Satoshi, sans-serif", fontSize: "0.9375rem", outline: "none" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="mono" style={{ display: "block", fontSize: "0.75rem", color: "var(--slate-soft)", marginBottom: "8px" }}>Μήνυμα</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Πείτε μας για το project σας..."
                    rows={5}
                    required
                    style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--mist)", fontFamily: "Satoshi, sans-serif", fontSize: "0.9375rem", outline: "none", resize: "vertical" }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Αποστολή Μηνύματος <ArrowRight size={16} />
                </button>
              </form>
            )}
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
