import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

type BuildPlan = { name: string; price: string; tone: string; summary: string; features: readonly string[] };
export function PricingSteps({ locale }: { locale: "el" | "he" }) {
  return <div className="journey-steps"><a href="#website-packages"><span>01</span>{copy[locale].steps[0]}</a><ArrowRight size={16} aria-hidden="true" /><a href="#maintenance"><span>02</span>{copy[locale].steps[1]}</a></div>;
}
const copy = {
  el: {
    steps: ["Η ιστοσελίδα σας", "Η συνεχής φροντίδα σας"],
    assurance: "Εφάπαξ κατασκευή ιστοσελίδας + υποχρεωτική φιλοξενία & φροντίδα από €69/μήνα. Ξεκάθαρα από την αρχή.",
    buildTitle: "Τρία ξεκάθαρα πακέτα.", buildIntro: "Επιλέξτε τη σωστή βάση για την επιχείρησή σας. Έπειτα, επιλέξτε τη φροντίδα της.",
    recommended: "Προτείνεται", once: "εφάπαξ", recurring: "+ φιλοξενία & φροντίδα από €69/μήνα", choose: "Επιλογή", selected: "Επιλέχθηκε",
    careTitle: "Ένα σπίτι για", careEm: "την ιστοσελίδα σας.",
    careIntro: "Η φιλοξενία & φροντίδα είναι απαραίτητη όσο διαχειριζόμαστε την ιστοσελίδα σας. Την κρατάμε online, φροντίζουμε τα αρχεία της και αναλαμβάνουμε τις ενημερώσεις.",
    change: "Αλλαγή", all: "Συνδυάζεται με κάθε πακέτο ιστοσελίδας", frequency: "Συχνότητα χρέωσης", monthly: "Μηνιαία", yearly: "Ετήσια", discount: "−10% περίπου", billingNote: "Η ίδια φροντίδα. Η χρέωση που σας ταιριάζει.",
    descriptions: ["Όλα τα απαραίτητα, σε καλά χέρια.", "Περισσότερες δυνατότητες. Περισσότερη υποστήριξη."], badge: "Πιο πλήρες",
    month: "/ μήνα", year: "/ έτος", equivalent: "ανά μήνα κατά μέσο όρο · ετήσια πληρωμή", paidMonthly: "Μηνιαία πληρωμή · συνεχής φιλοξενία & φροντίδα", saving: "Εξοικονόμηση", eachYear: "τον χρόνο", yearlyAvailable: "Ετήσια χρέωση με περίπου 10% χαμηλότερο κόστος",
    features: [["Διαχειριζόμενη φιλοξενία & παρακολούθηση διαθεσιμότητας", "Διαχείριση αρχείων και βάσης δεδομένων, όπου υπάρχει", "Αντίγραφα ασφαλείας και διόρθωση σφαλμάτων", "Υποστήριξη μέσω WhatsApp", "Έως 3 μικρές ενημερώσεις περιεχομένου κάθε μήνα"], ["Όλα όσα περιλαμβάνει το Basic Care", "Απεριόριστες ενημερώσεις εντός εύλογου πλαισίου", "Υποστήριξη WhatsApp με προτεραιότητα", "Μηνιαίος έλεγχος απόδοσης", "Ένα απλό banner ή ενημέρωση ενότητας κάθε μήνα"]],
    next: "Για το επόμενο βήμα σας", summaryTitle: "Η ιστοσελίδα σας. Η φροντίδα μας.", summaryIntro: "Επιλέξτε ιστοσελίδα και φροντίδα παραπάνω ή ας βρούμε μαζί τι σας ταιριάζει.", buildCost: "εφάπαξ κατασκευή", annualPaid: "/έτος, με ετήσια πληρωμή", monthlyPaid: "/μήνα", cta: "Ας φτιάξουμε την ιστοσελίδα σας", help: "Βοηθήστε με να επιλέξω",
    ownership: "Η εξοφλημένη ιστοσελίδα ανήκει σε εσάς. Η φιλοξενία & φροντίδα συνεχίζεται όσο τη διαχειριζόμαστε.", terms: "Δείτε τους όρους", tax: "Οι τιμές δεν περιλαμβάνουν τυχόν φόρους. Domain και υπηρεσίες τρίτων συμφωνούνται ξεχωριστά.",
    scope: "Διευκρίνιση υπηρεσιών:", scopeText: "Νέες σελίδες, συγγραφή κειμένων, επιπλέον γύροι αναθεωρήσεων, νέες ενσωματώσεις, επανασχεδιασμός, προηγμένο SEO και σύνθετη μεταφορά περιεχομένου κοστολογούνται ξεχωριστά.",
  },
  he: {
    steps: ["האתר שלכם", "התחזוקה השוטפת שלכם"],
    assurance: "בניית אתר בתשלום חד־פעמי + אירוח ותחזוקה חובה החל מ־€69 לחודש. ברור מההתחלה.",
    buildTitle: "שלוש חבילות ברורות.", buildIntro: "בחרו את הבסיס המתאים לעסק שלכם. אחר כך, בחרו את התחזוקה שלו.",
    recommended: "מומלץ", once: "חד־פעמי", recurring: "+ אירוח ותחזוקה החל מ־€69 לחודש", choose: "בחירת", selected: "נבחר",
    careTitle: "בית לאתר", careEm: "שלכם.",
    careIntro: "אירוח ותחזוקה נדרשים כל עוד אנחנו מנהלים את האתר שלכם. אנחנו שומרים עליו זמין, מנהלים את הקבצים ודואגים לעדכונים.",
    change: "שינוי", all: "מתאים לכל חבילת אתר", frequency: "תדירות התשלום", monthly: "חודשי", yearly: "שנתי", discount: "כ־10% הנחה", billingNote: "אותה תשומת לב. תדירות התשלום שמתאימה לכם.",
    descriptions: ["כל מה שצריך, בידיים טובות.", "יותר אפשרויות. יותר תמיכה."], badge: "המקיפה ביותר",
    month: "/ לחודש", year: "/ לשנה", equivalent: "לחודש בממוצע · בתשלום שנתי", paidMonthly: "תשלום חודשי · אירוח ותחזוקה שוטפים", saving: "חיסכון של", eachYear: "בשנה", yearlyAvailable: "בתשלום שנתי חוסכים כ־10%",
    features: [["אירוח מנוהל וניטור זמינות", "ניהול קבצי האתר ומסד הנתונים, אם קיים", "גיבויים ותיקוני תקלות", "תמיכה ב־WhatsApp", "עד 3 עדכוני תוכן קטנים בחודש"], ["כל מה שכלול ב־Basic Care", "עדכונים סבירים ללא הגבלה", "תמיכת WhatsApp בעדיפות", "בדיקת ביצועים חודשית", "עדכון באנר או אזור פשוט בחודש"]],
    next: "לפרק הבא שלכם", summaryTitle: "האתר שלכם. התחזוקה שלנו.", summaryIntro: "בחרו אתר ותוכנית תחזוקה למעלה, או שנמצא יחד את מה שמתאים לכם.", buildCost: "לבנייה, בתשלום חד־פעמי", annualPaid: "/לשנה, בתשלום שנתי", monthlyPaid: "/לחודש", cta: "בואו נבנה את האתר שלכם", help: "עזרו לי לבחור",
    ownership: "האתר ששולם במלואו שייך לכם. האירוח והתחזוקה נמשכים כל עוד אנחנו מנהלים אותו.", terms: "לתנאי השירות", tax: "המחירים אינם כוללים מיסים ככל שחלים. עלויות דומיין ושירותי צד שלישי מוסכמות בנפרד.",
    scope: "הבהרת היקף:", scopeText: "עמודים חדשים, כתיבה, סבבי תיקונים נוספים, אינטגרציות, עיצוב מחדש, SEO מתקדם והעברת תוכן מורכבת מתומחרים בנפרד.",
  },
};

