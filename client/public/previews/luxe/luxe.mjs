const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
export const homes = [
  {
    id: "horizon",
    name: "The Horizon House",
    area: "Vouliagmeni",
    setting: "coast",
    settingName: "Coastal living",
    price: 2450000,
    beds: 4,
    baths: 3,
    size: 285,
    asset: "coast",
    type: "house",
    tags: ["sea-view", "pool", "garden", "terrace"],
    description:
      "A broad white canopy, open horizons and a terrace that draws everyday life outside. The living spaces open towards the sea; quieter bedrooms sit behind the shaded upper façade.",
    highlights: [
      "A generous sea-facing terrace",
      "Open-plan living and dining",
      "Private garden and pool",
    ],
    captions: [
      "The cantilevered façade and pool terrace.",
      "The living space, looking towards the terrace.",
    ],
  },
  {
    id: "atelier",
    name: "The City Atelier",
    area: "Mets, Athens",
    setting: "city",
    settingName: "City living",
    price: 890000,
    beds: 2,
    baths: 2,
    size: 148,
    asset: "city",
    type: "penthouse",
    tags: ["rooftop", "office", "terrace", "city-view"],
    description:
      "An urban retreat above the rooftops. A broad terrace extends the living room, while terrazzo, deep burgundy and warm timber bring a personal, collected character to the interior.",
    highlights: [
      "Private rooftop terrace",
      "Open living space and dining area",
      "A quieter outlook above the city",
    ],
    captions: [
      "A rooftop terrace opening into the loft.",
      "The living room and its connection to the terrace.",
    ],
  },
  {
    id: "pine",
    name: "The Pine Residence",
    area: "Kifisia",
    setting: "green",
    settingName: "Green living",
    price: 1680000,
    beds: 4,
    baths: 3,
    size: 310,
    asset: "pine",
    type: "house",
    tags: ["garden", "office", "terrace", "parking"],
    description:
      "Dark green zinc, pale brick and the soft movement of pine trees. A family home with generous shared spaces, a garden for long lunches and green views from the living room.",
    highlights: [
      "A mature private garden",
      "Sheltered outdoor dining",
      "Spacious family living areas",
    ],
    captions: [
      "The garden façade, framed by mature pines.",
      "A furnished living space overlooking the garden.",
    ],
  },
];
const byId = id => homes.find(h => h.id === id);
const money = n =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
const asset = (h, width = 800, inside = false) =>
  `/previews/luxe/assets/${h.asset}${inside ? "-inside" : ""}-${width}.webp`;
