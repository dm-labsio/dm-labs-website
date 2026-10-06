# DM Labs website guide preview

Branch: `codex/website-guide-preview`. This feature is for review on a Vercel preview before any production merge.

## Visitor experience

- A discreet Ask DM Labs launcher replaces the floating WhatsApp button across the marketing site. Example iframe previews remain untouched.
- Articles have an end-of-page question invitation. Opening the guide captures the article title and path, without URL query parameters.
- EN, EL and HE interfaces follow the route, including RTL. Prices use the site's existing currency context.
- The UI adapts the supplied AIChatCard reference to the current navy `#101729`, pearl `#F6F5F2`, lavender `#A8B8FF`, approved logo and fonts. It uses existing Radix, React and Lucide dependencies. No fake typing, attachment control or simulated live agent.

## How answers work

This is an **extractive website guide**, not a generative LLM chatbot. It returns a relevant published passage with a source link, or explicitly says it cannot find an answer. No model key, external AI service, crawling of visitor URLs or generated factual claims.

Sources: the shared FAQ in all three languages and a static search index built from the deployed marketing and article pages during the existing prerender step (`/site-guide/en.json`, `el.json`, `he.json`). Page chrome, forms, legal pages and demos are excluded. This automatically follows content updates on each deployment. The current shared FAQ takes priority for price, care, payment, ownership and hosting questions so older article prices are not used for these enquiries.

If the generated index is unavailable (including in local Vite development), a bundled fallback covers English article bodies/FAQs, the structured Greek customer-growth and Dr George articles, the Hebrew Dr George article, and the currently viewed article body. The published index is fetched only when asking a question and cached for the page session; a 5-second timeout falls back to the local sources.

Retrieval is keyword and intent based, so paraphrases and multi-part/follow-up questions can miss. It is a useful no-credential starting point, not equivalent to conversational reasoning. A future server-side model can synthesize retrieved passages, with citations, rate limits and explicit fallback, without changing the handoff UI. That would require a provider/budget decision.

## Notifications and records

Each submitted question is answered and then sent, together with the complete transcript so far, through the **existing contact form's Web3Forms access key**. Emails contain a stable conversation reference, questions, replies, sources, page paths, timestamps, locale, optional reply email and a Preview/local or Production label. Reply email is optional, so anonymous questions still notify the team, but they cannot receive an email reply without supplying contact details. Adding reply details after a question offers an explicit send-details button.

The configured Web3Forms destination is inherited from the contact form; code cannot independently verify the receiving mailbox. A `success: true` provider response is required to show sent. This is an acknowledgement by the provider, not proof of inbox delivery. Errors and timeouts keep the conversation and offer retry/WhatsApp. A later successful cumulative email includes earlier questions even if an earlier request failed. A timeout followed by retry can produce a duplicate email; conversation IDs help identify it.

WhatsApp uses `wa.me/35797472847` and requires the visitor to press Send. It is not automatic WhatsApp Business API delivery. For long encoded transcripts, offer full-copy/download plus a short WhatsApp link rather than silently truncating the conversation. Clicking the external WhatsApp link shares the prefilled text with WhatsApp. Drafts are not transmitted.

Chats persist in sessionStorage across page navigation and reloads in the same tab; records older than 24 hours are discarded on the next load. Reset clears the local copy, not emails. Visitors can download a plain text transcript. The whole chat card has PostHog's `ph-no-capture` class (the installed replay SDK's default block class). No chat content is included in custom analytics.

## Limits and operational notes

- 600 characters per question, 12 questions per conversation, one notification in flight, a 20-second notification timeout, validated stored data and optional email, and provider spam handling.
- Client limits are UX safeguards, not server-enforced anti-abuse. Web3Forms plan quotas and domain restrictions still apply; preview domains may need enabling in that service. Per-message notifications consume one form submission each. A high-volume public rollout should use a backend queue with durable storage, server rate limiting and batched notifications.
- No database, team inbox, asynchronous human replies inside the widget or guaranteed background delivery after a tab is closed. The visitor is told this is a website guide and that sending shares the conversation by email.
- Privacy and cookie pages describe the actual chat data handling.

## Manual review on the preview

Real sends notify the existing contact inbox. Use a clearly labelled test enquiry and your own reply email when you choose to test delivery.

1. Open the launcher on the homepage, pricing page, EN/EL article and Hebrew page. Check phone width, keyboard focus, Escape and reduced motion.
2. Ask about pricing and SEO; follow the cited source. Try an unrelated question to see the fallback.
3. Add your reply email and submit. Confirm the provider status and the actual inbox email with the complete transcript. Check reply-to.
4. Continue to another page and reopen. Save the transcript. Open WhatsApp and confirm the prefilled conversation before sending.
5. Try a long chat, offline delivery, retry, clearing the chat and reloading. Ensure errors do not claim delivery.

Reference: Web3Forms API https://docs.web3forms.com/getting-started/api-reference
