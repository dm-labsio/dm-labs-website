/* D&M LABS - 404 Page (EN/EL/HE route-aware) */
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [location] = useLocation();
  const isGreek = location.startsWith("/el");
  const isHebrew = location.startsWith("/he");

  // SEO: set correct title, noindex, and remove canonical for 404 pages
  useEffect(() => {
    // Title
    document.title = isHebrew
      ? "הדף לא נמצא | DM-Labs.io"
      : isGreek
        ? "Σελίδα Δεν Βρέθηκε | DM-Labs.io"
        : "Page Not Found | DM-Labs.io";

    // Noindex — override any existing robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");

    // Remove canonical — 404 pages must not self-canonicalise
    document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());

    return () => {
      // Restore robots to indexable on unmount (navigating away from 404)
      const tag = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (tag) tag.setAttribute("content", "index, follow");
    };
  }, [isGreek, isHebrew]);

  if (isHebrew) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center" dir="rtl">
        <div className="container text-center py-20">
          <p className="text-8xl font-bold brand-gradient-text mb-4">404</p>
          <h1 className="text-3xl font-bold text-[#111315] mb-3">הדף לא נמצא</h1>
          <p className="text-[#5B6472] mb-8 max-w-sm mx-auto">
            העמוד שחיפשתם אינו קיים. אפשר לחזור לדף הבית ולמצוא את מה שצריך.
          </p>
          <Link href="/he/" className="btn-primary">
            <ArrowLeft size={16} /> חזרה לדף הבית
          </Link>
        </div>
      </div>
    );
  }

  if (isGreek) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="container text-center py-20">
          <p className="text-8xl font-bold brand-gradient-text mb-4">404</p>
          <h1 className="text-3xl font-bold text-[#111315] mb-3">Η Σελίδα Δεν Βρέθηκε</h1>
          <p className="text-[#5B6472] mb-8 max-w-sm mx-auto">
            Η σελίδα που ψάχνετε δεν υπάρχει. Ας σας επαναφέρουμε στη σωστή κατεύθυνση.
          </p>
          <Link href="/el/" className="btn-primary">
            <ArrowLeft size={16} /> Επιστροφή στην Αρχική
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="container text-center py-20">
        <p className="text-8xl font-bold brand-gradient-text mb-4">404</p>
        <h1 className="text-3xl font-bold text-[#111315] mb-3">Page Not Found</h1>
        <p className="text-[#5B6472] mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
