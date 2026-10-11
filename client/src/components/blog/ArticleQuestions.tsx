import React, { useEffect, useRef, useState, type FormEvent } from "react";
import type { SiteLanguage } from "@/lib/routeLanguage";
import {
  EMPTY_QUESTION,
  QUESTION_LIMITS,
  questionArticlePath,
  submitArticleQuestion,
  validateQuestion,
  type QuestionErrors,
} from "@/lib/articleQuestions";
import { APPROVED_ARTICLE_QUESTIONS } from "@/data/approvedArticleQuestions";
import { QUESTION_COPY } from "./articleQuestionsCopy";
import "./ArticleQuestions.css";

export default function ArticleQuestions({
  path,
  locale,
}: {
  path: string;
  locale: SiteLanguage;
}) {
  const articlePath = questionArticlePath(path);
  if (!articlePath) return null;
  return (
    <ArticleQuestionsPanel
      key={articlePath}
      articlePath={articlePath}
      locale={locale}
    />
  );
}

function ArticleQuestionsPanel({
  articlePath,
  locale,
}: {
  articlePath: string;
  locale: SiteLanguage;
}) {
  const t = QUESTION_COPY[locale];
  const [fields, setFields] = useState({ ...EMPTY_QUESTION });
  const [errors, setErrors] = useState<QuestionErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "wait"
  >("idle");
  const [interactive, setInteractive] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const notice = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const lastAttempt = useRef(0);
  const mounted = useRef(true);
  const entries = APPROVED_ARTICLE_QUESTIONS.filter(
    q => q.articlePath === articlePath && q.publicationApproved === true
  );
  const privacyPath = `${locale === "en" ? "" : `/${locale}`}/privacy/#article-questions-privacy`;

  useEffect(() => {
    mounted.current = true;
    // Prerender executes React too. Keep its saved HTML non-submittable so
    // visitors without JavaScript use the email link, never a native form POST.
    if (
      !(window as Window & { __DM_STATIC_SNAPSHOT__?: boolean })
        .__DM_STATIC_SNAPSHOT__
    )
      setInteractive(true);
    return () => {
      mounted.current = false;
      request.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (["success", "error", "wait"].includes(status)) notice.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.current) return;
    const invalid = validateQuestion(fields);
    setErrors(invalid);
    const first = Object.keys(invalid)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (fields.botcheck) {
      setStatus("error");
      return;
    }
    // UX duplicate protection only, not a server-side rate limit or CAPTCHA.
    if (Date.now() - lastAttempt.current < 10_000) {
      setStatus("wait");
      return;
    }
    lastAttempt.current = Date.now();
    const controller = new AbortController();
    request.current = controller;
    setStatus("sending");
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      await submitArticleQuestion(fields, articlePath, controller.signal);
      if (mounted.current) {
        setFields({ ...EMPTY_QUESTION });
        setStatus("success");
      }
    } catch {
      if (mounted.current) setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      request.current = null;
    }
  }

  return (
    <section
      className="article-questions"
      id="article-questions"
      aria-labelledby="article-questions-heading"
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <div className="article-questions-inner">
        <span className="article-questions-label" aria-hidden="true">
          DM LABS / Q&A
        </span>
        <h2 id="article-questions-heading">{t.title}</h2>
        <p className="article-questions-intro">{t.intro}</p>
        {entries.length > 0 && (
          <div className="article-questions-answers">
            <h3>{t.answers}</h3>
            {entries.map(entry => (
              <article key={entry.id} className="article-question-answer">
                <p className="article-question-author">
                  <bdi>{entry.displayName}</bdi>
                  <time dateTime={entry.publishedOn}>
                    {new Date(
                      `${entry.publishedOn}T12:00:00Z`
                    ).toLocaleDateString(locale, {
                      timeZone: "UTC",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </p>
                <h4 dir="auto">{entry.question}</h4>
                <p className="article-question-reply-label">{t.reply}</p>
                <p dir="auto">{entry.answer}</p>
              </article>
            ))}
          </div>
        )}
        <details className="article-question-details">
          <summary>
            {t.open}
            <span aria-hidden="true">＋</span>
          </summary>
          <div
            className="article-question-private ph-no-capture ph-mask"
            data-ph-no-capture
            data-private
          >
            {status === "success" ? (
              <div
                ref={notice}
                tabIndex={-1}
                role="status"
                className="article-question-notice"
              >
                <h3>{t.success}</h3>
                <p>{t.successNote}</p>
              </div>
            ) : (
              <form
                ref={form}
                method="post"
                onSubmit={submit}
                noValidate
                aria-label={t.open}
              >
                <fieldset disabled={!interactive || status === "sending"}>
                  {(["name", "email", "question"] as const).map(field => (
                    <div
                      className={`article-question-field article-question-field--${field}`}
                      key={field}
                    >
                      <label htmlFor={`aq-${field}`}>{t[field]}</label>
                      {field === "question" ? (
                        <textarea
                          id={`aq-${field}`}
                          name={field}
                          rows={5}
                          required
                          dir="auto"
                          maxLength={QUESTION_LIMITS[field]}
                          value={fields[field]}
                          onChange={e => {
                            setFields(f => ({ ...f, [field]: e.target.value }));
                            setErrors(v => ({ ...v, [field]: false }));
                          }}
                          aria-invalid={Boolean(errors[field])}
                          aria-describedby={`aq-question-hint${errors[field] ? " aq-question-error" : ""}`}
                        />
                      ) : (
                        <input
                          id={`aq-${field}`}
                          name={field}
                          type={field === "email" ? "email" : "text"}
                          autoComplete={
                            field === "email" ? "email" : "nickname"
                          }
                          required
                          dir={field === "email" ? "ltr" : "auto"}
                          maxLength={QUESTION_LIMITS[field]}
                          value={fields[field]}
                          onChange={e => {
                            setFields(f => ({ ...f, [field]: e.target.value }));
                            setErrors(v => ({ ...v, [field]: false }));
                          }}
                          aria-invalid={Boolean(errors[field])}
                          aria-describedby={
                            `${field === "email" ? "aq-email-hint " : ""}${errors[field] ? `aq-${field}-error` : ""}`.trim() ||
                            undefined
                          }
                        />
                      )}
                      {field !== "name" && (
                        <p
                          id={`aq-${field}-hint`}
                          className="article-question-hint"
                        >
                          {field === "email" ? t.emailHint : t.questionHint}
                        </p>
                      )}
                      {errors[field] && (
                        <p
                          id={`aq-${field}-error`}
                          className="article-question-error"
                        >
                          {t[`${field}Error`]}
                        </p>
                      )}
                    </div>
                  ))}
                  <label
                    className="article-question-consent"
                    htmlFor="aq-consent"
                  >
                    <input
                      id="aq-consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={fields.consent}
                      onChange={e => {
                        setFields(f => ({ ...f, consent: e.target.checked }));
                        setErrors(v => ({ ...v, consent: false }));
                      }}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={
                        errors.consent ? "aq-consent-error" : undefined
                      }
                    />
                    <span>{t.consent}</span>
                  </label>
                  {errors.consent && (
                    <p id="aq-consent-error" className="article-question-error">
                      {t.consentError}
                    </p>
                  )}
                  <div hidden aria-hidden="true">
                    <label>
                      {t.bot}
                      <input
                        name="botcheck"
                        type="checkbox"
                        tabIndex={-1}
                        checked={fields.botcheck}
                        onChange={e =>
                          setFields(f => ({ ...f, botcheck: e.target.checked }))
                        }
                      />
                    </label>
                  </div>
                </fieldset>
                {(status === "error" || status === "wait") && (
                  <div
                    ref={notice}
                    tabIndex={-1}
                    role="alert"
                    className="article-question-notice article-question-error"
                  >
                    {status === "wait" ? t.retry : t.failure}
                  </div>
                )}
                <button
                  type="submit"
                  className="article-question-submit"
                  disabled={!interactive || status === "sending"}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? t.sending : t.submit}
                </button>
                <span className="sr-only" role="status">
                  {status === "sending" ? t.sending : ""}
                </span>
                <p className="article-question-hint">
                  {t.privacy} <a href={privacyPath}>{t.privacyLink}</a>
                </p>
              </form>
            )}
          </div>
        </details>
        <p className="article-question-direct">
          {t.fallback}{" "}
          <a
            href={`mailto:info@dm-labs.io?subject=${encodeURIComponent(`Article question: https://dm-labs.io${articlePath}`)}`}
          >
            <bdi>info@dm-labs.io</bdi>
          </a>
          .
        </p>
      </div>
    </section>
  );
}
