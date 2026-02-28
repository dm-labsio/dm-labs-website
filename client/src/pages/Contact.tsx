/* D&M Studio — Contact Page
   Primary: WhatsApp. Secondary: Contact form (4 fields max)
   Remove hesitation. Friendly tone. Response expectation set. */

import { useState } from "react";
import { CheckCircle2, Mail, Clock } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/972584928188";

const businessTypes = [
  "Restaurant / Café",
  "Beauty Salon / Barber",
  "Real Estate",
  "Clinic / Healthcare",
  "Consultant / Coach",
  "Car Rental",
  "Tourism / Travel",
  "Retail Shop",
  "Other",
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", businessType: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Please enter your name.";
    if (!formState.email.trim()) newErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = "Please enter a valid email address.";
    if (!formState.businessType) newErrors.businessType = "Please select your business type.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate form submission (in production, connect to email service)
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="section bg-background pt-24 lg:pt-32">
        <div className="container">
          <div className="max-w-xl">
            <span className="section-label">Contact</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>
              Let's build your website.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tell us about your business and we'll guide you from there. No technical knowledge needed — just a quick chat.
            </p>
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 max-w-4xl">

            {/* WhatsApp — primary */}
            <div>
              <div className="mb-8">
                <span className="section-label">Fastest Option</span>
                <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Chat on WhatsApp
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The quickest way to reach us. Send a message and we'll reply within a few hours.
                </p>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#25D366]/10 border-2 border-[#25D366]/30 hover:border-[#25D366] transition-all duration-200 group mb-4"
                aria-label="Open WhatsApp chat"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Open WhatsApp Chat</p>
                  <p className="text-sm text-muted-foreground">Quick question? Message us directly.</p>
                </div>
              </a>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Clock size={14} aria-hidden="true" />
                <span>We usually respond the same day.</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                <Mail size={18} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email us</p>
                  <a href="mailto:hello@dmstudio.com" className="text-sm text-primary hover:underline">hello@dmstudio.com</a>
                </div>
              </div>
            </div>

            {/* Contact form — secondary */}
            <div>
              <div className="mb-6">
                <span className="section-label">Or Send a Message</span>
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Contact form
                </h2>
                <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 size={28} className="text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Message sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thanks for reaching out. We'll get back to you within 24 hours. Or chat with us on WhatsApp for a faster response.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      Your name <span className="text-destructive" aria-label="required">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Smith"
                      className={`w-full px-4 py-3 rounded-xl border text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm ${errors.name ? "border-destructive" : "border-border"}`}
                      aria-required="true"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <p id="name-error" className="text-xs text-destructive mt-1" role="alert">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      Email address <span className="text-destructive" aria-label="required">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@yourbusiness.com"
                      className={`w-full px-4 py-3 rounded-xl border text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm ${errors.email ? "border-destructive" : "border-border"}`}
                      aria-required="true"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <p id="email-error" className="text-xs text-destructive mt-1" role="alert">{errors.email}</p>}
                  </div>

                  {/* Business type */}
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-foreground mb-1.5">
                      Business type <span className="text-destructive" aria-label="required">*</span>
                    </label>
                    <select
                      id="businessType"
                      value={formState.businessType}
                      onChange={(e) => setFormState({ ...formState, businessType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm ${errors.businessType ? "border-destructive" : "border-border"} ${!formState.businessType ? "text-muted-foreground" : ""}`}
                      aria-required="true"
                      aria-describedby={errors.businessType ? "businessType-error" : undefined}
                    >
                      <option value="" disabled>Select your business type</option>
                      {businessTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.businessType && <p id="businessType-error" className="text-xs text-destructive mt-1" role="alert">{errors.businessType}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                      Message <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us a bit about your business..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-primary text-white font-semibold text-base hover:bg-[oklch(0.52_0.19_264)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "52px" }}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your information is used only to respond to your request.{" "}
                    <a href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
