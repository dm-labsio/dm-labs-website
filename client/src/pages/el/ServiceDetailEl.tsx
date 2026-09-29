import PackageOverview from "@/components/pricing/PackageOverview";
import ServiceFeaturePage from "@/components/services/ServiceFeaturePage";
import { isRefreshedService } from "@/components/services/serviceFeatureContent";
/* ============================================================
   D&M LABS - Service Detail Page (Greek)
   Route: /el/services/:serviceId
   ============================================================ */
import StarButton from "@/components/ui/star-button";
import { Link, useParams } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { Globe, Smartphone, Search, Zap, Shield, Clock, CheckCircle2, MessageCircle, MapPin, FileText, Share2 } from "lucide-react";

const GRADIENT_BG = "/media/cloudfront/gradient-mesh-bg-nrkTNmAHHWeVJB3ubHRGDu.webp";
const TRIANGLE_GEO = "/media/cloudfront/triangle-geometry-Rf9Cpg8ynqtbpdNzPsSccU.webp";
const DARK_CTA_BG = "/media/cloudfront/dark-cta-bg-LgZ8epcpi9XDGLof5Q9KgS.webp";

const SERVICES: Record<string, {
  id: string;
  icon: React.ElementType;
  accentColor: string;
  title: string;
  subtitle: string;
  intro: string;
  why: { heading: string; body: string }[];
  whatWeDeliver: string[];
  howItWorks: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
}> = {
  "maps": {
    id: "maps",
    icon: MapPin,
    accentColor: "#5B8CFF",
    title: "Google Maps & Τοποθεσία",
    subtitle: "Βοηθήστε τους πελάτες να σας βρουν εύκολα, ενσωματωμένοι χάρτες και τοπικές πληροφορίες σε κάθε ιστοσελίδα.",
    intro: "Για επιχειρήσεις με φυσική παρουσία, η ενσωμάτωση Google Maps δεν είναι απλώς χρήσιμη, είναι απαραίτητη. Ενσωματώνουμε διαδραστικούς χάρτες, οδηγίες πλοήγησης και πληροφορίες τοποθεσίας σε κάθε ιστοσελίδα, ώστε οι πελάτες να βρίσκουν εύκολα την επιχείρησή σας και να σας επισκέπτονται.",
    why: [
      { heading: "Μειώστε τα εμπόδια εύρεσης", body: "Αν ένας πελάτης πρέπει να αντιγράψει τη διεύθυνσή σας σε άλλη εφαρμογή για να σας βρει, έχετε ήδη χάσει τη μάχη. Ένας ενσωματωμένος χάρτης επιτρέπει άμεση πλοήγηση με ένα κλικ, ιδιαίτερα σημαντικό για χρήστες κινητών που βρίσκονται εν κινήσει." },
      { heading: "Ενισχύστε το τοπικό σας SEO", body: "Η σωστή ενσωμάτωση Google Maps, σε συνδυασμό με το Google Business Profile, ενισχύει τη διαδικτυακή σας παρουσία στις τοπικές αναζητήσεις. Εμφανίζεστε στο 'Local Pack' της Google, τα τρία επιχειρήσεις που εμφανίζονται πρώτα στα τοπικά αποτελέσματα αναζήτησης." },
      { heading: "Εμπιστοσύνη και επαγγελματισμός", body: "Μια ιστοσελίδα με σαφείς πληροφορίες τοποθεσίας και ενσωματωμένο χάρτη δείχνει ότι η επιχείρησή σας είναι πραγματική, εδραιωμένη και εύκολα προσβάσιμη. Αυτό χτίζει εμπιστοσύνη πριν ο πελάτης σας επισκεφτεί." },
    ],
    whatWeDeliver: [
      "Ενσωματωμένος διαδραστικός χάρτης Google Maps",
      "Κουμπί 'Πάρε Οδηγίες' με άμεση σύνδεση στο Google Maps",
      "Εμφάνιση διεύθυνσης, ωραρίου και αριθμού τηλεφώνου",
      "Σύνδεση με Google Business Profile",
      "Schema markup τοπικής επιχείρησης για SEO",
      "Βελτιστοποιημένο για mobile, πλοήγηση με ένα κλικ",
    ],
    howItWorks: [
      { step: "01", title: "Ρύθμιση Τοποθεσίας", desc: "Επιβεβαιώνουμε τη διεύθυνσή σας, τα ωράρια λειτουργίας και τα στοιχεία επικοινωνίας για ακριβή εμφάνιση." },
      { step: "02", title: "Ενσωμάτωση Χάρτη", desc: "Ενσωματώνουμε έναν διαδραστικό χάρτη Google Maps στη σελίδα επικοινωνίας ή στο footer σας." },
      { step: "03", title: "Schema Markup", desc: "Προσθέτουμε δομημένα δεδομένα LocalBusiness ώστε η Google να κατανοεί και να εμφανίζει σωστά τις πληροφορίες τοποθεσίας σας." },
      { step: "04", title: "Δοκιμή σε Mobile", desc: "Επαληθεύουμε ότι ο χάρτης φορτώνει γρήγορα και η πλοήγηση λειτουργεί άψογα σε iOS και Android." },
    ],
    faqs: [
      { q: "Χρειάζομαι λογαριασμό Google Business;", a: "Συνιστούμε ανεπιφύλακτα να έχετε ένα, είναι δωρεάν και ενισχύει σημαντικά την τοπική σας ορατότητα στη Google. Μπορούμε να σας καθοδηγήσουμε στη ρύθμισή του." },
      { q: "Λειτουργεί ο χάρτης σε κινητά;", a: "Ναι. Ο ενσωματωμένος χάρτης ανοίγει αυτόματα την εφαρμογή Google Maps στο κινητό για άμεση πλοήγηση." },
      { q: "Μπορώ να εμφανίσω πολλές τοποθεσίες;", a: "Ναι. Αν έχετε πολλά υποκαταστήματα ή σημεία παρουσίας, μπορούμε να εμφανίσουμε όλες τις τοποθεσίες σε έναν ενιαίο χάρτη." },
    ],
    relatedServices: ["seo", "custom-design", "forms"],
  },
  "forms": {
    id: "forms",
    icon: FileText,
    accentColor: "#6FE3FF",
    title: "Φόρμες Επικοινωνίας",
    subtitle: "Επαγγελματικές φόρμες που μετατρέπουν επισκέπτες σε πελάτες, και στέλνουν αιτήματα απευθείας στο email σας.",
    intro: "Μια καλά σχεδιασμένη φόρμα επικοινωνίας είναι ένα από τα πιο σημαντικά εργαλεία μετατροπής στην ιστοσελίδα σας. Σχεδιάζουμε φόρμες που είναι εύκολες στη συμπλήρωση, ασφαλείς και στέλνουν αιτήματα απευθείας στο email σας, ώστε να μην χάνετε ποτέ ένα πιθανό πελάτη.",
    why: [
      { heading: "Μετατρέψτε επισκέπτες σε leads", body: "Μια φόρμα επικοινωνίας είναι η γέφυρα μεταξύ ενός ενδιαφερόμενου επισκέπτη και ενός νέου πελάτη. Σχεδιάζουμε φόρμες που είναι απλές, ξεκάθαρες και ενθαρρύνουν τη συμπλήρωση, χωρίς περιττά πεδία που αποθαρρύνουν τους χρήστες." },
      { heading: "Λαμβάνετε αιτήματα άμεσα", body: "Κάθε φόρμα που συμπληρώνεται στέλνει αυτόματα email στο inbox σας με όλες τις πληροφορίες του πελάτη. Δεν χρειάζεται να ελέγχετε κάποιο dashboard, τα αιτήματα έρχονται κατευθείαν σε εσάς." },
      { heading: "Επαγγελματική εικόνα", body: "Μια φόρμα επικοινωνίας στην ιστοσελίδα σας δείχνει ότι είστε οργανωμένοι και επαγγελματίες. Σε αντίθεση με ένα απλό email link, μια φόρμα συλλέγει τις σωστές πληροφορίες από την αρχή." },
    ],
    whatWeDeliver: [
      "Προσαρμοσμένη φόρμα επικοινωνίας με τα πεδία που χρειάζεστε",
      "Αποστολή email σε πραγματικό χρόνο στο inbox σας",
      "Επιβεβαίωση επιτυχούς υποβολής για τον χρήστη",
      "Προστασία spam (honeypot και rate limiting)",
      "Φόρμες φιλικές προς mobile",
      "Προαιρετικά: φόρμα κράτησης ή ραντεβού",
    ],
    howItWorks: [
      { step: "01", title: "Σχεδιασμός Φόρμας", desc: "Καθορίζουμε μαζί ποια πεδία χρειάζεστε, όνομα, email, τηλέφωνο, μήνυμα, ή οτιδήποτε άλλο." },
      { step: "02", title: "Ενσωμάτωση", desc: "Χτίζουμε τη φόρμα στην ιστοσελίδα σας με σωστή επικύρωση και μηνύματα σφάλματος." },
      { step: "03", title: "Ρύθμιση Email", desc: "Συνδέουμε τη φόρμα με το email σας ώστε κάθε υποβολή να φτάνει άμεσα στο inbox σας." },
      { step: "04", title: "Δοκιμή", desc: "Δοκιμάζουμε τη φόρμα πλήρως πριν το λανσάρισμα, συμπεριλαμβανομένων δοκιμών σε mobile." },
    ],
    faqs: [
      { q: "Σε ποιο email στέλνονται τα αιτήματα;", a: "Στο email που μας δώσετε. Μπορείτε επίσης να ορίσετε πολλαπλούς παραλήπτες αν θέλετε τα αιτήματα να πηγαίνουν σε διαφορετικά άτομα." },
      { q: "Μπορώ να έχω διαφορετικές φόρμες για διαφορετικές υπηρεσίες;", a: "Ναι. Μπορούμε να δημιουργήσουμε ξεχωριστές φόρμες για διαφορετικές σελίδες ή υπηρεσίες, η καθεμία με διαφορετικά πεδία και παραλήπτες." },
      { q: "Τι γίνεται με το spam;", a: "Χρησιμοποιούμε τεχνικές anti-spam (honeypot fields, rate limiting) για να ελαχιστοποιήσουμε τα ανεπιθύμητα μηνύματα χωρίς να επηρεάζεται η εμπειρία χρήστη." },
    ],
    relatedServices: ["custom-design", "mobile-first", "maps"],
  },
  "social": {
    id: "social",
    icon: Share2,
    accentColor: "#8B5CFF",
    title: "Ενσωμάτωση Social Media",
    subtitle: "Συνδέστε την ιστοσελίδα σας με τα social media σας, και μετατρέψτε επισκέπτες σε followers και πελάτες.",
    intro: "Τα social media είναι εκεί που βρίσκονται οι πελάτες σας. Η ιστοσελίδα σας πρέπει να τους οδηγεί εκεί, και το αντίστροφο. Ενσωματώνουμε τα social media σας σε κάθε ιστοσελίδα, από εικονίδια στο footer έως live feeds Instagram και κουμπιά κοινοποίησης, δημιουργώντας μια συνεκτική ψηφιακή παρουσία.",
    why: [
      { heading: "Ενισχύστε την ορατότητά σας", body: "Κάθε επισκέπτης της ιστοσελίδας σας είναι ένας πιθανός follower. Με σαφή, ορατά εικονίδια social media και CTAs, μετατρέπετε τη μονόδρομη επίσκεψη σε μακροχρόνια σχέση με το κοινό σας." },
      { heading: "Κοινωνική απόδειξη", body: "Η εμφάνιση του αριθμού followers σας ή live posts από Instagram δείχνει ότι η επιχείρησή σας είναι ενεργή και αξιόπιστη. Η κοινωνική απόδειξη είναι ένας από τους ισχυρότερους παράγοντες εμπιστοσύνης στο διαδίκτυο." },
      { heading: "Συνεκτική ψηφιακή παρουσία", body: "Όταν η ιστοσελίδα και τα social media σας είναι συνδεδεμένα, δημιουργείτε ένα ενιαίο brand ecosystem. Οι πελάτες μπορούν να σας βρουν, να σας ακολουθήσουν και να επικοινωνήσουν μαζί σας από οπουδήποτε." },
    ],
    whatWeDeliver: [
      "Εικονίδια social media στο header, footer και σελίδα επικοινωνίας",
      "Σύνδεσμοι σε Instagram, Facebook, TikTok, LinkedIn, YouTube",
      "Προαιρετικά: live Instagram feed ενσωματωμένο στην ιστοσελίδα",
      "Κουμπιά κοινοποίησης για blog posts και περιεχόμενο",
      "WhatsApp click-to-chat κουμπί για άμεση επικοινωνία",
      "Συνεπής branding μεταξύ ιστοσελίδας και social media",
    ],
    howItWorks: [
      { step: "01", title: "Καταγραφή Προφίλ", desc: "Μας δίνετε τους συνδέσμους σε όλα τα social media προφίλ σας που θέλετε να εμφανίζονται." },
      { step: "02", title: "Ενσωμάτωση", desc: "Τοποθετούμε εικονίδια και συνδέσμους στα κατάλληλα σημεία της ιστοσελίδας, header, footer, σελίδα επικοινωνίας." },
      { step: "03", title: "WhatsApp & Άμεση Επικοινωνία", desc: "Ρυθμίζουμε κουμπί WhatsApp click-to-chat ώστε οι πελάτες να επικοινωνούν μαζί σας με ένα κλικ." },
      { step: "04", title: "Δοκιμή Συνδέσμων", desc: "Επαληθεύουμε ότι όλοι οι σύνδεσμοι ανοίγουν σωστά σε desktop και mobile πριν το λανσάρισμα." },
    ],
    faqs: [
      { q: "Ποια social media υποστηρίζετε;", a: "Instagram, Facebook, TikTok, LinkedIn, YouTube, X (Twitter), Pinterest και WhatsApp. Αν χρησιμοποιείτε άλλη πλατφόρμα, ενημερώστε μας." },
      { q: "Μπορώ να έχω live Instagram feed;", a: "Ναι. Μπορούμε να ενσωματώσουμε live feed Instagram που εμφανίζει τις τελευταίες αναρτήσεις σας απευθείας στην ιστοσελίδα. Απαιτεί σύνδεση με τον λογαριασμό σας." },
      { q: "Τι γίνεται αν αλλάξω username;", a: "Απλά ενημερώστε μας και θα ενημερώσουμε τους συνδέσμους. Αν έχετε πλάνο συντήρησης, αυτό καλύπτεται χωρίς επιπλέον χρέωση." },
    ],
    relatedServices: ["custom-design", "forms", "turnaround"],
  },
};

