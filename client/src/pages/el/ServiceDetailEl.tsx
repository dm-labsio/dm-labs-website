import { useStructuredData } from "@/hooks/useStructuredData";
import { serviceSchemaData } from "@/lib/structuredData";
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
  closing: string;
}> = {
  "maps": {
    id: "maps",
    icon: MapPin,
    accentColor: "#5B8CFF",
    title: "Google Maps και τοποθεσία",
    subtitle: "Ένας χάρτης και ξεκάθαρα στοιχεία τοποθεσίας σε κάθε σημαντική σελίδα, για να σας βρίσκουν οι πελάτες χωρίς να ψάχνουν.",
    intro: "Αν οι πελάτες έρχονται να σας βρουν από κοντά, ο χάρτης στην ιστοσελίδα δεν είναι πολυτέλεια, είναι ανάγκη. Βάζουμε διαδραστικό χάρτη, οδηγίες για να φτάσουν και όλα τα στοιχεία της τοποθεσίας σας, ώστε να φτάνουν σε εσάς με ένα πάτημα.",
    why: [
      { heading: "Πλοήγηση με ένα πάτημα", body: "Αν ο πελάτης πρέπει να αντιγράψει τη διεύθυνσή σας σε άλλη εφαρμογή για να έρθει, μάλλον θα τα παρατήσει στη μέση. Με τον χάρτη μέσα στη σελίδα, η πλοήγηση ξεκινά με ένα πάτημα, κάτι πολύ σημαντικό για όποιον σας ψάχνει από το κινητό, στον δρόμο." },
      { heading: "Καλύτερη παρουσία στις τοπικές αναζητήσεις", body: "Ένας σωστά ενσωματωμένος χάρτης, μαζί με το Google Business Profile, ενισχύει την παρουσία σας όταν κάποιος ψάχνει κάτι κοντά του. Το αν και πού θα εμφανιστείτε το αποφασίζει το Google, οπότε δεν εγγυόμαστε συγκεκριμένη θέση στον χάρτη ή στα αποτελέσματα." },
      { heading: "Εμπιστοσύνη από την πρώτη ματιά", body: "Μια ιστοσελίδα με ξεκάθαρη διεύθυνση και χάρτη δείχνει ότι η επιχείρησή σας υπάρχει, είναι σταθερή και τη βρίσκει κανείς εύκολα. Έτσι ο πελάτης σας εμπιστεύεται πριν καν σας επισκεφτεί." },
    ],
    whatWeDeliver: [
      "Διαδραστικός χάρτης Google Maps μέσα στη σελίδα",
      "Κουμπί για οδηγίες, με απευθείας σύνδεσμο στο Google Maps",
      "Διεύθυνση, ωράριο και τηλέφωνο σε εμφανές σημείο",
      "Σύνδεση με το Google Business Profile",
      "Δομημένα δεδομένα LocalBusiness για το SEO",
      "Φτιαγμένο για κινητά: πλοήγηση με ένα πάτημα",
    ],
    howItWorks: [
      { step: "01", title: "Στοιχεία τοποθεσίας", desc: "Επιβεβαιώνουμε μαζί σας τη διεύθυνση, το ωράριο και τα στοιχεία επικοινωνίας, για να εμφανίζονται σωστά." },
      { step: "02", title: "Τοποθέτηση χάρτη", desc: "Βάζουμε διαδραστικό χάρτη Google Maps στη σελίδα επικοινωνίας ή στο κάτω μέρος της ιστοσελίδας." },
      { step: "03", title: "Δομημένα δεδομένα", desc: "Προσθέτουμε δομημένα δεδομένα LocalBusiness, ώστε το Google να καταλαβαίνει και να δείχνει σωστά τα στοιχεία της τοποθεσίας σας." },
      { step: "04", title: "Έλεγχος στο κινητό", desc: "Ελέγχουμε ότι ο χάρτης φορτώνει γρήγορα και ότι η πλοήγηση δουλεύει άψογα σε iOS και Android." },
    ],
    faqs: [
      { q: "Χρειάζομαι λογαριασμό Google Business;", a: "Το συνιστούμε ανεπιφύλακτα. Είναι δωρεάν και ενισχύει σημαντικά την προβολή σας στις τοπικές αναζητήσεις του Google. Μπορούμε να σας καθοδηγήσουμε στη ρύθμισή του." },
      { q: "Λειτουργεί ο χάρτης στο κινητό;", a: "Ναι. Οι επισκέπτες μπορούν να ανοίξουν οδηγίες στο Google Maps. Το αν θα ανοίξει η εφαρμογή ή ο browser εξαρτάται από τη συσκευή και τις ρυθμίσεις τους." },
      { q: "Μπορώ να δείξω πολλές τοποθεσίες;", a: "Ναι. Αν έχετε υποκαταστήματα ή περισσότερα από ένα σημεία, μπορούμε να τα δείξουμε όλα σε έναν χάρτη." },
    ],
    relatedServices: ["seo", "custom-design", "forms"],
    closing: "Ας φτιάξουμε μια ιστοσελίδα που φέρνει τους πελάτες ως την πόρτα σας.",
  },
  "forms": {
    id: "forms",
    icon: FileText,
    accentColor: "#6FE3FF",
    title: "Φόρμες επικοινωνίας",
    subtitle: "Φόρμες που κάνουν τον επισκέπτη να σας στείλει μήνυμα, και το μήνυμα έρχεται κατευθείαν στο email σας.",
    intro: "Μια καλή φόρμα επικοινωνίας είναι από τα πιο σημαντικά κομμάτια της ιστοσελίδας σας, γιατί από εκεί έρχονται τα μηνύματα. Φτιάχνουμε φόρμες που συμπληρώνονται εύκολα, είναι ασφαλείς και στέλνουν κάθε αίτημα κατευθείαν στο email σας, με ξεκάθαρο μήνυμα όταν η αποστολή πετύχει ή όταν κάτι δεν πάει καλά.",
    why: [
      { heading: "Περισσότερα μηνύματα από όσους ενδιαφέρονται", body: "Η φόρμα είναι η γέφυρα ανάμεσα σε κάποιον που ενδιαφέρεται και σε έναν νέο πελάτη. Την κρατάμε απλή και ξεκάθαρη, χωρίς περιττά πεδία που κουράζουν και διώχνουν τον κόσμο." },
      { heading: "Τα αιτήματα έρχονται στο email σας", body: "Κάθε αίτημα που περνάει τον έλεγχο φτάνει στο email που έχετε επιλέξει. Η παράδοση εξαρτάται από τον πάροχο της φόρμας και την υπηρεσία email σας, γι’ αυτό ελέγχουμε τη ρύθμιση και βάζουμε και έναν εναλλακτικό τρόπο επικοινωνίας." },
      { heading: "Δείχνει επαγγελματισμό", body: "Μια φόρμα στην ιστοσελίδα σας δείχνει ότι είστε οργανωμένοι. Και σε αντίθεση με έναν απλό σύνδεσμο email, μαζεύει από την αρχή τις πληροφορίες που χρειάζεστε." },
    ],
    whatWeDeliver: [
      "Φόρμα επικοινωνίας με τα πεδία που χρειάζεστε",
      "Ειδοποιήσεις στο email μέσω του παρόχου φόρμας που συμφωνήσαμε",
      "Μήνυμα επιβεβαίωσης για τον επισκέπτη μετά την αποστολή",
      "Προστασία από spam, όσο την υποστηρίζει ο πάροχος που συμφωνήσαμε",
      "Φόρμες που συμπληρώνονται άνετα στο κινητό",
      "Προαιρετικά: φόρμα κράτησης ή ραντεβού",
    ],
    howItWorks: [
      { step: "01", title: "Σχεδιασμός φόρμας", desc: "Συμφωνούμε μαζί ποια πεδία χρειάζεστε: όνομα, email, τηλέφωνο, μήνυμα ή οτιδήποτε άλλο." },
      { step: "02", title: "Ενσωμάτωση", desc: "Βάζουμε τη φόρμα στην ιστοσελίδα σας, με σωστό έλεγχο στοιχείων και ξεκάθαρα μηνύματα λάθους." },
      { step: "03", title: "Ρύθμιση email", desc: "Συνδέουμε τον πάροχο φόρμας που επιλέξατε και ελέγχουμε ότι τα μηνύματα φτάνουν στο email που συμφωνήσαμε." },
      { step: "04", title: "Δοκιμές", desc: "Δοκιμάζουμε τη φόρμα από την αρχή ως το τέλος πριν τη δημοσίευση, και στο κινητό." },
    ],
    faqs: [
      { q: "Σε ποιο email έρχονται τα αιτήματα;", a: "Σε όποιο email μας δώσετε. Μπορείτε να ορίσετε και περισσότερους παραλήπτες, αν θέλετε τα αιτήματα να πηγαίνουν σε διαφορετικούς ανθρώπους." },
      { q: "Μπορώ να έχω διαφορετικές φόρμες για διαφορετικές υπηρεσίες;", a: "Ναι. Μπορούμε να φτιάξουμε ξεχωριστές φόρμες για διαφορετικές σελίδες ή υπηρεσίες, η καθεμία με τα δικά της πεδία και τους δικούς της παραλήπτες." },
      { q: "Τι γίνεται με το spam;", a: "Ρυθμίζουμε την προστασία από spam που υποστηρίζει ο πάροχος που συμφωνήσαμε. Μειώνει τα ανεπιθύμητα μηνύματα, αλλά δεν μπορεί να σταματήσει κάθε spam." },
    ],
    relatedServices: ["custom-design", "mobile-first", "maps"],
    closing: "Ας φτιάξουμε μια ιστοσελίδα που δεν φέρνει μόνο επισκέψεις, αλλά και μηνύματα.",
  },
  "social": {
    id: "social",
    icon: Share2,
    accentColor: "#8B5CFF",
    title: "Σύνδεση με social media και WhatsApp",
    subtitle: "Συνδέστε την ιστοσελίδα με τα social media σας, για να σας ακολουθούν περισσότεροι και να σας στέλνουν μήνυμα πιο εύκολα.",
    intro: "Οι πελάτες σας είναι ήδη στα social media. Η ιστοσελίδα σας πρέπει να τους στέλνει εκεί, και τα social media να τους φέρνουν πίσω στην ιστοσελίδα. Συνδέουμε την ιστοσελίδα με τα προφίλ σας, και αν το συμφωνήσουμε στο έργο, προσθέτουμε live feed ή άλλες ενσωματώσεις.",
    why: [
      { heading: "Περισσότεροι σας βλέπουν", body: "Κάθε επισκέπτης της ιστοσελίδας μπορεί να γίνει και follower. Με εικονίδια που φαίνονται και ξεκάθαρα κουμπιά, μια επίσκεψη της μίας φοράς γίνεται μια σχέση που κρατάει." },
      { heading: "Ο κόσμος βλέπει ότι είστε ενεργοί", body: "Όταν φαίνονται οι followers σας ή οι τελευταίες αναρτήσεις σας στο Instagram, ο επισκέπτης καταλαβαίνει ότι η επιχείρησή σας είναι ενεργή και αξιόπιστη. Το να βλέπει κανείς ότι κι άλλοι σας ακολουθούν είναι από τα πιο δυνατά χαρτιά για να σας εμπιστευτεί online." },
      { heading: "Ίδια εικόνα παντού", body: "Όταν η ιστοσελίδα και τα social media σας είναι συνδεδεμένα, το brand σας δείχνει ίδιο παντού. Οι πελάτες μπορούν να σας βρουν, να σας ακολουθήσουν και να σας μιλήσουν από όπου κι αν βρίσκονται." },
    ],
    whatWeDeliver: [
      "Εικονίδια social media στην κορυφή, στο κάτω μέρος της ιστοσελίδας και στη σελίδα επικοινωνίας",
      "Σύνδεσμοι σε Instagram, Facebook, TikTok, LinkedIn και YouTube",
      "Προαιρετικά: live feed του Instagram μέσα στην ιστοσελίδα",
      "Κουμπιά κοινοποίησης για άρθρα και περιεχόμενο",
      "Κουμπί WhatsApp για άμεση κουβέντα με ένα πάτημα",
      "Ίδιο ύφος στην ιστοσελίδα και στα social media",
    ],
    howItWorks: [
      { step: "01", title: "Συλλογή προφίλ", desc: "Μας στέλνετε τους συνδέσμους από όλα τα προφίλ που θέλετε να φαίνονται." },
      { step: "02", title: "Τοποθέτηση", desc: "Βάζουμε εικονίδια και συνδέσμους στα σωστά σημεία: στην κορυφή, στο κάτω μέρος και στη σελίδα επικοινωνίας." },
      { step: "03", title: "WhatsApp και άμεση επικοινωνία", desc: "Ρυθμίζουμε κουμπί WhatsApp, για να σας στέλνουν μήνυμα οι πελάτες με ένα πάτημα." },
      { step: "04", title: "Έλεγχος συνδέσμων", desc: "Πριν τη δημοσίευση ελέγχουμε ότι όλοι οι σύνδεσμοι ανοίγουν σωστά σε υπολογιστή και κινητό." },
    ],
    faqs: [
      { q: "Ποια social media υποστηρίζετε;", a: "Instagram, Facebook, TikTok, LinkedIn, YouTube, X (Twitter), Pinterest και WhatsApp. Αν χρησιμοποιείτε κάποια άλλη πλατφόρμα, πείτε μας." },
      { q: "Μπορώ να έχω live feed από το Instagram;", a: "Ναι. Μπορούμε να βάλουμε μέσα στην ιστοσελίδα live feed που δείχνει τις τελευταίες αναρτήσεις σας. Χρειάζεται να συνδεθεί ο λογαριασμός σας." },
      { q: "Τι γίνεται αν αλλάξω username;", a: "Απλώς πείτε μας και θα αλλάξουμε τους συνδέσμους. Αν έχετε πακέτο συντήρησης, αυτό γίνεται χωρίς επιπλέον χρέωση." },
    ],
    relatedServices: ["custom-design", "forms", "turnaround"],
    closing: "Ας δέσουμε την ιστοσελίδα με τα social media σας από την πρώτη μέρα.",
  },
};

