import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ArrowRight, Check, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// ─── CDN URLs - all fresh uploads Expires=1804155913+ ───────────────────────
const CDN = {
  r1: {
    card:           "/media/manus/UOnSAZrlsOnIfDWm.webp",
    homeDesktop:    "/media/manus/SEvpeppetOfwJJNB.webp",
    homeMobile:     "/media/manus/UrnWckquAWyhaYFT.webp",
    menuDesktop:    "/media/manus/NXilbOFPBvEaQoFY.webp",
    menuMobile:     "/media/manus/eRFisuQAOenLYaQC.webp",
    contactDesktop: "/media/manus/PqhWypJjcbMmteom.webp",
    contactMobile:  "/media/manus/KoGromdjtZavrFsa.webp",
  },
  r2: {
    card:           "/media/manus/kmUffrELzBPBtqPl.webp",
    homeDesktop:    "/media/manus/XwykHFJRTqKzfIao.webp",
    homeMobile:     "/media/manus/JxsFjnNbHPncpuMc.webp",
    menuDesktop:    "/media/manus/TwiwcDHHgIBYPeqN.webp",
    menuMobile:     "/media/manus/BUmUKPVIOtNORQZN.webp",
    contactDesktop: "/media/manus/aVNdgLFQXQnPTMsI.webp",
    contactMobile:  "/media/manus/cKshlliQtDXUdcGl.webp",
  },
  r3: {
    card:           "/media/manus/IsbrZZbpHbUmLwwu.webp",
    homeDesktop:    "/media/manus/bdoBTsSWArOeQriA.webp",
    homeMobile:     "/media/manus/TSUSpDNrnIFxCiKW.webp",
    menuDesktop:    "/media/manus/IjNNEAHqGKXXwzeb.webp",
    menuMobile:     "/media/manus/vFYLHPtdaNoKeQav.webp",
    contactDesktop: "/media/manus/MmOmyWVbwVxvaRGy.webp",
    contactMobile:  "/media/manus/QeKYqJxcUsmrjLkh.webp",
  },
  r4: {
    card:           "/media/manus/iYVawESYSulmHHVM.webp",
    homeDesktop:    "/media/manus/fHyKIfGLXnXWiHan.webp",
    homeMobile:     "/media/manus/pQVFpNclGHLHgqgu.webp",
    menuDesktop:    "/media/manus/HMYIIPAeGvnYGxaU.webp",
    menuMobile:     "/media/manus/EexQikoQVucNhDpZ.webp",
    contactDesktop: "/media/manus/TxEYEKzSDqojISiL.webp",
    contactMobile:  "/media/manus/VYmjqqMKDpqwxfPx.webp",
  },
  b1: {
    card:           "/media/manus/JyHQRjqPVlblrfxy.webp",
    homeDesktop:    "/media/manus/mkwXpPknntRzYJtF.webp",
    homeMobile:     "/media/manus/glPXgwhAwFymOCMF.webp",
    servicesDesktop:"/media/manus/nhLdJgpyoqaFLpva.webp",
    servicesMobile: "/media/manus/GCxQAELZSsclOnPh.webp",
    contactDesktop: "/media/manus/QTuOFGHPtTmQYcxN.webp",
    contactMobile:  "/media/manus/xnTYcPlbVHLcwLwV.webp",
  },
  b2: {
    card:           "/media/manus/YGtbBkfQAFlKcslg.webp",
    homeDesktop:    "/media/manus/JmNoAxJseLXRDfgT.webp",
    homeMobile:     "/media/manus/VscAMZaELdZLaVFZ.webp",
    servicesDesktop:"/media/manus/ZNnGvKMbPhEwuQYG.webp",
    servicesMobile: "/media/manus/FmrOethWQtLAKJZC.webp",
    contactDesktop: "/media/manus/ZNnGvKMbPhEwuQYG.webp",
    contactMobile:  "/media/manus/rkFkQuzsELVeVHTo.webp",
  },
  b3: {
    card:           "/media/manus/uVKuMEfdHQCjujxn.webp",
    homeDesktop:    "/media/manus/NVTeQidRRmePHdqS.webp",
    homeMobile:     "/media/manus/LSEUIfuqufrRTMUs.webp",
    servicesDesktop:"/media/manus/DFvKTdhFYpzVyeOo.webp",
    servicesMobile: "/media/manus/eTDGLdMCoTZoEbpj.webp",
    contactDesktop: "/media/manus/NbHQgWjHqDAdyOOK.webp",
    contactMobile:  "/media/manus/kRPSDMLyzlQsfdaA.webp",
  },
  b4: {
    card:           "/media/manus/incAkGiBBarJSrgs.webp",
    homeDesktop:    "/media/manus/KgazPdTsZetPEIJp.webp",
    homeMobile:     "/media/manus/jlOkVxemyMIvYtbP.webp",
    servicesDesktop:"/media/manus/JcQPplGeUjKwPYmS.webp",
    servicesMobile: "/media/manus/QJqRSqkBLFOJTeqr.webp",
    contactDesktop: "/media/manus/PRWXpMxlGwHmMFfC.webp",
    contactMobile:  "/media/manus/QiUFEwUITGElevmR.webp",
  },
  // ── Clinic 1 ──
  c1: {
    card:            "/media/manus/vHiXcgVzfwvNVOeM.webp",
    homeDesktop:     "/media/manus/YCnlUDrgdfYcRFcp.webp",
    homeMobile:      "/media/manus/SoSmnaYEMYNtborV.webp",
    servicesDesktop: "/media/manus/EBGosAATQGJrDRrO.webp",
    servicesMobile:  "/media/manus/shleiZcAylwlZFko.webp",
    contactDesktop:  "/media/manus/fLgMqFfxfaBAZUUg.webp",
    contactMobile:   "/media/manus/IeKYfaoTBkvBtsGW.webp",
  },
  // ── Clinic 2 ──
  c2: {
    card:            "/media/manus/YbjSXbLAerjQxXvn.webp",
    homeDesktop:     "/media/manus/xdClqTPSaZedbOrH.webp",
    homeMobile:      "/media/manus/bpTeQMAzkYPxDtQG.webp",
    servicesDesktop: "/media/manus/IrKtVBivvGJLlxXq.webp",
    servicesMobile:  "/media/manus/DHjvqNlizRvZpkBh.webp",
    contactDesktop:  "/media/manus/BQfFdAkGYebKMKpk.webp",
    contactMobile:   "/media/manus/RkvwuDSBgYRbTqkU.webp",
  },
  // ── Clinic 3 ──
  c3: {
    card:            "/media/manus/ChvLohPuUByZeIQC.webp",
    homeDesktop:     "/media/manus/NHQujbHpKEVeITwp.webp",
    homeMobile:      "/media/manus/uavEwuXtbwJlQxCh.webp",
    servicesDesktop: "/media/manus/IkjsPNxJuaiuzcxz.webp",
    servicesMobile:  "/media/manus/EAPtMQrSPrviqxBc.webp",
    contactDesktop:  "/media/manus/HmjUPHfgkXKrwmUi.webp",
    contactMobile:   "", // Source unavailable (HTTP 403); this legacy screenshot map is not rendered.
  },
  // ── Fitness 1 ──
  f1: {
    card:            "/media/manus/MgTbsRcvqoiXiYbH.webp",
    homeDesktop:     "/media/manus/SPFIMdyocJfvNgUg.webp",
    homeMobile:      "/media/manus/NbnbjgpLHjCqlaND.webp",
    servicesDesktop: "/media/manus/fzhBYVDYdMZwWzSW.webp",
    servicesMobile:  "/media/manus/pVofdJtBxjtWPRnG.webp",
    contactDesktop:  "/media/manus/dwsiQRBVsDHirGfC.webp",
    contactMobile:   "/media/manus/BKpCjEWdimSQcHBz.webp",
  },
  // ── Fitness 2 ──
  f2: {
    card:            "/media/manus/DHunfxWXbmZPGjxJ.webp",
    homeDesktop:     "/media/manus/JtNJcvmMdIcsxfuT.webp",
    homeMobile:      "/media/manus/ZqytkHiGFTkpiDMo.webp",
    servicesDesktop: "/media/manus/kmSnubLAQhhgWiTo.webp",
    servicesMobile:  "/media/manus/sBMGMjPSjdwPLICt.webp",
    contactDesktop:  "/media/manus/WqWEFvWUEoLNZqgI.webp",
    contactMobile:   "/media/manus/qxjutkZlzdoHvUbe.webp",
  },
  // ── Fitness 3 ──
  f3: {
    card:            "/media/manus/QBsSNVdHmBlaibGE.webp",
    homeDesktop:     "/media/manus/PupniWGtadNIoPMs.webp",
    homeMobile:      "/media/manus/qUfmcEHAKKoQSfvf.webp",
    servicesDesktop: "/media/manus/kYdgLBULoTaXevYV.webp",
    servicesMobile:  "/media/manus/FANwKqWNSjtyDKnE.webp",
    contactDesktop:  "/media/manus/NdPIdheuOigsEXrU.webp",
    contactMobile:   "/media/manus/EynEblQKKCvTPftb.webp",
  },
};



