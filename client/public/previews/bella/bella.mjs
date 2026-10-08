import {
  services,
  dayKey,
  parseDay,
  lastBookableDay,
  isBookable,
  slotsFor,
  validAppointment,
} from "./booking.mjs";
import { hoverExpand } from "./hover-expand.mjs";
const $ = selector => document.querySelector(selector);
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const asset = name => `/previews/bella/assets/${name}-1200.webp`;
const looks = [
  {
    id: "bob",
    title: "The graphic bob",
    category: "Cut & shape",
    description:
      "An angular line, an exposed nape and a deep, inky sheen. A graphic cut that makes its point from every angle.",
    service: "cut",
    alt: "Ink-black angular bob with a clean nape, photographed in profile",
  },
  {
    id: "coils",
    title: "Light, in texture",
    category: "Curls & colour",
    description:
      "A soft platinum crown over a close, dark nape. The shape is sculpted around the coils, with all their texture left intact.",
    service: "texture",
    alt: "Short platinum coils with dark roots and a tapered nape",
  },
  {
    id: "twist",
    title: "A little sculpture",
    category: "Style & finish",
    description:
      "Copper lengths gathered into a sculptural twist. A deliberate curve at the crown, a few loose strands and a finish with character.",
    service: "finish",
    alt: "Copper hair shaped into a sculptural French twist",
  },
  {
    id: "waves",
    title: "Silver in motion",
    category: "Colour & dimension",
    description:
      "Natural silver becomes part of the composition. Deep, flowing waves let the contrast come through without hiding what makes the hair yours.",
    service: "colour",
    alt: "Long ash-brown waves with natural silver strands",
  },
];
let activeLook = 0;
let rootTrigger = null;
const state = { service: "cut", day: null, time: null, look: null };
let month = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12);
const fullDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const monthName = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});
function animate(el, frames, duration = 430) {
  if (!reduced.matches)
    el.animate(frames, { duration, easing: "cubic-bezier(.2,.7,.2,1)" });
}
function openDialog(dialog, trigger) {
  rootTrigger = trigger || document.activeElement;
  dialog.showModal();
  animate(
    dialog,
    dialog.id === "booking-dialog"
      ? [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }]
      : [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "none" },
        ]
  );
}
for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]"))
      rootTrigger?.focus({ preventScroll: true });
  });
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  });
}
document
  .querySelectorAll("[data-close]")
  .forEach(b =>
    b.addEventListener("click", () =>
      document.getElementById(b.dataset.close).close()
    )
  );
hoverExpand($(".hair-gallery"));
document.querySelectorAll("[data-layout]").forEach(b =>
  b.addEventListener("click", () => {
    $(".hair-gallery").classList.toggle("sheet", b.dataset.layout === "sheet");
    document
      .querySelectorAll("[data-layout]")
      .forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  })
);
function renderLook() {
  const look = looks[activeLook];
  $("#look-title").textContent = look.title;
  $("#look-category").textContent = look.category;
  $("#look-description").textContent = look.description;
  $("#look-image").src = asset(`hair-${look.id}`);
  $("#look-image").alt = look.alt;
  $("#look-position").textContent = `${activeLook + 1} / ${looks.length}`;
  animate($("#look-image"), [{ opacity: 0.3 }, { opacity: 1 }], 300);
}
document.querySelectorAll("[data-look]").forEach(b =>
  b.addEventListener("click", () => {
    activeLook = looks.findIndex(l => l.id === b.dataset.look);
    renderLook();
    openDialog($("#look-dialog"), b);
  })
);
function moveLook(step) {
  activeLook = (activeLook + step + looks.length) % looks.length;
  renderLook();
}
$("#previous-look").addEventListener("click", () => moveLook(-1));
$("#next-look").addEventListener("click", () => moveLook(1));
$("#look-dialog").addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    moveLook(event.key === "ArrowRight" ? 1 : -1);
  }
});
let touchStart = null;
$(".lightbox-image").addEventListener(
  "touchstart",
  e => {
    touchStart = [e.touches[0].clientX, e.touches[0].clientY];
  },
  { passive: true }
);
$(".lightbox-image").addEventListener(
  "touchend",
  e => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart[0],
      dy = e.changedTouches[0].clientY - touchStart[1];
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
      moveLook(dx < 0 ? 1 : -1);
    touchStart = null;
  },
  { passive: true }
);
function openBooking(service, trigger, look = null) {
  if (services[service]) {
    state.service = service;
    state.time = null;
  }
  state.look = look;
  $("#booking-service").value = state.service;
  $("#selected-look").hidden = !look;
  $("#selected-look").textContent = look
    ? `Your inspiration: ${look.title}`
    : "";
  $("#booking-flow").hidden = false;
  $("#booking-review").hidden = true;
  $("#booking-done").hidden = true;
  renderCalendar();
  renderTimes();
  renderSummary();
  openDialog($("#booking-dialog"), trigger);
}
document
  .querySelectorAll("[data-book]")
  .forEach(b =>
    b.addEventListener("click", () => openBooking(b.dataset.book, b))
  );
