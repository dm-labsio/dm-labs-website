/* ============================================================
   TEMPLATES PAGE — D&M Labs
   Design: Matches D&M Labs brand — warm off-white bg, blue-cyan-violet
   gradient accents, glassmorphism cards, dm-card system.
   Key feature: Browser-frame mockups render actual website UI layouts
   using the client's coffee photos — NOT raw photo dumps.
   ============================================================ */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Star, ArrowRight, Check, ChevronRight } from "lucide-react";

// ─── Coffee Photo CDN URLs ────────────────────────────────────────────────────
const IMG = {
  atmosphere: "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/wKIdXpGmmVCSthKZ.png?Expires=1803981882&Signature=euuPTwjoeyCsbdp-BRNBc08i~-2T7vTOTdnyaIrW3fCLilB-9RZQM6QnDYO1lOindt2e4ininoMq1yY6K~AY2fc2KSQROdV1ViOgkj3MGsX4ox7hXKAqsRChx0QvOO~KKKw2fQtKQxi41CYkDplwYzfTQFKDWxqzu8wpf0PMLI1NZEZNv-ycJEPmKpvt360ZXxw2YX1yG1jN6TzVERVfhxb0YtmHl4UAiq3puIh400dmpkYFRWGVPp7HwOyvuqdx29UwXqqOJstzh-sbMbZk8yJDtDg1dlneXPLYvwbwcjAROMr3u6Lq4KGjt1WAd5V-TqvD7eYjRUHJW1q8b3m46g__&Key-Pair-Id=K2HSFNDJXOU9YS",
  latte:       "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/hQhfPYkYlaAYIOxo.png?Expires=1803981882&Signature=RjSizrDZUnWwML7byBIUvb-PR5y9oyVZ-OQC1a3kBUW8Rj~9ENsrfgHszJ~6QXcdIsZpBRUm~Bo1HTxsmcYwr8XFQpc~BLbNhRVdamjK~geyF-fWonEeryqHzIodEWTl3ZPY5C4C0aM5OuaM5eAJdGvpcKTQlDib-oe0-hlTubOmP6P8jJ98YZ~F6-O1ItgbtdI~EvnTL0KlzDKI2eXD8hsc1ZSc6klN3XKdkaL7R4nmIac4BukMdLfRaka7UOSIFVRfG8sy8FlyzQUgsVe2sDkfiaiC0QemjGVAaP7ZhosmRZlYJmWetDG4f-DBDZOGI-BIiILbr913W3wvkdXOZg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  beans:       "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/vQfwoFWkgBzXxfTl.png?Expires=1803981882&Signature=DVRyYKyPGB84n5O1phfb8w4EMNgr1-oW4YaMfgY2QeHQBBKCURHNPVh03J7Dl~SPGgdNn4KOViK31XRbUfopv9fwuw51lIom2YcoqhsmQ35jAbRo9dX9yjbf1~MU8b1~j061cvQheGXGqnGAsrAKlq9g3UjksIJ1kHsxGQP7FucjQeomnr0Kwxk8scBPojNu~KTiOP8HWdt3f2ozsndrUaaBSeoOKcxHMFMdBjPbFdaeGCEn3nIIWiZzWlAxYtQjys3kytYpEBNCNqXGMQqql7P6pswsemzgfqlDcOic4lRpVpyJaOk-t-DPXQM4WOQFzteiBRtHq41cJOf8DWFWHg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  cup:         "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/NWFgtxPyREOeemQB.png?Expires=1803981882&Signature=jMNzUf7gxfdU0Pr7y6gxJjSIAXv4t4x-7KT2F6n80GJf60vQ3joWSv5eZXGe95UNYki1PPoYs-TXBrwkzeokJtI7z5zYdyLuzKemPLMS2EkWD2Qy2zNiJl5yQJOLmFWI~89CgZI5mubZfcFISBt0G0xpc24bnkDxHNbPSqkPs5acv~yoexnor6EuXP3QXckWrk9gWjSdRCId1VarIgB7mLyW2~2if7l5IbP84RE0Cb1lH2UogA1WrPY9hTQhs6DPWFtrPNfPqVT7hvLE31w-5gOpBdk3poJMrCeJQcdhiny2EEuGmZ~3fYxJROhB~MA2KFBqxQ3k6tnuPHcaeFupSQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
  flatlay:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/sIUvLoVuXkcNIVqC.png?Expires=1803981882&Signature=cQalsyfOJ92b1CmiUaloQhm0OtG6Pkjr~dDHGjKX2ZIXA2Z5GMCpijbqB1ITeicf7A0teicSV-T1Szaus6yG7N3ilekXtXZTl4CVOQm8R3VpulrmL0DAlAaTJThpafL~b5H2o7rBjCc2fsyEGOlzJthoimbocl4bDevMNVQzFvfnqb0xAdfbWIi9P6XsmIGI05MdRA9A6HHvb-TQEP0eD7TXurk1Bo3DYaJzzSNKLAxOsGksKE5OTw9xATeDw7SRVBhrlCO9d-DQ~nYII2ptQrw48MhAm5yMWPZpm8h8RERkWaNnJ~FWu8t6Ket1H64thFsjzb9-5IO3Bicb2ToX6Q__&Key-Pair-Id=K2HSFNDJXOU9YS",
  topdown:     "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/SdfoCkxMnrZhIPbJ.png?Expires=1803981882&Signature=o1XT42FG2wyS9CL4csj80Cvqk~TGgIlg4bO3CcIvPD98fAQgmRI67RV5FIwB10fVjrUEEUSmT5Mz0vyRVgDTTluZg0rVg7w4NEJa7AgeTadORgf2782aFMeqKEuIB00QZ5wmjYnLcR4TtAN9O7g1ngTisSxNDA72pcn-3R7HoFutT34Cl75vU03ygGcQzR15IrPurj8t5B-ejxqHjvb2tqPV8qH3PgWdFeeXxYHJuYI~qJ1355wonYLfbjSv80~FkaJANIN-FxvrnWxvfLQR5a716rlw~bXILsUWX47m1GFxcq3Q86sbNXbGMZHLTHTGMUP~LbC9vjmUjUTn4NDbbg__&Key-Pair-Id=K2HSFNDJXOU9YS",
  drink:       "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/wYIdBazLChGbpZoi.png?Expires=1803981882&Signature=r8aNUmPX1mo7n94U~xjigExS~LKMlfznkG8-GghE8Il43uOuTqWY-sq0C8fogLrLSUhX7Xwoe2CUFdtQiFjEpLAPiEdbtX0HY-~YKKJugSAvrZPqDpmV50WY~LcEEYOQP-VC6mSOo1crvKO1CoHWYL5idqFBxpaubNLWxTIfgCTB6ZFFhXD2HPoK~biB4nZ-IX0X1EfGItzqU7SCgpISlYoW~zUqQiH7Szq4uGj2DCc7OhWWXmKYhgJnrApy1Jqd9UtjyHEYF5bbK4TbsD-wrS5wk5dxNMKX~W5gbjTsafbD6HMun4yvoEiJsggpgoV5RrACrQrGupt1efUC8mARDQ__&Key-Pair-Id=K2HSFNDJXOU9YS",
  beansClose:  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663382574925/ZOPZGUFxNYnFdWAv.png?Expires=1803981882&Signature=cuTIL3bCdYKKvigoDGQdO1OfnnyPbBA9qE3emNdrNcdpMS0aAWxkGGIppunrjQy27XXhOlyylNs7r4mBSZisw6M68Lv35vjq0dOKSnZjGCkzcQZKfXCfDOjlUymoB42QFHHvubgHsZxheAgOVPlJzdgfMUZdDp4D9EMLjakxAoTP1GYTqQRXw6RGl52PaUVWcl7T~cX~nnCRRWLPsHQsBECMU8wglvNcTvYgSaj83YTuE7IwHBuUNPXtnrURPamkXhAsRkNk5iyAI2siQWVdthCRoEBhgwhPqc6jSeWR3jmVWKdpgd39XUJMSbfdHdcb2lj3VmAUVbxXSk~EovhNCw__&Key-Pair-Id=K2HSFNDJXOU9YS",
};

