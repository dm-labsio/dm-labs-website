/* ============================================================
   DM-Labs.io — Web Design Paphos Landing Page
   Target: web design Paphos and website design Paphos.
   ============================================================ */
import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"] },
  { name: "Growth Website", price: "€749", features: ["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"] },
  { name: "Pro Website", price: "€1,499", features: ["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"] },
];

const faqItems = [
  { question: "How much does web design cost in Paphos?", answer: "DM-Labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Projects beyond the standard scope are quoted separately after a free consultation." },
  { question: "Do you work with Paphos hospitality, tourism, and local service businesses?", answer: "Yes. We build websites for businesses in Paphos, including hospitality, restaurants, tour operators, real estate, beauty, wellness, and local professional services. The website scope is tailored to the business and its goals." },
  { question: "Can my Paphos business website have multiple languages?", answer: "Yes. Multilingual functionality can be included in an Enterprise / Custom scope, depending on the languages, content volume, and editing requirements." },
  { question: "Does every website include SEO?", answer: "Every package includes search-friendly foundations such as responsive implementation and basic SEO. The Pro package includes a fuller SEO structure, while advanced SEO work and additional content are quoted based on scope." },
  { question: "What makes a project Enterprise / Custom?", answer: "Enterprise / Custom applies to work beyond the standard package scope, such as integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." },
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://dm-labs.io/web-design-paphos/#professionalservice",
      "name": "DM-Labs.io",
      "alternateName": "DM-Labs",
      "description": "DM-Labs.io designs and builds professional, mobile-first websites for businesses in Paphos and across Cyprus.",
      "url": "https://dm-labs.io/web-design-paphos/",
      "telephone": "+35797472847",
      "email": "info@dm-labs.io",
      "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" },
      "areaServed": [
        { "@type": "City", "name": "Paphos", "addressCountry": "CY" },
        { "@type": "AdministrativeArea", "name": "Paphos District", "addressCountry": "CY" },
        { "@type": "Country", "name": "Cyprus" }
      ],
      "priceRange": "€299-€1,499",
      "currenciesAccepted": "EUR",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "DM-Labs.io Website Packages",
        "itemListElement": packages.map((item) => ({ "@type": "Offer", "name": item.name, "price": item.price.replace(/[€,]/g, ""), "priceCurrency": "EUR" }))
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqItems.map((item) => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } }))
    }
  ]
};

