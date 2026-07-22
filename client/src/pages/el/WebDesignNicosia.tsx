import LocationPageEl from "@/components/LocationPageEl";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Μικρή μονοσέλιδη ή ελαφριά δισέλιδη ιστοσελίδα", "Responsive σχεδιασμός", "Βασικά SEO θεμέλια", "WhatsApp και social links", "2 γύροι αναθεωρήσεων"] },
  { name: "Growth Website", price: "€749", features: ["Έως 4 σελίδες", "Φόρμα επικοινωνίας", "Google Maps και κριτικές/μαρτυρίες", "Βασικό SEO", "Ρύθμιση Search Console και Analytics", "3 γύροι αναθεωρήσεων"] },
  { name: "Pro Website", price: "€1.499", features: ["Έως 7 σελίδες", "Gallery ή portfolio", "Pop-up και scroll animations", "Πλήρης δομή SEO", "Ρύθμιση blog ή visual pack ιστοσελίδας", "4 γύροι αναθεωρήσεων"] },
];
const faqItems = [
  { question: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στη Λευκωσία;", answer: "Τα πακέτα dm-labs.io ξεκινούν από €299 για Launch Website. Τα Growth Website πακέτα ξεκινούν από €749 και τα Pro Website πακέτα από €1.499. Έργα πέρα από το τυπικό εύρος τιμολογούνται ξεχωριστά μετά από δωρεάν συμβουλευτική." },
  { question: "Συνεργάζεστε με επιχειρήσεις στη Λευκωσία εξ αποστάσεως;", answer: "Ναι. Συνεργαζόμαστε με επιχειρήσεις σε όλη την Κύπρο, συμπεριλαμβανομένης της Λευκωσίας, εξ αποστάσεως." },
  { question: "Μπορεί η ιστοσελίδα μου να έχει πολλές γλώσσες;", answer: "Ναι. Η πολύγλωσση λειτουργικότητα μπορεί να συμπεριληφθεί σε Enterprise / Custom εύρος." },
  { question: "Περιλαμβάνει κάθε ιστοσελίδα SEO;", answer: "Κάθε πακέτο περιλαμβάνει search-friendly θεμέλια. Το Pro πακέτο περιλαμβάνει πληρέστερη δομή SEO." },
  { question: "Τι κάνει ένα έργο Enterprise / Custom;", answer: "Enterprise / Custom ισχύει για εργασία πέρα από το τυπικό εύρος πακέτου, όπως integrations, πολύγλωσσες ιστοσελίδες, CMS αυτοεπεξεργασία, AI ή chatbot χαρακτηριστικά, σύνθετη κίνηση, CRM ή κράτηση." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/el/web-design-nicosia#professionalservice", "name": "dm-labs.io", "description": "Η dm-labs.io σχεδιάζει και κατασκευάζει επαγγελματικές ιστοσελίδες για επιχειρήσεις στη Λευκωσία και σε όλη την Κύπρο.", "url": "https://dm-labs.io/el/web-design-nicosia", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "City", "name": "Nicosia", "addressCountry": "CY" }], "priceRange": "€299-€1.499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignNicosiaEl() {
  return (
    <LocationPageEl
      seo={{ title: "Κατασκευή Ιστοσελίδων Λευκωσία | Πακέτα από €299 | dm-labs.io", description: "Επαγγελματική κατασκευή ιστοσελίδων για επιχειρήσεις στη Λευκωσία. Launch από €299, Growth από €749, Pro από €1.499.", canonicalPath: "/el/web-design-nicosia" }}
      schemaId="schema-el-nicosia" schema={schema}
      eyebrow="Κατασκευή Ιστοσελίδων · Λευκωσία, Κύπρος"
      headline="Κατασκευή Ιστοσελίδων στη" headlineAccent="Λευκωσία"
      subheadline="Επαγγελματικές ιστοσελίδες για επιχειρήσεις στη Λευκωσία και σε όλη την Κύπρο."
      intro="Η dm-labs.io συνεργάζεται με επιχειρήσεις σε όλη την Κύπρο, συμπεριλαμβανομένης της Λευκωσίας. Κατασκευάζουμε ιστοσελίδες με σαφή δομή, επαγγελματική οπτική ταυτότητα και search-friendly θεμέλια."
      whoWeWorkWith={[
        ["Δημόσιος Τομέας και Θεσμοί", "Δημόσιοι φορείς και οργανισμοί που χρειάζονται σαφείς, προσβάσιμες ιστοσελίδες."],
        ["Χρηματοοικονομικές και Επαγγελματικές Υπηρεσίες", "Λογιστές, δικηγόροι, σύμβουλοι και χρηματοοικονομικές εταιρείες."],
        ["Λιανικό Εμπόριο και E-commerce", "Τοπικά καταστήματα και online stores."],
        ["Φιλοξενία και Εστιατόρια", "Ξενοδοχεία, εστιατόρια και καφέ στη Λευκωσία."],
        ["Υγεία και Κλινικές", "Ιατρεία, κλινικές και κέντρα ευεξίας."],
        ["Εκπαίδευση και Κατάρτιση", "Σχολεία, πανεπιστήμια και πάροχοι κατάρτισης."],
      ]}
      whatWeCanInclude={[
        ["Mobile-first Responsive Σχεδιασμός", "Η ιστοσελίδα σας λειτουργεί τέλεια σε κάθε συσκευή."],
        ["Θεμέλια Μηχανών Αναζήτησης", "Καθαρή δομή, γρήγορη φόρτωση και τα τεχνικά βασικά που χρειάζεται η Google."],
        ["Φόρμες Επικοινωνίας και WhatsApp", "Κάντε εύκολο για τους πελάτες να επικοινωνήσουν μαζί σας."],
        ["Ενσωμάτωση Google Maps", "Βοηθήστε τους πελάτες να βρουν την τοποθεσία σας."],
        ["Gallery και Portfolio", "Προβάλλετε τη δουλειά σας, τον χώρο σας ή τα προϊόντα σας."],
        ["Πολύγλωσση Υποστήριξη", "Φτάστε αγγλόφωνους, ελληνόφωνους, ρωσόφωνους και άλλους επισκέπτες."],
      ]}
      packages={packages} faqItems={faqItems}
      faqTitle="Συχνές Ερωτήσεις για Κατασκευή Ιστοσελίδων στη Λευκωσία"
      ctaHeadline="Έτοιμοι να χτίσετε μια καλύτερη ιστοσελίδα;"
      ctaBody="Πείτε μας για την επιχείρησή σας στη Λευκωσία και θα προτείνουμε το σωστό εύρος εκκίνησης."
      ctaWaText="Γεια σας dm-labs.io! Θα ήθελα δωρεάν συμβουλευτική για την επιχείρησή μου στη Λευκωσία."
    />
  );
}
