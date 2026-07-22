/* ============================================================
   dm-labs.io - Greek Services Page (v2.0)
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Globe, Smartphone, Search, Zap, Shield, MessageCircle,
  CheckCircle2, ArrowRight, Image, MapPin, FileText, Share2,
  Headphones, Rocket, Users, CalendarCheck, Languages
} from "lucide-react";

const HERO_BG = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/AoQOdGYGCiAGNzJZ.webp?Expires=1816249782&Signature=LJCdvCOxNQWGrFVJz-kFIBEMBl9Eo8-FnHVMFJiHRkNJoJJdHFkVWCKk4erSdOIJNifuH3iEaRFM6ZMUoVfyrBcgGrZAqno7RID2nUzkWk593PiDLbf09Nrr96tUU-kQ92yuCR9zsfvMoCUVF6lK7JfTm6BRtdSTAZF58HZQNSTtljebgstblBq9Fe~ZCrmAOfQ__&Key-Pair-Id=K2HSFNDJXOU9YS";

const SERVICES = [
  { icon: Globe, title: "Custom Web Design", desc: "Κάθε ιστοσελίδα σχεδιάζεται εξ αρχής για την επιχείρησή σας - όχι template, όχι drag-and-drop builder.", features: ["Μοναδικός σχεδιασμός", "Εικόνες & περιεχόμενο υψηλής ποιότητας", "Προσαρμοσμένη εμπειρία χρήστη"] },
  { icon: Smartphone, title: "Mobile-First Ανάπτυξη", desc: "Η πλειοψηφία των επισκεπτών έρχεται από κινητά. Κάθε ιστοσελίδα που φτιάχνουμε είναι τέλεια σε κινητά, tablet και desktop.", features: ["Responsive σχεδιασμός", "Γρήγορη φόρτωση σε κινητά", "Βελτιστοποίηση αφής"] },
  { icon: Search, title: "SEO Θεμέλια", desc: "Χτίζουμε κάθε ιστοσελίδα με τα τεχνικά θεμέλια που χρειάζεται η Google - δομή, ταχύτητα, meta tags και schema markup.", features: ["Βελτιστοποίηση on-page", "Τεχνική δομή SEO", "Ρύθμιση Google Search Console"] },
  { icon: Zap, title: "Γρήγορη Παράδοση", desc: "Οι περισσότερες ιστοσελίδες παραδίδονται σε 5-14 ημέρες. Δεν σας αφήνουμε να περιμένετε μήνες για μια απλή ιστοσελίδα.", features: ["Σαφές χρονοδιάγραμμα", "Τακτικές ενημερώσεις", "Γρήγορη έναρξη"] },
  { icon: Shield, title: "Ασφάλεια & Αξιοπιστία", desc: "SSL, αξιόπιστο hosting και τεχνική υποστήριξη συμπεριλαμβάνονται. Η ιστοσελίδα σας θα είναι πάντα online και ασφαλής.", features: ["SSL Certificate", "Αξιόπιστο hosting", "Τεχνική υποστήριξη"] },
  { icon: Languages, title: "Πολύγλωσση Υποστήριξη", desc: "Φτάστε αγγλόφωνους, ελληνόφωνους και άλλους επισκέπτες με ιστοσελίδες σε πολλές γλώσσες.", features: ["Ελληνικά & Αγγλικά", "Άλλες γλώσσες κατόπιν αιτήματος", "Σωστό hreflang markup"] },
];

export default function ServicesElPage() {
  useSEO({
    title: "Υπηρεσίες Web Σχεδιασμός Κύπρος | dm-labs.io",
    description: "Επαγγελματικές υπηρεσίες web design στην Κύπρο. Custom ιστοσελίδες, mobile-first ανάπτυξη, SEO βελτιστοποίηση και συντήρηση. Από €299.",
  });

  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)" }}>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={HERO_BG} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--ink) 0%, transparent 50%, var(--ink) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up" delay={0.1}>
            <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>Υπηρεσίες</p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.2}>
            <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--mist)", marginBottom: "24px" }}>
              Ό,τι χρειάζεται η ιστοσελίδα σας,{" "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                το χτίζουμε σωστά
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.3}>
            <p style={{ fontSize: "1.15rem", color: "rgba(238,241,248,0.7)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "40px" }}>
              Από custom σχεδιασμό και mobile-first ανάπτυξη έως SEO θεμέλια και πολύγλωσση υποστήριξη.
            </p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={0.4}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Δωρεάν Συμβουλευτική <ArrowRight size={16} />
              </a>
              <Link href="/el/pricing" className="btn-ghost">Δείτε Τιμές</Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2px" }}>
            {SERVICES.map(({ icon: Icon, title, desc, features }) => (
              <StaggerItem key={title}>
                <div className="glass-panel" style={{ padding: "40px", height: "100%" }}>
                  <Icon size={28} style={{ color: "var(--cyan)", marginBottom: "20px" }} />
                  <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--mist)", marginBottom: "12px" }}>{title}</h2>
                  <p style={{ fontSize: "0.9rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.7, marginBottom: "24px" }}>{desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {features.map(f => (
                      <li key={f} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "6px 0", fontSize: "0.875rem", color: "rgba(238,241,248,0.75)" }}>
                        <CheckCircle2 size={14} style={{ color: "var(--cyan)", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 0", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ maxWidth: "680px", margin: "0 auto" }}>
          <AnimateIn variant="fade-up">
            <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", color: "var(--mist)", marginBottom: "20px" }}>
              Έτοιμοι να ξεκινήσουμε;
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.65, marginBottom: "40px" }}>
              Επικοινωνήστε μαζί μας και θα σας στείλουμε μια σαφή πρόταση εντός 24 ωρών.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/35797472847" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={16} /> Έναρξη στο WhatsApp
              </a>
              <Link href="/el/contact" className="btn-ghost">Φόρμα Επικοινωνίας</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
