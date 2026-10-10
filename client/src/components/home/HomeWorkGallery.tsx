import WorkGallery from "@/components/work/WorkGallery";
import { workCopy, type WorkLocale } from "@/components/work/workData";
import "@/components/work/our-work.css";

export default function HomeWorkGallery({ locale }: { locale: WorkLocale }) {
  const copy = workCopy[locale];
  return (
    <section
      id="examples"
      className="home-examples work-service overflow-hidden"
      aria-labelledby="home-work-title"
    >
      <div className="work-service-heading container">
        <h2 id="home-work-title">{copy.title}</h2>
        <p className="brand-micro">{copy.demos}</p>
      </div>
      <WorkGallery locale={locale} />
    </section>
  );
}
