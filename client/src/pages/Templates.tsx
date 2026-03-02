/**
 * Templates Page — D&M Labs
 * Design: Matches D&M Labs brand (dark bg, blue-violet gradient accents)
 * Features:
 *   - Industry filter tabs
 *   - Template cards with desktop+mobile composite preview
 *   - Click card → detail modal with 3 page previews + CTA
 *   - Linked from homepage industry icons via ?industry= query param
 */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Star, ArrowRight, Check } from "lucide-react";

// Asset CDN URLs (user-provided coffee photography)
const IMG = {
  hero: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/wKIdXpGmmVCSthKZ.png?Expires=1803981882&Signature=euuPTwjoeyCsbdp-BRNBc08i~-2T7vTOTdnyaIrW3fCLilB-9RZQM6QnDYO1lOindt2e4ininoMq1yY6K~AY2fc2KSQROdV1ViOgkj3MGsX4ox7hXKAqsRChx0QvOO~KKKw2fQtKQxi41CYkDplwYzfTQFKDWxqzu8wpf0PMLI1NZEZNv-ycJEPmKpvt360ZXxw2YX1yG1jN6TzVERVfhxb0YtmHl4UAiq3puIh400dmpkYFRWGVPp7HwOyvuqdx29UwXqqOJstzh-sbMbZk8yJDtDg1dlneXPLYvwbwcjAROMr3u6Lq4KGjt1WAd5V-TqvD7eYjRUHJW1q8b3m46g__&Key-Pair-Id=K2HSFNDJXOU9YS",
  latte: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/hQhfPYkYlaAYIOxo.png?Expires=1803981882&Signature=RjSizrDZUnWwML7byBIUvb-PR5y9oyVZ-OQC1a3kBUW8Rj~9ENsrfgHszJ~6QXcdIsZpBRUm~Bo1HTxsmcYwr8XFQpc~BLbNhRVdamjK~geyF-fWonEeryqHzIodEWTl3ZPY5C4C0aM5OuaM5eAJdGvpcKTQlDib-oe0-hlTubOmP6P8jJ98YZ~F6-O1ItgbtdI~EvnTL0KlzDKI2eXD8hsc1ZSc6klN3XKdkaL7R4nmIac4BukMdLfRaka7UOSIFVRfG8sy8FlyzQUgsVe2sDkfiaiC0QemjGVAaP7ZhosmRZlYJmWetDG4f-DBDZOGI-BIiILbr913W3wvkdXOZg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  beans: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vQfwoFWkgBzXxfTl.png?Expires=1803981882&Signature=DVRyYKyPGB84n5O1phfb8w4EMNgr1-oW4YaMfgY2QeHQBBKCURHNPVh03J7Dl~SPGgdNn4KOViK31XRbUfopv9fwuw51lIom2YcoqhsmQ35jAbRo9dX9yjbf1~MU8b1~j061cvQheGXGqnGAsrAKlq9g3UjksIJ1kHsxGQP7FucjQeomnr0Kwxk8scBPojNu~KTiOP8HWdt3f2ozsndrUaaBSeoOKcxHMFMdBjPbFdaeGCEn3nIIWiZzWlAxYtQjys3kytYpEBNCNqXGMQqql7P6pswsemzgfqlDcOic4lRpVpyJaOk-t-DPXQM4WOQFzteiBRtHq41cJOf8DWFWHg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  drink: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/NWFgtxPyREOeemQB.png?Expires=1803981882&Signature=jMNzUf7gxfdU0Pr7y6gxJjSIAXv4t4x-7KT2F6n80GJf60vQ3joWSv5eZXGe95UNYki1PPoYs-TXBrwkzeokJtI7z5zYdyLuzKemPLMS2EkWD2Qy2zNiJl5yQJOLmFWI~89CgZI5mubZfcFISBt0G0xpc24bnkDxHNbPSqkPs5acv~yoexnor6EuXP3QXckWrk9gWjSdRCId1VarIgB7mLyW2~2if7l5IbP84RE0Cb1lH2UogA1WrPY9hTQhs6DPWFtrPNfPqVT7hvLE31w-5gOpBdk3poJMrCeJQcdhiny2EEuGmZ~3fYxJROhB~MA2KFBqxQ3k6tnuPHcaeFupSQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
  flatlay: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/sIUvLoVuXkcNIVqC.png?Expires=1803981882&Signature=cQalsyfOJ92b1CmiUaloQhm0OtG6Pkjr~dDHGjKX2ZIXA2Z5GMCpijbqB1ITeicf7A0teicSV-T1Szaus6yG7N3ilekXtXZTl4CVOQm8R3VpulrmL0DAlAaTJThpafL~b5H2o7rBjCc2fsyEGOlzJthoimbocl4bDevMNVQzFvfnqb0xAdfbWIi9P6XsmIGI05MdRA9A6HHvb-TQEP0eD7TXurk1Bo3DYaJzzSNKLAxOsGksKE5OTw9xATeDw7SRVBhrlCO9d-DQ~nYII2ptQrw48MhAm5yMWPZpm8h8RERkWaNnJ~FWu8t6Ket1H64thFsjzb9-5IO3Bicb2ToX6Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
  topdown: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/SdfoCkxMnrZhIPbJ.png?Expires=1803981882&Signature=o1XT42FG2wyS9CL4csj80Cvqk~TGgIlg4bO3CcIvPD98fAQgmRI67RV5FIwB10fVjrUEEUSmT5Mz0vyRVgDTTluZg0rVg7w4NEJa7AgeTadORgf2782aFMeqKEuIB00QZ5wmjYnLcR4TtAN9O7g1ngTisSxNDA72pcn-3R7HoFutT34Cl75vU03ygGcQzR15IrPurj8t5B-ejxqHjvb2tqPV8qH3PgWdFeeXxYHJuYI~qJ1355wonYLfbjSv80~FkaJANIN-FxvrnWxvfLQR5a716rlw~bXILsUWX47m1GFxcq3Q86sbNXbGMZHLTHTGMUP~LbC9vjmUjUTn4NDbbg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  product: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/wYIdBazLChGbpZoi.png?Expires=1803981882&Signature=r8aNUmPX1mo7n94U~xjigExS~LKMlfznkG8-GghE8Il43uOuTqWY-sq0C8fogLrLSUhX7Xwoe2CUFdtQiFjEpLAPiEdbtX0HY-~YKKJugSAvrZPqDpmV50WY~LcEEYOQP-VC6mSOo1crvKO1CoHWYL5idqFBxpaubNLWxTIfgCTB6ZFFhXD2HPoK~biB4nZ-IX0X1EfGItzqU7SCgpISlYoW~zUqQiH7Szq4uGj2DCc7OhWWXmKYhgJnrApy1Jqd9UtjyHEYF5bbK4TbsD-wrS5wk5dxNMKX~W5gbjTsafbD6HMun4yvoEiJsggpgoV5RrACrQrGupt1efUC8mARDQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
};

