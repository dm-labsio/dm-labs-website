// =============================================================================
// /web-design-cyprus -- National Cyprus Pillar Page
// Design: matches city pages (Limassol / Nicosia / Thessaloniki)
// SEO goal: rank for "web design Cyprus", "website design Cyprus",
//           "web designer Cyprus", "website designer Cyprus",
//           "web development Cyprus", "affordable web design Cyprus",
//           "professional website Cyprus", "SEO Cyprus", "digital agency Cyprus"
// =============================================================================
import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "D&M Labs",
  "description": "Professional web design and website development agency serving businesses across Cyprus - Limassol, Nicosia, Larnaca, Paphos, Famagusta, and all districts.",
  "url": "https://dm-labs.io/web-design-cyprus",
  "telephone": "+35797472847",
  "priceRange": "€€",
  "areaServed": [
    { "@type": "City", "name": "Limassol" },
    { "@type": "City", "name": "Nicosia" },
    { "@type": "City", "name": "Larnaca" },
    { "@type": "City", "name": "Paphos" },
    { "@type": "City", "name": "Famagusta" },
    { "@type": "Country", "name": "Cyprus" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design Cyprus Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Starter Website Cyprus", "description": "Branded business page for Cyprus businesses" }, "price": "299", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Website Cyprus", "description": "Up to 5-page website with SEO and contact forms for Cyprus businesses" }, "price": "399", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Premium Website Cyprus", "description": "Fully custom website with animations, blog articles, and full SEO structure" }, "price": "699", "priceCurrency": "EUR" }
    ]
  }
};

const cities = [
  { name: "Limassol", slug: "/web-design-limassol", color: "#5B8CFF", bg: "#EEF3FF", desc: "Cyprus's business and financial capital. Home to thousands of SMEs, international companies, and a booming tech scene." },
  { name: "Nicosia", slug: "/web-design-nicosia", color: "#8B5CFF", bg: "#F3EEFF", desc: "The capital of Cyprus and the centre of government, law, and finance. High demand for professional, credibility-building websites." },
  { name: "Larnaca", slug: null, color: "#0EA5E9", bg: "#E0F2FE", desc: "A growing commercial hub with a busy port and international airport. Tourism, retail, and logistics businesses thrive here." },
  { name: "Paphos", slug: null, color: "#10B981", bg: "#D1FAE5", desc: "A major tourist destination and expat community. Hotels, villas, restaurants, and property agencies all need strong online presence." },
  { name: "Famagusta", slug: null, color: "#F59E0B", bg: "#FEF3C7", desc: "A coastal city with a growing economy. Businesses here benefit enormously from being findable on Google." },
  { name: "Paralimni / Ayia Napa", slug: null, color: "#EF4444", bg: "#FEE2E2", desc: "The tourism heartland of Cyprus. Restaurants, clubs, water parks, and accommodation providers need websites that convert visitors." },
];

const industries = [
  { icon: "🍽️", name: "Restaurants & Cafes", desc: "Cyprus has over 3,200 food and beverage businesses. A fast, mobile-first website with your menu, opening hours, and Google Maps integration drives walk-ins and reservations." },
  { icon: "🏨", name: "Hotels & Tourism", desc: "Tourism is Cyprus's largest industry. Hotels, villas, and tour operators need a website that ranks on Google and converts international visitors before they land." },
  { icon: "⚖️", name: "Law Firms & Legal Services", desc: "Cyprus is a major European legal and financial hub. Law firms and corporate service providers need a professional website that builds trust with high-value clients." },
  { icon: "🏠", name: "Real Estate & Property", desc: "Property buyers search online first. A clean, fast website with listings, maps, and enquiry forms converts browsers into serious leads." },
  { icon: "🏥", name: "Clinics & Healthcare", desc: "Private clinics, dentists, physiotherapists, and specialists across Cyprus need a trustworthy online presence to attract and retain patients." },
  { icon: "🛍️", name: "Retail & Boutiques", desc: "Whether you run a boutique in Limassol or a specialty shop in Nicosia, a professional website helps customers find you and builds credibility before they walk through the door." },
  { icon: "📊", name: "Accounting & Finance", desc: "Cyprus's financial services sector is one of the largest in the EU. A polished, professional website signals credibility to corporate and international clients." },
  { icon: "🎓", name: "Education & Tutoring", desc: "Private schools, language centres, and tutoring services across Cyprus use websites to attract students and communicate their curriculum and fees." },
];

