import type { SiteLanguage } from "./routeLanguage";
import { CONTACT_COPY } from "@/components/contact/contactCopy";

export type ConsultationFields = { name: string; email: string; business: string; message: string };
export type ConsultationErrors = Partial<Record<keyof ConsultationFields, "required" | "email" | "long">>;
export const EMPTY_CONSULTATION: ConsultationFields = { name: "", email: "", business: "", message: "" };
export const CONSULTATION_LIMITS = { name: 120, email: 254, business: 200, message: 5000 };
// Public Web3Forms form identifier; shared by consultation and chat enquiries.
export const CONTACT_FORM_KEY = "bfd3c955-1bc9-4a43-b497-f4c6776db7d1";

export function validateConsultation(fields: ConsultationFields): ConsultationErrors {
  const errors: ConsultationErrors = {};
  if (!fields.name.trim()) errors.name = "required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "email";
  for (const field of Object.keys(CONSULTATION_LIMITS) as (keyof ConsultationFields)[]) {
    if (fields[field].length > CONSULTATION_LIMITS[field]) errors[field] = "long";
  }
  return errors;
}

export type ConsultationTransport = (fields: ConsultationFields, locale: SiteLanguage, signal: AbortSignal) => Promise<void>;

/** Existing public form endpoint/key. Success requires the provider's explicit acknowledgement. */
export const submitConsultation: ConsultationTransport = async (fields, locale, signal) => {
  if (Object.keys(validateConsultation(fields)).length) throw new Error("Invalid consultation fields");
  const t = CONTACT_COPY[locale];
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST", signal,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: CONTACT_FORM_KEY,
      subject: `${t.subject} | DM Labs`,
      name: fields.name.trim(), email: fields.email.trim(), business: fields.business.trim(),
      message: fields.message.trim() || t.defaultMessage,
    }),
  });
  const result: unknown = await response.json();
  if (!response.ok || !result || typeof result !== "object" || !("success" in result) || result.success !== true) {
    throw new Error("Consultation acknowledgement missing");
  }
};
