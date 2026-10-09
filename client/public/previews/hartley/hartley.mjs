const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const cards = $$(".arc-card");
let scene = 2;
let userUntil = 0;
let heroVisible = true;
const captions = [
  "Come on in. The kettle’s on.",
  "Your day, with a better beginning.",
  "A little time. A pot for two.",
  "A familiar face. A favourite corner.",
  "Something good for the way home.",
];
function drawArc() {
  const gap = innerWidth < 600 ? 205 : Math.min(innerWidth * 0.235, 305);
  cards.forEach((card, i) => {
    let d = (i - scene + cards.length) % cards.length;
    if (d > 2) d -= cards.length;
    card.style.setProperty("--x", d * gap);
    card.style.setProperty("--y", Math.abs(d) * (innerWidth < 600 ? 29 : 35));
    card.style.setProperty("--r", d * 9);
    card.style.zIndex = String(5 - Math.abs(d));
    card.setAttribute("aria-current", String(d === 0));
  });
  $("#scene-caption").textContent = captions[scene];
}
function selectScene(n, user = true) {
  scene = (n + cards.length) % cards.length;
  if (user) userUntil = Date.now() + 12000;
  drawArc();
}
$("#scene-prev").onclick = () => selectScene(scene - 1);
$("#scene-next").onclick = () => selectScene(scene + 1);
let start = null,
  moved = false;
