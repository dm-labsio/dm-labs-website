import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const WA = "https://wa.me/35797472847?text=%D7%A9%D7%9C%D7%95%D7%9D%20DM-Labs.io%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%9C%D7%92%D7%91%D7%99%20%D7%90%D7%AA%D7%A8%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%99.";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "bfd3c955-1bc9-4a43-b497-f4c6776db7d1";

export default function ContactHe() {
  useSEO({
    title: "צרו קשר עם DM-Labs.io | ייעוץ אתר ללא עלות",
    description: "דברו עם DM-Labs.io על פרויקט האתר שלכם. WhatsApp, אימייל או טופס יצירת קשר.",
    canonicalPath: "/he/contact/",
    ogLocale: "he_IL",
    noindex: true,
  });

  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `פנייה חדשה מ${form.name} | DM-Labs.io`,
          name: form.name,
          email: form.email,
          business: form.business,
          message: form.message,
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      toast.success("ההודעה נשלחה. נחזור אליכם בתוך 24 שעות.");
      setForm({ name: "", email: "", business: "", message: "" });
    } catch {
      toast.error("לא הצלחנו לשלוח את ההודעה. אפשר לפנות אלינו ישירות ב-WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const methods = [
    { Icon: MessageCircle, title: "WhatsApp", note: "לרוב זו הדרך המהירה ביותר", detail: "+357 97 472 847", href: WA, ltr: true, action: "שלחו הודעה" },
    { Icon: Mail, title: "אימייל", note: "נחזור אליכם בתוך 24 שעות", detail: "info@dm-labs.io", href: "mailto:info@dm-labs.io", ltr: true },
    { Icon: Clock, title: "שעות פעילות", note: "שני עד שישי", detail: "09:00 עד 18:00 (EET)", ltr: true },
    { Icon: MapPin, title: "מיקום", note: "עובדים מאירופה", detail: "מלווים לקוחות בכל העולם", ltr: false },
    { Icon: Instagram, title: "Instagram", note: "מוזמנים להכיר את העבודה שלנו", detail: "@dm_labs.io", href: "https://www.instagram.com/dm_labs.io/", ltr: true },
  ];

  return (
    <div className="contact-editorial hebrew-home" dir="rtl">
      <section className="relative overflow-hidden contact-editorial-hero" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="contact-editorial-label mb-3">צרו קשר</p>
            <h1 className="contact-editorial-title mb-5"><span>בואו נדבר</span><span>על האתר <em>הבא</em> שלכם</span></h1>
            <p className="contact-editorial-lead max-w-2xl mx-auto">יש לכם רעיון, צורך או שאלה? אפשר לפנות אלינו ב-WhatsApp או להשאיר פרטים, ואנחנו נחזור אליכם בתוך יום עסקים.</p>
          </AnimateIn>
        </div>
      </section>

      <section className="section-spacing bg-white contact-editorial-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 max-w-5xl mx-auto contact-editorial-grid">
            <div className="md:col-span-2 space-y-6 contact-editorial-methods">
              {methods.map(({ Icon, title, note, detail, href, ltr, action }, index) => (
                <AnimateIn key={title} delay={index * 0.1}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block dm-card !p-6 group hover:shadow-lg transition-shadow contact-editorial-method-card">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="icon-container-gradient !w-12 !h-12 !rounded-xl"><Icon size={22} className="text-[#5B8CFF]" /></div>
                        <div><h3 className="text-base font-semibold text-[#111315] contact-editorial-method-title">{title}</h3><p className="text-xs text-[#5B6472] contact-editorial-method-note">{note}</p></div>
                      </div>
                      <p className="text-sm text-[#5B8CFF] group-hover:underline contact-editorial-method-detail" dir={ltr ? "ltr" : undefined}>{detail}</p>
                      {action ? <p className="text-xs text-[#5B8CFF] mt-2 group-hover:underline contact-editorial-method-action">{action}</p> : null}
                    </a>
                  ) : (
                    <div className="dm-card !p-6 contact-editorial-method-card">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="icon-container-gradient !w-12 !h-12 !rounded-xl"><Icon size={22} className="text-[#5B8CFF]" /></div>
                        <div><h3 className="text-base font-semibold text-[#111315] contact-editorial-method-title">{title}</h3><p className="text-xs text-[#5B6472] contact-editorial-method-note">{note}</p></div>
                      </div>
                      <p className="text-sm text-[#5B6472] contact-editorial-method-detail" dir={ltr ? "ltr" : undefined}>{detail}</p>
                    </div>
                  )}
                </AnimateIn>
              ))}
            </div>

            <AnimateIn delay={0.2} className="md:col-span-3">
              <div className="dm-card !p-8 contact-editorial-form-card">
                <p className="contact-editorial-form-label">פנייה לגבי פרויקט</p>
                <h2 className="text-xl font-semibold text-[#111315] mb-6 contact-editorial-form-heading">נשמח לשמוע מכם</h2>
                <form onSubmit={handleSubmit} className="space-y-5 contact-editorial-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-he-name" className="block text-sm font-medium text-[#111315] mb-1.5 contact-editorial-field-label">השם שלכם</label>
                      <input id="contact-he-name" type="text" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all contact-editorial-field" placeholder="השם שלכם" />
                    </div>
                    <div>
                      <label htmlFor="contact-he-email" className="block text-sm font-medium text-[#111315] mb-1.5 contact-editorial-field-label">אימייל</label>
                      <input id="contact-he-email" type="email" required dir="ltr" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all contact-editorial-field" placeholder="you@business.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-he-business" className="block text-sm font-medium text-[#111315] mb-1.5 contact-editorial-field-label">שם העסק</label>
                    <input id="contact-he-business" type="text" value={form.business} onChange={(event) => setForm({ ...form, business: event.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all contact-editorial-field" placeholder="שם העסק שלכם" />
                  </div>
                  <div>
                    <label htmlFor="contact-he-project" className="block text-sm font-medium text-[#111315] mb-1.5 contact-editorial-field-label">ספרו לנו על הפרויקט</label>
                    <textarea id="contact-he-project" required rows={4} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-[#F6F6F4] text-[#111315] text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all resize-none contact-editorial-field" placeholder="איזה אתר אתם צריכים, ומה חשוב לכם בו?" />
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60 contact-editorial-submit">
                    {sending ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> שולחים...</span> : <span className="flex items-center gap-2"><Send size={16} /> שליחת הודעה</span>}
                  </button>
                  <p className="text-xs text-[#5B6472] text-center contact-editorial-form-note">למענה מהיר אפשר גם לכתוב לנו ישירות ב-<a href={WA} target="_blank" rel="noopener noreferrer" className="text-[#5B8CFF] font-medium hover:underline">WhatsApp</a>.</p>
                </form>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="section-spacing dark-section text-center contact-editorial-cta">
        <div className="container">
          <AnimateIn>
            <h2 className="contact-editorial-cta-heading text-3xl sm:text-4xl font-bold text-white mb-5"><span>מעדיפים</span><span><em>שיחה קצרה?</em></span></h2>
            <p className="contact-editorial-cta-copy text-lg mb-8 max-w-xl mx-auto">רבים מתחילים בהודעת WhatsApp קצרה. כתבו לנו מה אתם צריכים, ונמשיך משם.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary contact-editorial-cta-button"><MessageCircle size={18} /> שיחה ב-WhatsApp</a>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
