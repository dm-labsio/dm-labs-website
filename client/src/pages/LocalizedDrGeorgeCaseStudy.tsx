import { BlogArticle } from "./BlogPost";
import { DR_GEORGE_CASE_STUDY_EL, DR_GEORGE_CASE_STUDY_HE } from "@/data/drGeorgeCaseStudyLocales";

export function DrGeorgeCaseStudyEl() {
  return <BlogArticle article={DR_GEORGE_CASE_STUDY_EL} locale="el" />;
}

export function DrGeorgeCaseStudyHe() {
  return <BlogArticle article={DR_GEORGE_CASE_STUDY_HE} locale="he" />;
}