// ─── Inline website preview components ───────────────────────────────────────
// These render ACTUAL website layouts (not raw photos) inside browser frames.

function CoffeeHomepagePreview() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#1A0F0A", color: "#F5EDD8", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}>
      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 12px", background: "rgba(26,15,10,0.97)", borderBottom: "1px solid rgba(212,175,55,0.2)", fontSize: "7px" }}>
        <span style={{ fontWeight: 700, letterSpacing: "2px", color: "#D4AF37", fontSize: "8px" }}>BELLA CUCINA</span>
        <div style={{ display: "flex", gap: "8px", color: "#C9B99A" }}>
          <span>Menu</span><span>About</span><span>Gallery</span><span>Contact</span>
        </div>
        <div style={{ background: "#D4AF37", color: "#1A0F0A", padding: "2px 7px", borderRadius: "2px", fontWeight: 700, fontSize: "6.5px" }}>Reserve</div>
      </div>
      {/* Hero */}
      <div style={{ position: "relative", height: "110px", overflow: "hidden" }}>
        <img src={IMG.atmosphere} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.38)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,15,10,0.9) 30%, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "5.5px", letterSpacing: "3px", color: "#D4AF37", marginBottom: "3px" }}>EST. 2018 · AMSTERDAM</div>
          <div style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.15, marginBottom: "5px" }}>Where Every<br /><em style={{ color: "#D4AF37" }}>Sip</em> Tells<br />a Story</div>
          <div style={{ display: "flex", gap: "5px" }}>
            <div style={{ background: "#D4AF37", color: "#1A0F0A", padding: "3px 8px", borderRadius: "2px", fontSize: "6px", fontWeight: 700 }}>View Menu</div>
            <div style={{ border: "1px solid rgba(245,234,216,0.4)", color: "#F5EDD8", padding: "3px 8px", borderRadius: "2px", fontSize: "6px" }}>Our Story</div>
          </div>
        </div>
      </div>
      {/* Tagline bar */}
      <div style={{ background: "#C8956C", padding: "4px 12px", display: "flex", justifyContent: "space-around" }}>
        {["Specialty Coffee", "Fresh Pastries", "Free WiFi", "Open Daily"].map(t => (
          <span key={t} style={{ fontSize: "5.5px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#1A0F0A", fontWeight: 700 }}>{t}</span>
        ))}
      </div>
      {/* Cards row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px", padding: "8px 10px" }}>
        {[
          { img: IMG.latte, name: "Signature Latte", price: "€5.80" },
          { img: IMG.drink, name: "Cold Brew", price: "€6.50" },
          { img: IMG.flatlay, name: "Morning Set", price: "€9.50" },
        ].map(item => (
          <div key={item.name} style={{ borderRadius: "4px", overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.08)" }}>
            <img src={item.img} alt="" style={{ width: "100%", height: "42px", objectFit: "cover" }} />
            <div style={{ padding: "4px 5px" }}>
              <div style={{ fontSize: "6px", fontWeight: 700, color: "#F5EDD8" }}>{item.name}</div>
              <div style={{ fontSize: "6px", color: "#D4AF37", fontWeight: 700, marginTop: "1px" }}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Review strip */}
      <div style={{ background: "#231508", padding: "5px 10px", textAlign: "center", borderTop: "1px solid rgba(212,175,55,0.12)" }}>
        <div style={{ fontSize: "6.5px", fontStyle: "italic", color: "#C9B99A" }}>"The best coffee in the city — warm, welcoming, always perfect."</div>
        <div style={{ fontSize: "6px", color: "#D4AF37", marginTop: "1px" }}>★★★★★ — Google Reviews · 4.9 (127 reviews)</div>
      </div>
    </div>
  );
}

