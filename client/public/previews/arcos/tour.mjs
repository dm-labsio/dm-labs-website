// Pannellum is local, version-pinned, and loaded only after opening the tour.
const media = "/media/examples/arcos/";
const scenes = {
  living: {
    name: "Living space",
    file: "tour-living.webp",
    yaw: 0,
    target: "courtyard",
    link: { yaw: 0, pitch: -23 },
    linkLabel: "Step into the courtyard",
  },
  courtyard: {
    name: "Courtyard",
    file: "tour-courtyard.webp",
    yaw: -14,
    target: "living",
    link: { yaw: -20, pitch: -22 },
    linkLabel: "Enter the living space",
  },
};
let library;
function loadLibrary() {
  if (!library)
    library = Promise.all([
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/previews/arcos/vendor/pannellum-2.5.7.js";
        script.onload = () => resolve(window.pannellum);
        script.onerror = () => {
          script.remove();
          reject(new Error("Viewer unavailable"));
        };
        document.head.append(script);
      }),
      new Promise((resolve, reject) => {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "/previews/arcos/vendor/pannellum-2.5.7.css";
        css.onload = resolve;
        css.onerror = () => {
          css.remove();
          reject(new Error("Styles unavailable"));
        };
        document.head.append(css);
      }),
    ])
      .then(([api]) => api)
      .catch(e => {
        library = null;
        throw e;
      });
  return library;
}
const imageCache = new Map();
function prepareImage(key) {
  if (!imageCache.has(key)) {
    const image = new Image();
    image.src = media + scenes[key].file;
    let timeout;
    const loaded = Promise.race([
      image.decode(),
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new Error("Image timed out")), 15000);
      }),
    ])
      .finally(() => clearTimeout(timeout))
      .then(() => image)
      .catch(error => {
        imageCache.delete(key);
        throw error;
      });
    imageCache.set(key, loaded);
  }
  return imageCache.get(key);
}
export function prepareTour() {
  return Promise.all([loadLibrary(), ...Object.keys(scenes).map(prepareImage)]);
}
export async function mountTour(dialog) {
  const P = await loadLibrary();
  const root = dialog.querySelector("#panorama"),
    loading = dialog.querySelector("#tour-loading");
  const stage = dialog.querySelector("#tour-stage"),
    retry = dialog.querySelector("#retry-tour");
  const status = dialog.querySelector("#tour-status");
  const transition = dialog.querySelector("#tour-transition");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const abort = new AbortController();
  const buttons = [
    ...dialog.querySelectorAll("[data-tour-scene],[data-tour-action]"),
  ];
  let viewer = null,
    current = "living",
    destroyed = false,
    journey = 0,
    travelTimer = null,
    blend = null;
  function busy(value) {
    stage.setAttribute("aria-busy", String(value));
    buttons.forEach(
      b =>
        (b.disabled =
          value ||
          (b.dataset.tourAction === "forward" && current === "courtyard") ||
          (b.dataset.tourAction === "back" && current === "living"))
    );
    root.querySelectorAll(".tour-hotspot").forEach(b => (b.disabled = value));
  }
  function showError() {
    if (destroyed) return;
    transition.hidden = true;
    blend?.cancel();
    delete stage.dataset.moving;
    busy(false);
    loading.hidden = false;
    retry.hidden = false;
    loading.querySelector("span").textContent =
      "This view could not load. Please try again.";
    dialog.dataset.tourReady = "false";
  }
  function changing(key) {
    current = key;
    busy(true);
    loading.hidden = false;
    retry.hidden = true;
    dialog.dataset.tourReady = "false";
    loading.querySelector("span").textContent =
      "Opening the " + scenes[key].name.toLowerCase() + "…";
  }
  async function switchScene(key) {
    if (
      destroyed ||
      !scenes[key] ||
      key === current ||
      stage.getAttribute("aria-busy") === "true"
    )
      return;
    const token = ++journey,
      departure = scenes[current];
    busy(true);
    dialog.dataset.tourReady = "false";
    stage.dataset.moving = "preparing";
    status.textContent =
      "Moving to the " + scenes[key].name.toLowerCase() + ".";
    try {
      await prepareImage(key);
      if (destroyed || token !== journey) return;
      const arrive = () => {
        if (destroyed || token !== journey) return;
        if (!reduced.matches) {
          const rad = Math.PI / 180;
          transition.src = viewer
            .getRenderer()
            .render(
              viewer.getPitch() * rad,
              viewer.getYaw() * rad,
              viewer.getHfov() * rad,
              { returnImage: true }
            );
          transition.hidden = false;
        }
        current = key;
        stage.dataset.moving = "arriving";
        viewer.loadScene(
          key,
          0,
          scenes[key].yaw,
          initialFov() * (reduced.matches ? 1 : 1.12)
        );
      };
      if (reduced.matches) arrive();
      else {
        stage.dataset.moving = "walking";
        viewer.lookAt(
          -3,
          departure.link.yaw,
          Math.max(45, viewer.getHfov() * 0.75),
          600
        );
        travelTimer = setTimeout(arrive, 620);
      }
    } catch {
      if (!destroyed && token === journey) {
        current = key;
        showError();
      }
    }
  }
  function initialFov() {
    return root.clientWidth < 600 ? 58 : 90;
  }
  function start() {
    journey++;
    clearTimeout(travelTimer);
    blend?.cancel();
    transition.hidden = true;
    delete stage.dataset.moving;
    viewer?.destroy();
    changing(current);
    const config = {};
    for (const [key, scene] of Object.entries(scenes)) {
      config[key] = {
        panorama: media + scene.file,
        yaw: scene.yaw,
        hotSpots: [
          {
            ...scene.link,
            cssClass: "arcos-hotspot-anchor",
            createTooltipFunc: el => {
              const b = document.createElement("button");
              b.className = "tour-hotspot";
              b.setAttribute("aria-label", scene.linkLabel);
              b.title = scene.linkLabel;
              b.innerHTML =
                '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 30L24 16L38 30M10 39L24 25L38 39"/></svg>';
              b.addEventListener("click", () => switchScene(scene.target), {
                signal: abort.signal,
              });
              el.append(b);
            },
          },
        ],
      };
    }
    // Generated views are treated as partial panoramas. The constrained projection
    // avoids fabricating a seamless rear view or misrepresenting a measured scan.
    viewer = P.viewer(root, {
      default: {
        firstScene: current,
        type: "equirectangular",
        autoLoad: true,
        showControls: false,
        haov: 180,
        vaov: 90,
        hfov: initialFov(),
        minHfov: 45,
        maxHfov: 100,
        minYaw: -88,
        maxYaw: 88,
        minPitch: -43,
        maxPitch: 43,
        avoidShowingBackground: true,
        mouseZoom: false,
        disableKeyboardCtrl: true,
        keyboardZoom: false,
        orientationOnByDefault: false,
        friction: reduced.matches ? 1 : 0.3,
        sceneFadeDuration: 0,
        escapeHTML: true,
      },
      scenes: config,
    });
    viewer.on("load", () => {
      if (destroyed) return;
      loading.hidden = true;
      const token = journey;
      function settled() {
        if (destroyed || token !== journey) return;
        transition.hidden = true;
        delete stage.dataset.moving;
        busy(false);
        dialog.dataset.scene = current;
        dialog.dataset.tourReady = "true";
        dialog
          .querySelectorAll("[data-tour-scene]")
          .forEach(b =>
            b.setAttribute(
              "aria-pressed",
              String(b.dataset.tourScene === current)
            )
          );
        status.textContent = scenes[current].name;
        root.focus({ preventScroll: true });
        recordView();
        prepareImage(scenes[current].target).catch(() => {});
      }
      if (!transition.hidden && !reduced.matches) {
        viewer.lookAt(0, scenes[current].yaw, initialFov(), 400);
        blend = transition.animate(
          [
            { opacity: 1, transform: "scale(1)", filter: "blur(0px)" },
            { opacity: 0, transform: "scale(1.2)", filter: "blur(2px)" },
          ],
          { duration: 400, easing: "cubic-bezier(.2,.7,.2,1)" }
        );
        blend.finished.then(settled).catch(() => {});
      } else settled();
    });
    viewer.on("error", showError);
    viewer.on("animatefinished", recordView);
    viewer.on("mouseup", () => requestAnimationFrame(recordView));
    viewer.on("touchend", () => requestAnimationFrame(recordView));
  }
  function recordView() {
    if (!viewer || destroyed) return;
    dialog.dataset.view = JSON.stringify({
      yaw: viewer.getYaw(),
      pitch: viewer.getPitch(),
      fov: viewer.getHfov(),
    });
  }
  function adjust(action) {
    if (!viewer || stage.getAttribute("aria-busy") === "true") return;
    if (action === "forward") {
      switchScene("courtyard");
      return;
    }
    if (action === "back") {
      switchScene("living");
      return;
    }
    if (action === "left")
      viewer.setYaw(viewer.getYaw() - 18, reduced.matches ? false : 260);
    if (action === "right")
      viewer.setYaw(viewer.getYaw() + 18, reduced.matches ? false : 260);
    if (action === "in") viewer.setHfov(viewer.getHfov() - 8, false);
    if (action === "out") viewer.setHfov(viewer.getHfov() + 8, false);
    if (action === "up") viewer.setPitch(viewer.getPitch() + 8, false);
    if (action === "down") viewer.setPitch(viewer.getPitch() - 8, false);
    if (action === "reset")
      viewer.lookAt(0, scenes[current].yaw, initialFov(), false);
    recordView();
  }
  dialog.querySelectorAll("[data-tour-scene]").forEach(b =>
    b.addEventListener("click", () => switchScene(b.dataset.tourScene), {
      signal: abort.signal,
    })
  );
  dialog.querySelectorAll("[data-tour-action]").forEach(b =>
    b.addEventListener("click", () => adjust(b.dataset.tourAction), {
      signal: abort.signal,
    })
  );
  root.addEventListener(
    "keydown",
    e => {
      if (e.target !== root) return;
      const action = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "forward",
        ArrowDown: "back",
        "+": "in",
        "=": "in",
        "-": "out",
        Home: "reset",
      }[e.key];
      if (action) {
        e.preventDefault();
        adjust(action);
      }
    },
    { signal: abort.signal }
  );
  retry.addEventListener("click", start, { signal: abort.signal });
  // Changing motion preferences also removes drag inertia and transition fades.
  reduced.addEventListener("change", start, { signal: abort.signal });
  start();
  return () => {
    destroyed = true;
    journey++;
    clearTimeout(travelTimer);
    blend?.cancel();
    transition.hidden = true;
    transition.removeAttribute("src");
    delete stage.dataset.moving;
    abort.abort();
    viewer?.destroy();
    viewer = null;
    delete dialog.dataset.tourReady;
    delete dialog.dataset.scene;
    delete dialog.dataset.view;
    busy(false);
    loading.hidden = false;
    retry.hidden = true;
  };
}
