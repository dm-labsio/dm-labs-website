import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

// SEO landing page: /web-design-crete
// Primary keyword: "web design Crete"
// Secondary: "website for small business Crete", "κατασκευή ιστοσελίδας Κρήτη"
// Tertiary: "web design Ηράκλειο", "web design Χανιά", "website Crete price"
// Design: matches DM-Labs.io site style - light bg, brand gradient accents, clean typography

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DM-Labs.io",
  "url": "https://dm-labs.io",
  "telephone": "+35797472847",
  "email": "info@dm-labs.io",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eleftheriou Chandrinou 5",
    "addressLocality": "Paphos",
    "postalCode": "8045",
    "addressCountry": "CY"
  },
  "areaServed": [
    "Κρήτη",
    "Ηράκλειο",
    "Χανιά",
    "Ρέθυμνο",
    "Άγιος Νικόλαος",
    "Ελλάδα"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 35.2401,
      "longitude": 24.8093
    },
    "geoRadius": "150000"
  },
  "description": "Η DM-Labs.io είναι ένα απομακρυσμένο στούντιο web design που δημιουργεί επαγγελματικές, mobile-first, βελτιστοποιημένες για SEO ιστοσελίδες για μικρές επιχειρήσεις σε όλη την Κρήτη - Ηράκλειο, Χανιά, Ρέθυμνο και αλλού. Ιστοσελίδες από €299, με παράδοση σε 5-14 ημέρες.",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Τραπεζική Μεταφορά, PayPal",
  "openingHours": "Δε-Πα 09:00-18:00",
  "sameAs": [
    "https://www.instagram.com/dmlabs.io"
  ]
};

