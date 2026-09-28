// Dev-only manual QA entry: Vite's production input is index.html, never this fixture.
import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import ConsultationForm from "@/components/contact/ConsultationForm";
import type { ConsultationTransport } from "@/lib/consultation";
import type { SiteLanguage } from "@/lib/routeLanguage";
import "../index.css";
import "../components/contact/ContactPage.css";

function Fixture() {
  const [locale, setLocale] = useState<SiteLanguage>("en");
  const [calls, setCalls] = useState(0);
  const [pending, setPending] = useState(false);
  const settle = useRef<{ resolve: () => void; reject: () => void } | null>(null);
  const transport: ConsultationTransport = (_fields, _locale, signal) => new Promise((resolve, reject) => {
    setCalls(n => n + 1); setPending(true);
    const finish = (ok: boolean) => { setPending(false); settle.current = null; signal.removeEventListener("abort", aborted); ok ? resolve() : reject(new Error("Simulated failure")); };
    const aborted = () => finish(false);
    settle.current = { resolve: () => finish(true), reject: () => finish(false) };
    signal.addEventListener("abort", aborted, { once: true });
  });
  return <main data-brand style={{ maxWidth: 720, margin: "auto", padding: 24 }}>
    <p>LOCAL QA — no requests are sent</p>
    <label>QA language <select disabled={pending} value={locale} onChange={e => { setLocale(e.target.value as SiteLanguage); setCalls(0); }}><option value="en">English</option><option value="el">Greek</option><option value="he">Hebrew</option></select></label>
    <p>Simulated requests: {calls}</p>
    <button disabled={!pending} onClick={() => settle.current?.resolve()}>Confirm simulated request</button>{" · "}
    <button disabled={!pending} onClick={() => settle.current?.reject()}>Reject simulated request</button>
    <ConsultationForm key={locale} locale={locale} transport={transport} />
  </main>;
}
if (import.meta.env.DEV) createRoot(document.getElementById("root")!).render(<Fixture />);
