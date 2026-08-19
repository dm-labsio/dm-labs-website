import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const WA = "https://wa.me/35797472847?text=%D7%A9%D7%9C%D7%95%D7%9D%20DM-Labs.io%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%93%D7%91%D7%A8%20%D7%A2%D7%9C%20%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%90%D7%AA%D7%A8.";
const ENDPOINT = "https://api.web3forms.com/submit";
const KEY = "bfd3c955-1bc9-4a43-b497-f4c6776db7d1";

export default function ContactHe() {
  useSEO({ title: "צרו קשר עם DM-Labs.io | ייעוץ אתר ללא עלות", description: "דברו עם DM-Labs.io על פרויקט האתר שלכם. WhatsApp, אימייל או טופס יצירת קשר.", ogLocale: "he_IL", noindex: true });
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [sending, setSending] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSending(true);
    try {
      const result = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: KEY, subject: `פנייה חדשה מ-${form.name} | DM-Labs.io`, ...form }) });
      if (!result.ok) throw new Error("Failed");
      toast.success("ההודעה נשלחה. נחזור אליכם בתוך 24 שעות."); setForm({ name: "", email: "", business: "", message: "" });
    } catch { toast.error("משהו השתבש. אפשר לפנות אלינו ב-WhatsApp."); }
    finally { setSending(false); }
  };
  const methods = [
    { Icon: MessageCircle, title: "WhatsApp", note: "המענה המהיר ביותר", detail: "+357 97 472 847", href: WA, ltr: true },
    { Icon: Mail, title: "אימייל", note: "נחזור בתוך 24 שעות", detail: "info@dm-labs.io", href: "mailto:info@dm-labs.io", ltr: true },
    { Icon: Clock, title: "שעות פעילות", note: "שני עד שישי", detail: "9:00 עד 18:00 (EET)", ltr: true },
    { Icon: MapPin, title: "מיקום", note: "מבוססים באירופה", detail: "עובדים עם לקוחות ברחבי העולם", ltr: false },
    { Icon: Instagram, title: "Instagram", note: "עקבו אחרי העבודה שלנו", detail: "@dm_labs.io", href: "https://www.instagram.com/dm_labs.io/", ltr: true },
  ];
  return <div className="contact-editorial hebrew-home" dir="rtl">
    <section className="contact-editorial-hero relative overflow-hidden"><div className="container relative z-10 text-center"><AnimateIn><p className="contact-editorial-label">צרו קשר</p><h1 className="contact-editorial-title"><span>בואו נבנה</span><span>משהו <em>מעולה</em></span></h1><p className="contact-editorial-lead">מוכנים להתחיל? פנו אלינו ב-WhatsApp למענה מהיר, או השאירו פרטים בטופס.</p></AnimateIn></div></section>
    <section className="section-spacing bg-white contact-editorial-section"><div className="container"><div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 max-w-5xl mx-auto">
      <div className="md:col-span-2 space-y-6">{methods.map(({ Icon, title, note, detail, href, ltr }, index) => <AnimateIn key={title} delay={index * 0.1}>{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block dm-card !p-6 group"><div className="flex items-center gap-4 mb-3"><div className="icon-container-gradient !w-12 !h-12 !rounded-xl"><Icon size={22} className="text-[#5B8CFF]" /></div><div><h3>{title}</h3><p className="text-xs text-[#5B6472]">{note}</p></div></div><p className="text-sm text-[#5B8CFF] group-hover:underline" dir={ltr ? "ltr" : undefined}>{detail}</p></a> : <div className="dm-card !p-6"><div className="flex items-center gap-4 mb-3"><div className="icon-container-gradient !w-12 !h-12 !rounded-xl"><Icon size={22} className="text-[#5B8CFF]" /></div><div><h3>{title}</h3><p className="text-xs text-[#5B6472]">{note}</p></div></div><p className="text-sm text-[#5B6472]" dir={ltr ? "ltr" : undefined}>{detail}</p></div>}</AnimateIn>)}</div>
      <AnimateIn delay={0.2} className="md:col-span-3"><div className="dm-card !p-8"><p className="contact-editorial-form-label">פנייה לגבי פרויקט</p><h2 className="contact-editorial-form-heading">שלחו לנו הודעה</h2><form onSubmit={submit} className="space-y-5"><div className="grid grid-cols-1 sm:grid-cols-2 gap-5"><label>השם שלכם<input required className="contact-editorial-field w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="השם שלכם" /></label><label>אימייל<input required type="email" dir="ltr" className="contact-editorial-field w-full" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@business.com" /></label></div><label>שם העסק<input className="contact-editorial-field w-full" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} placeholder="שם העסק שלכם" /></label><label>ספרו לנו על הפרויקט<textarea required rows={4} className="contact-editorial-field w-full resize-none" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="איזה אתר אתם צריכים? אילו תכונות חשובות לכם?" /></label><button disabled={sending} className="btn-primary w-full justify-center">{sending ? "שולחים..." : <><Send size={16} /> שליחת הודעה</>}</button><p className="text-xs text-[#5B6472] text-center">למענה מהיר אפשר גם לפנות אלינו ב-<a href={WA} target="_blank" rel="noopener noreferrer" className="text-[#5B8CFF]">WhatsApp</a>.</p></form></div></AnimateIn>
    </div></div></section>
    <section className="section-spacing dark-section text-center contact-editorial-cta"><div className="container"><AnimateIn><h2 className="contact-editorial-cta-heading"><span>מעדיפים</span><span><em>שיחה מהירה?</em></span></h2><p className="contact-editorial-cta-copy">רוב הלקוחות מתחילים בהודעת WhatsApp קצרה. ספרו לנו מה אתם בונים ונכוון אתכם.</p><a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={18} /> שיחה ב-WhatsApp</a></AnimateIn></div></section>
  </div>;
}
