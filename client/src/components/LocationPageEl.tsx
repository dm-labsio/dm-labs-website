import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

interface Package {
  name: string;
  price: string;
  features: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface LocationPageElProps {
  seo: { title: string; description: string; canonicalPath: string };
  schemaId: string;
  schema: object;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  intro: string;
  whoWeWorkWith: [string, string][];
  whatWeCanInclude: [string, string][];
  packages: Package[];
  faqItems: FaqItem[];
  faqTitle: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaWaText: string;
}

const LOGO = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ofdIwdWPHQdHPziu.png?Expires=1816249782&Signature=LoO2fRZYNZvSveh4CGYmFIJpMhvkRDBwPzatZ87rgA2AIvSrkRrUimHDf6Lkhmd1lTBfHI43XJyr6vNxZr3fDoLjcz4neDCgL2~2KSZeL01Jkmh~2ihjqY~VeKz~U1JxXgr3B9D34MNd15HRw0r3MyxNjvWnkelK8psyBi74060KNFyrAL10z6hIDNBahlm6tzMSi~4ajix~yrkGaK7Pzpbo4Or-TosEbmyroEOGQarX9IEsu40sJxt4wIyMVjDGOx4RhJhu49osOAHhdDOjUA7UaYHeMQeMGRX97TSsEoky3o9-F0uUmIGAUdRo0FumxuEsBtDvCTYf5s~IdWKb4w__&Key-Pair-Id=K2HSFNDJXOU9YS";

export default function LocationPageEl({
  seo, schemaId, schema, eyebrow, headline, headlineAccent, subheadline, intro,
  whoWeWorkWith, whatWeCanInclude, packages, faqItems, faqTitle,
  ctaHeadline, ctaBody, ctaWaText,
}: LocationPageElProps) {
  useSEO({ title: seo.title, description: seo.description, canonicalPath: seo.canonicalPath });

  useEffect(() => {
    const existing = document.getElementById(schemaId);
    if (existing) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = schemaId;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById(schemaId)?.remove(); };
  }, [schemaId, schema]);

  const waUrl = `https://wa.me/35797472847?text=${encodeURIComponent(ctaWaText)}`;

  return (
    <main style={{ background: "var(--ink)", color: "var(--mist)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(77,126,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "20px" }}>{eyebrow}</p>
          <h1 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", letterSpacing: "-0.03em", lineHeight: 0.96, color: "var(--mist)", marginBottom: "24px" }}>
            {headline}{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{headlineAccent}</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(238,241,248,0.7)", lineHeight: 1.65, maxWidth: "600px", marginBottom: "40px" }}>{subheadline}</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Δωρεαν Συμβουλευτικη</a>
            <Link href="/el/pricing" className="btn-ghost">Δειτε Τιμες</Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.02)" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontSize: "1.15rem", color: "rgba(238,241,248,0.75)", lineHeight: 1.75 }}>{intro}</p>
        </div>
      </section>

      {/* Who We Work With */}
      <section style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Με Ποιους Συνεργαζομαστε</p>
          <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.028em", color: "var(--mist)", marginBottom: "48px" }}>
            Επιχειρησεις που καταλαβαινουμε
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
            {whoWeWorkWith.map(([title, desc]) => (
              <div key={title} className="glass-panel" style={{ padding: "28px" }}>
                <h3 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--mist)", marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(238,241,248,0.6)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Can Include */}
      <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.02)" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Τι Μπορουμε να Συμπεριλαβουμε</p>
          <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.028em", color: "var(--mist)", marginBottom: "48px" }}>
            Δυνατοτητες που χτιζουμε
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
            {whatWeCanInclude.map(([title, desc]) => (
              <div key={title} style={{ padding: "28px", borderLeft: "2px solid var(--cyan)" }}>
                <h3 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--cyan)", marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(238,241,248,0.6)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Πακετα</p>
          <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.028em", color: "var(--mist)", marginBottom: "48px" }}>
            Σαφεις τιμες, χωρις εκπληξεις
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px" }}>
            {packages.map((pkg, i) => (
              <div key={pkg.name} className="glass-panel" style={{ padding: "36px", position: "relative", ...(i === 1 ? { border: "1px solid var(--cyan)" } : {}) }}>
                {i === 1 && <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>Δημοφιλεστερο</p>}
                <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--mist)", marginBottom: "8px" }}>{pkg.name}</p>
                <p style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "2.4rem", color: "var(--cyan)", marginBottom: "24px", letterSpacing: "-0.02em" }}>{pkg.price}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                  {pkg.features.map(f => (
                    <li key={f} style={{ fontSize: "0.875rem", color: "rgba(238,241,248,0.7)", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "1px" }}>+</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className={i === 1 ? "btn-primary" : "btn-ghost"} style={{ display: "block", textAlign: "center" }}>
                  Εναρξη
                </a>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "24px", fontSize: "0.875rem", color: "rgba(238,241,248,0.5)", textAlign: "center" }}>
            Χρειαζεστε κατι πιο προσαρμοσμενο; <Link href="/el/contact" style={{ color: "var(--cyan)" }}>Επικοινωνηστε μαζι μας</Link> για Enterprise / Custom τιμολογηση.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.02)" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "12px" }}>FAQ</p>
          <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.028em", color: "var(--mist)", marginBottom: "48px" }}>{faqTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {faqItems.map(({ question, answer }) => (
              <details key={question} style={{ background: "rgba(255,255,255,0.03)", padding: "24px", cursor: "pointer" }}>
                <summary style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--mist)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  {question}
                  <span style={{ color: "var(--cyan)", flexShrink: 0, fontSize: "1.2rem" }}>+</span>
                </summary>
                <p style={{ marginTop: "16px", fontSize: "0.9375rem", color: "rgba(238,241,248,0.7)", lineHeight: 1.7 }}>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <img src={LOGO} alt="dm-labs.io" style={{ width: "56px", height: "56px", objectFit: "contain", marginBottom: "32px", filter: "brightness(0) invert(1)" }} />
          <h2 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900, fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "-0.028em", color: "var(--mist)", marginBottom: "20px" }}>{ctaHeadline}</h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(238,241,248,0.65)", lineHeight: 1.65, marginBottom: "40px" }}>{ctaBody}</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Εναρξη στο WhatsApp</a>
            <Link href="/el/contact" className="btn-ghost">Φορμα Επικοινωνιας</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
