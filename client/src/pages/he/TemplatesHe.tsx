import LuxePreviewArtwork from "@/components/LuxePreviewArtwork";
import ElaraPreviewArtwork from "@/components/ElaraPreviewArtwork";
import { previewIndustry } from "@/lib/previewNavigation";
import ArcosPreviewArtwork from "@/components/ArcosPreviewArtwork";
import NomadPreviewArtwork from "@/components/NomadPreviewArtwork";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import CinematicHeroBackground from "@/components/CinematicHeroBackground";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

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
  // ── Κλινική 1 ──
  c1: {
    card:            "/media/manus/vHiXcgVzfwvNVOeM.webp",
    homeDesktop:     "/media/manus/YCnlUDrgdfYcRFcp.webp",
    homeMobile:      "/media/manus/SoSmnaYEMYNtborV.webp",
    servicesDesktop: "/media/manus/EBGosAATQGJrDRrO.webp",
    servicesMobile:  "/media/manus/shleiZcAylwlZFko.webp",
    contactDesktop:  "/media/manus/fLgMqFfxfaBAZUUg.webp",
    contactMobile:   "/media/manus/IeKYfaoTBkvBtsGW.webp",
  },
  // ── Κλινική 2 ──
  c2: {
    card:            "/media/manus/YbjSXbLAerjQxXvn.webp",
    homeDesktop:     "/media/manus/xdClqTPSaZedbOrH.webp",
    homeMobile:      "/media/manus/bpTeQMAzkYPxDtQG.webp",
    servicesDesktop: "/media/manus/IrKtVBivvGJLlxXq.webp",
    servicesMobile:  "/media/manus/DHjvqNlizRvZpkBh.webp",
    contactDesktop:  "/media/manus/BQfFdAkGYebKMKpk.webp",
    contactMobile:   "/media/manus/RkvwuDSBgYRbTqkU.webp",
  },
  // ── Κλινική 3 ──
  c3: {
    card:            "/media/manus/ChvLohPuUByZeIQC.webp",
    homeDesktop:     "/media/manus/NHQujbHpKEVeITwp.webp",
    homeMobile:      "/media/manus/uavEwuXtbwJlQxCh.webp",
    servicesDesktop: "/media/manus/IkjsPNxJuaiuzcxz.webp",
    servicesMobile:  "/media/manus/EAPtMQrSPrviqxBc.webp",
    contactDesktop:  "/media/manus/HmjUPHfgkXKrwmUi.webp",
    contactMobile:   "",
  },
  // ── Fitness και Γυμναστήρια 1 ──
  f1: {
    card:            "/media/manus/MgTbsRcvqoiXiYbH.webp",
    homeDesktop:     "/media/manus/SPFIMdyocJfvNgUg.webp",
    homeMobile:      "/media/manus/NbnbjgpLHjCqlaND.webp",
    servicesDesktop: "/media/manus/fzhBYVDYdMZwWzSW.webp",
    servicesMobile:  "/media/manus/pVofdJtBxjtWPRnG.webp",
    contactDesktop:  "/media/manus/dwsiQRBVsDHirGfC.webp",
    contactMobile:   "/media/manus/BKpCjEWdimSQcHBz.webp",
  },
  // ── Fitness και Γυμναστήρια 2 ──
  f2: {
    card:            "/media/manus/DHunfxWXbmZPGjxJ.webp",
    homeDesktop:     "/media/manus/JtNJcvmMdIcsxfuT.webp",
    homeMobile:      "/media/manus/ZqytkHiGFTkpiDMo.webp",
    servicesDesktop: "/media/manus/kmSnubLAQhhgWiTo.webp",
    servicesMobile:  "/media/manus/sBMGMjPSjdwPLICt.webp",
    contactDesktop:  "/media/manus/WqWEFvWUEoLNZqgI.webp",
    contactMobile:   "/media/manus/qxjutkZlzdoHvUbe.webp",
  },
  // ── Fitness και Γυμναστήρια 3 ──
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
          {["שירותים","אודות","גלריה","הזמנה"].map(l => <span key={l} style={{ fontSize: "8px", color: "#7a5a4a", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
        <div style={{ background: "#c4735a", color: "#fff", fontSize: "8px", padding: "3px 10px", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>קביעת תור</div>
      </div>
      <div style={{ position: "absolute", top: "56px", left: "18px", maxWidth: "48%" }}>
        <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c4735a", marginBottom: "6px" }}>סטודיו ליופי</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#2a1a14", lineHeight: 1.2, marginBottom: "8px", fontStyle: "italic" as const }}>כי מגיע לך<br/><em style={{ color: "#c4735a" }}>להרגיש</em> יפה</div>
        <div style={{ fontSize: "8px", color: "#7a5a4a", lineHeight: 1.5, marginBottom: "10px" }}>שיער, טיפוח פנים וציפורניים,<br/>באווירה פרטית ונעימה.</div>
        <div style={{ background: "#c4735a", color: "#fff", fontSize: "8px", padding: "5px 14px", display: "inline-block", letterSpacing: "0.1em" }}>קבעו תור</div>
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


  "pulse-gym": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#0a0a0a" }}>
      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, rgba(255,107,53,0.15) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(255,107,53,0.2)" }}>
        <span style={{ fontFamily: "Impact, sans-serif", fontSize: "14px", fontWeight: 900, color: "#ff6b35", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>PULSE</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {["שיעורים","מאמנים","הרשמה"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{l}</span>)}
        </div>
        <div style={{ background: "#ff6b35", color: "#fff", fontSize: "8px", padding: "3px 10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>הרשמה</div>
      </div>
      <div style={{ position: "absolute", top: "52px", left: "18px" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#ff6b35", marginBottom: "4px" }}>לימסול · מאז 2019</div>
        <div style={{ fontFamily: "Impact, sans-serif", fontSize: "28px", fontWeight: 900, color: "#fff", lineHeight: 1.0, textTransform: "uppercase" as const, letterSpacing: "0.02em", marginBottom: "6px" }}>הגרסה<br/><span style={{ color: "#ff6b35" }}>הכי חזקה</span><br/>שלך</div>
        <div style={{ background: "#ff6b35", color: "#fff", fontSize: "8px", padding: "5px 14px", display: "inline-block", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>אימון ניסיון בחינם</div>
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

  "dr-elara-dental": () => <ElaraPreviewArtwork />,

  "nomad-coffee": () => <NomadPreviewArtwork />,

  "arcos-architecture": () => <ArcosPreviewArtwork />,
  "luxe-realty": () => <LuxePreviewArtwork />,

  "olio-deli": () => (
    <div style={{ height: "280px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0", background: "#1e1c17" }}>
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(30,28,23,0.85) 0%, rgba(74,94,42,0.3) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36px", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between", borderBottom: "1px solid rgba(200,151,58,0.2)" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "13px", fontWeight: 700, color: "#c8973a", letterSpacing: "0.08em", fontStyle: "italic" as const }}>Olio Deli</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {["תפריט","עלינו","מוצרים"].map(l => <span key={l} style={{ fontSize: "8px", color: "rgba(200,151,58,0.7)" }}>{l}</span>)}
        </div>
        <div style={{ border: "1px solid #c8973a", color: "#c8973a", fontSize: "8px", padding: "3px 10px" }}>הזמינו</div>
      </div>
      <div style={{ position: "absolute", bottom: "28px", left: "18px" }}>
        <div style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c8973a", marginBottom: "5px" }}>מעדנייה, אתונה</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#faf6ef", lineHeight: 1.2, marginBottom: "8px", fontStyle: "italic" as const }}>טעמים של הים התיכון,<br/>ישר לשולחן שלכם</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ background: "#c8973a", color: "#1e1c17", fontSize: "8px", padding: "5px 14px", fontWeight: 700 }}>למוצרים</div>
          <div style={{ border: "1px solid rgba(200,151,58,0.4)", color: "#c8973a", fontSize: "8px", padding: "5px 12px" }}>עלינו</div>
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

};

function TemplateCardPreview({ template }: { template: typeof TEMPLATES[0] }) {
  const Design = CARD_DESIGNS[template.id];
  if (Design) return <div className="hebrew-template-preview-mockup"><Design /></div>;
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
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600, letterSpacing: "0.06em" }}>הדגמה</span>
      </div>
    </div>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { id: "all", label: "כל התחומים", icon: "✦" },
  { id: "realestate", label: "נדל״ן", icon: "" },
  { id: "restaurant", label: "מסעדות, בתי קפה ומזון", icon: "☕" },
  { id: "beauty", label: "יופי וטיפוח", icon: "✂" },
  { id: "clinic", label: "קליניקות ובריאות", icon: "+" },
  { id: "fitness", label: "כושר וספורט", icon: "◈" },
  { id: "architecture", label: "אדריכלות", icon: "△" },
];

// ─── Template data (live-preview only) ───────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "luxe-realty", industry: "realestate", name: "Luxe Realty",
    tagline: "נקודת מבט אחרת", tier: "Pro", tierGradient: "linear-gradient(135deg, #302337, #62526e)", domain: "luxe.example",
    palette: ["#302337", "#f6f5f2", "#dbee91", "#e8e4ed", "#6a626e"], paletteNames: ["חציל", "לבן", "ליים", "לילך", "אפור"],
    features: ["אזור פתיחה עם מעברים קולנועיים בין שלושה בתים", "סינון נכסים ומיון לפי מחיר", "שמירת בתים מועדפים והשוואה ביניהם", "גלריות של חללי פנים וחוץ", "הדגמה של בקשה לביקור בנכס"],
    pages: [{ label: "תצוגה חיה", preview: "live", description: "גלו את הבתים, שמרו מועדפים ונסו לשלוח בקשה לדוגמה לביקור." }],
    style: "סגול חציל, לבן וליים עם טיפוגרפיית Bricolage Grotesque. אוסף בתים בדיוני עם חיפוש אינטראקטיבי, השוואה ובקשות לביקור.", waMessage: "היי! ראיתי את הדוגמה של Luxe Realty ואשמח לשמוע עוד.", price: "€450", images: { card: "" }, livePreview: true, previewUrl: "/previews/luxe-realty.html",
  },

  // ── Live Preview templates ──
  {
    id: "bella-salon",
    industry: "beauty",
    name: "Bella Salon",
    tagline: "אלגנטי ונשי",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "bellasalon.com",
    palette: ["#1a0a0f", "#6b2d3e", "#c4748a", "#e8b4c0", "#fdf0f3"],
    paletteNames: ["שזיף עמוק", "ורוד כהה", "ורוד אבקתי", "רוזה", "שנהב"],
    styleLabel: "נשיות יוקרתית",
    livePreview: true,
    previewUrl: "/previews/bella-salon.html",
    features: [
      "אזור פתיחה אלגנטי עם כפתור הזמנה",
      "הצגת שירותים ומחירים",
      "גלריית עבודות",
      "הכירו את צוות הסטייליסטים",
      "יצירת קשר וטופס לקביעת תור",
      "מיקום ושעות פעילות",
      "כפתור WhatsApp",
      "מותאם למובייל",
    ],
    pages: [
      { label: "תצוגה חיה", preview: "live", description: "אפשר לגלול, ללחוץ ולראות את כל האתר" },
    ],
    style: "סגנון נשי ויוקרתי בגוני שזיף וורוד, עם פונט אלגנטי ותחושה חמה ומזמינה. מתאים לסלונים, לקוסמטיקאיות ולמכוני ציפורניים.",
    waMessage: "היי! ראיתי אצלכם את הדוגמה של Bella Salon ואשמח לשמוע עוד.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "pulse-gym",
    industry: "fitness",
    name: "PulseGym",
    tagline: "נועז ודינמי",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "pulsegym.com",
    palette: ["#0a0a0a", "#1a1a2e", "#ff6b35", "#ffa500", "#ffffff"],
    paletteNames: ["שחור", "כחול כהה", "כתום", "ענבר", "לבן"],
    styleLabel: "כהה ונועז",
    livePreview: true,
    previewUrl: "/previews/pulse-gym.html",
    features: [
      "אזור פתיחה כהה ונועז עם כפתור הרשמה",
      "לוח שיעורים ותוכניות",
      "פרופילי מאמנים",
      "מסלולי מנוי",
      "יצירת קשר והזמנת אימון ניסיון",
      "מיקום ושעות פעילות",
      "כפתור WhatsApp",
      "מותאם למובייל",
    ],
    pages: [
      { label: "תצוגה חיה", preview: "live", description: "אפשר לגלול, ללחוץ ולראות את כל האתר" },
    ],
    style: "סגנון אנרגטי עם רקע שחור ונגיעות כתומות, פונט חזק ופריסה דינמית. מתאים לחדרי כושר, לקרוספיט ולסטודיו לאימוני כוח.",
    waMessage: "היי! ראיתי אצלכם את הדוגמה של PulseGym ואשמח לשמוע עוד.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "dr-elara-dental",
    industry: "clinic",
    name: "Dr. Elara Dental",
    tagline: "רפואת שיניים במבט ברור",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #8B5CFF, #6B3CDF)",
    domain: "elara.example",
    palette: ["#ffffff", "#14212c", "#185ce5", "#f1f6fb"],
    paletteNames: ["לבן", "דיו", "כחול חשמלי", "קרח"],
    styleLabel: "עיצוב קליני מדויק",
    livePreview: true,
    previewUrl: "/previews/dr-elara-dental.html",
    features: ["סריקה אינטראקטיבית עם חלקיקים", "המחשה של בעיות שיניים מבפנים ומבחוץ", "העדפות אישיות לקראת הביקור", "אפקט מגנטי בכפתורים", "הדגמת בקשה לתור", "סרטון הסבר על טיפול", "טיפוגרפיה ייחודית של Sora ו־Source Sans", "תמיכה במקלדת ובהפחתת תנועה"],
    pages: [
      { label: "תצוגה חיה", preview: "live", description: "אפשר לגלול, ללחוץ ולראות את כל האתר" },
    ],
    style: "לבן נקי, כסף קריר וכחול חשמלי. זהות קלינית עם סריקה אינטראקטיבית, המחשה של בעיות שיניים מבפנים ומבחוץ והעדפות לביקור שמשתלבות בבקשה לתור.",
    waMessage: "היי! ראיתי אצלכם את הדוגמה של Dr. Elara Dental ואשמח לשמוע עוד.",
    price: "€350",
    images: { card: "" },
  },
  {
    id: "nomad-coffee",
    industry: "restaurant",
    name: "Nomad Coffee",
    tagline: "קפה עם אופי",
    tier: "Launch",
    tierGradient: "linear-gradient(135deg, #5B8CFF, #3B6CDF)",
    domain: "nomad.example",
    palette: ["#b72d20", "#f1df9c", "#f6f0e4", "#28251e"],
    paletteNames: ["אדום", "צהוב רך", "נייר", "דיו"],
    styleLabel: "זהות בהשראת כרזות קפה",
    livePreview: true,
    previewUrl: "/previews/nomad-coffee.html",
    features: ["דימויי מותג מקוריים", "תפריט קפה אינטראקטיבי", "מתכוני קפה בהתאמה אישית", "מחשבון קפה, מים וקרח", "וידאו מתנגן באזור הפתיחה", "גלריית קפה ומאפים", "תמיכה בהפחתת תנועה", "פריסה מותאמת לכל מסך"],
    pages: [
      { label: "תצוגה חיה", preview: "live", description: "אפשר לגלול, ללחוץ ולראות את כל האתר" },
    ],
    style: "טיפוגרפיה צרה ונועזת, אדום וצהוב רך, דימויי מותג עשירים במרקם ומדריך קפה אינטראקטיבי. זהות לבית קפה בדיוני עם אופי ברור.",
    waMessage: "היי! ראיתי אצלכם את הדוגמה של Nomad Coffee ואשמח לשמוע עוד.",
    price: "€250",
    images: { card: "" },
  },
  // ── Fitness και Γυμναστήρια templates ──
  {
    id: "arcos-architecture",
    industry: "architecture",
    name: "Arcos Architecture",
    tagline: "יומן אדריכלי",
    tier: "Pro",
    tierGradient: "linear-gradient(135deg, #c4613a, #8a3a1a)",
    domain: "arcosarchitecture.gr",
    palette: ["#242521", "#e6e5db", "#a44129", "#f2f0e9", "#5a5c52"],
    paletteNames: ["פחם", "כהה", "טרקוטה", "נייר", "רך"],
    features: ["תוכנית אינטראקטיבית לבית סביב חצר", "הדמיות מקוריות עם שפה חזותית אחידה", "זכוכית מגדלת לחומרים עם תמיכה במגע", "גלריית הפרויקט במסך מלא", "יצירה והורדה של בריף לדוגמה"],
    pages: [
      { label: "תצוגה חיה", preview: "live", description: "אפשר לגלול, ללחוץ ולראות את כל האתר" },
    ],
    style: "יומן אדריכלי עם טיפוגרפיית Syne, גוני אבן וטרקוטה. חקירה של בית בדיוני דרך התוכנית, ההדמיות והחומרים שלו.",
    waMessage: "היי! ראיתי אצלכם את הדוגמה של Arcos Architecture ואשמח לשמוע עוד.",
    price: "€450",
    images: { card: "" },
    livePreview: true,
    previewUrl: "/previews/arcos-architecture.html",
  },
  {
    id: "olio-deli",
    industry: "restaurant",
    name: "Olio Deli",
    tagline: "ים תיכוני חם",
    tier: "Growth",
    tierGradient: "linear-gradient(135deg, #4a5e2a, #2a3a10)",
    domain: "oliodeli.gr",
    palette: ["#1e1c17", "#4a5e2a", "#c8973a", "#faf6ef", "#7a7060"],
    paletteNames: ["דיו", "זית", "זהב", "קרם", "רך"],
    features: [
      "אזור פתיחה מפוצל עם צילום מוצרים",
      "קטגוריות מוצרים",
      "מוצרים נבחרים ומחירים",
      "עמוד אודות",
      "SEO מותאם למעדניות",
    ],
    pages: [
      { label: "תצוגה חיה", preview: "live", description: "אפשר לגלול, ללחוץ ולראות את כל האתר" },
    ],
    style: "סגנון ים תיכוני חם בירוק זית וזהב, עם פונט קלאסי. מתאים למעדניות, לחנויות אוכל ולבוטיקים קולינריים.",
    waMessage: "היי! ראיתי אצלכם את הדוגמה של Olio Deli ואשמח לשמוע עוד.",
    price: "€299",
    images: { card: "" },
    livePreview: true,
    previewUrl: "/previews/olio-deli.html",
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
            href={`/preview/${template.id}/?from=%2Fhe%2Ftemplates%2F`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
          >

            לתצוגה המלאה
          </a>

          {/* Style description */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-600 text-sm leading-relaxed">{template.style}</p>
          </div>

          {/* What's included */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-widest">מה כלול</h3>
            <ul className="space-y-2">
              {template.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Τιμές CTA */}
          <div className="rounded-xl p-4 border border-gray-200" style={{ background: "linear-gradient(135deg, #F8F9FF, #F5F0FF)" }}>
            <p className="text-xs text-gray-500 mb-1 font-medium">זו רק השראה</p>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">כל אתר נבנה מאפס לפי המותג שלכם. המחיר תלוי בחבילה שתבחרו, לא בדוגמה.</p>
            <a
              href="/he/pricing/"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] mb-2"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
            >
              לחבילות ולמחירים
            </a>
            <a
              href="/he/contact/"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 transition-all duration-300 hover:border-[#5B8CFF] hover:text-[#5B8CFF]"
            >
              רוצים משהו כזה? לקבלת הצעת מחיר
            </a>
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
            דוגמה אינטראקטיבית
          </motion.div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-gray-900 font-bold text-lg leading-tight">{template.name}</h3>
          <p className="text-gray-500 text-sm">{template.tagline}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-500 text-xs font-medium">{template.styleLabel}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.features.slice(0, 3).map(f => (
            <span key={f} className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-500 text-xs">{f}</span>
          ))}
          <span className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-400 text-xs">+{template.features.length - 3} נוספים</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 italic">רעיונות לעיצוב של העסק שלכם</span>
          <button className="flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: "#5B8CFF" }}>
            תצוגה מקדימה
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Προσαρμοσμένη Κατασκευή Card ──────────────────────────────────────────────────────
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

        <h3 className="relative z-10 text-white font-bold text-xl leading-tight mb-1">בנייה מותאמת אישית</h3>
        <p className="relative z-10 text-blue-200/80 text-sm">עיצוב מאפס, רק בשבילכם</p>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          לא מצאתם דוגמה שמתאימה בדיוק? אין בעיה. נעצב לכם אתר מאפס, עם פריסה, גרפיקה וסגנון שנבנים רק בשבילכם.
        </p>

        {/* Feature list */}
        <ul className="space-y-2 mb-5 flex-1">
          {[
            "פריסה שנבנית רק בשבילכם",
            "איורים וגרפיקת מותג מותאמים",
            "צבעים ופונטים לפי המותג",
            "מתוכנן לפי המטרות של העסק",
            "אתם מעורבים בכל שלב",
          ].map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
              <Check size={14} className="text-[#5B8CFF] shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 italic">עיצוב לפי המטרות שלכם</span>
          <a
            href="/he/contact/"
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2"
            style={{ color: "#5B8CFF" }}
            onClick={e => e.stopPropagation()}
          >
            לקבלת הצעת מחיר
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
      {/* Left fade + navigation */}
      {canScrollLeft && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(246,246,244,0.95), transparent)" }} />
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 min-w-11 h-11 px-3 rounded-md bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
            aria-label="גלילה שמאלה"
          >
            <span>שמאלה</span>
          </button>
        </>
      )}

      {/* Right fade + navigation */}
      {canScrollRight && (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(246,246,244,0.95), transparent)" }} />
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 min-w-11 h-11 px-3 rounded-md bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
            aria-label="גלילה ימינה"
          >
            <span>ימינה</span>
          </button>
        </>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto"
        dir="rtl"
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
            className="flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
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
export default function TemplatesHe() {
  useSEO({
    title: "דוגמאות לאתרים לעסקים | השראה לעיצוב | DM-Labs.io",
    description: "דוגמאות לאתרים של מסעדות, סלונים, מרפאות, סטודיו ליוגה ועוד. תגללו, תלחצו ותראו איך האתר של העסק שלכם יכול להיראות.",
    canonicalPath: "/he/templates/",
    ogLocale: "he_IL",
    noindex: true,
  });
  const [location] = useLocation();
  const [activeIndustry, setActiveIndustry] = useState(previewIndustry);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  // Guard so the ?open= / ?industry= effect only runs once on mount
  const urlParamHandled = useRef(false);

  // Open modal: push a single history entry so browser back can close it
  const openModal = (tpl: typeof TEMPLATES[0]) => {
    setSelectedTemplate(tpl);
    window.history.pushState({ modal: true, dmGalleryPosition: { x: window.scrollX, y: window.scrollY } }, "");
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

  // Keep the curated order consistent when visitors filter or return from a demo.
  const filtered = activeIndustry === "all"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.industry === activeIndustry);

  return (
    <div data-example-industry={activeIndustry} className="min-h-screen hebrew-home templates-editorial" dir="rtl" style={{ background: "#F6F6F4" }}>
      {/* Hero */}
      <section className="cinematic-hero-surface relative py-12 sm:py-16 lg:py-24 overflow-hidden">
        <CinematicHeroBackground kind="templates" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.06) 0%, transparent 50%, rgba(139,92,255,0.06) 100%)" }} />
        <div className="absolute top-16 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(91,140,255,0.08)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(139,92,255,0.07)" }} />
        <div className="relative container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="templates-editorial-label text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#5B8CFF" }}>דוגמאות לאתרים</p>
            <h1 className="templates-editorial-title text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"><span>איזה סגנון</span><span><em>מתאים</em> לעסק שלכם?</span></h1>
            <p className="templates-editorial-lead text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
              תסתכלו על הדוגמאות לפי תחום ותקחו מהן רעיונות. כל עיצוב כאן אפשר להתאים לעסק שלכם: ללוגו, לצבעים ולתוכן.
            </p>
            <p className="templates-editorial-note text-sm text-gray-400 max-w-xl mx-auto">
              אלה <strong className="text-gray-500">דוגמאות להשראה</strong>, לא חבילות מוכנות. כל אתר נבנה מאפס בשביל העסק שלכם.
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
        <div className="container">
          {filtered.length > 0 ? (
            <div className="templates-editorial-grid-shell grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {/* Προσαρμοσμένη Κατασκευή card - always shown first */}
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
              <h3 className="text-gray-900 text-2xl font-bold mb-3">
                דוגמאות: {INDUSTRIES.find(i => i.id === activeIndustry)?.label}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                לתחום הזה עוד אין כאן דוגמאות, אבל זה לא מפריע לנו לעצב לכם אתר מאפס.
              </p>
              <a
                href="/he/contact/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                לעיצוב בהתאמה אישית
              </a>
            </motion.div>
          )}


        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(226,229,234,0.8)" }}>
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">לא מצאתם מה שחיפשתם?</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              כל אתר שאנחנו בונים מעוצב מאפס. ספרו לנו בכמה מילים על העסק, ונחשוב יחד מה הכי מתאים לו.
            </p>
            <a
              href="/he/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" }}
            >
              בואו נדבר
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
