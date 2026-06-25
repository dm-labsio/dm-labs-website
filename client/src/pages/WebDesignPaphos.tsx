/* ============================================================
   D&M LABS — Web Design Paphos Landing Page
   Target keywords: "web design paphos", "website design paphos",
   "web design paphos cyprus", "website paphos"
   Current GSC position: 11.7 — closest to page 1
   Design: light bg, brand gradient accents, clean typography
   ============================================================ */
import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://dm-labs.io/web-design-paphos#localbusiness",
      "name": "D&M Labs",
      "description": "D&M Labs designs and builds professional websites for businesses in Paphos and across Cyprus. Mobile-first, SEO-optimised, delivered in 5–14 days.",
      "url": "https://dm-labs.io/web-design-paphos",
      "logo": "https://dm-labs.io/logo.png",
      "image": "https://dm-labs.io/og-image.png",
      "telephone": "+35797472847",
      "email": "info@dm-labs.io",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paphos",
        "addressCountry": "CY"
      },
      "areaServed": [
        { "@type": "City", "name": "Paphos" },
        { "@type": "City", "name": "Kato Paphos" },
        { "@type": "City", "name": "Peyia" },
        { "@type": "City", "name": "Chlorakas" },
        { "@type": "City", "name": "Geroskipou" },
        { "@type": "AdministrativeArea", "name": "Paphos District" }
      ],
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": "Bank Transfer, PayPal",
      "openingHours": "Mo-Fr 09:00-18:00",
      "sameAs": ["https://www.instagram.com/dmlabs.io"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does web design cost in Paphos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our web design packages for Paphos businesses start from €299 for a Starter site — a fully custom, mobile-responsive website with SEO setup and a contact form. The Business package is €399 and the Premium is €699. We offer a free consultation so you get an accurate quote with no surprises."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with tourism and hospitality businesses in Paphos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — tourism and hospitality is one of our strongest verticals. Paphos is one of Cyprus's most visited destinations, and we build websites specifically designed to convert visitors into bookings: fast-loading, multilingual, with booking integrations and Google Maps. We understand the seasonal nature of the Paphos market."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to build a website for a Paphos business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Starter package typically launches within 5 to 7 days from the moment we have your content and feedback. The Business and Premium packages take 10 to 14 days. We work entirely remotely so there is no need for in-person meetings — everything is handled via WhatsApp, email, and video call."
          }
        },
        {
          "@type": "Question",
          "name": "Can you build a website in multiple languages for my Paphos business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We build multilingual websites in English, Greek, and Russian — the three primary languages of the Paphos tourism market. A multilingual site significantly improves your Google visibility for international visitors searching in their own language."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer SEO services for Paphos businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every website we build includes foundational SEO — meta tags, structured data, sitemap, and fast page speeds. We also offer ongoing SEO and GEO (Generative Engine Optimisation) packages that help your business appear in both Google search results and AI-powered answers on ChatGPT and Perplexity."
          }
        }
      ]
    }
  ]
};

const industries = [
  { name: "Hotels & Villas", icon: "🏨", desc: "Paphos is one of Cyprus's top tourist destinations. A fast, multilingual website with booking integration converts visitors into direct reservations — cutting out commission fees." },
  { name: "Restaurants & Tavernas", icon: "🍽️", desc: "From the Paphos Harbour waterfront to the old town, the F&B scene is competitive. A website with menus, photos, and a reservation form drives covers and repeat visits." },
  { name: "Tour Operators & Activities", icon: "🚤", desc: "Boat trips, jeep safaris, diving — Paphos visitors book experiences online. A well-structured activity website with clear pricing and booking converts browsers into paying customers." },
  { name: "Real Estate Agencies", icon: "🏠", desc: "Paphos is one of the most active property markets in Cyprus, with strong demand from UK, Russian, and Israeli buyers. A professional website with listings and multilingual content is essential." },
  { name: "Beauty & Wellness", icon: "💆", desc: "Spas, salons, and wellness studios in Paphos serve both locals and tourists. A website with services, pricing, and online booking removes friction and fills your calendar." },
  { name: "Retail & Boutiques", icon: "🛍️", desc: "Whether in the Kings Avenue Mall or a local street, a website extends your reach beyond foot traffic and lets you sell to tourists before they even land in Cyprus." },
];

