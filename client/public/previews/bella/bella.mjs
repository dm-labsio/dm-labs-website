import {
  services,
  dayKey,
  parseDay,
  lastBookableDay,
  isBookable,
  slotsFor,
  validAppointment,
} from "./booking.mjs";
const $ = selector => document.querySelector(selector);
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const mobile = matchMedia("(max-width: 700px)");
const asset = (name, size = 1200) =>
  `/previews/bella/assets/${name}-${size}.webp`;
const state = { service: "cut", day: null, time: null, look: null };
let month = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12);
let activeLook = "curls",
  lastDialogTrigger = null;
const looks = {
  curls: {
    title: "Let curls be curls.",
    kicker: "The texture edit",
    description:
      "A rounded silhouette with space for every curl to move. Softness at the edges, plenty of personality through the shape.",
    shape: "Shoulder-grazing layers that work with natural curl patterns.",
    colour: "Espresso roots with selective cinnamon ribbons.",
    care: "Gentle definition, a diffuser and a finish with movement.",
    service: "texture",
    portrait: "curls-portrait",
    detail: "curls-detail",
  },
  bob: {
    title: "A softer kind of sharp.",
    kicker: "The shape edit",
    description:
      "A bob with a deliberate line and a lived-in finish. A little shorter at the nape, with a softer outline around the face.",
    shape: "A chin-length bob with an off-centre part and a natural edge.",
    colour: "Deep chestnut with a quiet, natural sheen.",
    care: "An easy air-dry or a quick brush-through for a smoother finish.",
    service: "cut",
    portrait: "bob-detail",
    detail: "bob-detail",
  },
  colour: {
    title: "Warmth in the details.",
    kicker: "The colour edit",
    description:
      "Colour follows the shape of the hair. Warm ribbons catch the light while a deeper root keeps the whole look grounded.",
    shape: "A rounded curly silhouette, shown here in close detail.",
    colour:
      "Selective cinnamon and copper-brown tones through an espresso base.",
    care: "A gentle colour-care routine, tailored during the consultation.",
    service: "colour",
    portrait: "curls-portrait",
    detail: "curls-detail",
  },
};
function animate(
  element,
  frames = [
    { opacity: 0.3, transform: "translateY(12px)" },
    { opacity: 1, transform: "translateY(0)" },
  ]
) {
  if (!reduced.matches)
    element.animate(frames, {
      duration: 430,
      easing: "cubic-bezier(.2,.65,.3,1)",
    });
}
function showDialog(dialog, trigger) {
  lastDialogTrigger = trigger || document.activeElement;
  dialog.showModal();
  document.documentElement.style.overflow = "hidden";
  animate(dialog);
}
function closeDialog(dialog) {
  dialog.close();
}
for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("close", () => {
    document.documentElement.style.overflow = "";
    if (lastDialogTrigger?.isConnected)
      lastDialogTrigger.focus({ preventScroll: true });
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
      closeDialog(dialog);
  });
}
document
  .querySelectorAll("[data-close]")
  .forEach(button =>
    button.addEventListener("click", () =>
      closeDialog(document.getElementById(button.dataset.close))
    )
  );
function setLookView(view) {
  const look = looks[activeLook];
  $("#look-image").src = asset(look[view]);
  $("#look-image").alt =
    view === "detail"
      ? `${look.title} Hair shape and colour detail.`
      : `${look.title} Editorial portrait.`;
  document
    .querySelectorAll("[data-view]")
    .forEach(button =>
      button.setAttribute("aria-pressed", String(button.dataset.view === view))
    );
  animate($("#look-image"), [
    { opacity: 0.25, transform: "scale(1.035)" },
    { opacity: 1, transform: "scale(1)" },
  ]);
}
document.querySelectorAll("[data-look]").forEach(button =>
  button.addEventListener("click", () => {
    activeLook = button.dataset.look;
    const look = looks[activeLook];
    for (const [id, key] of [
      ["look-title", "title"],
      ["look-kicker", "kicker"],
      ["look-description", "description"],
      ["look-shape", "shape"],
      ["look-colour", "colour"],
      ["look-care", "care"],
    ])
      document.getElementById(id).textContent = look[key];
    $("#look-views").hidden = activeLook === "bob";
    setLookView(activeLook === "colour" ? "detail" : "portrait");
    showDialog($("#look-dialog"), button);
  })
);
document
  .querySelectorAll("[data-view]")
  .forEach(button =>
    button.addEventListener("click", () => setLookView(button.dataset.view))
  );
