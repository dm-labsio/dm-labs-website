/* ============================================================
   D&M LABS — /web-design-nicosia landing page
   Design: #0F172A dark, #5B8CFF→#8B5CFF gradient accents, #F6F6F4 bg
   SEO target: "web design Nicosia", "website design Nicosia Cyprus"
   LocalBusiness schema injected on mount
   ============================================================ */
import { Link } from "wouter";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "description": "D&M Labs designs and builds professional websites for businesses in Nicosia and across Cyprus. Mobile-first, SEO-optimised, delivered in 5-14 days.",
  "url": "https://dm-labs.io/web-design-nicosia",
  "logo": "https://dm-labs.io/logo.png",
  "image": "https://dm-labs.io/og-image.png",
  "telephone": "+35797472847",
  "email": "info@dm-labs.io",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nicosia",
    "addressCountry": "CY"
  },
  "areaServed": [
    { "@type": "City", "name": "Nicosia" },
    { "@type": "City", "name": "Strovolos" },
    { "@type": "City", "name": "Aglandjia" },
    { "@type": "City", "name": "Latsia" },
    { "@type": "City", "name": "Lakatamia" },
    { "@type": "AdministrativeArea", "name": "Nicosia District" }
  ],
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Bank Transfer, PayPal",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.instagram.com/dmlabs.io"
  ]
};

const faqs = [
  {
    q: "How much does a website cost for a Nicosia business?",
    a: "Our packages start from €249 for a Starter site — a fully custom, mobile-responsive website with SEO setup, a contact form, and everything needed to go live. The Business package starts from €399 and the Premium from €699. We always recommend a free consultation first so you get an accurate quote with no surprises."
  },
  {
    q: "Do you work with businesses in Nicosia remotely?",
    a: "Yes, entirely. D&M Labs works with clients across Cyprus without any need for in-person meetings. The full process — initial brief, design, revisions, and launch — is handled via WhatsApp, email, and video call. Most clients find it faster and more convenient than scheduling office visits."
  },
  {
    q: "Can you build a website in Greek and English?",
    a: "Absolutely. We build bilingual websites in both Greek and English, and a full Greek-language version is available on request. If your audience is primarily Greek-speaking, we can build a Greek-only site. We are comfortable working with Greek content and advise on how to structure copy for both readability and search visibility."
  },
  {
    q: "How long does it take to build a website for a Nicosia business?",
    a: "The Starter package typically launches within 5 to 7 days from the moment we have your content and feedback. The Business and Premium packages take 10 to 14 days depending on the number of pages and any custom features involved. We keep you updated throughout and do not disappear between milestones."
  }
];

const industries = [
  { name: "Law Firms & Legal Services", icon: "⚖️", desc: "Nicosia is Cyprus's legal and financial hub. A professional website builds credibility and attracts high-value clients." },
  { name: "Restaurants & Cafés", icon: "🍽️", desc: "From the old city to Engomi, Nicosia's F&B scene is competitive. A fast, menu-rich website drives reservations and walk-ins." },
  { name: "Clinics & Healthcare", icon: "🏥", desc: "Private clinics, dentists, and specialists in Nicosia need a trustworthy online presence to attract and retain patients." },
  { name: "Retail & Boutiques", icon: "🛍️", desc: "Whether in the Makarios Avenue shopping corridor or a neighbourhood side street, a website extends your reach beyond foot traffic." },
  { name: "Accounting & Finance", icon: "📊", desc: "Cyprus's financial services sector is centred in Nicosia. A polished website signals professionalism to corporate clients." },
  { name: "Real Estate Agencies", icon: "🏠", desc: "Property buyers search online first. A clean, fast website with listings and contact forms converts browsers into enquiries." },
];

