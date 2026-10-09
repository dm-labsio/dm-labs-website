const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const root = "/previews/away/assets/";
const widths = {
  0: 1536,
  1: 1536,
  2: 1122,
  3: 1122,
  4: 1536,
  5: 900,
  6: 941,
  7: 1536,
  8: 1122,
  9: 1536,
  11: 1600,
  15: 1536,
  17: 1254,
  18: 1536,
  21: 1600,
  24: 1536,
  27: 1536,
  30: 900,
  31: 1122,
  32: 1254,
  34: 1600,
  36: 1600,
  37: 1600,
  41: 1600,
  42: 941,
};
const photo = n => `${root}photo-${n}-1600.webp`;
const requests = new WeakMap();
async function swap(img, n, alt) {
  const token = {};
  requests.set(img, token);
  const preload = new Image();
  preload.src = photo(n);
  await preload.decode().catch(() => {});
  if (requests.get(img) !== token) return;
  img.srcset = `${root}photo-${n}-640.webp 640w, ${photo(n)} ${widths[n]}w`;
  img.src = photo(n);
  img.alt = alt;
  if (!reduced.matches)
    img.animate([{ opacity: 0.55 }, { opacity: 1 }], {
      duration: 500,
      easing: "ease-out",
    });
}
function pressed(selector, button) {
  $$(selector).forEach(b =>
    b.setAttribute("aria-pressed", String(b === button))
  );
}
// In-page navigation deliberately leaves the demo's parent history untouched.
const toggle = $(".menu-toggle"),
  nav = $("#site-nav");
function menu(open) {
  document.body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  nav.inert = !open;
}
toggle.addEventListener("click", () => {
  const open = nav.inert;
  menu(open);
  if (open) nav.querySelector("a").focus();
});
document.addEventListener("keydown", e => {
  if (nav.inert) return;
  if (e.key === "Escape") {
    menu(false);
    toggle.focus();
  }
  if (e.key === "Tab") {
    const items = [toggle, ...nav.querySelectorAll("a"), $(".header-stay")];
    const index = items.indexOf(document.activeElement);
    e.preventDefault();
    items[
      (index + (e.shiftKey ? -1 : 1) + items.length) % items.length
    ].focus();
  }
});
$$('a[href^="#"]').forEach(a =>
  a.addEventListener("click", e => {
    const target = $(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    menu(false);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: reduced.matches ? "instant" : "smooth",
      block: "start",
    });
  })
);
const scenes = [
  [41, 42, "Canvas suites glowing beside the river at blue hour"],
  [4, 4, "A timber deck and canvas suite beside the river"],
  [37, 37, "The retreat beneath a quiet blanket of snow"],
];
let heroVersion = 0,
  heroAnimation;
