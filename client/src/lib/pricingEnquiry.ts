import { isCurrency, formatMoney } from "../../../shared/currency";
import { BUILD_PLANS, CARE_PLANS } from "@/components/pricing/pricingContent";
import { pricingPaymentSchedule } from "@/components/pricing/pricingExperience";
function pricingSelection(search: string) {
  const query = new URLSearchParams(search);
  const website = query.get("package");
  const care = query.get("care");
  const billing = query.get("billing");
  if (!["Launch Website", "Growth Website", "Pro Website"].includes(website ?? "") || !["Basic Care", "Complete Care"].includes(care ?? "") || !["monthly", "yearly"].includes(billing ?? "")) return null;
  const currency = query.get("currency");
  return { package: website!, care: care!, billing: billing!, ...(isCurrency(currency) ? { currency } : {}) };
}

/** Carry only validated package context, never arbitrary URL fields or personal data. */
export function pricingEnquiryQuery(search: string) {
  const selection = pricingSelection(search);
  return selection ? `?${new URLSearchParams(selection).toString()}` : "";
}

export function pricingEnquiry(locale: "en" | "el" | "he", search = typeof window === "undefined" ? "" : window.location.search) {
  const selection = pricingSelection(search);
  if (!selection) return "";
  const { package: website, care, billing } = selection;
  const schedule = selection.currency ? pricingPaymentSchedule(BUILD_PLANS.en.findIndex(p => p.name === website), CARE_PLANS.findIndex(p => p.name === care), billing === "yearly", selection.currency) : null;
  const cost = (amount: number) => formatMoney(locale, amount, selection.currency!);
  const context = schedule ? (locale === "en"
    ? ` Displayed prices (${selection.currency}): build ${cost(schedule.build)}, care ${cost(schedule.care)} ${billing === "yearly" ? "per year" : "per month after launch"}.`
    : locale === "el"
      ? ` Τιμές που εμφανίστηκαν (${selection.currency}): κατασκευή ${cost(schedule.build)}, φροντίδα ${cost(schedule.care)} ${billing === "yearly" ? "τον χρόνο" : "τον μήνα μετά τη δημοσίευση"}.`
      : ` המחירים שהוצגו (${selection.currency}): בנייה ${cost(schedule.build)}, תחזוקה ${cost(schedule.care)} ${billing === "yearly" ? "לשנה" : "לחודש אחרי ההשקה"}.`) : "";
  if (locale === "en") return `Hello DM-Labs team! I'm interested in ${website} with ${care}, billed ${billing}. I'd love to discuss my project.${context}`;
  return locale === "el"
    ? `Γεια σας ομάδα DM-Labs! Ενδιαφέρομαι για το ${website} με ${care}, με ${billing === "yearly" ? "ετήσια" : "μηνιαία"} πληρωμή. Θα ήθελα να συζητήσουμε το έργο μου.${context}`
    : `שלום לצוות DM-Labs! אני מעוניין בחבילת ${website} עם ${care}, בתשלום ${billing === "yearly" ? "שנתי" : "חודשי"}. אשמח לדבר על הפרויקט שלי.${context}`;
}
