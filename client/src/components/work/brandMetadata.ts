import { filmProjects, filmSource, filmPoster } from "./filmData";
import { brandProjects, type BrandProject } from "./brandingData";
import { workCopy, workProjects, type WorkLocale } from "./workData";
import dimensions from "../../../public/media/branding/assets.json";
import { SEO_BASE_URL } from "@/lib/seoRoutes";
import { ORGANIZATION_ID } from "@/lib/structuredData";

export const brandPath = (id: string, locale: WorkLocale) =>
  `${locale === "en" ? "" : `/${locale}`}/templates/branding/${id}/`;
// Describe the visible object; marketing captions remain separate.
const descriptions: Record<string, [string, string, string]> = {
  "hartley/collection": [
    "café stationery and packaging collection",
    "συλλογή εντύπων και συσκευασιών καφέ",
    "אוסף אריזות וחומרי דפוס לבית קפה",
  ],
  "hartley/sleeve": [
    "branded takeaway cup sleeve",
    "επώνυμο χάρτινο περίβλημα ποτηριού",
    "שרוול ממותג לכוס טייק אוויי",
  ],
  "hartley/bag": [
    "illustrated café takeaway bag",
    "εικονογραφημένη σακούλα καφέ",
    "שקית מאוירת לבית קפה",
  ],
  "hartley/loyalty": [
    "café loyalty card design",
    "σχεδιασμός κάρτας επιβράβευσης καφέ",
    "עיצוב כרטיס מועדון לבית קפה",
  ],
  "hartley/menu": [
    "afternoon tea menu design",
    "σχεδιασμός μενού απογευματινού τσαγιού",
    "עיצוב תפריט תה של אחר הצהריים",
  ],
  "hartley/poster": [
    "café brand poster",
    "αφίσα της ταυτότητας του καφέ",
    "כרזה ממותגת לבית קפה",
  ],
  "hartley/exterior": [
    "café storefront and signage",
    "πρόσοψη και επιγραφή καφέ",
    "חזית ושילוט בית הקפה",
  ],
  "hartley/botanical": [
    "botanical brand illustration",
    "βοτανική εικονογράφηση της ταυτότητας",
    "איור צמחי בשפת המותג",
  ],
  "hartley/symbol": [
    "illustrated dog brand character",
    "εικονογραφημένος σκύλος της ταυτότητας",
    "דמות הכלב המאוירת של המותג",
  ],
  "away/towels": [
    "branded hospitality towels",
    "πετσέτες με την ταυτότητα του καταλύματος",
    "מגבות ממותגות למתחם אירוח",
  ],
  "away/poster": [
    "hospitality campaign poster",
    "αφίσα καμπάνιας φιλοξενίας",
    "כרזת קמפיין למתחם אירוח",
  ],
  "away/label": [
    "hospitality brand label design",
    "σχεδιασμός ετικέτας φιλοξενίας",
    "עיצוב תווית למותג אירוח",
  ],
  "away/welcome": [
    "branded guest welcome materials",
    "έντυπα καλωσορίσματος επισκεπτών",
    "חומרי קבלת פנים ממותגים לאורחים",
  ],
  "away/key": [
    "branded guest key presentation",
    "παρουσίαση κλειδιού επισκέπτη",
    "עיצוב מפתח ממותג לאורחים",
  ],
  "away/ceramics": [
    "branded ceramic tableware",
    "κεραμικά σκεύη με την ταυτότητα",
    "כלי קרמיקה ממותגים",
  ],
  "away/amenities": [
    "guest amenity packaging",
    "συσκευασίες ειδών περιποίησης επισκεπτών",
    "אריזות מוצרי טיפוח לאורחים",
  ],
  "away/guide": [
    "printed guest guide",
    "έντυπος οδηγός επισκεπτών",
    "מדריך מודפס לאורחים",
  ],
  "away/social": [
    "hospitality social campaign design",
    "σχεδιασμός καμπάνιας φιλοξενίας για social media",
    "עיצוב קמפיין ברשתות למותג אירוח",
  ],
  "away/symbol": [
    "tent monogram brand symbol",
    "μονόγραμμα σκηνής της ταυτότητας",
    "סמל המותג בצורת אוהל",
  ],
  "sunday-boat/box": [
    "fish restaurant takeaway box",
    "κουτί πακέτου ψαροεστιατορίου",
    "קופסת טייק אוויי למסעדת דגים",
  ],
  "sunday-boat/bag": [
    "branded restaurant takeaway bag",
    "επώνυμη σακούλα εστιατορίου",
    "שקית טייק אוויי ממותגת למסעדה",
  ],
  "sunday-boat/wrap": [
    "illustrated food wrapping paper",
    "εικονογραφημένο χαρτί περιτυλίγματος φαγητού",
    "נייר עטיפה מאויר למזון",
  ],
  "sunday-boat/table": [
    "restaurant table branding",
    "εφαρμογές της ταυτότητας στο τραπέζι",
    "יישומי המותג על שולחן המסעדה",
  ],
  "sunday-boat/merch": [
    "restaurant merchandise collection",
    "συλλογή αντικειμένων του εστιατορίου",
    "אוסף מוצרי המותג של המסעדה",
  ],
  "sunday-boat/tote": [
    "illustrated restaurant tote bag",
    "εικονογραφημένη υφασμάτινη τσάντα",
    "תיק בד מאויר של המסעדה",
  ],
  "sunday-boat/cap": [
    "branded restaurant cap",
    "επώνυμο καπέλο του εστιατορίου",
    "כובע ממותג של המסעדה",
  ],
  "sunday-boat/exterior": [
    "restaurant exterior and signage",
    "εξωτερικός χώρος και επιγραφή εστιατορίου",
    "חזית ושילוט המסעדה",
  ],
  "sunday-boat/symbol": [
    "paired fish brand illustration",
    "εικονογράφηση με ζευγάρι ψαριών",
    "איור זוג הדגים של המותג",
  ],
};
export function brandAssetAlt(id: string, name: string, locale: WorkLocale) {
  const brand = brandProjects.find(b => b.id === id)!;
  const description = descriptions[`${id}/${name}`];
  if (!description)
    throw new Error(`Missing brand image description: ${id}/${name}`);
  return `${brand.name}: ${description[{ en: 0, el: 1, he: 2 }[locale]]}`;
}
export const websiteCoverAlt = (
  name: string,
  category: string,
  locale: WorkLocale
) =>
  ({
    en: `${name}: ${category.toLowerCase()} website design preview`,
    el: `${name}: δείγμα σχεδιασμού ιστοσελίδας, ${category.toLowerCase()}`,
    he: `${name}: תצוגת עיצוב אתר בתחום ${category}`,
  })[locale];
