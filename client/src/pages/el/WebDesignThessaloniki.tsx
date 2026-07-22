import LocationPageEl from "@/components/LocationPageEl";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Μικρή μονοσέλιδη ή ελαφριά δισέλιδη ιστοσελίδα", "Responsive σχεδιασμός", "Βασικά SEO θεμέλια", "WhatsApp και social links", "2 γύροι αναθεωρήσεων"] },
  { name: "Growth Website", price: "€749", features: ["Έως 4 σελίδες", "Φόρμα επικοινωνίας", "Google Maps και κριτικές/μαρτυρίες", "Βασικό SEO", "Ρύθμιση Search Console και Analytics", "3 γύροι αναθεωρήσεων"] },
  { name: "Pro Website", price: "€1.499", features: ["Έως 7 σελίδες", "Gallery ή portfolio", "Pop-up και scroll animations", "Πλήρης δομή SEO", "Ρύθμιση blog ή visual pack ιστοσελίδας", "4 γύροι αναθεωρήσεων"] },
];
const faqItems = [
  { question: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στη Θεσσαλονίκη;", answer: "Τα πακέτα dm-labs.io ξεκινούν από €299 για Launch Website. Τα Growth Website πακέτα ξεκινούν από €749 και τα Pro Website πακέτα από €1.499. Έργα πέρα από το τυπικό εύρος τιμολογούνται ξεχωριστά μετά από δωρεάν συμβουλευτική." },
  { question: "Συνεργάζεστε με επιχειρήσεις στη Θεσσαλονίκη εξ αποστάσεως;", answer: "Ναι. Συνεργαζόμαστε με επιχειρήσεις σε όλη την Ελλάδα, συμπεριλαμβανομένης της Θεσσαλονίκης, εξ αποστάσεως." },
  { question: "Μπορεί η ιστοσελίδα μου να έχει πολλές γλώσσες;", answer: "Ναι. Η πολύγλωσση λειτουργικότητα μπορεί να συμπεριληφθεί σε Enterprise / Custom εύρος." },
  { question: "Περιλαμβάνει κάθε ιστοσελίδα SEO;", answer: "Κάθε πακέτο περιλαμβάνει search-friendly θεμέλια. Το Pro πακέτο περιλαμβάνει πληρέστερη δομή SEO." },
  { question: "Τι κάνει ένα έργο Enterprise / Custom;", answer: "Enterprise / Custom ισχύει για εργασία πέρα από το τυπικό εύρος πακέτου, όπως integrations, πολύγλωσσες ιστοσελίδες, CMS αυτοεπεξεργασία, AI ή chatbot χαρακτηριστικά, σύνθετη κίνηση, CRM ή κράτηση." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/el/web-design-thessaloniki#professionalservice", "name": "dm-labs.io", "description": "Η dm-labs.io σχεδιάζει και κατασκευάζει επαγγελματικές ιστοσελίδες για επιχειρήσεις στη Θεσσαλονίκη και σε όλη την Ελλάδα.", "url": "https://dm-labs.io/el/web-design-thessaloniki", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "City", "name": "Thessaloniki", "addressCountry": "GR" }], "priceRange": "€299-€1.499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignThessalonikiEl() {
  return (
    <LocationPageEl
      seo={{ title: "Κατασκευή Ιστοσελίδων Θεσσαλονίκη | Πακέτα από €299 | dm-labs.io", description: "Επαγγελματική κατασκευή ιστοσελίδων για επιχειρήσεις στη Θεσσαλονίκη. Launch από €299, Growth από €749, Pro από €1.499.", canonicalPath: "/el/web-design-thessaloniki" }}
      schemaId="schema-el-thessaloniki" schema={schema}
      eyebrow="Κατασκευή Ιστοσελίδων · Θεσσαλονίκη, Ελλάδα"
      headline="Κατασκευή Ιστοσελίδων στη" headlineAccent="Θεσσαλονίκη"
      subheadline="Επαγγελματικές ιστοσελίδες για επιχειρήσεις στη Θεσσαλονίκη και σε όλη την Ελλάδα."
      intro="Η dm-labs.io συνεργάζεται με επιχειρήσεις σε όλη την Ελλάδα, συμπεριλαμβανομένης της Θεσσαλονίκης. Κατασκευάζουμε ιστοσελίδες με σαφή δομή, επαγγελματική οπτική ταυτότητα και search-friendly θεμέλια."
      whoWeWorkWith={[
        ["Φιλοξενία και Τουρισμός", "Ξενοδοχεία, εστιατόρια και τουριστικές επιχειρήσεις στη Θεσσαλονίκη."],
        ["Λιανικό Εμπόριο και E-commerce", "Τοπικά καταστήματα και online stores."],
        ["Επαγγελματικές Υπηρεσίες", "Λογιστές, δικηγόροι, σύμβουλοι και κλινικές."],
        ["Τεχνολογία και Startups", "Εταιρείες τεχνολογίας και startups στη Θεσσαλονίκη."],
        ["Εκπαίδευση και Κατάρτιση", "Σχολεία, πανεπιστήμια και πάροχοι κατάρτισης."],
        ["Υγεία και Κλινικές", "Ιατρεία, κλινικές και κέντρα ευεξίας."],
      ]}
      whatWeCanInclude={[
        ["Mobile-first Responsive Σχεδιασμός", "Η ιστοσελίδα σας λειτουργεί τέλεια σε κάθε συσκευή."],
        ["Θεμέλια Μηχανών Αναζήτησης", "Καθαρή δομή, γρήγορη φόρτωση και τα τεχνικά βασικά που χρειάζεται η Google."],
        ["Φόρμες Επικοινωνίας και WhatsApp", "Κάντε εύκολο για τους πελάτες να επικοινωνήσουν μαζί σας."],
        ["Ενσωμάτωση Google Maps", "Βοηθήστε τους πελάτες να βρουν την τοποθεσία σας."],
        ["Gallery και Portfolio", "Προβάλλετε τη δουλειά σας, τον χώρο σας ή τα προϊόντα σας."],
        ["Πολύγλωσση Υποστήριξη", "Φτάστε αγγλόφωνους, ελληνόφωνους και άλλους επισκέπτες."],
      ]}
      packages={packages} faqItems={faqItems}
      faqTitle="Συχνές Ερωτήσεις για Κατασκευή Ιστοσελίδων στη Θεσσαλονίκη"
      ctaHeadline="Έτοιμοι να χτίσετε μια καλύτερη ιστοσελίδα;"
      ctaBody="Πείτε μας για την επιχείρησή σας στη Θεσσαλονίκη και θα προτείνουμε το σωστό εύρος εκκίνησης."
      ctaWaText="Γεια σας dm-labs.io! Θα ήθελα δωρεάν συμβουλευτική για την επιχείρησή μου στη Θεσσαλονίκη."
    />
  );
}
