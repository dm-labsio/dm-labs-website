import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";
import AnimateIn from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";

// Greek Home page — /el/
// Primary keyword: "κατασκευή ιστοσελίδων" / "κατασκευή ιστοσελίδας"
// Secondary: "επαγγελματική ιστοσελίδα επιχείρηση", "web design Κύπρος Ελλάδα"
// Note: Service is provided in English. This page informs Greek-speaking visitors.

export default function HomeEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδων | D&M Labs | Από €299",
    description: "Η D&M Labs κατασκευάζει επαγγελματικές, mobile-first ιστοσελίδες για επιχειρήσεις στην Κύπρο και την Ελλάδα. Γρήγορη παράδοση, SEO-ready, από €299.",
    canonicalPath: "/el"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="min-h-[88vh] flex items-center relative overflow-hidden bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Κατασκευή Ιστοσελίδων
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111315] mb-6 leading-tight">
              Αναβαθμίστε την{" "}
              <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
                Επιχείρησή σας
              </span>{" "}
              με Σύγχρονη Ιστοσελίδα
            </h1>
            <p className="text-lg text-[#5B6472] mb-4 leading-relaxed max-w-xl">
              Κατασκευάζουμε επαγγελματικές, γρήγορες και mobile-first ιστοσελίδες για επιχειρήσεις στην Κύπρο και την Ελλάδα. Από €299, παράδοση σε 5-14 ημέρες.
            </p>
            <p className="text-sm text-[#9CA3AF] mb-8 italic">
              Η υπηρεσία παρέχεται στα αγγλικά. Επικοινωνούμε μαζί σας στα ελληνικά.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/el/contact">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Ξεκινήστε Σήμερα
                </button>
              </Link>
              <Link href="/el/pricing">
                <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                  Δείτε τις Τιμές
                </button>
              </Link>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
                alt="Κατασκευή επαγγελματικής ιστοσελίδας για επιχείρηση"
                className="w-full object-cover"
                style={{ height: "420px" }}
                loading="eager"
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section-spacing bg-white border-y border-[#E8EAF0]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: 50, suffix: "+", label: "Ιστοσελίδες που παραδώσαμε" },
              { value: 5, suffix: " ημέρες", label: "Ελάχιστος χρόνος παράδοσης" },
              { value: 299, prefix: "€", label: "Αρχική τιμή" },
              { value: 100, suffix: "%", label: "Mobile-first σχεδιασμός" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[#5B8CFF] mb-1">
                  {s.prefix}<CountUp end={s.value} />{s.suffix}
                </div>
                <p className="text-xs text-[#5B6472]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">
            Τι Κατασκευάζουμε
          </h2>
          <p className="text-[#5B6472] mb-10 leading-relaxed max-w-2xl">
            Κάθε ιστοσελίδα που φτιάχνουμε είναι μοναδική - σχεδιασμένη από την αρχή βάσει της επιχείρησής σας, του στυλ σας και των πελατών σας. Δεν χρησιμοποιούμε έτοιμα templates που μοιάζουν με δεκάδες άλλες σελίδες.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Ιστοσελίδες Επιχειρήσεων",
                desc: "Εστιατόρια, καφέ, ξενοδοχεία, καταστήματα, επαγγελματικές υπηρεσίες. Ό,τι κι αν κάνει η επιχείρησή σας, χτίζουμε την κατάλληλη ιστοσελίδα.",
                icon: "🏢"
              },
              {
                title: "Ιστοσελίδες Ομορφιάς και Wellness",
                desc: "Κομμωτήρια, nail studios, spa, γυμναστήρια, yoga studios, personal trainers. Ιστοσελίδες που γεμίζουν τα ραντεβού σας.",
                icon: "✨"
              },
              {
                title: "Ιστοσελίδες Επαγγελματιών",
                desc: "Δικηγόροι, λογιστές, αρχιτέκτονες, γιατροί, σύμβουλοι. Μια αξιόπιστη online παρουσία που αντικατοπτρίζει την εμπειρία σας.",
                icon: "💼"
              },
              {
                title: "Ιστοσελίδες Τουρισμού",
                desc: "Βίλες, ενοικιαζόμενα δωμάτια, τουριστικά γραφεία, εμπειρίες. Ιστοσελίδες που προσελκύουν επισκέπτες από όλο τον κόσμο.",
                icon: "🌊"
              },
              {
                title: "Ιστοσελίδες Κατασκευών",
                desc: "Εργολάβοι, ηλεκτρολόγοι, υδραυλικοί, ανακαινίσεις. Δείξτε τη δουλειά σας και κάντε εύκολο για τους πελάτες να σας βρουν.",
                icon: "🔨"
              },
              {
                title: "Ιστοσελίδες Λιανικής",
                desc: "Μπουτίκ, καταστήματα, τοπικά εμπορεύματα. Μια επαγγελματική online παρουσία που φέρνει κόσμο στην πόρτα σας.",
                icon: "🛍️"
              }
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-[#111315] text-base mb-2">{s.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY D&M LABS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-4">
            Γιατί να Επιλέξετε τη D&M Labs
          </h2>
          <p className="text-[#5B6472] mb-10 leading-relaxed max-w-2xl">
            Δεν είμαστε απλώς κατασκευαστές ιστοσελίδων. Είμαστε συνεργάτες σας σε κάθε βήμα - από την πρώτη συζήτηση μέχρι την παράδοση και μετά.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Είμαστε μαζί σας σε κάθε βήμα",
                desc: "Από την πρώτη συζήτηση μέχρι το launch και μετά, έχετε ένα πραγματικό άτομο να επικοινωνείτε. Χωρίς τεχνικές ορολογίες, χωρίς αναμονή."
              },
              {
                title: "Δεν χρειάζεστε τεχνικές γνώσεις",
                desc: "Δεν χρειάζεται να καταλαβαίνετε από hosting, SEO ή κώδικα. Εσείς φέρτε την επιχείρησή σας. Εμείς αναλαμβάνουμε τα υπόλοιπα."
              },
              {
                title: "Ενημερώσεις όποτε τις χρειαστείτε",
                desc: "Η επιχείρησή σας αλλάζει. Η ιστοσελίδα σας πρέπει να αλλάζει μαζί της. Όταν χρειαστείτε αλλαγές, επικοινωνείτε μαζί μας και τις κάνουμε γρήγορα."
              },
              {
                title: "Χτιστά από την αρχή για εσάς",
                desc: "Κάθε ιστοσελίδα σχεδιάζεται από μηδέν βάσει του στυλ, των χρωμάτων και της προσωπικότητας της επιχείρησής σας. Αν δεν ξέρετε τι θέλετε, το βρίσκουμε μαζί."
              }
            ].map((w) => (
              <div key={w.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-lg mb-2">{w.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Διαφανείς Τιμές, Χωρίς Εκπλήξεις
          </h2>
          <p className="text-[#5B6472] mb-10">
            Μια σταθερή τιμή, όλα συμπεριλαμβάνονται. Χωρίς κρυφές χρεώσεις, χωρίς μηνιαίες συνδρομές.{" "}
            <Link href="/el/pricing" className="text-[#5B8CFF] font-medium underline underline-offset-2">
              Δείτε αναλυτικά τις τιμές
            </Link>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "€299", desc: "Μία σελίδα, mobile-responsive, WhatsApp κουμπί, social links, SEO βασικό. Παράδοση σε 5-7 ημέρες." },
              { name: "Business", price: "€399", desc: "Έως 5 σελίδες, φόρμα επικοινωνίας, Google Maps, reviews, SEO. Παράδοση σε 7-10 ημέρες.", highlight: true },
              { name: "Premium", price: "€699", desc: "Έως 7 σελίδες, custom animations, gallery, 5 SEO άρθρα, pop-up. Παράδοση σε 10-14 ημέρες." }
            ].map((p) => (
              <div key={p.name} className={`rounded-2xl p-6 border ${p.highlight ? "border-[#5B8CFF] bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] shadow-md" : "border-[#E8EAF0] bg-white shadow-sm"}`}>
                {p.highlight && <span className="inline-block text-xs font-semibold text-[#5B8CFF] uppercase tracking-wider mb-2">Πιο Δημοφιλές</span>}
                <div className="text-2xl font-extrabold text-[#111315] mb-1">{p.price}</div>
                <div className="font-semibold text-[#111315] mb-3">{p.name}</div>
                <p className="text-[#5B6472] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Έτοιμοι να ξεκινήσετε;
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Πείτε μας για την επιχείρησή σας και θα σας στείλουμε δωρεάν πρόταση μέσα σε 24 ώρες. Χωρίς δέσμευση, χωρίς πίεση.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact">
              <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                Επικοινωνήστε μαζί μας
              </button>
            </Link>
            <a href="https://wa.me/35797472847?text=Γεια%20σας!%20Θα%20ήθελα%20να%20συζητήσουμε%20για%20μια%20ιστοσελίδα." target="_blank" rel="noopener noreferrer">
              <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
