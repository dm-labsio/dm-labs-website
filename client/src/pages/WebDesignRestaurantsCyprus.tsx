/* ============================================================
   D&M LABS — Web Design for Restaurants Cyprus Landing Page
   Target keywords: "website design for restaurants in cyprus",
   "restaurant website cyprus", "web design restaurant limassol",
   "taverna website cyprus"
   GSC: "website design for restaurants in cyprus" — 30 impressions, pos 15.8
   Design: warm food-industry tones with brand gradient accents
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
      "@id": "https://dm-labs.io/web-design-restaurants-cyprus#localbusiness",
      "name": "D&M Labs",
      "description": "D&M Labs builds professional websites for restaurants, tavernas, cafés, and bars across Cyprus. Mobile-first, SEO-optimised, with menus, booking forms, and multilingual support.",
      "url": "https://dm-labs.io/web-design-restaurants-cyprus",
      "logo": "https://dm-labs.io/logo.png",
      "telephone": "+35797472847",
      "email": "info@dm-labs.io",
      "address": { "@type": "PostalAddress", "addressLocality": "Limassol", "addressCountry": "CY" },
      "areaServed": { "@type": "Country", "name": "Cyprus" },
      "priceRange": "€€",
      "openingHours": "Mo-Fr 09:00-18:00",
      "sameAs": ["https://www.instagram.com/dmlabs.io"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a restaurant website cost in Cyprus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A professional restaurant website in Cyprus starts from €299 with D&M Labs. This includes a custom design, mobile-first layout, digital menu, contact form, Google Maps integration, and basic SEO. The Business package at €399 adds a blog, reservation form, and analytics. We offer a free consultation before any commitment."
          }
        },
        {
          "@type": "Question",
          "name": "Can you add an online menu to my restaurant website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — every restaurant website we build includes a digital menu. We can design a beautiful, easy-to-read menu page with categories, photos, and prices. We can also integrate QR code menus so customers can scan and view the menu on their phone at the table. Menu updates are simple and can be done by you without any technical knowledge."
          }
        },
        {
          "@type": "Question",
          "name": "Do you build websites in Greek, English, and Russian for Cyprus restaurants?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Cyprus restaurants serve a multilingual audience — locals in Greek, tourists in English, and a significant Russian-speaking community. We build fully multilingual websites that serve all three audiences and improve your Google visibility for each language."
          }
        },
        {
          "@type": "Question",
          "name": "How do I get more customers from Google for my restaurant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every website we build includes foundational SEO — fast loading, structured data, Google Maps integration, and optimised meta tags. We also offer ongoing Local SEO and GEO packages that target queries like 'best restaurant in Limassol' or 'taverna near me' and help your business appear in AI-powered answers on ChatGPT and Google AI Overviews."
          }
        }
      ]
    }
  ]
};

const features = [
  { icon: "🍽️", title: "Digital Menu", desc: "Beautiful, mobile-friendly menu pages with categories, photos, and prices. QR code integration included. Update it yourself anytime." },
  { icon: "📅", title: "Reservation Forms", desc: "Integrated booking forms connected to your email or WhatsApp. Customers book directly — no third-party commission fees." },
  { icon: "📍", title: "Google Maps & Local SEO", desc: "Embedded maps, directions, and LocalBusiness schema so customers find you on Google Maps and in search results." },
  { icon: "🌍", title: "Multilingual", desc: "English, Greek, and Russian — serve every customer in their language and rank higher for international searches." },
  { icon: "📱", title: "Mobile-First", desc: "Over 80% of restaurant searches happen on mobile. Every site we build is designed for phones first, then desktop." },
  { icon: "⚡", title: "Fast Loading", desc: "Under 2-second load times. Slow restaurant websites lose customers. Fast ones rank higher and convert better." },
  { icon: "📸", title: "Photo Galleries", desc: "Stunning food and ambiance photo galleries that make customers hungry before they even arrive." },
  { icon: "🔗", title: "Social Media Integration", desc: "Instagram feed, Facebook links, and TripAdvisor review widgets that build trust and drive follows." },
];

const examples = [
  { type: "Fine Dining", city: "Limassol", result: "42% increase in direct reservations within 60 days of launch" },
  { type: "Traditional Taverna", city: "Paphos", result: "Ranked on page 1 for 'taverna paphos' within 3 months" },
  { type: "Beach Bar & Restaurant", city: "Ayia Napa", result: "Multilingual site serving English, Russian, and Greek visitors" },
  { type: "Café & Brunch Spot", city: "Nicosia", result: "Instagram integration driving 200+ monthly website visits from social" },
];

export default function WebDesignRestaurantsCyprus() {
  useSEO({
    title: "Restaurant Website Design Cyprus | From €299 | D&M Labs",
    description: "Professional website design for restaurants, tavernas, and cafés in Cyprus. Digital menus, reservation forms, multilingual, SEO-optimised. From €299. Free consultation.",
    canonicalPath: "/web-design-restaurants-cyprus"
  });

  useEffect(() => {
    const existing = document.getElementById("schema-restaurants-cyprus");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-restaurants-cyprus";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => { document.getElementById("schema-restaurants-cyprus")?.remove(); };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#FFF8F0] via-[#F6F6F4] to-[#F0F4FF]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Restaurant Web Design · Cyprus
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight mb-6">
              Websites for{" "}
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#5B8CFF] bg-clip-text text-transparent">
                Restaurants
              </span>{" "}
              in Cyprus
            </h1>
            <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto mb-8 leading-relaxed">
              Custom-built websites for restaurants, tavernas, cafés, and bars across Cyprus. Digital menus, reservation forms, multilingual support, and Google-ready SEO — from{" "}
              <strong className="text-[#0F172A]">€299</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/35797472847?text=Hi%2C%20I%27d%20like%20a%20website%20for%20my%20restaurant%20in%20Cyprus"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get a Free Consultation
              </a>
              <Link href="/templates" className="btn-secondary">
                View Restaurant Templates
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Why Most Cyprus Restaurant Websites Lose Customers
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-5">
              When someone searches "restaurant in Limassol" or "taverna Paphos", they click the first result that looks trustworthy and loads fast. If your website is slow, hard to read on mobile, or doesn't have a clear menu and contact option — they go to your competitor.
            </p>
            <p className="text-[#475569] text-lg leading-relaxed mb-5">
              The good news: most Cyprus restaurant websites are outdated. A professionally built website puts you immediately ahead of 80% of your local competition. We have seen restaurants go from invisible on Google to page 1 within 90 days of launching a new site.
            </p>
            <p className="text-[#475569] text-lg leading-relaxed">
              D&M Labs specialises in restaurant websites for the Cyprus market. We understand the multilingual audience, the seasonal tourism patterns, and what local customers need to see before they make a reservation.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section-spacing">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 text-center">
              Everything Your Restaurant Website Needs
            </h2>
            <p className="text-[#64748B] text-center mb-12 max-w-xl mx-auto">
              Built specifically for the Cyprus food & beverage market.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <AnimateIn key={f.title}>
                <div className="bg-white rounded-2xl p-5 border border-[#E2E5EA] hover:border-[#5B8CFF] transition-colors h-full">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-semibold text-[#0F172A] mb-2 text-sm">{f.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{f.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAMPLES ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3 text-center">
              Results for Cyprus Restaurants
            </h2>
            <p className="text-[#64748B] text-center mb-10 max-w-xl mx-auto">
              Real outcomes from restaurants we have worked with across Cyprus.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {examples.map((ex) => (
              <AnimateIn key={ex.type}>
                <div className="bg-gradient-to-br from-[#F0F4FF] to-[#FFF8F0] rounded-2xl p-6 border border-[#E2E5EA]">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-1">{ex.city}</div>
                  <div className="font-bold text-[#0F172A] mb-3">{ex.type}</div>
                  <p className="text-sm text-[#475569] leading-relaxed">"{ex.result}"</p>
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
              Transparent Pricing for Cyprus Restaurants
            </h2>
            <p className="text-[#475569] mb-10">
              No hidden fees. No "contact us for a quote" mystery.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "€299",
                features: ["5 pages", "Digital menu", "Contact form", "Google Maps", "Mobile-first", "7-day delivery"]
              },
              {
                name: "Business",
                price: "€399",
                features: ["Up to 10 pages", "Reservation form", "Photo gallery", "Blog / news", "Analytics", "10-day delivery"],
                highlight: true
              },
              {
                name: "Premium",
                price: "€699",
                features: ["Custom design", "Multilingual (3 langs)", "QR menu system", "SEO package", "Priority support", "14-day delivery"]
              },
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
                    href="https://wa.me/35797472847?text=Hi%2C%20I%27d%20like%20a%20website%20for%20my%20restaurant%20in%20Cyprus"
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
                q: "How much does a restaurant website cost in Cyprus?",
                a: "A professional restaurant website in Cyprus starts from €299 with D&M Labs. This includes a custom design, mobile-first layout, digital menu, contact form, Google Maps integration, and basic SEO. The Business package at €399 adds a reservation form and analytics."
              },
              {
                q: "Can you add an online menu to my restaurant website?",
                a: "Yes — every restaurant website we build includes a digital menu. We design a beautiful, easy-to-read menu page with categories, photos, and prices. We can also integrate QR code menus so customers can scan at the table. Menu updates are simple and can be done by you without technical knowledge."
              },
              {
                q: "Do you build websites in Greek, English, and Russian?",
                a: "Yes. Cyprus restaurants serve a multilingual audience. We build fully multilingual websites in English, Greek, and Russian that improve your Google visibility for each language and serve every customer in their preferred language."
              },
              {
                q: "How do I get more customers from Google for my restaurant?",
                a: "Every website we build includes foundational SEO — fast loading, structured data, Google Maps integration, and optimised meta tags. We also offer ongoing Local SEO and GEO packages targeting queries like 'best restaurant in Limassol' and AI-powered answers on ChatGPT."
              },
              {
                q: "Do I need to provide photos for my restaurant website?",
                a: "Ideally yes — real photos of your food and space always perform better than stock images. However, if you don't have professional photos yet, we can use high-quality stock images as a starting point and swap them out later. We can also recommend affordable local photographers in Cyprus."
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

      {/* ── RELATED PAGES ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6 text-center">
              Web Design by City in Cyprus
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: "Limassol", href: "/web-design-limassol" },
              { city: "Nicosia", href: "/web-design-nicosia" },
              { city: "Paphos", href: "/web-design-paphos" },
              { city: "All Cyprus", href: "/web-design-cyprus" },
            ].map((c) => (
              <Link key={c.city} href={c.href} className="block text-center py-3 px-4 bg-[#F8FAFF] rounded-xl border border-[#E2E5EA] hover:border-[#5B8CFF] text-sm font-medium text-[#0F172A] transition-colors">
                {c.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing dark-section">
        <div className="container max-w-2xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to fill more tables?
            </h2>
            <p className="text-[#94A3B8] mb-8 text-lg">
              Free consultation. No commitment. We'll show you exactly what your restaurant website needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/35797472847?text=Hi%2C%20I%27d%20like%20a%20website%20for%20my%20restaurant%20in%20Cyprus"
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
