/* ============================================================
   D&M LABS - FAQ Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient
   ============================================================ */
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { ChevronDown, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/35797472847?text=Hi%20D%26M%20Labs!%20I%20have%20a%20question.";

const faqs = [
  {
    category: "Getting Started",
    items: [
      { q: "How do I get started?", a: "Just send us a message on WhatsApp. We'll have a quick chat about your business, recommend the best package, and get started right away. No forms, no waiting." },
      { q: "What information do I need to provide?", a: "At minimum, your business name and a brief description of what you do. If you have a logo, photos, or specific text you'd like to use - great. If not, we can work with what you have." },
      { q: "How long does it take to build my website?", a: "Starter websites take 5–7 working days. Business websites take 7–10 working days. The timeline starts once we receive your content and confirm the project scope." },
      { q: "Do I need any technical knowledge?", a: "Absolutely not. We handle everything technical. You just need to tell us about your business and what you want - we take care of the rest." },
      { q: "Do you work with clients outside your country?", a: "Yes. We work with clients worldwide. All communication happens over WhatsApp and email, so location is never a barrier. Our pricing is in euros and we serve businesses across Europe and beyond." },
      { q: "Can I see a preview before paying?", a: "Yes. We share a design preview for your approval before we proceed to full development. You won't pay anything until you're happy with the direction of the design." },
      { q: "Can I upgrade my plan later?", a: "Absolutely. If you start with the Starter plan and later decide you need more pages or features, we can upgrade your site at any time. You only pay the difference between the plans." },
    ],
  },
  {
    category: "Pricing & Payment",
    items: [
      { q: "Are there any hidden fees?", a: "No. The price you see is the price you pay for the website build. Hosting and domain costs are separate (typically €10–15/month) and we'll explain everything upfront before you commit." },
      { q: "How does payment work?", a: "You pay for the full project once we agree on the scope. Payment secures your spot and we begin work immediately. Simple, transparent, and no surprises." },
      { q: "What payment methods do you accept?", a: "We accept bank transfers and major payment methods. We'll provide payment details when you're ready to proceed." },
      { q: "Do I own my website after it's built?", a: "Yes, 100%. Once paid in full, the website and all its content belong to you completely." },
    ],
  },
  {
    category: "Design & Features",
    items: [
      { q: "Can I see examples of your work?", a: "Yes! Contact us on WhatsApp and we'll share recent examples relevant to your industry." },
      { q: "Will my website work on mobile phones?", a: "Absolutely. Every website we build is mobile-first - meaning it's designed to look and work perfectly on phones, tablets, and desktops." },
      { q: "Can I make changes after the website is live?", a: "Yes. Small text changes are free for the first month after launch. After that, our maintenance plans (from €39/month) cover ongoing updates, or you can request individual changes." },
      { q: "Do you provide hosting?", a: "We set up your hosting and make sure everything runs smoothly. Hosting costs are typically €10–15/month, separate from the build cost." },
    ],
  },
  {
    category: "After Launch",
    items: [
      { q: "What happens after my website launches?", a: "We make sure everything is working perfectly. For the first month, we're available for small adjustments at no extra cost. After that, you can opt into our maintenance plan or manage things independently." },
      { q: "What does the maintenance plan include?", a: "We offer two tiers: Essential (€39/month) covers up to 3 content updates, hosting monitoring, backups, and WhatsApp support. Premium (€59/month) adds unlimited updates, priority response, monthly performance checks, seasonal banners, and new section additions. No contracts - cancel any time." },
      { q: "Can I cancel the maintenance plan?", a: "Yes, anytime. There are no contracts or commitments. You can cancel whenever you want." },
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
        style={{ maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-[#5B6472] leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
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
              Everything you need to know about working with D&M Labs. Can't find your answer? Just message us.
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
            <a href="/contact" className="btn-primary">
              <MessageCircle size={18} /> Contact Us
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
