import LocationPageEl from "@/components/LocationPageEl";

const packages = [
  { name: "Launch Website", price: "€299", features: ["Μικρή μονοσέλιδη ή ελαφριά δισέλιδη ιστοσελίδα", "Responsive σχεδιασμός", "Βασικά SEO θεμέλια", "WhatsApp και social links", "2 γύροι αναθεωρήσεων"] },
  { name: "Growth Website", price: "€749", features: ["Έως 4 σελίδες", "Φόρμα επικοινωνίας", "Google Maps και κριτικές/μαρτυρίες", "Βασικό SEO", "Ρύθμιση Search Console και Analytics", "3 γύροι αναθεωρήσεων"] },
  { name: "Pro Website", price: "€1.499", features: ["Έως 7 σελίδες", "Gallery ή portfolio", "Pop-up και scroll animations", "Πλήρης δομή SEO", "Ρύθμιση blog ή visual pack ιστοσελίδας", "4 γύροι αναθεωρήσεων"] },
];
const faqItems = [
  { question: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στην Κρήτη;", answer: "Τα πακέτα dm-labs.io ξεκινούν από €299 για Launch Website. Τα Growth Website πακέτα ξεκινούν από €749 και τα Pro Website πακέτα από €1.499. Έργα πέρα από το τυπικό εύρος τιμολογούνται ξεχωριστά μετά από δωρεάν συμβουλευτική." },
  { question: "Συνεργάζεστε με επιχειρήσεις στην Κρήτη εξ αποστάσεως;", answer: "Ναι. Συνεργαζόμαστε με επιχειρήσεις σε όλη την Κρήτη εξ αποστάσεως. Όλη η επικοινωνία, οι αναθεωρήσεις και οι εγκρίσεις γίνονται online." },
  { question: "Μπορεί η ιστοσελίδα μου να έχει πολλές γλώσσες;", answer: "Ναι. Η πολύγλωσση λειτουργικότητα μπορεί να συμπεριληφθεί σε Enterprise / Custom εύρος, ανάλογα με τις γλώσσες, τον όγκο περιεχομένου και τις απαιτήσεις επεξεργασίας." },
  { question: "Περιλαμβάνει κάθε ιστοσελίδα SEO;", answer: "Κάθε πακέτο περιλαμβάνει search-friendly θεμέλια. Το Pro πακέτο περιλαμβάνει πληρέστερη δομή SEO, ενώ η προηγμένη εργασία SEO τιμολογείται βάσει εύρους." },
  { question: "Τι κάνει ένα έργο Enterprise / Custom;", answer: "Enterprise / Custom ισχύει για εργασία πέρα από το τυπικό εύρος πακέτου, όπως integrations, πολύγλωσσες ιστοσελίδες, CMS αυτοεπεξεργασία, AI ή chatbot χαρακτηριστικά, σύνθετη κίνηση, CRM ή κράτηση, και ασυνήθιστος όγκος περιεχομένου." },
];
const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "ProfessionalService", "@id": "https://dm-labs.io/el/web-design-crete#professionalservice", "name": "dm-labs.io", "description": "Η dm-labs.io σχεδιάζει και κατασκευάζει επαγγελματικές ιστοσελίδες για επιχειρήσεις στην Κρήτη και σε όλη την Ελλάδα.", "url": "https://dm-labs.io/el/web-design-crete", "telephone": "+35797472847", "email": "info@dm-labs.io", "address": { "@type": "PostalAddress", "streetAddress": "Eleftheriou Chandrinou", "postalCode": "8045", "addressLocality": "Paphos", "addressCountry": "CY" }, "areaServed": [{ "@type": "AdministrativeArea", "name": "Κρήτη", "addressCountry": "GR" }], "priceRange": "€299-€1.499" }, { "@type": "FAQPage", "mainEntity": faqItems.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }] };

