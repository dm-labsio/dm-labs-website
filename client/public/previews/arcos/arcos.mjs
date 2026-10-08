const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const media = "/media/examples/arcos/";
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const fine = matchMedia("(hover: hover) and (pointer: fine)");
const images = {
  courtyard: {
    title: "The Courtyard House",
    caption:
      "Three wings around an olive tree. Attica, Greece. Fictional design concept.",
    alt: "Pale limestone wings frame an olive-tree courtyard on a hillside",
  },
  interior: {
    title: "Living with the landscape",
    caption:
      "Limewashed walls and a deep opening frame the courtyard. Concept visualisation.",
    alt: "A quiet living space with a linen sofa and oak table overlooking the courtyard",
  },
  detail: {
    title: "Where materials meet",
    caption:
      "Limestone, limewash and oak at the threshold. Concept visualisation.",
    alt: "Close-up of rough limestone, chalk plaster, bronze track and an oak shutter",
  },
};
const spaces = {
  courtyard: {
    label: "The heart of the house",
    title: "Life around a tree.",
    description:
      "The courtyard brings daylight and a view of the olive tree into the surrounding spaces. A sheltered place for a morning coffee or a long evening.",
    image: "courtyard",
    idea: "An open courtyard",
  },
  living: {
    label: "The living wing",
    title: "A view, kept close.",
    description:
      "A deep opening makes the courtyard part of daily life. A low seat, a simple table and an unbroken view let the landscape do the work.",
    image: "interior",
    idea: "A connection to the landscape",
  },
  threshold: {
    label: "Between inside and out",
    title: "Depth in the detail.",
    description:
      "The thick stone edge meets soft plaster and an oak shutter. Materials change at the opening, giving even the smallest passage its own character.",
    image: "detail",
    idea: "Deep, sheltered openings",
  },
};
const materials = {
  stone: {
    name: "Limestone",
    title: "A wall with weight.",
    description:
      "Rough-cut limestone gives the outer walls depth. The uneven surface holds shadow instead of hiding it.",
    x: 0.25,
    y: 0.29,
  },
  lime: {
    name: "Limewash",
    title: "Light, softened.",
    description:
      "A quiet, chalky finish lets daylight travel across the inner walls. Small variations in the surface keep it from feeling flat.",
    x: 0.53,
    y: 0.67,
  },
  oak: {
    name: "Oak",
    title: "Warmth within reach.",
    description:
      "Oak brings a warmer texture to the parts you touch. Its grain continues through the sliding shutters and interior joinery.",
    x: 0.84,
    y: 0.46,
  },
};
const ideas = new Map();
let selectedSpace = "courtyard",
  selectedMaterial = "stone",
  briefMade = false;
const menu = $("#menu-toggle"),
  nav = $("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  menu.textContent = "Menu";
  nav.classList.remove("open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Close" : "Menu";
  nav.classList.toggle("open", open);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
function goTo(el) {
  closeMenu();
  el.focus({ preventScroll: true });
  el.scrollIntoView({
    behavior: reduced.matches ? "instant" : "smooth",
    block: "start",
  });
}
document.addEventListener("click", e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const dest = document.getElementById(link.getAttribute("href").slice(1));
  if (dest) {
    e.preventDefault();
    goTo(dest);
  }
});
matchMedia("(max-width:700px)").addEventListener("change", closeMenu);

// Photo viewer: native focus trapping, explicit controls, keyboard and touch gestures.
const dialog = $("#image-dialog");
let opener = null,
  imageIndex = 0,
  touchStart = null;
const imageKeys = Object.keys(images);
function showImage(key) {
  imageIndex = imageKeys.indexOf(key);
  const im = images[key];
  $("#lightbox-title").textContent = im.title;
  $("#lightbox-caption").textContent = im.caption;
  $("#lightbox-image").src = media + key + "-1536.webp";
  $("#lightbox-image").alt = im.alt;
}
function advance(n) {
  showImage(imageKeys[(imageIndex + n + imageKeys.length) % imageKeys.length]);
}
$$(".image-open").forEach(button =>
  button.addEventListener("click", () => {
    opener = button;
    showImage(button.dataset.image);
    dialog.showModal();
    document.body.style.overflow = "hidden";
  })
);
$("#close-image").addEventListener("click", () => dialog.close());
$("#next-image").addEventListener("click", () => advance(1));
$("#previous-image").addEventListener("click", () => advance(-1));
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  opener?.focus({ preventScroll: true });
});
dialog.addEventListener("click", e => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    advance(1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    advance(-1);
  }
});
$("#lightbox-image").addEventListener(
  "touchstart",
  e => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  },
  { passive: true }
);
$("#lightbox-image").addEventListener(
  "touchend",
  e => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x,
      dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
      advance(dx < 0 ? 1 : -1);
    touchStart = null;
  },
  { passive: true }
);

