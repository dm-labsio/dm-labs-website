import LocationPage from "@/components/LocationPage";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Small one-page or light two-page site", "Responsive build", "Basic SEO foundations", "WhatsApp and social links", "2 revision rounds"] },
  { name: "Growth Website", price: "€749", features: ["Up to 4 pages", "Contact form", "Google Maps and reviews/testimonials", "Basic SEO", "Search Console and Analytics setup", "3 revision rounds"] },
  { name: "Pro Website", price: "€1,499", features: ["Up to 7 pages", "Gallery or portfolio", "Pop-up and scroll-driven animations", "Full SEO structure", "Blog setup or a website visual pack", "4 revision rounds"] },
];
const faqItems = [
  { question: "How much does web design cost in Nicosia?", answer: "dm-labs.io website packages start at €299 for a Launch Website. Growth Website packages start at €749 and Pro Website packages start at €1,499. Projects beyond the standard scope are quoted separately after a free consultation." },
  { question: "Do you work with Nicosia businesses remotely?", answer: "Yes. We work with businesses across Cyprus, including Nicosia, fully remotely. All communication, reviews, and approvals happen online, so location is not a barrier." },
  { question: "Can my Nicosia business website have multiple languages?", answer: "Yes. Multilingual functionality can be included in an Enterprise / Custom scope, depending on the languages, content volume, and editing requirements." },
  { question: "Does every website include SEO?", answer: "Every package includes search-friendly foundations. The Pro package includes a fuller SEO structure, while advanced SEO work is quoted based on scope." },
  { question: "What makes a project Enterprise / Custom?", answer: "Enterprise / Custom applies to work beyond the standard package scope, such as integrations, multilingual websites, CMS self-editing, AI or chatbot features, complex motion, CRM or booking, and unusual content volume." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/web-design-nicosia#professionalservice", "name": "dm-labs.io", "description": "dm-labs.io designs and builds professional, mobile-first websites for businesses in Nicosia and across Cyprus.", "url": "https://dm-labs.io/web-design-nicosia", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "City", "name": "Nicosia", "addressCountry": "CY" }, { "@type": "Country", "name": "Cyprus" }], "priceRange": "€299-€1,499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignNicosia() {
  return (
    <LocationPage
      seo={{ title: "Web Design Nicosia | Website Packages from €299 | dm-labs.io", description: "Professional website design for Nicosia businesses. Launch websites from €299, Growth from €749, Pro from €1,499, plus custom website projects.", canonicalPath: "/web-design-nicosia" }}
      schemaId="schema-nicosia" schema={schema}
      eyebrow="Web Design · Nicosia, Cyprus"
      headline="Web Design in" headlineAccent="Nicosia"
      subheadline="Professional websites for businesses in Nicosia and across Cyprus."
      intro="dm-labs.io works with businesses across Cyprus, including Nicosia. We build websites with clear structure, professional visual identity, and search-friendly foundations tailored to each business."
      whoWeWorkWith={[
        ["Government and Public Sector", "Institutions and public-facing organisations that need clear, accessible websites."],
        ["Finance and Professional Services", "Accountants, lawyers, consultants, and financial firms based in Nicosia."],
        ["Retail and E-commerce", "Local shops and online stores looking to reach more customers in Nicosia and beyond."],
        ["Hospitality and Restaurants", "Hotels, restaurants, and cafes in Nicosia that need a strong online presence."],
        ["Healthcare and Clinics", "Medical practices, clinics, and wellness centres that need a professional website."],
        ["Education and Training", "Schools, universities, and training providers that need an informative, accessible website."],
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
      faqTitle="Nicosia Web Design FAQs"
      ctaHeadline="Ready to build a better website?"
      ctaBody="Tell us about your Nicosia business and we will recommend the right starting scope."
      ctaWaText="Hi dm-labs.io! I'd like a free consultation for my Nicosia business."
    />
  );
}