function CoffeeMenuPreview() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#1A0F0A", color: "#F5EDD8", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}>
      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 12px", background: "rgba(26,15,10,0.97)", borderBottom: "1px solid rgba(212,175,55,0.2)", fontSize: "7px" }}>
        <span style={{ fontWeight: 700, letterSpacing: "2px", color: "#D4AF37", fontSize: "8px" }}>BELLA CUCINA</span>
        <div style={{ display: "flex", gap: "8px", color: "#C9B99A" }}>
          <span style={{ color: "#D4AF37", fontWeight: 700 }}>Menu</span><span>About</span><span>Gallery</span><span>Contact</span>
        </div>
        <div style={{ background: "#D4AF37", color: "#1A0F0A", padding: "2px 7px", borderRadius: "2px", fontWeight: 700, fontSize: "6.5px" }}>Reserve</div>
      </div>
      {/* Page header */}
      <div style={{ textAlign: "center", padding: "8px 12px 5px", borderBottom: "1px solid rgba(212,175,55,0.12)" }}>
        <div style={{ fontSize: "5.5px", letterSpacing: "3px", color: "#D4AF37", marginBottom: "2px" }}>OUR MENU</div>
        <div style={{ fontSize: "13px", fontWeight: 400 }}>Crafted with Passion</div>
      </div>
      {/* Category tabs */}
      <div style={{ display: "flex", gap: "3px", padding: "5px 10px", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        {["Coffee", "Cold Drinks", "Pastries", "Breakfast"].map((tab, i) => (
          <div key={tab} style={{ padding: "2px 7px", borderRadius: "20px", fontSize: "6px", background: i === 0 ? "#D4AF37" : "rgba(212,175,55,0.08)", color: i === 0 ? "#1A0F0A" : "#C9B99A", fontWeight: i === 0 ? 700 : 400 }}>{tab}</div>
        ))}
      </div>
      {/* Menu grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", padding: "7px 10px" }}>
        {[
          { img: IMG.latte, name: "Signature Latte", desc: "Oat milk, vanilla, espresso", price: "€5.80" },
          { img: IMG.cup, name: "Flat White", desc: "Double ristretto, steamed milk", price: "€4.80" },
          { img: IMG.topdown, name: "Cold Brew", desc: "12-hour brew, over ice", price: "€5.20" },
          { img: IMG.drink, name: "Iced Matcha", desc: "Ceremonial grade, oat milk", price: "€6.00" },
        ].map(item => (
          <div key={item.name} style={{ display: "flex", gap: "5px", alignItems: "center", background: "rgba(255,255,255,0.03)", borderRadius: "4px", padding: "4px", border: "1px solid rgba(212,175,55,0.07)" }}>
            <img src={item.img} alt="" style={{ width: "32px", height: "32px", borderRadius: "3px", objectFit: "cover", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "6.5px", fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: "5.5px", color: "#8B7355", marginTop: "1px" }}>{item.desc}</div>
              <div style={{ fontSize: "6.5px", color: "#D4AF37", fontWeight: 700, marginTop: "1px" }}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Gallery strip */}
      <div style={{ display: "flex", gap: "4px", padding: "0 10px 7px" }}>
        {[IMG.beans, IMG.flatlay, IMG.beansClose].map((src, i) => (
          <img key={i} src={src} alt="" style={{ flex: 1, height: "30px", objectFit: "cover", borderRadius: "3px" }} />
        ))}
      </div>
    </div>
  );
}