const SERVICE_LABELS: Record<string, string> = {
  "custom-design": "Εξατομικευμένος Σχεδιασμός",
  "mobile-first": "Mobile-First Ανάπτυξη",
  "seo": "Βελτιστοποίηση SEO",
  "performance": "Γρήγορη Απόδοση",
  "security": "Ασφάλεια & Αξιοπιστία",
  "turnaround": "Γρήγορη Παράδοση",
  "maps": "Google Maps & Τοποθεσία",
  "forms": "Φόρμες Επικοινωνίας",
  "social": "Ενσωμάτωση Social Media",
};

export default function ServiceDetailElPage() {
  const { serviceId = "" } = useParams<{ serviceId: string }>();
  return isRefreshedService(serviceId)
    ? <ServiceFeaturePage key={serviceId} locale="el" serviceId={serviceId} />
    : <LegacyServiceDetailPage />;
}

function LegacyServiceDetailPage() {
  const params = useParams<{ serviceId: string }>();
  const serviceId = params.serviceId || "";
  const service = SERVICES[serviceId];
  useSEO({
    title: service ? `${service.title} | DM-Labs.io` : "Υπηρεσία | DM-Labs.io",
    description: service ? service.intro: "Επαγγελματικές υπηρεσίες web design. Εξατομικευμένες ιστοσελίδες γρήγορα και σωστά.",
  });

  if (!service) {
    return (
      <div className="container section-spacing text-center">
        <h1 className="text-3xl font-bold text-[#111315] mb-4">Η υπηρεσία δεν βρέθηκε</h1>
        <p className="text-[#5B6472] mb-8">Η υπηρεσία που αναζητάτε δεν υπάρχει.</p>
        <StarButton asChild><Link href="/el/services/" className="btn-primary">
          Δείτε Όλες τις Υπηρεσίες

        </Link></StarButton>
      </div>
    );
  }

  const Icon = service.icon;
  const relatedServices = service.relatedServices
    .map((id) => ({ id, label: SERVICE_LABELS[id] }))
    .filter(Boolean);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vh, 7rem)", paddingBottom: "clamp(3rem, 6vh, 5rem)" }}>
        <div className="absolute inset-0 z-0">
          <img src={GRADIENT_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" aria-hidden="true" />
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.05] pointer-events-none z-0">
          <img src={TRIANGLE_GEO} alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[100px] opacity-[0.07] pointer-events-none z-0" style={{ backgroundColor: service.accentColor }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <AnimateIn variant="fade-up" delay={0.05}>
            <Link href="/el/services/" className="inline-flex items-center gap-1.5 text-sm text-[#5B6472] hover:text-[#5B8CFF] transition-colors mb-8">

              Πίσω στις Υπηρεσίες
            </Link>
          </AnimateIn>

          <div className="max-w-3xl">
            <AnimateIn variant="fade-up" delay={0.1}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: `${service.accentColor}15` }}>
                <Icon size={32} style={{ color: service.accentColor }} strokeWidth={1.75} />
              </div>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-4 leading-tight">
                {service.title}
              </h1>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.3}>
              <p className="text-xl text-[#5B6472] mb-6 leading-relaxed">{service.subtitle}</p>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={0.4}>
              <p className="text-base text-[#5B6472] leading-relaxed max-w-2xl">{service.intro}</p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="mb-12">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Γιατί Έχει Σημασία</p>
            <h2 className="text-3xl font-bold text-[#111315]">Η αιτία για να το κάνετε σωστά</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.why.map((item, i) => (
              <StaggerItem key={i}>
                <div className="dm-card h-full">
                  <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ background: `${service.accentColor}15` }}>
                    <span className="text-sm font-bold" style={{ color: service.accentColor }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111315] mb-3">{item.heading}</h3>
                  <p className="text-sm text-[#5B6472] leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── What We Deliver ── */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Τι Παραδίδουμε</p>
              <h2 className="text-3xl font-bold text-[#111315] mb-6">Όλα συμπεριλαμβάνονται, χωρίς extras</h2>
              <p className="text-base text-[#5B6472] leading-relaxed mb-8">
                Κάθε στοιχείο παρακάτω περιλαμβάνεται στο έργο ιστοσελίδας σας. Χωρίς κρυφές χρεώσεις, χωρίς προαιρετικά πρόσθετα που θα έπρεπε να είναι τυπικά.
              </p>
              <StarButton asChild><Link href="/el/contact/" className="btn-primary">
                Ξεκινήστε το Έργο σας

              </Link></StarButton>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <ul className="space-y-3">
                {service.whatWeDeliver.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: service.accentColor }} />
                    <span className="text-sm text-[#111315] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-spacing bg-white">
        <div className="container">
          <AnimateIn className="text-center mb-12">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Η Διαδικασία</p>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Πώς παραδίδουμε αυτή την υπηρεσία</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.howItWorks.map((item, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5" style={{ background: `${service.accentColor}12` }}>
                    <span className="text-sm font-bold" style={{ color: service.accentColor }}>{item.step}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#111315] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#5B6472] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={GRADIENT_BG} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="container relative z-10 max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-12">
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Συνηθισμένες Ερωτήσεις</p>
            <h2 className="text-3xl font-bold text-[#111315]">Συχνές Ερωτήσεις</h2>
          </AnimateIn>
          <StaggerContainer className="space-y-4">
            {service.faqs.map((faq, i) => (
              <StaggerItem key={i}>
                <div className="dm-card">
                  <h3 className="text-base font-semibold text-[#111315] mb-3">{faq.q}</h3>
                  <p className="text-sm text-[#5B6472] leading-relaxed">{faq.a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Related Services ── */}
      {relatedServices.length > 0 && (
        <section className="section-spacing bg-white">
          <div className="container">
            <AnimateIn className="text-center mb-10">
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Επίσης Περιλαμβάνεται</p>
              <h2 className="text-3xl font-bold text-[#111315]">Σχετικές Υπηρεσίες</h2>
            </AnimateIn>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {relatedServices.map((rel) => (
                <StaggerItem key={rel.id}>
                  <Link href={`/el/services/${rel.id}/`}>
                    <div className="dm-card text-center cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                      <p className="text-sm font-semibold text-[#111315] mb-1">{rel.label}</p>
                      <span className="text-xs text-[#5B8CFF] inline-flex items-center gap-1 justify-center">
                        Μάθετε περισσότερα
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <PackageOverview locale="el" context="service" />
      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "#0F172A" }}>
          <img src={DARK_CTA_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" aria-hidden="true" />
        </div>
        <div className="container relative z-10 section-spacing text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#6FE3FF] mb-4 tracking-wide uppercase">Έτοιμοι να Ξεκινήσετε;</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">
              Ας χτίσουμε την ιστοσελίδα σας με {service.title} ενσωματωμένο από την πρώτη μέρα.
            </h2>
            <p className="text-base text-[#94A3B8] mb-10 max-w-lg mx-auto">
              Χωρίς δέσμευση, χωρίς πίεση. Επικοινωνήστε μαζί μας και θα συζητήσουμε το έργο σας εντός ωρών.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <StarButton asChild><Link href="/el/contact/" className="btn-primary !h-14 !text-base !px-8">
                <MessageCircle size={20} />
                Επικοινωνήστε μαζί μας
              </Link></StarButton>
              <Link href="/el/pricing/" className="inline-flex items-center gap-2 px-8 h-14 rounded-xl border-2 border-white/20 text-white font-semibold hover:border-white/40 transition-all duration-300 text-base">
                Δείτε Τιμές

              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
