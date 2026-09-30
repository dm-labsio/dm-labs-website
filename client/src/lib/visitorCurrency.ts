import { isCurrency, type Currency } from "../../../shared/currency";

/** Resolve once per document; language changes and SPA navigation reuse it. */
export async function loadVisitorCurrency(fetcher: typeof fetch = fetch): Promise<Currency> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);
  try {
    const response = await fetcher("/api/visitor-currency/", { cache: "no-store", signal: controller.signal });
    if (!response.ok) return "EUR";
    const data: unknown = await response.json();
    return data && typeof data === "object" && "currency" in data && isCurrency(data.currency) ? data.currency : "EUR";
  } catch {
    return "EUR";
  } finally {
    clearTimeout(timeout);
  }
}
