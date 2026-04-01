import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-thessaloniki
// Primary keyword: "web design Thessaloniki"
// Secondary (GR): "κατασκευή ιστοσελίδας Θεσσαλονίκη"
// Tertiary (GR, price-intent): "κατασκευή ιστοσελίδας Θεσσαλονίκη τιμές"
// Design: matches D&M Labs site style - light bg, brand gradient accents, clean typography

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "url": "https://dm-labs.io",
  "telephone": "+35797472847",
  "email": "info@dm-labs.io",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eleftheriou Chandrinou 5",
    "addressLocality": "Paphos",
    "postalCode": "8045",
    "addressCountry": "CY"
  },
  "areaServed": [
    "Thessaloniki",
    "Central Macedonia",
    "Greece"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 40.6401,
      "longitude": 22.9444
    },
    "geoRadius": "50000"
  },
  "description": "D&M Labs is a remote web design studio building professional, mobile-first, SEO-optimised websites for businesses in Thessaloniki and across Greece. Websites from €249, delivered in 5-14 days.",
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
    q: "How much does web design cost in Thessaloniki?",
    a: "Our packages for businesses in Thessaloniki start from €249 for a Starter site. That includes a fully custom design, mobile-responsive layout, SEO setup, a contact form, and everything you need to go live. The Business package starts from €399 and the Premium from €699. Pricing depends on the scope of the project, so we always recommend a free consultation first - that way you get an accurate quote with no surprises."
  },
  {
    q: "Do you work with businesses in Thessaloniki remotely?",
    a: "Yes, entirely. D&M Labs works with clients across Greece without any need for in-person meetings. The full process - initial brief, design, revisions, and launch - is handled via WhatsApp, email, and video call. Most of our clients find it more convenient than scheduling office visits, and it means we can move faster. Being remote has never been a barrier to delivering a great result."
  },
  {
    q: "Can you build a website in Greek?",
    a: "Absolutely. We build bilingual websites in both Greek and English, and a full Greek-language version of any site is available on request. If your audience is primarily Greek-speaking, we can also build a Greek-only site. We are comfortable working with Greek content and can advise on how to structure the copy for both readability and search visibility."
  },
  {
    q: "How long does it take to build a website for a Thessaloniki business?",
    a: "The Starter package typically launches within 5 to 7 days from the moment we have your content and feedback. The Business and Premium packages take 10 to 14 days depending on the number of pages and any custom features involved. We keep you updated throughout and do not disappear between milestones."
  }
];

