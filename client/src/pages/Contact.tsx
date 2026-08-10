/* ============================================================
   D&M LABS - Contact Page
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { MessageCircle, Mail, Clock, MapPin, Send, Instagram } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20D%26M%20Labs!%20I%27d%20like%20to%20discuss%20a%20website%20project.";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "bfd3c955-1bc9-4a43-b497-f4c6776db7d1";

export default function Contact() {
  useSEO({
    title: "Contact DM-Labs.io | Get a Free Website Quote",
    description: "Get in touch with DM-Labs.io for a free website consultation. We reply within 24 hours. WhatsApp, email, or contact form.",
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
          subject: `New enquiry from ${form.name}  -  DM-Labs.io`,
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
    <div className="contact-editorial">
      <section
        className="relative overflow-hidden contact-editorial-hero"
        style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}
      >
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase contact-editorial-label">Get in touch</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5 contact-editorial-title">
              <span>Let&apos;s build</span>
              <span><em>something great</em></span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto contact-editorial-lead">
              Ready to get started? Send us a message on WhatsApp for the fastest response, or use the form below.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="section-spacing bg-white contact-editorial-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 max-w-5xl mx-auto contact-editorial-grid">
            <div className="md:col-span-2 space-y-6 contact-editorial-methods">
              <AnimateIn>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block dm-card !p-6 group hover:shadow-lg transition-shadow contact-editorial-method-card">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <MessageCircle size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315] contact-editorial-method-title">WhatsApp</h3>
                      <p className="text-xs text-[#5B6472] contact-editorial-method-note">Fastest response</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B6472] contact-editorial-method-detail">+357 97 472 847</p>
                  <p className="text-xs text-[#5B8CFF] mt-2 group-hover:underline contact-editorial-method-action">Send a message</p>
                </a>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <div className="dm-card !p-6 contact-editorial-method-card">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <Mail size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315] contact-editorial-method-title">Email</h3>
                      <p className="text-xs text-[#5B6472] contact-editorial-method-note">We reply within 24h</p>
                    </div>
                  </div>
                  <a href="mailto:info@dm-labs.io" className="text-sm text-[#5B8CFF] hover:underline contact-editorial-method-detail">info@dm-labs.io</a>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <div className="dm-card !p-6 contact-editorial-method-card">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <Clock size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315] contact-editorial-method-title">Working Hours</h3>
                      <p className="text-xs text-[#5B6472] contact-editorial-method-note">Mon-Fri</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B6472] contact-editorial-method-detail">9:00 AM to 6:00 PM (EET)</p>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <div className="dm-card !p-6 contact-editorial-method-card">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="icon-container-gradient !w-12 !h-12 !rounded-xl">
                      <MapPin size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315] contact-editorial-method-title">Location</h3>
                      <p className="text-xs text-[#5B6472] contact-editorial-method-note">Europe-based</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B6472] contact-editorial-method-detail">Europe-based, serving clients worldwide</p>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.4}>
                <a
                  href="https://www.instagram.com/dm_labs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block dm-card !p-6 group hover:shadow-lg transition-shadow contact-editorial-method-card"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #5B8CFF20 0%, #A855F720 100%)", border: "1px solid rgba(91,140,255,0.15)" }}
                    >
                      <Instagram size={22} className="text-[#5B8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#111315] contact-editorial-method-title">Instagram</h3>
                      <p className="text-xs text-[#5B6472] contact-editorial-method-note">Follow our work</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5B8CFF] group-hover:underline contact-editorial-method-action">@dm_labs.io</p>
                </a>
              </AnimateIn>
            </div>

            <AnimateIn delay={0.2} className="md:col-span-3">
              <div className="dm-card !p-8 contact-editorial-form-card">
                <p className="contact-editorial-form-label">Project enquiry</p>
                <h2 className="text-xl font-semibold text-[#111315] mb-6 contact-editorial-form-heading">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5 contact-editorial-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-[#111315] mb-1.5 contact-editorial-field-label">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all contact-editorial-field"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-[#111315] mb-1.5 contact-editorial-field-label">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all contact-editorial-field"
                        placeholder="john@business.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-business" className="block text-sm font-medium text-[#111315] mb-1.5 contact-editorial-field-label">Business Name</label>
                    <input
                      id="contact-business"
                      type="text"
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all contact-editorial-field"
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-project" className="block text-sm font-medium text-[#111315] mb-1.5 contact-editorial-field-label">Tell Us About Your Project</label>
                    <textarea
                      id="contact-project"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all resize-none contact-editorial-field"
                      placeholder="What kind of website do you need? Any specific features?"
                    />
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60 contact-editorial-submit">
                    {sending ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Send size={16} /> Send Message</span>
                    )}
                  </button>
                  <p className="text-xs text-[#5B6472] text-center contact-editorial-form-note">Or message us directly on <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#5B8CFF] font-medium hover:underline">WhatsApp</a> for faster response.</p>
                </form>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="section-spacing dark-section text-center contact-editorial-cta">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 contact-editorial-cta-heading"><span>Prefer a</span><span><em>quick chat?</em></span></h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto contact-editorial-cta-copy">Most of our clients start with a simple WhatsApp message. Tell us what you are building and we will point you in the right direction.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary contact-editorial-cta-button">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