export function brandImages(brand: BrandProject, locale: WorkLocale) {
  return Array.from(
    new Set([brand.cover, brand.detail, ...brand.images.map(([name]) => name)])
  ).map(name => {
    const size = dimensions[`${brand.id}/${name}` as keyof typeof dimensions];
    const url = `${SEO_BASE_URL}/media/branding/${brand.id}/${name}.webp`;
    return {
      "@type": "ImageObject",
      "@id": url,
      contentUrl: url,
      url,
      caption: brandAssetAlt(brand.id, name, locale),
      width: size.width,
      height: size.height,
      representativeOfPage: name === brand.cover,
    };
  });
}
export function brandCaseSchema(brand: BrandProject, locale: WorkLocale) {
  const url = SEO_BASE_URL + brandPath(brand.id, locale);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#identity`,
    url,
    name: `${brand.name}: ${brand.title[locale]}`,
    description: brand.story[locale],
    inLanguage: locale,
    genre: "Brand identity concept",
    creator: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: brandImages(brand, locale),
  };
}
export function workCollectionSchema(locale: WorkLocale) {
  const url = `${SEO_BASE_URL}${locale === "en" ? "" : `/${locale}`}/templates/`;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#portfolio`,
    name: workCopy[locale].title,
    itemListElement: [
      ...workProjects.map(project => ({
        "@type": "CreativeWork",
        name: project.name,
        genre: "Website design concept",
        url: `${SEO_BASE_URL}/preview/${project.id}/`,
        creator: { "@id": ORGANIZATION_ID },
        image: {
          "@type": "ImageObject",
          contentUrl: `${SEO_BASE_URL}/media/examples/portraits/${project.id}-600.webp`,
          width: 600,
          height: 900,
          caption: websiteCoverAlt(
            project.name,
            workCopy[locale].categories[project.category],
            locale
          ),
        },
      })),
      ...filmProjects.flatMap(project =>
        project.clips.map(clip => ({
          "@type": "VideoObject",
          "@id": `${url}#${clip.id}`,
          name: `${project.name}: ${clip.title[locale]}`,
          description: project.description[locale],
          url: `${url}?film=${project.id}&clip=${clip.id}`,
          contentUrl: SEO_BASE_URL + filmSource(clip),
          thumbnailUrl: SEO_BASE_URL + filmPoster(clip),
          uploadDate: "2026-10-10",
          duration: `PT${clip.duration}S`,
          width: clip.width,
          height: clip.height,
          creator: { "@id": ORGANIZATION_ID },
        }))
      ),
      ...brandProjects.map(brand => ({
        "@type": "CreativeWork",
        name: brand.name,
        url: SEO_BASE_URL + brandPath(brand.id, locale),
        description: brand.story[locale],
        genre: "Brand identity concept",
        creator: { "@id": ORGANIZATION_ID },
        image: brandImages(brand, locale)[0],
      })),
    ].map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
  };
}
