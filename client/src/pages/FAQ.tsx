/* ============================================================
   DM-Labs.io v2.0 - FAQ Page
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%20have%20a%20question.";

const faqs = [
  {
    category: "Getting Started",
    items: [
      { q: "How do I get started?", a: "Send us a message on WhatsApp or use the contact form. We will ask about your business, audience, content, and goals, then recommend the right website scope." },
      { q: "What information do I need to provide?", a: "Your business name, a brief description of what you do, and any existing logo, photos, text, or examples you want us to consider. We confirm the practical content requirements before work begins." },
      { q: "Do I need technical knowledge?", a: "No. We guide the website process and explain the decisions in straightforward terms. You focus on your business and approve the direction and content." },
      { q: "Do you work with clients outside Paphos?", a: "Yes. DM-Labs.io works with businesses across Cyprus and can also work remotely with clients in Greece and elsewhere, subject to agreed project scope." },
      { q: "Can I see a design direction before development?", a: "Yes. We share a design direction for your approval before development proceeds, then keep you informed as the project moves through the agreed stages." },
      { q: "Can I add more pages or features later?", a: "Yes. New pages, new functionality, or additional content are quoted according to the work required. We will explain the scope before making changes." },
    ],
  },
  {
    category: "Website Packages and Payment",
    items: [
      { q: "How much does a website cost?", a: "Launch Website packages start at €299, Growth Website packages start at €749, and Pro Website packages start at €1,499. Enterprise / Custom projects start at €1,499 and are quoted based on scope." },
      { q: "Are there hidden fees?", a: "No. We agree the project scope and price before work begins. Domain, hosting, and third-party service costs, where relevant, are explained separately." },
      { q: "How does payment work?", a: "We agree the payment stages before work begins. The final balance is due on delivery once you have reviewed the agreed result." },
      { q: "What payment methods do you accept?", a: "We accept bank transfer and major payment methods. We provide payment details when you are ready to proceed." },
      { q: "Do I own my website after it is built?", a: "Once paid in full, the website and its content belong to you, subject to any third-party licences or services used in the project." },
    ],
  },
  {
    category: "Website Features and SEO",
    items: [
      { q: "Will my website work on mobile phones?", a: "Yes. Every website package is built to work responsively across phones, tablets, and desktops." },
      { q: "Is SEO included?", a: "Every package includes basic SEO foundations. The Pro Website package includes a fuller SEO structure. Advanced SEO work, additional copywriting, and wider content programmes are scoped separately." },
      { q: "Can you add a booking system, CRM, chatbot, or multiple languages?", a: "Yes. These are usually part of an Enterprise / Custom project because the scope depends on the platform, content, integrations, and requirements." },
      { q: "Can you provide hosting?", a: "We can help with the technical setup and explain any relevant third-party hosting, domain, SSL, or service costs before they are incurred." },
    ],
  },
  {
    category: "After Launch and Website Care",
    items: [
      { q: "What care plans do you offer?", a: "Basic Care is €49 per month and includes hosting monitoring, backups and bug fixing, WhatsApp support, and up to five small content updates each month. Complete Care is €129 per month and adds ongoing content updates, priority WhatsApp support, a monthly performance check, and one simple banner or section update each month." },
      { q: "What is not included in website care?", a: "New pages, copywriting, extra revision rounds beyond your package allowance, new integrations, redesigns, advanced or full SEO structure, and complex content migration are not included in either care plan and are quoted separately." },
      { q: "Can I cancel a care plan?", a: "Yes. Both Basic Care and Complete Care have no contract and can be cancelled anytime." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--hairline)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 0", textAlign: "left", background: "none", border: "none", cursor: "pointer",
          gap: "16px",
        }}
      >
        <span style={{
          fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "1rem",
          letterSpacing: "-.01em", color: "var(--ink)", lineHeight: 1.4,
        }}>{q}</span>
        <ChevronDown
          size={18}
          style={{
            color: "var(--slate)", flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 280ms var(--ease-out)",
          }}
        />
      </button>
      {open && (
        <div style={{
          fontFamily: "'Satoshi', sans-serif", fontSize: ".9rem", color: "var(--slate)",
          lineHeight: 1.72, paddingBottom: "20px",
        }}>{a}</div>
      )}
    </div>
  );
}

export default function FAQ() {
  useSEO({
    title: "FAQ | DM-Labs.io Web Design Cyprus",
    description:
      "Answers to common questions about web design packages, pricing, process, and website care from DM-Labs.io in Cyprus.",
  });

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ background: "var(--ink)", padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />
        <div className="container relative">
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>FREQUENTLY ASKED</p>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-.03em", lineHeight: .96,
            color: "#fff", marginBottom: "20px", maxWidth: "18ch",
          }}>
            Questions we{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              get asked most.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", fontWeight: 500,
            color: "rgba(238,241,248,.6)", lineHeight: 1.65, maxWidth: "48ch",
          }}>
            Straight answers about how we work, what's included, and what things cost.
          </p>
        </div>
      </section>

      {/* ── FAQ sections ──────────────────────────────────── */}
      <section style={{ background: "var(--mist)", padding: "100px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div style={{ gridColumn: "span 8" }}>
              {faqs.map((section) => (
                <div key={section.category} style={{ marginBottom: "64px" }}>
                  <p className="mono" style={{ color: "var(--slate)", marginBottom: "24px", fontSize: "9px" }}>
                    {section.category.toUpperCase()}
                  </p>
                  {section.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div style={{ gridColumn: "span 4" }}>
              <div style={{ position: "sticky", top: "100px" }}>
                <div style={{ background: "var(--ink)", padding: "36px 32px" }}>
                  <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px", fontSize: "9px" }}>STILL HAVE QUESTIONS?</p>
                  <h3 style={{
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1.2rem",
                    letterSpacing: "-.02em", color: "#fff", marginBottom: "12px", lineHeight: 1.3,
                  }}>
                    Ask us directly.
                  </h3>
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "rgba(238,241,248,.55)", lineHeight: 1.65, marginBottom: "24px" }}>
                    Send us a WhatsApp message and we'll reply within 24 hours.
                  </p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    padding: "13px 24px", fontFamily: "'Space Mono', monospace", fontSize: "9px",
                    letterSpacing: ".15em", textTransform: "uppercase" as const,
                    background: "var(--grad)", color: "#fff", textDecoration: "none", width: "100%",
                  }}>
                    <MessageCircle size={13} /> WhatsApp Us
                  </a>
                </div>

                <div style={{ background: "var(--cloud)", padding: "36px 32px", marginTop: "2px" }}>
                  <p className="mono" style={{ color: "var(--slate)", marginBottom: "16px", fontSize: "9px" }}>READY TO START?</p>
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "var(--slate)", lineHeight: 1.65, marginBottom: "20px" }}>
                    Free consultation. No commitment. We'll recommend the right scope before you decide anything.
                  </p>
                  <a href="/contact" style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontFamily: "'Space Mono', monospace", fontSize: "9px",
                    letterSpacing: ".15em", textTransform: "uppercase" as const,
                    color: "var(--blue)", textDecoration: "none",
                  }}>
                    Get a Free Consultation <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