$(".arc").addEventListener("pointerdown", e => {
  if (e.button !== 0) return;
  start = { x: e.clientX, y: e.clientY };
  moved = false;
  userUntil = Date.now() + 12000;
});
$(".arc").addEventListener("pointermove", e => {
  if (start && Math.abs(e.clientX - start.x) > 12) moved = true;
});
window.addEventListener("pointerup", e => {
  if (!start) return;
  const dx = e.clientX - start.x,
    dy = e.clientY - start.y;
  start = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))
    selectScene(scene + (dx < 0 ? 1 : -1));
});
window.addEventListener("pointercancel", () => {
  start = null;
  moved = false;
});
cards.forEach((card, i) =>
  card.addEventListener("click", () => {
    if (!moved) selectScene(i);
  })
);
$(".arc").addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    selectScene(scene + (e.key === "ArrowRight" ? 1 : -1));
  }
});
window.addEventListener("resize", drawArc);
new IntersectionObserver(
  ([entry]) => (heroVisible = entry.isIntersecting)
).observe($(".hero"));
setInterval(() => {
  if (
    !reduce.matches &&
    !document.hidden &&
    heroVisible &&
    Date.now() > userUntil &&
    !$(".hero").matches(":hover") &&
    !$(".hero").contains(document.activeElement)
  )
    selectScene(scene + 1, false);
}, 6000);
drawArc();
const menus = {
  coffee: {
    title: "Coffee & company",
    intro: "Your day, with a better beginning.",
    photo: "milk",
    caption: "Made with a little more care.",
    alt: "A carefully poured flat white",
    items: [
      ["Espresso", "Short, rich, beautifully simple.", "2.80"],
      ["Flat white", "A double shot, silky steamed milk.", "3.80"],
      ["Cappuccino", "A little more foam. Just enough.", "3.80"],
      ["Slow filter", "A changing coffee, brewed by hand.", "4.20"],
    ],
  },
  bakes: {
    title: "From the oven",
    intro: "The good kind of difficult decision.",
    photo: "cake",
    caption: "Baked this morning. Gone by afternoon.",
    alt: "A freshly baked cake being packed at Hartley",
    items: [
      ["Butter croissant", "Golden layers, a little flaky mess.", "3.20"],
      ["Seasonal cake", "A generous slice of something lovely.", "5.50"],
      ["Warm scones", "Jam, clotted cream, happy company.", "6.50"],
      ["The morning bun", "Soft, spiced, made for your coffee.", "3.80"],
    ],
  },
  tea: {
    title: "A little tea",
    intro: "For long conversations and second cups.",
    photo: "tea",
    caption: "Take the afternoon. We’ll take the tea.",
    alt: "A table set for afternoon tea",
    items: [
      ["English Breakfast", "A proper classic, served by the pot.", "4.50"],
      ["Earl Grey", "Fragrant bergamot, a lighter moment.", "4.50"],
      ["Garden Mint", "Fresh, bright and caffeine-free.", "4.50"],
      [
        "Afternoon tea for two",
        "Sandwiches, scones, sweets and your tea.",
        "38.00",
      ],
    ],
  },
};
const menuKeys = Object.keys(menus);
let menuIndex = 0;
function changeMenu(key, focus = false) {
  const m = menus[key];
  menuIndex = menuKeys.indexOf(key);
  $$("[data-menu]").forEach(b => {
    const selected = b.dataset.menu === key;
    b.setAttribute("aria-selected", selected);
    b.tabIndex = selected ? 0 : -1;
    if (selected && focus) b.focus();
  });
  $("#menu-panel").setAttribute("aria-labelledby", "tab-" + key);
  $("#menu-content").innerHTML =
    `<h3>${m.title}</h3><p class="menu-intro">${m.intro}</p><dl>${m.items.map(([name, desc, price]) => `<div><dt>${name}<small>${desc}</small></dt><dd>€${price}</dd></div>`).join("")}</dl>`;
  $("#menu-photo").src = "/previews/hartley/assets/" + m.photo + ".webp";
  $("#menu-photo").alt = m.alt;
  $("#menu-photo-label").textContent = m.caption;
  $("#menu-page").textContent = m.title;
  $("#menu-panel").classList.remove("turning");
  void $("#menu-panel").offsetWidth;
  $("#menu-panel").classList.add("turning");
}
$$("[data-menu]").forEach(b => {
  b.onclick = () => changeMenu(b.dataset.menu);
  b.onkeydown = e => {
    let n = menuIndex;
    if (e.key === "ArrowRight") n++;
    else if (e.key === "ArrowLeft") n--;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 2;
    else return;
    e.preventDefault();
    changeMenu(menuKeys[(n + 3) % 3], true);
  };
});
$("#menu-next").onclick = () => changeMenu(menuKeys[(menuIndex + 1) % 3]);
$("#menu-prev").onclick = () => changeMenu(menuKeys[(menuIndex + 2) % 3]);
const teas = {
  breakfast: [
    "A proper classic.",
    "Full-bodied and reassuring. Lovely with a warm scone, a spoon of jam and a little clotted cream.",
  ],
  grey: [
    "A little more fragrant.",
    "Bergamot, bright citrus and a gentle finish. Just the thing with a slice of lemon cake.",
  ],
  mint: [
    "Something a little lighter.",
    "Fresh mint, naturally caffeine-free. A bright partner for the savoury sandwiches on your afternoon stand.",
  ],
};
$$("[data-tea]").forEach(
  b =>
    (b.onclick = () => {
      $$("[data-tea]").forEach(x =>
        x.setAttribute("aria-pressed", String(x === b))
      );
      const [name, detail] = teas[b.dataset.tea];
      $("#tea-name").textContent = name;
      $("#tea-detail").textContent = detail;
    })
);
let wrapped = false;
$("#wrap-button").onclick = () => {
  wrapped = !wrapped;
  $("#parcel").dataset.wrapped = wrapped;
  $("#wrap-button").setAttribute("aria-pressed", String(wrapped));
  $("#wrap-button span").textContent = wrapped
    ? "Have another peek"
    : "Wrap it for me";
  $("#parcel-status").textContent = wrapped
    ? "Ready for someone’s very good afternoon."
    : "A little something before the ribbon.";
  $(".parcel-front").setAttribute("aria-hidden", String(wrapped));
  $(".parcel-back").setAttribute("aria-hidden", String(!wrapped));
};
const dialog = $("#photo-dialog");
let opener;
$$("[data-photo]").forEach(
  b =>
    (b.onclick = () => {
      opener = b;
      $("#large-photo").src =
        "/previews/hartley/assets/" + b.dataset.photo + ".webp";
      $("#large-photo").alt = b.querySelector("img").alt;
      $("#photo-caption").textContent = b.dataset.caption;
      dialog.showModal();
    })
);
$(".dialog-close").onclick = () => dialog.close();
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
dialog.addEventListener("close", () => opener?.focus());
$$('a[href^="#"]').forEach(a =>
  a.addEventListener("click", e => {
    const target = $(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduce.matches ? "instant" : "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  })
);
document.documentElement.dataset.hartleyReady = "true";
