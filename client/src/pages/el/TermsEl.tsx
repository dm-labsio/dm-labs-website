import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

export default function TermsEl() {
  useSEO({
    title: "Όροι Χρήσης | DM-Labs.io",
    description: "Όροι χρήσης της ιστοσελίδας DM-Labs.io.",
    canonicalPath: "/el/terms"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">
      <div className="container max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-extrabold text-[#111315] mb-6">Όροι Χρήσης</h1>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Χρησιμοποιώντας την ιστοσελίδα dm-labs.io, αποδέχεστε τους παρακάτω όρους χρήσης. Αν δεν συμφωνείτε, παρακαλούμε μην χρησιμοποιείτε την ιστοσελίδα.
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Υπηρεσίες</h2>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Η DM-Labs.io παρέχει υπηρεσίες κατασκευής ιστοσελίδων. Οι λεπτομέρειες κάθε έργου συμφωνούνται εγγράφως πριν την έναρξη. Οι τιμές που αναγράφονται στην ιστοσελίδα είναι ενδεικτικές και μπορεί να διαφέρουν ανάλογα με τις ανάγκες του πελάτη.
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Πνευματική Ιδιοκτησία</h2>
        <p className="text-[#5B6472] mb-4 leading-relaxed">
          Μετά την ολοκλήρωση και την εξόφληση του έργου, ο πελάτης αποκτά πλήρη δικαιώματα στον κώδικα και το σχεδιασμό της ιστοσελίδας του.
        </p>
        <h2 className="text-xl font-bold text-[#111315] mt-8 mb-3">Επικοινωνία</h2>
        <p className="text-[#5B6472] leading-relaxed">
          Για ερωτήσεις σχετικά με τους όρους χρήσης:{" "}
          <a href="mailto:info@dm-labs.io" className="text-[#5B8CFF] hover:underline">info@dm-labs.io</a>
        </p>
      </div>
    </main>
  );
}