function selectSpace(key) {
  selectedSpace = key;
  const data = spaces[key];
  $$("[data-space]").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.space === key))
  );
  $$("[data-zone]").forEach(p =>
    p.classList.toggle("active", p.dataset.zone === key)
  );
  $("#space-label").textContent = data.label;
  $("#space-title").textContent = data.title;
  $("#space-description").textContent = data.description;
  const img = $("#space-image"),
    button = $(".space-image");
  img.src = media + data.image + "-768.webp";
  img.alt = images[data.image].alt;
  button.dataset.image = data.image;
  button.setAttribute(
    "aria-label",
    "Open " + images[data.image].title + " photograph"
  );
  button.classList.remove("changing");
  void button.offsetWidth;
  button.classList.add("changing");
  $("[data-save-space]").dataset.saveSpace = key;
  $(".save-status").textContent = "";
  syncSaveLabels();
}
$$("[data-space]").forEach(b =>
  b.addEventListener("click", () => selectSpace(b.dataset.space))
);
selectSpace("courtyard");

// Original lightweight lens implementation, inspired by Aceternity Lens on 21st.dev.
// It keeps the zoomed image aligned with the source and adds explicit touch controls.
const surface = $("#lens-surface"),
  lens = $(".lens");
let lensZoom = 2;
function setLensZoom(zoom) {
  lensZoom = zoom;
  surface.classList.toggle("magnified", zoom > 2);
  surface.setAttribute("aria-pressed", String(zoom > 2));
  surface.setAttribute(
    "aria-label",
    zoom > 2
      ? "Return to standard material magnification"
      : "Enlarge material detail"
  );
}
function positionLens(x, y) {
  const { width: w, height: h } = surface.getBoundingClientRect();
  if (!w || !h) return;
  const radius = lens.offsetWidth / 2;
  const px = Math.max(radius, Math.min(w - radius, x * w)),
    py = Math.max(radius, Math.min(h - radius, y * h));
  lens.style.left = px + "px";
  lens.style.top = py + "px";
  lens.style.backgroundSize = w * lensZoom + "px " + h * lensZoom + "px";
  lens.style.backgroundPosition =
    radius - x * w * lensZoom + "px " + (radius - y * h * lensZoom) + "px";
  lens.classList.add("ready");
}
function resetLens() {
  const m = materials[selectedMaterial];
  positionLens(m.x, m.y);
}
surface.addEventListener("pointermove", e => {
  if (!fine.matches || reduced.matches) return;
  const r = surface.getBoundingClientRect();
  positionLens((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
});
surface.addEventListener("click", e => {
  setLensZoom(lensZoom > 2 ? 2 : 4);
  const r = surface.getBoundingClientRect();
  if (e.detail)
    positionLens(
      (e.clientX - r.left) / r.width,
      (e.clientY - r.top) / r.height
    );
  else resetLens();
});
surface.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    surface.click();
  }
});
surface.addEventListener("pointerleave", resetLens);
new ResizeObserver(resetLens).observe(surface);
reduced.addEventListener("change", resetLens);
fine.addEventListener("change", resetLens);
function selectMaterial(key) {
  setLensZoom(4);
  selectedMaterial = key;
  const data = materials[key];
  $$("[data-material]").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.material === key))
  );
  $("#material-title").textContent = data.title;
  $("#material-description").textContent = data.description;
  $("#material-status").textContent = "";
  syncSaveLabels();
  resetLens();
}
$$("[data-material]").forEach(b =>
  b.addEventListener("click", () => selectMaterial(b.dataset.material))
);
function syncSaveLabels() {
  const s = ideas.has("space-" + selectedSpace),
    m = ideas.has("material-" + selectedMaterial);
  $("[data-save-space]").textContent = s
    ? "Remove this idea from my brief"
    : "Add this idea to my brief";
  $("#save-material").textContent =
    (m ? "Remove " : "Add ") +
    materials[selectedMaterial].name.toLowerCase() +
    (m ? " from my brief" : " to my brief");
}
function renderIdeas() {
  const root = $("#saved-ideas");
  root.replaceChildren();
  if (!ideas.size) {
    const p = document.createElement("p");
    p.className = "empty-ideas";
    p.textContent =
      "Save a place or material as you explore, or start with the choices alongside.";
    root.append(p);
  }
  for (const [key, label] of ideas) {
    const row = document.createElement("div"),
      text = document.createElement("span"),
      button = document.createElement("button");
    row.className = "idea";
    text.textContent = label;
    button.textContent = "Remove";
    button.setAttribute("aria-label", "Remove " + label);
    button.addEventListener("click", () => {
      ideas.delete(key);
      renderIdeas();
      $("#brief-paper-title").focus({ preventScroll: true });
    });
    row.append(text, button);
    root.append(row);
  }
  syncSaveLabels();
  if (briefMade) renderSummary();
}
function toggleIdea(key, label, status) {
  const removing = ideas.has(key);
  removing ? ideas.delete(key) : ideas.set(key, label);
  renderIdeas();
  status.textContent = removing
    ? "Removed from your brief."
    : "Added to your project brief below.";
}
$("[data-save-space]").addEventListener("click", () =>
  toggleIdea(
    "space-" + selectedSpace,
    spaces[selectedSpace].idea,
    $(".save-status")
  )
);
$("#save-material").addEventListener("click", () =>
  toggleIdea(
    "material-" + selectedMaterial,
    materials[selectedMaterial].name,
    $("#material-status")
  )
);
const form = $("#brief-form");
$("#brief-paper-title").tabIndex = -1;
function summaryData() {
  const data = new FormData(form);
  return [
    ["Project", data.get("project")],
    ["Priorities", data.getAll("priority").join(", ") || "To explore together"],
    ["Notes", String(data.get("note")).trim() || "No additional notes"],
  ];
}
function renderSummary() {
  const dl = $("#brief-summary");
  dl.replaceChildren();
  for (const [label, value] of summaryData()) {
    const dt = document.createElement("dt"),
      dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    dl.append(dt, dd);
  }
}
form.addEventListener("submit", e => {
  e.preventDefault();
  briefMade = true;
  renderSummary();
  $("#brief-result").hidden = false;
  $("#brief-paper-title").textContent = "Your project brief.";
  $("#brief-status").textContent = "Ready to keep. Nothing has been sent.";
  goTo($("#brief-paper-title"));
});
form.addEventListener("input", () => {
  if (briefMade) {
    renderSummary();
    $("#brief-status").textContent = "Your brief has been updated.";
  }
});
$("#edit-brief").addEventListener("click", () => {
  const first = form.querySelector("input:checked");
  first.focus({ preventScroll: true });
  form.scrollIntoView({
    block: "start",
    behavior: reduced.matches ? "instant" : "smooth",
  });
});
$("#download-brief").addEventListener("click", () => {
  const lines = [
    "ARCOS / SAMPLE PROJECT BRIEF",
    "Fictional architecture studio showcase. No inquiry has been sent.",
    "",
    ...summaryData().map(([k, v]) => k + ": " + v),
    "",
    "Saved ideas: " + ([...ideas.values()].join(", ") || "None selected"),
  ];
  const url = URL.createObjectURL(
    new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "arcos-project-brief.txt";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  $("#brief-status").textContent = "Your brief is ready to save.";
});
// A single drawing reveal; content never depends on an animation completing.
const observer = new IntersectionObserver(
  entries => {
    for (const e of entries)
      if (e.isIntersecting) {
        e.target.classList.add("draw");
        observer.unobserve(e.target);
      }
  },
  { threshold: 0.2 }
);
observer.observe($(".plan"));
let scheduled = false;
function drawProgress() {
  scheduled = false;
  const total = document.documentElement.scrollHeight - innerHeight;
  $(".reading-line").style.transform =
    "scaleX(" +
    (total > 0 ? Math.max(0, Math.min(1, scrollY / total)) : 0) +
    ")";
}
addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(drawProgress);
    }
  },
  { passive: true }
);
selectMaterial("stone");
document.documentElement.dataset.arcosReady = "true";