async function hero(index, event, automatic = false) {
  if (!automatic) stopHeroLoop();
  pressed("[data-hero]", $(`[data-hero="${index}"]`));
  const version = ++heroVersion;
  const [desktop, mobile, alt] = scenes[index];
  const reveal = $("#hero-reveal"),
    base = $("#hero-base");
  heroAnimation?.cancel();
  reveal.style.clipPath = "circle(0% at 50% 50%)";
  reveal.querySelector("source").srcset = photo(mobile);
  reveal.querySelector("img").src = photo(desktop);
  await reveal
    .querySelector("img")
    .decode()
    .catch(() => {});
  if (version !== heroVersion) return;
  const bounds = $(".hero").getBoundingClientRect();
  const x = event?.clientX
    ? ((event.clientX - bounds.left) / bounds.width) * 100
    : 50;
  const y = event?.clientY
    ? ((event.clientY - bounds.top) / bounds.height) * 100
    : 65;
  if (!reduced.matches) {
    heroAnimation = reveal.animate(
      [
        { clipPath: `circle(0% at ${x}% ${y}%)` },
        { clipPath: `circle(150% at ${x}% ${y}%)` },
      ],
      { duration: 1200, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
    );
    await heroAnimation.finished.catch(() => {});
  }
  if (version !== heroVersion) return;
  base.querySelector("source").srcset = photo(mobile);
  base.querySelector("img").src = photo(desktop);
  base.querySelector("img").alt = alt;
  await base
    .querySelector("img")
    .decode()
    .catch(() => {});
  if (version === heroVersion) {
    heroAnimation?.cancel();
    reveal.style.clipPath = "circle(0% at 50% 50%)";
  }
}
$$("[data-hero]").forEach(b =>
  b.addEventListener("click", e => hero(Number(b.dataset.hero), e))
);
const suites = {
  canvas: {
    name: "Canvas Suite",
    kicker: "A quiet clearing",
    description:
      "Canvas overhead. Timber underfoot. Open the doors to your own deck and let the woods set the pace.",
    details: [
      "A king bed & soft woven linen",
      "Your own furnished deck",
      "An en-suite walk-in shower",
    ],
    photos: [0, 1, 3],
    captions: [
      "Your private deck among the pines",
      "Soft linen, warm timber, and canvas overhead",
      "A beautifully simple en-suite bathroom",
    ],
  },
  river: {
    name: "River Suite",
    kicker: "Closer to the water",
    description:
      "A front-row seat to the river. Step onto the deck, slip into the hot tub, and stay until the light changes.",
    details: [
      "A king bed facing the landscape",
      "A riverside deck with a hot tub",
      "An en-suite bathroom",
    ],
    photos: [4, 5, 6],
    captions: [
      "Canvas and timber beside the river",
      "A restful bedroom opening to the trees",
      "A private soak with the river in view",
    ],
  },
  bath: {
    name: "Bath Suite",
    kicker: "A longer soak",
    description:
      "A deep bath, a view of the woods, and absolutely no hurry. Light moves gently through the canvas as the day unfolds.",
    details: [
      "A king bed & woven textiles",
      "A freestanding bath beside the woods",
      "A private timber deck",
    ],
    photos: [9, 7, 8],
    captions: [
      "A tucked-away suite in the trees",
      "A generous bedroom with a freestanding bath",
      "A long soak beside the woodland",
    ],
  },
};
let selectedSuite = "canvas",
  selectedView = 0;
function suiteView(index) {
  selectedView = index;
  const s = suites[selectedSuite];
  swap($(".suite-expand img"), s.photos[index], s.captions[index]);
  pressed("[data-suite-view]", $(`[data-suite-view="${index}"]`));
}
function selectSuite(key) {
  selectedSuite = key;
  const s = suites[key];
  $$("[data-suite]").forEach(b => {
    const active = b.dataset.suite === key;
    b.setAttribute("aria-selected", String(active));
    b.tabIndex = active ? 0 : -1;
  });
  $("#suite-panel").setAttribute("aria-labelledby", `tab-${key}`);
  $("#suite-kicker").textContent = s.kicker;
  $("#suite-name").textContent = s.name;
  $("#suite-description").textContent = s.description;
  $("#suite-details").replaceChildren(
    ...s.details.map(t => {
      const li = document.createElement("li");
      li.textContent = t;
      return li;
    })
  );
  $(".suite-expand").setAttribute("aria-label", `Open ${s.name} gallery`);
  suiteView(0);
}
$$("[data-suite]").forEach((b, index) => {
  b.addEventListener("click", () => selectSuite(b.dataset.suite));
  b.addEventListener("keydown", e => {
    const tabs = $$("[data-suite]");
    let next;
    if (e.key === "ArrowRight") next = (index + 1) % 3;
    if (e.key === "ArrowLeft") next = (index + 2) % 3;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 2;
    if (next !== undefined) {
      e.preventDefault();
      tabs[next].focus();
      selectSuite(tabs[next].dataset.suite);
    }
  });
});
$$("[data-suite-view]").forEach(b =>
  b.addEventListener("click", () => suiteView(Number(b.dataset.suiteView)))
);
const focusBack = new WeakMap();
function openDialog(dialog) {
  menu(false);
  focusBack.set(dialog, document.activeElement);
  dialog.showModal();
}
$$("[data-close]").forEach(b =>
  b.addEventListener("click", () => b.closest("dialog").close())
);
$$("dialog").forEach(d => {
  d.addEventListener("close", () =>
    focusBack.get(d)?.focus({ preventScroll: true })
  );
  d.addEventListener("click", e => {
    if (e.target !== d) return;
    const r = d.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      d.close();
  });
});
let galleryIndex = 0;
function showGallery(index) {
  galleryIndex = (index + 3) % 3;
  const s = suites[selectedSuite];
  $("#gallery-title").textContent = s.name;
  $("#gallery-caption").textContent = s.captions[galleryIndex];
  swap($("#gallery-photo"), s.photos[galleryIndex], s.captions[galleryIndex]);
}
$(".suite-expand").addEventListener("click", () => {
  showGallery(selectedView);
  openDialog($("#gallery"));
});
$$("[data-gallery-step]").forEach(b =>
  b.addEventListener("click", () =>
    showGallery(galleryIndex + Number(b.dataset.galleryStep))
  )
);
$("#gallery").addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    showGallery(galleryIndex + (e.key === "ArrowRight" ? 1 : -1));
  }
});
let touchStart;
$("#gallery-photo").addEventListener(
  "touchstart",
  e => {
    touchStart = e.changedTouches[0].clientX;
  },
  { passive: true }
);
$("#gallery-photo").addEventListener(
  "touchend",
  e => {
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 50) showGallery(galleryIndex + (dx < 0 ? 1 : -1));
  },
  { passive: true }
);
const seasons = {
  summer: [34, "Long days, open doors."],
  autumn: [36, "Copper leaves. Crisp mornings."],
  winter: [37, "Warm canvas. Quiet snow."],
};
$$("[data-season]").forEach(b =>
  b.addEventListener("click", () => {
    const [n, caption] = seasons[b.dataset.season];
    pressed("[data-season]", b);
    swap(
      $(".camp-map > img"),
      n,
      `The riverside retreat in ${b.dataset.season}`
    );
    $("#season-caption").textContent = caption;
  })
);
const places = {
  suites: [
    0,
    "Your own quiet corner",
    "The suites",
    "Tucked into the trees, with a private deck that opens to the landscape.",
    "#suites",
    "Explore the suites",
  ],
  lodge: [
    15,
    "Come on in",
    "The lodge",
    "A place to gather over breakfast, find a favourite chair, or settle in for dinner.",
    "#table",
    "At our table",
  ],
  water: [
    24,
    "A fresh start",
    "Pool & sauna",
    "A dip in the pool, warmth in the sauna, and the scent of timber all around.",
    "#days",
    "Find your pace",
  ],
  river: [
    27,
    "Follow the water",
    "River walk",
    "An easy invitation to wander. Follow the wooded path and find a spot to pause.",
    "#days",
    "Your days here",
  ],
};
$$("[data-place]").forEach(b =>
  b.addEventListener("click", () => {
    pressed("[data-place]", b);
    const [n, kicker, title, copy, href, label] = places[b.dataset.place];
    swap($(".place-panel img"), n, title);
    $("#place-kicker").textContent = kicker;
    $("#place-title").textContent = title;
    $("#place-copy").textContent = copy;
    $("#place-link").href = href;
    $("#place-link").textContent = label;
  })
);
const days = {
  breakfast: [17, "Breakfast, with nowhere to be."],
  water: [21, "A dip, a stretch, a little more time."],
  woods: [27, "Let the river lead the way."],
  evening: [18, "One more story. One more glass."],
};
$$("[data-day]").forEach(b =>
  b.addEventListener("click", () => {
    pressed("[data-day]", b);
    const [n, caption] = days[b.dataset.day];
    swap($("#day-photo img"), n, caption);
    $("#day-caption").textContent = caption;
  })
);
const menus = {
  breakfast: [
    ["A slow start", "Thick yoghurt, seasonal fruit, honey, and toasted oats"],
    ["From the pan", "Soft eggs, sourdough, and roasted tomatoes"],
    ["Something warm", "Fresh pastry, cultured butter, and preserves"],
  ],
  dinner: [
    ["To begin", "Seasonal vegetables, herbs, and warm flatbread"],
    ["From the grill", "Wood-fired fish, lemon, and greens"],
    ["A sweet finish", "Baked seasonal fruit and vanilla cream"],
  ],
  drinks: [
    ["First light", "Freshly brewed coffee and loose-leaf tea"],
    ["Something bright", "Citrus, garden herbs, and sparkling water"],
    ["After dark", "A glass of wine or a fireside nightcap"],
  ],
};
function setMenu(key) {
  $("#menu-items").replaceChildren(
    ...menus[key].map(([name, copy]) => {
      const div = document.createElement("div");
      div.className = "menu-item";
      const h = document.createElement("h3");
      h.textContent = name;
      const p = document.createElement("p");
      p.textContent = copy;
      div.append(h, p);
      return div;
    })
  );
}
$$("[data-menu]").forEach(b =>
  b.addEventListener("click", () => {
    setMenu("breakfast");
    pressed("[data-menu-type]", $('[data-menu-type="breakfast"]'));
    openDialog($("#menu-dialog"));
  })
);
$$("[data-menu-type]").forEach(b =>
  b.addEventListener("click", () => {
    setMenu(b.dataset.menuType);
    pressed("[data-menu-type]", b);
  })
);
const arrival = $("#arrival"),
  departure = $("#departure"),
  form = $("#stay-form");