export default function LocalizedPricingJourney({ locale, plans, custom }: { locale: "el" | "he"; plans: readonly BuildPlan[]; custom: React.ReactNode }) {
  const t = copy[locale];
  const [buildIndex, setBuildIndex] = useState<number | null>(null);
  const [careIndex, setCareIndex] = useState<number | null>(null);
  const [yearly, setYearly] = useState(false);
  const build = buildIndex === null ? null : plans[buildIndex];
  const carePlans = [{ name: "Basic Care", monthly: 69, yearly: 750 }, { name: "Complete Care", monthly: 129, yearly: 1395 }];
  const care = careIndex === null ? null : carePlans[careIndex];
  const money = (value: number) => new Intl.NumberFormat(locale === "el" ? "el-GR" : "he-IL", { style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  const enquiry = build && care ? `/${locale}/contact/?${new URLSearchParams({ package: build.name, care: care.name, billing: yearly ? "yearly" : "monthly" })}` : `/${locale}/contact/`;
  return <>
    <section className="pricing-editorial-assurance bg-[#EEF3FF] border-y border-[#5B8CFF]/20 py-4"><div className="container text-center"><p>{t.assurance}</p></div></section>
    <section id="website-packages" className="pricing-editorial-plans section-spacing bg-white"><div className="container">
      <AnimateIn className="pricing-editorial-section-intro text-center"><p className="pricing-editorial-label">01 / {t.steps[0]}</p><h2 className="pricing-editorial-section-heading">{t.buildTitle}</h2><p>{t.buildIntro}</p></AnimateIn>
      <div className="journey-build-grid grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">{plans.map((plan, i) => <AnimateIn key={plan.name}>
        <article className={`pricing-editorial-plan-card dm-card h-full flex flex-col relative${buildIndex === i ? " journey-selected" : ""}`}>
          {i === 1 && <span className="pricing-editorial-recommended">{t.recommended}</span>}
          <p className="pricing-editorial-plan-label" style={{ color: plan.tone }}><bdi>{plan.name}</bdi></p>
          <div className="pricing-editorial-price-row"><bdi className="pricing-editorial-plan-price">{plan.price}</bdi><span className="pricing-editorial-price-unit">{t.once}</span></div>
          <a href="#maintenance" className="journey-recurring">{t.recurring}<ArrowRight size={13} aria-hidden="true" /></a>
          <p className="pricing-editorial-plan-summary">{plan.summary}</p>
          <ul className="pricing-editorial-feature-list flex-1">{plan.features.map(feature => <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: plan.tone }} />{feature}</li>)}</ul>
          <button type="button" aria-pressed={buildIndex === i} onClick={() => { setBuildIndex(i); scrollTo("maintenance"); }} className={`${i === 1 ? "btn-primary" : "btn-secondary"} pricing-editorial-card-cta w-full justify-center`}>{buildIndex === i ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}{buildIndex === i ? t.selected : `${t.choose} ${plan.name.split(" ")[0]}`}</button>
        </article>
      </AnimateIn>)}</div>
      {custom}
    </div></section>
    <section id="maintenance" className="pricing-editorial-care section-spacing bg-white"><div className="container max-w-4xl">
      <AnimateIn className="pricing-editorial-section-intro text-center"><p className="pricing-editorial-label">02 / {t.steps[1]}</p><h2 className="pricing-editorial-section-heading">{t.careTitle}<br /><em>{t.careEm}</em></h2><p>{t.careIntro}</p><div className="journey-build-context">{build ? <><CheckCircle2 size={16} /><bdi>{build.name}</bdi> — {t.selected}<button type="button" onClick={() => scrollTo("website-packages")}>{t.change}</button></> : t.all}</div></AnimateIn>
      <div className="journey-billing" role="group" aria-label={t.frequency}><div className={`journey-billing-track${yearly ? " is-yearly" : ""}`}><span className="journey-billing-thumb" aria-hidden="true" /><button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>{t.monthly}</button><button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>{t.yearly}<span>{t.discount}</span></button></div><p>{t.billingNote}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">{carePlans.map((plan, i) => <AnimateIn key={plan.name}>
        <article className={`pricing-editorial-care-card dm-card h-full flex flex-col relative${i === 1 ? " journey-care-featured" : ""}${careIndex === i ? " journey-selected" : ""}`}>
          {i === 1 && <span className="pricing-editorial-recommended">{t.badge}</span>}
          <p className="pricing-editorial-plan-label"><bdi>{plan.name}</bdi></p><p className="journey-care-description">{t.descriptions[i]}</p>
          <div className="journey-price-block" aria-live="polite" aria-atomic="true"><div key={String(yearly)} className="journey-price-transition"><div className="pricing-editorial-price-row"><bdi className="pricing-editorial-care-price">{money(yearly ? plan.yearly : plan.monthly)}</bdi><span className="pricing-editorial-price-unit">{yearly ? t.year : t.month}</span></div><p className="journey-billing-detail">{yearly ? <><bdi>{money(plan.yearly / 12)}</bdi> {t.equivalent}</> : t.paidMonthly}</p><p className="journey-saving">{yearly ? <>{t.saving} <bdi>{money(plan.monthly * 12 - plan.yearly)}</bdi> {t.eachYear}</> : t.yearlyAvailable}</p></div></div>
          <ul className="pricing-editorial-feature-list flex-1">{t.features[i].map(feature => <li key={feature} className="flex items-start gap-2.5 text-sm text-[#111315]"><CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: i === 1 ? "#8B5CFF" : "#5B8CFF" }} />{feature}</li>)}</ul>
          <button type="button" aria-pressed={careIndex === i} onClick={() => setCareIndex(i)} className={`${i === 1 ? "btn-primary" : "btn-secondary"} pricing-editorial-card-cta w-full justify-center`}>{careIndex === i ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}<span>{careIndex === i ? t.selected : t.choose} <bdi>{plan.name}</bdi></span></button>
        </article>
      </AnimateIn>)}</div>
      <div className="journey-summary" id="your-selection"><div aria-live="polite"><p className="pricing-editorial-label">{t.next}</p><h3>{build && care ? <><bdi>{build.name}</bdi> + <bdi>{care.name}</bdi></> : t.summaryTitle}</h3><p>{build && care ? <><strong><bdi>{build.price}</bdi></strong> {t.buildCost} <span className="journey-summary-plus">+</span> <strong><bdi>{money(yearly ? care.yearly : care.monthly)}</bdi></strong>{yearly ? t.annualPaid : t.monthlyPaid}</> : t.summaryIntro}</p></div><Link href={enquiry} className="btn-primary">{build && care ? t.cta : t.help}<ArrowRight size={16} /></Link></div>
      <p className="journey-ownership">{t.ownership} <Link href={`/${locale}/terms/`}>{t.terms}</Link><br />{t.tax}</p>
      <div className="pricing-editorial-scope-guardrail flex items-start gap-3 rounded-xl px-5 py-4 mt-8"><ShieldCheck size={19} className="shrink-0 text-[#5B8CFF]" /><p className="text-sm"><strong>{t.scope}</strong> {t.scopeText}</p></div>
    </div></section>
  </>;
}
