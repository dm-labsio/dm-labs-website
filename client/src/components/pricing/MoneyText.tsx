import React from "react";

/** Keep USD and CAD explicit without crowding the large price numerals. */
export default function MoneyText({ value }: { value: string }) {
  return <>{value.split(/(USD|CAD)/).map((part, index) => /^(USD|CAD)$/.test(part)
    ? <span className="pricing-currency-code" key={index}>{part}</span> : part)}</>;
}