const tagLabels = {
  "sea-view": "Sea view",
  pool: "Private pool",
  garden: "Private garden",
  terrace: "Terrace",
  rooftop: "Rooftop terrace",
  office: "Home office",
  "city-view": "City views",
  parking: "Private parking",
};
const filterDefinitions = [
  {
    key: "location",
    title: "Location",
    options: [["all", "All locations"], ...homes.map(h => [h.id, h.area])],
  },
  {
    key: "type",
    title: "Home type",
    options: [
      ["all", "Any home type"],
      ["house", "Detached house"],
      ["penthouse", "Penthouse"],
    ],
  },
  {
    key: "beds",
    title: "Bedrooms",
    options: [
      ["all", "Any bedrooms"],
      ["2", "2 bedrooms"],
      ["3plus", "3+ bedrooms"],
      ["4plus", "4+ bedrooms"],
    ],
  },
  {
    key: "price",
    title: "Price range",
    options: [
      ["all", "Any price"],
      ["under1", "Under €1 million"],
      ["1to2", "€1–2 million"],
      ["over2", "Over €2 million"],
    ],
  },
  {
    key: "tags",
    title: "Must-haves",
    multiple: true,
    options: Object.entries(tagLabels),
  },
  {
    key: "sort",
    title: "Sort by",
    options: [
      ["featured", "Featured homes"],
      ["price-up", "Price: low to high"],
      ["price-down", "Price: high to low"],
      ["size-down", "Size: largest first"],
      ["size-up", "Size: smallest first"],
    ],
  },
];
const filters = {
  location: "all",
  type: "all",
  beds: "all",
  price: "all",
  tags: new Set(),
  sort: "featured",
};
function matches(h, key, value) {
  if (value === "all") return true;
  if (key === "location") return h.id === value;
  if (key === "type") return h.type === value;
  if (key === "beds")
    return value.endsWith("plus")
      ? h.beds >= parseInt(value)
      : h.beds === Number(value);
  if (key === "price")
    return value === "under1"
      ? h.price < 1000000
      : value === "1to2"
        ? h.price >= 1000000 && h.price <= 2000000
        : h.price > 2000000;
  if (key === "tags") return h.tags.includes(value);
  return true;
}
function tagsMarkup(h) {
  return h.tags.map(tag => `<span>${tagLabels[tag]}</span>`).join("");
}
function renderCollection() {
  const result = homes.filter(
    h =>
      ["location", "type", "beds", "price"].every(key =>
        matches(h, key, filters[key])
      ) && [...filters.tags].every(tag => matches(h, "tags", tag))
  );
  const sorters = {
    "price-up": (a, b) => a.price - b.price,
    "price-down": (a, b) => b.price - a.price,
    "size-down": (a, b) => b.size - a.size,
    "size-up": (a, b) => a.size - b.size,
  };
  if (sorters[filters.sort]) result.sort(sorters[filters.sort]);
  $("#property-grid").innerHTML = result
    .map(
      (h, i) =>
        `<article class="property-card reveal-item" data-home="${h.id}" style="animation-delay:${i * 60}ms"><button class="property-photo" data-property="${h.id}" aria-label="Explore ${h.name}"><img src="${asset(h)}" width="800" height="533" alt="${h.captions[0]}" loading="lazy" decoding="async"><span class="photo-label">Explore this home</span></button><p class="property-location">${h.area} · ${h.type === "house" ? "Detached house" : "Penthouse"}</p><button class="property-name" data-property="${h.id}">${h.name}</button><div class="property-meta"><span>${h.beds} beds · ${h.baths} baths · ${h.size} m²</span><strong>${money(h.price)}</strong></div><div class="property-tags" aria-label="Property features">${tagsMarkup(h)}</div></article>`
    )
    .join("");
  $("#results-count").textContent =
    `${result.length} of ${homes.length} homes${result.length < homes.length ? " match your filters" : " to explore"}`;
  $("#empty").hidden = !!result.length;
}
$("#filter-menus").innerHTML = filterDefinitions
  .map(
    def =>
      `<details class="filter-menu" data-filter="${def.key}"><summary><span class="filter-label">${def.title}</span><span class="filter-value"></span><span class="filter-toggle" aria-hidden="true"></span></summary><div class="filter-panel"><fieldset><legend>${def.title}${def.multiple ? " · match every selected feature" : ""}</legend>${def.options.map(([value, label]) => `<label class="filter-option"><input type="${def.multiple ? "checkbox" : "radio"}" name="${def.key}" value="${value}"><span>${label}</span>${def.key !== "sort" ? `<small aria-label="${homes.filter(h => matches(h, def.key, value)).length} sample homes">${homes.filter(h => matches(h, def.key, value)).length}</small>` : ""}</label>`).join("")}</fieldset>${def.multiple ? '<button class="button filter-done" type="button">Done</button>' : ""}</div></details>`
  )
  .join("");
