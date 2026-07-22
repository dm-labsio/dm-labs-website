import LocationPage from "@/components/LocationPage";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"] },
  { name: "Growth Website", price: "€749", features: ["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"] },
  { name: "Pro Website", price: "€1,499", features: ["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"] },
];
const faqItems = [
  { question: "How much does web design cost in Crete?", answer: "dm-labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Projects beyond the standard scope are quoted separately after a free consultation." },
  { question: "Do you work with Crete businesses remotely?", answer: "Yes. We work with businesses across Greece, including Crete, fully remotely. All communication, reviews, and approvals happen online, so location is not a barrier." },
  { question: "Can my Crete business website have multiple languages?", answer: "Yes. Multilingual functionality can be included in an Enterprise / Custom scope, depending on the languages, content volume, and editing requirements." },
  { question: "Does every website include SEO?", answer: "Every package includes search-friendly foundations. The Pro package includes a fuller SEO structure, while advanced SEO work is quoted based on scope." },
  { question: "What makes a project Enterprise / Custom?", answer: "Enterprise / Custom applies to work beyond the standard package scope, such as integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/web-design-crete#professionalservice", "name": "dm-labs.io", "description": "dm-labs.io designs and builds professional, mobile-first websites for businesses in Crete and across Greece.", "url": "https://dm-labs.io/web-design-crete", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "AdministrativeArea", "name": "Crete", "addressCountry": "GR" }, { "@type": "Country", "name": "Greece" }], "priceRange": "€299-€1,499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignCrete() {
  return (
    <LocationPage
      seo={{ title: "Web Design Crete | Website Packages from €299 | dm-labs.io", description: "Professional website design for businesses in Crete and across Greece. Launch websites from €299, Growth from €749, Pro from €1,499, plus custom website projects.", canonicalPath: "/web-design-crete" }}
      schemaId="schema-crete" schema={schema}
      eyebrow="Web Design · Crete, Greece"
      headline="Web Design in" headlineAccent="Crete"
      subheadline="Professional websites for businesses in Crete and across Greece."
      intro="dm-labs.io works with businesses across Greece and the Greek islands, including Crete. We build websites with clear structure, professional visual identity, and search-friendly foundations tailored to each business."
      whoWeWorkWith={[
        ["Hospitality and Tourism", "Hotels, villas, tour operators, and travel services across Crete."],
        ["Restaurants and Tavernas", "From casual spots to fine dining, websites that showcase your menu and drive bookings."],
        ["Real Estate and Property", "Property listings, agency profiles, and lead generation for Crete real estate professionals."],
        ["Beauty and Wellness", "Salons, spas, and wellness studios that need a professional online presence."],
        ["Local Professional Services", "Accountants, lawyers, consultants, and clinics that need a credible website."],
        ["Retail and E-commerce", "Local shops and online stores looking to reach more customers in Crete and beyond."],
      ]}
      whatWeCanInclude={[
        ["Mobile-first Responsive Design", "Your website works perfectly on every device, from phone to desktop."],
        ["Search Engine Foundations", "Clean structure, fast loading, and the technical basics Google needs to index your site."],
        ["Contact Forms and WhatsApp", "Make it easy for customers to reach you through the channels they prefer."],
        ["Google Maps Integration", "Help customers find your location and build local search visibility."],
        ["Gallery and Portfolio", "Showcase your work, your space, or your products with a clean visual layout."],
        ["Multilingual Support", "Reach English, Greek, German, and other language audiences with a properly structured multilingual site."],
      ]}
      packages={packages} faqItems={faqItems}
      faqTitle="Crete Web Design FAQs"
      ctaHeadline="Ready to build a better website?"
      ctaBody="Tell us about your Crete business and we will recommend the right starting scope."
      ctaWaText="Hi dm-labs.io! I'd like a free consultation for my Crete business."
    />
  );
}