// Industry definitions
const INDUSTRIES = [
  { id: "all", label: "All Industries", emoji: "✦" },
  { id: "restaurant", label: "Restaurants & Cafés", emoji: "☕" },
  { id: "beauty", label: "Beauty & Wellness", emoji: "💅" },
  { id: "clinic", label: "Clinics & Health", emoji: "🏥" },
  { id: "fitness", label: "Fitness & Sport", emoji: "💪" },
  { id: "retail", label: "Retail & Boutique", emoji: "🛍️" },
  { id: "services", label: "Professional Services", emoji: "💼" },
];

// Template data — one coffee shop template for now
const TEMPLATES = [
  {
    id: "coffee-warm",
    industry: "restaurant",
    name: "Bella Cucina",
    tagline: "Warm & Artisan",
    tier: "Business",
    tierColor: "from-amber-500 to-orange-600",
    palette: ["#1a1008", "#c8956c", "#f5ead8", "#8b5e3c"],
    features: [
      "Menu showcase with photos",
      "Our Story section",
      "Photo gallery",
      "Google Reviews integration",
      "Reserve a table CTA",
      "WhatsApp & Instagram links",
      "Google Maps embed",
      "Mobile responsive",
    ],
    pages: [
      {
        label: "Homepage",
        desktopImg: IMG.hero,
        mobileImg: IMG.latte,
        description: "Hero with atmosphere photography, tagline bar, and menu highlights",
      },
      {
        label: "Menu & Gallery",
        desktopImg: IMG.flatlay,
        mobileImg: IMG.drink,
        description: "Featured drinks, food items with pricing, and photo gallery grid",
      },
      {
        label: "Contact & Find Us",
        desktopImg: IMG.beans,
        mobileImg: IMG.topdown,
        description: "Opening hours, address, Google Maps embed, and reservation CTA",
      },
    ],
    previewDesktop: IMG.hero,
    previewMobile: IMG.latte,
    style: "Warm dark tones, serif typography, cream & brown palette. Perfect for specialty coffee shops, artisan cafés, and bistros.",
    waMessage: "Hi! I'm interested in the Bella Cucina coffee shop website template.",
  },
];

