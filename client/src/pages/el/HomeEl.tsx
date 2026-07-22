/* ============================================================
   dm-labs.io - Greek Homepage (v2.0 redesign)
   ============================================================ */
import { useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Globe, Smartphone, Search, Zap, Shield,
  CheckCircle2, ArrowRight, MessageCircle, Quote,
  Utensils, Scissors, Stethoscope, Dumbbell,
  Palette, Code, Rocket, Headphones, Languages
} from "lucide-react";

const LOGO = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ofdIwdWPHQdHPziu.png?Expires=1816249782&Signature=LoO2fRZYNZvSveh4CGYmFIJpMhvkRDBwPzatZ87rgA2AIvSrkRrUimHDf6Lkhmd1lTBfHI43XJyr6vNxZr3fDoLjcz4neDCgL2~2KSZeL01Jkmh~2ihjqY~VeKz~U1JxXgr3B9D34MNd15HRw0r3MyxNjvWnkelK8psyBi74060KNFyrAL10z6hIDNBahlm6tzMSi~4ajix~yrkGaK7Pzpbo4Or-TosEbmyroEOGQarX9IEsu40sJxt4wIyMVjDGOx4RhJhu49osOAHhdDOjUA7UaYHeMQeMGRX97TSsEoky3o9-F0uUmIGAUdRo0FumxuEsBtDvCTYf5s~IdWKb4w__&Key-Pair-Id=K2HSFNDJXOU9YS";
const HERO_BG = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/AoQOdGYGCiAGNzJZ.webp?Expires=1816249782&Signature=LJCdvCOxNQWGrFVJz-kFIBEMBl9Eo8-FnHVMFJiHRkNJoJJdHFkVWCKk4erSdOIJNifuH3iEaRFM6ZMUoVfyrBcgGrZAqno7RID2nUzkWk593PiDLbf09Nrr96tUU-kQ92yuCR9zsfvMoCUVF6lK7JfTm6BRtdSTAZF58HZQNSTtljebgstblBq9Fe~ZCrmAOfQ__&Key-Pair-Id=K2HSFNDJXOU9YS";

const TESTIMONIALS = [
  { name: "Maria K.", role: "Ιδιοκτητρια Εστιατοριου", text: "Η νεα μας ιστοσελιδα εφερε τρεις νεες κρατησεις μεσα στην πρωτη εβδομαδα. Η ομαδα καταλαβε ακριβως τι χρειαζομασταν και παρεδωσε πιο γρηγορα. Το συνιστω ανεπιφυλακτα.", initial: "M" },
  { name: "Andreas P.", role: "Κλινικη Φυσιοθεραπειας", text: "Επαγγελματικοι, αμεσοι και πραγματικα αφοσιωμενοι στο να κανουν την κλινικη μας να φαινεται στο καλυτερο της online. Η mobile εκδοση ειναι τελεια.", initial: "A" },
  { name: "Sophia L.", role: "Ιδιοκτητρια Σαλονιου Ομορφιας", text: "Ημουν ανησυχη για την κατασκευη ιστοσελιδας, αλλα η dm-labs.io εκανε ολη τη διαδικασια εντελως ανετη. Ανελαβαν τα παντα και το αποτελεσμα ειναι εκπληκτικο.", initial: "S" },
];

const CAPABILITIES = [
  { icon: Globe, title: "Custom Web Design", desc: "Καθε ιστοσελιδα σχεδιαζεται εξ αρχης για την επιχειρηση σας." },
  { icon: Smartphone, title: "Mobile-First Αναπτυξη", desc: "Αψογη εμπειρια σε κινητα, tablet και desktop." },
  { icon: Search, title: "SEO Θεμελια", desc: "Δομη, ταχυτητα και τεχνικα βασικα που χρειαζεται η Google." },
  { icon: Zap, title: "Γρηγορη Παραδοση", desc: "Οι περισσοτερες ιστοσελιδες παραδιδονται σε 5-14 ημερες." },
  { icon: Shield, title: "Ασφαλεια & Αξιοπιστια", desc: "SSL, hosting και τεχνικη υποστηριξη συμπεριλαμβανονται." },
  { icon: Languages, title: "Πολυγλωσση Υποστηριξη", desc: "Φτασε αγγλοφωνους, ελληνοφωνους και αλλους επισκεπτες." },
];

const INDUSTRIES = [
  { icon: Utensils, label: "Εστιατορια & Καφε" },
  { icon: Scissors, label: "Ομορφια & Ευεξια" },
  { icon: Stethoscope, label: "Κλινικες & Υγεια" },
  { icon: Dumbbell, label: "Fitness & Γυμναστηρια" },
  { icon: Palette, label: "Δημιουργικα Studio" },
  { icon: Code, label: "Τεχνολογια & Startups" },
  { icon: Rocket, label: "Κτηματομεσιτικα" },
  { icon: Headphones, label: "Επαγγελματικες Υπηρεσιες" },
];

