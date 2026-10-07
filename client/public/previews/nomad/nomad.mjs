import { makeRecipe } from "./recipes.mjs";
const menu = {
  hot: {
    note: "The everyday favourites. Oat milk available.",
    items: [
      ["Espresso", "Small cup. Full character.", "€2.80"],
      ["Flat white", "A double shot, silky milk, no fuss.", "€3.80"],
      ["Long black", "Espresso with hot water. Clean and bold.", "€3.20"],
      ["Batch brew", "A longer cup, brewed for easy drinking.", "€3.50"],
    ],
  },
  cold: {
    note: "Made for long afternoons and a little Cyprus sunshine.",
    items: [
      ["Freddo espresso", "Shaken espresso, poured over ice.", "€3.50"],
      [
        "Iced flat white",
        "A double shot and cold milk. Oat milk available.",
        "€4.00",
      ],
      [
        "Espresso tonic",
        "Espresso, tonic, ice and a slice of orange.",
        "€4.50",
      ],
      ["Cold brew", "Slow-steeped coffee. Served straight over ice.", "€4.00"],
    ],
  },
  food: {
    note: "A little something alongside your coffee.",
    items: [
      ["Butter croissant", "Flaky pastry. Best with a flat white.", "€3.20"],
      ["Tahini cookie", "Sesame, brown sugar and a pinch of salt.", "€2.50"],
      ["Banana bread", "A thick slice, toasted if you like.", "€3.80"],
      ["Tomato toast", "Sourdough, ripe tomato and olive oil.", "€5.50"],
    ],
  },
};
function animateChange(element) {
  element.classList.remove("content-change");
  requestAnimationFrame(() => element.classList.add("content-change"));
}
document.querySelectorAll("[data-category]").forEach(button =>
  button.addEventListener("click", () => {
    const category = menu[button.dataset.category];
    if (!category) return;
    document
      .querySelectorAll("[data-category]")
      .forEach(item =>
        item.setAttribute("aria-pressed", String(item === button))
      );
    const content = document.getElementById("menu-content");
    const note = document.createElement("p");
    note.className = "menu-note";
    note.textContent = category.note;
    const list = document.createElement("dl");
    list.className = "menu-items";
    for (const [name, description, price] of category.items) {
      const row = document.createElement("div");
      const title = document.createElement("dt");
      title.append(document.createTextNode(name));
      const detail = document.createElement("span");
      detail.textContent = description;
      title.append(detail);
      const value = document.createElement("dd");
      value.textContent = price;
      row.append(title, value);
      list.append(row);
    }
    content.replaceChildren(note, list);
    animateChange(content);
  })
);
let method = "filter";
const dose = document.getElementById("dose");
function updateRecipe() {
  const recipe = makeRecipe(method, dose.value);
  document.getElementById("dose-value").textContent = `${recipe.dose} g`;
  const water = document.getElementById("water");
  water.replaceChildren(document.createTextNode(recipe.water));
  const unit = document.createElement("span");
  unit.textContent = "g";
  water.append(unit);
  document.getElementById("second-label").textContent = recipe.ice
    ? "Ice"
    : "Brew time";
  const second = document.getElementById("second-value");
  second.replaceChildren(document.createTextNode(recipe.ice || recipe.time));
  const secondUnit = document.createElement("span");
  secondUnit.textContent = recipe.ice ? "g" : "min";
  second.append(secondUnit);
  document.getElementById("recipe-detail").textContent = recipe.detail;
}
dose.addEventListener("input", updateRecipe);
document.querySelectorAll("[data-method]").forEach(button =>
  button.addEventListener("click", () => {
    method = button.dataset.method;
    document
      .querySelectorAll("[data-method]")
      .forEach(item =>
        item.setAttribute("aria-pressed", String(item === button))
      );
    updateRecipe();
    animateChange(document.getElementById("recipe"));
  })
);
const film = document.querySelector(".film");
const video = document.getElementById("coffee-film");
film.addEventListener("toggle", () => {
  if (film.open) {
    if (!video.hasAttribute("src")) video.src = video.dataset.src;
  } else video.pause();
});
// Anchor navigation works inside the gallery iframe without creating parent history entries.
document.addEventListener(
  "click",
  event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    if (link.classList.contains("skip")) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  },
  true
);
