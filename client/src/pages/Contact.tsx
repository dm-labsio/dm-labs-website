/* ============================================================
   DM-Labs.io v2.0 — Contact Page
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { MessageCircle, Mail, Clock, MapPin, Send, Instagram, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_URL =
  "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20website%20project.";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "bfd3c955-1bc9-4a43-b497-f4c6776db7d1";

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontFamily: "'Satoshi', sans-serif",
  fontSize: ".9rem",
  color: "var(--ink)",
  background: "var(--cloud)",
  border: "1px solid var(--hairline)",
  outline: "none",
  transition: "border-color 200ms",
};

export default function Contact() {
  useSEO({
    title: "Contact DM-Labs.io | Get a Free Website Quote",
    description:
      "Get in touch with DM-Labs.io for a free website consultation. We reply within 24 hours. WhatsApp, email, or contact form.",
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
          subject: `New enquiry from ${form.name} — DM-Labs.io`,
          name: form.name,
          email: form.email,
          business: form.business,
          message: form.message,
        }),
      });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you within 24 hours.");
        setForm({ name: "", email: "", business: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try WhatsApp instead.");
      }
    } catch {
      toast.error("Network error. Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

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
          <p className="mono" style={{ color: "var(--cyan)", marginBottom: "16px" }}>GET IN TOUCH</p>
          <h1 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-.03em", lineHeight: .96,
            color: "#fff", marginBottom: "20px", maxWidth: "18ch",
          }}>
            Let's talk about{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              your website.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", fontWeight: 500,
            color: "rgba(238,241,248,.6)", lineHeight: 1.65, maxWidth: "48ch",
          }}>
            Free consultation. No commitment. We'll tell you exactly what we'd build and what it would cost before you decide anything.
          </p>
        </div>
      </section>

      {/* ── Contact grid ──────────────────────────────────── */}
      <section style={{ background: "var(--mist)", padding: "100px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-px" style={{ background: "var(--hairline)" }}>

            {/* Left: info */}
            <div style={{ background: "var(--cloud)", padding: "48px 40px", gridColumn: "span 2" }}>
              <p className="mono" style={{ color: "var(--slate)", marginBottom: "24px", fontSize: "9px" }}>CONTACT INFO</p>

              {[
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+357 97 472 847",
                  href: WHATSAPP_URL,
                  accent: "var(--cyan)",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@dm-labs.io",
                  href: "mailto:info@dm-labs.io",
                  accent: "var(--blue)",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  value: "@dm_labs.io",
                  href: "https://instagram.com/dm_labs.io",
                  accent: "var(--violet)",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Paphos, Cyprus",
                  href: null,
                  accent: "var(--cyan)",
                },
                {
                  icon: Clock,
                  label: "Response time",
                  value: "Within 24 hours",
                  href: null,
                  accent: "var(--slate-soft)",
                },
              ].map(({ icon: Icon, label, value, href, accent }) => (
                <div key={label} style={{ display: "flex", gap: "16px", marginBottom: "28px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "36px", height: "36px", background: `${accent}14`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon size={16} style={{ color: accent }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: ".15em", color: "var(--slate-soft)", marginBottom: "4px" }}>{label.toUpperCase()}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" style={{
                        fontFamily: "'Satoshi', sans-serif", fontSize: ".9rem", fontWeight: 600,
                        color: "var(--ink)", textDecoration: "none",
                      }}>{value}</a>
                    ) : (
                      <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".9rem", fontWeight: 600, color: "var(--ink)" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid var(--hairline)" }}>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".875rem", color: "var(--slate)", lineHeight: 1.7 }}>
                  Prefer to talk? Send us a WhatsApp message and we'll set up a quick call at a time that works for you.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "16px",
                  padding: "12px 24px", fontFamily: "'Space Mono', monospace", fontSize: "9px",
                  letterSpacing: ".15em", textTransform: "uppercase" as const,
                  background: "var(--grad)", color: "#fff", textDecoration: "none",
                }}>
                  <MessageCircle size={13} /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ background: "var(--cloud)", padding: "48px 40px", gridColumn: "span 3" }}>
              <p className="mono" style={{ color: "var(--slate)", marginBottom: "24px", fontSize: "9px" }}>SEND A MESSAGE</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: ".15em", color: "var(--slate)", display: "block", marginBottom: "6px" }}>YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="Maria Kostadinova"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      style={INPUT_STYLE}
                      onFocus={e => (e.target.style.borderColor = "var(--blue)")}
                      onBlur={e => (e.target.style.borderColor = "var(--hairline)")}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: ".15em", color: "var(--slate)", display: "block", marginBottom: "6px" }}>EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="maria@yourbusiness.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={INPUT_STYLE}
                      onFocus={e => (e.target.style.borderColor = "var(--blue)")}
                      onBlur={e => (e.target.style.borderColor = "var(--hairline)")}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: ".15em", color: "var(--slate)", display: "block", marginBottom: "6px" }}>BUSINESS NAME</label>
                  <input
                    type="text"
                    placeholder="Your Business Name"
                    value={form.business}
                    onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                    style={INPUT_STYLE}
                    onFocus={e => (e.target.style.borderColor = "var(--blue)")}
                    onBlur={e => (e.target.style.borderColor = "var(--hairline)")}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: ".15em", color: "var(--slate)", display: "block", marginBottom: "6px" }}>MESSAGE *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your business and what you need..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...INPUT_STYLE, resize: "vertical" }}
                    onFocus={e => (e.target.style.borderColor = "var(--blue)")}
                    onBlur={e => (e.target.style.borderColor = "var(--hairline)")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "16px 32px", fontFamily: "'Space Mono', monospace", fontSize: "9px",
                    letterSpacing: ".2em", textTransform: "uppercase" as const,
                    background: sending ? "var(--slate)" : "var(--grad)",
                    color: "#fff", border: "none", cursor: sending ? "not-allowed" : "pointer",
                    width: "100%",
                  }}
                >
                  {sending ? "Sending..." : <><Send size={13} /> Send Message</>}
                </button>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: ".8rem", color: "var(--slate-soft)", textAlign: "center" }}>
                  We reply within 24 hours. Your information is never shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
