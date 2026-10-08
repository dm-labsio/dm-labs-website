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
    const preferences = visitPreferences();
    $("#request-preferences").hidden = !preferences.length;
    $("#request-preferences").textContent =
      "Your visit notes: " + preferences.join(" · ");
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
  if (visitPreferences().length)
    rows.push(["Visit preferences", visitPreferences().join(" · ")]);
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

// Visit preferences remain in this page's memory only, and feed every request CTA.
function visitPreferences() {
  return [
    ...document.querySelectorAll('[name="visit-preference"]:checked'),
  ].map(input => input.value);
}
document.querySelectorAll('[name="visit-preference"]').forEach(input =>
  input.addEventListener("change", () => {
    const selected = visitPreferences();
    $("#visit-notes").textContent = selected.length
      ? selected.join(" · ")
      : "Select any preferences above. We’ll include them in your demo request.";
  })
);

// Original Compare-style reveal: native range controls preserve touch scrolling and keyboard access.
const anatomyRange = $("#anatomy-range");
const diagram = $("#tooth-diagram");
function revealAnatomy() {
  $("#anatomy-reveal-rect").setAttribute(
    "width",
    Number(anatomyRange.value) * 5
  );
  diagram.style.setProperty("--reveal", `${anatomyRange.value}%`);
}
anatomyRange.addEventListener("input", revealAnatomy);
const layers = {
  enamel: [
    "The outer protection",
    "Enamel.",
    "The hard outer covering of the crown protects the dentin underneath. Enamel has no living cells and cannot regrow.",
    35,
  ],
  dentin: [
    "Under the surface",
    "Dentin.",
    "Beneath enamel and cementum lies dentin. Its tiny tubules can transmit sensations to the inside of the tooth when the protective covering is lost.",
    70,
  ],
  pulp: [
    "The living centre",
    "Pulp.",
    "Soft tissue at the centre contains nerves, blood vessels and connective tissue. It extends from the pulp chamber into the root canals.",
    100,
  ],
};
const layerTabs = [...document.querySelectorAll("[data-layer]")];
function selectLayer(tab) {
  const [kicker, title, description, reveal] = layers[tab.dataset.layer];
  layerTabs.forEach(t => {
    t.setAttribute("aria-selected", String(t === tab));
    t.tabIndex = t === tab ? 0 : -1;
  });
  $("#layer-panel").setAttribute("aria-labelledby", tab.id);
  $("#layer-kicker").textContent = kicker;
  $("#layer-title").textContent = title;
  $("#layer-description").textContent = description;
  anatomyRange.value = reveal;
  diagram.dataset.layer = tab.dataset.layer;
  revealAnatomy();
  if (!reduced.matches)
    $("#layer-panel").animate(
      [
        { opacity: 0.2, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 300, easing: "ease-out" }
    );
}
layerTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectLayer(tab));
  tab.addEventListener("keydown", e => {
    let next;
    if (e.key === "ArrowRight") next = (index + 1) % layerTabs.length;
    else if (e.key === "ArrowLeft")
      next = (index + layerTabs.length - 1) % layerTabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = layerTabs.length - 1;
    else return;
    e.preventDefault();
    layerTabs[next].focus();
    selectLayer(layerTabs[next]);
  });
});

// Logo Particles pattern reinterpreted as a tactile dental sculpture, without a WebGL dependency.
const art = $("#scan-art"),
  sculptureImage = $("#tooth-render"),
  canvas = $("#tooth-particles");
const ctx = canvas.getContext("2d"),
  scanRange = $("#scan-range");
let points = [],
  size = { width: 0, height: 0 },
  scanValue = 0,
  frame = 0,
  visible = true;
let pointer = null,
  settleUntil = 0;
