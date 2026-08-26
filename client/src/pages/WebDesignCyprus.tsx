/* ============================================================
   DM-Labs.io — Web Design Cyprus Pillar Page
   ============================================================ */
import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn from "@/components/AnimateIn";

const packages = [
  { name: "Launch Website", price: "€299", details: "Small one-page or light two-page site with responsive build, basic SEO foundations, WhatsApp and social links, and 2 revision rounds." },
  { name: "Growth Website", price: "€749", details: "Up to 4 pages with a contact form, Google Maps and reviews/testimonials, basic SEO, Search Console and Analytics setup, and 3 revision rounds." },
  { name: "Pro Website", price: "€1,499", details: "Up to 7 pages with a gallery or portfolio, pop-up and scroll-driven animations, full SEO structure, blog setup or a website visual pack, and 4 revision rounds." },
];

const faqItems = [
  { q: "How much does web design cost in Cyprus?", a: "DM-Labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Enterprise / Custom projects are quoted separately based on scope." },
  { q: "What is included in a DM-Labs.io website package?", a: "Every package has a clearly defined scope. The Launch package includes responsive implementation and basic SEO foundations. Growth adds up to four pages, a contact form, maps, reviews/testimonials, and Search Console and Analytics setup. Pro adds up to seven pages, richer visual features, full SEO structure, and a blog setup or visual pack." },
  { q: "Can you build a bilingual Greek and English website?", a: "Yes. Multilingual functionality can be included in an Enterprise / Custom scope, depending on language, content, and editing requirements." },
  { q: "Do you provide ongoing website care?", a: "Yes. Basic Care is €69 per month and Complete Care is €129 per month. New pages, copywriting, new integrations, redesigns, advanced SEO work, and complex content migration are quoted separately." },
  { q: "When is a project Enterprise / Custom?", a: "Enterprise / Custom applies to scope beyond the standard packages, including integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." },
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://dm-labs.io/web-design-cyprus/#professionalservice",
      "name": "DM-Labs.io",
      "alternateName": "DM-Labs",
      "description": "Professional website design and web development for businesses across Cyprus.",
      "url": "https://dm-labs.io/web-design-cyprus/",
      "telephone": "+35797472847",
      "email": "info@dm-labs.io",
      "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" },
      "areaServed": [
        { "@type": "Country", "name": "Cyprus" },
        { "@type": "City", "name": "Paphos", "addressCountry": "CY" },
        { "@type": "City", "name": "Limassol", "addressCountry": "CY" },
        { "@type": "City", "name": "Nicosia", "addressCountry": "CY" },
        { "@type": "City", "name": "Larnaca", "addressCountry": "CY" },
        { "@type": "City", "name": "Famagusta", "addressCountry": "CY" }
      ],
      "priceRange": "€299-€1,499",
      "currenciesAccepted": "EUR",
      "hasOfferCatalog": { "@type": "OfferCatalog", "name": "DM-Labs.io Website Packages", "itemListElement": packages.map((item) => ({ "@type": "Offer", "name": item.name, "price": item.price.replace(/[€,]/g, ""), "priceCurrency": "EUR" })) }
    },
    { "@type": "FAQPage", "mainEntity": faqItems.map((item) => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } })) }
  ]
};