const localDate = d =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const nextDate = value => {
  const d = new Date(`${value}T12:00:00`);
  d.setDate(d.getDate() + 1);
  return localDate(d);
};
arrival.min = localDate(new Date());
departure.min = nextDate(arrival.min);
arrival.addEventListener("change", () => {
  departure.min = nextDate(arrival.value || arrival.min);
  $("#date-error").textContent = "";
  if (departure.value && departure.value <= arrival.value) departure.value = "";
});
let guests = 2;
function guest(delta) {
  guests = Math.min(2, Math.max(1, guests + delta));
  $("#guest-count").value = String(guests);
  $("#guest-minus").disabled = guests === 1;
  $("#guest-plus").disabled = guests === 2;
}
$("#guest-minus").addEventListener("click", () => guest(-1));
$("#guest-plus").addEventListener("click", () => guest(1));
function plannerPhoto(key) {
  swap($(".planner-photo img"), suites[key].photos[0], suites[key].name);
}
$$("[data-plan]").forEach(b =>
  b.addEventListener("click", () => {
    form.hidden = false;
    $("#stay-summary").hidden = true;
    form.elements.suite.value = selectedSuite;
    plannerPhoto(selectedSuite);
    openDialog($("#stay-dialog"));
  })
);
$$('input[name="suite"]').forEach(r =>
  r.addEventListener("change", () => plannerPhoto(r.value))
);
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  if (arrival.value < arrival.min || departure.value <= arrival.value) {
    $("#date-error").textContent =
      "Please choose a future arrival and a later departure.";
    return;
  }
  const start = new Date(`${arrival.value}T12:00:00`),
    end = new Date(`${departure.value}T12:00:00`);
  const nights = Math.round(
    (Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) /
      86400000
  );
  const format = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  $("#summary-suite").textContent = suites[form.elements.suite.value].name;
  $("#summary-dates").textContent =
    `${format.format(start)} to ${format.format(end)} · ${nights} ${nights === 1 ? "night" : "nights"} · ${guests} ${guests === 1 ? "guest" : "guests"}`;
  form.hidden = true;
  $("#stay-summary").hidden = false;
  $("#summary-suite").tabIndex = -1;
  $("#summary-suite").focus();
});
$("#edit-stay").addEventListener("click", () => {
  form.hidden = false;
  $("#stay-summary").hidden = true;
  arrival.focus();
});
if (!reduced.matches) {
  document.body.classList.add("motion-ready");
  const observer = new IntersectionObserver(
    entries =>
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.1 }
  );
  $$(".reveal").forEach(el => observer.observe(el));
}

