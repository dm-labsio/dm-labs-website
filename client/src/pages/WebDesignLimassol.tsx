/* ============================================================
   DM-Labs.io — Web Design Limassol Landing Page
   Target: web design Limassol and website design Limassol.
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
  { question: "How much does web design cost for a Limassol business?", answer: "DM-Labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Enterprise / Custom work is quoted according to the agreed scope." },
  { question: "Do you work with businesses in Limassol?", answer: "Yes. DM-Labs.io works with businesses in Limassol and across Cyprus. Our physical address is in Paphos, while consultation, review, and delivery can be handled remotely through practical online communication." },
  { question: "What does a Limassol business website include?", answer: "The exact inclusions depend on the package and scope. Common requirements include service pages, contact forms, maps, testimonials, galleries, social links, and search-friendly foundations." },
  { question: "Can you add booking, a CRM, or multilingual content?", answer: "Yes, those requirements are available through Enterprise / Custom scope. The quote depends on the tools, content volume, languages, and implementation requirements." },
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://dm-labs.io/web-design-limassol#professionalservice",
      "name": "DM-Labs.io",
      "description": "DM-Labs.io designs and builds professional, mobile-first websites for businesses in Limassol and across Cyprus.",
      "url": "https://dm-labs.io/web-design-limassol",
      "telephone": "+35797472847",
      "email": "info@dm-labs.io",
      "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" },
      "areaServed": [{ "@type": "City", "name": "Limassol", "addressCountry": "CY" }, { "@type": "Country", "name": "Cyprus" }],
      "priceRange": "€299-€1,499",
      "currenciesAccepted": "EUR",
      "hasOfferCatalog": { "@type": "OfferCatalog", "name": "DM-Labs.io Website Packages", "itemListElement": packages.map((item) => ({ "@type": "Offer", "name": item.name, "price": item.price.replace(/[€,]/g, ""), "priceCurrency": "EUR" })) }
    },
    { "@type": "FAQPage", "mainEntity": faqItems.map((item) => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) }
  ]
};

export default function WebDesignLimassol() {
  useSEO({
    title: "Web Design Limassol | Website Packages from €299 | DM-Labs.io",
    description: "DM-Labs.io builds professional, mobile-first websites for Limassol businesses. Clear website packages from €299 and custom scope for advanced requirements.",
    canonicalPath: "/web-design-limassol",
  });

  useEffect(() => {
    document.getElementById("schema-limassol")?.remove();
    const script = document.createElement("script");
    script.id = "schema-limassol";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => { document.getElementById("schema-limassol")?.remove(); };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#FFF0EA]"><div className="container max-w-4xl mx-auto text-center"><AnimateIn>
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Web Design · Limassol, Cyprus</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight mb-6">Web Design for <span className="bg-gradient-to-r from-[#5B8CFF] via-[#6FE3FF] to-[#A855F7] bg-clip-text text-transparent">Limassol Businesses</span></h1>
        <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto mb-8 leading-relaxed">DM-Labs.io builds clear, professional, mobile-first websites for Limassol businesses. Start with a defined package from €299 or request a custom scope for more complex work.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27m%20interested%20in%20a%20website%20for%20my%20Limassol%20business." target="_blank" rel="noopener noreferrer" className="btn-primary">Get a Free Consultation</a><Link href="/pricing" className="btn-secondary">View Pricing</Link></div>
      </AnimateIn></div></section>

      <section className="py-10 bg-white border-y border-[#E2E5EA]"><div className="container"><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[
        { value: "€299", label: "Package starting point" }, { value: "Limassol", label: "Businesses served" }, { value: "Cyprus", label: "Wider service area" }, { value: "Mobile-first", label: "Every package" },
      ].map((stat) => <div key={stat.label} className="text-center"><div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#5B8CFF] to-[#A855F7] bg-clip-text text-transparent">{stat.value}</div><div className="text-sm text-[#64748B] mt-1">{stat.label}</div></div>)}</div></div></section>

      <section className="section-spacing"><div className="container max-w-3xl mx-auto"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">A Clear Website for a Growing Limassol Business</h2><p className="text-[#475569] text-lg leading-relaxed mb-5">Your website should make it easy for potential customers to understand your services, trust your business, and take the next step. That means a useful structure, responsive implementation, practical content, and clear contact paths.</p><p className="text-[#475569] text-lg leading-relaxed">DM-Labs.io is based in Paphos and works with businesses throughout Cyprus, including Limassol. We scope each project around the information and actions your customers need rather than forcing every business into the same layout.</p></AnimateIn></div></section>

      <section className="section-spacing bg-white"><div className="container"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 text-center">What a Limassol Business Website Can Include</h2><p className="text-[#64748B] text-center mb-12 max-w-xl mx-auto">The exact deliverables are set out before work begins and depend on your package or custom scope.</p></AnimateIn><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[
        ["Service-led pages", "Explain your services, specialisms, and the reasons customers should contact you."], ["Clear enquiry paths", "Use forms, WhatsApp, maps, booking links, or CRM integrations where included in scope."], ["Search-friendly foundations", "Build with sensible page structure, responsive implementation, metadata, and technical SEO foundations."], ["Portfolio and proof", "Present galleries, testimonials, examples, and visual content where it serves the decision journey."], ["Local business information", "Make contact details, service area, and directions easy to find for Limassol customers."], ["Custom functionality", "Discuss multilingual content, CMS editing, AI features, CRM, booking, and other advanced needs as custom scope."],
      ].map(([title, text]) => <AnimateIn key={title}><article className="bg-[#F8FAFF] rounded-2xl p-6 border border-[#E2E5EA] hover:border-[#5B8CFF] transition-colors"><h3 className="font-semibold text-[#0F172A] mb-2">{title}</h3><p className="text-sm text-[#64748B] leading-relaxed">{text}</p></article></AnimateIn>)}</div></div></section>

      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] to-[#F6F6F4]"><div className="container max-w-5xl mx-auto text-center"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Transparent Website Packages</h2><p className="text-[#475569] mb-10">Choose a clear starting point. Work beyond standard package scope is quoted separately.</p></AnimateIn><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{packages.map((plan, index) => <AnimateIn key={plan.name} delay={index * 0.1}><article className={index === 1 ? "rounded-2xl p-[1px] bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] h-full" : "h-full"}><div className="bg-white rounded-2xl p-6 h-full text-left flex flex-col"><p className="text-sm font-semibold uppercase tracking-wide text-[#5B8CFF] mb-2">{plan.name}</p><p className="text-3xl font-bold text-[#0F172A] mb-4">{plan.price}</p><ul className="space-y-3 mb-6 flex-1">{plan.features.map((feature) => <li key={feature} className="text-sm text-[#475569] flex gap-2"><span className="text-[#5B8CFF]">✓</span>{feature}</li>)}</ul><Link href="/contact" className={index === 1 ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>Discuss This Package</Link></div></article></AnimateIn>)}</div><AnimateIn delay={0.35}><article className="mt-8 rounded-2xl bg-[#0F172A] text-white text-left p-7 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"><div><p className="font-semibold text-[#6FE3FF] uppercase tracking-wide text-sm">Enterprise / Custom</p><h3 className="text-2xl font-bold mt-1">From €1,499</h3><p className="text-sm text-white/70 mt-2 max-w-2xl">For integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume.</p></div><Link href="/contact" className="btn-primary shrink-0">Request a Quote</Link></article></AnimateIn></div></section>

      <section className="section-spacing bg-white"><div className="container max-w-3xl mx-auto"><AnimateIn><h2 className="text-3xl font-bold text-[#0F172A] mb-8 text-center">Limassol Web Design FAQs</h2></AnimateIn><div className="space-y-4">{faqItems.map((item) => <AnimateIn key={item.question}><article className="bg-[#F8FAFF] rounded-xl p-6 border border-[#E2E5EA]"><h3 className="font-semibold text-[#0F172A] mb-2">{item.question}</h3><p className="text-sm text-[#64748B] leading-relaxed">{item.answer}</p></article></AnimateIn>)}</div></div></section>

      <section className="section-spacing bg-[#0F172A] text-center"><div className="container max-w-3xl"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Ready to Improve Your Limassol Website?</h2><p className="text-white/70 text-lg mb-8">Tell DM-Labs.io about your business and we will recommend a practical starting scope.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20a%20free%20consultation%20for%20my%20Limassol%20business." target="_blank" rel="noopener noreferrer" className="btn-primary">Get a Free Consultation</a><Link href="/pricing" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">View All Packages</Link></div></AnimateIn></div></section>
    </main>
  );
}