const faqs = [
  {
    q: "Πόσο κοστίζει μια ιστοσελίδα για μια επιχείρηση στην Κρήτη;",
    a: "Τα πακέτα μας ξεκινούν από €299 για μια ιστοσελίδα Starter - μια πλήρως προσαρμοσμένη, responsive για κινητά ιστοσελίδα με εγκατάσταση SEO, φόρμα επικοινωνίας, κουμπί WhatsApp και όλα όσα χρειάζεται η επιχείρησή σας για να βγει online. Το πακέτο Business κοστίζει €399 και περιλαμβάνει έως 5 σελίδες, φόρμες κράτησης, ενσωμάτωση Google Maps και ισχυρότερο SEO. Το πακέτο Premium κοστίζει €699 και περιλαμβάνει έως 7 σελίδες, πλήρη εγκατάσταση blog, pop-up και 5 άρθρα SEO. Όλες οι τιμές είναι εφάπαξ, χωρίς μηνιαίες χρεώσεις."
  },
  {
    q: "Συνεργάζεστε με επιχειρήσεις στην Κρήτη απομακρυσμένα;",
    a: "Ναι, αποκλειστικά. Η DM-Labs.io συνεργάζεται με πελάτες σε όλη την Κρήτη - Ηράκλειο, Χανιά, Ρέθυμνο, Άγιο Νικόλαο και οπουδήποτε αλλού - χωρίς να απαιτούνται συναντήσεις από κοντά. Η όλη διαδικασία γίνεται μέσω WhatsApp, email και βιντεοκλήσεων. Οι περισσότεροι πελάτες το βρίσκουν ταχύτερο και πιο βολικό από τον προγραμματισμό επισκέψεων σε γραφείο, και σημαίνει ότι μπορούμε να κινηθούμε γρήγορα από την ενημέρωση στην έναρξη λειτουργίας."
  },
  {
    q: "Μπορείτε να φτιάξετε μια ιστοσελίδα στα ελληνικά για την κρητική επιχείρησή μου;",
    a: "Φυσικά. Φτιάχνουμε δίγλωσσες ιστοσελίδες, τόσο στα ελληνικά όσο και στα αγγλικά, και μια πλήρως ελληνική έκδοση είναι διαθέσιμη κατόπιν αιτήματος. Εάν το κοινό σας είναι κυρίως ελληνόφωνο - κάτοικοι της περιοχής, εγχώριοι τουρίστες ή ελληνόφωνοι πελάτες - μπορούμε να δημιουργήσουμε μια αποκλειστικά ελληνική ιστοσελίδα ή μια δίγλωσση με δυνατότητα εναλλαγής γλώσσας. Είμαστε άνετοι να δουλεύουμε με ελληνικό περιεχόμενο και μπορούμε να σας συμβουλεύσουμε για το πώς να το δομήσετε τόσο για αναγνωσιμότητα όσο και για ορατότητα στο Google."
  },
  {
    q: "Πόσος χρόνος χρειάζεται για την κατασκευή μιας ιστοσελίδας για μια επιχείρηση στην Κρήτη;",
    a: "Το πακέτο Starter συνήθως παραδίδεται εντός 5 έως 7 ημερών από τη στιγμή που έχουμε το περιεχόμενο και τα σχόλιά σας. Τα πακέτα Business και Premium χρειάζονται 10 έως 14 ημέρες, ανάλογα με τον αριθμό των σελίδων και των λειτουργιών. Σας κρατάμε ενήμερους σε κάθε στάδιο και δεν εξαφανιζόμαστε μεταξύ των οροσήμων."
  },
  {
    q: "Η επιχείρησή μου εξαρτάται από τον τουρισμό. Μπορείτε να φτιάξετε μια ιστοσελίδα που προσελκύει διεθνείς επισκέπτες;",
    a: "Ναι - και αυτό είναι κάτι που το κάνουμε καλά. Πολλοί από τους πελάτες μας στην Κρήτη και την Κύπρο εξυπηρετούν τόσο ντόπιους πελάτες όσο και διεθνείς τουρίστες. Φτιάχνουμε δίγλωσσες ή πολύγλωσσες ιστοσελίδες που είναι βελτιστοποιημένες για αναζητήσεις τόσο στα ελληνικά όσο και στα αγγλικά, φορτώνουν γρήγορα σε κινητά (από όπου περιηγούνται οι περισσότεροι τουρίστες) και περιλαμβάνουν λειτουργίες όπως φόρμες online κρατήσεων, γκαλερί φωτογραφιών και ενσωμάτωση Google Maps. Μια καλοφτιαγμένη ιστοσελίδα είναι ένας από τους πιο αποτελεσματικούς τρόπους για να εξασφαλίσετε κρατήσεις από τουρίστες πριν καν φτάσουν στο νησί."
  },
  {
    q: "Με ποιες επιχειρήσεις στην Κρήτη συνεργάζεστε;",
    a: "Συνεργαζόμαστε με κάθε είδους μικρές και μεσαίες επιχειρήσεις σε όλη την Κρήτη - εστιατόρια, ταβέρνες, ξενοδοχεία, βίλες, κέντρα αισθητικής, yoga studios, δικηγόρους, λογιστές, κατασκευαστικές εταιρείες, καταστήματα λιανικής και επαγγελματικές υπηρεσίες κάθε είδους. Αν η επιχείρησή σας χρειάζεται να βρίσκεται online και να παρουσιάζεται επαγγελματικά, μπορούμε να φτιάξουμε την κατάλληλη ιστοσελίδα για εσάς."
  }
];

