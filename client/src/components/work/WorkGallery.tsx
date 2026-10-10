import { websiteCoverAlt } from "./brandMetadata";
import { useLayoutEffect, useRef } from "react";
import { readPreviewSource } from "@/lib/previewNavigation";
import { workCopy, workProjects, type WorkLocale } from "./workData";

/** Arc Flow Carousel by Hyperiux (21st.dev), adapted as an original, dependency-free
 * implementation. Modular positions recycle offscreen; there are no cloned links. */
export default function WorkGallery({ locale }: { locale: WorkLocale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const controls = useRef({ step: (_direction: number) => {} });
  const copy = workCopy[locale];
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const stage = root.querySelector<HTMLElement>(".work-arc-stage")!;
    const cards = Array.from(
      root.querySelectorAll<HTMLAnchorElement>(".work-arc-card")
    );
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const touch = matchMedia("(hover: none)");
    const candidate = readPreviewSource()?.workGallery;
    const saved =
      candidate && Number.isFinite(candidate.position) ? candidate : undefined;
    let position = saved?.position ?? 0;
    let active = saved?.selected ?? "";
    let hovering = false,
      keyboard = false,
      visible = false,
      dragging = false;
    let width = 0,
      cardWidth = 0,
      spacing = 0,
      compact = false;
    // Motion state, in card units. A spring moves `position` to `target`
    // and keeps `velocity` continuous, so a swipe hands its speed to the
    // glide and any glide can be grabbed mid-flight.
    let velocity = 0,
      target: number | null = null,
      response = 0.5,
      damping = 1,
      drift = 0,
      painted = NaN,
      fromGesture = false;
    let clickTimer = 0;
    let last = 0,
      frame = 0,
      timer = 0,
      pauseUntil = saved ? performance.now() + 3500 : 0,
      nextStep = performance.now() + 2600;
    let pointer: {
      id: number;
      x: number;
      y: number;
      lastX: number;
      moved: boolean;
      vertical: boolean;
      history: { t: number; p: number }[];
    } | null = null;
    let lastPointer = saved ? performance.now() : -Infinity,
      suppressClick = false;
    const wrap = (value: number) =>
      ((value % cards.length) + cards.length) % cards.length;
    const offset = (index: number) =>
      wrap(index - position + cards.length / 2) - cards.length / 2;
    const cardAt = (value: number) => cards[wrap(Math.round(value))];
    const cardState = cards.map(() => ({ opacity: "", events: "", z: "" }));
    // Decode every cover up front so a card never paints blank mid-swipe.
    cards.forEach(card => {
      void card.querySelector("img")?.decode().catch(() => {});
    });
    const paint = () => {
      const radius = Math.max(1700, width * 2.8);
      cards.forEach((card, i) => {
        const x = offset(i) * spacing;
        const y = (x * x) / (2 * radius);
        const angle = (Math.atan(x / radius) * 180) / Math.PI;
        card.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${angle.toFixed(3)}deg)`;
        // Only touch the properties that changed: rewriting stacking order and
        // opacity on every frame forces extra work on phones.
        const shown = Math.abs(x) < width / 2 + cardWidth;
        const opacity = shown ? "1" : "0";
        const events = shown ? "auto" : "none";
        // Offscreen cards remain keyboard-reachable; focus centers them first.
        const z =
          card.dataset.project === active
            ? "20"
            : String(10 - Math.round(Math.abs(offset(i))));
        const prev = cardState[i];
        if (prev.opacity !== opacity)
          card.style.opacity = prev.opacity = opacity;
        if (prev.events !== events)
          card.style.pointerEvents = prev.events = events;
        if (prev.z !== z) card.style.zIndex = prev.z = z;
      });
      painted = position;
      root.dataset.carouselPosition = String(position);
    };
    const select = (id: string) => {
      active = id;
      root.dataset.selected = active;
      cards.forEach(card => {
        const selected = card.dataset.project === active;
        card.classList.toggle("is-selected", selected);
        card.dataset.previewReady = String(!touch.matches || selected);
      });
      paint();
    };
    const settle = (delay = 4000) => {
      clearTimeout(timer);
      pauseUntil = performance.now() + delay;
      nextStep = pauseUntil;
      timer = window.setTimeout(() => {
        if (!hovering && !keyboard && !pointer) select("");
      }, delay);
    };
    /** Glide to a card. Damping 1 settles without overshoot; a flick uses a
     * little bounce because the finger carried momentum into it. */
    const glide = (to: number, options: { response?: number; damping?: number; velocity?: number } = {}) => {
      target = to;
      drift = 0;
      response = options.response ?? 0.5;
      damping = options.damping ?? 1;
      if (options.velocity !== undefined) velocity = options.velocity;
      if (motion.matches) {
        position = to;
        velocity = 0;
        target = null;
        paint();
      }
    };
    const resize = () => {
      width = stage.clientWidth;
      compact = width < 700;
      cardWidth = Math.min(
        compact ? width * 0.66 : width * 0.24,
        compact ? 270 : 320
      );
      spacing = cardWidth + (compact ? 18 : 28);
      stage.style.setProperty("--work-card-width", `${cardWidth}px`);
      stage.style.height = `${cardWidth * 1.5 + (compact ? 148 : 164)}px`;
      paint();
    };
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000 || 0, 0.05);
      last = now;
      if (visible && !document.hidden) {
        if (pointer?.moved) {
          // The finger drives the position; paint happens in pointermove.
        } else if (target !== null) {
          const stiffness = ((2 * Math.PI) / response) ** 2;
          const friction = 2 * damping * Math.sqrt(stiffness);
          const steps = Math.max(1, Math.ceil(dt / 0.008));
          const h = dt / steps;
          for (let i = 0; i < steps; i++) {
            velocity +=
              (-stiffness * (position - target) - friction * velocity) * h;
            position += velocity * h;
          }
          if (
            Math.abs(position - target) < 0.0004 &&
            Math.abs(velocity) < 0.004
          ) {
            position = target;
            velocity = 0;
            target = null;
            // After a swipe on a phone, lift the card that landed in the
            // middle so the next tap opens it.
            if (fromGesture && compact && touch.matches)
              select(cardAt(position).dataset.project!);
            fromGesture = false;
          }
        } else if (!pointer && !hovering && !keyboard && !motion.matches) {
          if (compact) {
            // Phones show one card at a time: glide to the next card every
            // few seconds instead of creeping, so the change is easy to see.
            if (now > pauseUntil && now >= nextStep) {
              glide(Math.round(position) + 1, { response: 0.8 });
              nextStep = now + 3800;
            }
          } else {
            // Wide screens keep the slow drift, eased in and out instead of
            // starting and stopping at full speed.
            const want = now > pauseUntil ? 1 : 0;
            drift += (want - drift) * (1 - Math.exp(-2.5 * dt));
            if (drift > 0.001) position += 0.065 * drift * dt;
          }
        }
        if (position !== painted) paint();
      }
      frame = requestAnimationFrame(tick);
    };
    const focusCard = (index: number) => {
      glide(position + offset(index));
      select(cards[index].dataset.project!);
      settle();
    };
    controls.current.step = direction => {
      // Repeated presses stack onto the card already being travelled to.
      const next = (target ?? Math.round(position)) + direction;
      glide(next);
      select(cardAt(next).dataset.project!);
      settle();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      lastPointer = performance.now();
      keyboard = false;
      hovering = false;
      // Grab: stop exactly where the cards are, mid-glide included.
      target = null;
      velocity = 0;
      drift = 0;
      fromGesture = false;
      pointer = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        lastX: event.clientX,
        moved: false,
        vertical: false,
        history: [{ t: event.timeStamp, p: position }],
      };
      suppressClick = false;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId || pointer.vertical)
        return;
      const dx = event.clientX - pointer.x,
        dy = event.clientY - pointer.y;
      if (!pointer.moved && Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        pointer.vertical = true;
        return;
      }
      if (!pointer.moved && Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(dy)) {
        pointer.moved = true;
        dragging = true;
        select("");
        cards.forEach(card => {
          card.dataset.previewReady = "false";
        });
        stage.setPointerCapture(event.pointerId);
        root.classList.add("is-dragging");
        // Count the slop distance too, so the cards don't jump when they
        // start to follow the finger.
        pointer.lastX = pointer.x;
      }
      if (pointer.moved) {
        // Coalesced events give every touch sample, not one per frame.
        const samples =
          typeof event.getCoalescedEvents === "function"
            ? event.getCoalescedEvents()
            : [];
        const latest = samples.length ? samples : [event];
        for (const sample of latest) {
          position -= (sample.clientX - pointer.lastX) / spacing;
          pointer.lastX = sample.clientX;
          pointer.history.push({ t: sample.timeStamp, p: position });
        }
        const cutoff = event.timeStamp - 120;
        while (pointer.history.length > 2 && pointer.history[0].t < cutoff)
          pointer.history.shift();
        paint();
      }
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const gesture = pointer;
      suppressClick =
        gesture.moved || gesture.vertical || event.type === "pointercancel";
      if (suppressClick)
        cards.forEach(card => {
          card.dataset.previewReady = "false";
        });
      if (stage.hasPointerCapture(event.pointerId))
        stage.releasePointerCapture(event.pointerId);
      pointer = null;
      dragging = false;
      root.classList.remove("is-dragging");
      if (gesture.moved) {
        // Release velocity from the last ~100ms of movement, in cards per
        // second. A finger that stopped before lifting throws nothing.
        const first = gesture.history[0];
        const lastSample = gesture.history[gesture.history.length - 1];
        const span = (lastSample.t - first.t) / 1000;
        const still = event.timeStamp - lastSample.t > 60;
        let release =
          span > 0.008 && !still ? (lastSample.p - first.p) / span : 0;
        release = Math.max(-8, Math.min(8, release));
        // Project where the throw would come to rest, then land on the card
        // nearest to that point (Apple's deceleration projection, 0.996).
        const projected = position + (release * 0.996) / (1 - 0.996) / 1000;
        let landing = Math.round(projected);
        if (Math.abs(release) > 0.6 && landing === Math.round(position))
          landing = release > 0 ? Math.ceil(position + 0.001) : Math.floor(position - 0.001);
        landing = Math.max(
          Math.round(position) - 3,
          Math.min(Math.round(position) + 3, landing)
        );
        fromGesture = true;
        glide(landing, {
          response: 0.42,
          damping: Math.abs(release) > 1.5 ? 0.86 : 1,
          velocity: release,
        });
      } else if (compact && target === null && Math.abs(position - Math.round(position)) > 0.002) {
        // A tap that stopped a glide finishes it on the nearest card.
        glide(Math.round(position), { response: 0.45 });
      }
      settle(4000);
      // Keep the generated click suppressed, then restore normal link behaviour.
      clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => {
        if (!pointer) {
          suppressClick = false;
          if (!fromGesture) select(active);
        }
      }, 100);
    };
    const onClick = (event: MouseEvent) => {
      const card =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>(".work-arc-card")
          : null;
      if (!card) return;
      if (suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (
        touch.matches &&
        card.dataset.previewReady === "false" &&
        event.detail !== 0
      ) {
        event.preventDefault();
        focusCard(cards.indexOf(card));
      }
    };
    const onPointerOver = (event: PointerEvent) => {
      if (touch.matches || event.pointerType === "touch" || pointer || dragging)
        return;
      const card =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>(".work-arc-card")
          : null;
      if (card) {
        // Hovering pauses the drift; a glide already under way still lands.
        hovering = true;
        drift = 0;
        select(card.dataset.project!);
      }
    };
    const onPointerOut = (event: PointerEvent) => {
      if (
        touch.matches ||
        event.pointerType === "touch" ||
        pointer ||
        !hovering
      )
        return;
      const next =
        event.relatedTarget instanceof Element
          ? event.relatedTarget.closest(".work-arc-card")
          : null;
      if (!next) {
        hovering = false;
        if (!keyboard) {
          select("");
          pauseUntil = 0;
        }
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (performance.now() - lastPointer < 300) return;
      const index = cards.indexOf(event.target as HTMLAnchorElement);
      if (index < 0) return;
      keyboard = true;
      if (Math.abs(offset(index)) > 0.8) focusCard(index);
      else select(cards[index].dataset.project!);
    };
    const onBlur = (event: FocusEvent) => {
      if (!stage.contains(event.relatedTarget as Node)) {
        keyboard = false;
        settle(1200);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      const index = cards.indexOf(event.target as HTMLAnchorElement);
      if (index < 0) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const next = wrap(index + (event.key === "ArrowRight" ? 1 : -1));
        focusCard(next);
        cards[next].focus({ preventScroll: true });
      }
      if (event.key === "Escape") {
        keyboard = false;
        cards[index].blur();
        select("");
        settle(600);
      }
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      target = null;
      hovering = false;
      keyboard = false;
      drift = 0;
      if (active) select("");
      position += event.deltaX / spacing;
      velocity = 0;
      settle(1200);
      paint();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(stage);
    sizeObserver.observe(stage);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("pointerover", onPointerOver);
    stage.addEventListener("pointerout", onPointerOut);
    stage.addEventListener("click", onClick);
    stage.addEventListener("focusin", onFocus);
    stage.addEventListener("focusout", onBlur);
    stage.addEventListener("keydown", onKey);
    stage.addEventListener("wheel", onWheel, { passive: false });
    const onMotion = () => {
      velocity = 0;
      select(active);
    };
    motion.addEventListener("change", onMotion);
    touch.addEventListener("change", onMotion);
    root.classList.add("is-ready");
    select(active);
    if (saved) settle(3500);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      clearTimeout(clickTimer);
      observer.disconnect();
      sizeObserver.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("pointerover", onPointerOver);
      stage.removeEventListener("pointerout", onPointerOut);
      stage.removeEventListener("click", onClick);
      stage.removeEventListener("focusin", onFocus);
      stage.removeEventListener("focusout", onBlur);
      stage.removeEventListener("keydown", onKey);
      stage.removeEventListener("wheel", onWheel);
      motion.removeEventListener("change", onMotion);
      touch.removeEventListener("change", onMotion);
    };
  }, []);
  return (
    <div
      ref={rootRef}
      className="work-carousel"
      data-work-gallery="web-design"
      role="region"
      aria-roledescription="carousel"
      aria-label={copy.demos}
    >
      <div className="work-arc-stage" dir="ltr">
        {workProjects.map(project => (
          <a
            key={project.id}
            className="work-arc-card"
            data-project={project.id}
            data-demo-card={project.id}
            href={`/preview/${project.id}/`}
            aria-label={`${copy.open}: ${project.name}`}
            draggable={false}
            onDragStart={e => e.preventDefault()}
          >
            <div className="work-arc-lift">
              <img
                src={`/media/examples/portraits/${project.id}-600.webp`}
                srcSet={`/media/examples/portraits/${project.id}-360.webp 360w, /media/examples/portraits/${project.id}-600.webp 600w`}
                sizes="(max-width: 699px) 66vw, 320px"
                width="600"
                height="900"
                alt={websiteCoverAlt(project.name, copy.categories[project.category], locale)}
                loading="eager"
                decoding="async"
                draggable={false}
              />
              <div
                className="work-card-caption"
                dir={locale === "he" ? "rtl" : "ltr"}
              >
                <div>
                  <h3 dir="ltr">{project.name}</h3>
                  <p>{copy.categories[project.category]}</p>
                </div>
                <span className="work-card-open">{copy.open}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="work-gallery-controls">
        <p>
          <span className="work-hint-mouse">{copy.hint}</span>
          <span className="work-hint-touch">{copy.touchHint}</span>
        </p>
        <div>
          <button type="button" onClick={() => controls.current.step(-1)}>
            {copy.previous}
          </button>
          <button type="button" onClick={() => controls.current.step(1)}>
            {copy.next}
          </button>
        </div>
      </div>
    </div>
  );
}
