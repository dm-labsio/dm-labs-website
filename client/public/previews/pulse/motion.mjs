/** Native DOM adaptations of SmoothUI Animated Tabs, Magnetic Button and
 * Tilt Card by Eduardo Calvo (MIT). See SOURCES.txt for upstreams/license.
 * Retains tab keyboard logic, magnetic falloff and normalized tilt/glare;
 * uses CSS transitions instead of React/Motion and disables pointer effects
 * on touch devices or when reduced motion is requested. */
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const hover = matchMedia("(hover: hover) and (pointer: fine)");
export function animateTabs(container, onChange) {
  const tabs = [...container.querySelectorAll("[role=tab]")],
    indicator = container.querySelector(".tab-indicator");
  let current = 0;
  function select(index, focus = false) {
    current = index;
    tabs.forEach((t, i) => {
      t.setAttribute("aria-selected", String(i === index));
      t.tabIndex = i === index ? 0 : -1;
    });
    const tab = tabs[index];
    indicator.style.width = tab.offsetWidth + "px";
    indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
    if (focus) tab.focus();
    onChange(index);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft")
        next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(next, true);
    });
  });
  new ResizeObserver(() => {
    const t = tabs[current];
    indicator.style.width = t.offsetWidth + "px";
    indicator.style.transform = `translateX(${t.offsetLeft}px)`;
  }).observe(container);
  select(0);
  return select;
}
export function installPointerEffects() {
  const resets = [];
  document.querySelectorAll("[data-magnetic]").forEach(button => {
    const shell = document.createElement("span");
    shell.className = "magnetic-shell";
    button.before(shell);
    shell.append(button);
    const reset = () => (button.style.transform = "");
    resets.push(reset);
    shell.addEventListener("pointermove", e => {
      if (reduced.matches || !hover.matches || button.disabled) return;
      const r = shell.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2),
        dy = e.clientY - (r.top + r.height / 2),
        distance = Math.hypot(dx, dy),
        radius = 150;
      const factor = Math.max(0, 1 - distance / radius);
      button.style.transform = `translate(${dx * 0.22 * factor}px,${dy * 0.22 * factor}px)`;
    });
    shell.addEventListener("pointerleave", reset);
    button.addEventListener("blur", reset);
  });
  document.querySelectorAll("[data-tilt]").forEach(card => {
    const reset = () => {
      card.style.transform = "";
      card.style.setProperty("--glare", 0);
    };
    resets.push(reset);
    card.addEventListener("pointermove", e => {
      if (reduced.matches || !hover.matches) return;
      const r = card.getBoundingClientRect(),
        x = ((e.clientX - r.left) / r.width) * 2 - 1,
        y = ((e.clientY - r.top) / r.height) * 2 - 1;
      card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.015)`;
      card.style.setProperty("--gx", `${50 + x * 50}%`);
      card.style.setProperty("--gy", `${50 + y * 50}%`);
      card.style.setProperty("--glare", 0.16);
    });
    card.addEventListener("pointerleave", reset);
    card.addEventListener("focus", () => {
      if (!reduced.matches && hover.matches)
        card.style.transform =
          "perspective(900px) rotateX(2deg) rotateY(-2deg)";
    });
    card.addEventListener("blur", reset);
  });
  reduced.addEventListener("change", () => resets.forEach(reset => reset()));
  hover.addEventListener("change", () => resets.forEach(reset => reset()));
}
export function reveal(element) {
  if (!reduced.matches)
    element.animate(
      [
        { opacity: 0.15, transform: "translateY(14px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 330, easing: "cubic-bezier(.2,.7,.2,1)" }
    );
}
