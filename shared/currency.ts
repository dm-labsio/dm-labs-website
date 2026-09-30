export const CURRENCIES = ["EUR", "USD", "CAD", "ILS"] as const;
export type Currency = typeof CURRENCIES[number];

/** Stable ECB reference snapshot. Updating it is an explicit pricing decision. */
export const CURRENCY_SNAPSHOT = {
  date: "2026-09-29",
  source: "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
  rates: { EUR: 1, USD: 1.1355, CAD: 1.6101, ILS: 3.4702 },
} as const;

export function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && CURRENCIES.includes(value as Currency);
}

export function currencyForCountry(country: unknown): Currency {
  if (typeof country !== "string") return "EUR";
  switch (country.trim().toUpperCase()) {
    case "IL": return "ILS";
    case "US": return "USD";
    case "CA": return "CAD";
    default: return "EUR";
  }
}

/** Convert individual EUR prices only. Totals/savings use the converted prices. */
export function convertedPrice(euros: number, currency: Currency): number {
  if (!Number.isFinite(euros) || euros < 0) throw new RangeError("Invalid price");
  if (currency === "EUR") return euros;
  const step = euros < 200 ? (currency === "ILS" ? 10 : 5) : (currency === "ILS" ? 50 : 25);
  return Math.ceil(euros * CURRENCY_SNAPSHOT.rates[currency] / step) * step;
}

/** Format an already-converted amount. Dollar codes stay unambiguous. */
export function formatMoney(locale: string, amount: number, currency: Currency): string {
  const language = locale === "he" ? "he-IL" : locale === "el" ? "el-GR" : "en-IE";
  const result = new Intl.NumberFormat(language, {
    style: "currency", currency, currencyDisplay: currency === "USD" || currency === "CAD" ? "code" : "symbol",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2,
  }).format(amount);
  return result;
}

/** Only call on our commercial copy, never third-party prices or legal thresholds. */
export function commercialText(text: string, locale: string, currency: Currency): string {
  if (currency === "EUR") return text;
  return text.replace(/€(\d+(?:[,.]\d{3})*)/g, (_, number: string) =>
    `\u2066${formatMoney(locale, convertedPrice(Number(number.replace(/[,.]/g, "")), currency), currency)}\u2069`);
}