// ─── Desktop + Mobile composite card ────────────────────────────────────────
function TemplateComposite({ desktopImg, mobileImg }: { desktopImg: string; mobileImg: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
      {/* Desktop frame */}
      <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-gray-700/60 shadow-2xl" style={{ right: "15%" }}>
        <div className="h-6 bg-gray-800 flex items-center gap-1.5 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-4 h-3 rounded-full bg-gray-700" />
        </div>
        <img src={desktopImg} alt="Desktop preview" className="w-full h-full object-cover object-top" style={{ height: "calc(100% - 24px)" }} />
      </div>
      {/* Mobile frame */}
      <div className="absolute bottom-0 right-0 w-[22%] rounded-2xl overflow-hidden border-2 border-gray-600/80 shadow-2xl" style={{ aspectRatio: "9/16" }}>
        <div className="h-5 bg-gray-800 flex items-center justify-center">
          <div className="w-8 h-1.5 rounded-full bg-gray-600" />
        </div>
        <img src={mobileImg} alt="Mobile preview" className="w-full object-cover object-top" style={{ height: "calc(100% - 20px)" }} />
      </div>
    </div>
  );
}

// ─── Template Detail Modal ───────────────────────────────────────────────────
function TemplateModal({ template, onClose }: { template: typeof TEMPLATES[0]; onClose: () => void }) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop");
  const activePage = template.pages[activePageIndex];
  const waUrl = `https://wa.me/972584928177?text=${encodeURIComponent(template.waMessage)}`;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-gray-900 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-white">{template.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${template.tierColor}`}>
                {template.tier}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{template.tagline} · {INDUSTRIES.find(i => i.id === template.industry)?.label}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Preview */}
          <div className="lg:col-span-2 space-y-4">
            {/* Page selector */}
            <div className="flex gap-2">
              {template.pages.map((page, i) => (
                <button
                  key={i}
                  onClick={() => setActivePageIndex(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activePageIndex === i
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {page.label}
                </button>
              ))}
              {/* View toggle */}
              <div className="ml-auto flex gap-1 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setActiveView("desktop")}
                  className={`p-1.5 rounded-md transition-colors ${activeView === "desktop" ? "bg-white/20 text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <Monitor size={16} />
                </button>
                <button
                  onClick={() => setActiveView("mobile")}
                  className={`p-1.5 rounded-md transition-colors ${activeView === "mobile" ? "bg-white/20 text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <Smartphone size={16} />
                </button>
              </div>
            </div>

            {/* Preview frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePageIndex}-${activeView}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl overflow-hidden border border-white/10 bg-gray-800"
              >
                {activeView === "desktop" ? (
                  <>
                    <div className="h-8 bg-gray-800 flex items-center gap-1.5 px-4 border-b border-white/5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <div className="flex-1 mx-6 h-4 rounded-full bg-gray-700 flex items-center px-3">
                        <span className="text-gray-500 text-xs">bellacucina.com</span>
                      </div>
                    </div>
                    <div className="h-72 overflow-hidden">
                      <img src={activePage.desktopImg} alt={activePage.label} className="w-full h-full object-cover object-top" />
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center py-4 bg-gray-800/50">
                    <div className="w-40 rounded-2xl overflow-hidden border-2 border-gray-600 shadow-xl">
                      <div className="h-5 bg-gray-700 flex items-center justify-center">
                        <div className="w-10 h-1.5 rounded-full bg-gray-500" />
                      </div>
                      <div className="h-64 overflow-hidden">
                        <img src={activePage.mobileImg} alt={activePage.label} className="w-full h-full object-cover object-top" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="text-gray-400 text-sm">{activePage.description}</p>

            {/* Color palette */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs uppercase tracking-widest">Colour Palette</span>
              <div className="flex gap-2">
                {template.palette.map(color => (
                  <div key={color} className="w-6 h-6 rounded-full border border-white/10 shadow-sm" style={{ background: color }} title={color} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details + CTA */}
          <div className="space-y-5">
            {/* Style description */}
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-300 text-sm leading-relaxed">{template.style}</p>
            </div>

            {/* What's included */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">What's Included</h3>
              <ul className="space-y-2">
                {template.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">€350</span>
                <span className="text-gray-400 text-sm">one-time</span>
              </div>
              <p className="text-gray-400 text-xs mb-4">€175 upfront · €175 on delivery</p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get This Template
              </a>
              <p className="text-center text-gray-500 text-xs mt-2">We'll personalise it for your business</p>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-gray-400 text-xs">Loved by 50+ businesses</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Template Card ───────────────────────────────────────────────────────────
function TemplateCard({ template, onClick }: { template: typeof TEMPLATES[0]; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-gray-900/60 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-400"
      onClick={onClick}
    >
      {/* Preview composite */}
      <div className="relative p-4 pb-2 bg-gray-800/40">
        <TemplateComposite desktopImg={template.previewDesktop} mobileImg={template.previewMobile} />
        {/* Hover overlay */}
        <div className="absolute inset-4 rounded-xl bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm shadow-xl flex items-center gap-2"
          >
            Preview Template <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>

      {/* Card info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{template.name}</h3>
            <p className="text-gray-400 text-sm">{template.tagline}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${template.tierColor} flex-shrink-0`}>
            {template.tier}
          </span>
        </div>

        {/* Palette dots */}
        <div className="flex items-center gap-2 mb-4">
          {template.palette.map(color => (
            <div key={color} className="w-4 h-4 rounded-full border border-white/10" style={{ background: color }} />
          ))}
          <span className="text-gray-500 text-xs ml-1">Warm Dark</span>
        </div>

        {/* Features preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.features.slice(0, 4).map(f => (
            <span key={f} className="px-2 py-0.5 bg-white/5 rounded-md text-gray-400 text-xs">{f}</span>
          ))}
          <span className="px-2 py-0.5 bg-white/5 rounded-md text-gray-500 text-xs">+{template.features.length - 4} more</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-lg">€350</span>
          <button className="flex items-center gap-1.5 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
            View Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Templates Page ─────────────────────────────────────────────────────
export default function Templates() {
  const [location] = useLocation();
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);

  // Read ?industry= query param from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const industry = params.get("industry");
    if (industry && INDUSTRIES.find(i => i.id === industry)) {
      setActiveIndustry(industry);
    }
  }, [location]);

  const filtered = activeIndustry === "all"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.industry === activeIndustry);

  const comingSoon = INDUSTRIES.filter(i => i.id !== "all" && i.id !== "restaurant");

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-gray-950 to-violet-950/30" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="relative container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-blue-400 mb-4">Website Templates</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block" style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Website Style
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Browse our curated designs by industry. Each template is fully customised for your business — your logo, your colours, your content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="sticky top-16 z-30 bg-gray-950/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {INDUSTRIES.map(industry => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeIndustry === industry.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{industry.emoji}</span>
                {industry.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container">
          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map(template => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => setSelectedTemplate(template)}
                  />
                ))}
              </div>
            </>
          ) : (
            /* Coming Soon state for industries without templates yet */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-4xl">
                {INDUSTRIES.find(i => i.id === activeIndustry)?.emoji}
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">
                {INDUSTRIES.find(i => i.id === activeIndustry)?.label} Templates
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                We're crafting beautiful templates for this industry. In the meantime, we can build a completely custom design for your business — just reach out.
              </p>
              <a
                href={`https://wa.me/972584928177?text=${encodeURIComponent(`Hi! I'm interested in a ${INDUSTRIES.find(i => i.id === activeIndustry)?.label} website.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Request a Custom Design
              </a>
            </motion.div>
          )}

          {/* Coming Soon teaser for other industries */}
          {(activeIndustry === "all" || activeIndustry === "restaurant") && (
            <div className="mt-16 pt-12 border-t border-white/5">
              <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">More industries coming soon</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {comingSoon.map(industry => (
                  <button
                    key={industry.id}
                    onClick={() => setActiveIndustry(industry.id)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-200 group"
                  >
                    <span className="text-2xl">{industry.emoji}</span>
                    <span className="text-gray-500 text-xs text-center group-hover:text-gray-400 transition-colors">{industry.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-600">Coming Soon</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Don't see what you're looking for?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Every website we build is fully custom. Tell us about your business and we'll design something unique — just for you.
            </p>
            <a
              href="https://wa.me/972584928177?text=Hi!%20I'd%20like%20a%20custom%20website%20design%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            >
              Chat With Us on WhatsApp <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Template Detail Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <TemplateModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
