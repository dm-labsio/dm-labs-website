import DemoPreviewArtwork from "@/components/DemoPreviewArtwork";
import DemoProjectCard from "@/components/DemoProjectCard";
import { previewIndustry } from "@/lib/previewNavigation";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import CinematicHeroBackground from "@/components/CinematicHeroBackground";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

// ─── CDN URLs - all fresh uploads Expires=1804155913+ ───────────────────────
const CDN = {
  r1: {
    card:           "/media/manus/UOnSAZrlsOnIfDWm.webp",
    homeDesktop:    "/media/manus/SEvpeppetOfwJJNB.webp",
    homeMobile:     "/media/manus/UrnWckquAWyhaYFT.webp",
    menuDesktop:    "/media/manus/NXilbOFPBvEaQoFY.webp",
    menuMobile:     "/media/manus/eRFisuQAOenLYaQC.webp",
    contactDesktop: "/media/manus/PqhWypJjcbMmteom.webp",
    contactMobile:  "/media/manus/KoGromdjtZavrFsa.webp",
  },
  r2: {
    card:           "/media/manus/kmUffrELzBPBtqPl.webp",
    homeDesktop:    "/media/manus/XwykHFJRTqKzfIao.webp",
    homeMobile:     "/media/manus/JxsFjnNbHPncpuMc.webp",
    menuDesktop:    "/media/manus/TwiwcDHHgIBYPeqN.webp",
    menuMobile:     "/media/manus/BUmUKPVIOtNORQZN.webp",
    contactDesktop: "/media/manus/aVNdgLFQXQnPTMsI.webp",
    contactMobile:  "/media/manus/cKshlliQtDXUdcGl.webp",
  },
  r3: {
    card:           "/media/manus/IsbrZZbpHbUmLwwu.webp",
    homeDesktop:    "/media/manus/bdoBTsSWArOeQriA.webp",
    homeMobile:     "/media/manus/TSUSpDNrnIFxCiKW.webp",
    menuDesktop:    "/media/manus/IjNNEAHqGKXXwzeb.webp",
    menuMobile:     "/media/manus/vFYLHPtdaNoKeQav.webp",
    contactDesktop: "/media/manus/MmOmyWVbwVxvaRGy.webp",
    contactMobile:  "/media/manus/QeKYqJxcUsmrjLkh.webp",
  },
  r4: {
    card:           "/media/manus/iYVawESYSulmHHVM.webp",
    homeDesktop:    "/media/manus/fHyKIfGLXnXWiHan.webp",
    homeMobile:     "/media/manus/pQVFpNclGHLHgqgu.webp",
    menuDesktop:    "/media/manus/HMYIIPAeGvnYGxaU.webp",
    menuMobile:     "/media/manus/EexQikoQVucNhDpZ.webp",
    contactDesktop: "/media/manus/TxEYEKzSDqojISiL.webp",
    contactMobile:  "/media/manus/VYmjqqMKDpqwxfPx.webp",
  },
  b1: {
    card:           "/media/manus/JyHQRjqPVlblrfxy.webp",
    homeDesktop:    "/media/manus/mkwXpPknntRzYJtF.webp",
    homeMobile:     "/media/manus/glPXgwhAwFymOCMF.webp",
    servicesDesktop:"/media/manus/nhLdJgpyoqaFLpva.webp",
    servicesMobile: "/media/manus/GCxQAELZSsclOnPh.webp",
    contactDesktop: "/media/manus/QTuOFGHPtTmQYcxN.webp",
    contactMobile:  "/media/manus/xnTYcPlbVHLcwLwV.webp",
  },
  b2: {
    card:           "/media/manus/YGtbBkfQAFlKcslg.webp",
    homeDesktop:    "/media/manus/JmNoAxJseLXRDfgT.webp",
    homeMobile:     "/media/manus/VscAMZaELdZLaVFZ.webp",
    servicesDesktop:"/media/manus/ZNnGvKMbPhEwuQYG.webp",
    servicesMobile: "/media/manus/FmrOethWQtLAKJZC.webp",
    contactDesktop: "/media/manus/ZNnGvKMbPhEwuQYG.webp",
    contactMobile:  "/media/manus/rkFkQuzsELVeVHTo.webp",
  },
  b3: {
    card:           "/media/manus/uVKuMEfdHQCjujxn.webp",
    homeDesktop:    "/media/manus/NVTeQidRRmePHdqS.webp",
    homeMobile:     "/media/manus/LSEUIfuqufrRTMUs.webp",
    servicesDesktop:"/media/manus/DFvKTdhFYpzVyeOo.webp",
    servicesMobile: "/media/manus/eTDGLdMCoTZoEbpj.webp",
    contactDesktop: "/media/manus/NbHQgWjHqDAdyOOK.webp",
    contactMobile:  "/media/manus/kRPSDMLyzlQsfdaA.webp",
  },
  b4: {
    card:           "/media/manus/incAkGiBBarJSrgs.webp",
    homeDesktop:    "/media/manus/KgazPdTsZetPEIJp.webp",
    homeMobile:     "/media/manus/jlOkVxemyMIvYtbP.webp",
    servicesDesktop:"/media/manus/JcQPplGeUjKwPYmS.webp",
    servicesMobile: "/media/manus/QJqRSqkBLFOJTeqr.webp",
    contactDesktop: "/media/manus/PRWXpMxlGwHmMFfC.webp",
    contactMobile:  "/media/manus/QiUFEwUITGElevmR.webp",
  },
  // ── Κλινική 1 ──
  c1: {
    card:            "/media/manus/vHiXcgVzfwvNVOeM.webp",
    homeDesktop:     "/media/manus/YCnlUDrgdfYcRFcp.webp",
    homeMobile:      "/media/manus/SoSmnaYEMYNtborV.webp",
    servicesDesktop: "/media/manus/EBGosAATQGJrDRrO.webp",
    servicesMobile:  "/media/manus/shleiZcAylwlZFko.webp",
    contactDesktop:  "/media/manus/fLgMqFfxfaBAZUUg.webp",
    contactMobile:   "/media/manus/IeKYfaoTBkvBtsGW.webp",
  },
  // ── Κλινική 2 ──
  c2: {
    card:            "/media/manus/YbjSXbLAerjQxXvn.webp",
    homeDesktop:     "/media/manus/xdClqTPSaZedbOrH.webp",
    homeMobile:      "/media/manus/bpTeQMAzkYPxDtQG.webp",
    servicesDesktop: "/media/manus/IrKtVBivvGJLlxXq.webp",
    servicesMobile:  "/media/manus/DHjvqNlizRvZpkBh.webp",
    contactDesktop:  "/media/manus/BQfFdAkGYebKMKpk.webp",
    contactMobile:   "/media/manus/RkvwuDSBgYRbTqkU.webp",
  },
  // ── Κλινική 3 ──
  c3: {
    card:            "/media/manus/ChvLohPuUByZeIQC.webp",
    homeDesktop:     "/media/manus/NHQujbHpKEVeITwp.webp",
    homeMobile:      "/media/manus/uavEwuXtbwJlQxCh.webp",
    servicesDesktop: "/media/manus/IkjsPNxJuaiuzcxz.webp",
    servicesMobile:  "/media/manus/EAPtMQrSPrviqxBc.webp",
    contactDesktop:  "/media/manus/HmjUPHfgkXKrwmUi.webp",
    contactMobile:   "",
  },
  // ── Fitness και Γυμναστήρια 1 ──
  f1: {
    card:            "/media/manus/MgTbsRcvqoiXiYbH.webp",
    homeDesktop:     "/media/manus/SPFIMdyocJfvNgUg.webp",
    homeMobile:      "/media/manus/NbnbjgpLHjCqlaND.webp",
    servicesDesktop: "/media/manus/fzhBYVDYdMZwWzSW.webp",
    servicesMobile:  "/media/manus/pVofdJtBxjtWPRnG.webp",
    contactDesktop:  "/media/manus/dwsiQRBVsDHirGfC.webp",
    contactMobile:   "/media/manus/BKpCjEWdimSQcHBz.webp",
  },
  // ── Fitness και Γυμναστήρια 2 ──
  f2: {
    card:            "/media/manus/DHunfxWXbmZPGjxJ.webp",
    homeDesktop:     "/media/manus/JtNJcvmMdIcsxfuT.webp",
    homeMobile:      "/media/manus/ZqytkHiGFTkpiDMo.webp",
    servicesDesktop: "/media/manus/kmSnubLAQhhgWiTo.webp",
    servicesMobile:  "/media/manus/sBMGMjPSjdwPLICt.webp",
    contactDesktop:  "/media/manus/WqWEFvWUEoLNZqgI.webp",
    contactMobile:   "/media/manus/qxjutkZlzdoHvUbe.webp",
  },
  // ── Fitness και Γυμναστήρια 3 ──
  f3: {
    card:            "/media/manus/QBsSNVdHmBlaibGE.webp",
    homeDesktop:     "/media/manus/PupniWGtadNIoPMs.webp",
    homeMobile:      "/media/manus/qUfmcEHAKKoQSfvf.webp",
    servicesDesktop: "/media/manus/kYdgLBULoTaXevYV.webp",
    servicesMobile:  "/media/manus/FANwKqWNSjtyDKnE.webp",
    contactDesktop:  "/media/manus/NdPIdheuOigsEXrU.webp",
    contactMobile:   "/media/manus/EynEblQKKCvTPftb.webp",
  },
};



