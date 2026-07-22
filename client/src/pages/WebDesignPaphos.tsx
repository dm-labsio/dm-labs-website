import LocationPage from "@/components/LocationPage";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"] },
  { name: "Growth Website", price: "€749", features: ["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"] },
  { name: "Pro Website", price: "€1,499", features: ["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"] },
];
const faqItems = [
  { question: "How much does web design cost in Paphos?", answer: "dm-labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Projects beyond the standard scope are quoted separately after a free consultation." },
  { question: "Do you work with Paphos hospitality, tourism, and local service businesses?", answer: "Yes. We build websites for businesses in Paphos, including hospitality, restaurants, tour operators, real estate, beauty, wellness, and local professional services. The website scope is tailored to the business and its goals." },
  { question: "Can my Paphos business website have multiple languages?", answer: "Yes. Multilingual functionality can be included in an Enterprise / Custom scope, depending on the languages, content volume, and editing requirements." },
  { question: "Does every website include SEO?", answer: "Every package includes search-friendly foundations such as responsive implementation and basic SEO. The Pro package includes a fuller SEO structure, while advanced SEO work and additional content are quoted based on scope." },
  { question: "What makes a project Enterprise / Custom?", answer: "Enterprise / Custom applies to work beyond the standard package scope, such as integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/web-design-paphos#professionalservice", "name": "dm-labs.io", "description": "dm-labs.io designs and builds professional, mobile-first websites for businesses in Paphos and across Cyprus.", "url": "https://dm-labs.io/web-design-paphos", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "City", "name": "Paphos", "addressCountry": "CY" }, { "@type": "Country", "name": "Cyprus" }], "priceRange": "€299-€1,499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignPaphos() {
  return (
    <LocationPage
      seo={{ title: "Web Design Paphos | Website Packages from €299 | dm-labs.io", description: "Professional website design in Paphos, Cyprus. Launch websites from €299, Growth from €749, Pro from €1,499, plus custom website projects.", canonicalPath: "/web-design-paphos" }}
      schemaId="schema-paphos" schema={schema}
      eyebrow="Web Design · Paphos, Cyprus"
      headline="Web Design in" headlineAccent="Paphos"
      subheadline="Professional websites for businesses in Paphos and across Cyprus."
      intro="dm-labs.io is based in Paphos and works with businesses throughout Cyprus. We translate the practical needs of local businesses into a website with a clear structure, a professional visual identity, and search-friendly foundations."
      whoWeWorkWith={[
        ["Hotels, Villas and Hospitality", "Clear booking paths, photo-led pages, and practical information for visitors."],
        ["Restaurants and Cafes", "Menu, location, contact and booking information designed for mobile visitors."],
        ["Tour Operators and Activities", "Service pages, availability or booking links, and simple enquiry paths."],
        ["Real Estate and Property", "Property-focused presentation, enquiry routes, and a platform ready for wider scope."],
        ["Beauty, Wellness and Fitness", "Service-led pages, testimonials, directions, and booking integrations where needed."],
        ["Local Professional Services", "A trustworthy online presence that explains services and makes contacting you simple."],
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
      faqTitle="Paphos Web Design FAQs"
      ctaHeadline="Ready to build a better website?"
      ctaBody="Tell us about your Paphos business and we will recommend the right starting scope."
      ctaWaText="Hi dm-labs.io! I'd like a free consultation for my Paphos business."
    />
  );
}
