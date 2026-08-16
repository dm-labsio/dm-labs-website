/**
 * Coffee Shop Template Preview - "Bella Cucina Coffee"
 * Design: Warm dark palette, serif headings, cream/brown tones
 * Used as an iframe-able preview inside the Templates page
 * Assets: User-provided coffee photography
 */

// Asset CDN URLs
const ASSETS = {
  hero: "/media/manus/wKIdXpGmmVCSthKZ.webp",
  latte: "/media/manus/hQhfPYkYlaAYIOxo.webp",
  beans: "/media/manus/vQfwoFWkgBzXxfTl.webp",
  drink: "/media/manus/NWFgtxPyREOeemQB.webp",
  flatlay: "/media/manus/sIUvLoVuXkcNIVqC.webp",
  topdown: "/media/manus/SdfoCkxMnrZhIPbJ.webp",
  product: "/media/manus/wYIdBazLChGbpZoi.webp",
};

// This component renders a full standalone coffee shop website preview
// It's used inside an iframe or as a standalone route for screenshotting
export default function CoffeeShopTemplate() {
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#1a1008", color: "#f5ead8", minHeight: "100vh", margin: 0, padding: 0 }}>
      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid rgba(245,234,216,0.1)", background: "rgba(26,16,8,0.95)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #c8956c, #8b5e3c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>☕</div>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.05em", color: "#f5ead8" }}>Bella Cucina</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {["Menu", "Our Story", "Gallery", "Contact"].map(item => (
            <span key={item} style={{ color: "#c8a882", cursor: "pointer" }}>{item}</span>
          ))}
        </div>
        <button style={{ padding: "10px 24px", background: "linear-gradient(135deg, #c8956c, #8b5e3c)", border: "none", borderRadius: 4, color: "#fff", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}>
          Reserve a Table
        </button>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: 600, overflow: "hidden" }}>
        <img src={ASSETS.hero} alt="Coffee shop interior" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,16,8,0.85) 40%, rgba(26,16,8,0.3) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px" }}>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8956c", marginBottom: 16 }}>Est. 2018 · Amsterdam</p>
          <h1 style={{ fontSize: 64, fontWeight: 400, lineHeight: 1.1, marginBottom: 24, maxWidth: 500 }}>
            Where Every<br /><em style={{ color: "#c8956c" }}>Sip</em> Tells<br />a Story
          </h1>
          <p style={{ fontSize: 16, color: "#c8a882", maxWidth: 380, lineHeight: 1.7, marginBottom: 36 }}>
            Specialty coffee, handcrafted pastries, and a warm corner of the world - just for you.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ padding: "14px 32px", background: "linear-gradient(135deg, #c8956c, #8b5e3c)", border: "none", borderRadius: 4, color: "#fff", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}>
              View Our Menu
            </button>
            <button style={{ padding: "14px 32px", background: "transparent", border: "1px solid rgba(245,234,216,0.4)", borderRadius: 4, color: "#f5ead8", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* TAGLINE BAR */}
      <div style={{ background: "#c8956c", padding: "16px 48px", display: "flex", justifyContent: "center", gap: 64 }}>
        {["Specialty Coffee", "Fresh Daily Pastries", "Free WiFi", "Open 7 Days"].map(item => (
          <span key={item} style={{ fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a1008", fontWeight: 600 }}>{item}</span>
        ))}
      </div>

      {/* MENU HIGHLIGHTS */}
      <section style={{ padding: "80px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8956c", marginBottom: 12 }}>Our Offerings</p>
          <h2 style={{ fontSize: 42, fontWeight: 400, color: "#f5ead8" }}>Crafted with Passion</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {[
            { img: ASSETS.latte, name: "Signature Latte", desc: "Velvety espresso with steamed oat milk and our house caramel drizzle", price: "€5.80" },
            { img: ASSETS.drink, name: "Cold Brew Reserve", desc: "18-hour slow-steeped Colombian beans, served over hand-chipped ice", price: "€6.50" },
            { img: ASSETS.flatlay, name: "Morning Set", desc: "Your choice of coffee paired with a freshly baked croissant or muffin", price: "€9.50" },
          ].map((item) => (
            <div key={item.name} style={{ background: "rgba(245,234,216,0.04)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(245,234,216,0.08)" }}>
              <div style={{ height: 220, overflow: "hidden" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} />
              </div>
              <div style={{ padding: "24px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 400, color: "#f5ead8" }}>{item.name}</h3>
                  <span style={{ fontSize: 18, color: "#c8956c", fontWeight: 600 }}>{item.price}</span>
                </div>
                <p style={{ fontSize: 14, color: "#9a7e65", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button style={{ padding: "14px 40px", border: "1px solid #c8956c", borderRadius: 4, background: "transparent", color: "#c8956c", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
            View Full Menu
          </button>
        </div>
      </section>

      {/* STORY SECTION */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 480 }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={ASSETS.beans} alt="Coffee beans" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,16,8,0.3)" }} />
        </div>
        <div style={{ background: "#231508", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 64px" }}>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8956c", marginBottom: 16 }}>Our Story</p>
          <h2 style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.3, marginBottom: 24, color: "#f5ead8" }}>
            Born from a<br /><em style={{ color: "#c8956c" }}>Love of Coffee</em>
          </h2>
          <p style={{ fontSize: 15, color: "#9a7e65", lineHeight: 1.8, marginBottom: 16 }}>
            We started Bella Cucina in 2018 with a simple belief: that a great cup of coffee can change the tone of an entire day. We source our beans directly from small farms in Ethiopia and Colombia, roasting them in-house every week.
          </p>
          <p style={{ fontSize: 15, color: "#9a7e65", lineHeight: 1.8, marginBottom: 32 }}>
            Every drink on our menu is crafted by hand, with care, by baristas who genuinely love what they do.
          </p>
          <button style={{ alignSelf: "flex-start", padding: "12px 28px", background: "linear-gradient(135deg, #c8956c, #8b5e3c)", border: "none", borderRadius: 4, color: "#fff", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}>
            Meet the Team
          </button>
        </div>
      </section>

      {/* GALLERY ROW */}
      <section style={{ padding: "80px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8956c", marginBottom: 12 }}>Gallery</p>
          <h2 style={{ fontSize: 36, fontWeight: 400, color: "#f5ead8" }}>A Glimpse Inside</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16, height: 340 }}>
          <div style={{ borderRadius: 8, overflow: "hidden" }}>
            <img src={ASSETS.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ borderRadius: 8, overflow: "hidden", flex: 1 }}>
              <img src={ASSETS.topdown} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ borderRadius: 8, overflow: "hidden", flex: 1 }}>
              <img src={ASSETS.product} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ borderRadius: 8, overflow: "hidden" }}>
            <img src={ASSETS.latte} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background: "#231508", padding: "80px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8956c", marginBottom: 12 }}>Reviews</p>
          <h2 style={{ fontSize: 36, fontWeight: 400, color: "#f5ead8" }}>What Our Guests Say</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 12 }}>
            {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#c8956c", fontSize: 20 }}>{s}</span>)}
          </div>
          <p style={{ color: "#9a7e65", marginTop: 8, fontSize: 14 }}>4.9 · 312 Google Reviews</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { name: "Noa K.", text: "The best latte I've had in Amsterdam. The atmosphere is warm and the staff genuinely care. My go-to spot every morning. The atmosphere is warm and the staff genuinely care. My go-to spot every morning." },
            { name: "Daniel R.", text: "Incredible coffee and even better pastries. The cold brew is absolutely perfect - smooth, not bitter at all." },
            { name: "Maya S.", text: "I discovered Bella Cucina last month and now I can't imagine my week without it. The morning set is a ritual now." },
          ].map(r => (
            <div key={r.name} style={{ background: "rgba(245,234,216,0.04)", border: "1px solid rgba(245,234,216,0.08)", borderRadius: 8, padding: "28px 28px" }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#c8956c", fontSize: 14 }}>{s}</span>)}
              </div>
              <p style={{ fontSize: 15, color: "#c8a882", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{r.text}"</p>
              <p style={{ fontSize: 13, color: "#9a7e65", letterSpacing: "0.05em" }}>- {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / FIND US */}
      <section style={{ padding: "80px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8956c", marginBottom: 16 }}>Find Us</p>
          <h2 style={{ fontSize: 36, fontWeight: 400, color: "#f5ead8", marginBottom: 32 }}>Come Visit Us</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Address", value: "12 Keizersgracht, Amsterdam" },
              { label: "Hours", value: "Mon-Fri: 7:00-20:00 · Sat-Sun: 8:00-21:00" },
              { label: "Phone", value: "+972 50-000-0000" },
              { label: "Instagram", value: "@bellacucina.tlv" },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8956c", marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontSize: 15, color: "#c8a882" }}>{item.value}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
            <button style={{ padding: "12px 28px", background: "linear-gradient(135deg, #c8956c, #8b5e3c)", border: "none", borderRadius: 4, color: "#fff", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}>
              Reserve a Table
            </button>
            <button style={{ padding: "12px 28px", background: "transparent", border: "1px solid rgba(245,234,216,0.3)", borderRadius: 4, color: "#f5ead8", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
              WhatsApp Us
            </button>
          </div>
        </div>
        <div style={{ background: "#c8956c20", borderRadius: 12, height: 320, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(200,149,108,0.2)" }}>
          <div style={{ textAlign: "center", color: "#9a7e65" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📍</div>
            <p style={{ fontSize: 14, letterSpacing: "0.1em" }}>Google Maps Embed</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>12 Keizersgracht, Amsterdam</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0d0804", padding: "40px 80px", borderTop: "1px solid rgba(245,234,216,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #c8956c, #8b5e3c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>☕</div>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#f5ead8" }}>Bella Cucina</span>
        </div>
        <p style={{ fontSize: 12, color: "#5a4535", letterSpacing: "0.05em" }}>© 2025 Bella Cucina Coffee · All rights reserved</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Instagram", "Facebook", "WhatsApp"].map(s => (
            <span key={s} style={{ fontSize: 12, color: "#9a7e65", letterSpacing: "0.1em", cursor: "pointer" }}>{s}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