// Complete captures shared with the homepage and detail modal.
function TemplateCardPreview({ template }: { template: typeof TEMPLATES[0] }) {
  return <DemoPreviewArtwork id={template.id} />;
}

// ─── Industries ───────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { id: "all", label: "Όλοι οι κλάδοι", icon: "✦" },
  { id: "realestate", label: "Ακίνητα", icon: "" },
  { id: "restaurant", label: "Εστίαση και τρόφιμα", icon: "☕" },
  { id: "beauty", label: "Ομορφιά και ευεξία", icon: "✂" },
  { id: "clinic", label: "Ιατρεία και υγεία", icon: "+" },
  { id: "fitness", label: "Γυμναστήρια", icon: "◈" },
  { id: "architecture", label: "Αρχιτεκτονική", icon: "△" },
];

// ─── Template data (live-preview only) ───────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    "id": "hartley",
    "industry": "restaurant",
    "name": "Hartley Café & Bakery",
    "tagline": "Καφές, γλυκά και καλή παρέα",
    "tier": "Custom",
    "tierGradient": "linear-gradient(135deg, #082438, #899ACA)",
    "domain": "HARTLEY",
    "palette": [
      "#082438",
      "#FAF7F2",
      "#DDB8AD",
      "#899ACA"
    ],
    "paletteNames": [
      "Navy",
      "Warm white",
      "Dusty pink",
      "Periwinkle"
    ],
    "features": [
      "Καμπύλη συλλογή φωτογραφιών",
      "Διαδραστικό μενού καφέ",
      "Συνδυασμοί τσαγιού και μενού για λήψη",
      "Κινούμενη παρουσίαση συσκευασίας",
      "Φωτογραφίες καφέ σε πλήρη οθόνη"
    ],
    "pages": [
      {
        "label": "Demo ιστοσελίδας",
        "preview": "live",
        "description": "Καφές, γλυκά και καλή παρέα"
      }
    ],
    "style": "Ένα αγγλικό καφέ με δικό του εικονογραφημένο κόσμο, τη γραφή Hartley, τον σκύλο, τα λουλούδια και τις γραμματοσειρές Rubik Black και Jost.",
    "waMessage": "Γεια σας DM-Labs! Θα ήθελα να συζητήσουμε μια ιστοσελίδα με τον χαρακτήρα του demo Hartley.",
    "price": "",
    "images": {
      "card": ""
    },
    "livePreview": true,
    "previewUrl": "/previews/hartley.html"
  },
  {
    id: "luxe-realty", industry: "realestate", name: "Luxe Realty",
    tagline: "Μια διαφορετική οπτική", tier: "Pro", tierGradient: "linear-gradient(135deg, #202529, #657077)", domain: "luxe.example",
    palette: ["#202529", "#f7f8f8", "#dce2e5", "#e9edf0", "#657077"], paletteNames: ["Γραφίτης", "Λευκό", "Ασημί", "Ομίχλη", "Γκρι"],
    features: ["Γρήγορη εναλλαγή φωτογραφιών στην αρχική ενότητα", "Φίλτρα πολλαπλών επιλογών για τοποθεσία, τύπο, υπνοδωμάτια και τιμή", "Πολλαπλά φίλτρα χαρακτηριστικών με ετικέτες στις αγγελίες", "Ξεχωριστή ταξινόμηση ανά τιμή και εμβαδόν", "Κινούμενες κάρτες ακινήτων και διαδραστική γκαλερί"],
    pages: [{ label: "Ζωντανή προεπισκόπηση", preview: "live", description: "Εξερευνήστε τρεις κατοικίες, επιλέξτε χαρακτηριστικά και δείτε φωτογραφίες εσωτερικών και εξωτερικών χώρων." }],
    style: "Γραφίτης, λευκό και ασημί με τυπογραφία Bricolage Grotesque. Φωτογραφική παρουσίαση ακινήτων με γρήγορη εναλλαγή εικόνων, φίλτρα πολλαπλών επιλογών, κινούμενες κάρτες ακινήτων και διαδραστικές γκαλερί.", waMessage: "Γεια σας! Είδα το παράδειγμα Luxe Realty και θα ήθελα να μάθω περισσότερα.", price: "€450", images: { card: "" }, livePreview: true, previewUrl: "/previews/luxe-realty.html",
  },

  // ── Demo ιστοσελίδας templates ──
  {
    id: "bella-salon",
    industry: "beauty",
    name: "Bella Salon",
    tagline: "Μαλλιά με χαρακτήρα",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "bellasalon.com",
    palette: ["#1a0a0f", "#6b2d3e", "#c4748a", "#e8b4c0", "#fdf0f3"],
    paletteNames: ["Βαθύ δαμάσκηνο", "Σκούρο ροζ", "Ροζ σκόνη", "Ροζέ", "Ελεφαντόδοντο"],
    styleLabel: "Πολυτελές και θηλυκό",
    livePreview: true,
    previewUrl: "/previews/bella-salon.html",
    features: [
      "Κομψή αρχική ενότητα με κουμπί κράτησης",
      "Παρουσίαση υπηρεσιών με τιμές",
      "Γκαλερί με δουλειές",
      "Γνωρίστε τους stylists μας",
      "Επικοινωνία και φόρμα για ραντεβού",
      "Τοποθεσία και ώρες λειτουργίας",
      "Κουμπί WhatsApp",
      "Άψογη εμφάνιση στο κινητό",
    ],
    pages: [
      { label: "Ζωντανή προεπισκόπηση", preview: "live", description: "Μπορείτε να κάνετε scroll, να πατήσετε και να δείτε όλη την ιστοσελίδα" },
    ],
    style: "Ένα hair atelier με αισθητική περιοδικού, σε μαύρο, λευκό και ζεστό γκρι. Μεγάλη τυπογραφία, ασπρόμαυρη φωτογράφιση του σαλονιού, διαδραστική γκαλερί μαλλιών και επίδειξη αιτήματος ραντεβού.",
    waMessage: "Γεια σας! Είδα το παράδειγμα Bella Salon στη σελίδα σας και θα ήθελα να μάθω περισσότερα.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "pulse-gym",
    industry: "fitness",
    name: "PulseGym",
    tagline: "Τολμηρό και δυναμικό",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "pulsegym.com",
    palette: ["#0a0a0a", "#1a1a2e", "#ff6b35", "#ffa500", "#ffffff"],
    paletteNames: ["Μαύρο", "Σκούρο ναυτικό", "Πορτοκαλί", "Κεχριμπάρι", "Λευκό"],
    styleLabel: "Σκούρο και τολμηρό",
    livePreview: true,
    previewUrl: "/previews/pulse-gym.html",
    features: [
      "Σκούρα, τολμηρή αρχική ενότητα με κουμπί εγγραφής",
      "Πρόγραμμα και τύποι προπόνησης",
      "Προφίλ εκπαιδευτών",
      "Πακέτα συνδρομής",
      "Επικοινωνία και κράτηση δοκιμαστικού",
      "Τοποθεσία και ώρες λειτουργίας",
      "Κουμπί WhatsApp",
      "Άψογη εμφάνιση στο κινητό",
    ],
    pages: [
      { label: "Ζωντανή προεπισκόπηση", preview: "live", description: "Μπορείτε να κάνετε scroll, να πατήσετε και να δείτε όλη την ιστοσελίδα" },
    ],
    style: "Ύφος γεμάτο ενέργεια, με μαύρο φόντο, πορτοκαλί πινελιές, δυνατή γραμματοσειρά και δυναμική διάταξη. Ταιριάζει σε γυμναστήρια, CrossFit και studio προπόνησης δύναμης.",
    waMessage: "Γεια σας! Είδα το παράδειγμα PulseGym στη σελίδα σας και θα ήθελα να μάθω περισσότερα.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "dr-elara-dental",
    industry: "clinic",
    name: "Dr. Elara Dental",
    tagline: "Οδοντιατρική με καθαρή ματιά",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "elara.example",
    palette: ["#ffffff", "#14212c", "#185ce5", "#f1f6fb"],
    paletteNames: ["Λευκό", "Μελάνι", "Ηλεκτρικό μπλε", "Πάγος"],
    styleLabel: "Καθαρός κλινικός σχεδιασμός",
    livePreview: true,
    previewUrl: "/previews/dr-elara-dental.html",
    features: ["Διαδραστική σάρωση με σωματίδια", "Διαδραστική εξερεύνηση οδοντικών προβλημάτων", "Εξατομικευμένες προτιμήσεις επίσκεψης", "Μαγνητικά εφέ στα κουμπιά", "Επίδειξη αιτήματος ραντεβού", "Εκπαιδευτικό βίντεο θεραπείας", "Ξεχωριστή τυπογραφία Sora και Source Sans", "Πληκτρολόγιο και μειωμένη κίνηση"],
    pages: [
      { label: "Ζωντανή προεπισκόπηση", preview: "live", description: "Μπορείτε να κάνετε scroll, να πατήσετε και να δείτε όλη την ιστοσελίδα" },
    ],
    style: "Καθαρό λευκό, ψυχρό ασημί και ηλεκτρικό μπλε. Κλινική ταυτότητα με διαδραστική σάρωση, εξερεύνηση του δοντιού και προτιμήσεις επίσκεψης μέσα στο αίτημα ραντεβού.",
    waMessage: "Γεια σας! Είδα το παράδειγμα Dr. Elara Dental στη σελίδα σας και θα ήθελα να μάθω περισσότερα.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "nomad-coffee",
    industry: "restaurant",
    name: "Nomad Coffee",
    tagline: "Καφές με χαρακτήρα",
    tier: "Launch",
    tierGradient: "linear-gradient(135deg, #5B8CFF, #3B6CDF)",
    domain: "nomad.example",
    palette: ["#b72d20", "#f1df9c", "#f6f0e4", "#28251e"],
    paletteNames: ["Κόκκινο", "Απαλό κίτρινο", "Χαρτί", "Μελάνι"],
    styleLabel: "Έντονη τυπογραφική ταυτότητα",
    livePreview: true,
    previewUrl: "/previews/nomad-coffee.html",
    features: ["Πρωτότυπες εικόνες του brand", "Διαδραστικό μενού καφέ", "Προσαρμοζόμενες συνταγές καφέ", "Υπολογισμός καφέ, νερού και πάγου", "Βίντεο καφέ στην αρχική ενότητα", "Φωτογραφική συλλογή καφέ και φαγητού", "Υποστήριξη μειωμένης κίνησης", "Προσαρμογή σε κάθε οθόνη"],
    pages: [
      { label: "Ζωντανή προεπισκόπηση", preview: "live", description: "Μπορείτε να κάνετε scroll, να πατήσετε και να δείτε όλη την ιστοσελίδα" },
    ],
    style: "Έντονη στενή τυπογραφία, κόκκινο και απαλό κίτρινο, εικόνες με υφή και ένας διαδραστικός οδηγός παρασκευής καφέ. Μια φανταστική ταυτότητα καφέ με ξεκάθαρο χαρακτήρα.",
    waMessage: "Γεια σας! Είδα το παράδειγμα Nomad Coffee στη σελίδα σας και θα ήθελα να μάθω περισσότερα.",
    price: "€250",
    images: { card: "" },
  },
  // ── Fitness και Γυμναστήρια templates ──
  {
    id: "arcos-architecture",
    industry: "architecture",
    name: "Arcos Architecture",
    tagline: "Ένα αρχιτεκτονικό ημερολόγιο",
    tier: "Pro",
    tierGradient: "linear-gradient(135deg, #c4613a, #8a3a1a)",
    domain: "arcosarchitecture.gr",
    palette: ["#242521", "#e6e5db", "#a44129", "#f2f0e9", "#5a5c52"],
    paletteNames: ["Ανθρακί", "Σκούρο", "Τερακότα", "Χαρτί", "Απαλό"],
    features: ["Διαδραστική κάτοψη κατοικίας με αυλή", "Πρωτότυπες εικόνες του ίδιου σχεδιαστικού concept", "Μεγεθυντικός φακός υλικών με χειρισμό αφής", "Φωτογραφίες έργου σε πλήρη οθόνη", "Δημιουργία και λήψη ενδεικτικού brief έργου"],
    pages: [
      { label: "Ζωντανή προεπισκόπηση", preview: "live", description: "Μπορείτε να κάνετε scroll, να πατήσετε και να δείτε όλη την ιστοσελίδα" },
    ],
    style: "Αρχιτεκτονικό ημερολόγιο με τυπογραφία Syne, απαλούς τόνους πέτρας και τερακότα. Εξερευνήστε μια φανταστική κατοικία μέσα από την κάτοψη, τις εικόνες και τα υλικά της.",
    waMessage: "Γεια σας! Είδα το παράδειγμα Arcos Architecture στη σελίδα σας και θα ήθελα να μάθω περισσότερα.",
    price: "€450",
    images: { card: "" },
    livePreview: true,
    previewUrl: "/previews/arcos-architecture.html",
  },
];
// ─── Template Detail Modal ────────────────────────────────────────────────────
function TemplateModal({ template, onClose }: { template: typeof TEMPLATES[0]; onClose: () => void }) {
  const waUrl = `https://wa.me/35797472847?text=${encodeURIComponent(template.waMessage)}`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{ background: "rgba(17,19,21,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
        style={{ border: "1px solid rgba(91,140,255,0.15)", WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >
        {/* Card mockup as hero */}
        <div className="relative">
          <TemplateCardPreview template={template} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 transition-all z-10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Title + tagline */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{template.name}</h2>
            <p className="text-gray-500 text-sm">{template.tagline} · {INDUSTRIES.find(i => i.id === template.industry)?.label}</p>
          </div>

          {/* Open Full Preview - primary CTA */}
          <a
            href={`/preview/${template.id}/?from=%2Fel%2Ftemplates%2F`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
          >

            Δείτε ολόκληρη την προεπισκόπηση
          </a>

          {/* Style description */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-600 text-sm leading-relaxed">{template.style}</p>
          </div>

          {/* What's included */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-widest">Τι περιλαμβάνει</h3>
            <ul className="space-y-2">
              {template.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Τιμές CTA */}
          <div className="rounded-xl p-4 border border-gray-200" style={{ background: "linear-gradient(135deg, #F8F9FF, #F5F0FF)" }}>
            <p className="text-xs text-gray-500 mb-1 font-medium">Είναι απλώς μια ιδέα</p>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">Κάθε ιστοσελίδα τη φτιάχνουμε από την αρχή, με βάση το brand σας. Η τιμή εξαρτάται από το πακέτο που θα διαλέξετε, όχι από το παράδειγμα.</p>
            <a
              href="/el/pricing/"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] mb-2"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
            >
              Δείτε τα πακέτα και τις τιμές
            </a>
            <a
              href="/el/contact/"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 transition-all duration-300 hover:border-[#5B8CFF] hover:text-[#5B8CFF]"
            >
              Ζητήστε προσφορά για κάτι παρόμοιο
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({ template, onClick }: { template: typeof TEMPLATES[0]; onClick: () => void }) {
  return <DemoProjectCard id={template.id} name={template.name} tagline={template.tagline} actionLabel="Δείτε το demo" onClick={onClick} />;
}

// ─── Προσαρμοσμένη Κατασκευή Card ──────────────────────────────────────────────────────
function CustomBuildCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-400 flex flex-col"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(226,229,234,0.8)" }}
    >
      {/* Gradient banner */}
      <div
        className="relative flex flex-col items-center justify-center px-8 py-12 text-center"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", height: "280px" }}
      >
        {/* Subtle animated gradient orbs */}
        <div className="absolute top-4 left-6 w-24 h-24 rounded-full blur-2xl" style={{ background: "rgba(91,140,255,0.25)" }} />
        <div className="absolute bottom-4 right-6 w-20 h-20 rounded-full blur-2xl" style={{ background: "rgba(139,92,255,0.25)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl" style={{ background: "rgba(111,227,255,0.12)" }} />

        {/* Icon */}
        <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)", boxShadow: "0 8px 24px rgba(91,140,255,0.4)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        <h3 className="relative z-10 text-white font-bold text-xl leading-tight mb-1">Από την αρχή, για εσάς</h3>
        <p className="relative z-10 text-blue-200/80 text-sm">Σχεδιασμός μόνο για εσάς</p>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Κανένα παράδειγμα δεν σας κάνει; Κανένα πρόβλημα. Σχεδιάζουμε την ιστοσελίδα σας από την αρχή, με δική της διάταξη, γραφικά και ύφος, μόνο για εσάς.
        </p>

        {/* Feature list */}
        <ul className="space-y-2 mb-5 flex-1">
          {[
            "Διάταξη φτιαγμένη μόνο για εσάς",
            "Εικονογραφήσεις και γραφικά για το brand σας",
            "Χρώματα και γραμματοσειρές με βάση το brand σας",
            "Σχεδιασμένο με βάση τους στόχους της επιχείρησής σας",
            "Είστε μέσα σε κάθε βήμα του σχεδιασμού",
          ].map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
              <Check size={14} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 italic">Με βάση τους στόχους σας</span>
          <a
            href="/el/contact/"
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2"
            style={{ color: "#5B8CFF" }}
            onClick={e => e.stopPropagation()}
          >
            Ζητήστε προσφορά
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Industry Tabs with scroll arrows ────────────────────────────────────────
function IndustryTabs({ activeIndustry, setActiveIndustry }: { activeIndustry: string; setActiveIndustry: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", checkScroll); ro.disconnect(); };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left fade + navigation */}
      {canScrollLeft && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(246,246,244,0.95), transparent)" }} />
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 min-w-11 h-11 px-3 rounded-md bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
            aria-label="Κύλιση αριστερά"
          >
            <span>Πίσω</span>
          </button>
        </>
      )}

      {/* Right fade + navigation */}
      {canScrollRight && (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(246,246,244,0.95), transparent)" }} />
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 min-w-11 h-11 px-3 rounded-md bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
            aria-label="Κύλιση δεξιά"
          >
            <span>Επόμενο</span>
          </button>
        </>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "max(16px, calc((100vw - 1280px) / 2 + 16px))",
          paddingRight: "max(16px, calc((100vw - 1280px) / 2 + 16px))",
          paddingBottom: "2px",
        } as React.CSSProperties}
      >
        {INDUSTRIES.map(industry => (
          <button
            key={industry.id}
            onClick={() => setActiveIndustry(industry.id)}
            className="flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
            style={
              activeIndustry === industry.id
                ? { background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)", color: "#fff", boxShadow: "0 4px 12px rgba(91,140,255,0.3)" }
                : { background: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }
            }
          >
            {industry.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TemplatesEl() {
  useSEO({
    title: "Η δουλειά μας | Demo ιστοσελίδων | DM-Labs.io",
    description: "Demo ιστοσελίδων για εστιατόρια, σαλόνια ομορφιάς, ιατρεία, στούντιο yoga και άλλα. Δείτε πώς θα μπορούσε να είναι και η δική σας.",
    canonicalPath: "/el/templates/",
  });
  const [location] = useLocation();
  const [activeIndustry, setActiveIndustry] = useState(previewIndustry);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  // Guard so the ?open= / ?industry= effect only runs once on mount
  const urlParamHandled = useRef(false);

  // Open modal: push a single history entry so browser back can close it
  const openModal = (tpl: typeof TEMPLATES[0]) => {
    setSelectedTemplate(tpl);
    window.history.pushState({ modal: true, dmGalleryPosition: { x: window.scrollX, y: window.scrollY } }, "");
  };

  // Close modal: always close immediately — no async history.back() calls.
  // The popstate listener handles the browser-back case separately.
  const closeModal = () => {
    setSelectedTemplate(null);
  };

  // Listen for browser back button while modal is open
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      // Only intercept if the popped state was our modal entry
      if (selectedTemplate) {
        setSelectedTemplate(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [selectedTemplate]);

  // Handle URL params — run only once on mount to avoid re-open loops
  useEffect(() => {
    if (urlParamHandled.current) return;
    urlParamHandled.current = true;

    const params = new URLSearchParams(window.location.search);
    // Always clean query strings immediately — prevents Google indexing ?open= and ?industry= as separate pages
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    // Handle ?industry= filter
    const industry = params.get("industry");
    if (industry && INDUSTRIES.find(i => i.id === industry)) {
      setActiveIndustry(industry);
    }
    // Handle ?open=templateId  -  auto-open the modal for a specific template
    const openId = params.get("open");
    if (openId) {
      const tpl = TEMPLATES.find(t => t.id === openId);
      if (tpl) {
        openModal(tpl);
      }
    }
  }, []);

  // Keep the curated order consistent when visitors filter or return from a demo.
  const filtered = activeIndustry === "all"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.industry === activeIndustry);

  return (
    <div data-example-industry={activeIndustry} className="min-h-screen" style={{ background: "#F6F6F4" }}>
      {/* Hero */}
      <section className="cinematic-hero-surface relative py-12 sm:py-16 lg:py-24 overflow-hidden">
        <CinematicHeroBackground kind="templates" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.06) 0%, transparent 50%, rgba(139,92,255,0.06) 100%)" }} />
        <div className="absolute top-16 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(91,140,255,0.08)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(139,92,255,0.07)" }} />
        <div className="relative container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#5B8CFF" }}>Demo ιστοσελίδων</p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">Η δουλειά μας</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
              Δείτε τα demo ιστοσελίδων ανά κλάδο και κρατήστε ιδέες. Όποιο κι αν σας αρέσει, το προσαρμόζουμε στην επιχείρησή σας: στο λογότυπο, στα χρώματα και στο περιεχόμενό σας.
            </p>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Αυτά είναι <strong className="text-gray-500">διαδραστικά demo ιστοσελίδων</strong>, όχι έτοιμα πακέτα. Κάθε ιστοσελίδα τη φτιάχνουμε από την αρχή για την επιχείρησή σας.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Industry Filter */}
      <section className="sticky top-[72px] z-30 py-4" style={{ background: "rgba(246,246,244,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(226,229,234,0.6)" }}>
        <IndustryTabs activeIndustry={activeIndustry} setActiveIndustry={setActiveIndustry} />
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-y-10">
              {/* Προσαρμοσμένη Κατασκευή card - always shown first */}
              {filtered.map(template => (
                <TemplateCard key={template.id} template={template} onClick={() => openModal(template)} />
              ))}
              <CustomBuildCard />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 shadow-md border border-gray-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" className="w-8 h-8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              </div>
              <h3 className="text-gray-900 text-2xl font-bold mb-3">
                Demo ιστοσελίδων: {INDUSTRIES.find(i => i.id === activeIndustry)?.label}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                Για αυτόν τον κλάδο δεν έχουμε ακόμα demo ιστοσελίδων εδώ, αλλά μπορούμε να σχεδιάσουμε για εσάς μια ιστοσελίδα από την αρχή. Απλώς στείλτε μας μήνυμα.
              </p>
              <a
                href="/el/contact/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ζητήστε σχεδιασμό από την αρχή
              </a>
            </motion.div>
          )}


        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(226,229,234,0.8)" }}>
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Δεν βρίσκετε αυτό που ψάχνετε;</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Κάθε ιστοσελίδα τη φτιάχνουμε από την αρχή. Πείτε μας δυο λόγια για την επιχείρησή σας, και θα δούμε μαζί τι της ταιριάζει.
            </p>
            <a
              href="/el/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
            >
              Ας τα πούμε
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <TemplateModal template={selectedTemplate} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
