function pricingSelection(search: string) {
  const query = new URLSearchParams(search);
  const website = query.get("package");
  const care = query.get("care");
  const billing = query.get("billing");
  if (!["Launch Website", "Growth Website", "Pro Website"].includes(website ?? "") || !["Basic Care", "Complete Care"].includes(care ?? "") || !["monthly", "yearly"].includes(billing ?? "")) return null;
  return { package: website!, care: care!, billing: billing! };
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
  if (locale === "en") return `Hello DM-Labs team! I'm interested in ${website} with ${care}, billed ${billing}. I'd love to discuss my project.`;
  return locale === "el"
    ? `Γεια σας ομάδα DM-Labs! Ενδιαφέρομαι για το ${website} με ${care}, με ${billing === "yearly" ? "ετήσια" : "μηνιαία"} πληρωμή. Θα ήθελα να συζητήσουμε το έργο μου.`
    : `שלום לצוות DM-Labs! אני מעוניין בחבילת ${website} עם ${care}, בתשלום ${billing === "yearly" ? "שנתי" : "חודשי"}. אשמח לדבר על הפרויקט שלי.`;
}