const faqs = [
  {
    q: "How much does web design cost in Cyprus?",
    a: "Web design in Cyprus typically ranges from €299 to €2,500+ depending on the size and complexity of the project. At D&M Labs, our Starter package begins at €299 for a branded business page, our Business package is €399 for up to 5 pages with contact forms and SEO, and our Premium package is €699 for a fully custom website with animations, blog articles, and full SEO structure. All prices are transparent with no hidden fees."
  },
  {
    q: "What is the difference between web design and web development in Cyprus?",
    a: "Web design refers to the visual and user experience side - layout, colours, typography, and how the site looks and feels. Web development refers to the technical build - the code and functionality that makes the site work. At D&M Labs we handle both: we design and develop your website from start to finish, so you work with one team rather than coordinating between a designer and a separate developer."
  },
  {
    q: "Do I need a website if I already have a Facebook or Instagram page?",
    a: "Yes. Social media platforms are rented land - Facebook and Instagram can change their algorithm, restrict your reach, or suspend your account at any time. A website is your owned digital property. It also ranks on Google, which is where the majority of Cypriot consumers search for businesses. A website and social media work together, but the website is the foundation."
  },
  {
    q: "How long does it take to build a website in Cyprus?",
    a: "Our Starter websites launch within 5 to 7 business days from the moment we have your content and feedback. Business packages take 7 to 10 days, and Premium packages take 10 to 14 days. We keep you updated throughout the process and do not disappear between milestones. Rush delivery is available on request."
  },
  {
    q: "Can you build a bilingual website in Greek and English?",
    a: "Yes. We build bilingual websites in both Greek and English for businesses that serve both local Cypriot and international audiences. A full Greek-language version is available on request. We are comfortable working with Greek content and advise on how to structure copy for both readability and search engine visibility."
  },
  {
    q: "Do you offer SEO with your web design packages?",
    a: "All our websites are built with on-page SEO included as standard - correct heading structure, meta titles, meta descriptions, canonical tags, fast loading, and mobile-first design. Our Business and Premium packages include a more comprehensive SEO setup. For businesses that want ongoing SEO work (keyword targeting, content strategy, link building), we offer this as a separate service."
  },
  {
    q: "Do you work with businesses outside Limassol and Nicosia?",
    a: "Yes. D&M Labs works with businesses across all of Cyprus - Larnaca, Paphos, Famagusta, Paralimni, Ayia Napa, and every district. We also work with businesses in Greece (Athens, Thessaloniki), the UK, and Israel. All work is done remotely via WhatsApp, email, and video call. Distance is not a factor."
  }
];

const whyUs = [
  { icon: "⚡", title: "Fast Delivery", desc: "Starter websites live in 5-7 days. No waiting months for a basic site." },
  { icon: "📱", title: "Mobile-First Design", desc: "Over 70% of Cypriot web traffic is mobile. Every site we build is optimised for phones first." },
  { icon: "🔍", title: "SEO Built In", desc: "On-page SEO, correct meta tags, fast loading, and structured data - included in every package." },
  { icon: "💬", title: "WhatsApp Support", desc: "We communicate on WhatsApp, not ticketing systems. You always reach a real person quickly." },
  { icon: "💶", title: "Transparent Pricing", desc: "Fixed prices from €299. No hourly billing, no hidden fees, no surprise invoices." },
  { icon: "🌍", title: "Bilingual Capability", desc: "Greek and English websites for businesses serving both local and international audiences." },
];