export default function WebDesignNicosia() {
  useSEO({
    title: "Web Design Nicosia | Professional Websites from €249 | D&M Labs",
    description: "Professional web design for businesses in Nicosia, Cyprus. Custom websites built in 5-14 days from €249. Mobile-first, SEO-optimised, no hidden fees. Free consultation.",
    canonicalPath: "/web-design-nicosia"
  });

  useEffect(() => {
    const existing = document.getElementById("schema-nicosia");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-nicosia";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("schema-nicosia");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Web Design Nicosia
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
              Professional Websites for{" "}
              <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
                Nicosia Businesses
              </span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
              D&M Labs is a web design studio helping businesses in Nicosia build a strong, credible online presence. We deliver fast, mobile-first, and conversion-focused websites — starting from €249 — so your business stands out in Cyprus's capital city.
            </p>
            <p className="text-sm text-[#9CA3AF] mb-8">
              Η σελίδα είναι διαθέσιμη και στα ελληνικά κατόπιν αιτήματος. (A full Greek-language version of this page is available on request.)
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Get a Free Consultation
                </button>
              </Link>
              <Link href="/pricing">
                <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                  View Pricing
                </button>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHY NICOSIA BUSINESSES NEED A WEBSITE ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Why Nicosia Businesses Need a Proper Website in 2026
            </h2>
            <p className="text-[#5B6472] leading-relaxed mb-6">
              Nicosia is the commercial, legal, and administrative capital of Cyprus. It is home to the island's largest concentration of law firms, financial services companies, government contractors, private clinics, and retail businesses. Competition is intense — and the first place most potential clients look is Google.
            </p>
            <p className="text-[#5B6472] leading-relaxed mb-6">
              A slow, outdated, or non-existent website is not just a missed opportunity — it actively loses you business. Studies consistently show that over 75% of users judge a company's credibility based on its website design. In a market as professional as Nicosia, first impressions are everything.
            </p>
            <p className="text-[#5B6472] leading-relaxed">
              D&M Labs builds websites that are fast, mobile-first, and optimised for Google from day one. Whether you are a law firm on Makarios Avenue, a restaurant in the old city, or a clinic in Strovolos, we build the kind of website that converts visitors into clients.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Industries We Serve in Nicosia
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              We work with a wide range of businesses across Nicosia. Every website is built to the specific needs of your industry — not a generic template.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <AnimateIn key={ind.name}>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm h-full">
                  <span className="text-3xl mb-3 block">{ind.icon}</span>
                  <h3 className="font-bold text-[#111315] text-base mb-2">{ind.name}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{ind.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Web Design Pricing for Nicosia Businesses
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Transparent, fixed pricing. No hidden fees, no hourly billing surprises. Every package includes custom design, mobile-first build, SEO setup, and a contact form.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "€249",
                desc: "Perfect for sole traders, freelancers, and small businesses that need a clean, professional online presence.",
                features: ["Up to 5 pages", "Mobile-first design", "Contact form", "Basic SEO setup", "Google Maps integration", "Delivered in 5-7 days"],
                highlight: false
              },
              {
                name: "Business",
                price: "€399",
                desc: "Ideal for established businesses in Nicosia that need more content, more pages, and stronger SEO foundations.",
                features: ["Up to 10 pages", "Advanced SEO setup", "Blog or news section", "WhatsApp chat button", "Analytics integration", "Delivered in 7-10 days"],
                highlight: true
              },
              {
                name: "Premium",
                price: "€699",
                desc: "For businesses that want a fully custom, feature-rich website with booking systems, multilingual content, or e-commerce.",
                features: ["Unlimited pages", "Booking / enquiry system", "Bilingual (Greek + English)", "Custom animations", "Priority support", "Delivered in 10-14 days"],
                highlight: false
              }
            ].map((pkg) => (
              <AnimateIn key={pkg.name}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col ${pkg.highlight ? "border-[#5B8CFF] shadow-lg bg-gradient-to-b from-[#EEF3FF] to-white" : "border-[#E8EAF0] shadow-sm bg-white"}`}>
                  {pkg.highlight && (
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#5B8CFF] mb-2">Most Popular</span>
                  )}
                  <h3 className="font-extrabold text-[#111315] text-xl mb-1">{pkg.name}</h3>
                  <p className="text-3xl font-extrabold text-[#5B8CFF] mb-3">{pkg.price}</p>
                  <p className="text-[#5B6472] text-sm leading-relaxed mb-4">{pkg.desc}</p>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#374151]">
                        <span className="text-[#5B8CFF] mt-0.5 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${pkg.highlight ? "bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white hover:opacity-90" : "border border-[#5B8CFF] text-[#5B8CFF] hover:bg-[#EEF3FF]"}`}>
                      Get started
                    </button>
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY D&M LABS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Why Nicosia Businesses Choose D&M Labs
            </h2>
            <p className="text-[#5B6472] leading-relaxed mb-8">
              D&M Labs is a remote web design studio. We work with businesses across Cyprus — from Nicosia and Limassol to smaller towns — entirely online. No office visits, no delays waiting for in-person meetings. The full process, from first call to launch, is managed by us so you can focus on running your business.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Fast delivery",
                desc: "Most websites are live within 5 to 14 days. We work quickly, communicate clearly, and do not leave you waiting."
              },
              {
                title: "No technical knowledge needed",
                desc: "You do not need to understand code, hosting, or SEO. We handle everything and explain what matters in plain language."
              },
              {
                title: "Built to convert",
                desc: "Every page is designed with one goal in mind — turning visitors into enquiries. Good design is only useful if it drives results."
              }
            ].map((w) => (
              <AnimateIn key={w.title}>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                  <h3 className="font-bold text-[#111315] text-lg mb-2">{w.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{w.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Serving Businesses Across Nicosia
            </h2>
            <p className="text-[#5B6472] mb-8">
              We work with businesses throughout Nicosia — from the old walled city and Makarios Avenue to Strovolos, Aglandjia, Latsia, Lakatamia, and the wider Nicosia District. Distance is not a factor.
            </p>
          </AnimateIn>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Nicosia, Cyprus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52000!2d33.3642!3d35.1856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1767b0b5c3e7%3A0x5a4e7e1b2a3c4d5e!2sNicosia%2C%20Cyprus!5e0!3m2!1sen!2scy!4v1700000000001!5m2!1sen!2scy"
            />
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-[#111315] mb-3">
              Also Serving Other Cities
            </h2>
            <p className="text-[#5B6472] mb-6 leading-relaxed">
              D&M Labs works with businesses across Cyprus and beyond. We also have dedicated pages for other cities we serve:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/web-design-limassol">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-sm hover:bg-[#EEF3FF] transition-colors cursor-pointer">
                  Web Design Limassol →
                </span>
              </Link>
              <Link href="/web-design-thessaloniki">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#8B5CFF] text-[#8B5CFF] font-semibold text-sm hover:bg-[#F3EEFF] transition-colors cursor-pointer">
                  Web Design Thessaloniki →
                </span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-10">
              Frequently Asked Questions
            </h2>
          </AnimateIn>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <AnimateIn key={faq.q}>
                <div className="bg-[#F8F9FC] rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                  <h3 className="font-bold text-[#111315] text-base mb-3">{faq.q}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to get your Nicosia business online?
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Tell us about your business and we will send you a free proposal within 24 hours. No commitment, no pressure. You can also reach us directly on WhatsApp — we are quick to respond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                  Contact us today
                </button>
              </Link>
              <a
                href="https://wa.me/35797472847?text=Hi%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20in%20Nicosia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                  Chat on WhatsApp
                </button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

    </main>
  );
}