const industries = [
  {
    title: "Εστιατόρια και Ταβέρνες",
    desc: "Μια επαγγελματική ιστοσελίδα με το μενού, τις φωτογραφίες, την τοποθεσία σας και μια φόρμα κράτησης. Κατασκευασμένη για να σας βρίσκουν τόσο οι ντόπιοι όσο και οι τουρίστες που αναζητούν το καλύτερο φαγητό στην περιοχή σας.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Παραδοσιακή ελληνική ταβέρνα-εστιατόριο στην Κρήτη με εξωτερικό χώρο"
  },
  {
    title: "Ξενοδοχεία, Βίλες και Καταλύματα",
    desc: "Παρουσιάστε το κατάλυμά σας με εντυπωσιακή γκαλερί, πληροφορίες διαθεσιμότητας και φόρμα άμεσης κράτησης. Μειώστε την εξάρτησή σας από πλατφόρμες κρατήσεων και χτίστε απευθείας σχέσεις με τους επισκέπτες σας.",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    alt: "Πολυτελής βίλα με πισίνα στην Κρήτη για ιστοσελίδα καταλύματος"
  },
  {
    title: "Ομορφιά και Ευεξία",
    desc: "Κομμωτήρια, στούντιο νυχιών, θεραπευτές μασάζ και κλινικές αισθητικής. Μια καθαρή, επαγγελματική ιστοσελίδα με τις υπηρεσίες, τις τιμές σας και έναν εύκολο τρόπο για τους πελάτες να κλείσουν ραντεβού.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    alt: "Εσωτερικός χώρος σαλονιού ομορφιάς στην Κρήτη για επαγγελματική ιστοσελίδα"
  },
  {
    title: "Επαγγελματικές Υπηρεσίες",
    desc: "Δικηγόροι, λογιστές, αρχιτέκτονες και σύμβουλοι. Μια αξιόπιστη, καλά δομημένη ιστοσελίδα που επικοινωνεί την εξειδίκευσή σας και διευκολύνει τους πελάτες να επικοινωνήσουν μαζί σας.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    alt: "Επαγγελματική συνάντηση στην Κρήτη για επαγγελματική ιστοσελίδα"
  },
  {
    title: "Λιανική & Μπουτίκ",
    desc: "Μια κομψή online παρουσία για το κατάστημά σας - τα προϊόντα, η ιστορία, η τοποθεσία και τα στοιχεία επικοινωνίας σας. Κάντε εύκολο για τους πελάτες να σας βρουν πριν σας επισκεφτούν.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    alt: "Κατάστημα μπουτίκ στην Κρήτη για ιστοσελίδα μικρής επιχείρησης"
  },
  {
    title: "Κατασκευές & Τεχνικά Επαγγέλματα",
    desc: "Κατασκευαστές, ηλεκτρολόγοι, υδραυλικοί και εργολάβοι. Μια απλή ιστοσελίδα που δείχνει τη δουλειά σας, τις υπηρεσίες σας και διευκολύνει τους πελάτες να σας καλέσουν ή να σας στείλουν μήνυμα.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    alt: "Κατασκευαστική επιχείρηση στην Κρήτη για επαγγελματική ιστοσελίδα"
  },
  {
    title: "Fitness, Γυμναστήρια και Yoga",
    desc: "Personal trainers, yoga studios, εκπαιδευτές Pilates και σύμβουλοι ευεξίας. Μια ιστοσελίδα που παρουσιάζει τα μαθήματά σας, την ιστορία σας και διευκολύνει τους πελάτες να κλείσουν συνεδρία μαζί σας.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    alt: "Στούντιο Yoga και fitness στην Κρήτη για ιστοσελίδα επιχείρησης ευεξίας"
  }
];

