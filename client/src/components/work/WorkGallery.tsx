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
      velocity = 0,
      target: number | null = null;
    let clickTimer = 0;
    let last = 0,
      frame = 0,
      timer = 0,
      pauseUntil = saved ? performance.now() + 3500 : 0;
    let pointer: {
      id: number;
      x: number;
      y: number;
      lastX: number;
      time: number;
      moved: boolean;
      vertical: boolean;
    } | null = null;
    let lastPointer = saved ? performance.now() : -Infinity,
      suppressClick = false;
    const wrap = (value: number) =>
      ((value % cards.length) + cards.length) % cards.length;
    const offset = (index: number) =>
      wrap(index - position + cards.length / 2) - cards.length / 2;
    const select = (id: string) => {
      active = id;
      root.dataset.selected = active;
      cards.forEach(card => {
        const selected = card.dataset.project === active;
        card.classList.toggle("is-selected", selected);
        card.dataset.previewReady = String(!touch.matches || selected);
      });
    };
    const settle = (delay = 4000) => {
      clearTimeout(timer);
      pauseUntil = performance.now() + delay;
      timer = window.setTimeout(() => {
        if (!hovering && !keyboard && !pointer) select("");
      }, delay);
    };
    const paint = () => {
      const radius = Math.max(1700, width * 2.8);
      cards.forEach((card, i) => {
        const x = offset(i) * spacing;
        const y = (x * x) / (2 * radius);
        const angle = (Math.atan(x / radius) * 180) / Math.PI;
        card.style.transform = `translate3d(${x.toFixed(3)}px,${y.toFixed(3)}px,0) rotate(${angle.toFixed(3)}deg)`;
        card.style.opacity = Math.abs(x) < width / 2 + cardWidth ? "1" : "0";
        card.style.pointerEvents =
          Math.abs(x) < width / 2 + cardWidth ? "auto" : "none";
        // Offscreen cards remain keyboard-reachable; focus centers them first.
        card.style.zIndex =
          card.dataset.project === active
            ? "20"
            : String(10 - Math.round(Math.abs(offset(i))));
      });
      root.dataset.carouselPosition = String(position);
    };
    const resize = () => {
      width = stage.clientWidth;
      cardWidth = Math.min(
        width < 700 ? width * 0.66 : width * 0.24,
        width < 700 ? 270 : 320
      );
      spacing = cardWidth + (width < 700 ? 18 : 28);
      stage.style.setProperty("--work-card-width", `${cardWidth}px`);
      stage.style.height = `${cardWidth * 1.5 + (width < 700 ? 148 : 164)}px`;
      paint();
    };
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000 || 0, 0.04);
      last = now;
      if (visible && !document.hidden) {
        if (target !== null) {
          position +=
            (target - position) * (motion.matches ? 1 : 1 - Math.exp(-12 * dt));
          if (Math.abs(target - position) < 0.001) {
            position = target;
            target = null;
          }
        } else if (!pointer && !hovering && !keyboard && now > pauseUntil) {
          position += velocity * dt;
          velocity *= Math.exp(-5 * dt);
          if (!motion.matches) position += 0.065 * dt;
        }
        paint();
      }
      frame = requestAnimationFrame(tick);
    };
    const focusCard = (index: number) => {
      target = position + offset(index);
      velocity = 0;
      select(cards[index].dataset.project!);
      settle();
    };
    controls.current.step = direction => {
      focusCard(wrap(Math.round(position) + direction));
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      lastPointer = performance.now();
      keyboard = false;
      hovering = false;
      target = null;
      velocity = 0;
      pointer = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        lastX: event.clientX,
        time: event.timeStamp,
        moved: false,
        vertical: false,
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
        stage.setPointerCapture(event.pointerId);
        root.classList.add("is-dragging");
      }
      if (pointer.moved) {
        const delta = (event.clientX - pointer.lastX) / spacing;
        position -= delta;
        velocity = Math.max(
          -3,
          Math.min(
            3,
            -delta / Math.max((event.timeStamp - pointer.time) / 1000, 0.016)
          )
        );
        cards.forEach(card => {
          card.dataset.previewReady = "false";
        });
        paint();
      }
      pointer.lastX = event.clientX;
      pointer.time = event.timeStamp;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      suppressClick =
        pointer.moved || pointer.vertical || event.type === "pointercancel";
      if (suppressClick)
        cards.forEach(card => {
          card.dataset.previewReady = "false";
        });
      if (stage.hasPointerCapture(event.pointerId))
        stage.releasePointerCapture(event.pointerId);
      pointer = null;
      dragging = false;
      root.classList.remove("is-dragging");
      settle(suppressClick ? 700 : 4000);
      // Keep the generated click suppressed, then restore normal link behaviour.
      clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => {
        if (!pointer) {
          suppressClick = false;
          select(active);
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
        hovering = true;
        target = null;
        velocity = 0;
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
      select("");
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
                alt={`${project.name} · ${copy.categories[project.category]}`}
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
