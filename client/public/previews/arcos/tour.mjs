// One authored house. Camera translation never swaps images.
const base = "/media/examples/arcos/house-v1/";
const stops = [
  ["Living space", 185, 330],
  ["Living doorway", 270, 330],
  ["Courtyard", 315, 330],
  ["North courtyard", 320, 295],
  ["Dining doorway", 400, 265],
  ["Dining space", 400, 230],
];
let library, asset;
function engine() {
  return (library ||= import("./vendor/three-0.186.1.mjs").catch(e => {
    library = null;
    throw e;
  }));
}
function model() {
  return (asset ||= fetch(base + "house.glb")
    .then(r => {
      if (!r.ok) throw Error("House unavailable");
      return r.arrayBuffer();
    })
    .catch(e => {
      asset = null;
      throw e;
    }));
}
export function prepareTour() {
  return Promise.all([engine(), model()]);
}
export async function mountTour(dialog, isCurrent = () => dialog.open) {
  const [T, data] = await prepareTour();
  if (!isCurrent()) return () => {};
  const gltf = await new T.GLTFLoader()
      .setMeshoptDecoder(T.MeshoptDecoder)
      .parseAsync(data, base),
    resources = new Set();
  gltf.scene.traverse(o => {
    if (!o.isMesh) return;
    resources.add(o.geometry);
    o.castShadow = o.receiveShadow = true;
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      resources.add(m);
      for (const v of Object.values(m)) if (v?.isTexture) resources.add(v);
    }
  });
  const release = () =>
    resources.forEach(r => {
      if (r.isTexture) r.source?.data?.close?.();
      r.dispose();
    });
  if (!isCurrent()) {
    release();
    return () => {};
  }
  const root = dialog.querySelector("#panorama"),
    stage = dialog.querySelector("#tour-stage"),
    loading = dialog.querySelector("#tour-loading"),
    status = dialog.querySelector("#tour-status"),
    label = dialog.querySelector("#tour-location");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)"),
    abort = new AbortController();
  const listen = (target, event, fn, options = {}) =>
    target.addEventListener(event, fn, { ...options, signal: abort.signal });
  let renderer;
  try {
    renderer = new T.WebGLRenderer({
      antialias: true,
      powerPreference: "default",
    });
  } catch (e) {
    release();
    throw e;
  }
  renderer.setPixelRatio(
    Math.min(devicePixelRatio, innerWidth < 700 ? 1.3 : 1.7)
  );
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  // The building, tree and sun are static: render their shadow map once.
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.domElement.setAttribute("aria-hidden", "true");
  root.replaceChildren(renderer.domElement);
  const scene = new T.Scene();
  scene.background = new T.Color("#dce4e5");
  scene.fog = new T.Fog("#dce4e5", 30, 100);
  scene.add(gltf.scene);
  scene.add(new T.HemisphereLight(0xf4eee1, 0x776b56, 2.4));
  const sun = new T.DirectionalLight(0xffefd8, 3);
  sun.position.set(-7, 12, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -13,
    right: 13,
    top: 13,
    bottom: -13,
    near: 0.1,
    far: 35,
  });
  sun.shadow.normalBias = 0.025;
  sun.shadow.bias = -0.0001;
  scene.add(sun);
  const fill = new T.PointLight(0xffedcf, 8, 9, 2);
  fill.position.set(-4.8, 2.6, -0.5);
  scene.add(fill);
  const ground = new T.Mesh(
    new T.PlaneGeometry(200, 200),
    new T.MeshStandardMaterial({ color: 0x918875, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.27;
  ground.receiveShadow = true;
  scene.add(ground);
  resources.add(ground.geometry);
  resources.add(ground.material);
  for (let i = 0; i < 18; i++) {
    const hill = new T.Mesh(
      new T.SphereGeometry(1, 16, 8),
      new T.MeshStandardMaterial({
        color: i % 2 ? 0x999b83 : 0xa9ad95,
        roughness: 1,
      })
    );
    const a = (i / 18) * Math.PI * 2;
    hill.position.set(Math.cos(a) * 65, -1, Math.sin(a) * 65);
    hill.scale.set(18, 4 + (i % 5), 15);
    scene.add(hill);
    resources.add(hill.geometry);
    resources.add(hill.material);
  }
  const camera = new T.PerspectiveCamera(64, 1, 0.05, 160);
  camera.rotation.order = "YXZ";
  const position = i =>
    new T.Vector3(
      (stops[i][1] - 400) * 0.025,
      1.6,
      (stops[i][2] - 414) * 0.025
    );
  let index = 0,
    yaw = 1.9,
    pitch = -0.14,
    movement = null,
    closed = false,
    dirty = true;
  let lastDraw = 0,
    slowFrames = 0;
  camera.position.copy(position(0));
  const ray = new T.Raycaster(),
    meshes = [];
  gltf.scene.traverse(o => {
    if (o.isMesh) meshes.push(o);
  });
  const markerGeo = new T.RingGeometry(0.14, 0.19, 48),
    markerMat = new T.MeshBasicMaterial({
      color: 0xfffaf0,
      side: T.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    });
  resources.add(markerGeo);
  resources.add(markerMat);
  const markers = [-1, 1].map(delta => {
    const mesh = new T.Mesh(markerGeo, markerMat);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    const button = document.createElement("button");
    button.className = "tour-ground-target";
    button.type = "button";
    button.hidden = true;
    root.append(button);
    listen(button, "click", e => {
      e.stopPropagation();
      moveTo(index + delta);
    });
    return { delta, mesh, button };
  });
  const controls = [
    ...dialog.querySelectorAll("[data-tour-scene],[data-tour-action]"),
  ];
  const record = () => {
    dialog.dataset.view = JSON.stringify({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      yaw,
      pitch,
      stop: index,
    });
    dialog.dataset.scene =
      index < 2 ? "living" : index < 5 ? "courtyard" : "dining";
  };
  function sync() {
    const busy = !!movement;
    stage.setAttribute("aria-busy", String(busy));
    dialog.dataset.tourReady = String(!busy);
    if (busy) stage.dataset.moving = "walking";
    else delete stage.dataset.moving;
    controls.forEach(b => {
      const a = b.dataset.tourAction;
      b.disabled =
        busy ||
        (a === "forward" && index === 5) ||
        (a === "back" && index === 0);
      if (b.dataset.tourScene)
        b.setAttribute(
          "aria-pressed",
          String(
            { living: 0, courtyard: 2, dining: 5 }[b.dataset.tourScene] ===
              index
          )
        );
    });
    label.textContent = stops[index][0];
    dialog
      .querySelector("[data-tour-action=forward]")
      .setAttribute(
        "aria-label",
        index < 5 ? "Walk to " + stops[index + 1][0] : "End of route"
      );
    dialog
      .querySelector("[data-tour-action=back]")
      .setAttribute(
        "aria-label",
        index > 0 ? "Walk back to " + stops[index - 1][0] : "Start of route"
      );
    status.textContent = busy ? "Walking through the house." : stops[index][0];
    record();
    dirty = true;
  }
  function moveTo(target, frameDestination = false) {
    if (movement || target === index || target < 0 || target > 5) return;
    const step = target > index ? 1 : -1,
      route = [];
    for (let i = index + step; ; i += step) {
      route.push(position(i));
      if (i === target) break;
    }
    if (reduced.matches) {
      camera.position.copy(position(target));
      if (frameDestination) yaw = target === 5 ? 0 : 1.9;
      index = target;
      sync();
      return;
    }
    movement = {
      points: [camera.position.clone(), ...route],
      target,
      started: performance.now(),
      initialYaw: yaw,
      finalYaw: frameDestination ? (target === 5 ? 0 : 1.9) : yaw,
    };
    movement.lengths = movement.points
      .slice(1)
      .map((p, i) => p.distanceTo(movement.points[i]));
    movement.total = movement.lengths.reduce((a, b) => a + b, 0);
    movement.duration = Math.max(650, (movement.total / 1.8) * 1000);
    sync();
  }
  function action(a) {
    if (movement) return;
    if (a === "forward") moveTo(index + 1);
    if (a === "back") moveTo(index - 1);
    if (a === "left") yaw -= Math.PI / 6;
    if (a === "right") yaw += Math.PI / 6;
    if (a === "in" || a === "out") {
      camera.fov = T.MathUtils.clamp(
        camera.fov + (a === "in" ? -5 : 5),
        45,
        80
      );
      camera.updateProjectionMatrix();
    }
    if (a === "reset") {
      yaw = 1.9;
      pitch = -0.14;
      camera.fov = 64;
      camera.updateProjectionMatrix();
    }
    record();
    dirty = true;
  }
  controls.forEach(b =>
    listen(b, "click", () =>
      b.dataset.tourScene
        ? moveTo(
            { living: 0, courtyard: 2, dining: 5 }[b.dataset.tourScene],
            true
          )
        : action(b.dataset.tourAction)
    )
  );
  let pointer = null;
  listen(root, "pointerdown", e => {
    if (e.target !== renderer.domElement || movement) return;
    pointer = { id: e.pointerId, x: e.clientX, y: e.clientY, yaw, pitch };
    root.setPointerCapture(e.pointerId);
  });
  listen(root, "pointermove", e => {
    if (!pointer || pointer.id !== e.pointerId) return;
    yaw = pointer.yaw - (e.clientX - pointer.x) * 0.004;
    pitch = T.MathUtils.clamp(
      pointer.pitch + (e.clientY - pointer.y) * 0.003,
      -1.35,
      1.35
    );
    record();
    dirty = true;
  });
  for (const event of ["pointerup", "pointercancel", "lostpointercapture"])
    listen(root, event, () => {
      pointer = null;
    });
  listen(root, "keydown", e => {
    const a = {
      ArrowUp: "forward",
      ArrowDown: "back",
      ArrowLeft: "left",
      ArrowRight: "right",
      "+": "in",
      "=": "in",
      "-": "out",
      Home: "reset",
    }[e.key];
    if (a) {
      e.preventDefault();
      action(a);
    }
  });
  listen(reduced, "change", () => {
    if (movement && reduced.matches) {
      camera.position.copy(position(movement.target));
      yaw = movement.finalYaw;
      index = movement.target;
      movement = null;
      sync();
    }
  });
  listen(renderer.domElement, "webglcontextlost", e => {
    e.preventDefault();
    loading.hidden = false;
    loading.querySelector("span").textContent =
      "The 3D view was interrupted. Reopen the tour to continue.";
  });
  const dot = dialog.querySelector("#tour-map-dot"),
    resize = new ResizeObserver(() => {
      if (!root.clientWidth || !root.clientHeight) return;
      camera.aspect = root.clientWidth / root.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(root.clientWidth, root.clientHeight);

      dirty = true;
    });
  resize.observe(root);
  const project = new T.Vector3(),
    direction = new T.Vector3();
  function frame(now) {
    if (closed || !dialog.open) return;
    if (movement) {
      const t = Math.min(1, (now - movement.started) / movement.duration);
      const eased = t * t * (3 - 2 * t);
      const angle = Math.atan2(
        Math.sin(movement.finalYaw - movement.initialYaw),
        Math.cos(movement.finalYaw - movement.initialYaw)
      );
      yaw = movement.initialYaw + angle * eased;
      let distance = eased * movement.total;
      for (let j = 0; j < movement.lengths.length; j++) {
        const len = movement.lengths[j];
        if (distance <= len || j === movement.lengths.length - 1) {
          camera.position.lerpVectors(
            movement.points[j],
            movement.points[j + 1],
            Math.min(1, distance / len)
          );
          break;
        }
        distance -= len;
      }
      if (t === 1) {
        index = movement.target;
        movement = null;
        sync();
      }
      record();
      dirty = true;
    }
    if (dirty && !document.hidden) {
      // Adapt to sustained rendering pressure, including software WebGL and older phones.
      // Leave capable devices at their original resolution; keep the same geometry/route.
      const interval = now - lastDraw;
      if ((movement || pointer) && lastDraw && interval < 1000) {
        slowFrames = interval > 45 ? slowFrames + 1 : 0;
        if (slowFrames >= 2 && renderer.getPixelRatio() > 0.4) {
          renderer.setPixelRatio(Math.max(0.4, renderer.getPixelRatio() * 0.7));
          renderer.setSize(root.clientWidth, root.clientHeight);
          slowFrames = 0;
        }
      }
      lastDraw = now;
      camera.rotation.set(pitch, -yaw, 0);
      camera.updateMatrixWorld();
      gltf.scene.updateMatrixWorld(true);
      markers.forEach(m => {
        const target = index + m.delta;
        m.mesh.visible = false;
        m.button.hidden = true;
        if (movement || target < 0 || target > 5) return;
        const world = position(target);
        world.y = 0.055;
        direction.subVectors(world, camera.position);
        const distance = direction.length();
        direction.normalize();
        ray.set(camera.position, direction);
        const hit = ray.intersectObjects(meshes, false)[0];
        if (hit && hit.distance < distance - 0.22) return;
        project.copy(world).project(camera);
        if (
          project.z > 1 ||
          project.z < 0 ||
          Math.abs(project.x) > 0.95 ||
          Math.abs(project.y) > 0.95
        )
          return;
        m.mesh.position.copy(world);
        m.mesh.visible = true;
        m.button.hidden = false;
        m.button.style.left = (project.x * 0.5 + 0.5) * root.clientWidth + "px";
        m.button.style.top =
          (-project.y * 0.5 + 0.5) * root.clientHeight + "px";
        m.button.setAttribute("aria-label", "Walk to " + stops[target][0]);
      });
      dot.setAttribute("cx", camera.position.x / 0.025 + 400);
      dot.setAttribute("cy", camera.position.z / 0.025 + 414);
      renderer.render(scene, camera);
      dirty = false;
    }
  }
  listen(document, "visibilitychange", () => {
    dirty = true;
  });
  renderer.setAnimationLoop(frame);
  loading.hidden = true;
  dialog.dataset.engine = "3d";
  sync();
  root.focus({ preventScroll: true });
  return () => {
    closed = true;
    abort.abort();
    resize.disconnect();
    renderer.setAnimationLoop(null);
    sun.shadow.map?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    release();
    root.replaceChildren();
    delete dialog.dataset.engine;
    delete dialog.dataset.view;
    delete stage.dataset.moving;
    dialog.dataset.tourReady = "false";
  };
}
