import LocationPage from "@/components/LocationPage";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"] },
  { name: "Growth Website", price: "€749", features: ["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"] },
  { name: "Pro Website", price: "€1,499", features: ["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"] },
];
const faqItems = [
  { question: "How much does web design cost in Cyprus?", answer: "dm-labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Projects beyond the standard scope are quoted separately after a free consultation." },
  { question: "Do you work with businesses across all of Cyprus?", answer: "Yes. We work with businesses in Paphos, Limassol, Nicosia, Larnaca, Famagusta, and across Cyprus. All work is done remotely, so location within Cyprus is not a barrier." },
  { question: "Can my Cyprus business website have multiple languages?", answer: "Yes. Multilingual functionality can be included in an Enterprise / Custom scope, depending on the languages, content volume, and editing requirements." },
  { question: "Does every website include SEO?", answer: "Every package includes search-friendly foundations. The Pro package includes a fuller SEO structure, while advanced SEO work is quoted based on scope." },
  { question: "What makes a project Enterprise / Custom?", answer: "Enterprise / Custom applies to work beyond the standard package scope, such as integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/web-design-cyprus#professionalservice", "name": "dm-labs.io", "description": "dm-labs.io designs and builds professional, mobile-first websites for businesses across Cyprus.", "url": "https://dm-labs.io/web-design-cyprus", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "Country", "name": "Cyprus" }], "priceRange": "€299-€1,499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignCyprus() {
  return (
    <LocationPage
      seo={{ title: "Web Design Cyprus | Website Packages from €299 | dm-labs.io", description: "Professional website design for businesses across Cyprus. Launch websites from €299, Growth from €749, Pro from €1,499, plus custom website projects.", canonicalPath: "/web-design-cyprus" }}
      schemaId="schema-cyprus" schema={schema}
      eyebrow="Web Design · Cyprus"
      headline="Web Design in" headlineAccent="Cyprus"
      subheadline="Professional websites for businesses across Cyprus."
      intro="dm-labs.io is a Cyprus-based web design studio. We work with businesses in Paphos, Limassol, Nicosia, Larnaca, and across the island, building websites with clear structure, professional visual identity, and search-friendly foundations."
      whoWeWorkWith={[
        ["Hospitality and Tourism", "Hotels, villas, tour operators, and travel services across Cyprus."],
        ["Restaurants and Cafes", "From casual spots to fine dining, websites that showcase your menu and drive bookings."],
        ["Professional Services", "Accountants, lawyers, consultants, and clinics that need a credible website."],
        ["Real Estate and Property", "Property listings, agency profiles, and lead generation for Cyprus real estate professionals."],
        ["Beauty and Wellness", "Salons, spas, and wellness studios that need a professional online presence."],
        ["Retail and E-commerce", "Local shops and online stores looking to reach more customers across Cyprus."],
      ]}
      whatWeCanInclude={[
        ["Mobile-first Responsive Design", "Your website works perfectly on every device, from phone to desktop."],
        ["Search Engine Foundations", "Clean structure, fast loading, and the technical basics Google needs to index your site."],
        ["Contact Forms and WhatsApp", "Make it easy for customers to reach you through the channels they prefer."],
        ["Google Maps Integration", "Help customers find your location and build local search visibility."],
        ["Gallery and Portfolio", "Showcase your work, your space, or your products with a clean visual layout."],
        ["Multilingual Support", "Reach English, Greek, Russian, and other language audiences with a properly structured multilingual site."],
      ]}
      packages={packages} faqItems={faqItems}
      faqTitle="Cyprus Web Design FAQs"
      ctaHeadline="Ready to build a better website?"
      ctaBody="Tell us about your Cyprus business and we will recommend the right starting scope."
      ctaWaText="Hi dm-labs.io! I'd like a free consultation for my Cyprus business."
    />
  );
}
