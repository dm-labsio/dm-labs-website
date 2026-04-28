/* ============================================================
   D&M LABS - Επικοινωνία Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { MessageCircle, Mail, Clock, MapPin, Send, Instagram } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_URL = "https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%98%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%83%CF%85%CE%B6%CE%B7%CF%84%CE%AE%CF%83%CE%BF%CF%85%CE%BC%CE%B5%20%CE%B3%CE%B9%CE%B1%20%CE%BC%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1.";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "bfd3c955-1bc9-4a43-b497-f4c6776db7d1";

export default function ΕπικοινωνίαEl() {
  useSEO({
    title: "Επικοινωνία D&M Labs | Λάβετε Δωρεάν Προσφορά",
    description: "Επικοινωνήστε μαζί μας για μια δωρεάν συμβουλευτική. Απαντάμε εντός 24 ωρών. WhatsApp, email ή φόρμα επικοινωνίας.",
  });
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Νέο αίτημα από ${form.name}  -  D&M Labs`,
          name: form.name,
          email: form.email,
          business: form.business,
          message: form.message,
        }),
      });
      if (res.ok) {
        toast.success("Το μήνυμά σας στάλθηκε! Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών.");
        setForm({ name: "", email: "", business: "", message: "" });
      } else {
        toast.error("Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε το WhatsApp.");
      }
    } catch {
      toast.error("Σφάλμα δικτύου. Παρακαλώ δοκιμάστε μέσω WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Επικοινωνήστε μαζί μας</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Ας Χτίσουμε <span className="brand-gradient-text">Κάτι Εξαιρετικό</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Έτοιμοι να ξεκινήσετε; Στείλτε μας μήνυμα στο WhatsApp για την πιο γρήγορη απάντηση, ή χρησιμοποιήστε την φόρμα παρακάτω.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Επικοινωνία Methods + Form */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Left - Επικοινωνία Methods */}
            <div className="md:col-span-2 space-y-6">
              <AnimateIn>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block dm-card !p-6 group hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <MessageCircle size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315]">WhatsApp</h3>
                      <p className="text-xs text-[#5B6472]">Πιο γρήγορη απάντηση</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B6472]">+357 97 472 847</p>
                  <p className="text-xs text-[#5B8CFF] mt-2 group-hover:underline">Στείλτε μήνυμα →</p>
                </a>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <div className="dm-card !p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <Mail size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315]">Email</h3>
                      <p className="text-xs text-[#5B6472]">Απαντάμε εντός 24ω</p>
                    </div>
                  </div>
                  <a href="mailto:info@dm-labs.io" className="text-sm text-[#5B8CFF] hover:underline">info@dm-labs.io</a>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <div className="dm-card !p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <Clock size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315]">Ώρες Λειτουργίας</h3>
                      <p className="text-xs text-[#5B6472]">Δευτ-Παρ</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B6472]">09:00 - 18:00 (EET)</p>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <div className="dm-card !p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <MapPin size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315]">Τοποθεσία</h3>
                      <p className="text-xs text-[#5B6472]">Βασισμένοι στην Ευρώπη</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B6472]">Βασισμένοι στην Ευρώπη, εξυπηρετούμε πελάτες παγκοσμίως</p>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.4}>
                <a
                  href="https://www.instagram.com/dm_labs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block dm-card !p-6 group hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #5B8CFF20 0%, #A855F720 100%)", border: "1px solid rgba(91,140,255,0.15)" }}
                    >
                      <Instagram size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315]">Instagram</h3>
                      <p className="text-xs text-[#5B6472]">Ακολουθήστε την δουλειά μας</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B8CFF] group-hover:underline">@dm_labs.io →</p>
                </a>
              </AnimateIn>
            </div>

            {/* Right - Form */}
            <AnimateIn delay={0.2} className="md:col-span-3">
              <div className="dm-card !p-8">
                <h2 className="text-xl font-semibold text-[#111315] mb-6">Στείλτε μας Μήνυμα</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111315] mb-1.5">Το Όνομά σας</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all"
                        placeholder="Γιάννης Παπαδόπουλος" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111315] mb-1.5">Email</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all"
                        placeholder="info@επιχείρηση.gr" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111315] mb-1.5">Όνομα Επιχείρησης</label>
                    <input type="text" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all"
                      placeholder="Όνομα επιχείρησης σας" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111315] mb-1.5">Περιγράψτε το Προτζέκτ σας</label>
                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all resize-none"
                      placeholder="Τι είδους ιστοσελίδα χρειάζεστε; Υπάρχουν συγκεκριμένα χαρακτηριστικά που θέλετε;" />
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
                    {sending ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Αποστολή...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Send size={16} /> Αποστολή Μηνύματος</span>
                    )}
                  </button>
                  <p className="text-xs text-[#5B6472] text-center">πε μήνυμα απευθείας στο <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#5B8CFF] font-medium hover:underline">WhatsApp</a> για πιο γρήγορη απάντηση.</p>
                </form>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Προτιμάτε μια Σύντομη Συνομιλία;</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">Οι περισσότεροι πελάτες μας ξεκινάνε με ένα απλό μήνυμα WhatsApp. Χωρίς πίεση, χωρίς δεσμεύσεις.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={18} /> Συνομιλήστε στο WhatsApp
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