// The illustrated objects reveal the real textures and spaces behind each detail.
const comforts = {
  linen: [
    "applications-5.webp",
    "Soft landings",
    "Made for a slower morning.",
    "Woven blankets, soft towels, and the little details that make a place feel like yours.",
    "AWAY's woven blanket with its wine and pale-blue motif",
    "contain",
  ],
  chair: [
    "photo-1-1600.webp",
    "Your favourite seat",
    "Stay for another chapter.",
    "A proper chair, a soft throw, and the view just beyond the canvas. Nothing else on the list.",
    "The furnished Canvas Suite with warm timber and woven textiles",
    "cover",
  ],
  bed: [
    "photo-7-1600.webp",
    "A deeper sleep",
    "Outside all day. Completely at rest.",
    "Soft linen, a generous bed, and a quiet space that opens to the trees.",
    "A king bed and freestanding bath inside the Bath Suite",
    "cover",
  ],
  ritual: [
    "applications-6.webp",
    "Everyday rituals",
    "A little care, everywhere.",
    "Considered ceramics, fresh towels, and a place for the simplest daily rituals.",
    "AWAY's pale-blue and cream bathroom amenities",
    "contain",
  ],
  woods: [
    "photo-27-1600.webp",
    "Always outside",
    "The river is your neighbour.",
    "Step out, follow the water, and find the part of the day you want to keep for yourself.",
    "The river path through the pines",
    "cover",
  ],
  bath: [
    "photo-8-1600.webp",
    "A longer soak",
    "Draw a bath. Let the day wait.",
    "A deep freestanding bath beside the woods. The Bath Suite's most inviting corner.",
    "The Bath Suite's freestanding bath overlooking woodland",
    "contain",
  ],
};
let comfortVersion = 0;
$$("[data-comfort]").forEach(button =>
  button.addEventListener("click", async () => {
    const version = ++comfortVersion;
    const [file, label, title, description, alt, fit] =
      comforts[button.dataset.comfort];
    pressed("[data-comfort]", button);
    const image = $("#comfort-image"),
      preload = new Image();
    preload.src = root + file;
    await preload.decode().catch(() => {});
    if (version !== comfortVersion) return;
    image.src = preload.src;
    image.alt = alt;
    image.style.objectFit = fit;
    $("#comfort-label").textContent = label;
    $("#comfort-title").textContent = title;
    $("#comfort-description").textContent = description;
    if (!reduced.matches) {
      image.animate(
        [
          { opacity: 0.35, transform: "scale(1.045)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 700, easing: "cubic-bezier(.22,1,.36,1)" }
      );
      $(".comfort-feature figcaption").animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 500 }
      );
    }
  })
);
$("#comfort-image").style.objectFit = "contain";
const comfortObserver = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        comfortObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.15 }
);
comfortObserver.observe($(".comforts"));
// Native scrolling stays intact. Pointer depth is an enhancement, never required.
const heroStage = $(".hero"),
  finePointer = matchMedia("(hover:hover) and (pointer:fine)");
