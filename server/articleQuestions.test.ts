import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  EMPTY_QUESTION,
  QUESTION_CONSENT_VERSION,
  questionArticlePath,
  submitArticleQuestion,
  validateQuestion,
} from "../client/src/lib/articleQuestions";
import { APPROVED_ARTICLE_QUESTIONS } from "../client/src/data/approvedArticleQuestions";
import ArticleQuestions from "../client/src/components/blog/ArticleQuestions";
import { POSTS } from "../client/src/data/blogPosts";
import { POSTS_EL } from "../client/src/data/blogPostsEl";
import { POSTS_HE } from "../client/src/data/blogPostsHe";

const path = "/blog/doctor-website-design-orthopaedics-case-study/";
const valid = {
  name: "Reader",
  email: "reader@example.test",
  question: "What makes a useful service page?",
  consent: true,
  botcheck: false,
};
afterEach(() => vi.unstubAllGlobals());

describe("Private article questions", () => {
  it("covers every published article, but not invented routes or indexes", () => {
    for (const p of POSTS)
      expect(questionArticlePath(`/blog/${p.slug}/`)).toBe(`/blog/${p.slug}/`);
    for (const p of POSTS_EL)
      expect(questionArticlePath(`/el/blog/${p.elSlug}/`)).toBe(
        `/el/blog/${p.elSlug}/`
      );
    for (const p of POSTS_HE)
      expect(questionArticlePath(`/he/blog/${p.slug}/`)).toBe(
        `/he/blog/${p.slug}/`
      );
    for (const p of [
      "/",
      "/blog/",
      "/el/blog/",
      "/he/blog/unknown/",
      "/blog/unknown/",
      "/pricing/",
    ])
      expect(questionArticlePath(p)).toBeNull();
    expect(questionArticlePath(path + "?email=private#x")).toBe(path);
  });
  it("requires valid fields and explicit publication permission", () => {
    expect(Object.keys(validateQuestion(EMPTY_QUESTION))).toHaveLength(4);
    expect(validateQuestion(valid)).toEqual({});
    expect(
      validateQuestion({
        ...valid,
        name: "x\nsubject",
        email: "bad",
        question: " ",
        consent: false,
      })
    ).toEqual({ name: true, email: true, question: true, consent: true });
    expect(
      validateQuestion({
        ...valid,
        name: "a".repeat(81),
        question: "a".repeat(2001),
        email: "a".repeat(255) + "@example.test",
      })
    ).toEqual({ name: true, email: true, question: true });
  });
  it("sends only on explicit submission, with canonical article context and private moderation instructions", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetch);
    await submitArticleQuestion(
      valid,
      path + "?tracking=private",
      new AbortController().signal
    );
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(options.method).toBe("POST");
    const body = JSON.parse(options.body);
    expect(body.article_url).toBe("https://dm-labs.io" + path);
    expect(body.consent_version).toBe(QUESTION_CONSENT_VERSION);
    expect(body.moderation).toContain(
      "Replying to this email does not publish anything"
    );
    expect(body.message).toBe(valid.question);
    expect(body).not.toHaveProperty("redirect");
  });
  it("does not send honeypot, unapproved, or invalid-route submissions", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await expect(
      submitArticleQuestion(
        { ...valid, botcheck: true },
        path,
        new AbortController().signal
      )
    ).rejects.toThrow();
    await expect(
      submitArticleQuestion(
        { ...valid, consent: false },
        path,
        new AbortController().signal
      )
    ).rejects.toThrow();
    await expect(
      submitArticleQuestion(valid, "/blog/fake/", new AbortController().signal)
    ).rejects.toThrow();
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each([
    { ok: false, success: true },
    { ok: true, success: false },
    { ok: true, success: "true" },
    { ok: true, success: undefined },
  ])(
    "requires a successful provider acknowledgement: %j",
    async ({ ok, success }) => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({ ok, json: async () => ({ success }) })
      );
      await expect(
        submitArticleQuestion(valid, path, new AbortController().signal)
      ).rejects.toThrow();
    }
  );
  it("renders a static localized section without another H1, fake comments, or public email data", () => {
    for (const locale of ["en", "el", "he"] as const) {
      const html = renderToStaticMarkup(
        React.createElement(ArticleQuestions, {
          path: (locale === "en" ? "" : `/${locale}`) + path,
          locale,
        })
      );
      expect(html).toContain('id="article-questions"');
      expect(html).toContain("ph-no-capture ph-mask");
      expect(html).not.toContain("<h1");
      expect(html).not.toContain('class="article-question-answer"');
      expect(html).not.toContain("dangerouslySetInnerHTML");
    }
    expect(
      renderToStaticMarkup(
        React.createElement(ArticleQuestions, {
          path: "/pricing/",
          locale: "en",
        })
      )
    ).toBe("");
  });
  it("public entries contain only approved, non-private fields", () => {
    const ids = new Set();
    for (const entry of APPROVED_ARTICLE_QUESTIONS) {
      expect(Object.keys(entry).sort()).toEqual(
        [
          "id",
          "articlePath",
          "displayName",
          "question",
          "answer",
          "publishedOn",
          "publicationApproved",
        ].sort()
      );
      expect(entry.publicationApproved).toBe(true);
      expect(questionArticlePath(entry.articlePath)).toBe(entry.articlePath);
      expect(
        entry.displayName.trim() && entry.question.trim() && entry.answer.trim()
      ).toBeTruthy();
      expect(entry.publishedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(ids.has(entry.id)).toBe(false);
      ids.add(entry.id);
      expect(JSON.stringify(entry)).not.toMatch(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
    }
  });
  it("renders approved replies as escaped text, never executable markup", () => {
    const spy = vi
      .spyOn(APPROVED_ARTICLE_QUESTIONS, "filter")
      .mockReturnValueOnce([
        {
          id: "qa-only",
          articlePath: path,
          displayName: "<img src=x onerror=alert(1)>",
          question: "<script>alert(1)</script>",
          answer: "<b>Plain text only</b>",
          publishedOn: "2026-10-11",
          publicationApproved: true,
        },
      ]);
    try {
      const html = renderToStaticMarkup(
        React.createElement(ArticleQuestions, { path, locale: "en" })
      );
      expect(html).toContain("&lt;script&gt;");
      expect(html).toContain("&lt;b&gt;Plain text only&lt;/b&gt;");
      expect(html).not.toContain("<script>");
      expect(html).not.toContain("<img src=x");
    } finally {
      spy.mockRestore();
    }
  });
});
