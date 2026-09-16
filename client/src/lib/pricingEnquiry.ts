export function pricingEnquiry(locale: "el" | "he") {
  const query = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const website = query.get("package");
  const care = query.get("care");
  const billing = query.get("billing");
  if (!["Launch Website", "Growth Website", "Pro Website"].includes(website ?? "") || !["Basic Care", "Complete Care"].includes(care ?? "") || !["monthly", "yearly"].includes(billing ?? "")) return "";
  return locale === "el"
    ? `Γεια σας DM Labs! Ενδιαφέρομαι για το ${website} με ${care}, με ${billing === "yearly" ? "ετήσια" : "μηνιαία"} πληρωμή. Θα ήθελα να συζητήσουμε το έργο μου.`
    : `שלום DM Labs! אני מעוניין בחבילת ${website} עם ${care}, בתשלום ${billing === "yearly" ? "שנתי" : "חודשי"}. אשמח לדבר על הפרויקט שלי.`;
}
