import React, { useRef } from "react";
import { useInView } from "framer-motion";
import type { CAPABILITY_IDS } from "./studioCopy";

export function ServiceMark({ service }: { service: (typeof CAPABILITY_IDS)[number] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: .55 });
  const base = `/media/brand-refresh/v2/service-${service}`;
  return <span ref={ref} className="studio-service-motion" data-visible={visible} data-service={service}><img
    src={`${base}-320.webp`}
    srcSet={`${base}-160.webp 160w, ${base}-320.webp 320w`}
    sizes="(max-width: 540px) 80px, 144px"
    width="320"
    height="320"
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
  /></span>;
}
