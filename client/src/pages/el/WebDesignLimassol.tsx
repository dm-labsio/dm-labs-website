import LocationPageEl from "@/components/LocationPageEl";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Μικρή μονοσέλιδη ή ελαφριά δισέλιδη ιστοσελίδα", "Responsive σχεδιασμός", "Βασικά SEO θεμέλια", "WhatsApp και social links", "2 γύροι αναθεωρήσεων"] },
  { name: "Growth Website", price: "€749", features: ["Έως 4 σελίδες", "Φόρμα επικοινωνίας", "Google Maps και κριτικές/μαρτυρίες", "Βασικό SEO", "Ρύθμιση Search Console και Analytics", "3 γύροι αναθεωρήσεων"] },
  { name: "Pro Website", price: "€1.499", features: ["Έως 7 σελίδες", "Gallery ή portfolio", "Pop-up και scroll animations", "Πλήρης δομή SEO", "Ρύθμιση blog ή visual pack ιστοσελίδας", "4 γύροι αναθεωρήσεων"] },
];
const faqItems = [
  { question: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στη Λεμεσό;", answer: "Τα πακέτα dm-labs.io ξεκινούν από €299 για Launch Website. Τα Growth Website πακέτα ξεκινούν από €749 και τα Pro Website πακέτα από €1.499. Έργα πέρα από το τυπικό εύρος τιμολογούνται ξεχωριστά μετά από δωρεάν συμβουλευτική." },
  { question: "Συνεργάζεστε με επιχειρήσεις στη Λεμεσό εξ αποστάσεως;", answer: "Ναι. Συνεργαζόμαστε με επιχειρήσεις σε όλη την Κύπρο, συμπεριλαμβανομένης της Λεμεσού, εξ αποστάσεως. Όλη η επικοινωνία, οι αναθεωρήσεις και οι εγκρίσεις γίνονται online." },
  { question: "Μπορεί η ιστοσελίδα μου να έχει πολλές γλώσσες;", answer: "Ναι. Η πολύγλωσση λειτουργικότητα μπορεί να συμπεριληφθεί σε Enterprise / Custom εύρος." },
  { question: "Περιλαμβάνει κάθε ιστοσελίδα SEO;", answer: "Κάθε πακέτο περιλαμβάνει search-friendly θεμέλια. Το Pro πακέτο περιλαμβάνει πληρέστερη δομή SEO." },
  { question: "Τι κάνει ένα έργο Enterprise / Custom;", answer: "Enterprise / Custom ισχύει για εργασία πέρα από το τυπικό εύρος πακέτου, όπως integrations, πολύγλωσσες ιστοσελίδες, CMS αυτοεπεξεργασία, AI ή chatbot χαρακτηριστικά, σύνθετη κίνηση, CRM ή κράτηση." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/el/web-design-limassol#professionalservice", "name": "dm-labs.io", "description": "Η dm-labs.io σχεδιάζει και κατασκευάζει επαγγελματικές ιστοσελίδες για επιχειρήσεις στη Λεμεσό και σε όλη την Κύπρο.", "url": "https://dm-labs.io/el/web-design-limassol", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "City", "name": "Limassol", "addressCountry": "CY" }], "priceRange": "€299-€1.499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignLimassolEl() {
  return (
    <LocationPageEl
      seo={{ title: "Κατασκευή Ιστοσελίδων Λεμεσός | Πακέτα από €299 | dm-labs.io", description: "Επαγγελματική κατασκευή ιστοσελίδων για επιχειρήσεις στη Λεμεσό. Launch από €299, Growth από €749, Pro από €1.499.", canonicalPath: "/el/web-design-limassol" }}
      schemaId="schema-el-limassol" schema={schema}
      eyebrow="Κατασκευή Ιστοσελίδων · Λεμεσός, Κύπρος"
      headline="Κατασκευή Ιστοσελίδων στη" headlineAccent="Λεμεσό"
      subheadline="Επαγγελματικές ιστοσελίδες για επιχειρήσεις στη Λεμεσό και σε όλη την Κύπρο."
      intro="Η dm-labs.io συνεργάζεται με επιχειρήσεις σε όλη την Κύπρο, συμπεριλαμβανομένης της Λεμεσού. Κατασκευάζουμε ιστοσελίδες με σαφή δομή, επαγγελματική οπτική ταυτότητα και search-friendly θεμέλια."
      whoWeWorkWith={[
        ["Χρηματοοικονομικές και Επαγγελματικές Υπηρεσίες", "Λογιστές, δικηγόροι, σύμβουλοι και χρηματοοικονομικές εταιρείες."],
        ["Φιλοξενία και Εστιατόρια", "Ξενοδοχεία, εστιατόρια και μπαρ στη Λεμεσό που χρειάζονται ισχυρή παρουσία."],
        ["Κτηματομεσιτικά", "Καταχωρίσεις ακινήτων, προφίλ γραφείου και lead generation."],
        ["Λιανικό Εμπόριο και E-commerce", "Τοπικά καταστήματα και online stores."],
        ["Ομορφιά και Ευεξία", "Κομμωτήρια, spas και στούντιο ευεξίας."],
        ["Τεχνολογία και Startups", "Εταιρείες τεχνολογίας και startups στη Λεμεσό."],
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
      faqTitle="Συχνές Ερωτήσεις για Κατασκευή Ιστοσελίδων στη Λεμεσό"
      ctaHeadline="Έτοιμοι να χτίσετε μια καλύτερη ιστοσελίδα;"
      ctaBody="Πείτε μας για την επιχείρησή σας στη Λεμεσό και θα προτείνουμε το σωστό εύρος εκκίνησης."
      ctaWaText="Γεια σας dm-labs.io! Θα ήθελα δωρεάν συμβουλευτική για την επιχείρησή μου στη Λεμεσό."
    />
  );
}
