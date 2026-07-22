import LocationPageEl from "@/components/LocationPageEl";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Μικρή μονοσέλιδη ή ελαφριά δισέλιδη ιστοσελίδα", "Responsive σχεδιασμός", "Βασικά SEO θεμέλια", "WhatsApp και social links", "2 γύροι αναθεωρήσεων"] },
  { name: "Growth Website", price: "€749", features: ["Έως 4 σελίδες", "Φόρμα επικοινωνίας", "Google Maps και κριτικές/μαρτυρίες", "Βασικό SEO", "Ρύθμιση Search Console και Analytics", "3 γύροι αναθεωρήσεων"] },
  { name: "Pro Website", price: "€1.499", features: ["Έως 7 σελίδες", "Gallery ή portfolio", "Pop-up και scroll animations", "Πλήρης δομή SEO", "Ρύθμιση blog ή visual pack ιστοσελίδας", "4 γύροι αναθεωρήσεων"] },
];
const faqItems = [
  { question: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στην Κύπρο;", answer: "Τα πακέτα dm-labs.io ξεκινούν από €299 για Launch Website. Τα Growth Website πακέτα ξεκινούν από €749 και τα Pro Website πακέτα από €1.499. Έργα πέρα από το τυπικό εύρος τιμολογούνται ξεχωριστά μετά από δωρεάν συμβουλευτική." },
  { question: "Συνεργάζεστε με επιχειρήσεις σε όλη την Κύπρο;", answer: "Ναι. Συνεργαζόμαστε με επιχειρήσεις στην Πάφο, Λεμεσό, Λευκωσία, Λάρνακα και σε όλη την Κύπρο. Όλη η εργασία γίνεται εξ αποστάσεως." },
  { question: "Μπορεί η ιστοσελίδα μου να έχει πολλές γλώσσες;", answer: "Ναι. Η πολύγλωσση λειτουργικότητα μπορεί να συμπεριληφθεί σε Enterprise / Custom εύρος, ανάλογα με τις γλώσσες, τον όγκο περιεχομένου και τις απαιτήσεις επεξεργασίας." },
  { question: "Περιλαμβάνει κάθε ιστοσελίδα SEO;", answer: "Κάθε πακέτο περιλαμβάνει search-friendly θεμέλια. Το Pro πακέτο περιλαμβάνει πληρέστερη δομή SEO, ενώ η προηγμένη εργασία SEO τιμολογείται βάσει εύρους." },
  { question: "Τι κάνει ένα έργο Enterprise / Custom;", answer: "Enterprise / Custom ισχύει για εργασία πέρα από το τυπικό εύρος πακέτου, όπως integrations, πολύγλωσσες ιστοσελίδες, CMS αυτοεπεξεργασία, AI ή chatbot χαρακτηριστικά, σύνθετη κίνηση, CRM ή κράτηση, και ασυνήθιστος όγκος περιεχομένου." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/el/web-design-cyprus#professionalservice", "name": "dm-labs.io", "description": "Η dm-labs.io σχεδιάζει και κατασκευάζει επαγγελματικές ιστοσελίδες για επιχειρήσεις σε όλη την Κύπρο.", "url": "https://dm-labs.io/el/web-design-cyprus", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "Country", "name": "Cyprus" }], "priceRange": "€299-€1.499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignCyprusEl() {
  return (
    <LocationPageEl
      seo={{ title: "Κατασκευή Ιστοσελίδων Κύπρος | Πακέτα από €299 | dm-labs.io", description: "Επαγγελματική κατασκευή ιστοσελίδων για επιχειρήσεις σε όλη την Κύπρο. Launch από €299, Growth από €749, Pro από €1.499.", canonicalPath: "/el/web-design-cyprus" }}
      schemaId="schema-el-cyprus" schema={schema}
      eyebrow="Κατασκευή Ιστοσελίδων · Κύπρος"
      headline="Κατασκευή Ιστοσελίδων στην" headlineAccent="Κύπρο"
      subheadline="Επαγγελματικές ιστοσελίδες για επιχειρήσεις σε όλη την Κύπρο."
      intro="Η dm-labs.io είναι ένα studio web design με έδρα την Κύπρο. Συνεργαζόμαστε με επιχειρήσεις στην Πάφο, Λεμεσό, Λευκωσία, Λάρνακα και σε όλο το νησί, κατασκευάζοντας ιστοσελίδες με σαφή δομή, επαγγελματική οπτική ταυτότητα και search-friendly θεμέλια."
      whoWeWorkWith={[
        ["Φιλοξενία και Τουρισμός", "Ξενοδοχεία, βίλες, tour operators και τουριστικές υπηρεσίες σε όλη την Κύπρο."],
        ["Εστιατόρια και Καφέ", "Από casual spots έως fine dining, ιστοσελίδες που προβάλλουν το μενού σας."],
        ["Επαγγελματικές Υπηρεσίες", "Λογιστές, δικηγόροι, σύμβουλοι και κλινικές που χρειάζονται αξιόπιστη ιστοσελίδα."],
        ["Κτηματομεσιτικά", "Καταχωρίσεις ακινήτων, προφίλ γραφείου και lead generation."],
        ["Ομορφιά και Ευεξία", "Κομμωτήρια, spas και στούντιο ευεξίας που χρειάζονται επαγγελματική παρουσία."],
        ["Λιανικό Εμπόριο και E-commerce", "Τοπικά καταστήματα και online stores που θέλουν να φτάσουν περισσότερους πελάτες."],
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
      faqTitle="Συχνές Ερωτήσεις για Κατασκευή Ιστοσελίδων στην Κύπρο"
      ctaHeadline="Έτοιμοι να χτίσετε μια καλύτερη ιστοσελίδα;"
      ctaBody="Πείτε μας για την επιχείρησή σας στην Κύπρο και θα προτείνουμε το σωστό εύρος εκκίνησης."
      ctaWaText="Γεια σας dm-labs.io! Θα ήθελα δωρεάν συμβουλευτική για την επιχείρησή μου στην Κύπρο."
    />
  );
}