export default function WebDesignCyprus() {
  useSEO({
    title: "Web Design Cyprus | Professional Websites from €299 | D&M Labs",
    description: "Professional web design for businesses across Cyprus - Limassol, Nicosia, Larnaca, Paphos, and beyond. Custom websites from €299. Mobile-first, SEO-optimised, delivered in 5-14 days. Free consultation.",
    canonicalPath: "/web-design-cyprus"
  });

  useEffect(() => {
    const existing = document.getElementById("schema-cyprus");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-cyprus";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("schema-cyprus");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* -- HERO -- */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Web Design Cyprus
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
              Professional{" "}
              <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
                Web Design in Cyprus
              </span>
              {" "}from €299
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
              D&M Labs is a web design and website development studio serving businesses across Cyprus - from Limassol and Nicosia to Larnaca, Paphos, and Famagusta. We build fast, mobile-first, SEO-optimised websites that help Cypriot businesses get found on Google and convert visitors into customers.
            </p>
            <p className="text-sm text-[#9CA3AF] mb-8">
              Η σελίδα είναι διαθέσιμη και στα ελληνικά κατόπιν αιτήματος. (A full Greek-language version is available on request.)
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  Get a Free Quote
                </button>
              </Link>
              <a
                href="https://wa.me/35797472847?text=Hi%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20Cyprus%20business"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-8 py-3.5 rounded-xl bg-white border border-[#E8EAF0] text-[#111315] font-semibold text-base hover:bg-[#F8F9FC] transition-colors shadow-sm">
                  WhatsApp Us
                </button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHY YOUR CYPRUS BUSINESS NEEDS A WEBSITE -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-6">
              Does Your Cyprus Business Need a Website?
            </h2>
            <div className="prose prose-lg max-w-none text-[#5B6472] leading-relaxed space-y-5">
              <p>
                The short answer is yes - and the longer answer is that the cost of <strong>not having a website</strong> in Cyprus is growing every year. Over 80% of Cypriot consumers search on Google before making a purchase or booking a service. If your business does not appear in those search results, you are invisible to the majority of your potential customers.
              </p>
              <p>
                <strong>Website design in Cyprus</strong> has evolved significantly in the last five years. A basic brochure site is no longer enough. Businesses across Cyprus - from restaurants in Limassol to law firms in Nicosia, from hotels in Paphos to clinics in Larnaca - need a website that loads fast on mobile, ranks on Google, and converts visitors into enquiries or bookings.
              </p>
              <p>
                At D&M Labs, we build <strong>professional websites for Cyprus businesses</strong> that do exactly that. Every website we deliver is mobile-first (because over 70% of web traffic in Cyprus comes from smartphones), SEO-optimised from day one, and designed to make your business look credible and trustworthy to potential clients.
              </p>
              <p>
                Whether you are a small business owner in Nicosia looking for your first website, a restaurant in Limassol that needs an online menu and booking form, or a service business wanting to attract more clients from Google - we have a package for you starting from <strong>€299</strong>.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHAT WE BUILD -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              What We Build for Cyprus Businesses
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              We are a full-service <strong>web design and web development agency in Cyprus</strong>. We handle everything from the initial design concept to the final launch - and beyond.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Business Websites", desc: "Professional multi-page websites for service businesses, consultancies, and agencies across Cyprus. Clean design, fast loading, and built to rank on Google." },
              { title: "Restaurant & Cafe Websites", desc: "Mobile-first websites with digital menus, opening hours, Google Maps, and reservation forms. Designed to drive walk-ins and online enquiries." },
              { title: "Hotel & Tourism Websites", desc: "Booking-focused websites for hotels, villas, apartments, and tour operators in Cyprus. Optimised for international visitors searching in English, Russian, and Greek." },
              { title: "Portfolio & Creative Websites", desc: "Showcase websites for architects, photographers, interior designers, and creative professionals across Cyprus." },
              { title: "Professional Services Websites", desc: "Credibility-building websites for law firms, accountants, clinics, and consultancies. Designed to convert high-value enquiries." },
              { title: "Landing Pages & SEO Pages", desc: "Targeted landing pages built to rank for specific keywords - 'web design Limassol', 'dentist Nicosia', 'car rental Larnaca' - and convert visitors into leads." },
            ].map((item) => (
              <AnimateIn key={item.title}>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm h-full">
                  <h3 className="font-bold text-[#111315] text-base mb-2">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- INDUSTRIES -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Industries We Serve Across Cyprus
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              We have built websites for businesses in almost every sector of the Cypriot economy. Here are the industries we work with most frequently:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {industries.map((ind) => (
              <AnimateIn key={ind.name}>
                <div className="flex gap-4 bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-2xl mt-0.5">{ind.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#111315] text-sm mb-1">{ind.name}</h3>
                    <p className="text-[#5B6472] text-sm leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- PRICING -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Web Design Prices in Cyprus
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              We believe in transparent, fixed pricing. No hourly billing, no surprise invoices. Here is what a professional website costs with D&M Labs:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "€299",
                desc: "Perfect for new businesses that need a clean, professional online presence fast.",
                features: [
                  "Branded Business Page",
                  "Mobile responsive",
                  "WhatsApp button",
                  "Social media links",
                  "Accessibility widget",
                  "2 revision rounds",
                  "5-7 day delivery",
                ],
                highlight: false,
              },
              {
                name: "Business",
                price: "€399",
                desc: "For established Cyprus businesses that need a complete, conversion-focused website.",
                features: [
                  "Up to 5 pages",
                  "Mobile responsive",
                  "Contact form + booking form",
                  "Google Maps + Reviews widget",
                  "Testimonials section",
                  "Basic SEO optimisation",
                  "Speed optimisation",
                  "3 revision rounds",
                  "7-10 day delivery",
                ],
                highlight: true,
              },
              {
                name: "Premium",
                price: "€699",
                desc: "For businesses that want a fully custom, feature-rich website with everything included.",
                features: [
                  "Up to 7 pages",
                  "Fully custom design + animations",
                  "Contact form + booking form",
                  "Google Maps + Reviews widget",
                  "Testimonials + gallery",
                  "5 SEO blog articles",
                  "Full meta/SEO structure",
                  "Pop-up included",
                  "5 revision rounds",
                  "10-14 day delivery",
                ],
                highlight: false,
              },
            ].map((pkg) => (
              <AnimateIn key={pkg.name}>
                <div className={`rounded-2xl p-6 border h-full flex flex-col ${pkg.highlight ? "bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF] border-transparent text-white shadow-lg" : "bg-white border-[#E8EAF0] text-[#111315] shadow-sm"}`}>
                  <div className="mb-4">
                    <span className={`text-xs font-bold uppercase tracking-widest ${pkg.highlight ? "text-blue-100" : "text-[#5B8CFF]"}`}>{pkg.name}</span>
                    <div className={`text-4xl font-extrabold mt-1 ${pkg.highlight ? "text-white" : "text-[#111315]"}`}>{pkg.price}</div>
                  </div>
                  <p className={`text-sm mb-5 leading-relaxed ${pkg.highlight ? "text-blue-100" : "text-[#5B6472]"}`}>{pkg.desc}</p>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${pkg.highlight ? "text-white" : "text-[#5B6472]"}`}>
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${pkg.highlight ? "bg-white/20 text-white" : "bg-[#EEF3FF] text-[#5B8CFF]"}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${pkg.highlight ? "bg-white text-[#5B8CFF] hover:bg-blue-50" : "bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white hover:opacity-90"}`}>
                      Get a Free Quote
                    </button>
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn>
            <p className="text-center text-sm text-[#5B6472] mt-6">
              All prices are one-time fees. No monthly retainers unless you choose an optional maintenance plan.{" "}
              <Link href="/pricing">
                <span className="text-[#5B8CFF] font-semibold hover:underline cursor-pointer">View full pricing details</span>
              </Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* -- WHY D&M LABS -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Why Choose D&M Labs for Web Design in Cyprus?
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              There are dozens of <strong>web designers in Cyprus</strong>. Here is what makes D&M Labs different:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item) => (
              <AnimateIn key={item.title}>
                <div className="bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-bold text-[#111315] text-sm mb-1">{item.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- CITIES -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              Web Design Across All of Cyprus
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              We serve businesses in every city and district of Cyprus. Click on a city below to learn more about our services in your area.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((city) => (
              <AnimateIn key={city.name}>
                <div className="bg-white rounded-2xl p-5 border border-[#E8EAF0] shadow-sm h-full flex flex-col">
                  <h3 className="font-bold text-[#111315] text-base mb-2">
                    Web Design {city.name}
                  </h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed flex-1 mb-4">{city.desc}</p>
                  {city.slug ? (
                    <Link href={city.slug}>
                      <span style={{ color: city.color }} className="text-sm font-semibold hover:underline cursor-pointer">
                        View {city.name} page →
                      </span>
                    </Link>
                  ) : (
                    <Link href="/contact">
                      <span style={{ color: city.color }} className="text-sm font-semibold hover:underline cursor-pointer">
                        Get a quote for {city.name} →
                      </span>
                    </Link>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">
              How to Get a Website for Your Cyprus Business
            </h2>
            <p className="text-[#5B6472] mb-10 leading-relaxed">
              Getting a <strong>professional website in Cyprus</strong> with D&M Labs is a straightforward four-step process:
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Free Consultation", desc: "Tell us about your business, your goals, and your budget. We will recommend the right package and answer any questions - no commitment required." },
              { step: "02", title: "Design & Build", desc: "We design your website and share a live preview for your feedback. You can request changes before anything goes live." },
              { step: "03", title: "Review & Approve", desc: "You review the finished website, we make any final adjustments, and you approve the launch." },
              { step: "04", title: "Launch & Support", desc: "Your website goes live. We handle the technical setup - domain, hosting, SSL certificate - and provide post-launch support." },
            ].map((s) => (
              <AnimateIn key={s.step}>
                <div className="bg-[#F8F9FC] rounded-2xl p-5 border border-[#E8EAF0]">
                  <span className="text-3xl font-extrabold text-[#5B8CFF] opacity-30 block mb-2">{s.step}</span>
                  <h3 className="font-bold text-[#111315] text-sm mb-2">{s.title}</h3>
                  <p className="text-[#5B6472] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* -- MAP -- */}
      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-3">
              Serving Businesses Across Cyprus
            </h2>
            <p className="text-[#5B6472] mb-8 leading-relaxed">
              D&M Labs works with businesses throughout Cyprus - from Limassol and Nicosia to Larnaca, Paphos, Famagusta, Paralimni, and every district in between. We also serve businesses in Greece (Athens, Thessaloniki) and internationally. Distance is never a factor.
            </p>
          </AnimateIn>
          <div className="rounded-2xl overflow-hidden border border-[#E8EAF0] shadow-sm" style={{ height: "360px" }}>
            <iframe
              title="Cyprus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d524000!2d33.0!3d35.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1767b0b5c3e7%3A0x5a4e7e1b2a3c4d5e!2sCyprus!5e0!3m2!1sen!2scy!4v1700000000001!5m2!1sen!2scy"
            />
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl font-bold text-[#111315] mb-10">
              Frequently Asked Questions - Web Design Cyprus
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

      {/* -- CTA -- */}
      <section className="section-spacing bg-gradient-to-br from-[#5B8CFF] to-[#8B5CFF]">
        <div className="container max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to get your Cyprus business online?
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Tell us about your business and we will send you a free proposal within 24 hours. No commitment, no pressure. You can also reach us directly on WhatsApp - we are quick to respond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-10 py-4 rounded-xl bg-white text-[#5B8CFF] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
                  Get a Free Consultation
                </button>
              </Link>
              <a
                href="https://wa.me/35797472847?text=Hi%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20Cyprus%20business"
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