export default function WebDesignThessaloniki() {
  useSEO({
    title: "Web Design Thessaloniki | Professional Websites from €249 | D&M Labs",
    description: "Professional web design for businesses in Thessaloniki. Custom websites built in 5-14 days from €249. Mobile-first, SEO-optimised, no hidden fees. Get a free consultation.",
    canonicalPath: "/web-design-thessaloniki"
  });

  useEffect(() => {
    // Inject LocalBusiness schema
    const existing = document.getElementById("schema-thessaloniki");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-thessaloniki";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("schema-thessaloniki");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
            Web Design Thessaloniki
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Professional Websites for{" "}
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              Thessaloniki Businesses
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">
            D&M Labs is a remote web design studio helping businesses in Thessaloniki build a strong, credible online presence. We deliver fast, mobile-first, and conversion-focused websites - starting from €249 - so your business stands out in Greece's second-largest city.
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
        </div>
      </section>

      {/* ── WHY THESSALONIKI NEEDS A WEBSITE ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Why Businesses in Thessaloniki Need a Professional Website
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            Thessaloniki is Greece's second-largest city and one of its most commercially active. The business districts along Tsimiski Street and the historic neighbourhood of Ladadika are home to hundreds of restaurants, boutiques, law firms, and professional services all competing for the same local customers. Aristotle University brings over 100,000 students and academics into the city, and the Thessaloniki International Fair - one of the largest trade fairs in Southeast Europe - draws business visitors from across the continent every year.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            That level of economic activity also means a highly competitive digital landscape. According to Google's own data, over 60% of Greek consumers research a business online before making contact. If your website is slow, outdated, or simply does not exist, you are not just missing out on visibility - you are actively sending potential clients to competitors who do have a professional online presence.
          </p>
          <p className="text-[#5B6472] leading-relaxed mb-5">
            A well-built website does more than look good. It ranks on Google for the searches your customers are already making, loads quickly on mobile, and turns visitors into enquiries without requiring any ongoing effort from you. For a business in Thessaloniki - where the market is dense and digital expectations are rising - that kind of presence is no longer a nice-to-have.
          </p>
          <p className="text-[#5B6472] leading-relaxed">
            The businesses that invest in a quality website now, before their sector becomes fully saturated online, are the ones that capture the most valuable search traffic and build lasting credibility with both local and international clients.
          </p>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            What We Build for Thessaloniki Businesses
          </h2>
          <p className="text-[#5B6472] mb-10">
            Every site we deliver is built to perform - not just to look good.{" "}
            <Link href="/services" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              See our full services
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Business Websites",
                desc: "A complete, multi-page website for your business - home, about, services, and contact. Designed to build trust and turn visitors into enquiries from day one."
              },
              {
                title: "Landing Pages",
                desc: "A single, focused page built around one goal - whether that is capturing leads, promoting a service, or driving bookings. Fast to build, fast to convert."
              },
              {
                title: "Service Pages",
                desc: "Dedicated pages for each of your core services, optimised for the specific searches your customers are making in Thessaloniki and across Greece."
              },
              {
                title: "Blog and SEO Setup",
                desc: "A blog structure and initial SEO configuration that gives your site the foundation to rank on Google over time - without you needing to understand the technical side."
              }
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-lg mb-2">{s.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SUMMARY ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Transparent Pricing for Thessaloniki Businesses
          </h2>
          <p className="text-[#5B6472] mb-10">
            No hidden fees. No hourly billing. One fixed price, everything included.{" "}
            <Link href="/pricing" className="text-[#5B8CFF] font-medium underline underline-offset-2 hover:text-[#8B5CFF]">
              View full pricing breakdown
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "from €249",
                desc: "Ideal for new businesses that need a clean, professional online presence fast. Everything you need to go live with confidence.",
                highlight: false
              },
              {
                name: "Business",
                price: "from €399",
                desc: "For established businesses that need a full, conversion-focused website with more pages, stronger SEO, and a polished design.",
                highlight: true
              },
              {
                name: "Premium",
                price: "from €699",
                desc: "For businesses that want a fully custom, feature-rich website with everything included - from custom functionality to priority support.",
                highlight: false
              }
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-6 border ${
                  p.highlight
                    ? "border-[#5B8CFF] bg-gradient-to-br from-[#EEF3FF] to-[#F0EAFF] shadow-md"
                    : "border-[#E8EAF0] bg-white shadow-sm"
                }`}
              >
                {p.highlight && (
                  <span className="inline-block text-xs font-semibold text-[#5B8CFF] uppercase tracking-wider mb-2">
                    Most Popular
                  </span>
                )}
                <div className="text-2xl font-extrabold text-[#111315] mb-1">{p.price}</div>
                <div className="font-semibold text-[#111315] mb-3">{p.name}</div>
                <p className="text-[#5B6472] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mt-4">
            All prices are one-time fees. No monthly charges, no hidden costs.
          </p>
        </div>
      </section>

      {/* ── WHY CHOOSE D&M LABS ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-6">
            Why Thessaloniki Businesses Choose D&M Labs
          </h2>
          <p className="text-[#5B6472] leading-relaxed mb-8">
            D&M Labs is a remote web design studio. We work with businesses across Greece - from Thessaloniki and Athens to smaller cities and islands - entirely online. No office visits, no delays waiting for in-person meetings. The full process, from first call to launch, is managed by us so you can focus on running your business.
          </p>
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
                desc: "Every page is designed with one goal in mind - turning visitors into enquiries. Good design is only useful if it drives results."
              }
            ].map((w) => (
              <div key={w.title} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-lg mb-2">{w.title}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-3">
            Serving Businesses Across Thessaloniki
          </h2>
          <p className="text-[#5B6472] mb-8">
            We work with businesses throughout Thessaloniki - from the centre and the waterfront to Kalamaria, Stavroupoli, Pylaia, and the wider Central Macedonia region. Distance is not a factor.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Thessaloniki, Greece"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47480.85!2d22.9444!3d40.6401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a838f41428e0ed%3A0x9bae715b8d574a9!2sThessaloniki%2C%20Greece!5e0!3m2!1sen!2sgr!4v1700000000000!5m2!1sen!2sgr"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111315] mb-10">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm">
                <h3 className="font-bold text-[#111315] text-base mb-3">{faq.q}</h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to get your Thessaloniki business online?
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Tell us about your business and we will send you a free proposal within 24 hours. No commitment, no pressure. You can also reach us directly on WhatsApp - we are quick to respond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                Contact us today
              </button>
            </Link>
            <a
              href="https://wa.me/35797472847?text=Hi%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business%20in%20Thessaloniki"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-colors">
                Chat on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
