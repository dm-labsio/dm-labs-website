const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
// Original adaptation of Fancy Components' Text Rotate / Parallax Floating.
const hero = $(".hero");
const heroWord = $("#hero-word");
const heroWords = ["coffee.", "cake.", "company."];
let wordIndex = 0,
  heroVisible = true,
  wordBusy = false;
hero.dataset.scene = "0";
new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting;
  hero.classList.toggle("is-visible", heroVisible);
}).observe(hero);
function wordLayer(word) {
  const span = document.createElement("span");
  span.className = "hero-word-layer";
  span.textContent = word;
  return span;
}
function writeWord(word) {
  heroWord.replaceChildren(wordLayer(word));
}
writeWord(heroWords[0]);
let wordAnimations = [];
async function rotateWord() {
  if (reduce.matches || document.hidden || !heroVisible || wordBusy) return;
  wordBusy = true;
  const nextIndex = (wordIndex + 1) % heroWords.length;
  const outgoing = heroWord.firstElementChild;
  const incoming = wordLayer(heroWords[nextIndex]);
  heroWord.append(incoming);
  try {
    // Shared grid cell keeps the heading still. Both words move together,
    // so there is no empty beat, character jitter or width snap on phones.
    const timing = {
      duration: 950,
      easing: "cubic-bezier(.4,0,.2,1)",
      fill: "both",
    };
    wordAnimations = [
      outgoing.animate(
        [
          { transform: "translateY(0)", opacity: 1 },
          { transform: "translateY(-24%)", opacity: 0 },
        ],
        timing
      ),
      incoming.animate(
        [
          { transform: "translateY(24%)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        timing
      ),
    ];
    await Promise.all(wordAnimations.map(a => a.finished));
    wordIndex = nextIndex;
    outgoing.remove();
    wordAnimations.forEach(a => a.cancel());
    hero.dataset.scene = String(wordIndex);
  } catch {
    /* Reduced motion can cancel an in-flight transition. */
  } finally {
    wordAnimations = [];
    wordBusy = false;
  }
}
setInterval(rotateWord, 3800);
const pieces = $$(".floating-piece");
const entranceAnimations = reduce.matches
  ? []
  : [
      ...pieces.map((piece, i) =>
        piece.animate(
          [
            { opacity: 0, transform: "translateY(35px) scale(.72)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          {
            duration: 1000,
            delay: i * 80,
            fill: "backwards",
            easing: "cubic-bezier(.16,1,.3,1)",
          }
        )
      ),
      heroWord.firstElementChild.animate(
        [
          { transform: "translateY(24%)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        {
          duration: 950,
          delay: 180,
          fill: "backwards",
          easing: "cubic-bezier(.16,1,.3,1)",
        }
      ),
    ];
let pointerFrame = 0,
  pointerX = 0,
  pointerY = 0;
function floatArt() {
  pointerFrame = 0;
  if (reduce.matches || !heroVisible) return;
  pieces.forEach(piece => {
    const depth = Number(piece.dataset.depth);
    piece.style.setProperty("--px", `${pointerX * depth * 32}px`);
    piece.style.setProperty("--py", `${pointerY * depth * 24}px`);
  });
}
hero.addEventListener(
  "pointermove",
  event => {
    const r = hero.getBoundingClientRect();
    pointerX = (event.clientX - r.left) / r.width - 0.5;
    pointerY = (event.clientY - r.top) / r.height - 0.5;
    if (!pointerFrame) pointerFrame = requestAnimationFrame(floatArt);
  },
  { passive: true }
);
hero.addEventListener("pointerleave", () => {
  pointerX = pointerY = 0;
  floatArt();
});
reduce.addEventListener("change", () => {
  if (!reduce.matches) return;
  wordAnimations.forEach(a => a.cancel());
  entranceAnimations.forEach(a => a.cancel());
  writeWord(heroWords[wordIndex]);
  pieces.forEach(p => {
    p.style.setProperty("--px", "0px");
    p.style.setProperty("--py", "0px");
  });
});

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
  if (!reduce.matches)
    $("#menu-photo").animate(
      [
        { opacity: 0.4, transform: "translateX(-18px) scale(1.03)" },
        { opacity: 1, transform: "translateX(0) scale(1)" },
      ],
      { duration: 500, easing: "ease-out" }
    );
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
  breakfast: {
    name: "A proper classic.",
    detail:
      "Full-bodied and reassuring. Lovely with a warm scone, a spoon of jam and a little clotted cream.",
    character: "Rich & malty",
    partner: "Scones, jam & cream",
    caption: "English Breakfast & warm scones",
    alt: "English Breakfast tea with a warm scone, clotted cream and strawberry jam",
  },
  grey: {
    name: "A little more fragrant.",
    detail:
      "Bergamot, bright citrus and a gentle finish. Just the thing with a slice of lemon drizzle cake.",
    character: "Citrus & floral",
    partner: "Lemon drizzle cake",
    caption: "Earl Grey & lemon drizzle",
    alt: "Earl Grey tea beside lemon drizzle cake and fresh bergamot",
  },
  mint: {
    name: "Something a little lighter.",
    detail:
      "Fresh mint, naturally caffeine-free. A bright partner for cucumber sandwiches and a long conversation.",
    character: "Fresh & caffeine-free",
    partner: "Cucumber sandwiches",
    caption: "Garden Mint & cucumber sandwiches",
    alt: "Fresh mint infusion in a glass cup beside cucumber finger sandwiches",
  },
};
const teaImages = new Map();
function loadTea(key) {
  if (!teaImages.has(key)) {
    const img = new Image();
    img.src = `/previews/hartley/assets/tea-${key}.webp`;
    teaImages.set(key, img);
  }
  return teaImages.get(key);
}
const teaObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) return;
    Object.keys(teas).forEach(loadTea);
    teaObserver.disconnect();
  },
  { rootMargin: "400px" }
);
teaObserver.observe($("#tea"));
let teaRequest = 0;
let teaMotion = [];
async function chooseTea(key) {
  const request = ++teaRequest;
  const data = teas[key];
  $$("[data-tea]").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.tea === key))
  );
  const photo = loadTea(key);
  try {
    await photo.decode();
  } catch {
    if (request === teaRequest)
      $$("[data-tea]").forEach(b =>
        b.setAttribute(
          "aria-pressed",
          String(b.dataset.tea === $(".tea-visual").dataset.selection)
        )
      );
    return;
  }
  if (request !== teaRequest) return;
  teaMotion.forEach(a => a.cancel());
  $("#tea-photo").src = photo.src;
  $("#tea-photo").alt = data.alt;
  $(".tea-visual").dataset.selection = key;
  $("#tea-name").textContent = data.name;
  $("#tea-detail").textContent = data.detail;
  $("#tea-character").textContent = data.character;
  $("#tea-partner").textContent = data.partner;
  $("#tea-photo-label").textContent = data.caption;
  if (innerWidth <= 600) {
    const photoBounds = $(".tea-visual").getBoundingClientRect();
    if (photoBounds.bottom > innerHeight || photoBounds.top < 0)
      $(".tea-picker").scrollIntoView({
        block: "start",
        behavior: reduce.matches ? "instant" : "smooth",
      });
  }
  if (!reduce.matches)
    teaMotion = [
      $("#tea-photo").animate(
        [
          { opacity: 0.25, transform: "scale(1.045)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 550, easing: "cubic-bezier(.22,.8,.22,1)" }
      ),
      $("#tea-pairing").animate(
        [
          { opacity: 0.3, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 400, easing: "ease-out" }
      ),
    ];
}
$$("[data-tea]").forEach(b => (b.onclick = () => chooseTea(b.dataset.tea)));
reduce.addEventListener("change", () => {
  if (reduce.matches) teaMotion.forEach(a => a.cancel());
});
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