const SERVICE_LABELS: Record<string, string> = {
  "custom-design": "Ιστοσελίδα στα μέτρα σας",
  "mobile-first": "Άψογη προσαρμογή σε κινητά",
  "seo": "Εμφάνιση στο Google (SEO)",
  "performance": "Ταχύτητα φόρτωσης",
  "security": "Ασφάλεια και φροντίδα",
  "turnaround": "Γρήγορη παράδοση",
  "maps": "Google Maps και τοποθεσία",
  "forms": "Φόρμες επικοινωνίας",
  "social": "Social media και WhatsApp",
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
    description: service ? ({ maps: "Χάρτες Google Maps, οδηγίες και ακριβή στοιχεία τοποθεσίας για την ιστοσελίδα σας. Εύκολη πρόσβαση για πελάτες σε κινητό και υπολογιστή.", forms: "Φόρμες επικοινωνίας φιλικές προς κινητά, με τα πεδία που χρειάζεστε, έλεγχο στοιχείων και σαφή ενημέρωση μετά την υποβολή.", social: "Συνδέστε την ιστοσελίδα σας με τα social media και το WhatsApp. Σαφείς διαδρομές επικοινωνίας, με ενσωματώσεις που ταιριάζουν στο έργο σας." }[service.id] ?? service.subtitle): "Επαγγελματικές υπηρεσίες web design. Εξατομικευμένες ιστοσελίδες γρήγορα και σωστά.",
  });

  useStructuredData("service-jsonld-schema", service ? serviceSchemaData(`https://dm-labs.io/el/services/${serviceId}/`, "el", service.title, service.intro, service.faqs) : null);

  if (!service) {
    return (
      <div className="container section-spacing text-center">
        <h1 className="text-3xl font-bold text-[#111315] mb-4">Η υπηρεσία δεν βρέθηκε</h1>
        <p className="text-[#5B6472] mb-8">Η υπηρεσία που ψάχνετε δεν υπάρχει.</p>
        <StarButton asChild><Link href="/el/services/" className="btn-primary">
          Δείτε όλες τις υπηρεσίες

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

              Πίσω στις υπηρεσίες
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
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Τι κερδίζετε</p>
            <h2 className="text-3xl font-bold text-[#111315]">Γιατί αξίζει να γίνει σωστά</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.why.map((item, i) => (
              <StaggerItem key={i}>
                <div className="dm-card h-full">
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
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Τι περιλαμβάνει</p>
              <h2 className="text-3xl font-bold text-[#111315] mb-6">Τι μπορούμε να κάνουμε για εσάς</h2>
              <p className="text-base text-[#5B6472] leading-relaxed mb-8">
                Όλα αυτά τα συμφωνούμε στο πακέτο σας και στο γραπτό εύρος του έργου. Επιπλέον ενσωματώσεις και χρεώσεις τρίτων κοστολογούνται ξεχωριστά.
              </p>
              <StarButton asChild><Link href="/el/contact/" className="btn-primary">
                Ας ξεκινήσουμε

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
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Πώς δουλεύουμε</p>
            <h2 className="text-3xl font-bold text-[#111315] mb-4">Τι κάνουμε, βήμα βήμα</h2>
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
            <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Ερωτήσεις</p>
            <h2 className="text-3xl font-bold text-[#111315]">Όσα μας ρωτάτε συχνά</h2>
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
              <p className="text-sm font-medium text-[#8B7355] mb-3 tracking-wide uppercase">Δείτε επίσης</p>
              <h2 className="text-3xl font-bold text-[#111315]">Σχετικές υπηρεσίες</h2>
            </AnimateIn>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {relatedServices.map((rel) => (
                <StaggerItem key={rel.id}>
                  <Link href={`/el/services/${rel.id}/`}>
                    <div className="dm-card text-center cursor-pointer hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-300">
                      <p className="text-sm font-semibold text-[#111315] mb-1">{rel.label}</p>
                      <span className="text-xs text-[#5B8CFF] inline-flex items-center gap-1 justify-center">
                        Δείτε την υπηρεσία
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
            <p className="text-sm font-medium text-[#6FE3FF] mb-4 tracking-wide uppercase">Έτοιμοι να ξεκινήσουμε;</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">
              {service.closing}
            </h2>
            <p className="text-base text-[#94A3B8] mb-10 max-w-lg mx-auto">
              Χωρίς δέσμευση και χωρίς πίεση. Επικοινωνήστε μαζί μας, να συζητήσουμε το έργο σας και να δούμε μαζί το επόμενο βήμα.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <StarButton asChild><Link href="/el/contact/" className="btn-primary !h-14 !text-base !px-8">
                <MessageCircle size={20} />
                Επικοινωνήστε μαζί μας
              </Link></StarButton>
              <Link href="/el/pricing/" className="inline-flex items-center gap-2 px-8 h-14 rounded-xl border-2 border-white/20 text-white font-semibold hover:border-white/40 transition-all duration-300 text-base">
                Δείτε τις τιμές

              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
