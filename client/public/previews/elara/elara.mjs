const $ = s => document.querySelector(s);
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const treatments = {
  routine: {
    label: "A good place to begin",
    title: "Make space for<br>the everyday.",
    description:
      "A check-up is a chance to talk about your teeth and gums, ask questions and discuss any next steps.",
    list: [
      "Dental check-ups",
      "Hygiene appointments",
      "At-home care conversations",
    ],
    word: "everyday",
    name: "Everyday care",
    cta: "Request an everyday care appointment",
  },
  smile: {
    label: "A conversation, not a prescription",
    title: "A smile that<br>feels like you.",
    description:
      "Talk through what you would like to change, what is possible and what is right for your teeth. No pressure to decide on the day.",
    list: [
      "Smile consultations",
      "Whitening discussions",
      "Alignment & cosmetic options",
    ],
    word: "confidence",
    name: "Your smile",
    cta: "Request a smile consultation",
  },
  restore: {
    label: "Understand your options",
    title: "Thoughtful care.<br>A clear next step.",
    description:
      "From a damaged tooth to a missing one, begin with an assessment and a conversation about the available options.",
    list: [
      "Fillings & crowns",
      "Root canal consultations",
      "Tooth replacement discussions",
    ],
    word: "restore",
    name: "Repair & restore",
    cta: "Request a restorative consultation",
  },
  family: {
    label: "A familiar face, from the start",
    title: "Little visits.<br>Growing confidence.",
    description:
      "An introduction at their pace, with time to get familiar with the chair, meet the team and ask all the questions.",
    list: [
      "Children’s check-ups",
      "First-visit introductions",
      "Family care conversations",
    ],
    word: "together",
    name: "Growing smiles",
    cta: "Request a family appointment",
  },
};
const tabs = [...document.querySelectorAll("[data-care]")];
function selectCare(tab) {
  const item = treatments[tab.dataset.care];
  tabs.forEach(t => {
    t.setAttribute("aria-selected", String(t === tab));
    t.tabIndex = t === tab ? 0 : -1;
  });
  $("#care-panel").setAttribute("aria-labelledby", tab.id);
  $("#care-panel").dataset.kind = tab.dataset.care;
  $("#care-label").textContent = item.label;
  $("#care-name").innerHTML = item.title;
  $("#care-description").textContent = item.description;
  $("#care-list").replaceChildren(
    ...item.list.map(text => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    })
  );
  $("#care-book").textContent = item.cta;
  $("#care-book").dataset.request = item.name;
  if (!reduced.matches)
    $(".care-content").animate(
      [
        { opacity: 0.3, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 320, easing: "ease-out" }
    );
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectCare(tab));
  tab.addEventListener("keydown", event => {
    const moves = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next;
    if (event.key in moves)
      next = (index + moves[event.key] + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus();
    selectCare(tabs[next]);
  });
});
const requestDialog = $("#appointment");
let requestOpener;
let previousOverflow = "";
document.querySelectorAll("[data-request]").forEach(button =>
  button.addEventListener("click", () => {
    requestOpener = button;
    $("#request-care").value =
      button.dataset.request || "I’d like to talk first";
    $("#request-fields").hidden = false;
    $("#request-result").hidden = true;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestDialog.showModal();
    requestDialog.scrollTop = 0;
  })
);
$("#close-request").addEventListener("click", () => requestDialog.close());
$("#finish-request").addEventListener("click", () => requestDialog.close());
requestDialog.addEventListener("close", () => {
  document.body.style.overflow = previousOverflow;
  $("#request-form").reset();
  $("#request-summary").replaceChildren();
  requestOpener?.focus({ preventScroll: true });
});
$("#request-form").addEventListener("submit", event => {
  event.preventDefault();
  const rows = [
    ["Name", $("#request-name").value],
    ["Email", $("#request-email").value],
    ["Regarding", $("#request-care").value],
    ["Best time to contact", $("#request-time").value],
  ];
  $("#request-summary").replaceChildren(
    ...rows.flatMap(([label, value]) => {
      const dt = document.createElement("dt"),
        dd = document.createElement("dd");
      dt.textContent = label;
      dd.textContent = value;
      return [dt, dd];
    })
  );
  $("#request-fields").hidden = true;
  $("#request-result").hidden = false;
  requestDialog.scrollTop = 0;
  $("#result-title").focus();
});
$("#edit-request").addEventListener("click", () => {
  $("#request-fields").hidden = false;
  $("#request-result").hidden = true;
  $("#request-name").focus();
});
const video = $("#care-video");
async function playFilm() {
  $("#film-error").hidden = true;
  $("#play-film").hidden = true;
  try {
    await video.play();
  } catch {
    $("#play-film").hidden = false;
  }
}
$("#play-film").addEventListener("click", playFilm);
video.addEventListener("error", () => {
  $("#play-film").hidden = true;
  $("#film-error").hidden = false;
});
$("#retry-film").addEventListener("click", () => {
  video.load();
  playFilm();
});
// Pausing off-screen saves work without starting motion that was not requested.
const observer = new IntersectionObserver(
  entries => {
    if (!entries[0].isIntersecting) video.pause();
  },
  { threshold: 0.1 }
);
observer.observe(video);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) video.pause();
});
// Keep section navigation out of the parent showcase's Back history.
document.addEventListener("click", e => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const destination = document.getElementById(
    anchor.getAttribute("href").slice(1)
  );
  if (!destination) return;
  e.preventDefault();
  destination.scrollIntoView({
    behavior: reduced.matches ? "instant" : "smooth",
  });
  history.replaceState(history.state, "", anchor.getAttribute("href"));
  if (anchor.classList.contains("skip"))
    destination.focus({ preventScroll: true });
});
document.documentElement.dataset.elaraReady = "true";