export default function WebDesignPaphos() {
  useSEO({
    title: "Web Design Paphos | Website Packages from €299 | DM-Labs.io",
    description: "Professional website design in Paphos, Cyprus. Launch websites from €299, Growth from €749, Pro from €1,499, plus custom website projects.",
    canonicalPath: "/web-design-paphos/",
  });

  useEffect(() => {
    document.getElementById("schema-paphos")?.remove();
    const script = document.createElement("script");
    script.id = "schema-paphos";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => { document.getElementById("schema-paphos")?.remove(); };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#FFF0EA]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Web Design · Paphos, Cyprus</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight mb-6">Web Design in <span className="bg-gradient-to-r from-[#5B8CFF] via-[#6FE3FF] to-[#A855F7] bg-clip-text text-transparent">Paphos</span></h1>
            <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto mb-8 leading-relaxed">DM-Labs.io builds professional, mobile-first websites for Paphos businesses. Choose a clear package from €299 or request a custom scope for more complex work.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27m%20interested%20in%20a%20website%20for%20my%20Paphos%20business." target="_blank" rel="noopener noreferrer" className="btn-primary">Get a Free Consultation</a><Link href="/pricing/" className="btn-secondary">View Pricing</Link></div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-10 bg-white border-y border-[#E2E5EA]">
        <div className="container"><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[
          { value: "€299", label: "Package starting point" },
          { value: "Paphos", label: "Local business address" },
          { value: "Cyprus", label: "Businesses served" },
          { value: "Mobile-first", label: "Every package" },
        ].map((stat) => <div key={stat.label} className="text-center"><div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#5B8CFF] to-[#A855F7] bg-clip-text text-transparent">{stat.value}</div><div className="text-sm text-[#64748B] mt-1">{stat.label}</div></div>)}</div></div>
      </section>

      <section className="section-spacing">
        <div className="container max-w-3xl mx-auto">
          <AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">A Website That Represents Your Paphos Business</h2><p className="text-[#475569] text-lg leading-relaxed mb-5">Your website is often the first place a potential customer learns about your business. It should be clear, fast on mobile, easy to navigate, and built around the actions you want people to take, whether that is enquiring, booking, visiting, or calling.</p><p className="text-[#475569] text-lg leading-relaxed">DM-Labs.io is based in Paphos and works with businesses throughout Cyprus. We translate the practical needs of local businesses into a website with a clear structure, a professional visual identity, and search-friendly foundations.</p></AnimateIn>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 text-center">Who We Work With in Paphos</h2><p className="text-[#64748B] text-center mb-12 max-w-xl mx-auto">Website projects are tailored to each business, from local services to hospitality and professional practices.</p></AnimateIn><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[
          ["Hotels, villas and hospitality", "Clear booking paths, photo-led pages, and practical information for visitors."],
          ["Restaurants and cafes", "Menu, location, contact and booking information designed for mobile visitors."],
          ["Tour operators and activities", "Service pages, availability or booking links, and simple enquiry paths."],
          ["Real estate and property", "Property-focused presentation, enquiry routes, and a platform ready for wider scope."],
          ["Beauty, wellness and fitness", "Service-led pages, testimonials, directions, and booking integrations where needed."],
          ["Local professional services", "A trustworthy online presence that explains services and makes contacting you simple."],
        ].map(([title, text]) => <AnimateIn key={title}><div className="bg-[#F8FAFF] rounded-2xl p-6 border border-[#E2E5EA] hover:border-[#5B8CFF] transition-colors"><h3 className="font-semibold text-[#0F172A] mb-2">{title}</h3><p className="text-sm text-[#64748B] leading-relaxed">{text}</p></div></AnimateIn>)}</div></div>
      </section>

      <section className="section-spacing">
        <div className="container max-w-3xl mx-auto"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">What a DM-Labs.io Website Can Include</h2></AnimateIn><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{[
          ["Mobile-first implementation", "A responsive build designed to work well on phones, tablets, and desktops."],
          ["Clear contact paths", "WhatsApp, contact forms, maps, booking, or CRM integrations where included in scope."],
          ["Search-friendly foundations", "A sensible page structure, metadata, technical foundations, and performance-focused development."],
          ["Content-rich presentation", "Service pages, portfolios, galleries, testimonials, and visual content according to package scope."],
          ["Multilingual or custom needs", "Available through Enterprise / Custom when the language, content, and editing scope require it."],
          ["Ongoing website care", "Optional monthly care for monitoring, backups, fixes, content updates, and support."],
        ].map(([title, text]) => <AnimateIn key={title}><div className="p-5 bg-white rounded-xl border border-[#E2E5EA]"><h3 className="font-semibold text-[#0F172A] mb-1">{title}</h3><p className="text-sm text-[#64748B] leading-relaxed">{text}</p></div></AnimateIn>)}</div></div>
      </section>

      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] to-[#F6F6F4]">
        <div className="container max-w-5xl mx-auto text-center"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Transparent Website Packages</h2><p className="text-[#475569] mb-10">Choose a clear starting point. Projects beyond the standard scope are quoted separately.</p></AnimateIn><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{packages.map((plan, index) => <AnimateIn key={plan.name} delay={index * 0.1}><div className={index === 1 ? "rounded-2xl p-[1px] bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] h-full" : "h-full"}><div className="bg-white rounded-2xl p-6 h-full text-left flex flex-col"><p className="text-sm font-semibold uppercase tracking-wide text-[#5B8CFF] mb-2">{plan.name}</p><p className="text-3xl font-bold text-[#0F172A] mb-4">{plan.price}</p><ul className="space-y-3 mb-6 flex-1">{plan.features.map((feature) => <li key={feature} className="text-sm text-[#475569] flex gap-2"><span className="text-[#5B8CFF]">✓</span>{feature}</li>)}</ul><Link href="/contact/" className={index === 1 ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>Discuss This Package</Link></div></div></AnimateIn>)}</div><AnimateIn delay={0.35}><div className="mt-8 rounded-2xl bg-[#0F172A] text-white text-left p-7 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"><div><p className="font-semibold text-[#6FE3FF] uppercase tracking-wide text-sm">Enterprise / Custom</p><h3 className="text-2xl font-bold mt-1 enterprise-scope-title">Pricing tailored to your scope</h3><p className="text-sm text-white/70 mt-2 max-w-2xl">For integrations, multilingual sites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, or unusual content volume.</p></div><Link href="/contact/" className="btn-primary shrink-0">Request a Quote</Link></div></AnimateIn></div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto"><AnimateIn><h2 className="text-3xl font-bold text-[#0F172A] mb-8 text-center">Paphos Web Design FAQs</h2></AnimateIn><div className="space-y-4">{faqItems.map((item) => <AnimateIn key={item.question}><article className="bg-[#F8FAFF] rounded-xl p-6 border border-[#E2E5EA]"><h3 className="font-semibold text-[#0F172A] mb-2">{item.question}</h3><p className="text-sm text-[#64748B] leading-relaxed">{item.answer}</p></article></AnimateIn>)}</div></div>
      </section>

      <section className="section-spacing bg-[#0F172A] text-center"><div className="container max-w-3xl"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Ready to Build a Better Website?</h2><p className="text-white/70 text-lg mb-8">Tell us about your Paphos business and we will recommend the right starting scope.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20a%20free%20consultation%20for%20my%20Paphos%20business." target="_blank" rel="noopener noreferrer" className="btn-primary">Get a Free Consultation</a><Link href="/pricing/" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">View All Packages</Link></div></AnimateIn></div></section>
    </main>
  );
}