function paintParticles(now = performance.now()) {
  frame = 0;
  if (!ctx || !points.length) return;
  ctx.clearRect(0, 0, size.width, size.height);
  const fit = Math.min(size.width, size.height) / 240;
  const ox = (size.width - 240 * fit) / 2,
    oy = (size.height - 240 * fit) / 2;
  let unsettled = false;
  for (const p of points) {
    const bx = p.x * fit + ox,
      by = p.y * fit + oy;
    let dx = 0,
      dy = 0;
    if (pointer && !reduced.matches) {
      const vx = bx - pointer.x,
        vy = by - pointer.y,
        distance = Math.hypot(vx, vy);
      if (distance < 80 && distance > 0.1) {
        const force = (1 - distance / 80) * 22;
        dx = (vx / distance) * force;
        dy = (vy / distance) * force;
      }
    }
    p.dx += (dx - p.dx) * 0.14;
    p.dy += (dy - p.dy) * 0.14;
    if (Math.abs(dx - p.dx) + Math.abs(dy - p.dy) > 0.1) unsettled = true;
    ctx.fillStyle = `rgba(19,76,181,${p.alpha})`;
    ctx.beginPath();
    ctx.arc(
      bx + p.dx,
      by + p.dy,
      Math.max(0.6, fit * p.radius),
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  if (
    unsettled &&
    visible &&
    scanValue > 0 &&
    !document.hidden &&
    now < settleUntil &&
    !reduced.matches
  )
    frame = requestAnimationFrame(paintParticles);
}
function scheduleParticles() {
  if (!frame && visible && !document.hidden)
    frame = requestAnimationFrame(paintParticles);
}
function resizeParticles() {
  size = { width: art.clientWidth, height: art.clientHeight };
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(size.width * dpr);
  canvas.height = Math.round(size.height * dpr);
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  scheduleParticles();
}
function prepareParticles() {
  if (!ctx) return;
  const sampling = document.createElement("canvas");
  sampling.width = sampling.height = 240;
  const sample = sampling.getContext("2d", { willReadFrequently: true });
  if (!sample) return;
  sample.drawImage(sculptureImage, 0, 0, 240, 240);
  const pixels = sample.getImageData(0, 0, 240, 240).data;
  points = [];
  for (let y = 0; y < 240; y += 3)
    for (let x = 0; x < 240; x += 3) {
      const i = (y * 240 + x) * 4;
      if (pixels[i + 3] > 60) {
        const shade = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 765;
        points.push({
          x,
          y,
          dx: 0,
          dy: 0,
          alpha: 0.32 + (1 - shade) * 0.66,
          radius: 0.65 + (1 - shade) * 0.7,
        });
      }
    }
  resizeParticles();
  art.dataset.ready = "true";
}
function changeScan() {
  scanValue = Number(scanRange.value) / 100;
  if (!ctx || !points.length) return; // Keep the real image visible if canvas is unavailable.
  art.style.setProperty("--scan", scanValue);
  art.style.setProperty("--scan-position", `${15 + scanValue * 70}%`);
  $("#scan-mode").textContent =
    scanValue < 0.05 ? "Surface" : scanValue > 0.95 ? "Digital" : "In focus";
  scheduleParticles();
}
scanRange.addEventListener("input", changeScan);
if (sculptureImage.complete && sculptureImage.naturalWidth) prepareParticles();
else sculptureImage.addEventListener("load", prepareParticles, { once: true });
new ResizeObserver(resizeParticles).observe(art);
new IntersectionObserver(entries => {
  visible = entries[0].isIntersecting;
  if (visible) scheduleParticles();
  else {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}).observe(art);
art.addEventListener("pointermove", e => {
  if (reduced.matches || e.pointerType === "touch" || scanValue === 0) return;
  const r = art.getBoundingClientRect();
  pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
  settleUntil = performance.now() + 1600;
  scheduleParticles();
});
art.addEventListener("pointerleave", () => {
  pointer = null;
  settleUntil = performance.now() + 1600;
  scheduleParticles();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(frame);
    frame = 0;
  } else scheduleParticles();
});
reduced.addEventListener("change", () => {
  pointer = null;
  points.forEach(p => {
    p.dx = 0;
    p.dy = 0;
  });
  scheduleParticles();
});
// The handle on the illustration is draggable as well as the native range below it.
let revealPointer = null;
function revealAt(e) {
  const r = diagram.getBoundingClientRect();
  anatomyRange.value = Math.round(
    Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))
  );
  revealAnatomy();
}
diagram.addEventListener("pointerdown", e => {
  if (e.button !== 0) return;
  revealPointer = e.pointerId;
  diagram.setPointerCapture(e.pointerId);
  revealAt(e);
});
diagram.addEventListener("pointermove", e => {
  if (e.pointerId === revealPointer) revealAt(e);
});
diagram.addEventListener("pointerup", () => {
  revealPointer = null;
});
diagram.addEventListener("pointercancel", () => {
  revealPointer = null;
});

// One brief scan on arrival introduces the interaction, then settles into the sculpture.
let introFrame = 0,
  introStarted = false,
  introCancelled = false;
function stopIntro() {
  introCancelled = true;
  cancelAnimationFrame(introFrame);
  introFrame = 0;
}
scanRange.addEventListener("pointerdown", stopIntro);
scanRange.addEventListener("keydown", stopIntro);
function introduceScan() {
  if (
    introStarted ||
    introCancelled ||
    reduced.matches ||
    !points.length ||
    !visible ||
    document.hidden
  )
    return;
  introStarted = true;
  const start = performance.now();
  function tick(now) {
    if (reduced.matches || document.hidden || !visible) {
      scanRange.value = 0;
      changeScan();
      stopIntro();
      return;
    }
    const progress = Math.min(1, (now - start) / 2400);
    scanRange.value = Math.round(Math.sin(Math.PI * progress) * 100);
    changeScan();
    if (progress < 1) introFrame = requestAnimationFrame(tick);
    else introFrame = 0;
  }
  introFrame = requestAnimationFrame(tick);
}
if (sculptureImage.complete && sculptureImage.naturalWidth) introduceScan();
else sculptureImage.addEventListener("load", introduceScan, { once: true });
