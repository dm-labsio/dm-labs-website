import React, { createContext, useContext } from "react";
import { commercialText, convertedPrice, formatMoney, type Currency } from "../../../shared/currency";
import type { SiteLanguage } from "@/lib/routeLanguage";

const CurrencyContext = createContext<Currency>("EUR");
export function CurrencyProvider({ currency, children }: { currency: Currency; children: React.ReactNode }) {
  return <CurrencyContext.Provider value={currency}>{children}</CurrencyContext.Provider>;
}
export const useCurrency = () => useContext(CurrencyContext);

export function usePricingCurrency(locale: SiteLanguage) {
  const currency = useCurrency();
  return {
    currency,
    copy: <T,>(data: T) => localizeCommercialData(data, locale, currency),
    price: (euros: number) => convertedPrice(euros, currency),
    money: (amount: number) => formatMoney(locale, amount, currency),
    euro: (euros: number) => formatMoney(locale, convertedPrice(euros, currency), currency),
    text: (copy: string) => commercialText(copy, locale, currency),
  };
}

/** Localize an explicitly selected commercial copy object before rendering/schema. */
export function localizeCommercialData<T>(data: T, locale: SiteLanguage, currency: Currency): T {
  if (typeof data === "string") return commercialText(data, locale, currency) as T;
  if (Array.isArray(data)) return data.map(item => localizeCommercialData(item, locale, currency)) as T;
  if (data && typeof data === "object") return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, localizeCommercialData(value, locale, currency)])) as T;
  return data;
}

export function Price({ euros, locale }: { euros: number; locale: SiteLanguage }) {
  const { euro } = usePricingCurrency(locale);
  return <bdi dir="ltr">{euro(euros)}</bdi>;
}
