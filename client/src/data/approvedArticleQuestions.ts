/** Public, owner-approved content ONLY. Never copy inbox messages, email addresses,
 * moderation notes or other private data into this file, including in Git history.
 * Approval and publication consent must be checked before adding an entry.
 * Do not translate a visitor's question or attribute rewritten words without approval.
 */
export type ApprovedArticleQuestion = {
  id: string;
  articlePath: string;
  displayName: string;
  question: string;
  answer: string;
  publishedOn: string;
  publicationApproved: true;
};

export const APPROVED_ARTICLE_QUESTIONS: readonly ApprovedArticleQuestion[] =
  [];
