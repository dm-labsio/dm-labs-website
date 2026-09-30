import React, { useEffect, useRef, useState, type FormEvent } from "react";
import BrandButton from "@/components/ui/brand-button";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { pricingEnquiry } from "@/lib/pricingEnquiry";
import { CONSULTATION_LIMITS, EMPTY_CONSULTATION, submitConsultation, validateConsultation, type ConsultationErrors, type ConsultationFields, type ConsultationTransport } from "@/lib/consultation";
import { CONTACT_COPY, contactPrivacy, contactWhatsApp } from "./contactCopy";

type Props = { locale: SiteLanguage; transport?: ConsultationTransport; onSuccess?: () => void };

export default function ConsultationForm({ locale, transport = submitConsultation, onSuccess }: Props) {
  const t = CONTACT_COPY[locale];
  const [fields, setFields] = useState<ConsultationFields>(() => ({ ...EMPTY_CONSULTATION, message: pricingEnquiry(locale) }));
  const [errors, setErrors] = useState<ConsultationErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const prefix = `contact-${locale}`;

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; request.current?.abort(); }; }, []);
  useEffect(() => { if (status === "success" || status === "error") statusRef.current?.focus(); }, [status]);

  const errorText = (field: keyof ConsultationFields) => errors[field] === "long" ? t.longError : field === "name" ? t.nameError : t.emailError;
  const update = (field: keyof ConsultationFields, value: string) => {
    setFields(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (request.current) return;
    const invalid = validateConsultation(fields);
    setErrors(invalid);
    const first = (Object.keys(invalid) as (keyof ConsultationFields)[])[0];
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    const controller = new AbortController();
    request.current = controller;
    setStatus("sending");
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      await transport(fields, locale, controller.signal);
      if (!mounted.current) return;
      setStatus("success");
      setFields({ ...EMPTY_CONSULTATION });
      // Analytics failure must never change an acknowledged request into an error.
      try { onSuccess?.(); } catch { /* best-effort analytics */ }
    } catch {
      if (mounted.current) setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      request.current = null;
    }
  };

  return <div className="consultation-form-panel" id="consultation-form" tabIndex={-1} lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
    {status === "success" ? <div className="consultation-success" ref={statusRef} tabIndex={-1} role="status">
      <p className="brand-micro">{t.formLabel}</p><h2>{t.successTitle}</h2><p>{t.success}</p><p className="consultation-note">{t.successNote}</p>
      <BrandButton type="button" onClick={() => { setStatus("idle"); window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input")?.focus()); }}>{t.another}</BrandButton>
    </div> : <>
      <p className="brand-micro">{t.formLabel}</p><h2 id={`${prefix}-heading`}>{t.formTitle}</h2><p className="consultation-form-intro">{t.formIntro}</p>
      <form ref={formRef} onSubmit={handleSubmit} noValidate aria-labelledby={`${prefix}-heading`}>
        <fieldset disabled={status === "sending"} className="consultation-fields">
          {(["name", "email", "business", "message"] as const).map(field => <div key={field} className={`consultation-field consultation-field--${field}`}>
            <label htmlFor={`${prefix}-${field}`}>{field === "email" ? t.emailField : t[field]}{(field === "business" || field === "message") && <span> ({t.optional})</span>}</label>
            {field === "message" ? <textarea id={`${prefix}-${field}`} name={field} rows={5} dir="auto" value={fields[field]} maxLength={CONSULTATION_LIMITS[field]} onChange={event => update(field, event.target.value)} aria-invalid={Boolean(errors[field])} aria-describedby={`${prefix}-message-hint${errors[field] ? ` ${prefix}-${field}-error` : ""}`} /> :
              <input id={`${prefix}-${field}`} name={field} type={field === "email" ? "email" : "text"} dir={field === "email" ? "ltr" : "auto"} inputMode={field === "email" ? "email" : undefined} autoComplete={field === "business" ? "organization" : field} required={field !== "business"} maxLength={CONSULTATION_LIMITS[field]} value={fields[field]} onChange={event => update(field, event.target.value)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${prefix}-${field}-error` : undefined} />}
            {field === "message" && <p className="consultation-hint" id={`${prefix}-message-hint`}>{t.messageHint}</p>}
            {errors[field] && <p className="consultation-field-error" id={`${prefix}-${field}-error`}>{errorText(field)}</p>}
          </div>)}
        </fieldset>
        {status === "error" && <div className="consultation-error" role="alert" ref={statusRef} tabIndex={-1}><h3>{t.failureTitle}</h3><p>{t.failure}</p><a href={contactWhatsApp(locale)} target="_blank" rel="noopener noreferrer">WhatsApp</a><span aria-hidden="true"> · </span><a href="mailto:info@dm-labs.io">{t.email}</a></div>}
        <BrandButton type="submit" disabled={status === "sending"} aria-busy={status === "sending"} className="consultation-submit">{status === "sending" ? t.sending : t.submit}</BrandButton>
        <span className="sr-only" role="status">{status === "sending" ? t.sending : ""}</span>
        <p className="consultation-privacy">{t.privacyNote} <a href={contactPrivacy(locale)}>{t.privacy}</a>.</p>
      </form>
    </>}
  </div>;
}
