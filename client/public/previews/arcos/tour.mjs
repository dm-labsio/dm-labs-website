// Pannellum is local, version-pinned, and loaded only after opening the tour.
const media = "/media/examples/arcos/";
const scenes = {
  living: {
    name: "Living space",
    file: "tour-living.webp",
    yaw: 0,
    target: "courtyard",
    link: { yaw: 0, pitch: -10 },
    linkLabel: "Step into the courtyard",
  },
  courtyard: {
    name: "Courtyard",
    file: "tour-courtyard.webp",
    yaw: -14,
    target: "living",
    link: { yaw: -20, pitch: -3 },
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
export async function mountTour(dialog) {
  const P = await loadLibrary();
  const root = dialog.querySelector("#panorama"),
    loading = dialog.querySelector("#tour-loading");
  const stage = dialog.querySelector("#tour-stage"),
    retry = dialog.querySelector("#retry-tour");
  const status = dialog.querySelector("#tour-status");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const abort = new AbortController();
  const buttons = [
    ...dialog.querySelectorAll("[data-tour-scene],[data-tour-action]"),
  ];
  let viewer = null,
    current = "living",
    destroyed = false;
  function busy(value) {
    stage.setAttribute("aria-busy", String(value));
    buttons.forEach(b => (b.disabled = value));
  }
  function showError() {
    if (destroyed) return;
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
  function switchScene(key) {
    if (destroyed || !scenes[key] || stage.getAttribute("aria-busy") === "true")
      return;
    changing(key);
    viewer.loadScene(key, 0, scenes[key].yaw, initialFov());
  }
  function initialFov() {
    return root.clientWidth < 600 ? 58 : 90;
  }
  function start() {
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
              b.textContent = scene.linkLabel;
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
        sceneFadeDuration: reduced.matches ? 0 : 350,
        escapeHTML: true,
      },
      scenes: config,
    });
    viewer.on("load", () => {
      if (destroyed) return;
      busy(false);
      loading.hidden = true;
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
      status.textContent =
        scenes[current].name +
        ". " +
        scenes[current].linkLabel +
        " to continue.";
      root.focus({ preventScroll: true });
      recordView();
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
    if (action === "left") viewer.setYaw(viewer.getYaw() - 12, false);
    if (action === "right") viewer.setYaw(viewer.getYaw() + 12, false);
    if (action === "in") viewer.setHfov(viewer.getHfov() - 8, false);
    if (action === "out") viewer.setHfov(viewer.getHfov() + 8, false);
    if (action === "up") viewer.setPitch(viewer.getPitch() + 8, false);
    if (action === "down") viewer.setPitch(viewer.getPitch() - 8, false);
    if (action === "reset")
      viewer.lookAt(0, scenes[current].yaw, initialFov(), false);
    recordView();
  }
  dialog
    .querySelectorAll("[data-tour-scene]")
    .forEach(b =>
      b.addEventListener("click", () => switchScene(b.dataset.tourScene), {
        signal: abort.signal,
      })
    );
  dialog
    .querySelectorAll("[data-tour-action]")
    .forEach(b =>
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
        ArrowUp: "up",
        ArrowDown: "down",
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