export default function WebDesignCreteEl() {
  return (
    <LocationPageEl
      seo={{ title: "Κατασκευή Ιστοσελίδων Κρήτη | Πακέτα από €299 | dm-labs.io", description: "Επαγγελματική κατασκευή ιστοσελίδων για επιχειρήσεις στην Κρήτη. Launch από €299, Growth από €749, Pro από €1.499.", canonicalPath: "/el/web-design-crete" }}
      schemaId="schema-el-crete" schema={schema}
      eyebrow="Κατασκευή Ιστοσελίδων · Κρήτη, Ελλάδα"
      headline="Κατασκευή Ιστοσελίδων στην" headlineAccent="Κρήτη"
      subheadline="Επαγγελματικές ιστοσελίδες για επιχειρήσεις στην Κρήτη και σε όλη την Ελλάδα."
      intro="Η dm-labs.io συνεργάζεται με επιχειρήσεις σε όλη την Ελλάδα και τα ελληνικά νησιά, συμπεριλαμβανομένης της Κρήτης. Κατασκευάζουμε ιστοσελίδες με σαφή δομή, επαγγελματική οπτική ταυτότητα και search-friendly θεμέλια."
      whoWeWorkWith={[
        ["Φιλοξενία και Τουρισμός", "Ξενοδοχεία, βίλες, tour operators και τουριστικές υπηρεσίες σε όλη την Κρήτη."],
        ["Εστιατόρια και Ταβέρνες", "Από casual spots έως fine dining, ιστοσελίδες που προβάλλουν το μενού σας."],
        ["Κτηματομεσιτικά", "Καταχωρίσεις ακινήτων, προφίλ γραφείου και lead generation για επαγγελματίες ακινήτων."],
        ["Ομορφιά και Ευεξία", "Κομμωτήρια, spas και στούντιο ευεξίας που χρειάζονται επαγγελματική παρουσία."],
        ["Τοπικές Επαγγελματικές Υπηρεσίες", "Λογιστές, δικηγόροι, σύμβουλοι και κλινικές που χρειάζονται αξιόπιστη ιστοσελίδα."],
        ["Λιανικό Εμπόριο και E-commerce", "Τοπικά καταστήματα και online stores που θέλουν να φτάσουν περισσότερους πελάτες."],
      ]}
      whatWeCanInclude={[
        ["Mobile-first Responsive Σχεδιασμός", "Η ιστοσελίδα σας λειτουργεί τέλεια σε κάθε συσκευή."],
        ["Θεμέλια Μηχανών Αναζήτησης", "Καθαρή δομή, γρήγορη φόρτωση και τα τεχνικά βασικά που χρειάζεται η Google."],
        ["Φόρμες Επικοινωνίας και WhatsApp", "Κάντε εύκολο για τους πελάτες να επικοινωνήσουν μαζί σας."],
        ["Ενσωμάτωση Google Maps", "Βοηθήστε τους πελάτες να βρουν την τοποθεσία σας."],
        ["Gallery και Portfolio", "Προβάλλετε τη δουλειά σας, τον χώρο σας ή τα προϊόντα σας."],
        ["Πολύγλωσση Υποστήριξη", "Φτάστε αγγλόφωνους, ελληνόφωνους, γερμανόφωνους και άλλους επισκέπτες."],
      ]}
      packages={packages} faqItems={faqItems}
      faqTitle="Συχνές Ερωτήσεις για Κατασκευή Ιστοσελίδων στην Κρήτη"
      ctaHeadline="Έτοιμοι να χτίσετε μια καλύτερη ιστοσελίδα;"
      ctaBody="Πείτε μας για την επιχείρησή σας στην Κρήτη και θα προτείνουμε το σωστό εύρος εκκίνησης."
      ctaWaText="Γεια σας dm-labs.io! Θα ήθελα δωρεάν συμβουλευτική για την επιχείρησή μου στην Κρήτη."
    />
  );
}