// Native dialogs preserve keyboard focus and work in the showcase iframe on iOS.
const planDialog = $("#plan-dialog");
$("#enlarge-plan").addEventListener("click", () => {
  planDialog.showModal();
  document.body.style.overflow = "hidden";
});
$("#close-plan").addEventListener("click", () => planDialog.close());
planDialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  $("#enlarge-plan").focus({ preventScroll: true });
});
const tourDialog = $("#tour-dialog");
let disposeTour = null,
  tourSession = 0,
  tourOpener = $("#open-tour");
async function startTour() {
  const session = ++tourSession;
  tourDialog
    .querySelectorAll("[data-tour-scene],[data-tour-action]")
    .forEach(b => (b.disabled = true));
  $("#tour-loading").hidden = false;
  $("#tour-loading span").textContent = "Opening the view…";
  $("#retry-tour").hidden = true;
  try {
    const { mountTour } = await import("./tour.mjs");
    if (session !== tourSession || !tourDialog.open) return;
    const dispose = await mountTour(
      tourDialog,
      () => session === tourSession && tourDialog.open
    );
    if (session !== tourSession || !tourDialog.open) dispose();
    else disposeTour = dispose;
  } catch {
    if (session !== tourSession || !tourDialog.open) return;
    $("#tour-loading span").textContent =
      "The 3D view could not open. Try again, or close the tour to explore the photographs.";
    $("#retry-tour").hidden = false;
  }
}
$$("#open-tour,[data-open-tour]").forEach(button => {
  button.addEventListener("click", () => {
    tourOpener = button;
    tourDialog.showModal();
    document.body.style.overflow = "hidden";
    startTour();
  });
  const prepare = () =>
    import("./tour.mjs").then(module => module.prepareTour()).catch(() => {});
  button.addEventListener("pointerenter", prepare, { once: true });
  button.addEventListener("focus", prepare, { once: true });
});
$("#close-tour").addEventListener("click", () => tourDialog.close());
tourDialog.addEventListener("close", () => {
  tourSession++;
  disposeTour?.();
  disposeTour = null;
  document.body.style.overflow = "";
  tourOpener.focus({ preventScroll: true });
});

$("#toggle-tour-map").addEventListener("click", () => {
  const map = $("#tour-map");
  map.hidden = !map.hidden;
  $("#toggle-tour-map").setAttribute("aria-expanded", String(!map.hidden));
});
$("#retry-tour").addEventListener("click", () => {
  disposeTour?.();
  disposeTour = null;
  startTour();
});
