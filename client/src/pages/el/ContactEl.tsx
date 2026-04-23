import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";
import { Phone, Mail, Instagram } from "lucide-react";

// Greek Contact page — /el/contact
// Primary keyword: "επικοινωνία κατασκευή ιστοσελίδας Κύπρος"

export default function ContactEl() {
  useSEO({
    title: "Επικοινωνία | D&M Labs | Κατασκευή Ιστοσελίδων",
    description: "Επικοινωνήστε με τη D&M Labs για κατασκευή επαγγελματικής ιστοσελίδας. Απαντάμε μέσα σε 24 ώρες. Τηλέφωνο, email, WhatsApp.",
    canonicalPath: "/el/contact"
  });
  useHreflang();

  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would POST to a backend endpoint
    setSent(true);
  };

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Επικοινωνία</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Ας Μιλήσουμε
          </h1>
          <p className="text-lg text-[#5B6472] mb-3 leading-relaxed">
            Πείτε μας για την επιχείρησή σας και θα σας στείλουμε δωρεάν πρόταση μέσα σε 24 ώρες. Χωρίς δέσμευση, χωρίς πίεση.
          </p>
          <p className="text-sm text-[#9CA3AF] italic">
            Η υπηρεσία παρέχεται στα αγγλικά. Επικοινωνούμε μαζί σας στα ελληνικά.
          </p>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="section-spacing">
        <div className="container max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#111315] mb-6">Στοιχεία Επικοινωνίας</h2>
            <div className="flex flex-col gap-5 mb-8">
              <a href="tel:+35797472847" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#5B8CFF]" />
                </div>
                <div>
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-0.5">Τηλέφωνο</div>
                  <div className="font-semibold text-[#111315] group-hover:text-[#5B8CFF] transition-colors">+357 97 472 847</div>
                </div>
              </a>
              <a href="mailto:info@dm-labs.io" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#5B8CFF]" />
                </div>
                <div>
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-0.5">Email</div>
                  <div className="font-semibold text-[#111315] group-hover:text-[#5B8CFF] transition-colors">info@dm-labs.io</div>
                </div>
              </a>
              <a href="https://www.instagram.com/dm_labs.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] flex items-center justify-center shrink-0">
                  <Instagram size={18} className="text-[#5B8CFF]" />
                </div>
                <div>
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-0.5">Instagram</div>
                  <div className="font-semibold text-[#111315] group-hover:text-[#5B8CFF] transition-colors">@dm_labs.io</div>
                </div>
              </a>
              <a
                href="https://wa.me/35797472847?text=Γεια%20σας!%20Θα%20ήθελα%20να%20συζητήσουμε%20για%20μια%20ιστοσελίδα."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-0.5">WhatsApp</div>
                  <div className="font-semibold text-[#111315] group-hover:text-[#5B8CFF] transition-colors">Στείλτε μας μήνυμα</div>
                </div>
              </a>
            </div>
            <div className="bg-[#EEF3FF] rounded-2xl p-5 border border-[#D0DEFF]">
              <p className="text-sm text-[#5B6472] leading-relaxed">
                <strong className="text-[#111315]">Απαντάμε μέσα σε 24 ώρες.</strong> Επικοινωνείτε μαζί μας στα ελληνικά - δεν υπάρχει πρόβλημα. Η υπηρεσία κατασκευής ιστοσελίδας παρέχεται στα αγγλικά.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="bg-white rounded-2xl p-8 border border-[#E8EAF0] shadow-sm text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[#111315] mb-2">Το μήνυμά σας στάλθηκε!</h3>
                <p className="text-[#5B6472] text-sm">Θα επικοινωνήσουμε μαζί σας μέσα σε 24 ώρες.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#E8EAF0] shadow-sm flex flex-col gap-4">
                <h2 className="text-xl font-bold text-[#111315] mb-2">Στείλτε μας μήνυμα</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Ονοματεπώνυμο *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8EAF0] text-sm focus:outline-none focus:border-[#5B8CFF] transition-colors"
                      placeholder="Το όνομά σας"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8EAF0] text-sm focus:outline-none focus:border-[#5B8CFF] transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Τηλέφωνο</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8EAF0] text-sm focus:outline-none focus:border-[#5B8CFF] transition-colors"
                    placeholder="+30 ή +357..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Επιχείρηση</label>
                  <input
                    type="text"
                    value={form.business}
                    onChange={e => setForm({ ...form, business: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8EAF0] text-sm focus:outline-none focus:border-[#5B8CFF] transition-colors"
                    placeholder="Τι κάνει η επιχείρησή σας;"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Μήνυμα *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8EAF0] text-sm focus:outline-none focus:border-[#5B8CFF] transition-colors resize-none"
                    placeholder="Πείτε μας για το project σας..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity"
                >
                  Αποστολή Μηνύματος
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </main>
  );
}