function CoffeeContactPreview() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#1A0F0A", color: "#F5EDD8", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}>
      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 12px", background: "rgba(26,15,10,0.97)", borderBottom: "1px solid rgba(212,175,55,0.2)", fontSize: "7px" }}>
        <span style={{ fontWeight: 700, letterSpacing: "2px", color: "#D4AF37", fontSize: "8px" }}>BELLA CUCINA</span>
        <div style={{ display: "flex", gap: "8px", color: "#C9B99A" }}>
          <span>Menu</span><span>About</span><span>Gallery</span><span style={{ color: "#D4AF37", fontWeight: 700 }}>Contact</span>
        </div>
        <div style={{ background: "#D4AF37", color: "#1A0F0A", padding: "2px 7px", borderRadius: "2px", fontWeight: 700, fontSize: "6.5px" }}>Reserve</div>
      </div>
      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "calc(100% - 25px)" }}>
        {/* Left: photo + info */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={IMG.atmosphere} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }} />
          <div style={{ position: "absolute", inset: 0, padding: "12px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ fontSize: "5.5px", letterSpacing: "3px", color: "#D4AF37", marginBottom: "3px" }}>FIND US</div>
            <div style={{ fontSize: "11px", fontWeight: 400, marginBottom: "6px" }}>Come Visit Us</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {["📍 12 Keizersgracht, Amsterdam", "🕐 Mon–Fri: 7am – 9pm", "📞 +31 20-123-4567", "📱 @bellacucina.ams"].map(t => (
                <div key={t} style={{ fontSize: "6px", color: "#C9B99A" }}>{t}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", marginTop: "7px" }}>
              <div style={{ background: "#25D366", color: "#fff", padding: "3px 7px", borderRadius: "2px", fontSize: "6px", fontWeight: 700 }}>WhatsApp</div>
              <div style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", padding: "3px 7px", borderRadius: "2px", fontSize: "6px" }}>Directions</div>
            </div>
          </div>
        </div>
        {/* Right: form */}
        <div style={{ padding: "12px", background: "#120A06" }}>
          <div style={{ fontSize: "5.5px", letterSpacing: "3px", color: "#D4AF37", marginBottom: "2px" }}>RESERVATIONS</div>
          <div style={{ fontSize: "10px", fontWeight: 400, marginBottom: "7px" }}>Book a Table</div>
          {["Your Name", "Phone Number", "Date & Time"].map(f => (
            <div key={f} style={{ marginBottom: "4px" }}>
              <div style={{ fontSize: "5.5px", color: "#8B7355", marginBottom: "1px" }}>{f}</div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: "3px", padding: "3px 5px", fontSize: "6px", color: "#4A3A2A" }}>—</div>
            </div>
          ))}
          <div style={{ background: "#D4AF37", color: "#1A0F0A", padding: "4px", borderRadius: "3px", fontSize: "6.5px", fontWeight: 700, textAlign: "center", marginTop: "6px" }}>Send Reservation</div>
          <div style={{ marginTop: "7px", background: "#2A1A10", borderRadius: "3px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212,175,55,0.08)" }}>
            <span style={{ fontSize: "6px", color: "#8B7355" }}>📍 Google Maps — Keizersgracht</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoffeeMobilePreview() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#1A0F0A", color: "#F5EDD8", width: "100%", height: "100%", overflow: "hidden", userSelect: "none", position: "relative" }}>
      {/* Mobile nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(26,15,10,0.98)", borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "2px", color: "#D4AF37" }}>BELLA CUCINA</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: "20px", height: "2px", background: "#D4AF37" }} />)}
        </div>
      </div>
      {/* Hero */}
      <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
        <img src={IMG.latte} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.38)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 12px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "2.5px", color: "#D4AF37", marginBottom: "5px" }}>ARTISAN COFFEE</div>
          <div style={{ fontSize: "22px", fontWeight: 400, lineHeight: 1.1, marginBottom: "10px" }}>Where Every<br />Cup Tells<br />a Story</div>
          <div style={{ background: "#D4AF37", color: "#1A0F0A", padding: "6px 16px", borderRadius: "3px", fontSize: "11px", fontWeight: 700 }}>View Menu</div>
        </div>
      </div>
      {/* Feature items */}
      <div style={{ padding: "12px 12px 0" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#D4AF37", marginBottom: "8px" }}>FEATURED</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {[
            { img: IMG.cup, name: "Signature Latte", price: "€5.80", desc: "Oat milk & vanilla" },
            { img: IMG.flatlay, name: "Morning Set", price: "€9.50", desc: "Coffee + pastry" },
          ].map(item => (
            <div key={item.name} style={{ display: "flex", gap: "9px", alignItems: "center", background: "rgba(255,255,255,0.04)", borderRadius: "6px", padding: "7px", border: "1px solid rgba(212,175,55,0.08)" }}>
              <img src={item.img} alt="" style={{ width: "52px", height: "52px", borderRadius: "5px", objectFit: "cover", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700 }}>{item.name}</div>
                <div style={{ fontSize: "10px", color: "#8B7355", marginTop: "2px" }}>{item.desc}</div>
                <div style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, marginTop: "2px" }}>{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#231508", borderTop: "1px solid rgba(212,175,55,0.15)", padding: "7px 10px", display: "flex", justifyContent: "space-around" }}>
        {[["🏠","Home"],["☕","Menu"],["🖼","Gallery"],["📞","Contact"]].map(([icon, label], i) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
            <span style={{ fontSize: "16px" }}>{icon}</span>
            <span style={{ fontSize: "9px", color: i === 0 ? "#D4AF37" : "#8B7355" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile Menu Preview ────────────────────────────────────────────────────
function CoffeeMobileMenuPreview() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#1A0F0A", color: "#F5EDD8", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(26,15,10,0.98)", borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "2px", color: "#D4AF37" }}>BELLA CUCINA</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: "20px", height: "2px", background: "#D4AF37" }} />)}
        </div>
      </div>
      <div style={{ padding: "10px 14px 6px", borderBottom: "1px solid rgba(212,175,55,0.1)", textAlign: "center" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2.5px", color: "#D4AF37", marginBottom: "3px" }}>OUR MENU</div>
        <div style={{ fontSize: "18px" }}>Crafted with Passion</div>
      </div>
      <div style={{ display: "flex", gap: "6px", padding: "8px 14px", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        {["Coffee", "Cold Brew", "Pastries"].map((tab, i) => (
          <div key={tab} style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "10px", background: i === 0 ? "#D4AF37" : "rgba(212,175,55,0.08)", color: i === 0 ? "#1A0F0A" : "#C9B99A", fontWeight: i === 0 ? 700 : 400 }}>{tab}</div>
        ))}
      </div>
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "7px" }}>
        {[
          { img: IMG.latte, name: "Signature Latte", price: "€5.80" },
          { img: IMG.cup, name: "Flat White", price: "€4.80" },
          { img: IMG.drink, name: "Iced Matcha", price: "€6.00" },
        ].map(item => (
          <div key={item.name} style={{ display: "flex", gap: "9px", alignItems: "center", background: "rgba(255,255,255,0.04)", borderRadius: "6px", padding: "7px", border: "1px solid rgba(212,175,55,0.08)" }}>
            <img src={item.img} alt="" style={{ width: "48px", height: "48px", borderRadius: "5px", objectFit: "cover", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, marginTop: "3px" }}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile Contact Preview ───────────────────────────────────────────────────
function CoffeeMobileContactPreview() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#1A0F0A", color: "#F5EDD8", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(26,15,10,0.98)", borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "2px", color: "#D4AF37" }}>BELLA CUCINA</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: "20px", height: "2px", background: "#D4AF37" }} />)}
        </div>
      </div>
      <div style={{ position: "relative", height: "120px", overflow: "hidden" }}>
        <img src={IMG.atmosphere} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ fontSize: "9px", letterSpacing: "2.5px", color: "#D4AF37", marginBottom: "4px" }}>FIND US</div>
          <div style={{ fontSize: "20px", fontWeight: 400 }}>Come Visit Us</div>
        </div>
      </div>
      <div style={{ padding: "12px 12px", display: "flex", flexDirection: "column", gap: "7px" }}>
        {["\ud83d\udccd 12 Keizersgracht, Amsterdam", "\ud83d\udd50 Mon\u2013Fri: 7am \u2013 9pm", "\ud83d\udcde +31 20-123-4567", "\ud83d\udcf1 @bellacucina.ams"].map(t => (
          <div key={t} style={{ fontSize: "11px", color: "#C9B99A", padding: "6px 8px", background: "rgba(255,255,255,0.03)", borderRadius: "5px", border: "1px solid rgba(212,175,55,0.08)" }}>{t}</div>
        ))}
      </div>
      <div style={{ padding: "0 12px", marginTop: "6px" }}>
        <div style={{ background: "#25D366", color: "#fff", padding: "9px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, textAlign: "center" }}>WhatsApp Us</div>
      </div>
    </div>
  );
}

// ─── Browser Chrome Frame ─────────────────────────────────────────────────────
function BrowserFrame({ children, url = "bellacucina.com", height = 220 }: { children: React.ReactNode; url?: string; height?: number }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200/80" style={{ background: "#fff" }}>
      {/* Chrome bar */}
      <div style={{ height: "28px", background: "#F0F0F0", borderBottom: "1px solid #E0E0E0", display: "flex", alignItems: "center", padding: "0 10px", gap: "6px" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: "4px", height: "16px", display: "flex", alignItems: "center", padding: "0 8px", border: "1px solid #E0E0E0" }}>
          <span style={{ fontSize: "8px", color: "#888", fontFamily: "monospace" }}>🔒 {url}</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ height: `${height}px`, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────
// Modern phone proportions: ~375×812 real device → displayed at 200px wide
// Aspect ratio 9:19.5 → height = width × (19.5/9) ≈ 2.17
function PhoneFrame({ children }: { children: React.ReactNode }) {
  const W = 200; // display width in px
  const CONTENT_H = Math.round(W * (19.5 / 9)) - 48; // subtract notch+bar
  return (
    <div style={{
      width: `${W}px`,
      borderRadius: "28px",
      overflow: "hidden",
      border: "3px solid #2A2A2A",
      background: "#1A1A1A",
      boxShadow: "0 20px 60px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)",
      flexShrink: 0,
      position: "relative",
    }}>
      {/* Notch / Dynamic Island */}
      <div style={{ height: "28px", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Side buttons (decorative) */}
        <div style={{ position: "absolute", left: "-3px", top: "30px", width: "3px", height: "28px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "-3px", top: "66px", width: "3px", height: "28px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: "-3px", top: "44px", width: "3px", height: "44px", background: "#333", borderRadius: "0 2px 2px 0" }} />
        {/* Dynamic island pill */}
        <div style={{ width: "72px", height: "14px", borderRadius: "20px", background: "#000" }} />
      </div>
      {/* Screen content */}
      <div style={{ height: `${CONTENT_H}px`, overflow: "hidden", position: "relative", background: "#000" }}>
        {children}
      </div>
      {/* Home indicator bar */}
      <div style={{ height: "20px", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "60px", height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.25)" }} />
      </div>
    </div>
  );
}

// ─── Template Card Composite Preview ─────────────────────────────────────────
function TemplateCardPreview() {
  return (
    <div className="relative w-full" style={{ height: "260px", background: "linear-gradient(135deg, #F0F4FF 0%, #F5F0FF 100%)", borderRadius: "12px 12px 0 0", overflow: "hidden", padding: "14px 14px 0" }}>
      {/* Desktop preview — takes most of the space */}
      <div style={{ position: "absolute", left: "12px", top: "12px", right: "100px", bottom: "0" }}>
        <BrowserFrame url="bellacucina.com" height={238}>
          <CoffeeHomepagePreview />
        </BrowserFrame>
      </div>
      {/* Phone preview — overlapping bottom-right, scaled down to fit card */}
      <div style={{ position: "absolute", right: "8px", bottom: "0", zIndex: 10, transform: "scale(0.46)", transformOrigin: "bottom right" }}>
        <PhoneFrame>
          <CoffeeMobilePreview />
        </PhoneFrame>
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
  { id: "retail", label: "Retail & Boutique", icon: "◻" },
  { id: "services", label: "Professional Services", icon: "◇" },
];

// ─── Template data ────────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "coffee-warm",
    industry: "restaurant",
    name: "Bella Cucina",
    tagline: "Warm & Artisan",
    tier: "Business",
    tierGradient: "linear-gradient(135deg, #C8956C, #8B5E3C)",
    palette: ["#1A0F0A", "#C8956C", "#F5EDD8", "#8B5E3C", "#D4AF37"],
    paletteNames: ["Dark Espresso", "Warm Amber", "Cream", "Rich Brown", "Gold"],
    features: [
      "Menu showcase with photos & pricing",
      "Our Story / About section",
      "Photo gallery grid",
      "Google Reviews integration",
      "Reserve a table CTA",
      "WhatsApp & Instagram links",
      "Google Maps embed",
      "Mobile responsive",
    ],
    pages: [
      { label: "Homepage", preview: "home", mobilePreview: true, description: "Cinematic hero with atmosphere photography, tagline bar, and featured menu items" },
      { label: "Menu & Gallery", preview: "menu", mobilePreview: false, description: "Category tabs, drink & food cards with pricing, and a curated photo gallery" },
      { label: "Contact & Find Us", preview: "contact", mobilePreview: false, description: "Opening hours, address, Google Maps embed, WhatsApp CTA, and reservation form" },
    ],
    style: "Warm dark tones, serif typography, cream & gold palette. Perfect for specialty coffee shops, artisan cafés, and bistros.",
    waMessage: "Hi! I'm interested in the Bella Cucina coffee shop website template.",
    price: "€350",
  },
];

// ─── Modal preview renderer ───────────────────────────────────────────────────
function ModalPreview({ page, view }: { page: string; view: "desktop" | "mobile" }) {
  if (view === "mobile") {
    const mobileMap: Record<string, React.ReactNode> = {
      home: <CoffeeMobilePreview />,
      menu: <CoffeeMobileMenuPreview />,
      contact: <CoffeeMobileContactPreview />,
    };
    return (
      <div className="flex justify-center items-center" style={{ background: "linear-gradient(135deg, #F0F4FF, #F5F0FF)", borderRadius: "12px", padding: "32px 24px", minHeight: "560px" }}>
        <PhoneFrame>
          {mobileMap[page] ?? <CoffeeMobilePreview />}
        </PhoneFrame>
      </div>
    );
  }
  const map: Record<string, React.ReactNode> = {
    home: <CoffeeHomepagePreview />,
    menu: <CoffeeMenuPreview />,
    contact: <CoffeeContactPreview />,
  };
  return (
    <BrowserFrame url="bellacucina.com" height={280}>
      {map[page] ?? <CoffeeHomepagePreview />}
    </BrowserFrame>
  );
}

// ─── Template Detail Modal ────────────────────────────────────────────────────
function TemplateModal({ template, onClose }: { template: typeof TEMPLATES[0]; onClose: () => void }) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop");
  const activePage = template.pages[activePageIndex];
  const waUrl = `https://wa.me/972584928177?text=${encodeURIComponent(template.waMessage)}`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(17,19,21,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl"
        style={{ border: "1px solid rgba(91,140,255,0.15)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: template.tierGradient }}>
                {template.tier}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{template.tagline} · {INDUSTRIES.find(i => i.id === template.industry)?.label}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Preview */}
          <div className="lg:col-span-2 space-y-4">
            {/* Page + view selector */}
            <div className="flex flex-wrap gap-2 items-center">
              {template.pages.map((page, i) => (
                <button
                  key={i}
                  onClick={() => setActivePageIndex(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activePageIndex === i
                      ? "text-white shadow-md"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                  }`}
                  style={activePageIndex === i ? { background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)" } : {}}
                >
                  {page.label}
                </button>
              ))}
              <div className="ml-auto flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveView("desktop")}
                  className={`p-1.5 rounded-md transition-colors ${activeView === "desktop" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                  title="Desktop view"
                >
                  <Monitor size={15} />
                </button>
                <button
                  onClick={() => setActiveView("mobile")}
                  className={`p-1.5 rounded-md transition-colors ${activeView === "mobile" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                  title="Mobile view"
                >
                  <Smartphone size={15} />
                </button>
              </div>
            </div>

            {/* Preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePageIndex}-${activeView}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <ModalPreview page={activePage.preview} view={activeView} />
              </motion.div>
            </AnimatePresence>

            <p className="text-gray-500 text-sm leading-relaxed">{activePage.description}</p>

            {/* Colour palette */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-gray-400 text-xs uppercase tracking-widest">Colour Palette</span>
              <div className="flex gap-2">
                {template.palette.map((color, i) => (
                  <div key={color} className="group relative">
                    <div className="w-7 h-7 rounded-full border-2 border-white shadow-md cursor-default" style={{ background: color }} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {template.paletteNames[i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details + CTA */}
          <div className="space-y-5">
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

            {/* Pricing + CTA */}
            <div className="rounded-xl p-4 border border-gray-200" style={{ background: "linear-gradient(135deg, #F8F9FF, #F5F0FF)" }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">{template.price}</span>
                <span className="text-gray-500 text-sm">one-time</span>
              </div>
              <p className="text-gray-400 text-xs mb-4">50% upfront · 50% on delivery</p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get This Template
              </a>
              <p className="text-center text-gray-400 text-xs mt-2">We'll personalise it for your business</p>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-gray-500 text-xs">Loved by 50+ businesses</span>
            </div>
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
      {/* Composite preview */}
      <div className="relative overflow-hidden">
        <TemplateCardPreview />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/8 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm shadow-xl flex items-center gap-2"
            style={{ transform: "translateY(8px)" }}
          >
            Preview Template <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>

      {/* Card info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-gray-900 font-bold text-lg leading-tight">{template.name}</h3>
            <p className="text-gray-500 text-sm">{template.tagline}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white flex-shrink-0" style={{ background: template.tierGradient }}>
            {template.tier}
          </span>
        </div>

        {/* Palette */}
        <div className="flex items-center gap-2 mb-4">
          {template.palette.map(color => (
            <div key={color} className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: color }} />
          ))}
          <span className="text-gray-400 text-xs ml-1">Warm Dark</span>
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.features.slice(0, 3).map(f => (
            <span key={f} className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-500 text-xs">{f}</span>
          ))}
          <span className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-400 text-xs">+{template.features.length - 3} more</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg">{template.price}</span>
          <button className="flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: "#5B8CFF" }}>
            View Details <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Templates() {
  const [location] = useLocation();
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);

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
    <div className="min-h-screen" style={{ background: "#F6F6F4" }}>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.06) 0%, transparent 50%, rgba(139,92,255,0.06) 100%)" }} />
        <div className="absolute top-16 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(91,140,255,0.08)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(139,92,255,0.07)" }} />

        <div className="relative container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#5B8CFF" }}>Website Templates</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Find Your Perfect
              <span className="block" style={{ background: "linear-gradient(135deg, #5B8CFF, #6FE3FF, #8B5CFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Website Style
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Browse our curated designs by industry. Each template is fully customised for your business — your logo, your colours, your content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Industry Filter */}
      <section className="sticky top-16 z-30 py-4" style={{ background: "rgba(246,246,244,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(226,229,234,0.6)" }}>
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {INDUSTRIES.map(industry => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
                style={
                  activeIndustry === industry.id
                    ? { background: "linear-gradient(135deg, #5B8CFF, #8B5CFF)", color: "#fff", boxShadow: "0 4px 12px rgba(91,140,255,0.3)" }
                    : { background: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }
                }
              >
                <span style={{ fontSize: "12px" }}>{industry.icon}</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onClick={() => setSelectedTemplate(template)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 text-3xl shadow-md border border-gray-100" style={{ fontFamily: "monospace" }}>
                {INDUSTRIES.find(i => i.id === activeIndustry)?.icon}
              </div>
              <h3 className="text-gray-900 text-2xl font-bold mb-3">
                {INDUSTRIES.find(i => i.id === activeIndustry)?.label} Templates
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                We're crafting beautiful templates for this industry. In the meantime, we can build a completely custom design for your business — just reach out.
              </p>
              <a
                href={`https://wa.me/972584928177?text=${encodeURIComponent(`Hi! I'm interested in a ${INDUSTRIES.find(i => i.id === activeIndustry)?.label} website.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Request a Custom Design
              </a>
            </motion.div>
          )}

          {/* Coming Soon teaser */}
          {(activeIndustry === "all" || activeIndustry === "restaurant") && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-8">More industries coming soon</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {comingSoon.map(industry => (
                  <button
                    key={industry.id}
                    onClick={() => setActiveIndustry(industry.id)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <span className="text-xl text-gray-400 group-hover:text-blue-500 transition-colors">{industry.icon}</span>
                    <span className="text-gray-500 text-xs text-center group-hover:text-gray-700 transition-colors">{industry.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Coming Soon</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(226,229,234,0.8)" }}>
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Don't see what you're looking for?</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Every website we build is fully custom. Tell us about your business and we'll design something unique — just for you.
            </p>
            <a
              href="https://wa.me/972584928177?text=Hi!%20I'd%20like%20a%20custom%20website%20design%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
          <TemplateModal
            template={selectedTemplate}
            onClose={() => setSelectedTemplate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
