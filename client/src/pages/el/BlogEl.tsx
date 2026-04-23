import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useHreflang } from "@/hooks/useHreflang";

// Greek Blog index page — /el/blog
// Primary keyword: "κατασκευή ιστοσελίδας blog", "συμβουλές ιστοσελίδα επιχείρηση"

const posts = [
  {
    slug: "posso-kostizei-istoselidha-kypros",
    title: "Πόσο Κοστίζει μια Ιστοσελίδα στην Κύπρο; (Ειλικρινής Οδηγός 2026)",
    excerpt: "Η αλήθεια για τις τιμές κατασκευής ιστοσελίδας στην Κύπρο - τι περιλαμβάνεται, τι δεν περιλαμβάνεται και πώς να επιλέξετε σωστά.",
    date: "Ιανουάριος 2026",
    readTime: "6 λεπτά"
  },
  {
    slug: "wix-vs-epaggelmatias-web-designer-kypros",
    title: "Wix ή Επαγγελματίας Web Designer; Τι Συμφέρει την Επιχείρησή σου στην Κύπρο",
    excerpt: "Μια ειλικρινής σύγκριση μεταξύ Wix, WordPress και επαγγελματικής κατασκευής ιστοσελίδας - πότε συμφέρει το καθένα.",
    date: "Απρίλιος 2026",
    readTime: "7 λεπτά"
  },
  {
    slug: "istoselidha-nail-salon-beauty-studio-kypros",
    title: "Ιστοσελίδα για Nail Salon και Beauty Studio στην Κύπρο: Τι Χρειάζεστε Πραγματικά",
    excerpt: "Τι πρέπει να έχει η ιστοσελίδα ενός nail salon ή beauty studio στην Κύπρο για να φέρνει νέους πελάτες.",
    date: "Φεβρουάριος 2026",
    readTime: "5 λεπτά"
  },
  {
    slug: "istoselidha-yoga-pilates-studio-kypros",
    title: "Γιατί το Yoga ή Pilates Studio σας στην Κύπρο Χρειάζεται Ιστοσελίδα",
    excerpt: "Το Instagram δεν αρκεί. Δείτε γιατί μια επαγγελματική ιστοσελίδα φέρνει περισσότερους μαθητές στο studio σας.",
    date: "Μάρτιος 2026",
    readTime: "5 λεπτά"
  },
  {
    slug: "pos-na-vretheite-google-kypros",
    title: "Πώς να Βρεθεί η Επιχείρησή σας στη Google στην Κύπρο: Ένας Απλός Οδηγός",
    excerpt: "Χωρίς τεχνικές ορολογίες - τι πρέπει να κάνετε για να εμφανίζεστε στη Google όταν κάποιος ψάχνει για αυτό που προσφέρετε.",
    date: "Μάρτιος 2026",
    readTime: "6 λεπτά"
  },
  {
    slug: "istoselidha-estiatorio-kypros",
    title: "Γιατί Κάθε Εστιατόριο στην Κύπρο Χρειάζεται Ιστοσελίδα (Όχι Μόνο Facebook)",
    excerpt: "Το Facebook δεν είναι αρκετό για ένα εστιατόριο. Δείτε τι χάνετε χωρίς επαγγελματική ιστοσελίδα.",
    date: "Απρίλιος 2026",
    readTime: "5 λεπτά"
  }
];

export default function BlogEl() {
  useSEO({
    title: "Blog | Συμβουλές Κατασκευής Ιστοσελίδας | D&M Labs",
    description: "Άρθρα και συμβουλές για κατασκευή ιστοσελίδας, SEO και online παρουσία για επιχειρήσεις στην Κύπρο και την Ελλάδα.",
    canonicalPath: "/el/blog"
  });
  useHreflang();

  return (
    <main className="bg-[#F6F6F4] min-w-0 overflow-x-hidden">

      <section className="section-spacing bg-gradient-to-br from-[#F0F4FF] via-[#F6F6F4] to-[#F0EAFF]">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5B8CFF] mb-4">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111315] mb-4 leading-tight">
            Συμβουλές για Ιστοσελίδες και Online Παρουσία
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            Χρήσιμα άρθρα για επιχειρήσεις στην Κύπρο και την Ελλάδα που θέλουν να βρεθούν στο Google και να αποκτήσουν επαγγελματική online παρουσία.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/el/blog/${post.slug}`}>
              <article className="bg-white rounded-2xl p-6 border border-[#E8EAF0] shadow-sm hover:shadow-md hover:border-[#5B8CFF] transition-all cursor-pointer h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-[#9CA3AF]">{post.date}</span>
                  <span className="text-xs text-[#9CA3AF]">-</span>
                  <span className="text-xs text-[#9CA3AF]">{post.readTime} ανάγνωση</span>
                </div>
                <h2 className="font-bold text-[#111315] text-base mb-3 leading-snug flex-1">{post.title}</h2>
                <p className="text-[#5B6472] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-[#5B8CFF] text-sm font-semibold">Διαβάστε περισσότερα →</span>
              </article>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