export default function WebDesignCreteEl() {
  useSEO({
    title: "Κατασκευή Ιστοσελίδας Κρήτη | Web Design από €299 | DM-Labs.io",
    description: "Επαγγελματικό web design για μικρές επιχειρήσεις σε όλη την Κρήτη - Ηράκλειο, Χανιά, Ρέθυμνο. Custom ιστοσελίδες από €299, παράδοση σε 5-14 ημέρες. Mobile-first, SEO-ready, χωρίς κρυφές χρεώσεις.",
    canonicalPath: "/el/web-design-crete/"
  });

  useEffect(() => {
    const existing = document.getElementById("schema-crete");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "schema-crete";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("schema-crete");
      if (s) s.remove();
    };
  }, []);

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
            Κατασκευή Ιστοσελίδας Κρήτη
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Επαγγελματικές Ιστοσελίδες για{" "}
            <span className="bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] bg-clip-text text-transparent">
              Επιχειρήσεις στην Κρήτη
            </span>
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
            Η DM-Labs.io κατασκευάζει επαγγελματικές, γρήγορες και mobile-first ιστοσελίδες για μικρές επιχειρήσεις σε όλη την Κρήτη - από το Ηράκλειο και τα Χανιά μέχρι το Ρέθυμνο, τον Άγιο Νικόλαο και κάθε χωριό. Ξεκινώντας από €299, με παράδοση σε 5 έως 14 ημέρες.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Δωρεάν Συμβουλευτική
              </button>
            </Link>
            <Link href="/el/pricing/">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                Δείτε τις Τιμές
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="pb-0">
        <div className="container max-w-4xl mx-auto px-4">
          <figure className="rounded-2xl overflow-hidden shadow-md">
            <img
              src="/media/manus/NIKoLQKtylnVMtQG.webp"
              alt="Το παλιό λιμάνι των Χανίων στο ηλιοβασίλεμα - web design για επιχειρήσεις στην Κρήτη"
              className="w-full h-auto object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ── LOGO CLOUD ── */}
      <section className="section-spacing">
        <div className="container mx-auto text-center">
          <p className="text-sm font-semibold text-[#5B6472] mb-6">
            Εμπιστεύονται οι καλύτερες μικρές επιχειρήσεις στην Κρήτη
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
            <p className="font-display font-bold text-xl">Εστιατόριο</p>
            <p className="font-display font-bold text-xl">Στούντιο Yoga</p>
            <p className="font-display font-bold text-xl">Δικηγορικό Γραφείο</p>
            <p className="font-display font-bold text-xl">Boutique Ξενοδοχείο</p>
            <p className="font-display font-bold text-xl">Κλινική Αισθητικής</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Όλα όσα χρειάζεστε
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
              Ιστοσελίδες για μικρές επιχειρήσεις που λειτουργούν
            </h2>
            <p className="text-lg text-[#5B6472] leading-relaxed">
              Κάθε ιστοσελίδα που φτιάχνουμε είναι πλήρως εξοπλισμένη για να σας φέρει αποτελέσματα. Χωρίς κρυφές χρεώσεις, χωρίς μηνιαίες συνδρομές. Απλά μια εφάπαξ τιμή για μια επαγγελματική online παρουσία.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ 
              { title: "Επώνυμη επαγγελματική σελίδα", desc: "Μια πλήρως προσαρμοσμένη ιστοσελίδα που ταιριάζει με την επωνυμία και το στυλ σας." },
              { title: "Responsive για κινητά", desc: "Φαίνεται τέλεια σε κάθε συσκευή - κινητά, tablet και υπολογιστές." },
              { title: "Βελτιστοποίηση ταχύτητας", desc: "Γρήγοροι χρόνοι φόρτωσης για να κρατήσετε τους επισκέπτες και να βελτιώσετε το Google ranking." },
              { title: "Βασικό SEO On-Page", desc: "Βελτιστοποιημένο για να σας βρίσκουν στις μηχανές αναζήτησης για τους όρους-κλειδιά σας." },
              { title: "Φόρμα Επικοινωνίας & Κρατήσεων", desc: "Εύκολοι τρόποι για τους πελάτες να επικοινωνήσουν μαζί σας ή να κλείσουν ραντεβού." },
              { title: "Ενσωμάτωση Social Media", desc: "Σύνδεση με τα προφίλ σας στα social media για να αυξήσετε το κοινό σας." },
              { title: "Ενσωμάτωση Google Maps", desc: "Βοηθήστε τους πελάτες να σας βρουν εύκολα με έναν ενσωματωμένο χάρτη." },
              { title: "Πιστοποιητικό SSL", desc: "Για ασφάλεια και εμπιστοσύνη, με το λουκέτο HTTPS στη διεύθυνσή σας." },
              { title: "Ενσωμάτωση WhatsApp", desc: "Επιτρέψτε στους πελάτες να σας στείλουν μήνυμα απευθείας από την ιστοσελίδα σας." }
            ].map(f => (
              <div key={f.title} className="bg-[#F6F6F4] p-6 rounded-xl">
                <h3 className="font-bold text-lg text-[#111315] mb-2">{f.title}</h3>
                <p className="text-[#5B6472] text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section-spacing">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">
              Για κάθε επιχείρηση στην Κρήτη
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
              Ειδικευόμαστε στις μικρές επιχειρήσεις
            </h2>
            <p className="text-lg text-[#5B6472] leading-relaxed">
              Από εστιατόρια στο Ηράκλειο μέχρι βίλες στα Χανιά, κατασκευάζουμε ιστοσελίδες που ταιριάζουν στις μοναδικές ανάγκες των τοπικών επιχειρήσεων στην Κρήτη. Κατανοούμε την αγορά και τι χρειάζεται για να ξεχωρίσετε.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map(i => (
              <div key={i.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/80">
                <img src={i.img} alt={i.alt} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#111315] mb-2">{i.title}</h3>
                  <p className="text-[#5B6472] text-sm">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CTA ── */}
      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
            Ξεκάθαρες τιμές, χωρίς εκπλήξεις
          </h2>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
            Επιλέξτε το πακέτο που ταιριάζει στις ανάγκες και τον προϋπολογισμό σας. Όλες οι τιμές μας είναι εφάπαξ, χωρίς κρυφές χρεώσεις ή μηνιαίες συνδρομές. Αυτό που βλέπετε είναι αυτό που πληρώνετε.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/pricing/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Δείτε τα Πακέτα & τις Τιμές
              </button>
            </Link>
            <a href="https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%95%CE%BD%CE%B4%CE%B9%CE%B1%CF%86%CE%AD%CF%81%CE%BF%CE%BC%CE%B1%CE%B9%20%CE%B3%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1%20%CE%B3%CE%B9%CE%B1%20%CF%84%CE%B7%CE%BD%20%CE%B5%CF%80%CE%B9%CF%87%CE%B5%CE%AF%CF%81%CE%B7%CF%83ή%20%CE%BC%CE%BF%CF%85%20%CF%83%CF%84%CE%B7ν%20%CE%9A%CF%81ή%CF%84%CE%B7." target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3.5 rounded-xl border border-[#5B8CFF] text-[#5B8CFF] font-semibold text-base hover:bg-[#EEF3FF] transition-colors bg-white">
                Στείλτε μας στο WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
              Συχνές Ερωτήσεις
            </h2>
            <p className="text-lg text-[#5B6472] leading-relaxed">
              Έχετε ερωτήσεις; Έχουμε τις απαντήσεις. Εδώ είναι μερικές από τις πιο συχνές ερωτήσεις που λαμβάνουμε από επιχειρήσεις στην Κρήτη.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[#F6F6F4] p-4 rounded-xl cursor-pointer group">
                <summary className="flex justify-between items-center font-semibold text-lg text-[#111315] group-open:mb-2">
                  {faq.q}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-[#5B6472] text-base leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto text-center bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-200/80">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111315] mb-4 leading-tight">
            Έτοιμοι να ξεκινήσετε την ιστοσελίδα σας στην Κρήτη;
          </h2>
          <p className="text-lg text-[#5B6472] max-w-2xl mx-auto mb-6 leading-relaxed">
            Ας συνεργαστούμε για να δημιουργήσουμε μια επαγγελματική, γρήγορη και αποτελεσματική ιστοσελίδα για την επιχείρησή σας. Επικοινωνήστε μαζί μας σήμερα για μια δωρεάν, χωρίς καμία υποχρέωση, συμβουλευτική. Θα συζητήσουμε τις ανάγκες σας και θα σας δώσουμε μια σαφή προσφορά.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/el/contact/">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CFF] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                Ζητήστε Δωρεάν Προσφορά
              </button>
            </Link>
            <Link href="/el/templates/">
              <button className="px-8 py-3.5 rounded-xl border border-gray-300 text-[#111315] font-semibold text-base hover:bg-gray-50 transition-colors bg-white">
                Δείτε τη Δουλειά μας
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