const PACKAGES = [
  {
    name: "Launch Website",
    price: "299",
    accent: "var(--cyan)",
    highlight: false,
    desc: "Για επιχειρησεις που χρειαζονται γρηγορη, επαγγελματικη παρουσια online.",
    features: ["Μικρη μονοσελιδη ή ελαφρια δισελιδη ιστοσελιδα", "Responsive σχεδιασμος", "Βασικα SEO θεμελια", "WhatsApp και social links", "2 γυροι αναθεωρησεων"],
  },
  {
    name: "Growth Website",
    price: "749",
    accent: "var(--blue)",
    highlight: true,
    desc: "Για επιχειρησεις που θελουν πληρη παρουσια με φορμες, χαρτη και αναλυτικα.",
    features: ["Εως 4 σελιδες", "Φορμα επικοινωνιας", "Google Maps και κριτικες/μαρτυριες", "Βασικο SEO", "Ρυθμιση Search Console και Analytics", "3 γυροι αναθεωρησεων"],
  },
  {
    name: "Pro Website",
    price: "1.499",
    accent: "var(--violet)",
    highlight: false,
    desc: "Για επιχειρησεις που θελουν ολοκληρωμενη ιστοσελιδα με animations και πληρες SEO.",
    features: ["Εως 7 σελιδες", "Gallery ή portfolio", "Pop-up και scroll animations", "Πληρης δομη SEO", "Ρυθμιση blog ή visual pack ιστοσελιδας", "4 γυροι αναθεωρησεων"],
  },
];

const PROOF_ITEMS = ["Εστιατορια", "Κομμωτηρια", "Κλινικες", "Fitness Studios", "Κτηματομεσιτες", "Δικηγοροι", "Λογιστες", "Boutique Hotels", "Yoga Studios", "Nail Salons", "Οδοντιατροι", "Φυσιοθεραπευτες", "Αρχιτεκτονες", "Φωτογραφοι", "Catering"];

