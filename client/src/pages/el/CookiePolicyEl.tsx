import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

export default function CookiePolicyEl() {
  useSEO({
    title: "Πολιτική Cookies | D&M Labs",
    description: "Πολιτική cookies της ιστοσελίδας D&M Labs.",
    canonicalPath: "/el/cookie-policy"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <div className="container max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-extrabold text-[#111315] mb-6">Πολιτική Cookies</h1>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Η ιστοσελίδα dm-labs.io χρησιμοποιεί cookies για να βελτιώσει την εμπειρία σας. Αυτή η σελίδα εξηγεί τι είναι τα cookies και πώς τα χρησιμοποιούμε.
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Τι Είναι τα Cookies</h2>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στον υπολογιστή ή το κινητό σας όταν επισκέπτεστε μια ιστοσελίδα. Χρησιμοποιούνται για να θυμάται η ιστοσελίδα τις προτιμήσεις σας.
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Ποια Cookies Χρησιμοποιούμε</h2>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Χρησιμοποιούμε μόνο απαραίτητα cookies για τη λειτουργία της ιστοσελίδας και analytics cookies (Google Analytics) για να κατανοούμε πώς χρησιμοποιείτε την ιστοσελίδα μας. Δεν χρησιμοποιούμε cookies για διαφημιστικούς σκοπούς.
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Πώς να Απενεργοποιήσετε τα Cookies</h2>
        <p className="text-[#5B6472] leading-relaxed">
          Μπορείτε να απενεργοποιήσετε τα cookies από τις ρυθμίσεις του browser σας. Σημειώστε ότι η απενεργοποίηση cookies μπορεί να επηρεάσει τη λειτουργικότητα της ιστοσελίδας.
        </p>
      </div>
    </main>
  );
}
