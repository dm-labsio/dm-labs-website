import { useSEO } from "@/hooks/useSEO";
import { BrandStory } from "./BrandingGallery";
import { brandProjects } from "./brandingData";
import {
  brandAssetAlt,
  brandCaseSchema,
  brandPath,
  brandImages,
} from "./brandMetadata";
import { workCopy, type WorkLocale } from "./workData";

/** Same project presentation as the dialog, with crawlable HTML and a stable URL. */
export default function BrandCaseStudy({
  id,
  locale,
}: {
  id: string;
  locale: WorkLocale;
}) {
  const brand = brandProjects.find(item => item.id === id)!;
  const title = `${brand.name} | ${locale === "en" ? "Brand Identity" : locale === "el" ? "Σχεδιασμός ταυτότητας" : "מיתוג"} | DM-Labs.io`;
  const parent = `${locale === "en" ? "" : `/${locale}`}/templates/`;
  const image = brandImages(brand, locale)[0];
  useSEO({
    title,
    description: brand.story[locale],
    canonicalPath: brandPath(id, locale),
    ogImage: `/media/branding/${id}/${brand.cover}.webp`,
    ogImageAlt: brandAssetAlt(id, brand.cover, locale),
    ogImageWidth: image.width,
    ogImageHeight: image.height,
  });
  const next =
    brandProjects[(brandProjects.indexOf(brand) + 1) % brandProjects.length];
  return (
    <div className="brand-case-page" dir={locale === "he" ? "rtl" : "ltr"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(brandCaseSchema(brand, locale)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <nav className="container" aria-label={workCopy[locale].title}>
        <a href={`${parent}#branding`}>{workCopy[locale].title}</a>
      </nav>
      <BrandStory
        brand={brand}
        locale={locale}
        standalone
        close={() => window.location.assign(`${parent}#branding`)}
        next={() => window.location.assign(brandPath(next.id, locale))}
      />
    </div>
  );
}