export default function WebDesignCyprus() {
  useSEO({
    title: "Web Design Cyprus | Website Packages from €299 | DM-Labs.io",
    description: "Professional web design for Cyprus businesses. Launch websites from €299, Growth from €749, Pro from €1,499, and custom website projects from DM-Labs.io.",
    canonicalPath: "/web-design-cyprus/",
  });

  useEffect(() => {
    document.getElementById("schema-cyprus")?.remove();
    const script = document.createElement("script");
    script.id = "schema-cyprus";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => { document.getElementById("schema-cyprus")?.remove(); };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Web Design Across Cyprus</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">Professional <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">Web Design in Cyprus</span> from €299</h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-8 leading-relaxed">DM-Labs.io designs and builds professional websites for businesses across Cyprus. Choose a clear package or request a custom scope for more complex work.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/contact/" className="btn-primary">Get a Free Consultation</Link><a href="https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27m%20interested%20in%20a%20website%20for%20my%20Cyprus%20business." target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp Us</a></div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto"><AnimateIn><h2 className="text-3xl font-bold text-[#111315] mb-6">A Clear Online Foundation for Your Cyprus Business</h2><div className="text-[#5B6472] text-lg leading-relaxed space-y-5"><p>A professional website should make it easy for customers to understand what you offer and take the next step. That means a clear page structure, a responsive implementation, trustworthy content, and practical contact paths.</p><p>DM-Labs.io works with businesses in Paphos and throughout Cyprus. Every project begins with a conversation about your business, audience, content, and the right scope, so the result is realistic, clear, and useful to your customers.</p></div></AnimateIn></div>
      </section>

      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-5xl mx-auto"><AnimateIn><h2 className="text-3xl font-bold text-[#111315] mb-4">What We Build for Cyprus Businesses</h2><p className="text-[#5B6472] mb-10 leading-relaxed">From a focused first website to a broader digital presence, we build around the scope your business actually needs.</p></AnimateIn><div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{[
          ["Business websites", "Professional, multi-page websites for service businesses, consultancies, and local companies."],
          ["Hospitality and tourism websites", "Information-rich, mobile-friendly pages with contact and booking paths where needed."],
          ["Property and portfolio websites", "Presentational website structures for property, projects, galleries, and visual work."],
          ["Local service websites", "Clear service pages, contact forms, maps, reviews, and practical enquiry routes."],
          ["Custom website builds", "Enterprise / Custom solutions for integrations, CRM or booking, multilingual content, AI features, and wider scope."],
          ["Ongoing website care", "Optional Basic or Complete Care for monitoring, backups, fixes, content updates, and support."],
        ].map(([title, text]) => <AnimateIn key={title}><div className="bg-white rounded-xl p-6 border border-[#E2E5EA]"><h3 className="text-lg font-semibold text-[#111315] mb-2">{title}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{text}</p></div></AnimateIn>)}</div></div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container max-w-5xl mx-auto"><AnimateIn><h2 className="text-3xl font-bold text-[#111315] mb-4 text-center">Website Packages</h2><p className="text-[#5B6472] text-center mb-10">Clear packages for common website needs, with a custom quote for work beyond the standard scope.</p></AnimateIn><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{packages.map((plan, index) => <AnimateIn key={plan.name} delay={index * 0.1}><div className={index === 1 ? "brand-gradient-border h-full" : "h-full"}><div className="dm-card h-full !shadow-none flex flex-col"><p className="text-sm font-semibold uppercase tracking-wide text-[#5B8CFF] mb-2">{plan.name}</p><p className="text-3xl font-bold text-[#111315] mb-4">{plan.price}</p><p className="text-sm text-[#5B6472] leading-relaxed flex-1">{plan.details}</p><Link href="/contact/" className={index === 1 ? "btn-primary w-full justify-center mt-6" : "btn-secondary w-full justify-center mt-6"}>Discuss This Package</Link></div></div></AnimateIn>)}</div><AnimateIn delay={0.35}><div className="mt-8 bg-[#0F172A] rounded-2xl p-7 text-white flex flex-col md:flex-row gap-6 md:items-center md:justify-between"><div><p className="text-sm font-semibold text-[#6FE3FF] uppercase tracking-wide">Enterprise / Custom</p><h3 className="text-2xl font-bold mt-1">Pricing tailored to your scope</h3><p className="text-sm text-white/70 mt-2 max-w-2xl">For integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume.</p></div><Link href="/contact/" className="btn-primary shrink-0">Request a Quote</Link></div></AnimateIn></div>
      </section>

      <section className="section-spacing bg-[#F8F9FC]">
        <div className="container max-w-5xl mx-auto"><AnimateIn><h2 className="text-3xl font-bold text-[#111315] mb-8 text-center">Serving Businesses Across Cyprus</h2></AnimateIn><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{[
          { name: "Paphos", text: "DM-Labs.io is based in Paphos, with a dedicated local web design page.", href: "/web-design-paphos/" },
          { name: "Limassol", text: "Website design services for businesses in Limassol and surrounding areas.", href: "/web-design-limassol/" },
          { name: "Nicosia", text: "Professional website design for Nicosia businesses and organisations.", href: "/web-design-nicosia/" },
          { name: "Larnaca", text: "Website projects for businesses throughout Larnaca and its surrounding area." },
          { name: "Famagusta", text: "Website projects for businesses in Famagusta and the eastern districts." },
          { name: "Greece", text: "Remote projects for businesses in Greece, with scope agreed before work begins." },
        ].map((area) => <AnimateIn key={area.name}><article className="bg-white rounded-xl p-6 border border-[#E2E5EA] h-full"><h3 className="font-semibold text-[#111315] mb-2">{area.name}</h3><p className="text-sm text-[#5B6472] leading-relaxed mb-4">{area.text}</p>{area.href ? <Link href={area.href} className="text-sm font-medium text-[#5B8CFF] hover:underline">Explore {area.name} web design</Link> : <Link href="/contact/" className="text-sm font-medium text-[#5B8CFF] hover:underline">Discuss your project</Link>}</article></AnimateIn>)}</div></div>
      </section>

      <section className="section-spacing bg-white"><div className="container max-w-3xl mx-auto"><AnimateIn><h2 className="text-3xl font-bold text-[#111315] mb-8 text-center">Web Design Cyprus FAQs</h2></AnimateIn><div className="space-y-4">{faqItems.map((item) => <AnimateIn key={item.q}><article className="dm-card !p-6"><h3 className="font-semibold text-[#111315] mb-2">{item.q}</h3><p className="text-sm text-[#5B6472] leading-relaxed">{item.a}</p></article></AnimateIn>)}</div></div></section>

      <section className="section-spacing bg-[#0F172A] text-center"><div className="container max-w-3xl"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Ready to Build Your Website?</h2><p className="text-white/70 text-lg mb-8">Tell us about your business, audience, and website needs. We will help you choose the right starting scope.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/contact/" className="btn-primary">Get a Free Consultation</Link><Link href="/pricing/" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">View Website Packages</Link></div></AnimateIn></div></section>
    </main>
  );
}