const stats = [
  { value: "7–14", label: "Days to launch" },
  { value: "€299", label: "Starting price" },
  { value: "100%", label: "Mobile-first" },
  { value: "3", label: "Languages supported" },
];

export default function WebDesignPaphos() {
  useSEO({
    title: "Web Design Paphos | Professional Websites from €299 | D&M Labs",
    description: "Professional web design for businesses in Paphos, Cyprus. Custom websites built in 5–14 days from €299. Mobile-first, SEO-optimised, multilingual. Free consultation.",
    canonicalPath: "/web-design-paphos"
  });

  useEffect(() => {
    const existing = document.getElementById("schema-paphos");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-paphos";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => { document.getElementById("schema-paphos")?.remove(); };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#FFF0EA]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Web Design · Paphos, Cyprus
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight mb-6">
              Web Design in{" "}
              <span className="bg-gradient-to-r from-[#5B8CFF] via-[#6FE3FF] to-[#A855F7] bg-clip-text text-transparent">
                Paphos
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto mb-8 leading-relaxed">
              Professional websites for Paphos businesses — hotels, restaurants, tour operators, real estate, and more. Custom-built, mobile-first, and delivered in 7–14 days from{" "}
              <strong className="text-[#0F172A]">€299</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/35797472847?text=Hi%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20in%20Paphos"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get a Free Consultation
              </a>
              <Link href="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-10 bg-white border-y border-[#E2E5EA]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#5B8CFF] to-[#A855F7] bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-sm text-[#64748B] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PAPHOS BUSINESSES NEED A GREAT WEBSITE ── */}
      <section className="section-spacing">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Why Paphos Businesses Need a Stronger Online Presence
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-5">
              Paphos receives over <strong>1.5 million tourists per year</strong> — and the vast majority of them research and book online before they arrive. Whether you run a hotel in Kato Paphos, a taverna near the harbour, a villa rental in Peyia, or a real estate agency serving international buyers, your website is your most important sales tool.
            </p>
            <p className="text-[#475569] text-lg leading-relaxed mb-5">
              The problem is that most Paphos business websites are outdated, slow on mobile, and invisible on Google. Visitors land on a competitor's site instead — and book with them. A professionally built website changes this: it loads in under 2 seconds, works perfectly on every phone, ranks higher on Google, and converts visitors into enquiries.
            </p>
            <p className="text-[#475569] text-lg leading-relaxed">
              D&M Labs builds websites specifically for the Paphos market. We understand the seasonal nature of the tourism economy, the multilingual audience (English, Russian, Greek), and the competitive landscape. Our websites are built to rank in Paphos, convert in Paphos, and grow with your business.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 text-center">
              Industries We Serve in Paphos
            </h2>
            <p className="text-[#64748B] text-center mb-12 max-w-xl mx-auto">
              From the harbour to the hills — we build websites for every type of Paphos business.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <AnimateIn key={ind.name}>
                <div className="bg-[#F8FAFF] rounded-2xl p-6 border border-[#E2E5EA] hover:border-[#5B8CFF] transition-colors">
                  <div className="text-3xl mb-3">{ind.icon}</div>
                  <h3 className="font-semibold text-[#0F172A] mb-2">{ind.name}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{ind.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="section-spacing">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              What Every Paphos Website Includes
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "📱", title: "Mobile-First Design", desc: "Over 70% of Paphos tourism searches happen on mobile. Every site we build is designed for phones first." },
              { icon: "🌍", title: "Multilingual Ready", desc: "English, Greek, and Russian — the three primary languages of the Paphos market. One website, three audiences." },
              { icon: "🔍", title: "SEO & GEO Optimised", desc: "Built to rank on Google and appear in AI-powered answers on ChatGPT and Perplexity for Paphos-related queries." },
              { icon: "⚡", title: "Fast Loading", desc: "Under 2-second load times. Google rewards fast sites with higher rankings. Slow sites lose bookings." },
              { icon: "📍", title: "Google Maps Integration", desc: "Embedded maps, directions, and local business schema so customers find you easily — online and in person." },
              { icon: "📅", title: "Booking & Contact Forms", desc: "Integrated contact forms, WhatsApp buttons, and booking links that convert visitors into enquiries 24/7." },
            ].map((item) => (
              <AnimateIn key={item.title}>
                <div className="flex gap-4 p-5 bg-white rounded-xl border border-[#E2E5EA]">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] to-[#F6F6F4]">
        <div className="container max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Transparent Pricing for Paphos Businesses
            </h2>
            <p className="text-[#475569] mb-10">
              No hidden fees. No "contact us for a quote" mystery. Just clear, honest pricing.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "€299", features: ["5 pages", "Mobile-first", "SEO setup", "Contact form", "7-day delivery"] },
              { name: "Business", price: "€399", features: ["Up to 10 pages", "Blog included", "Analytics", "WhatsApp integration", "10-day delivery"], highlight: true },
              { name: "Premium", price: "€699", features: ["Custom design", "Multilingual", "Booking system", "Priority support", "14-day delivery"] },
            ].map((pkg) => (
              <AnimateIn key={pkg.name}>
                <div className={`rounded-2xl p-6 border ${pkg.highlight ? "border-[#5B8CFF] bg-white shadow-lg" : "border-[#E2E5EA] bg-white"}`}>
                  {pkg.highlight && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-2">Most Popular</span>
                  )}
                  <div className="text-2xl font-bold text-[#0F172A] mb-1">{pkg.name}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#5B8CFF] to-[#A855F7] bg-clip-text text-transparent mb-4">{pkg.price}</div>
                  <ul className="text-sm text-[#475569] space-y-2 mb-6 text-left">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="text-[#22C55E]">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/35797472847?text=Hi%2C%20I%27m%20interested%20in%20the%20web%20design%20package%20for%20my%20Paphos%20business"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pkg.highlight ? "btn-primary w-full block text-center" : "btn-secondary w-full block text-center"}
                  >
                    Get Started
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing">
        <div className="container max-w-2xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">
              Frequently Asked Questions
            </h2>
          </AnimateIn>
          <div className="space-y-4">
            {[
              {
                q: "How much does web design cost in Paphos?",
                a: "Our packages start from €299 for a Starter site — a fully custom, mobile-responsive website with SEO setup and a contact form. The Business package is €399 and the Premium is €699. We offer a free consultation so you get an accurate quote with no surprises."
              },
              {
                q: "Do you work with tourism and hospitality businesses in Paphos?",
                a: "Yes — tourism and hospitality is one of our strongest verticals. Paphos is one of Cyprus's most visited destinations, and we build websites specifically designed to convert visitors into bookings: fast-loading, multilingual, with booking integrations and Google Maps."
              },
              {
                q: "Can you build a website in multiple languages?",
                a: "Absolutely. We build multilingual websites in English, Greek, and Russian — the three primary languages of the Paphos tourism market. A multilingual site significantly improves your Google visibility for international visitors searching in their own language."
              },
              {
                q: "How long does it take to build a website for a Paphos business?",
                a: "The Starter package typically launches within 5 to 7 days. Business and Premium packages take 10 to 14 days. We work entirely remotely — everything is handled via WhatsApp, email, and video call."
              },
              {
                q: "Do you offer SEO services for Paphos businesses?",
                a: "Yes. Every website includes foundational SEO. We also offer ongoing SEO and GEO packages that help your business appear in both Google search results and AI-powered answers on ChatGPT and Perplexity."
              }
            ].map((faq, i) => (
              <AnimateIn key={i}>
                <details className="bg-white rounded-xl border border-[#E2E5EA] p-5 group">
                  <summary className="font-semibold text-[#0F172A] cursor-pointer list-none flex justify-between items-center gap-4">
                    {faq.q}
                    <span className="text-[#5B8CFF] shrink-0 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-[#475569] text-sm leading-relaxed">{faq.a}</p>
                </details>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing dark-section">
        <div className="container max-w-2xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to grow your Paphos business online?
            </h2>
            <p className="text-[#94A3B8] mb-8 text-lg">
              Free consultation. No commitment. We'll tell you exactly what your website needs and how long it will take.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/35797472847?text=Hi%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20in%20Paphos"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Start on WhatsApp
              </a>
              <Link href="/contact" className="btn-secondary !border-white/20 !text-white hover:!bg-white/10">
                Send an Email
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

    </main>
  );
}
