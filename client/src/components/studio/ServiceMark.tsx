import React from "react";
import type { CAPABILITY_IDS } from "./studioCopy";

// A shared drawing grid and two inks keep the topic illustrations in one family.
const drawings: Record<(typeof CAPABILITY_IDS)[number], React.ReactNode> = {
  "custom-design": <>
    <path className="service-mark-tint" d="M44 18 72 68H16Z" />
    <path d="M44 18 72 68H16Z" />
    <path className="service-mark-accent" d="M18 48C30 14 60 76 72 38M14 48h8M68 38h8" />
    <path d="M40 14h8v8h-8zM12 64h8v8h-8zM68 64h8v8h-8z" fill="#0c172c" />
  </>,
  "mobile-first": <>
    <path className="service-mark-tint" d="M10 20h54v40H10Z" />
    <path d="M64 36V20H10v40h36M22 70h24M32 60v10" />
    <path className="service-mark-accent" d="M52 36h24v38H52ZM60 67h8" />
    <path d="m29 46 8-14 8 14Z" />
  </>,
  seo: <>
    <path className="service-mark-tint" d="M12 16h49v55H12Z" />
    <path d="M61 30V16H12v55h23M22 28h21M22 39h12M22 50h9" />
    <circle className="service-mark-accent" cx="54" cy="51" r="16" />
    <path className="service-mark-accent" d="m66 63 12 13" />
    <path d="m48 54 6-10 6 10Z" />
  </>,
  performance: <>
    <path className="service-mark-tint" d="m50 21 23 41H27Z" />
    <path d="m50 21 23 41H27ZM10 32h18M6 44h16M10 56h8" />
    <path className="service-mark-accent" d="M29 18C53 3 83 22 78 49M67 71c-12 8-29 6-38-3" />
    <circle className="service-mark-accent" cx="78" cy="49" r="3" fill="currentColor" />
  </>,
  security: <>
    <path className="service-mark-tint" d="m44 12 27 11v23c0 16-27 30-27 30S17 62 17 46V23Z" />
    <path d="m44 12 27 11v23c0 16-27 30-27 30S17 62 17 46V23Z" />
    <path className="service-mark-accent" d="m44 30 13 23H31Z" />
    <path d="M9 17v-6h8M71 77h8v-8" />
  </>,
  maps: <>
    <path className="service-mark-tint" d="m10 37 21-8 26 9 21-8v38l-21 8-26-9-21 8Z" />
    <path d="m10 37 21-8 26 9 21-8v38l-21 8-26-9-21 8ZM31 43v24M57 53v23" />
    <path className="service-mark-accent" d="M61 23c0 10-17 27-17 27S27 33 27 23a17 17 0 0 1 34 0Z" fill="#0c172c" />
    <path className="service-mark-accent" d="m44 16 6 11H38Z" />
  </>,
  forms: <>
    <path className="service-mark-tint" d="M16 12h56v64H16Z" />
    <path d="M16 12h56v64H16ZM27 26h18M27 39h34M27 51h22" />
    <path className="service-mark-accent" d="M51 59h11v9H51ZM25 64h14" />
    <path className="service-mark-accent" d="m67 6 9 16H58Z" fill="#0c172c" />
  </>,
  social: <>
    <path className="service-mark-tint" d="m44 17 28 49H16Z" />
    <path d="m39 27-17 29M49 27l17 29M27 66h34" />
    <circle className="service-mark-accent" cx="44" cy="17" r="10" />
    <circle cx="16" cy="66" r="10" />
    <circle cx="72" cy="66" r="10" />
    <path className="service-mark-accent" d="m44 42 8 14H36Z" />
  </>,
  turnaround: <>
    <path className="service-mark-tint" d="m44 26 18 31H26Z" />
    <path d="m44 26 18 31H26Z" />
    <path className="service-mark-accent" d="M16 35a29 29 0 0 1 55-4M72 53a29 29 0 0 1-55 4" />
    <path d="M10 45v10h10M78 43V33H68" />
    <circle className="service-mark-accent" cx="16" cy="35" r="3" fill="currentColor" />
    <circle className="service-mark-accent" cx="72" cy="53" r="3" fill="currentColor" />
  </>,
};

export function ServiceMark({ service }: { service: (typeof CAPABILITY_IDS)[number] }) {
  return <svg viewBox="0 0 88 88" width="88" height="88" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false">{drawings[service]}</svg>;
}