$("#book-look").addEventListener("click", () => {
  const trigger = rootTrigger;
  $("#look-dialog").close();
  openBooking(looks[activeLook].service, trigger, looks[activeLook]);
});
function renderCalendar() {
  const now = new Date(),
    first = new Date(now.getFullYear(), now.getMonth(), 1, 12),
    last = lastBookableDay(now);
  $("#calendar-month").textContent = monthName.format(month);
  $("#prev-month").disabled = month <= first;
  $("#next-month").disabled =
    month.getFullYear() === last.getFullYear() &&
    month.getMonth() === last.getMonth();
  const nodes = [];
  for (let i = 0; i < (month.getDay() + 6) % 7; i++) {
    const blank = document.createElement("span");
    blank.setAttribute("aria-hidden", "true");
    nodes.push(blank);
  }
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const date = new Date(month.getFullYear(), month.getMonth(), d, 12),
      key = dayKey(date),
      button = document.createElement("button");
    button.type = "button";
    button.textContent = d;
    button.dataset.day = key;
    button.disabled = !isBookable(key);
    button.setAttribute("aria-label", fullDate.format(date));
    button.setAttribute("aria-pressed", String(state.day === key));
    button.addEventListener("click", () => {
      state.day = key;
      state.time = null;
      $("#calendar-days")
        .querySelectorAll("button")
        .forEach(b => b.setAttribute("aria-pressed", String(b === button)));
      renderTimes();
      renderSummary();
    });
    nodes.push(button);
  }
  $("#calendar-days").replaceChildren(...nodes);
}
for (const [selector, step] of [
  ["#prev-month", -1],
  ["#next-month", 1],
])
  $(selector).addEventListener("click", () => {
    month = new Date(month.getFullYear(), month.getMonth() + step, 1, 12);
    renderCalendar();
  });
function renderTimes() {
  const slots = slotsFor(state.day, state.service);
  $("#time-hint").textContent = state.day
    ? `Times for ${fullDate.format(parseDay(state.day))}`
    : "Choose a day to see available times.";
  $("#time-slots").replaceChildren(
    ...slots.map(time => {
      const button = document.createElement("button");
      button.textContent = time;
      button.dataset.time = time;
      button.setAttribute("aria-pressed", String(state.time === time));
      button.addEventListener("click", () => {
        state.time = time;
        $("#time-slots")
          .querySelectorAll("button")
          .forEach(b => b.setAttribute("aria-pressed", String(b === button)));
        renderSummary();
      });
      return button;
    })
  );
}
function summary() {
  const s = services[state.service];
  return `${s.name} · ${s.minutes} minutes\nFrom €${s.price}${state.day ? "\n" + fullDate.format(parseDay(state.day)) : ""}${state.time ? " at " + state.time : ""}`;
}
function renderSummary() {
  $("#booking-summary").textContent = summary();
  $("#review-booking").disabled = !validAppointment(state);
}
$("#booking-service").addEventListener("change", e => {
  state.service = e.target.value;
  state.time = null;
  state.look = null;
  $("#selected-look").hidden = true;
  renderTimes();
  renderSummary();
});
$("#review-booking").addEventListener("click", () => {
  if (!validAppointment(state)) return;
  $("#review-summary").textContent = summary();
  $("#booking-flow").hidden = true;
  $("#booking-review").hidden = false;
  $("#confirm-booking").focus();
});
$("#edit-booking").addEventListener("click", () => {
  $("#booking-review").hidden = true;
  $("#booking-flow").hidden = false;
  $("#booking-service").focus();
});
$("#confirm-booking").addEventListener("click", () => {
  if (!validAppointment(state)) {
    state.time = null;
    $("#booking-review").hidden = true;
    $("#booking-flow").hidden = false;
    renderCalendar();
    renderTimes();
    renderSummary();
    return;
  }
  $("#booking-review").hidden = true;
  $("#booking-done").hidden = false;
  $("#reset-booking").focus();
});
$("#reset-booking").addEventListener("click", () => {
  state.day = null;
  state.time = null;
  state.look = null;
  $("#selected-look").hidden = true;
  $("#booking-done").hidden = true;
  $("#booking-flow").hidden = false;
  renderCalendar();
  renderTimes();
  renderSummary();
  $("#booking-service").focus();
});
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    e.stopPropagation();
    target.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth" });
    if (a.classList.contains("skip")) target.focus();
  })
);
const observer = new IntersectionObserver(
  entries => {
    for (const entry of entries)
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
  },
  { threshold: 0.1 }
);
for (const el of document.querySelectorAll(
  ".edit-heading,.studio-top,.studio-photo,.invitation"
))
  observer.observe(el);
renderCalendar();
renderTimes();
renderSummary();
document.documentElement.dataset.bellaReady = "true";
