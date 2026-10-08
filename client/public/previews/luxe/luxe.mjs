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
function renderCollection() {
  let result = homes.filter(
    h =>
      ($("#setting").value === "all" || h.setting === $("#setting").value) &&
      h.beds >= Number($("#bedrooms").value) &&
      (!Number($("#budget").value) || h.price <= Number($("#budget").value))
  );
  const sort = $("#sort").value;
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
$("#filters").addEventListener("submit", e => e.preventDefault());
$("#filters").addEventListener("change", renderCollection);
$("#filters").addEventListener("reset", () => setTimeout(renderCollection, 0));
$("#clear-filters").addEventListener("click", () => $("#filters").reset());
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
$("#detail-enquire").addEventListener("click", () => {
  const id = activeHome.id;
  closeDialog($("#property-dialog"));
  $("#enquiry-home").value = id;
  requestAnimationFrame(() => {
    $("#enquire").scrollIntoView({
      behavior: reduced.matches ? "instant" : "smooth",
      block: "start",
    });
    $("#enquiry-form [name=name]").focus({ preventScroll: true });
  });
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
let heroRequest = 0,
  currentHero = "horizon";
async function changeHero(id) {
  const h = byId(id);
  if (!h) return;
  const request = ++heroRequest;
  $("#shutters").replaceChildren();
  $("#hero-error").hidden = true;
  $("#hero-media").setAttribute("aria-busy", "true");
  try {
    const src = asset(h, 1600);
    await loadImage(src);
    if (request !== heroRequest) return;
    const media = $("#hero-media"),
      stage = $("#shutters");
    stage.replaceChildren();
    if (!reduced.matches && currentHero !== id) {
      const box = media.getBoundingClientRect();
      const position = innerWidth <= 600 ? 0.62 : 0.5;
      const img = await loadImage(src);
      const scale = Math.max(
        box.width / img.naturalWidth,
        box.height / img.naturalHeight
      );
      const bgW = img.naturalWidth * scale,
        bgH = img.naturalHeight * scale;
      const animations = Array.from({ length: 4 }, (_, i) => {
        const strip = document.createElement("div");
        strip.className = "shutter";
        strip.style.left = `${i * 25}%`;
        strip.style.backgroundImage = `url("${src}")`;
        strip.style.backgroundSize = `${bgW}px ${bgH}px`;
        strip.style.backgroundPosition = `${(box.width - bgW) * position - (i * box.width) / 4}px ${(box.height - bgH) * 0.6}px`;
        stage.append(strip);
        return strip.animate(
          [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
          {
            duration: 700,
            delay: i * 70,
            easing: "cubic-bezier(.2,.75,.2,1)",
            fill: "both",
          }
        ).finished;
      });
      await Promise.all(animations);
      if (request !== heroRequest) return;
    }
    $("#hero-image").src = src;
    $("#hero-image").alt = `${h.name}: ${h.captions[0]}`;
    stage.replaceChildren();
    currentHero = id;
    $("#hero-detail").textContent = h.name;
    $("#hero-detail").dataset.property = id;
    $("#hero-location").textContent = `${h.area} · ${h.settingName}`;
    $$("[data-hero]").forEach(b =>
      b.setAttribute("aria-pressed", String(b.dataset.hero === id))
    );
  } catch {
    if (request === heroRequest) $("#hero-error").hidden = false;
  } finally {
    if (request === heroRequest)
      $("#hero-media").setAttribute("aria-busy", "false");
  }
}
$$("[data-hero]").forEach(b =>
  b.addEventListener("click", () => changeHero(b.dataset.hero))
);
let touchStart = null;
$("#hero-media").parentElement.addEventListener(
  "touchstart",
  e => {
    if (e.target.closest("button,a")) return;
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  },
  { passive: true }
);
$("#hero-media").parentElement.addEventListener(
  "touchend",
  e => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x,
      dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const i = homes.findIndex(h => h.id === currentHero);
      changeHero(homes[(i + (dx < 0 ? 1 : 2)) % 3].id);
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
$("#enquiry-form").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const values = [
    ["Home", byId(data.get("home"))?.name || "Help me find my place"],
    ["Name", data.get("name")],
    ["Email", data.get("email")],
    ["Preference", data.get("visit")],
    ["What matters to you", data.get("message") || "To discuss together"],
  ];
  $("#request-summary").replaceChildren(
    ...values.map(([key, value]) => {
      const div = document.createElement("div"),
        dt = document.createElement("dt"),
        dd = document.createElement("dd");
      dt.textContent = key;
      dd.textContent = value;
      div.append(dt, dd);
      return div;
    })
  );
  openDialog($("#request-dialog"));
});
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