function scrollToSection(id, focusTarget) {
  const target = document.getElementById(id);
  target.scrollIntoView({
    behavior: reduced.matches ? "instant" : "smooth",
    block: "start",
  });
  if (focusTarget) focusTarget.focus({ preventScroll: true });
}
function chooseService(service, look = null) {
  state.service = service;
  state.time = null;
  state.look = look;
  $("#booking-service").value = service;
  $("#selected-look").hidden = !look;
  $("#selected-look").textContent = look
    ? `Your inspiration: ${looks[look].title}`
    : "";
  renderTimes();
  renderSummary();
  scrollToSection("appointment", $("#booking-service"));
}
$("#book-look").addEventListener("click", () => {
  const look = activeLook;
  lastDialogTrigger = $("#booking-service");
  closeDialog($("#look-dialog"));
  chooseService(looks[look].service, look);
});
document
  .querySelectorAll("[data-book]")
  .forEach(button =>
    button.addEventListener("click", () => chooseService(button.dataset.book))
  );
let previewService = "cut";
function placeServiceImage() {
  const figure = $(".service-visual");
  if (mobile.matches)
    document
      .querySelector(`[data-service-row="${previewService}"]`)
      .append(figure);
  else $(".service-layout").prepend(figure);
}
function preview(service) {
  if (!services[service]) return;
  const changed = previewService !== service;
  previewService = service;
  document
    .querySelectorAll("[data-service]")
    .forEach(button =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.service === service)
      )
    );
  document
    .querySelectorAll("[data-service-row]")
    .forEach(row =>
      row.classList.toggle("is-active", row.dataset.serviceRow === service)
    );
  const img = $("#service-image");
  img.src = asset(services[service].image, 600);
  img.alt = services[service].alt;
  $("#service-caption").textContent = services[service].caption;
  placeServiceImage();
  if (changed)
    animate(img, [
      { opacity: 0.15, transform: "scale(1.04)" },
      { opacity: 1, transform: "scale(1)" },
    ]);
}
document.querySelectorAll("[data-service]").forEach(button => {
  button.addEventListener("click", () => preview(button.dataset.service));
  button.addEventListener("focus", () => {
    if (!mobile.matches) preview(button.dataset.service);
  });
  button.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse" && !mobile.matches)
      preview(button.dataset.service);
  });
});
mobile.addEventListener("change", placeServiceImage);
placeServiceImage();
const monthName = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});
const fullDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});
function renderCalendar() {
  $("#calendar-month").textContent = monthName.format(month);
  const now = new Date(),
    first = new Date(now.getFullYear(), now.getMonth(), 1, 12),
    last = lastBookableDay(now);
  $("#prev-month").disabled = month <= first;
  $("#next-month").disabled =
    month.getFullYear() === last.getFullYear() &&
    month.getMonth() === last.getMonth();
  const nodes = [];
  const offset = (month.getDay() + 6) % 7;
  for (let i = 0; i < offset; i++) {
    const blank = document.createElement("span");
    blank.setAttribute("aria-hidden", "true");
    nodes.push(blank);
  }
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const date = new Date(month.getFullYear(), month.getMonth(), d, 12),
      key = dayKey(date);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = d;
    button.dataset.day = key;
    button.disabled = !isBookable(key, now);
    button.setAttribute("aria-label", fullDate.format(date));
    button.setAttribute("aria-pressed", String(state.day === key));
    button.addEventListener("click", () => {
      state.day = key;
      state.time = null;
      document
        .querySelectorAll("[data-day]")
        .forEach(b =>
          b.setAttribute("aria-pressed", String(b.dataset.day === key))
        );
      renderTimes();
      renderSummary();
    });
    nodes.push(button);
  }
  $("#calendar").replaceChildren(...nodes);
}
$("#prev-month").addEventListener("click", () => {
  month = new Date(month.getFullYear(), month.getMonth() - 1, 1, 12);
  renderCalendar();
});
$("#next-month").addEventListener("click", () => {
  month = new Date(month.getFullYear(), month.getMonth() + 1, 1, 12);
  renderCalendar();
});
function renderTimes() {
  const slots = slotsFor(state.day, state.service);
  $("#time-label").textContent = state.day
    ? `Sample times for ${shortDate.format(parseDay(state.day))}`
    : "Choose a day to see sample times";
  const buttons = slots.map(time => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = time;
    button.dataset.time = time;
    button.setAttribute("aria-pressed", String(time === state.time));
    button.addEventListener("click", () => {
      state.time = time;
      document
        .querySelectorAll("[data-time]")
        .forEach(b =>
          b.setAttribute("aria-pressed", String(b.dataset.time === time))
        );
      renderSummary();
    });
    return button;
  });
  $("#times").replaceChildren(...buttons);
}
function renderSummary() {
  const service = services[state.service];
  $("#summary-service").textContent = service.name;
  $("#summary-duration").textContent = `${service.minutes} minutes`;
  $("#summary-price").textContent = `€${service.price}`;
  $("#summary-date").textContent = state.day
    ? fullDate.format(parseDay(state.day))
    : "Choose a day";
  $("#summary-time").textContent = state.time || "Choose a time";
  const valid = validAppointment(state);
  $("#review-booking").disabled = !valid;
  $("#booking-hint").textContent = valid
    ? "Ready when you are. Review your selection below."
    : state.day
      ? "Choose an available time to continue."
      : "Pick a day and time to review your appointment.";
}
$("#booking-service").addEventListener("change", () => {
  state.service = $("#booking-service").value;
  state.time = null;
  state.look = null;
  $("#selected-look").hidden = true;
  renderTimes();
  renderSummary();
});
function appointmentText() {
  return `${services[state.service].name}, ${fullDate.format(parseDay(state.day))} at ${state.time}. ${services[state.service].minutes} minutes, from €${services[state.service].price}.`;
}
$("#review-booking").addEventListener("click", () => {
  if (!validAppointment(state)) {
    renderTimes();
    renderSummary();
    return;
  }
  $("#review-stage").hidden = false;
  $("#complete-stage").hidden = true;
  $("#review-details").textContent = appointmentText();
  showDialog($("#review-dialog"), $("#review-booking"));
});
$("#confirm-booking").addEventListener("click", () => {
  if (!validAppointment(state)) {
    closeDialog($("#review-dialog"));
    renderTimes();
    renderSummary();
    return;
  }
  $("#complete-details").textContent = appointmentText();
  $("#review-stage").hidden = true;
  $("#complete-stage").hidden = false;
  $("#complete-title").focus({ preventScroll: true });
  animate($("#complete-stage"));
});
$("#start-again").addEventListener("click", () => {
  lastDialogTrigger = $("#booking-service");
  closeDialog($("#review-dialog"));
  state.day = null;
  state.time = null;
  state.look = null;
  $("#selected-look").hidden = true;
  renderCalendar();
  renderTimes();
  renderSummary();
  $("#booking-service").focus({ preventScroll: true });
});
renderCalendar();
renderSummary();
// Native scroll, progressively enhanced reveals. Content stays visible without JS.
if (!reduced.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries =>
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pending");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.07 }
  );
  document.documentElement.classList.add("motion-ready");
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("pending");
    observer.observe(el);
  });
  reduced.addEventListener("change", () => {
    if (reduced.matches) {
      document
        .querySelectorAll(".pending")
        .forEach(el => el.classList.remove("pending"));
      observer.disconnect();
    }
  });
}
// Avoid adding iframe hash history entries; buttons own all stateful interactions.
document.addEventListener(
  "click",
  event => {
    const a = event.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.getElementById(a.getAttribute("href").slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: reduced.matches ? "instant" : "smooth",
      block: "start",
    });
    if (a.classList.contains("skip")) target.focus({ preventScroll: true });
  },
  true
);
