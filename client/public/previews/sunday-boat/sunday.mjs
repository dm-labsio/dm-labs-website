const $ = s => document.querySelector(s),
  $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion:reduce)");
const asset = "/previews/sunday-boat/assets/";
// Keep in-page navigation out of browser history so the demo viewer returns to
// the exact gallery position. Native scrolling and focus remain accessible.
$$('a[href^="#"]').forEach(a =>
  a.addEventListener("click", e => {
    const target = $(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth" });
  })
);
let plate = 0;
let plateTouched = false;
function setPlate(index, automatic = false) {
  if (!automatic) plateTouched = true;
  plate = (index + 3) % 3;
  $$("[data-plate]").forEach((b, i) => {
    let d = (i - plate + 3) % 3;
    if (d === 2) d = -1;
    b.style.setProperty("--x", `${d * 26}%`);
    b.style.setProperty("--y", d ? "-8px" : "0px");
    b.style.setProperty("--r", `${d ? d * 14 : -4}deg`);
    b.style.setProperty("--z", d ? "2" : "4");
    b.classList.toggle("active", d === 0);
    b.setAttribute("aria-pressed", String(d === 0));
  });
}
$$("[data-plate]").forEach(b =>
  b.addEventListener("click", () => setPlate(Number(b.dataset.plate)))
);
$("#next-plate").addEventListener("click", () => setPlate(plate + 1));
$(".plate-fan").addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    setPlate(plate + (e.key === "ArrowRight" ? 1 : -1));
    $(`[data-plate="${plate}"]`).focus({ preventScroll: true });
  }
});
let touch;
$(".plate-fan").addEventListener(
  "touchstart",
  e => {
    touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  },
  { passive: true }
);
$(".plate-fan").addEventListener(
  "touchend",
  e => {
    if (!touch) return;
    const dx = e.changedTouches[0].clientX - touch.x,
      dy = e.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      setPlate(plate + (dx < 0 ? 1 : -1));
    }
  },
  { passive: true }
);
$(".plate-fan").addEventListener(
  "touchcancel",
  () => {
    touch = null;
  },
  { passive: true }
);
// Menu content comes from the supplied menu study; no invented location, hours,
// contact details or currency. The tabs work with touch and arrow-key navigation.
function setMenu(index) {
  $$("[data-menu]").forEach((b, i) => {
    b.setAttribute("aria-selected", String(i === index));
    b.tabIndex = i === index ? 0 : -1;
    $(`#menu-panel-${i}`).hidden = i !== index;
  });
  const pages = $(".menu-pages");
  pages.classList.remove("changing");
  requestAnimationFrame(() => pages.classList.add("changing"));
}
$$("[data-menu]").forEach((b, i) => {
  b.addEventListener("click", () => setMenu(i));
  b.addEventListener("keydown", e => {
    let next;
    if (e.key === "ArrowRight") next = (i + 1) % 3;
    if (e.key === "ArrowLeft") next = (i + 2) % 3;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 2;
    if (next !== undefined) {
      e.preventDefault();
      setMenu(next);
      $(`[data-menu="${next}"]`).focus();
    }
  });
});
let placeVersion = 0;
$$("[data-place]").forEach(b =>
  b.addEventListener("click", async () => {
    const version = ++placeVersion,
      inside = b.dataset.place === "inside";
    const name = inside ? "13-interior" : "12-exterior-table-details";
    const incoming = new Image();
    incoming.src = asset + name + "-full.webp";
    try {
      await incoming.decode();
    } catch {
      return;
    }
    if (version !== placeVersion) return;
    const img = $("#place-image");
    img.srcset = `${asset}${name}-768w.webp 768w, ${incoming.src} 1536w`;
    img.src = asset + name + "-768w.webp";
    img.alt = inside
      ? "Sunday Boat dining room with pistachio seating and a seafood counter"
      : "Sunday Boat terrace beneath a cobalt awning";
    await img.decode().catch(() => {});
    if (version !== placeVersion) return;
    $$("[data-place]").forEach(x =>
      x.setAttribute("aria-pressed", String(x === b))
    );
    $(".place-scene").classList.remove("changing");
    requestAnimationFrame(() => $(".place-scene").classList.add("changing"));
  })
);
$("#box-toggle").addEventListener("click", () => {
  const b = $("#box-toggle"),
    open = b.getAttribute("aria-pressed") !== "true";
  b.setAttribute("aria-pressed", String(open));
  b.setAttribute(
    "aria-label",
    open ? "Close the takeaway box" : "Open the takeaway box"
  );
  $(".box-hint").textContent = open ? "Close the lid −" : "Lift the lid +";
});
const gallery = $$("[data-gallery]").map(b => ({
  file: b.dataset.gallery,
  caption: b.dataset.caption,
}));
const dialog = $("#lightbox");
let galleryIndex = 0,
  opener,
  version = 0;
async function showPhoto(index) {
  galleryIndex = (index + gallery.length) % gallery.length;
  const current = ++version,
    item = gallery[galleryIndex],
    incoming = new Image();
  incoming.src = asset + item.file + "-full.webp";
  try {
    await incoming.decode();
  } catch {
    return;
  }
  if (current !== version) return;
  $("#lightbox-image").src = incoming.src;
  $("#lightbox-image").alt = item.caption;
  $("#lightbox-caption").textContent = item.caption;
}
$$("[data-gallery]").forEach((b, i) =>
  b.addEventListener("click", () => {
    opener = b;
    showPhoto(i);
    dialog.showModal();
  })
);
$$("[data-step]").forEach(b =>
  b.addEventListener("click", () =>
    showPhoto(galleryIndex + Number(b.dataset.step))
  )
);
$("[data-close]").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  ++version;
  opener?.focus({ preventScroll: true });
});
dialog.addEventListener("click", e => {
  if (e.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom
  )
    dialog.close();
});
dialog.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    showPhoto(galleryIndex + (e.key === "ArrowRight" ? 1 : -1));
  }
});
// Short, once-only section entrances. No scroll hijacking or pointer transforms.
const observer = new IntersectionObserver(
  entries =>
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("seen");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.08 }
);
$$(
  ".section-title,.menu-layout,.place-heading,.table-copy,.takeaway-copy,.merch-heading"
).forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

// Only the mounted viewer may start the short introduction. The static srcdoc
// snapshot stays still, so React replacing it never replays an opening sequence.
let introduced = false;
async function introduce() {
  if (introduced) return;
  introduced = true;
  await Promise.allSettled(
    [...document.querySelectorAll(".hero img")].map(img => img.decode())
  );
  document.documentElement.classList.add("intro-ready");
  if (reduced.matches) return;
  setTimeout(() => {
    const bounds = $(".hero").getBoundingClientRect();
    if (
      !plateTouched &&
      !document.hidden &&
      bounds.top > -100 &&
      !$(".hero").contains(document.activeElement)
    )
      setPlate(1, true);
  }, 2400);
}
if (window.top === window) {
  if (document.readyState === "complete") introduce();
  else window.addEventListener("load", introduce, { once: true });
} else document.addEventListener("dm-preview-ready", introduce, { once: true });