// ─── Browser Chrome Frame ─────────────────────────────────────────────────────
// Renders a mini-site inside a realistic phone shell at 390px viewport width.
// The entire phone is then scaled down proportionally to fit the modal column.
// Clean mobile preview: renders the iframe at 390px width (iPhone viewport) inside a
// centered container. No phone shell - just the site at mobile width, scrollable.

// ─── Template Card Preview ────────────────────────────────────────────────────
// For live-preview templates: responsive iframe thumbnail that scales to actual card width.
// Uses a ResizeObserver to compute the correct scale factor dynamically on any screen size.
// ─── Template Card Preview ────────────────────────────────────────────────────
// Static crafted visual: shows the template palette, style label, mock layout sketch,
// and a "LIVE PREVIEW" badge. Fully responsive, no iframes, works on any screen size.
// ─── Template Card Preview ────────────────────────────────────────────────────
const CARD_DESIGNS: Record<string, React.FC> = {

  "bella-salon": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#f7f0e8" }}>
      <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80" alt="" style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #f7f0e8 45%, transparent 75%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", background: "rgba(247,240,232,0.95)", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "13px", fontWeight: 700, color: "#2a1a14", letterSpacing: "0.04em" }}>Bella.</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Services","About","Gallery","Book"].map(l => <span key={l} style={{ fontSize: "8px", color: "#7a5a4a", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
        <div style={{ background: "#c4735a", color: "#fff", fontSize: "8px", padding: "3px 10px", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Book Now</div>
      </div>
      <div style={{ position: "absolute", top: "56px", left: "18px", maxWidth: "48%" }}>
        <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c4735a", marginBottom: "6px" }}>Beauty Studio</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#2a1a14", lineHeight: 1.2, marginBottom: "8px", fontStyle: "italic" as const }}>Where Beauty<br/><em style={{ color: "#c4735a" }}>Meets</em> Artistry</div>
        <div style={{ fontSize: "8px", color: "#7a5a4a", lineHeight: 1.5, marginBottom: "10px" }}>Expert hair, skin &amp; nail treatments<br/>in a luxurious environment.</div>
        <div style={{ background: "#c4735a", color: "#fff", fontSize: "8px", padding: "5px 14px", display: "inline-block", letterSpacing: "0.1em" }}>Book a Treatment</div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "18px", display: "flex", gap: "4px" }}>
        {["#f7f0e8","#c4735a","#2a1a14","#e8d5c4","#f0e8e0"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.1)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "verde-restaurant": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#0d1a0f" }}>
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,26,15,0.4) 0%, rgba(13,26,15,0.85) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "13px", fontWeight: 700, color: "#e8f0e0", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Verde</span>
        <div style={{ display: "flex", gap: "14px" }}>
          {["Menu","Story","Reserve"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(232,240,224,0.7)", letterSpacing: "0.08em" }}>{l}</span>)}
        </div>
        <div style={{ border: "1px solid #7ab060", color: "#7ab060", fontSize: "8px", padding: "3px 10px" }}>Reserve</div>
      </div>
      <div style={{ position: "absolute", bottom: "28px", left: "18px" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#7ab060", marginBottom: "5px" }}>Ristorante - Limassol</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 400, color: "#e8f0e0", lineHeight: 1.1, marginBottom: "8px", fontStyle: "italic" as const }}>Taste the<br/>Mediterranean</div>
        <div style={{ background: "#7ab060", color: "#fff", fontSize: "8px", padding: "5px 14px", display: "inline-block" }}>View Menu</div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", right: "14px", display: "flex", gap: "4px" }}>
        {["#0d1a0f","#7ab060","#c8a96e","#e8f0e0","#2d4a20"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.15)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "pulse-gym": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#0a0a0a" }}>
      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, rgba(255,107,53,0.15) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(255,107,53,0.2)" }}>
        <span style={{ fontFamily: "Impact, sans-serif", fontSize: "14px", fontWeight: 900, color: "#ff6b35", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>PULSE</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Classes","Trainers","Join"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
        <div style={{ background: "#ff6b35", color: "#fff", fontSize: "8px", padding: "3px 10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Join Now</div>
      </div>
      <div style={{ position: "absolute", top: "52px", left: "18px" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#ff6b35", marginBottom: "4px" }}>Limassol - Est. 2019</div>
        <div style={{ fontFamily: "Impact, sans-serif", fontSize: "28px", fontWeight: 900, color: "#fff", lineHeight: 1.0, textTransform: "uppercase" as const, letterSpacing: "0.02em", marginBottom: "6px" }}>PUSH<br/><span style={{ color: "#ff6b35" }}>YOUR</span><br/>LIMITS</div>
        <div style={{ background: "#ff6b35", color: "#fff", fontSize: "8px", padding: "5px 14px", display: "inline-block", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Start Free Trial</div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "18px", display: "flex", gap: "4px" }}>
        {["#0a0a0a","#ff6b35","#ffa500","#1a1a2e","#ffffff"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.15)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "dr-elara-dental": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#f5f9ff" }}>
      <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=80" alt="" style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #f5f9ff 48%, transparent 72%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", background: "rgba(245,249,255,0.97)", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(33,150,243,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "#2196f3" }} />
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#0a1628" }}>Dr. Elara Dental</span>
        </div>
        <div style={{ background: "#2196f3", color: "#fff", fontSize: "8px", padding: "4px 10px", borderRadius: "4px", fontWeight: 600 }}>Book Appointment</div>
      </div>
      <div style={{ position: "absolute", top: "50px", left: "18px", maxWidth: "50%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ fontSize: "8px", color: "#2196f3", fontWeight: 600 }}>Accepting New Patients</span>
        </div>
        <div style={{ fontSize: "20px", fontWeight: 800, color: "#0a1628", lineHeight: 1.15, marginBottom: "6px" }}>Your Smile,<br/><span style={{ color: "#2196f3", fontStyle: "italic" as const, fontFamily: "Georgia, serif" }}>Perfected</span><br/>with Care</div>
        <div style={{ fontSize: "8px", color: "#4a6080", lineHeight: 1.5, marginBottom: "10px" }}>Modern dentistry in a calm,<br/>comfortable environment.</div>
        <div style={{ background: "#2196f3", color: "#fff", fontSize: "8px", padding: "5px 14px", display: "inline-block", borderRadius: "4px", fontWeight: 600 }}>View Treatments</div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "18px", display: "flex", gap: "4px" }}>
        {["#f5f9ff","#2196f3","#0a1628","#64b5f6","#1e3a5f"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.1)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "nomad-coffee": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#1a1208" }}>
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,18,8,0.88) 40%, rgba(26,18,8,0.3) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "12px", fontWeight: 700, color: "#c8a96e", letterSpacing: "0.06em" }}>Nomad Co.</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Menu","Story","Beans","Events"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(200,169,110,0.7)" }}>{l}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", top: "52px", left: "18px", maxWidth: "55%" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#c8a96e", marginBottom: "5px" }}>Specialty Coffee - Limassol</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#f7f0e6", lineHeight: 1.2, marginBottom: "6px" }}>Coffee Worth<br/><em style={{ color: "#c8a96e" }}>Slow Down</em> For</div>
        <div style={{ fontSize: "8px", color: "rgba(247,240,230,0.65)", lineHeight: 1.5, marginBottom: "10px" }}>Single-origin beans, hand-roasted<br/>in small batches.</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ background: "#c8a96e", color: "#1a1208", fontSize: "8px", padding: "5px 12px", fontWeight: 700 }}>View Our Menu</div>
          <div style={{ border: "1px solid rgba(200,169,110,0.5)", color: "#c8a96e", fontSize: "8px", padding: "5px 12px" }}>Our Story</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "18px", display: "flex", gap: "4px" }}>
        {["#1a1208","#8b6914","#c8a96e","#f7f0e6","#3d2b1f"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.12)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "serenity-yoga": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#1a2420" }}>
      <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,36,32,0.5) 0%, rgba(26,36,32,0.9) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "12px", fontWeight: 400, color: "#8bb5a8", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Serenity Yoga</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Classes","Schedule","Teachers","Pricing"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(139,181,168,0.7)" }}>{l}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "28px", left: "18px" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#8bb5a8", marginBottom: "5px" }}>Yoga Studio - Limassol</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#f0f7f4", lineHeight: 1.2, marginBottom: "8px", fontStyle: "italic" as const }}>Find Your<br/><em style={{ color: "#8bb5a8" }}>Still</em> Place</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ background: "#4a7c6f", color: "#f0f7f4", fontSize: "8px", padding: "5px 12px" }}>View Classes</div>
          <div style={{ border: "1px solid rgba(139,181,168,0.4)", color: "#8bb5a8", fontSize: "8px", padding: "5px 12px" }}>View Schedule</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", right: "14px", display: "flex", gap: "4px" }}>
        {["#1a2420","#4a7c6f","#8bb5a8","#f0f7f4","#2d4a3e"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.12)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "luxe-realty": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#0a0a0a" }}>
      <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.85) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(184,151,90,0.2)" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontWeight: 400, color: "#b8975a", letterSpacing: "0.25em", textTransform: "uppercase" as const }}>Luxe.Realty</span>
        <div style={{ display: "flex", gap: "14px" }}>
          {["Properties","About","Visa Guide"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(184,151,90,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "28px", left: "18px" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#b8975a", marginBottom: "5px" }}>Athens - Premium Properties</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#f8f4ec", lineHeight: 1.2, marginBottom: "8px", fontStyle: "italic" as const }}>Extraordinary<br/>Homes in Greece</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ background: "#b8975a", color: "#0a0a0a", fontSize: "8px", padding: "5px 14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>View Properties</div>
          <div style={{ border: "1px solid rgba(184,151,90,0.4)", color: "#b8975a", fontSize: "8px", padding: "5px 12px" }}>Visa Guide</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", right: "14px", display: "flex", gap: "4px" }}>
        {["#0a0a0a","#b8975a","#f8f4ec","#142035","#8a9ab5"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.12)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "46px", right: "8px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "little-stars-nursery": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#fffbf5" }}>
      <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=700&q=80" alt="" style={{ position: "absolute", right: 0, top: 0, width: "52%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fffbf5 46%, transparent 72%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", background: "rgba(255,251,245,0.97)", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(240,106,80,0.12)" }}>
        <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: "#2d2416" }}>Little Stars</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["About","Programmes","Visit"].map(l => <span key={l} style={{ fontSize: "8px", color: "#7a5a4a" }}>{l}</span>)}
        </div>
        <div style={{ background: "#f06a50", color: "#fff", fontSize: "8px", padding: "3px 10px", borderRadius: "20px", fontWeight: 700 }}>Book a Visit</div>
      </div>
      <div style={{ position: "absolute", top: "52px", left: "18px", maxWidth: "48%" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#f06a50", marginBottom: "5px" }}>Nursery - Athens</div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "20px", fontWeight: 800, color: "#2d2416", lineHeight: 1.2, marginBottom: "6px" }}>Where Little<br/>Ones <span style={{ color: "#f06a50" }}>Thrive</span></div>
        <div style={{ fontSize: "8px", color: "#7a5a4a", lineHeight: 1.5, marginBottom: "10px" }}>A nurturing environment for<br/>children aged 3 months to 5 years.</div>
        <div style={{ background: "#f06a50", color: "#fff", fontSize: "8px", padding: "5px 14px", display: "inline-block", borderRadius: "20px", fontWeight: 700 }}>Book a Visit</div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "18px", display: "flex", gap: "4px" }}>
        {["#fffbf5","#f06a50","#5bb8d4","#f5c842","#2d2416"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.1)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "arcos-architecture": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#f4f1ec" }}>
      <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=700&q=80" alt="" style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #f4f1ec 44%, transparent 68%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", background: "rgba(244,241,236,0.97)", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(26,25,22,0.1)" }}>
        <span style={{ fontSize: "11px", fontWeight: 800, color: "#1a1916", letterSpacing: "0.15em", textTransform: "uppercase" as const }}>ARCOS</span>
        <div style={{ display: "flex", gap: "14px" }}>
          {["Work","Studio","Services","Contact"].map(l => <span key={l} style={{ fontSize: "8px", color: "#7a7568", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", top: "52px", left: "18px", maxWidth: "46%" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c4613a", marginBottom: "5px" }}>Architecture Studio</div>
        <div style={{ fontSize: "22px", fontWeight: 800, color: "#1a1916", lineHeight: 1.1, textTransform: "uppercase" as const, letterSpacing: "0.02em", marginBottom: "8px" }}>SPACE<br/>THAT<br/><span style={{ color: "#c4613a" }}>SPEAKS</span></div>
        <div style={{ fontSize: "8px", color: "#7a7568", lineHeight: 1.5, marginBottom: "10px" }}>Architecture that bridges<br/>concept and craft.</div>
        <div style={{ background: "#1a1916", color: "#f4f1ec", fontSize: "8px", padding: "5px 14px", display: "inline-block", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>View Projects</div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "18px", display: "flex", gap: "4px" }}>
        {["#f4f1ec","#c4613a","#1a1916","#2d2b27","#7a7568"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.1)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "olio-deli": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#1e1c17" }}>
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(30,28,23,0.85) 0%, rgba(74,94,42,0.3) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(200,151,58,0.2)" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "13px", fontWeight: 700, color: "#c8973a", letterSpacing: "0.08em", fontStyle: "italic" as const }}>Olio Deli</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Menu","Story","Products"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(200,151,58,0.7)" }}>{l}</span>)}
        </div>
        <div style={{ border: "1px solid #c8973a", color: "#c8973a", fontSize: "8px", padding: "3px 10px" }}>Order Now</div>
      </div>
      <div style={{ position: "absolute", bottom: "28px", left: "18px" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c8973a", marginBottom: "5px" }}>Artisan Deli - Athens</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#faf6ef", lineHeight: 1.2, marginBottom: "8px", fontStyle: "italic" as const }}>The Finest<br/>Mediterranean Larder</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ background: "#c8973a", color: "#1e1c17", fontSize: "8px", padding: "5px 14px", fontWeight: 700 }}>Browse Products</div>
          <div style={{ border: "1px solid rgba(200,151,58,0.4)", color: "#c8973a", fontSize: "8px", padding: "5px 12px" }}>Our Story</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", right: "14px", display: "flex", gap: "4px" }}>
        {["#1e1c17","#4a5e2a","#c8973a","#faf6ef","#7a7060"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.12)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "42px", right: "8px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),

  "horizon-law": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#0c1524" }}>
      <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(12,21,36,0.6) 0%, rgba(12,21,36,0.92) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(184,151,90,0.15)" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontWeight: 400, color: "#b8975a", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>Horizon Law</span>
        <div style={{ display: "flex", gap: "14px" }}>
          {["Practice","Team","Insights"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(184,151,90,0.65)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
        <div style={{ border: "1px solid #b8975a", color: "#b8975a", fontSize: "8px", padding: "3px 10px" }}>Consult</div>
      </div>
      <div style={{ position: "absolute", bottom: "28px", left: "18px" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#b8975a", marginBottom: "5px" }}>Law Firm - Athens</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#f8f4ec", lineHeight: 1.2, marginBottom: "8px", fontStyle: "italic" as const }}>Justice Pursued.<br/><em style={{ color: "#b8975a" }}>Excellence</em> Delivered.</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ background: "#b8975a", color: "#0c1524", fontSize: "8px", padding: "5px 14px", fontWeight: 700 }}>Our Practice Areas</div>
          <div style={{ border: "1px solid rgba(184,151,90,0.35)", color: "#b8975a", fontSize: "8px", padding: "5px 12px" }}>Meet the Team</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px", right: "14px", display: "flex", gap: "4px" }}>
        {["#0c1524","#b8975a","#f8f4ec","#142035","#8a9ab5"].map((c,i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.12)" }} />)}
      </div>
      <div style={{ position: "absolute", top: "46px", right: "8px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  ),
};

function TemplateCardPreview({ template }: { template: typeof TEMPLATES[0] }) {
  const Design = CARD_DESIGNS[template.id];
  if (Design) return <Design />;
  const t = template as any;
  const palette: string[] = t.palette || ["#1a1a2e","#16213e","#0f3460","#e94560","#f5f5f5"];
  const [bg, accent1] = palette;
  return (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: `linear-gradient(145deg, ${bg} 0%, ${accent1} 100%)` }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", opacity: 0.9 }}>{template.name}</div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{t.tagline}</div>
      </div>
      <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>Demo</span>
      </div>
    </div>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { id: "all", label: "All Industries", icon: "✦" },
  { id: "restaurant", label: "Restaurants & Cafés", icon: "☕" },
  { id: "beauty", label: "Beauty & Wellness", icon: "✂" },
  { id: "clinic", label: "Clinics & Health", icon: "+" },
  { id: "fitness", label: "Fitness & Sport", icon: "◈" },
  { id: "realestate", label: "Real Estate", icon: "◻" },
  { id: "childcare", label: "Childcare", icon: "◎" },
  { id: "architecture", label: "Architecture", icon: "△" },
  { id: "deli", label: "Deli & Food Store", icon: "◇" },
  { id: "legal", label: "Legal Services", icon: "▣" },
];

// ─── Template data (live-preview only) ───────────────────────────────────────────────────────────
const TEMPLATES = [
  // ── Live Preview templates ──
  {
    id: "bella-salon",
    industry: "beauty",
    name: "Bella Salon",
    tagline: "Elegant & Feminine",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "bellasalon.com",
    palette: ["#1a0a0f", "#6b2d3e", "#c4748a", "#e8b4c0", "#fdf0f3"],
    paletteNames: ["Deep Plum", "Rose Dark", "Dusty Rose", "Blush", "Ivory"],
    styleLabel: "Luxury Feminine",
    livePreview: true,
    previewUrl: "/previews/bella-salon.html",
    features: [
      "Elegant hero with booking CTA",
      "Services showcase with pricing",
      "Gallery / portfolio section",
      "About our stylists",
      "Contact & appointment form",
      "Location & hours",
      "WhatsApp CTA",
      "Mobile responsive",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Luxury feminine aesthetic with deep plum and rose tones, elegant serif typography, and a warm, inviting feel. Perfect for hair salons, beauty studios, and nail bars.",
    waMessage: "Hi! I'm interested in the Bella Salon website design.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "verde-restaurant",
    industry: "restaurant",
    name: "Verde Restaurant",
    tagline: "Fresh & Mediterranean",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "verderestaurant.com",
    palette: ["#1a2e1a", "#2d5a27", "#4a8c3f", "#8bc34a", "#f5f9f0"],
    paletteNames: ["Forest", "Deep Green", "Leaf", "Fresh Green", "Cream"],
    styleLabel: "Fresh Mediterranean",
    livePreview: true,
    previewUrl: "/previews/verde-restaurant.html",
    features: [
      "Full-width hero with reservation CTA",
      "Signature dishes showcase",
      "Menu page with categories",
      "About / Our Story section",
      "Contact & reservation form",
      "Google Maps embed",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Fresh Mediterranean aesthetic with deep green tones, warm cream backgrounds, and elegant typography. Ideal for farm-to-table restaurants, Mediterranean cuisine, and healthy dining.",
    waMessage: "Hi! I'm interested in the Verde Restaurant website design.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "pulse-gym",
    industry: "fitness",
    name: "PulseGym",
    tagline: "Bold & High-Energy",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "pulsegym.com",
    palette: ["#0a0a0a", "#1a1a2e", "#ff6b35", "#ffa500", "#ffffff"],
    paletteNames: ["Black", "Dark Navy", "Orange", "Amber", "White"],
    styleLabel: "Dark Bold",
    livePreview: true,
    previewUrl: "/previews/pulse-gym.html",
    features: [
      "Bold dark hero with membership CTA",
      "Class schedule & programmes",
      "Trainer profiles",
      "Membership plans",
      "Contact & trial booking",
      "Location & hours",
      "WhatsApp CTA",
      "Mobile responsive",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "High-energy dark aesthetic with black and orange accents, bold typography, and dynamic layouts. Perfect for gyms, CrossFit boxes, and strength training studios.",
    waMessage: "Hi! I'm interested in the PulseGym website design.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "dr-elara-dental",
    industry: "clinic",
    name: "Dr. Elara Dental",
    tagline: "Clean & Professional",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "elaradental.com",
    palette: ["#0a1628", "#1e3a5f", "#2196f3", "#64b5f6", "#f5f9ff"],
    paletteNames: ["Dark Navy", "Navy", "Blue", "Light Blue", "Ice White"],
    styleLabel: "Clean Clinical",
    livePreview: true,
    previewUrl: "/previews/dr-elara-dental.html",
    features: [
      "Professional hero with booking CTA",
      "Dental services showcase",
      "Doctor profiles section",
      "Patient testimonials",
      "Contact & appointment form",
      "Location & hours",
      "WhatsApp CTA",
      "Mobile responsive",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Clean, professional aesthetic with navy and blue accents on white backgrounds. Perfect for dental clinics, medical offices, and healthcare providers.",
    waMessage: "Hi! I'm interested in the Dr. Elara Dental website design.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "nomad-coffee",
    industry: "restaurant",
    name: "Nomad Coffee",
    tagline: "Artisan & Minimal",
    tier: "Launch",
    tierGradient: "linear-gradient(135deg, #5B8CFF, #3B6CDF)",
    domain: "nomadcoffee.com",
    palette: ["#1a1208", "#3d2b1f", "#8b6914", "#c8a96e", "#f7f0e6"],
    paletteNames: ["Espresso", "Dark Brown", "Gold", "Caramel", "Cream"],
    styleLabel: "Artisan Minimal",
    livePreview: true,
    previewUrl: "/previews/nomad-coffee.html",
    features: [
      "Minimal hero with daily specials",
      "Signature coffee showcase",
      "Menu with categories",
      "About / Our Story section",
      "Contact & find us page",
      "Phone number CTA",
      "WhatsApp & social links",
      "Mobile responsive",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Artisan minimal aesthetic with espresso and gold tones, clean typography, and a warm, inviting feel. Great for specialty coffee shops, artisan roasters, and café bars.",
    waMessage: "Hi! I'm interested in the Nomad Coffee website design.",
    price: "€250",
    images: { card: "" },
  },
  {
    id: "serenity-yoga",
    industry: "fitness",
    name: "Serenity Yoga",
    tagline: "Calm & Balanced",
    tier: "Launch",
    tierGradient: "linear-gradient(135deg, #5B8CFF, #3B6CDF)",
    domain: "serenityyoga.com",
    palette: ["#1a2420", "#2d4a3e", "#4a7c6f", "#8bb5a8", "#f0f7f4"],
    paletteNames: ["Forest Dark", "Deep Teal", "Sage", "Mint", "Pale Green"],
    styleLabel: "Calm Natural",
    livePreview: true,
    previewUrl: "/previews/serenity-yoga.html",
    features: [
      "Serene hero with class booking CTA",
      "Yoga class schedule",
      "Instructor profiles",
      "Wellness philosophy section",
      "Contact & booking form",
      "Location & hours",
      "WhatsApp CTA",
      "Mobile responsive",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Calm, balanced aesthetic with deep teal and sage tones, natural textures, and clean typography. Ideal for yoga studios, pilates centres, and mindfulness spaces.",
    waMessage: "Hi! I'm interested in the Serenity Yoga website design.",
    price: "€250",
    images: { card: "" },
  },
  // ── Fitness templates ──
  // ── Batch 2: Athens / Greece ──
  {
    id: "luxe-realty",
    industry: "realestate",
    name: "Luxe Realty",
    tagline: "Luxury & Investment",
    tier: "Pro",
    tierGradient: "linear-gradient(135deg, #c9a96e, #9a7040)",
    domain: "luxerealty.gr",
    palette: ["#0a0a08", "#111110", "#c9a96e", "#f5f0e8", "#888880"],
    paletteNames: ["Black", "Dark", "Champagne", "Cream", "Muted"],
    features: [
      "Full-screen hero with property search bar",
      "Featured property listings grid",
      "Golden Visa services section",
      "Contact & enquiry form",
      "SEO-optimised for Athens property",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Dark luxury editorial with Cormorant Garamond serif, champagne gold accents, and cinematic full-screen photography. Ideal for premium real estate agencies.",
    waMessage: "Hi! I'm interested in the Luxe Realty website design.",
    price: "€450",
    images: { card: "" },
    livePreview: true,
    previewUrl: "/previews/luxe-realty.html",
  },
  {
    id: "little-stars-nursery",
    industry: "childcare",
    name: "Little Stars Nursery",
    tagline: "Warm & Playful",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #f06a50, #d04030)",
    domain: "littlestarsnursery.gr",
    palette: ["#2d2416", "#f06a50", "#5bb8d4", "#f5c842", "#fffbf5"],
    paletteNames: ["Ink", "Coral", "Sky", "Yellow", "Cream"],
    features: [
      "Age-group programme cards",
      "About & values section",
      "Parent testimonials",
      "Nursery visit booking form",
      "SEO-optimised for Athens childcare",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Warm, rounded Nunito typography with coral and sky accents on a cream base. Friendly design with organic shapes. Ideal for nurseries and childcare.",
    waMessage: "Hi! I'm interested in the Little Stars Nursery website design.",
    price: "€299",
    images: { card: "" },
    livePreview: true,
    previewUrl: "/previews/little-stars-nursery.html",
  },
  {
    id: "arcos-architecture",
    industry: "architecture",
    name: "Arcos Architecture",
    tagline: "Brutalist & Minimal",
    tier: "Pro",
    tierGradient: "linear-gradient(135deg, #c4613a, #8a3a1a)",
    domain: "arcosarchitecture.gr",
    palette: ["#1a1916", "#2d2b27", "#c4613a", "#f4f1ec", "#7a7568"],
    paletteNames: ["Charcoal", "Dark", "Terracotta", "Paper", "Muted"],
    features: [
      "Split-screen hero with full-bleed image",
      "Masonry project portfolio grid",
      "Services with numbered layout",
      "Studio story & stats",
      "SEO-optimised for Athens architecture",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Brutalist minimal with Syne display font, off-white paper tones, and terracotta accents. Asymmetric split layouts. Ideal for architecture studios.",
    waMessage: "Hi! I'm interested in the Arcos Architecture website design.",
    price: "€450",
    images: { card: "" },
    livePreview: true,
    previewUrl: "/previews/arcos-architecture.html",
  },
  {
    id: "olio-deli",
    industry: "deli",
    name: "Olio Deli",
    tagline: "Warm Mediterranean",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #4a5e2a, #2a3a10)",
    domain: "oliodeli.gr",
    palette: ["#1e1c17", "#4a5e2a", "#c8973a", "#faf6ef", "#7a7060"],
    paletteNames: ["Ink", "Olive", "Gold", "Cream", "Muted"],
    features: [
      "Split-screen hero with product photography",
      "Category grid with hover overlays",
      "Featured products with pricing",
      "Our story section",
      "SEO-optimised for Athens deli",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Warm Mediterranean with Playfair Display serif, deep olive and gold tones. Ideal for artisan delis, food shops, and specialty grocers.",
    waMessage: "Hi! I'm interested in the Olio Deli website design.",
    price: "€299",
    images: { card: "" },
    livePreview: true,
    previewUrl: "/previews/olio-deli.html",
  },
  {
    id: "horizon-law",
    industry: "legal",
    name: "Horizon Law",
    tagline: "Authoritative & Dark",
    tier: "Pro",
    tierGradient: "linear-gradient(135deg, #b8975a, #7a6030)",
    domain: "horizonlaw.gr",
    palette: ["#0c1524", "#142035", "#b8975a", "#f8f4ec", "#8a9ab5"],
    paletteNames: ["Navy", "Dark Navy", "Gold", "Cream", "Muted"],
    features: [
      "Full-screen hero with atmospheric photography",
      "6 practice area cards",
      "Attorney profiles with portraits",
      "Client testimonials",
      "SEO-optimised for Athens law firm",
    ],
    pages: [
      { label: "Live Preview", preview: "live", description: "Fully interactive live preview  -  scroll, click, and explore the full website" },
    ],
    style: "Authoritative dark with EB Garamond serif, deep navy and warm gold. Ideal for law firms, legal consultancies, and professional services.",
    waMessage: "Hi! I'm interested in the Horizon Law website design.",
    price: "€450",
    images: { card: "" },
    livePreview: true,
    previewUrl: "/previews/horizon-law.html",
  },
];
// ─── Template Detail Modal ────────────────────────────────────────────────────
function TemplateModal({ template, onClose }: { template: typeof TEMPLATES[0]; onClose: () => void }) {
  const waUrl = `https://wa.me/35797472847?text=${encodeURIComponent(template.waMessage)}`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{ background: "rgba(17,19,21,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
        style={{ border: "1px solid rgba(91,140,255,0.15)", WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >
        {/* Card mockup as hero */}
        <div className="relative">
          <TemplateCardPreview template={template} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 transition-all z-10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Title + tagline */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{template.name}</h2>
            <p className="text-gray-500 text-sm">{template.tagline} · {INDUSTRIES.find(i => i.id === template.industry)?.label}</p>
          </div>

          {/* Open Full Preview - primary CTA */}
          <a
            href={`/preview/${template.id}/`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
          >
            <ExternalLink size={16} />
            Open Full Preview
          </a>

          {/* Style description */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-600 text-sm leading-relaxed">{template.style}</p>
          </div>

          {/* What's included */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-widest">What's Included</h3>
            <ul className="space-y-2">
              {template.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing CTA */}
          <div className="rounded-xl p-4 border border-gray-200" style={{ background: "linear-gradient(135deg, #F8F9FF, #F5F0FF)" }}>
            <p className="text-xs text-gray-500 mb-1 font-medium">This is a design inspiration</p>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">Every website is built from scratch and tailored to your brand. Pricing depends on your chosen plan - not the example.</p>
            <a
              href="/pricing/"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] mb-2"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
            >
              View Pricing Plans
            </a>
            <a
              href="/contact/"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 transition-all duration-300 hover:border-[#5B8CFF] hover:text-[#5B8CFF]"
            >
              Get a Quote for This Design
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-gray-500 text-xs">Loved by 50+ businesses</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({ template, onClick }: { template: typeof TEMPLATES[0]; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-400"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(226,229,234,0.8)" }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <TemplateCardPreview template={template} />
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/8 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm shadow-xl flex items-center gap-2"
            style={{ transform: "translateY(8px)" }}
          >
            Interactive Demo <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>

      <div className="p-5 templates-editorial-card-body">
        <div className="mb-3">
          <h3 className="text-gray-900 font-bold text-lg leading-tight templates-editorial-card-title">{template.name}</h3>
          <p className="text-gray-500 text-sm templates-editorial-card-tagline">{template.tagline}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-500 text-xs font-medium">{template.styleLabel}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.features.slice(0, 3).map(f => (
            <span key={f} className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-500 text-xs">{f}</span>
          ))}
          <span className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-400 text-xs">+{template.features.length - 3} more</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-gray-400 templates-editorial-card-note">
            <span>Design inspiration</span>
            <span>Pricing from €299</span>
          </span>
          <button className="flex items-center gap-1.5 text-sm font-semibold transition-colors templates-editorial-card-action" style={{ color: "#5B8CFF" }}>
            Preview <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Custom Build Card ──────────────────────────────────────────────────────
function CustomBuildCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-400 flex flex-col"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(226,229,234,0.8)" }}
    >
      {/* Gradient banner */}
      <div
        className="relative flex flex-col items-center justify-center px-8 py-12 text-center"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", height: "280px" }}
      >
        {/* Subtle animated gradient orbs */}
        <div className="absolute top-4 left-6 w-24 h-24 rounded-full blur-2xl" style={{ background: "rgba(91,140,255,0.25)" }} />
        <div className="absolute bottom-4 right-6 w-20 h-20 rounded-full blur-2xl" style={{ background: "rgba(139,92,255,0.25)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl" style={{ background: "rgba(111,227,255,0.12)" }} />

        {/* Icon */}
        <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)", boxShadow: "0 8px 24px rgba(91,140,255,0.4)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        <h3 className="relative z-10 text-white font-bold text-xl leading-tight mb-1 templates-editorial-custom-title">Custom <em>Build</em></h3>
        <p className="relative z-10 text-blue-200/80 text-sm templates-editorial-custom-subtitle">Fully bespoke design</p>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1 templates-editorial-custom-body">
        <p className="text-gray-600 text-sm leading-relaxed mb-4 templates-editorial-custom-copy">
          None of these fit your vision? We design your website entirely from scratch, with a unique layout, custom graphics, and a brand identity built just for you.
        </p>

        {/* Feature list */}
        <ul className="space-y-2 mb-5 flex-1">
          {[
            "100% unique layout, fully bespoke",
            "Custom illustrations & brand graphics",
            "Tailored colour palette and typography",
            "Built around your specific business goals",
            "Collaborative design process",
          ].map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-700 templates-editorial-custom-feature">
              <Check size={14} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-gray-400 templates-editorial-card-note">
            <span>Pricing from €299</span>
            <span>Quote on request</span>
          </span>
          <a
            href="/contact/"
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2 templates-editorial-card-action"
            style={{ color: "#5B8CFF" }}
            onClick={e => e.stopPropagation()}
          >
            Get a Quote <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Industry Tabs with scroll arrows ────────────────────────────────────────
function IndustryTabs({ activeIndustry, setActiveIndustry }: { activeIndustry: string; setActiveIndustry: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", checkScroll); ro.disconnect(); };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left fade + arrow */}
      {canScrollLeft && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(246,246,244,0.95), transparent)" }} />
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
        </>
      )}

      {/* Right fade + arrow */}
      {canScrollRight && (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(246,246,244,0.95), transparent)" }} />
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "max(16px, calc((100vw - 1280px) / 2 + 16px))",
          paddingRight: "max(16px, calc((100vw - 1280px) / 2 + 16px))",
          paddingBottom: "2px",
        } as React.CSSProperties}
      >
        {INDUSTRIES.map(industry => (
          <button
            key={industry.id}
            onClick={() => setActiveIndustry(industry.id)}
            className="flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 templates-editorial-industry-tab"
            style={
              activeIndustry === industry.id
                ? { background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)", color: "#fff", boxShadow: "0 4px 12px rgba(91,140,255,0.3)" }
                : { background: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }
            }
          >
            {industry.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Templates() {
  useSEO({
    title: "Website Examples | See Our Work | DM-Labs.io",
    description: "Browse real website examples built by DM-Labs.io for restaurants, salons, dental clinics, yoga studios, and more. Starting from \u20ac299.",
    canonicalPath: "/templates/",
  });
  const [location] = useLocation();
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  // Guard so the ?open= / ?industry= effect only runs once on mount
  const urlParamHandled = useRef(false);

  // Open modal: push a single history entry so browser back can close it
  const openModal = (tpl: typeof TEMPLATES[0]) => {
    setSelectedTemplate(tpl);
    window.history.pushState({ modal: true }, "");
  };

  // Close modal: always close immediately — no async history.back() calls.
  // The popstate listener handles the browser-back case separately.
  const closeModal = () => {
    setSelectedTemplate(null);
  };

  // Listen for browser back button while modal is open
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      // Only intercept if the popped state was our modal entry
      if (selectedTemplate) {
        setSelectedTemplate(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [selectedTemplate]);

  // Handle URL params — run only once on mount to avoid re-open loops
  useEffect(() => {
    if (urlParamHandled.current) return;
    urlParamHandled.current = true;

    const params = new URLSearchParams(window.location.search);
    // Always clean query strings immediately — prevents Google indexing ?open= and ?industry= as separate pages
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    // Handle ?industry= filter
    const industry = params.get("industry");
    if (industry && INDUSTRIES.find(i => i.id === industry)) {
      setActiveIndustry(industry);
    }
    // Handle ?open=templateId  -  auto-open the modal for a specific template
    const openId = params.get("open");
    if (openId) {
      const tpl = TEMPLATES.find(t => t.id === openId);
      if (tpl) {
        openModal(tpl);
      }
    }
  }, []);

  const filtered = (() => {
    if (activeIndustry === "all") {
      // Shuffle once using a stable seed so order is random but consistent per session
      const arr = [...TEMPLATES];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    return TEMPLATES.filter(t => t.industry === activeIndustry);
  })();

  return (
    <div className="min-h-screen templates-editorial" style={{ background: "#F6F6F4" }}>
      {/* Hero */}
      <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.06) 0%, transparent 50%, rgba(139,92,255,0.06) 100%)" }} />
        <div className="absolute top-16 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(91,140,255,0.08)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(139,92,255,0.07)" }} />
        <div className="relative container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 templates-editorial-label">Website examples</p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight templates-editorial-title">
              <span>Find your perfect</span>
              <span>website <em>style</em></span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-4 templates-editorial-lead">
              Browse curated designs by industry. Each example is fully customised for your business, with your logo, colours, and content.
            </p>
            <p className="text-sm text-gray-400 max-w-xl mx-auto templates-editorial-note">
              These are <strong className="text-gray-500">interactive demo concepts</strong>, not fixed packages. Every website we build is tailored from scratch for your business. Real client work is available on request.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Industry Filter */}
      <section className="sticky top-[72px] z-30 py-4" style={{ background: "rgba(246,246,244,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(226,229,234,0.6)" }}>
        <IndustryTabs activeIndustry={activeIndustry} setActiveIndustry={setActiveIndustry} />
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container templates-editorial-grid-shell">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {/* Custom Build card - always shown first */}
              <CustomBuildCard />
              {filtered.map(template => (
                <TemplateCard key={template.id} template={template} onClick={() => openModal(template)} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 shadow-md border border-gray-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" className="w-8 h-8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              </div>
              <h3 className="text-gray-900 text-2xl font-bold mb-3 templates-editorial-empty-title">
                {INDUSTRIES.find(i => i.id === activeIndustry)?.label} Examples
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed templates-editorial-empty-copy">
                We're crafting beautiful examples for this industry. In the meantime, we can build a completely custom design for your business, so please reach out.
              </p>
              <a
                href="/contact/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 templates-editorial-cta-button"
                style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Request a Custom Design
              </a>
            </motion.div>
          )}


        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 templates-editorial-cta-section" style={{ borderTop: "1px solid rgba(226,229,234,0.8)" }}>
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 templates-editorial-cta-heading"><span>Don&apos;t see what you&apos;re</span><span>looking <em>for?</em></span></h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto templates-editorial-cta-copy">
              Every website we build is fully custom. Tell us about your business and we&apos;ll design something unique for you.
            </p>
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl templates-editorial-cta-button"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
            >
              Start a Conversation <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <TemplateModal template={selectedTemplate} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
