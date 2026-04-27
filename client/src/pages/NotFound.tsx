/* D&M LABS - 404 Page (bilingual: detects /el/ prefix) */
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [location] = useLocation();
  const isGreek = location.startsWith("/el");

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