export default function HomeElPage() {
  useSEO({
    title: "dm-labs.io | Επαγγελματικος Σχεδιασμος Ιστοσελιδων απο 299",
    description: "Η dm-labs.io κατασκευαζει custom, mobile-first ιστοσελιδες για επιχειρησεις. Γρηγορη παραδοση, ετοιμες για SEO, απο 299.",
    canonicalPath: "/el",
  });

  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)" }}>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={HERO_BG} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--ink) 0%, transparent 40%, var(--ink) 100%)" }} />
        </div>
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "500px", height: "500px", background: "var(--blue)", borderRadius: "50%", filter: "blur(140px)", opacity: 0.07, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "400px", height: "400px", background: "var(--violet)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.06, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "120px", paddingBottom: "100px", maxWidth: "900px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up" delay={0.1}>
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "20px" }}>Web Design Studio · Παφος, Κυπρος</p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.2}>
            <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: "-0.035em", lineHeight: 0.95, color: "var(--mist)", marginBottom: "28px" }}>
              Η επιχειρηση σας ειναι εξαιρετικη.{" "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Η ιστοσελιδα σας πρεπει να το δειχνει.
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.3}>
            <p style={{ fontSize: "1.2rem", color: "rgba(238,241,248,0.7)", lineHeight: 1.65, maxWidth: "580px", marginBottom: "44px" }}>
              Κατασκευαζουμε επαγγελματικες, γρηγορες ιστοσελιδες που φερνουν αποτελεσματα για επιχειρησεις σαν τη δικη σας. Απο 299.
            </p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.4}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Δωρεαν Συμβουλευτικη <ArrowRight size={16} />
              </a>
              <Link href="/el/templates" className="btn-ghost">Δειτε Δειγματα</Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* PROOF TICKER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0", overflow: "hidden", background: "rgba(255,255,255,0.02)" }}>
        <div ref={tickerRef} style={{ display: "flex", gap: "48px", animation: "ticker 28s linear infinite", whiteSpace: "nowrap" }}>
          {[...PROOF_ITEMS, ...PROOF_ITEMS].map((item, i) => (
            <span key={i} className="mono" style={{ color: "var(--slate-soft)", fontSize: "0.75rem" }}>
              {item} <span style={{ color: "var(--cyan)", margin: "0 8px" }}>+</span>
            </span>
          ))}
        </div>
      </div>

      {/* CAPABILITIES */}
      <section style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up">
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Τι Κανουμε</p>
            <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", color: "var(--mist)", marginBottom: "60px", maxWidth: "600px" }}>
              Ολα οσα χρειαζεται η ιστοσελιδα σας
            </h2>
          </AnimateIn>
          <StaggerContainer className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px" }}>
            {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="glass-panel" style={{ padding: "32px", height: "100%" }}>
                  <Icon size={24} style={{ color: "var(--cyan)", marginBottom: "16px" }} />
                  <h3 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--mist)", marginBottom: "8px" }}>{title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "rgba(238,241,248,0.6)", lineHeight: 1.65 }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up">
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Κλαδοι</p>
            <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.028em", color: "var(--mist)", marginBottom: "48px" }}>
              Καταλαβαινουμε την επιχειρηση σας
            </h2>
          </AnimateIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
            {INDUSTRIES.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Icon size={16} style={{ color: "var(--cyan)" }} />
                <span style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500, fontSize: "0.875rem", color: "rgba(238,241,248,0.8)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up">
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Τιμες</p>
            <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", color: "var(--mist)", marginBottom: "16px" }}>
              Σαφεις τιμες, χωρις εκπληξεις
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(238,241,248,0.6)", marginBottom: "60px", maxWidth: "500px" }}>
              Ολα τα πακετα περιλαμβανουν εφαπαξ τιμη. Χωρις μηνιαιες χρεωσεις για τη βασικη ιστοσελιδα.
            </p>
          </AnimateIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
            {PACKAGES.map((pkg, i) => (
              <AnimateIn key={pkg.name} variant="fade-up" delay={i * 0.1}>
                <div className="glass-panel" style={{ padding: "40px", height: "100%", display: "flex", flexDirection: "column", ...(pkg.highlight ? { border: "1px solid var(--cyan)" } : {}) }}>
                  {pkg.highlight && <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Δημοφιλεστερο</p>}
                  <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--mist)", marginBottom: "8px" }}>{pkg.name}</p>
                  <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "2.8rem", letterSpacing: "-0.02em", color: pkg.accent, marginBottom: "12px" }}>
                    {"\u20AC"}{pkg.price}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "rgba(238,241,248,0.6)", lineHeight: 1.6, marginBottom: "28px" }}>{pkg.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", flex: 1 }}>
                    {pkg.features.map(f => (
                      <li key={f} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.875rem", color: "rgba(238,241,248,0.75)" }}>
                        <CheckCircle2 size={14} style={{ color: pkg.accent, flexShrink: 0, marginTop: "2px" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/el/contact" className={pkg.highlight ? "btn-primary" : "btn-ghost"} style={{ display: "block", textAlign: "center" }}>
                    Δωρεαν Συμβουλευτικη
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn variant="fade-up" delay={0.3}>
            <div style={{ marginTop: "2px", padding: "40px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p className="mono" style={{ color: "var(--violet)", marginBottom: "8px" }}>Enterprise / Custom</p>
                <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "1.8rem", color: "var(--mist)", letterSpacing: "-0.02em", marginBottom: "8px" }}>Προσαρμοσμενη τιμολογηση</p>
                <p style={{ fontSize: "0.9rem", color: "rgba(238,241,248,0.6)", maxWidth: "560px", lineHeight: 1.65 }}>
                  Για integrations, πολυγλωσσες ιστοσελιδες, CMS αυτοεπεξεργασια, AI ή chatbot χαρακτηριστικα, συνθετη κινηση, CRM ή κρατηση.
                </p>
              </div>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flexShrink: 0 }}>
                <MessageCircle size={16} /> Επικοινωνηστε μαζι μας
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up">
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Μαρτυριες</p>
            <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", color: "var(--mist)", marginBottom: "60px" }}>
              Τι λενε οι πελατες μας
            </h2>
          </AnimateIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
            {TESTIMONIALS.map((t, i) => (
              <AnimateIn key={t.name} variant="fade-up" delay={i * 0.1}>
                <div className="glass-panel" style={{ padding: "36px", height: "100%" }}>
                  <Quote size={20} style={{ color: "var(--cyan)", marginBottom: "20px", opacity: 0.6 }} />
                  <p style={{ fontSize: "0.9375rem", color: "rgba(238,241,248,0.8)", lineHeight: 1.75, marginBottom: "28px", fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "1rem", color: "var(--ink)", flexShrink: 0 }}>
                      {t.initial}
                    </div>
                    <div>
                      <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "var(--mist)" }}>{t.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "rgba(238,241,248,0.5)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up">
            <img src={LOGO} alt="dm-labs.io" style={{ width: "56px", height: "56px", objectFit: "contain", marginBottom: "32px", filter: "brightness(0) invert(1)" }} />
            <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4.5vw, 3.4rem)", letterSpacing: "-0.03em", color: "var(--mist)", marginBottom: "20px" }}>
              Ετοιμοι να χτισουμε μαζι;
            </h2>
            <p style={{ fontSize: "1.15rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.65, marginBottom: "44px" }}>
              Πειτε μας για την επιχειρηση σας και θα σας στειλουμε μια σαφη προταση εντος 24 ωρων.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Εναρξη στο WhatsApp
              </a>
              <Link href="/el/contact" className="btn-ghost">Φορμα Επικοινωνιας</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
