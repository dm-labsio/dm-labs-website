/**
 * Native DOM adaptation of SmoothUI Hover Expand by Eduardo Calvo (MIT).
 * Source: https://smoothui.dev/r/hover-expand.json, discovered on 21st.dev.
 * Retains active-panel flex expansion, hover/focus selection and keyboard
 * movement. Adds an equal-panel resting state, contact-sheet mode, and a
 * two-column touch layout. License retained in SOURCES.txt.
 */
export function hoverExpand(container) {
  const panels = [...container.querySelectorAll(".hair-panel")];
  const hover = matchMedia(
    "(hover: hover) and (pointer: fine) and (min-width: 701px)"
  );
  function setActive(index) {
    panels.forEach((panel, i) =>
      panel.classList.toggle("is-active", hover.matches && i === index)
    );
  }
  panels.forEach((panel, index) => {
    panel.addEventListener("pointerenter", () => {
      if (hover.matches) setActive(index);
    });
    panel.addEventListener("focus", () => setActive(index));
    panel.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight")
        next = Math.min(index + 1, panels.length - 1);
      if (event.key === "ArrowLeft") next = Math.max(index - 1, 0);
      if (next !== undefined) {
        event.preventDefault();
        setActive(next);
        panels[next].focus();
      }
    });
  });
  container.addEventListener("pointerleave", () => {
    if (!container.contains(document.activeElement)) setActive(-1);
  });
  container.addEventListener("focusout", event => {
    if (!container.contains(event.relatedTarget)) setActive(-1);
  });
  hover.addEventListener("change", () => setActive(-1));
}