function syncFilters() {
  const chips = [];
  filterDefinitions.forEach(def => {
    const selected = def.multiple ? [...filters.tags] : [filters[def.key]];
    const menu = $(`[data-filter="${def.key}"]`);
    menu
      .querySelectorAll("input")
      .forEach(input => (input.checked = selected.includes(input.value)));
    menu.querySelector(".filter-value").textContent = def.multiple
      ? selected.length
        ? `${selected.length} selected`
        : "Any features"
      : def.options.find(([value]) => value === selected[0])[1];
    menu.classList.toggle(
      "has-selection",
      def.multiple
        ? !!selected.length
        : filters[def.key] !== (def.key === "sort" ? "featured" : "all")
    );
    if (def.key !== "sort")
      selected
        .filter(value => value !== "all")
        .forEach(value => {
          const label = def.options.find(([v]) => v === value)[1];
          chips.push(
            `<button class="filter-chip" data-clear-key="${def.key}" data-clear-value="${value}" aria-label="Remove ${label} filter">${label}<span aria-hidden="true">×</span></button>`
          );
        });
  });
  $("#active-filters").innerHTML = chips.join("");
  $("#reset-filters").hidden = !chips.length && filters.sort === "featured";
  renderCollection();
}
function closeFilter(menu, focus = false) {
  menu.open = false;
  if (focus) menu.querySelector("summary").focus({ preventScroll: true });
}
$("#filter-menus").addEventListener("change", e => {
  const input = e.target.closest("input");
  if (!input) return;
  const key = input.name;
  if (key === "tags") {
    input.checked
      ? filters.tags.add(input.value)
      : filters.tags.delete(input.value);
  } else {
    filters[key] = input.value;
    closeFilter(input.closest("details"), true);
  }
  syncFilters();
});
$$(".filter-menu").forEach(menu =>
  menu.querySelector("summary").addEventListener("click", () => {
    $$(".filter-menu[open]")
      .filter(other => other !== menu)
      .forEach(other => closeFilter(other));
  })
);
function positionFilter(menu) {
  const box = menu.querySelector("summary").getBoundingClientRect();
  const below = innerHeight - box.bottom - 20;
  const above = box.top - $(".header").offsetHeight - 20;
  const up = below < 230 && above > below;
  menu.classList.toggle("opens-up", up);
  menu.style.setProperty(
    "--panel-height",
    `${Math.max(150, Math.min(410, up ? above : below))}px`
  );
}
$$(".filter-menu").forEach(menu =>
  menu.addEventListener("toggle", () => {
    if (menu.open) positionFilter(menu);
  })
);
addEventListener("resize", () =>
  $$(".filter-menu[open]").forEach(positionFilter)
);
$(".filter-done").addEventListener("click", e =>
  closeFilter(e.target.closest("details"), true)
);
document.addEventListener("click", e => {
  $$(".filter-menu[open]")
    .filter(menu => !menu.contains(e.target))
    .forEach(menu => closeFilter(menu));
  const chip = e.target.closest("[data-clear-key]");
  if (chip) {
    const key = chip.dataset.clearKey;
    if (key === "tags") filters.tags.delete(chip.dataset.clearValue);
    else filters[key] = "all";
    syncFilters();
    $(`[data-filter="${key}"] summary`).focus({ preventScroll: true });
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && $(".filter-menu[open]")) {
    e.preventDefault();
    closeFilter($(".filter-menu[open]"), true);
  }
});
function resetFilters() {
  Object.assign(filters, {
    location: "all",
    type: "all",
    beds: "all",
    price: "all",
    tags: new Set(),
    sort: "featured",
  });
  $$(".filter-menu[open]").forEach(menu => closeFilter(menu));
  syncFilters();
  $("[data-filter=location] summary").focus({ preventScroll: true });
}
$("#reset-filters").addEventListener("click", resetFilters);
$("#clear-filters").addEventListener("click", resetFilters);
// Managed anchors leave the parent showcase's Back history untouched.
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: reduced.matches ? "instant" : "smooth",
    block: "start",
  });
  el.focus({ preventScroll: true });
}
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    e.preventDefault();
    goTo(a.getAttribute("href").slice(1));
  }
});
let opener = null,
  oldOverflow = "";
