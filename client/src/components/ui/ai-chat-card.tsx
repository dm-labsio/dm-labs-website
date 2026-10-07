import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Check,
  Mail,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import type { ChatCopy } from "@/components/chat/chatCopy";
import {
  MAX_QUESTION,
  MAX_TURNS,
  type ChatSession,
  transcript,
  whatsappUrl,
} from "@/components/chat/conversation";
import type { PageContext } from "@/components/chat/knowledge";

export interface AIChatCardProps {
  copy: ChatCopy;
  session: ChatSession;
  page: PageContext;
  busy: boolean;
  thinking: boolean;
  delivery: "idle" | "sending" | "sent" | "error";
  error: string;
  privacyHref: string;
  onSend: (message: string) => void;
  onEmail: (email: string) => void;
  onRetry: () => void;
  onReset: () => void;
  onSource: () => void;
  children?: ReactNode;
}

/** Adapted from the supplied card: a real composer, sourced replies and an explicit handoff. */
export function AIChatCard({
  copy: t,
  session,
  page,
  busy,
  thinking,
  delivery,
  error,
  privacyHref,
  onSend,
  onEmail,
  onRetry,
  onReset,
  onSource,
  children,
}: AIChatCardProps) {
  const [draft, setDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const blocked = busy || session.turns.length >= MAX_TURNS;
  const fullWhatsApp = whatsappUrl(session);
  const longWhatsApp = fullWhatsApp.length > 6000;
  useEffect(() => {
    list.current?.scrollTo({
      top: list.current.scrollHeight,
      behavior: "instant",
    });
  }, [session.turns.length, thinking]);
  useEffect(() => {
    setDraft("");
    setCopyStatus("");
  }, [session.id]);
  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!draft.trim() || blocked) return;
    onSend(draft.trim());
    // Invalid reply details leave the question available to correct and send.
    if (
      !session.email.trim() ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(session.email.trim())
    )
      setDraft("");
  };

  return (
    <div className="dm-chat-card ph-no-capture" data-ph-no-capture>
      {children}
      <div className="dm-chat-reading" ref={list}>
        {page.article && (
          <div className="dm-chat-context">
            <BookOpen size={15} aria-hidden="true" />
            <div>
              <span>{t.context}</span>
              <p>{page.title}</p>
            </div>
          </div>
        )}
        {session.turns.length === 0 ? (
          <div className="dm-chat-welcome">
            <h3>{t.greeting}</h3>
            <p>{page.article ? t.articleIntro : t.intro}</p>
          </div>
        ) : (
          <div
            className="dm-chat-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label={t.title}
          >
            {session.turns.map(turn => (
              <div key={turn.id} className="dm-chat-turn">
                <div className="dm-chat-user">
                  <span className="sr-only">{t.you}: </span>
                  <p dir="auto">{turn.question}</p>
                </div>
                <div className="dm-chat-answer">
                  <span className="dm-chat-answer-label">
                    <BookOpen size={13} aria-hidden="true" />
                    {turn.sources.length ? t.source : t.guide}
                  </span>
                  <p dir="auto">{turn.answer}</p>
                  {turn.sources.map(source => (
                    <a
                      key={source.path}
                      href={source.path}
                      onClick={onSource}
                      className="dm-chat-source"
                    >
                      <span>{source.title}</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only">{t.related}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {thinking && (
          <p className="dm-chat-thinking" role="status">
            {t.thinking}
          </p>
        )}
        {session.turns.length >= MAX_TURNS && (
          <p className="dm-chat-limit">{t.limit}</p>
        )}
      </div>
      <div className="dm-chat-bottom">
        <details className="dm-chat-contact">
          <summary>
            <Mail size={14} aria-hidden="true" />
            {t.email}
          </summary>
          <label className="sr-only" htmlFor="dm-chat-email">
            {t.email}
          </label>
          <input
            id="dm-chat-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            value={session.email}
            maxLength={254}
            onChange={event => onEmail(event.target.value)}
            disabled={busy}
            aria-describedby="dm-chat-email-hint"
          />
          <p id="dm-chat-email-hint">{t.emailHint}</p>
          {session.turns.length > 0 &&
            session.email.trim() &&
            session.email.trim() !== session.deliveredEmail && (
              <button
                type="button"
                className="dm-chat-text-button"
                disabled={busy}
                onClick={onRetry}
              >
                {t.details}
              </button>
            )}
        </details>
        <form className="dm-chat-composer" onSubmit={submit}>
          <label className="sr-only" htmlFor="dm-chat-question">
            {t.placeholder}
          </label>
          <textarea
            id="dm-chat-question"
            ref={composer}
            dir="auto"
            rows={2}
            value={draft}
            placeholder={t.placeholder}
            maxLength={MAX_QUESTION}
            disabled={blocked}
            onChange={event => setDraft(event.target.value)}
            onKeyDown={event => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                submit();
              }
            }}
          />
          <div className="dm-chat-compose-actions">
            <span>
              {draft.length}/{MAX_QUESTION}
            </span>
            <button
              type="submit"
              className="dm-chat-send"
              disabled={blocked || !draft.trim()}
              aria-label={t.send}
            >
              <ArrowUp size={20} aria-hidden="true" />
            </button>
          </div>
        </form>
        {error && (
          <p className="dm-chat-error" role="alert">
            {error}
          </p>
        )}
        <div
          className={`dm-chat-delivery dm-chat-delivery--${delivery}`}
          role="status"
        >
          {delivery === "sending" ? (
            t.pending
          ) : delivery === "sent" ? (
            <>
              <Check size={13} aria-hidden="true" />
              {t.sent}
            </>
          ) : delivery === "error" ? (
            <>
              {t.failed}
              <button type="button" disabled={busy} onClick={onRetry}>
                {t.retry}
              </button>
            </>
          ) : null}
        </div>
        <div className="dm-chat-handoff">
          {longWhatsApp ? (
            <>
              <button
                type="button"
                className="dm-chat-whatsapp"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(transcript(session));
                    setCopyStatus(t.copied);
                  } catch {
                    setCopyStatus(t.copyError);
                  }
                }}
              >
                <MessageCircle size={17} aria-hidden="true" />
                {t.longChat}
              </button>
              <a
                href={whatsappUrl(session, false)}
                target="_blank"
                rel="noopener noreferrer"
                className="dm-chat-text-button"
              >
                {t.openWhatsApp}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </>
          ) : (
            <a
              className="dm-chat-whatsapp"
              href={fullWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              title={t.whatsappHint}
            >
              <MessageCircle size={17} aria-hidden="true" />
              {t.whatsapp}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          {session.turns.length > 0 && (
            <div className="dm-chat-utilities">
              <button
                type="button"
                disabled={busy}
                onClick={onReset}
                title={t.reset}
                aria-label={t.reset}
              >
                <RefreshCw size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        {copyStatus && (
          <p className="dm-chat-small" role="status">
            {copyStatus}
          </p>
        )}
        {copyStatus === t.copyError && (
          <textarea
            className="dm-chat-copy-fallback"
            readOnly
            rows={3}
            value={transcript(session)}
            aria-label={t.longChat}
            onFocus={event => event.currentTarget.select()}
          />
        )}
        <p className="dm-chat-notice">
          {t.notice}{" "}
          <a href={privacyHref} target="_blank" rel="noopener noreferrer">
            {t.privacy}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
export default AIChatCard;
