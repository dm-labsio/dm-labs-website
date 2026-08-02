/* ============================================================
   DM-Labs.io - FAQ Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { useState, useEffect } from "react";
import AnimateIn from "@/components/AnimateIn";
import { ChevronDown, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%20have%20a%20question.";

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
    category: "Website Packages & Payment",
    items: [
      { q: "How much does a website cost?", a: "Launch Website packages start at €299, Growth Website packages start at €749, and Pro Website packages start at €1,499. Enterprise / Custom projects start at €1,499 and are quoted based on scope." },
      { q: "Are there hidden fees?", a: "No. We agree the project scope and price before work begins. Domain, hosting, and third-party service costs, where relevant, are explained separately." },
      { q: "How does payment work?", a: "We agree the payment stages before work begins. The final balance is due on delivery once you have reviewed the agreed result." },
      { q: "What payment methods do you accept?", a: "We accept bank transfer and major payment methods. We provide payment details when you are ready to proceed." },
      { q: "Do I own my website after it is built?", a: "Once paid in full, the website and its content belong to you, subject to any third-party licences or services used in the project." },
    ],
  },
  {
    category: "Website Features & SEO",
    items: [
      { q: "Will my website work on mobile phones?", a: "Yes. Every website package is built to work responsively across phones, tablets, and desktops." },
      { q: "Is SEO included?", a: "Every package includes basic SEO foundations. The Pro Website package includes a fuller SEO structure. Advanced SEO work, additional copywriting, and wider content programmes are scoped separately." },
      { q: "Can you add a booking system, CRM, chatbot, or multiple languages?", a: "Yes. These are usually part of an Enterprise / Custom project because the scope depends on the platform, content, integrations, and requirements." },
      { q: "Can you provide hosting?", a: "We can help with the technical setup and explain any relevant third-party hosting, domain, SSL, or service costs before they are incurred." },
    ],
  },
  {
    category: "After Launch & Website Care",
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
    <div className="border-b border-[#E2E5EA] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium text-[#111315] pr-4 group-hover:text-[#5B8CFF] transition-colors">{q}</span>
        <ChevronDown
          size={20}
          className={`text-[#5B6472] shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#5B8CFF]" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "600px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-[#5B6472] leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  useSEO({
    title: "Website Design FAQ | DM-Labs.io",
    description: "Answers to common questions about DM-Labs.io website packages, pricing, SEO foundations, website care, and project scope.",
  });

  // Inject FAQPage JSON-LD schema for Google rich results (FAQ snippets in search)
  useEffect(() => {
    const SCHEMA_ID = "faq-jsonld-schema";
    const allItems = faqs.flatMap(section => section.items);
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
    let el = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = SCHEMA_ID;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      const s = document.getElementById(SCHEMA_ID);
      if (s) s.remove();
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">FAQ</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Frequently Asked <span className="brand-gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Everything you need to know about working with DM-Labs.io. Can't find your answer? Just message us.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          {faqs.map((section, si) => (
            <AnimateIn key={section.category} delay={si * 0.1} className="mb-12 last:mb-0">
              <h2 className="text-xl font-semibold text-[#111315] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 brand-gradient rounded-full" />
                {section.category}
              </h2>
              <div className="dm-card !p-0 overflow-hidden">
                <div className="px-6">
                  {section.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Still Have Questions?</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">We're always happy to help. Send us a message and we'll get back to you quickly.</p>
            <a href="/contact/" className="btn-primary">
              <MessageCircle size={18} /> Contact Us
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
