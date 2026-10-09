const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
// A visual introduction, not a carousel visitors need to operate.
const windows = $$(".picture-window");
const scenes = [
  [
    ["milk", "Milk poured into a navy Hartley cup"],
    ["tea", "Afternoon tea on a marble café table"],
  ],
  [
    ["exterior-small", "Hartley's navy storefront"],
    ["company-small", "A spotted dog beside the café banquette"],
  ],
  [
    ["packaging-small", "Hartley's illustrated bags and coffee cups"],
    ["counter", "The café counter and pink and navy seating"],
  ],
];
let scene = 0,
  changing = false,
  heroVisible = true;
const hero = $(".hero");
hero.dataset.scene = "0";
new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting;
}).observe(hero);
async function nextScene() {
  if (changing || reduce.matches || document.hidden || !heroVisible) return;
  changing = true;
  const next = (scene + 1) % scenes.length;
  const overlays = windows.map((window, i) => {
    const img = window.querySelector(".window-reveal");
    img.src = "/previews/hartley/assets/" + scenes[next][i][0] + ".webp";
    return img;
  });
  try {
    await Promise.all(overlays.map(img => img.decode()));
    if (reduce.matches || document.hidden || !heroVisible) return;
    const animations = overlays.map((img, i) =>
      img.animate(
        [
          { clipPath: i ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)" },
          { clipPath: "inset(0)" },
        ],
        {
          duration: 1150,
          delay: i * 140,
          easing: "cubic-bezier(.22,.8,.22,1)",
          fill: "forwards",
        }
      )
    );
    const stop = () => animations.forEach(a => a.finish());
    reduce.addEventListener("change", stop, { once: true });
    await Promise.all(animations.map(a => a.finished));
    reduce.removeEventListener("change", stop);
    windows.forEach((window, i) => {
      const base = window.querySelector(".window-base");
      base.src = overlays[i].src;
      base.alt = scenes[next][i][1];
    });
    // Decode the underlying image before removing the reveal layer.
    await Promise.all(
      windows.map(w => w.querySelector(".window-base").decode())
    );
    animations.forEach(a => a.cancel());
    scene = next;
    hero.dataset.scene = String(scene);
  } catch {
    // Keep the already loaded image if a later photograph is unavailable.
  } finally {
    changing = false;
  }
}
setInterval(nextScene, 5500);

// Print-like buttons with a rolling label. The duplicate is visual only.
function labelButton(button, label) {
  button.setAttribute("aria-label", label);
  const span = button.querySelector("span");
  span.textContent = label;
  span.dataset.label = label;
  span.setAttribute("aria-hidden", "true");
}
$$(".print-button").forEach(button =>
  labelButton(button, button.textContent.trim())
);

// The complete café photographs move as prints; nothing is cropped or opened.
const gallery = $(".visit-gallery");
let galleryVisible = false,
  galleryFrame = 0;
function moveGallery() {
  galleryFrame = 0;
  if (reduce.matches || !galleryVisible) return;
  const r = gallery.getBoundingClientRect();
  const progress = Math.max(
    -1,
    Math.min(1, (innerHeight / 2 - r.top - r.height / 2) / innerHeight)
  );
  gallery.style.setProperty("--drift", (progress * 32).toFixed(1) + "px");
}
new IntersectionObserver(([entry]) => {
  galleryVisible = entry.isIntersecting;
  moveGallery();
}).observe(gallery);
addEventListener(
  "scroll",
  () => {
    if (galleryVisible && !galleryFrame)
      galleryFrame = requestAnimationFrame(moveGallery);
  },
  { passive: true }
);
reduce.addEventListener("change", () => {
  gallery.style.setProperty("--drift", "0px");
  moveGallery();
});
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
  labelButton(
    $("#wrap-button"),
    wrapped ? "Have another peek" : "Wrap it for me"
  );
  $("#parcel-status").textContent = wrapped
    ? "Ready for someone’s very good afternoon."
    : "A little something before the ribbon.";
  $(".parcel-front").setAttribute("aria-hidden", String(wrapped));
  $(".parcel-back").setAttribute("aria-hidden", String(!wrapped));
};
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
