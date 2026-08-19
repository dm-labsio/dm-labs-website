/* D&M LABS - WhatsApp Floating Button — EN/EL/HE
 * Styled in brand gradient (#5B8CFF to #8B5CFF) instead of WhatsApp green.
 */
import { useState } from "react";

const WA_EN = "https://wa.me/35797472847?text=Hi%20D%26M%20Labs!%20I%27d%20like%20to%20discuss%20a%20website%20project.";
const WA_EL = "https://wa.me/35797472847?text=%CE%93%CE%B5%CE%B9%CE%B1%20%CF%83%CE%B1%CF%82!%20%CE%98%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%83%CF%85%CE%B6%CE%B7%CF%84%CE%AE%CF%83%CE%BF%CF%85%CE%BC%CE%B5%20%CE%B3%CE%B9%CE%B1%20%CE%BC%CE%B9%CE%B1%20%CE%B9%CF%83%CF%84%CE%BF%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1.";
const WA_HE = "https://wa.me/35797472847?text=%D7%A9%D7%9C%D7%95%D7%9D%20DM-Labs.io%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%9C%D7%92%D7%91%D7%99%20%D7%90%D7%AA%D7%A8%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%99.";

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const locale = typeof window !== "undefined" && window.location.pathname.startsWith("/he")
    ? "he"
    : typeof window !== "undefined" && window.location.pathname.startsWith("/el") ? "el" : "en";
  const tooltip = locale === "he" ? "יש שאלה? דברו איתנו!" : locale === "el" ? "Γρήγορη ερώτηση; Γράψτε μας!" : "Quick question? Message us!";
  const waUrl = locale === "he" ? WA_HE : locale === "el" ? WA_EL : WA_EN;
  const ariaLabel = locale === "he" ? "פנייה אלינו ב-WhatsApp" : locale === "el" ? "Επικοινωνήστε μαζί μας στο WhatsApp" : "Chat with us on WhatsApp";

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div
        className="bg-[#111315] text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-200"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(4px)", pointerEvents: "none" }}
      >
        {tooltip}
      </div>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        style={{ background: "linear-gradient(135deg, #5B8CFF 0%, #8B5CFF 100%)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: "linear-gradient(135deg, #5B8CFF 0%, #8B5CFF 100%)" }}
        />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true" className="relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
