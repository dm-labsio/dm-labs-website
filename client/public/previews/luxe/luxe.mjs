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
let saved = new Set();
try {
  const raw = JSON.parse(localStorage.getItem("dm-luxe-saved-v1") || "[]");
  if (Array.isArray(raw)) saved = new Set(raw.filter(id => byId(id)));
} catch {}
let toastTimer;
function toast(text) {
  $("#toast").textContent = text;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2600);
}
function updateSaved() {
  $$("[data-saved-count]").forEach(e => (e.textContent = saved.size));
  $$("[data-save]").forEach(b => {
    const active = saved.has(b.dataset.save);
    b.setAttribute("aria-pressed", String(active));
    b.textContent = active ? "Saved" : "Save";
    b.setAttribute(
      "aria-label",
      `${active ? "Remove" : "Save"} ${byId(b.dataset.save).name}${active ? " from shortlist" : ""}`
    );
  });
  if (activeHome) {
    $("#detail-save").textContent = saved.has(activeHome.id)
      ? "Remove from saved"
      : "Save home";
    $("#detail-save").setAttribute(
      "aria-pressed",
      String(saved.has(activeHome.id))
    );
  }
  renderPortfolio();
  try {
    localStorage.setItem("dm-luxe-saved-v1", JSON.stringify([...saved]));
  } catch {}
}
function toggleSaved(id) {
  if (!byId(id)) return;
  const removed = saved.delete(id);
  if (!removed) saved.add(id);
  updateSaved();
  toast(
    `${byId(id).name} ${removed ? "removed from" : "added to"} your shortlist.`
  );
}
const filters = { setting: "all", beds: 0, budget: 3000000, sort: "selected" };
function renderCollection() {
  let result = homes.filter(
    h =>
      (filters.setting === "all" || h.setting === filters.setting) &&
      h.beds >= filters.beds &&
      (!filters.budget || h.price <= filters.budget)
  );
  const sort = filters.sort;
  if (sort !== "selected")
    result.sort((a, b) =>
      sort === "ascending" ? a.price - b.price : b.price - a.price
    );
  $("#property-grid").innerHTML = result
    .map(
      (h, i) =>
        `<article class="property-card reveal-item" style="animation-delay:${i * 60}ms"><button class="property-photo" data-property="${h.id}" aria-label="Explore ${h.name}"><img src="${asset(h)}" width="800" height="533" alt="${h.captions[0]}" loading="lazy" decoding="async"><span class="photo-label">Explore this home</span></button><button class="save" data-save="${h.id}" aria-pressed="false">Save</button><p class="property-location">${h.area} · ${h.settingName}</p><button class="property-name" data-property="${h.id}">${h.name}</button><div class="property-meta"><span>${h.beds} beds · ${h.baths} baths · ${h.size} m²</span><strong>${money(h.price)}</strong></div></article>`
    )
    .join("");
  $("#results-count").textContent =
    `${result.length} ${result.length === 1 ? "home" : "homes"} in this collection`;
  $("#empty").hidden = !!result.length;
  updateSaved();
}
function syncFilters() {
  $$("[data-setting]").forEach(b =>
    b.setAttribute(
      "aria-pressed",
      String(b.dataset.setting === filters.setting)
    )
  );
  $$("[data-beds]").forEach(b =>
    b.setAttribute(
      "aria-pressed",
      String(Number(b.dataset.beds) === filters.beds)
    )
  );
  $("#budget").value = filters.budget;
  const label =
    filters.budget === 3000000 ? "Any price" : `Up to ${money(filters.budget)}`;
  $("#budget-label").textContent = label;
  $("#budget").setAttribute("aria-valuetext", label);
  $("#budget").style.setProperty(
    "--fill",
    `${((filters.budget - 750000) / 2250000) * 100}%`
  );
  const order = {
    selected: "Our selection",
    ascending: "Price: low to high",
    descending: "Price: high to low",
  }[filters.sort];
  $("#sort").textContent = order;
  $("#sort").setAttribute("aria-label", `Sort homes. Current order: ${order}`);
  renderCollection();
}
$$("[data-setting]").forEach(b =>
  b.addEventListener("click", () => {
    filters.setting = b.dataset.setting;
    syncFilters();
  })
);
$$("[data-beds]").forEach(b =>
  b.addEventListener("click", () => {
    filters.beds = Number(b.dataset.beds);
    syncFilters();
  })
);
$("#budget").addEventListener("input", e => {
  filters.budget = Number(e.target.value);
  syncFilters();
});
$("#sort").addEventListener("click", () => {
  const order = ["selected", "ascending", "descending"];
  filters.sort = order[(order.indexOf(filters.sort) + 1) % order.length];
  syncFilters();
});
function resetFilters() {
  Object.assign(filters, {
    setting: "all",
    beds: 0,
    budget: 3000000,
    sort: "selected",
  });
  syncFilters();
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
  updateSaved();
  openDialog($("#property-dialog"));
}
$("#photo-next").addEventListener("click", () => showPhoto(photoIndex + 1));
$("#photo-prev").addEventListener("click", () => showPhoto(photoIndex - 1));
$("#detail-save").addEventListener("click", () => toggleSaved(activeHome.id));
$("#detail-portfolio").addEventListener("click", () => {
  if (!saved.has(activeHome.id)) toggleSaved(activeHome.id);
  renderSaved();
  openDialog($("#saved-dialog"));
});
function renderPortfolio() {
  const cards = $("#portfolio-fan");
  // Keep the fan's buttons in place so saving never steals keyboard focus.
  if (!cards.children.length)
    cards.innerHTML = homes
      .map(
        (h, i) =>
          `<button class="fan-card" data-property="${h.id}" style="--i:${i}" aria-label="Explore ${h.name}"><img src="${asset(h, 800, true)}" width="800" height="533" loading="lazy" alt="${h.captions[1]}"><span><small>${h.area}</small><strong>${h.name}</strong><em data-fan-state="${h.id}">Explore home</em></span></button>`
      )
      .join("");
  $$("[data-fan-state]").forEach(e => {
    const selected = saved.has(e.dataset.fanState);
    e.textContent = selected ? "In your collection" : "Explore home";
    e.closest("button").classList.toggle("is-saved", selected);
  });
  $("#portfolio-status").textContent = saved.size
    ? `${saved.size} ${saved.size === 1 ? "home" : "homes"} saved. Yours to compare and keep.`
    : "Save a home to start your collection.";
  $("#download-shortlist").disabled = !saved.size;
}
$("#download-shortlist").addEventListener("click", () => {
  const selected = homes.filter(h => saved.has(h.id));
  if (!selected.length) return;
  const content = [
    "LUXE / YOUR PERSONAL PROPERTY COLLECTION",
    "Fictional homes and illustrative prices. A DM Labs design concept.",
    ...selected.map(
      h =>
        `${h.name} | ${h.area}\n${money(h.price)} | ${h.beds} bedrooms | ${h.baths} bathrooms | ${h.size} m²\n${h.description}\n${h.highlights.join("; ")}`
    ),
  ].join("\n\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "Luxe-my-property-collection.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Your property collection is ready to keep.");
});
function renderSaved() {
  const items = homes.filter(h => saved.has(h.id));
  $("#saved-empty").hidden = !!items.length;
  $("#saved-grid").innerHTML = items
    .map(
      h =>
        `<article><img src="${asset(h)}" width="800" height="533" alt="${h.name}" loading="lazy"><h3>${h.name}</h3><dl><div><dt>Setting</dt><dd>${h.settingName}</dd></div><div><dt>Asking price</dt><dd>${money(h.price)}</dd></div><div><dt>Bedrooms</dt><dd>${h.beds}</dd></div><div><dt>Bathrooms</dt><dd>${h.baths}</dd></div><div><dt>Interior</dt><dd>${h.size} m²</dd></div></dl><button class="text-button" data-property="${h.id}">Explore home</button><button class="text-button" data-remove="${h.id}" aria-label="Remove ${h.name} from shortlist">Remove</button></article>`
    )
    .join("");
}
$$("[data-open-saved]").forEach(b =>
  b.addEventListener("click", () => {
    renderSaved();
    openDialog($("#saved-dialog"));
  })
);
$("#browse-homes").addEventListener("click", () => {
  closeDialog($("#saved-dialog"));
  requestAnimationFrame(() => goTo("collection"));
});
document.addEventListener("click", e => {
  const prop = e.target.closest("[data-property]");
  if (prop) openProperty(prop.dataset.property);
  const save = e.target.closest("[data-save]");
  if (save) toggleSaved(save.dataset.save);
  const remove = e.target.closest("[data-remove]");
  if (remove) {
    toggleSaved(remove.dataset.remove);
    renderSaved();
    $("#saved-grid [data-remove]")?.focus();
    if (!saved.size) $("#browse-homes").focus();
  }
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
renderCollection();
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
