/* ============================================================
   D&M LABS - Άρθρα Index Page
   Brand: #5B8CFF→#6FE3FF→#8B5CFF gradient, #0F172A dark
   Clean editorial layout, card grid, category filters
   ============================================================ */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import AnimateIn from "@/components/AnimateIn";
import { POSTS } from "@/data/blogPosts";
import { ArrowRight, Clock, Tag } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ΆρθραEl() {
  useSEO({
    title: "Άρθρα | Web Σχεδιασμός Tips & Guides | D&M Labs",
    description: "Πρακτικοί οδηγοί, ειλικρινείς συμβουλές και ιδέες web design για επιχειρήσεις στην Κύπρο και παγκοσμίως.",
  });
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(3rem, 6vh, 5rem)" }}
      >
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <p className="text-sm font-medium text-[#5B8CFF] mb-3 tracking-wide uppercase">Άρθρα & Συμβουλές</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111315] mb-5">
              Το Blog της <span className="brand-gradient-text">D&M Labs</span>
            </h1>
            <p className="text-lg text-[#5B6472] max-w-2xl mx-auto">
              Πρακτικοί οδηγοί, ειλικρινείς συμβουλές και ιδέες web design για επιχειρήσεις στην Κύπρο και παγκοσμίως.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-spacing bg-white">
        <div className="container">
          {POSTS.length === 0 ? (
            <div className="text-center py-20 text-[#5B6472]">Δεν υπάρχουν άρθρα ακόμα. Επισκεφθείτε ξανά σύντομα.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {POSTS.map((post, i) => (
                <AnimateIn key={post.slug} delay={i * 0.08}>
                  <Link href={`/blog/${post.slug}`} className="group block dm-card overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    {/* Cover image */}
                    <div className="relative overflow-hidden" style={{ height: "200px" }}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: "linear-gradient(90deg, #5B8CFF, #8B5CFF)" }}>
                        <Tag size={10} />
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-[#9BA3AF] mb-3">
                        <span>{formatDate(post.date)}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      </div>
                      <h2 className="text-base font-bold text-[#111315] mb-3 leading-snug group-hover:text-[#5B8CFF] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#5B6472] leading-relaxed flex-1 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B8CFF] group-hover:gap-2.5 transition-all">
                        Διαβάστε άρθρο <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing dark-section text-center">
        <div className="container">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Έτοιμοι να Αποκτήσετε την Ιστοσελίδα σας;</h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-xl mx-auto">
              Σταματήστε να διαβάζετε και ξεκινήστε να αναπτύσσεστε. Λάβετε δωρεάν συμβουλευτική και μια σαφή προσφορά εντός 24 ωρών.
            </p>
            <Link href="/el/contact" className="btn-primary">
              Δωρεάν Συμβουλευτική <ArrowRight size={18} />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