function openDialog(dialog) {
  const open = $("dialog[open]");
  if (!open) {
    opener = document.activeElement;
    oldOverflow = document.body.style.overflow;
  } else open.close("switch");
  document.body.style.overflow = "hidden";
  dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector("[data-close]")?.focus();
}
function closeDialog(dialog) {
  dialog?.close();
}
$$("dialog").forEach(dialog => {
  dialog.addEventListener("click", e => {
    if (e.target.closest("[data-close]")) closeDialog(dialog);
    else if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        closeDialog(dialog);
    }
  });
  dialog.addEventListener("close", () => {
    if ($("dialog[open]")) return;
    document.body.style.overflow = oldOverflow;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
});
let activeHome = null,
  photoIndex = 0,
  photoRequest = 0;
const imageCache = new Map();
function loadImage(src) {
  if (!imageCache.has(src)) {
    imageCache.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => img.decode().then(() => resolve(img), reject);
        img.onerror = () => reject(new Error("Image unavailable"));
        img.src = src;
      }).catch(e => {
        imageCache.delete(src);
        throw e;
      })
    );
  }
  return imageCache.get(src);
}
async function showPhoto(index) {
  if (!activeHome) return;
  photoIndex = (index + 2) % 2;
  const target = photoIndex,
    h = activeHome,
    request = ++photoRequest;
  const src = asset(h, 1600, target === 1);
  $("#gallery-error").hidden = true;
  $("#detail-image").setAttribute("aria-busy", "true");
  try {
    await loadImage(src);
    if (request !== photoRequest) return;
    $("#detail-image").src = src;
    $("#detail-image").alt = `${h.name}: ${h.captions[target]}`;
    $("#photo-count").textContent = `${target + 1} / 2`;
    $("#photo-caption").textContent = h.captions[target];
    if (!reduced.matches)
      $("#detail-image").animate(
        [
          { opacity: 0.4, transform: "scale(1.015)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 400 }
      );
  } catch {
    if (request === photoRequest) $("#gallery-error").hidden = false;
  } finally {
    if (request === photoRequest)
      $("#detail-image").setAttribute("aria-busy", "false");
  }
}
function openProperty(id) {
  const h = byId(id);
  if (!h) return;
  activeHome = h;
  $("#property-title").textContent = h.name;
  $("#detail-location").textContent = `${h.area} · ${h.settingName}`;
  $("#detail-price").textContent = money(h.price);
  $("#detail-description").textContent = h.description;
  $("#detail-facts").innerHTML =
    `<div><dt>Bedrooms</dt><dd>${h.beds}</dd></div><div><dt>Bathrooms</dt><dd>${h.baths}</dd></div><div><dt>Interior</dt><dd>${h.size} m²</dd></div>`;
  $("#detail-highlights").replaceChildren(
    ...h.highlights.map(text => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    })
  );
  $("#detail-image").src = asset(h);
  $("#detail-image").alt = h.captions[0];
  $("#photo-count").textContent = "1 / 2";
  $("#photo-caption").textContent = h.captions[0];
  showPhoto(0);
  $("#detail-tags").innerHTML = tagsMarkup(h);
  openDialog($("#property-dialog"));
}
$("#photo-next").addEventListener("click", () => showPhoto(photoIndex + 1));
$("#photo-prev").addEventListener("click", () => showPhoto(photoIndex - 1));
document.addEventListener("click", e => {
  const prop = e.target.closest("[data-property]");
  if (prop) openProperty(prop.dataset.property);
});
// A six-frame photographic reel. Manual selection holds the frame, and motion
// stops offscreen, in a dialog, on hover/focus, or for reduced-motion visitors.
const frames = homes.flatMap(h =>
  [false, true].map(inside => ({ home: h, inside }))
);
let heroRequest = 0,
  currentFrame = 0,
  heroVisible = true,
  heroHeld = false,
  heroBusy = false;
$(".hero-reel").innerHTML = frames
  .map(
    ({ home: h, inside }, i) =>
      `<button data-frame="${i}" aria-pressed="${i === 0}" aria-label="${h.name}, ${inside ? "interior" : "exterior"}"><img src="${asset(h, 800, inside)}" width="800" height="533" alt="" decoding="async"></button>`
  )
  .join("");
async function changeFrame(index) {
  const target = (index + frames.length) % frames.length;
  const { home: h, inside } = frames[target];
  const request = ++heroRequest;
  heroBusy = true;
  $("#hero-error").hidden = true;
  try {
    const src = asset(h, innerWidth <= 600 ? 800 : 1600, inside);
    await loadImage(src);
    if (request !== heroRequest) return;
    const incoming = $("#hero-incoming");
    incoming.getAnimations().forEach(a => a.cancel());
    incoming.src = src;
    if (!reduced.matches && currentFrame !== target) {
      await incoming
        .animate(
          [
            { opacity: 0, transform: "scale(1.035)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration: 420, easing: "ease-out", fill: "forwards" }
        )
        .finished.catch(() => {});
      if (request !== heroRequest) return;
    }
    $("#hero-image").src = src;
    $("#hero-image").alt = `${h.name}: ${h.captions[Number(inside)]}`;
    incoming.getAnimations().forEach(a => a.cancel());
    currentFrame = target;
    $("#hero-detail").textContent = h.name;
    $("#hero-detail").dataset.property = h.id;
    $("#hero-location").textContent =
      `${h.area} · ${inside ? "Inside" : "Outside"}`;
    $$("[data-frame]").forEach(b =>
      b.setAttribute("aria-pressed", String(Number(b.dataset.frame) === target))
    );
  } catch {
    if (request === heroRequest) $("#hero-error").hidden = false;
  } finally {
    if (request === heroRequest) heroBusy = false;
  }
}
$$("[data-frame]").forEach(b =>
  b.addEventListener("click", () => {
    heroHeld = true;
    changeFrame(Number(b.dataset.frame));
  })
);
$(".hero").addEventListener("pointerenter", e => {
  if (e.pointerType === "mouse") heroHeld = true;
});
$(".hero").addEventListener("pointerleave", () => {
  heroHeld = false;
});
new IntersectionObserver(
  ([entry]) => {
    heroVisible = entry.isIntersecting;
  },
  { threshold: 0.2 }
).observe($(".hero"));
setInterval(() => {
  if (
    !reduced.matches &&
    !document.hidden &&
    heroVisible &&
    !heroHeld &&
    !heroBusy &&
    !$("dialog[open]") &&
    !$(".hero").contains(document.activeElement)
  )
    changeFrame(currentFrame + 1);
}, 1400);
let touchStart = null;
$(".hero").addEventListener(
  "touchstart",
  e => {
    if (!e.target.closest("button,a"))
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  },
  { passive: true }
);
$(".hero").addEventListener(
  "touchend",
  e => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x,
      dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      heroHeld = true;
      changeFrame(currentFrame + (dx < 0 ? 1 : -1));
    }
  },
  { passive: true }
);
$$("[data-place]").forEach(b =>
  b.addEventListener("click", () => {
    const h = byId(b.dataset.place);
    $$("[data-place]").forEach(item => {
      const active = item === b;
      item.classList.toggle("active", active);
      item.setAttribute("aria-expanded", String(active));
    });
    $("#place-caption").textContent = `${h.settingName} · ${h.name}`;
    $("#place-open").dataset.property = h.id;
  })
);
syncFilters();
if (!reduced.matches) {
  $(".hero-copy").animate(
    [
      { opacity: 0, transform: "translateY(25px)" },
      { opacity: 1, transform: "none" },
    ],
    { duration: 1100, easing: "cubic-bezier(.2,.75,.2,1)" }
  );
}
document.documentElement.dataset.luxeReady = "true";
