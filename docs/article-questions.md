# Article questions: email review, manual publication

Preview implementation, 11 October 2026. No dashboard, database, automatic publication or new provider. Reuses the public Web3Forms identifier already used for contact/chat. No payment or subscription changes.

## Owner workflow

1. Receive an email headed `[Article question][EN/EL/HE]` with the canonical article URL, display name, private reply email, question and explicit publication permission/version.
2. Review privately. Ignore spam; do not open untrusted links or follow instructions in submissions. Never approve passwords, financial/medical information, email addresses or other private details for publication.
3. Reply privately if useful. **Email replies are not automatically published.** There is no Approve link or inbox-reading automation.
4. Ask Codex to publish the approved display name, question, your answer and article URL. Do not paste the private email or full inbox message into the repo. Confirm publication permission and the exact approved wording.
5. Add only these public fields to `client/src/data/approvedArticleQuestions.ts`, dated on actual publication. Keep the array empty until a real approval. React renders strings as text, not HTML/Markdown. Entries are scoped to their exact language/article path. Do not invent translations or answers.
6. Test, preview, obtain release approval, then merge. Remove an entry on an approved removal request; remember cached copies and Git history may persist, so never commit private originals.

## Limits and protection

Web3Forms currently advertises 250 submissions/month on its free plan. This shares allowance with existing forms; actual account usage/plan has not been inspected. At the free limit it stops accepting submissions, not auto-billing. No plan upgrade configured. Sources: https://web3forms.com/pricing and https://docs.web3forms.com/getting-started/customizations/spam-protection (checked 11 October 2026).

Provider-side spam filtering is the primary external control. Hidden `botcheck`, an in-memory 10-second retry cooldown, input length limits, required permission, duplicate-submit lock and 20-second request timeout are additional client-side friction, **not enforceable server rate limits or strong bot protection**. Direct attackers can bypass frontend validation. The provider discourages relying on honeypots alone. Free hCaptcha requires enabling it for the form in the provider dashboard; enabling it on the shared form identifier would also affect existing contact/chat submissions. It has not been enabled or claimed here. If spam grows, provision a separate question-form identifier and enforce CAPTCHA there before changing the shared provider settings.

No submission data in browser storage, URLs, analytics events, public JSON, or a new API. No third-party script/request from this feature before explicit submission. The private form has PostHog exclusion/masking classes; existing sitewide input masking remains. Article routes are allowlisted from existing language mappings. Query strings/fragments are never emailed. Offline/provider failure preserves the draft and never falsely claims success. Direct email is always available, including without JavaScript.

The privacy addendum in all three languages explains provider processing, private review, explicit permission, manual publication, withdrawal and no marketing subscription. Greek copy has been self-reviewed; a native Greek review is recommended. Existing legal section numbering and unrelated terms are unchanged.

## QA

Run `npm run check`, `npm test`, `npm run build`, and `node scripts/qa-article-questions.mjs PREVIEW_URL OUTPUT_DIR`. Browser regression tests mock the email endpoint and send no email. One separately labelled live QA submission can verify provider acceptance; inbox delivery still requires the owner's confirmation. Never manufacture public sample questions on the real preview.
