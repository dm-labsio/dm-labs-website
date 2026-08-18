/* ============================================================
   DM-Labs.io — Restaurant Website Design Cyprus
   Target: website design for restaurants in Cyprus.
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
  { question: "How much does a restaurant website cost in Cyprus?", answer: "DM-Labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Projects outside the standard scope are quoted separately after a free consultation." },
  { question: "Can a restaurant website include a menu and reservation path?", answer: "Yes. Menu, booking and reservation requirements are discussed during scoping. Depending on the package and complexity, the site can include clear menu pages, enquiry forms, external booking links, maps, and contact paths." },
  { question: "Can the website be multilingual?", answer: "Multilingual functionality is available through Enterprise / Custom scope. The final quote depends on language count, content volume, translations, and how you want to manage updates." },
  { question: "What search support is included?", answer: "Every package includes responsive implementation and basic SEO foundations. Growth includes Search Console and Analytics setup, while Pro includes a fuller SEO structure. Advanced SEO work and extra content are scoped separately." },
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://dm-labs.io/web-design-restaurants-cyprus/#professionalservice",
      "name": "DM-Labs.io",
      "description": "DM-Labs.io designs and builds professional, mobile-first websites for restaurants, tavernas, cafés, and bars across Cyprus.",
      "url": "https://dm-labs.io/web-design-restaurants-cyprus/",
      "telephone": "+35797472847",
      "email": "info@dm-labs.io",
      "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" },
      "areaServed": { "@type": "Country", "name": "Cyprus" },
      "priceRange": "€299-€1,499",
      "currenciesAccepted": "EUR",
      "hasOfferCatalog": { "@type": "OfferCatalog", "name": "DM-Labs.io Website Packages", "itemListElement": packages.map((item) => ({ "@type": "Offer", "name": item.name, "price": item.price.replace(/[€,]/g, ""), "priceCurrency": "EUR" })) }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqItems.map((item) => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } }))
    }
  ]
};

export default function WebDesignRestaurantsCyprus() {
  useSEO({
    title: "Restaurant Website Design Cyprus | DM-Labs.io",
    description: "DM-Labs.io builds professional, mobile-first restaurant websites in Cyprus. Clear package options from €299 for menus, contact paths, bookings, and search-friendly foundations.",
    canonicalPath: "/web-design-restaurants-cyprus/",
  });

  useEffect(() => {
    document.getElementById("schema-restaurants-cyprus")?.remove();
    const script = document.createElement("script");
    script.id = "schema-restaurants-cyprus";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => { document.getElementById("schema-restaurants-cyprus")?.remove(); };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <section className="section-spacing bg-gradient-to-br from-[#FFF8F0] via-[#F6F6F4] to-[#F0F4FF]">
        <div className="container max-w-4xl mx-auto text-center"><AnimateIn>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Restaurant Web Design · Cyprus</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight mb-6">Restaurant Website Design in <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#5B8CFF] bg-clip-text text-transparent">Cyprus</span></h1>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto mb-8 leading-relaxed">DM-Labs.io builds mobile-first websites for restaurants, tavernas, cafés, and bars. Give diners a clear route to your menu, location, contact details, and booking options.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27m%20interested%20in%20a%20restaurant%20website%20in%20Cyprus." target="_blank" rel="noopener noreferrer" className="btn-primary">Get a Free Consultation</a><Link href="/pricing/" className="btn-secondary">View Website Packages</Link></div>
        </AnimateIn></div>
      </section>

      <section className="section-spacing bg-white"><div className="container max-w-3xl mx-auto"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Make the Important Information Easy to Find</h2><p className="text-[#475569] text-lg leading-relaxed mb-5">Restaurant visitors often arrive from a phone and want a few things quickly: your menu, location, opening information, photos, and a simple way to contact or book. A good restaurant website makes these journeys clear without distracting them from the decision to visit.</p><p className="text-[#475569] text-lg leading-relaxed">DM-Labs.io scopes each restaurant website around your particular business and the tools you already use, from a simple menu and contact path to a broader website with booking, content, and multilingual requirements.</p></AnimateIn></div></section>

      <section className="section-spacing"><div className="container"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 text-center">What Your Restaurant Website Can Include</h2><p className="text-[#64748B] text-center mb-12 max-w-xl mx-auto">The exact features depend on the package and agreed scope.</p></AnimateIn><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{[
        ["Digital menu pages", "Present food, drinks, prices, and key information in a mobile-friendly format."],
        ["Contact and booking paths", "Help diners call, message, enquire, or follow an external booking link."],
        ["Maps and directions", "Make it easy for visitors to find your restaurant from search and mobile maps."],
        ["Photo-led presentation", "Use gallery and portfolio-style content to show your food, venue, and atmosphere."],
        ["Search-friendly foundations", "Use sensible page structure, responsive implementation, metadata, and technical foundations."],
        ["Multilingual and custom needs", "Discuss multilingual content, booking tools, CRM, and other advanced requirements as Enterprise / Custom scope."],
      ].map(([title, text]) => <AnimateIn key={title}><article className="bg-white rounded-2xl p-6 border border-[#E2E5EA] hover:border-[#5B8CFF] transition-colors h-full"><h3 className="font-semibold text-[#0F172A] mb-2">{title}</h3><p className="text-sm text-[#64748B] leading-relaxed">{text}</p></article></AnimateIn>)}</div></div></section>

      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] to-[#F6F6F4]"><div className="container max-w-5xl mx-auto text-center"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Clear Starting Packages</h2><p className="text-[#475569] mb-10">Choose a practical starting point, then scope custom requirements separately.</p></AnimateIn><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{packages.map((pkg, index) => <AnimateIn key={pkg.name} delay={index * 0.1}><article className={index === 1 ? "rounded-2xl p-[1px] bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] h-full" : "h-full"}><div className="bg-white rounded-2xl p-6 h-full text-left flex flex-col"><p className="text-sm font-semibold uppercase tracking-wide text-[#5B8CFF] mb-2">{pkg.name}</p><p className="text-3xl font-bold text-[#0F172A] mb-4">{pkg.price}</p><ul className="text-sm text-[#475569] space-y-2 mb-6 flex-1">{pkg.features.map((feature) => <li key={feature} className="flex gap-2"><span className="text-[#5B8CFF]">✓</span>{feature}</li>)}</ul><Link href="/contact/" className={index === 1 ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>Discuss This Package</Link></div></article></AnimateIn>)}</div><AnimateIn delay={0.35}><article className="mt-8 rounded-2xl bg-[#0F172A] text-white text-left p-7 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"><div><p className="font-semibold text-[#6FE3FF] uppercase tracking-wide text-sm">Enterprise / Custom</p><h3 className="text-2xl font-bold mt-1">From €1,499</h3><p className="text-sm text-white/70 mt-2 max-w-2xl">For custom integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume.</p></div><Link href="/contact/" className="btn-primary shrink-0">Request a Quote</Link></article></AnimateIn></div></section>

      <section className="section-spacing bg-white"><div className="container max-w-3xl mx-auto"><AnimateIn><h2 className="text-3xl font-bold text-[#0F172A] mb-8 text-center">Restaurant Website FAQs</h2></AnimateIn><div className="space-y-4">{faqItems.map((item) => <AnimateIn key={item.question}><article className="bg-[#F8FAFF] rounded-xl p-6 border border-[#E2E5EA]"><h3 className="font-semibold text-[#0F172A] mb-2">{item.question}</h3><p className="text-sm text-[#64748B] leading-relaxed">{item.answer}</p></article></AnimateIn>)}</div></div></section>

      <section className="section-spacing bg-[#0F172A] text-center"><div className="container max-w-3xl"><AnimateIn><h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Ready to Improve Your Restaurant Website?</h2><p className="text-white/70 text-lg mb-8">Tell DM-Labs.io about your restaurant, existing menu, and the actions you want diners to take.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="https://wa.me/35797472847?text=Hi%20DM-Labs.io!%20I%27d%20like%20to%20discuss%20a%20restaurant%20website." target="_blank" rel="noopener noreferrer" className="btn-primary">Get a Free Consultation</a><Link href="/pricing/" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">View All Packages</Link></div></AnimateIn></div></section>
    </main>
  );
}
