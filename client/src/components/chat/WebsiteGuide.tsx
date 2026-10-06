import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import * as Dialog from "@radix-ui/react-dialog";
import { MessageCircle, X } from "lucide-react";
import AIChatCard from "@/components/ui/ai-chat-card";
import { usePricingCurrency } from "@/contexts/CurrencyContext";
import { getRouteLanguage } from "@/lib/routeLanguage";
import { CHAT_COPY } from "./chatCopy";
import {
  answerFromWebsite,
  readPageContext,
  type PageContext,
} from "./knowledge";
import {
  createSession,
  loadSession,
  saveSession,
  notifyChat,
  validEmail,
  MAX_QUESTION,
  MAX_TURNS,
  type ChatSession,
} from "./conversation";
import "./WebsiteGuide.css";

export const OPEN_GUIDE_EVENT = "dm-labs-open-guide";

export default function WebsiteGuide() {
  const [location] = useLocation();
  const locale = getRouteLanguage(location);
  const t = CHAT_COPY[locale];
  const { text: commercialText } = usePricingCurrency(locale);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<ChatSession>(() =>
    loadSession(locale, location)
  );
  const [page, setPage] = useState<PageContext>({
    title: "DM Labs",
    path: location,
    article: false,
    passages: [],
  });
  const [busy, setBusy] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [delivery, setDelivery] = useState<
    "idle" | "sending" | "sent" | "error"
  >(() =>
    session.turns.length > session.delivered
      ? "error"
      : session.turns.length
        ? "sent"
        : "idle"
  );
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const mounted = useRef(true);
  const launcher = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (session.turns.length || session.email) saveSession(session);
  }, [session]);
  useEffect(() => {
    setSession(current => ({ ...current, locale }));
  }, [locale]);
  useEffect(() => {
    const show = () => {
      setPage(readPageContext(location));
      setOpen(true);
    };
    window.addEventListener(OPEN_GUIDE_EVENT, show);
    return () => window.removeEventListener(OPEN_GUIDE_EVENT, show);
  }, [location]);
  useEffect(() => {
    if (open) setPage(readPageContext(location));
  }, [open, location]);

  async function deliver(snapshot: ChatSession) {
    setDelivery("sending");
    try {
      await notifyChat(snapshot);
      if (!mounted.current) return;
      setSession(current =>
        current.id === snapshot.id
          ? {
              ...current,
              delivered: snapshot.turns.length,
              deliveredEmail: snapshot.email.trim(),
            }
          : current
      );
      setDelivery("sent");
    } catch {
      if (mounted.current) setDelivery("error");
    }
  }

  async function send(question: string) {
    if (
      inFlight.current ||
      !question.trim() ||
      question.length > MAX_QUESTION ||
      session.turns.length >= MAX_TURNS
    )
      return;
    if (!validEmail(session.email)) {
      setError(t.emailError);
      return;
    }
    inFlight.current = true;
    setBusy(true);
    setThinking(true);
    setError("");
    try {
      const currentPage = readPageContext(location);
      const answer = await answerFromWebsite(
        question,
        locale,
        currentPage
      ).catch(() => ({ text: t.fallback, sources: [] }));
      if (!mounted.current) return;
      const next: ChatSession = {
        ...session,
        locale,
        turns: [
          ...session.turns,
          {
            id: crypto.randomUUID(),
            question: question.trim(),
            answer: commercialText(answer.text),
            sources: answer.sources,
            page: currentPage.path,
            at: new Date().toISOString(),
          },
        ],
      };
      setSession(next);
      saveSession(next);
      setThinking(false);
      await deliver(next);
    } catch {
      if (mounted.current) setError(t.error);
    } finally {
      inFlight.current = false;
      if (mounted.current) {
        setThinking(false);
        setBusy(false);
      }
    }
  }
  async function retry() {
    if (inFlight.current) return;
    if (!validEmail(session.email)) {
      setError(t.emailError);
      return;
    }
    inFlight.current = true;
    setBusy(true);
    setError("");
    try {
      await deliver(session);
    } finally {
      inFlight.current = false;
      if (mounted.current) setBusy(false);
    }
  }
  const reset = () => {
    if (!window.confirm(t.resetConfirm)) return;
    const next = createSession(locale, location);
    setSession(next);
    saveSession(next);
    setDelivery("idle");
    setError("");
  };
  return (
    <Dialog.Root
      open={open}
      onOpenChange={value => {
        if (value) setPage(readPageContext(location));
        setOpen(value);
      }}
    >
      <Dialog.Trigger asChild>
        <button
          ref={launcher}
          type="button"
          className="dm-chat-launcher"
          lang={locale}
          dir={locale === "he" ? "rtl" : "ltr"}
          aria-label={t.launcher}
        >
          <MessageCircle size={21} aria-hidden="true" />
          <span>{t.launcher}</span>
          <span className="dm-chat-launcher-dot" aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dm-chat-overlay" />
        <Dialog.Content
          className="dm-chat"
          lang={locale}
          dir={locale === "he" ? "rtl" : "ltr"}
          onCloseAutoFocus={event => {
            event.preventDefault();
            launcher.current?.focus();
          }}
          aria-describedby="dm-chat-description"
        >
          <AIChatCard
            copy={t}
            session={session}
            page={page}
            busy={busy}
            thinking={thinking}
            delivery={delivery}
            error={error}
            onSend={send}
            onEmail={email => {
              setSession(current => ({ ...current, email }));
              setError("");
            }}
            onRetry={retry}
            onReset={reset}
            onSource={() => setOpen(false)}
            privacyHref={`${locale === "en" ? "" : `/${locale}`}/privacy/`}
          >
            <header className="dm-chat-header">
              <div>
                <img
                  src="/brand/v1/dm-labs-horizontal-glass-dark.svg"
                  alt="DM Labs"
                  width="134"
                  height="27"
                />
                <Dialog.Title>{t.title}</Dialog.Title>
                <Dialog.Description id="dm-chat-description">
                  {t.subtitle}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={t.close}
                  className="dm-chat-close"
                  autoFocus
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </Dialog.Close>
            </header>
          </AIChatCard>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
