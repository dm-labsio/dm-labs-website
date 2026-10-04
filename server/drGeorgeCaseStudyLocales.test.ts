import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { CASE_STUDY_SLUG, DR_GEORGE_CASE_STUDY_EL, DR_GEORGE_CASE_STUDY_HE } from "../client/src/data/drGeorgeCaseStudyLocales";
import { getHreflangRouteSet, isIndexableHebrewRoute } from "../client/src/lib/seoRoutes";
import { blogArticles } from "../client/src/components/blog/BlogIndex";

const root = resolve(import.meta.dirname, "..");
const paths = { en: `/blog/${CASE_STUDY_SLUG}`, el: `/el/blog/${CASE_STUDY_SLUG}`, he: `/he/blog/${CASE_STUDY_SLUG}` };
const posts = { el: DR_GEORGE_CASE_STUDY_EL, he: DR_GEORGE_CASE_STUDY_HE };

describe("Native Greek and Hebrew Dr George case study", () => {
  it.each(["el", "he"] as const)("keeps %s article, controls, captions, and sources complete", locale => {
    const post = posts[locale];
    expect(post.language).toBe(locale);
    expect(post.layout).toBe("case-study");
    expect(post.content.match(/<h2\b/g)).toHaveLength(8);
    expect(post.content.match(/<img /g)).toHaveLength(5);
    expect(post.content).toContain('preload="none"');
    expect(post.content).not.toContain("autoplay");
    expect(post.content).toContain(`href="/${locale}/contact/"`);
    expect(post.content).toContain('id="dr-george-video-description"');
    expect(post.content).toContain("/media/case-studies/dr-george/walkthrough.mp4");
    expect(blogArticles(locale).find(p => p.href === `${paths[locale]}/`)?.title).toBe(post.title);
    const prose = [post.title, post.metaTitle, post.metaDescription, post.excerpt, post.content.replace(/<[^>]*>/g, " ")].join(" ");
    expect(prose).not.toMatch(/Cyprus|Greece|Israel|Κύπρο|Ελλάδ|Ισραήλ|קפריסין|ישראל|(?<![א-ת])יוון(?![א-ת])/iu);
    expect(prose).not.toMatch(/—| - |\d+%|limited.time|50\+/i);
    expect(prose).not.toMatch(/Back to Blog|More articles|Case Studies|Open the|Download the|Watch the/);
    for (const path of ["specialties", "about", "patient-info", "locations"]) {
      expect(post.content).toContain(`https://dr-george-orthopaedics.com/${locale === "el" ? "el/" : ""}${path}`);
    }
  });

  it("preserves the factual checklist without inventing business outcomes or medical promises", () => {
    for (const fact of ["γόνατο", "ώμο", "ισχίο", "ποδοκνημική", "αθλητιατρική", "τραυματολογία", "παιδοορθοπαιδική", "Λεμεσό, Πάφο και Λευκωσία", "ΓεΣΥ", "ιδιωτική ασφάλιση", "αγγλικά, τα ελληνικά και τα ρωσικά", "δημοσιεύσεις", "κλινική εμπειρία"]) {
      expect(posts.el.content).toContain(fact);
    }
    for (const fact of ["ברך", "כתף", "מפרק הירך", "כף הרגל והקרסול", "רפואת ספורט", "פציעות ובשברים", "אורתופדיית ילדים", "בלימסול, בפאפוס ובניקוסיה", "GESY", "ביטוח פרטי", "באנגלית, ביוונית וברוסית", "פרסומים", "ניסיון קליני"]) {
      expect(posts.he.content).toContain(fact);
    }
    expect(posts.he.content).toContain("לשיחת ייעוץ בחינם");
    expect(posts.he.content).toContain("מובייל");
    expect(posts.he.content).not.toMatch(/נייד|ללא עלות|אירוח|מאשר\/ת|טום|הטובה ביותר|הופכים מבקרים/);
    expect(posts.el.content).toContain("Δωρεάν συμβουλευτική");
    expect(posts.el.content).not.toMatch(/οπτική γλώσσα|Σας|γύροι αναθεωρήσεων|μετατρέπει τους επισκέπτες|στη Google/);
    expect(posts.el.content).toContain("αγγλική έκδοση");
    expect(posts.he.content).toContain("הגרסה האנגלית");
  });

  it("connects all three article versions reciprocally and exposes only the completed Hebrew article", () => {
    for (const path of Object.values(paths)) expect(getHreflangRouteSet(path)).toEqual(paths);
    expect(isIndexableHebrewRoute(paths.he)).toBe(true);
    expect(isIndexableHebrewRoute("/he/blog")).toBe(true);
    expect(isIndexableHebrewRoute("/he/blog/missing-article")).toBe(false);
    expect(blogArticles("he")).toHaveLength(1);
    const sitemap = readFileSync(resolve(root, "client/public/sitemap.xml"), "utf8");
    for (const path of Object.values(paths)) expect(sitemap).toContain(`<loc>https://dm-labs.io${path}/</loc>`);
    const renderer = readFileSync(resolve(root, "client/src/pages/BlogPost.tsx"), "utf8");
    expect(renderer).toContain('"inLanguage": post.language ?? "en"');
    expect(renderer).toContain('canonicalPath: articlePath');
  });
});
