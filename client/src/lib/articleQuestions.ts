import { CONTACT_FORM_KEY } from "./consultation";
import {
  EN_TO_EL_PATHS,
  EN_TO_HE_PATHS,
  normalizeRoutePath,
  withTrailingSlash,
} from "./seoRoutes";

const articlePaths = new Set(
  Object.entries(EN_TO_EL_PATHS).flatMap(([en, el]) =>
    en.startsWith("/blog/")
      ? [
          en,
          ...(el ? [el] : []),
          ...(EN_TO_HE_PATHS[en] ? [EN_TO_HE_PATHS[en]!] : []),
        ]
      : []
  )
);

export function questionArticlePath(path: string): string | null {
  const normalized = normalizeRoutePath(path);
  return articlePaths.has(normalized) ? withTrailingSlash(normalized) : null;
}

export const QUESTION_LIMITS = { name: 80, email: 254, question: 2000 };
export const QUESTION_CONSENT_VERSION = "article-questions-2026-10-11";
export type QuestionFields = {
  name: string;
  email: string;
  question: string;
  consent: boolean;
  botcheck: boolean;
};
export type QuestionErrors = Partial<
  Record<"name" | "email" | "question" | "consent", boolean>
>;
export const EMPTY_QUESTION: QuestionFields = {
  name: "",
  email: "",
  question: "",
  consent: false,
  botcheck: false,
};

export function validateQuestion(fields: QuestionFields): QuestionErrors {
  const errors: QuestionErrors = {};
  if (
    !fields.name.trim() ||
    fields.name.length > QUESTION_LIMITS.name ||
    /[\r\n]/.test(fields.name)
  )
    errors.name = true;
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) ||
    fields.email.length > QUESTION_LIMITS.email
  )
    errors.email = true;
  if (
    !fields.question.trim() ||
    fields.question.length > QUESTION_LIMITS.question
  )
    errors.question = true;
  if (fields.consent !== true) errors.consent = true;
  return errors;
}

export async function submitArticleQuestion(
  fields: QuestionFields,
  articlePath: string,
  signal: AbortSignal
): Promise<void> {
  const path = questionArticlePath(articlePath);
  if (!path || fields.botcheck || Object.keys(validateQuestion(fields)).length)
    throw new Error("Invalid article question");
  const locale = path.startsWith("/he/")
    ? "he"
    : path.startsWith("/el/")
      ? "el"
      : "en";
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: CONTACT_FORM_KEY,
      subject: `[Article question][${locale.toUpperCase()}] ${path}`,
      from_name: "DM Labs article questions",
      name: fields.name.trim(),
      email: fields.email.trim(),
      message: fields.question.trim(),
      article_url: `https://dm-labs.io${path}`,
      language: locale,
      publication_permission:
        "Visitor agreed to publication of their display name and question after review. Email must remain private.",
      consent_version: QUESTION_CONSENT_VERSION,
      moderation:
        "PRIVATE SUBMISSION. Nothing is published automatically. Review the question, remove personal information, and send the approved display name, question, answer and article URL to Codex for publication. Replying to this email does not publish anything.",
      botcheck: false,
    }),
  });
  const result: unknown = await response.json();
  if (
    !response.ok ||
    !result ||
    typeof result !== "object" ||
    !("success" in result) ||
    result.success !== true
  ) {
    throw new Error("Question submission not acknowledged");
  }
}