let pointerX = 0,
  pointerY = 0,
  depthFrame = 0;
function drawDepth() {
  depthFrame = 0;
  const rect = heroStage.getBoundingClientRect();
  const visible = rect.bottom > 0 && rect.top < innerHeight;
  heroStage.style.setProperty(
    "--look-x",
    reduced.matches ? "0px" : `${pointerX}px`
  );
  heroStage.style.setProperty(
    "--look-y",
    reduced.matches ? "0px" : `${pointerY}px`
  );
  heroStage.style.setProperty(
    "--scene-scroll",
    reduced.matches || !visible
      ? "0px"
      : `${Math.min(95, Math.max(0, -rect.top * 0.14))}px`
  );
}
function depth() {
  if (!depthFrame) depthFrame = requestAnimationFrame(drawDepth);
}
heroStage.addEventListener("pointermove", event => {
  if (reduced.matches || !finePointer.matches || event.pointerType === "touch")
    return;
  const rect = heroStage.getBoundingClientRect();
  pointerX = (event.clientX / rect.width - 0.5) * -20;
  pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
  depth();
});
heroStage.addEventListener("pointerleave", () => {
  pointerX = pointerY = 0;
  depth();
});
window.addEventListener("scroll", depth, { passive: true });
reduced.addEventListener("change", () => {
  pointerX = pointerY = 0;
  depth();
});
let heroTouch;
heroStage.addEventListener(
  "touchstart",
  event => {
    if (event.target.closest("button,a")) return;
    heroTouch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  },
  { passive: true }
);
heroStage.addEventListener(
  "touchend",
  event => {
    if (!heroTouch) return;
    const dx = event.changedTouches[0].clientX - heroTouch.x,
      dy = event.changedTouches[0].clientY - heroTouch.y;
    heroTouch = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const current = Number(
        $('[data-hero][aria-pressed="true"]').dataset.hero
      );
      hero((current + (dx < 0 ? 1 : 2)) % 3);
    }
  },
  { passive: true }
);

// A photographic sequence, with user selection taking priority permanently.
let heroLoopTimer,
  heroLoopStopped = false,
  heroInView = true;
function stopHeroLoop() {
  heroLoopStopped = true;
  clearTimeout(heroLoopTimer);
}
function scheduleHeroLoop() {
  clearTimeout(heroLoopTimer);
  if (heroLoopStopped || reduced.matches || document.hidden || !heroInView)
    return;
  heroLoopTimer = setTimeout(async () => {
    if (
      document.querySelector("dialog[open]") ||
      document.body.classList.contains("menu-open") ||
      heroStage.contains(document.activeElement)
    ) {
      scheduleHeroLoop();
      return;
    }
    const current = Number($('[data-hero][aria-pressed="true"]').dataset.hero);
    await hero((current + 1) % scenes.length, undefined, true);
    scheduleHeroLoop();
  }, 8500);
}
const heroObserver = new IntersectionObserver(
  ([entry]) => {
    heroInView = entry.isIntersecting;
    scheduleHeroLoop();
  },
  { threshold: 0.5 }
);
heroObserver.observe(heroStage);
document.addEventListener("visibilitychange", scheduleHeroLoop);
reduced.addEventListener("change", scheduleHeroLoop);
heroStage.addEventListener("focusin", stopHeroLoop);
scheduleHeroLoop();