// The 21st/Aceternity container-scroll pattern, fitted to an unpinned photo hero.
// Native scrolling stays native; one scheduled frame drives the transform.
const heroStage = $("#hero-stage") || $(".hero-stage");
const perspective = $("#hero-perspective");
let scrollFrame = 0;
function renderPerspective() {
  scrollFrame = 0;
  const progress = reduced.matches
    ? 1
    : Math.max(
        0,
        Math.min(1, (220 - heroStage.getBoundingClientRect().top) / 450)
      );
  perspective.style.setProperty("--tilt", `${18 * (1 - progress)}deg`);
  perspective.style.setProperty("--scale", String(0.88 + 0.12 * progress));
}
function schedulePerspective() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(renderPerspective);
}
addEventListener("scroll", schedulePerspective, { passive: true });
addEventListener("resize", schedulePerspective);
reduced.addEventListener("change", schedulePerspective);
renderPerspective();

// Magnetic feedback moves the label within a stable clickable button.
const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
document.querySelectorAll(".button").forEach(button => {
  const label = document.createElement("span");
  label.className = "magnetic-label";
  label.textContent = button.textContent.trim();
  button.replaceChildren(label);
  button.addEventListener("pointermove", e => {
    if (reduced.matches || !finePointer.matches) return;
    const r = button.getBoundingClientRect();
    label.style.setProperty(
      "--mx",
      `${(e.clientX - r.left - r.width / 2) * 0.09}px`
    );
    label.style.setProperty(
      "--my",
      `${(e.clientY - r.top - r.height / 2) * 0.14}px`
    );
  });
  button.addEventListener("pointerleave", () => {
    label.style.setProperty("--mx", "0px");
    label.style.setProperty("--my", "0px");
  });
});
const views = [
  {
    src: "/previews/elara/assets/clinical-1600.webp",
    small: "/previews/elara/assets/clinical-800.webp",
    title: "The practice",
    caption: "Clarity in every detail.",
    alt: "Bright white dental practice with glass treatment rooms and a pale blue dental chair",
  },
  {
    src: "/previews/elara/assets/detail-1600.webp",
    small: "/previews/elara/assets/detail-800.webp",
    title: "The detail",
    caption: "An eye for the detail.",
    alt: "A stainless steel dental mirror and probe on a pristine white instrument tray",
  },
];
let activeView = 0;
const gallery = $("#gallery-dialog");
let galleryOverflow = "";
function setView(index) {
  activeView = (index + views.length) % views.length;
  const view = views[activeView];
  const heroImage = $("#hero-image");
  heroImage.src = view.src;
  heroImage.srcset = `${view.small} 800w, ${view.src} 1600w`;
  heroImage.alt = view.alt;
  $("#hero-caption").textContent = view.caption;
  document
    .querySelectorAll("[data-view]")
    .forEach(b =>
      b.setAttribute(
        "aria-pressed",
        String(Number(b.dataset.view) === activeView)
      )
    );
  $("#gallery-image").src = view.src;
  $("#gallery-image").alt = view.alt;
  $("#gallery-title").textContent = view.title;
  $("#gallery-description").textContent = view.caption;
  if (!reduced.matches) {
    heroImage.animate(
      [
        { opacity: 0.35, transform: "scale(1.045)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 550, easing: "cubic-bezier(.2,.8,.2,1)" }
    );
    if (gallery.open)
      $("#gallery-image").animate(
        [
          { opacity: 0.2, transform: "translateX(18px)" },
          { opacity: 1, transform: "translateX(0)" },
        ],
        { duration: 300 }
      );
  }
}
document
  .querySelectorAll("[data-view]")
  .forEach(b =>
    b.addEventListener("click", () => setView(Number(b.dataset.view)))
  );
$("#open-gallery").addEventListener("click", () => {
  galleryOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  gallery.showModal();
  setView(activeView);
});
$("#close-gallery").addEventListener("click", () => gallery.close());
gallery.addEventListener("close", () => {
  document.body.style.overflow = galleryOverflow;
  $("#open-gallery").focus({ preventScroll: true });
});
$("#gallery-prev").addEventListener("click", () => setView(activeView - 1));
$("#gallery-next").addEventListener("click", () => setView(activeView + 1));
gallery.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    setView(activeView + (e.key === "ArrowRight" ? 1 : -1));
  }
});
let touchStart = null;
const swipe = $("#gallery-swipe");
swipe.addEventListener("pointerdown", e => {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  touchStart = { x: e.clientX, y: e.clientY };
  swipe.setPointerCapture(e.pointerId);
});
swipe.addEventListener("pointerup", e => {
  if (!touchStart) return;
  const dx = e.clientX - touchStart.x,
    dy = e.clientY - touchStart.y;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy))
    setView(activeView + (dx < 0 ? 1 : -1));
  touchStart = null;
});
swipe.addEventListener("pointercancel", () => {
  touchStart = null;
});
