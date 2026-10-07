import { z } from "zod";
import { CONTACT_FORM_KEY } from "@/lib/consultation";
import type { SiteLanguage } from "@/lib/routeLanguage";
import { CHAT_COPY } from "./chatCopy";

export const MAX_TURNS = 12;
export const MAX_QUESTION = 600;
const STORAGE_KEY = "dm-labs-website-guide-v1";
const safePath = z
  .string()
  .max(500)
  .regex(/^\/(?!\/)[^?#]*$/);
const TurnSchema = z.object({
  id: z.string().max(80),
  question: z.string().max(MAX_QUESTION),
  answer: z.string().max(2000),
  sources: z
    .array(
      z.object({
        title: z.string().max(500),
        path: z
          .string()
          .max(600)
          .regex(/^\/(?!\/)/),
      })
    )
    .max(3),
  page: safePath,
  at: z.string().datetime(),
});
const SessionSchema = z.object({
  id: z.string().max(80),
  started: z.number(),
  locale: z.enum(["en", "el", "he"]),
  email: z.string().max(254),
  turns: z.array(TurnSchema).max(MAX_TURNS),
  delivered: z.number().int().min(0).max(MAX_TURNS),
  deliveredEmail: z.string().max(254),
  entry: safePath,
});
export type ChatTurn = z.infer<typeof TurnSchema>;
export type ChatSession = z.infer<typeof SessionSchema>;
export const validEmail = (value: string) =>
  !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export const createSession = (
  locale: SiteLanguage,
  path: string
): ChatSession => ({
  id: crypto.randomUUID(),
  started: Date.now(),
  locale,
  email: "",
  turns: [],
  delivered: 0,
  deliveredEmail: "",
  entry: path.split(/[?#]/)[0],
});

export function loadSession(locale: SiteLanguage, path: string): ChatSession {
  try {
    const result = SessionSchema.safeParse(
      JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null")
    );
    if (
      result.success &&
      Date.now() - result.data.started < 86_400_000 &&
      result.data.started <= Date.now()
    )
      return { ...result.data, locale };
  } catch {
    /* Storage may be disabled. The guide still works in memory. */
  }
  return createSession(locale, path);
}
export function saveSession(session: ChatSession) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* Do not lose the in-memory chat. */
  }
}

export function transcript(session: ChatSession): string {
  const t = CHAT_COPY[session.locale];
  return [
    "DM Labs · Website conversation",
    `Reference: ${session.id}`,
    `Started: ${new Date(session.started).toISOString()}`,
    `${t.currentPage}: https://dm-labs.io${session.entry}`,
    session.email.trim()
      ? `Reply email: ${session.email.trim()}`
      : "Reply email: not provided",
    "",
    ...session.turns.flatMap(turn => [
      `[${turn.at}] ${t.you}: ${turn.question}`,
      `${t.guide}: ${turn.answer}`,
      ...turn.sources.map(
        source => `${source.title}: https://dm-labs.io${source.path}`
      ),
      `${t.currentPage}: https://dm-labs.io${turn.page}`,
      "",
    ]),
  ].join("\n");
}

/** One acknowledgement per submitted question; every email contains the whole chat so far. */
export async function notifyChat(session: ChatSession): Promise<void> {
  SessionSchema.parse(session);
  if (!session.turns.length || !validEmail(session.email))
    throw new Error("Invalid conversation");
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: CONTACT_FORM_KEY,
        subject: `[Website chat ${session.id.slice(0, 8)}] ${session.turns.length} question${session.turns.length === 1 ? "" : "s"} | DM Labs`,
        name: "Website chat visitor",
        ...(session.email.trim() ? { email: session.email.trim() } : {}),
        message: transcript(session),
        conversation_id: session.id,
        locale: session.locale,
        environment:
          window.location.hostname === "dm-labs.io"
            ? "Production"
            : "Preview / local",
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
    )
      throw new Error("Notification not acknowledged");
  } finally {
    window.clearTimeout(timer);
  }
}

export function whatsappUrl(session: ChatSession, full = true) {
  const message =
    session.turns.length && full
      ? transcript(session)
      : `${CHAT_COPY[session.locale].emptyTranscript}\nhttps://dm-labs.io${session.entry}\nReference: ${session.id.slice(0, 8)}`;
  return `https://wa.me/35797472847?text=${encodeURIComponent(message)}`;
}
