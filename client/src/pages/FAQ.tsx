/* D&M Studio — FAQ Page
   Remove objections. Human tone. Short answers.
   Final question leads to WhatsApp (high conversion moment)
   Smooth accordion animations with framer-motion */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const WHATSAPP_URL = "https://wa.me/972584928177";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      { q: "Do I need technical knowledge to work with you?", a: "Not at all. We handle everything for you. You just tell us about your business and we take care of the rest. No technical knowledge required." },
      { q: "How do I get started?", a: "Just send us a message on WhatsApp or fill in our contact form. We'll have a quick chat about your business and take it from there. No commitment needed." },
      { q: "What information do I need to provide?", a: "Just the basics: your business name, what you do, and any photos or logo you have. Don't have a logo or photos? No problem — we can work without them." },
    ],
  },
  {
    category: "Delivery & Timeline",
    questions: [
      { q: "How fast can you deliver my website?", a: "Most websites are delivered within 5–10 working days. The Starter Website takes 5–7 days, and the Business Website takes 7–10 days. The timeline starts once we receive your information." },
      { q: "What happens if I'm slow to send my information?", a: "No pressure. The timeline starts once we receive your materials. We'll send you a simple checklist so you know exactly what to send." },
      { q: "Can I see the website before it goes live?", a: "Yes, always. We show you a preview of your website before we launch it. You review it, give feedback, and we make adjustments until you're happy." },
    ],
  },
  {
    category: "Domain & Hosting",
    questions: [
      { q: "Do I need to buy a domain name?", a: "Yes, you'll need a domain (like yourbusiness.com). We help you set it up step by step. Your domain always belongs to you — not to us." },
      { q: "Do you help with hosting?", a: "Yes. We help you set up hosting and connect everything. We recommend reliable, affordable hosting options and guide you through the process." },
      { q: "What happens to my website if I stop working with you?", a: "Your website and domain always belong to you. If you ever decide to move on, you keep everything. No lock-in." },
    ],
  },
  {
    category: "Updates & Changes",
    questions: [
      { q: "Can I update my website later?", a: "Yes. We can help you update your website anytime. Small updates are included in our maintenance plan, or you can contact us for one-off changes." },
      { q: "How many revisions are included?", a: "Up to 2 revision rounds are included in every package. We want you to be happy with the result. Additional changes can be arranged after launch." },
      { q: "Can I add more pages later?", a: "Yes. We can add pages to your website at any time. Just contact us and we'll give you a simple quote." },
    ],
  },
  {
    category: "Technical Questions",
    questions: [
      { q: "Will my website work on mobile phones?", a: "Yes. Every website we build is designed for mobile phones first. It will look great and work perfectly on all phones, tablets, and computers." },
      { q: "Will my website show up on Google?", a: "We set up your website with the basics so Google can find it. This takes time — Google usually takes a few weeks to index new websites. We include basic SEO setup in every package." },
      { q: "Is my website secure?", a: "Yes. Every website we build includes SSL security (the padlock in your browser). Your website runs on a secure connection." },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      { q: "Are there any hidden costs?", a: "No. The price we quote is the price you pay. The only additional costs are your domain name (usually €10–15/year) and hosting (usually €5–15/month), which are paid directly to the providers." },
      { q: "How does payment work?", a: "We split the payment in two. You pay 50% before we start, and the remaining 50% before we launch. Simple and fair." },
      { q: "Do I need to sign a long contract?", a: "No. There are no long contracts. You pay per project. The optional maintenance plan can be cancelled anytime." },
    ],
  },
  {
    category: "Still Have Questions?",
    questions: [
      { q: "Still unsure? Not sure where to start?", a: "Send us a message and we'll guide you step by step. We work with small businesses every day and we're happy to answer any question — no matter how simple it seems." },
    ],
  },
];

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function FAQItem({ q, a, isLast }: { q: string; a: string; isLast?: boolean }) {
  const [open, setOpen] = useState(isLast || false);

  return (
    <div className={`border-b border-border last:border-0 ${isLast ? "bg-accent/30 rounded-xl px-4 border-0 mb-0" : ""}`}>
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={`font-medium text-foreground group-hover:text-primary transition-colors ${isLast ? "text-primary" : ""}`}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className="text-muted-foreground" aria-hidden="true" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              {isLast && (
                <div className="mt-4">
                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <WhatsAppIcon />
                    Message Us on WhatsApp
                  </motion.a>
                  <p className="text-xs text-muted-foreground mt-2">We usually respond the same day.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div>
      {/* Hero */}
      <section className="section bg-background pt-24 lg:pt-32">
        <div className="container">
          <AnimateIn className="max-w-2xl">
            <span className="section-label">FAQ</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-5" style={{ letterSpacing: "-0.02em" }}>
              Questions we hear all the time
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've answered the most common questions below. If you don't find what you're looking for, just message us.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl space-y-10">
            {faqs.map((section, si) => (
              <AnimateIn key={section.category} delay={si * 0.06}>
                <h2 className="text-lg font-bold text-foreground mb-4">
                  {section.category}
                </h2>
                <div className="bg-background rounded-2xl border border-border overflow-hidden px-4">
                  {section.questions.map((faq, qi) => (
                    <FAQItem
                      key={faq.q}
                      q={faq.q}
                      a={faq.a}
                      isLast={si === faqs.length - 1 && qi === section.questions.length - 1}
                    />
                  ))}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, oklch(0.58 0.19 264) 0%, transparent 50%)" }} aria-hidden="true" />
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get your website?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/70 text-lg mb-8 max-w-sm mx-auto">
              Start with a quick chat. No obligation, no pressure.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-base shadow-xl"
              whileHover={{ scale: 1.04, boxShadow: "0 16px 48px rgba(37, 211, 102, 0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon size={18} />
              Chat on WhatsApp
            </motion.a>
            <p className="text-white/50 text-sm mt-3">We usually respond the same day.</p>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
