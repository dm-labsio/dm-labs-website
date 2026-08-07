import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

const PARTICLE_POSITIONS = [
  [-1.25, 0.55, 0.35], [1.18, 0.72, -0.15], [1.32, -0.42, 0.22],
  [-1.04, -0.8, -0.18], [0.35, 1.38, 0.1], [-0.4, -1.35, 0.15],
  [0.9, 1.08, 0.45], [-1.35, -0.08, 0.28], [0.2, -1.55, -0.05],
  [1.5, 0.08, -0.22], [-0.7, 1.35, -0.28], [0.72, -1.28, 0.32],
];

function createTooth() {
  const tooth = new THREE.Group();
  const enamel = new THREE.MeshPhysicalMaterial({ color: 0xf7ffff, roughness: 0.18, metalness: 0, clearcoat: 0.85, clearcoatRoughness: 0.16 });
  const toothShape = new THREE.Shape();
  toothShape.moveTo(0, -1.62);
  toothShape.bezierCurveTo(-0.24, -1.5, -0.38, -1.12, -0.34, -0.68);
  toothShape.bezierCurveTo(-0.3, -0.25, -0.8, 0.2, -0.72, 0.78);
  toothShape.bezierCurveTo(-0.68, 1.14, -0.43, 1.34, -0.18, 1.16);
  toothShape.bezierCurveTo(-0.07, 1.08, 0.07, 1.08, 0.18, 1.16);
  toothShape.bezierCurveTo(0.43, 1.34, 0.68, 1.14, 0.72, 0.78);
  toothShape.bezierCurveTo(0.8, 0.2, 0.3, -0.25, 0.34, -0.68);
  toothShape.bezierCurveTo(0.38, -1.12, 0.24, -1.5, 0, -1.62);

  const toothGeometry = new THREE.ExtrudeGeometry(toothShape, {
    depth: 0.56,
    bevelEnabled: true,
    bevelThickness: 0.18,
    bevelSize: 0.14,
    bevelSegments: 7,
    curveSegments: 40,
  });
  toothGeometry.center();
  const crown = new THREE.Mesh(toothGeometry, enamel);
  crown.scale.set(0.94, 0.94, 0.94);
  crown.rotation.x = -0.08;
  tooth.add(crown);

  const highlight = new THREE.Mesh(new THREE.SphereGeometry(0.19, 24, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.58 }));
  highlight.scale.set(0.5, 1.6, 0.18);
  highlight.position.set(-0.22, 0.42, 0.44);
  tooth.add(highlight);
  tooth.scale.setScalar(1.1);
  return tooth;
}

export function mountToothGravityScene(host, { interactionTarget = host, reducedMotion = false, onStateChange } = {}) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.05, 5.1);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block;pointer-events:none;";
  host.replaceChildren(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);
  const tooth = createTooth();
  group.add(tooth);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x63b8b7, transparent: true, opacity: 0.42 });
  const rings = new THREE.Group();
  const ringSpecs = [[1.48, 0.015, 0.2, 0.35], [1.13, -0.28, 0.65, -0.18], [0.82, 0.46, -0.5, 0.22]];
  for (const [radius, rx, ry, rz] of ringSpecs) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 72), ringMaterial.clone());
    ring.rotation.set(rx, ry, rz);
    ring.scale.setScalar(0.72);
    ring.visible = reducedMotion;
    rings.add(ring);
  }
  group.add(rings);

  const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x168d8b, transparent: true, opacity: 0.9 });
  const particles = PARTICLE_POSITIONS.map(([x, y, z], index) => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(index % 3 === 0 ? 0.047 : 0.032, 12, 12), particleMaterial.clone());
    dot.position.set(x, y, z);
    dot.scale.setScalar(reducedMotion ? 1 : 0.01);
    dot.visible = reducedMotion;
    group.add(dot);
    return dot;
  });

  scene.add(new THREE.HemisphereLight(0xffffff, 0x89c9c7, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(2.5, 3.3, 4.2);
  scene.add(key);
  const fill = new THREE.PointLight(0x82d7d2, 3.2, 10);
  fill.position.set(-2.4, -0.5, 3);
  scene.add(fill);

  let active = reducedMotion;
  let tiltX = 0;
  let tiltY = 0;
  let animationFrame = 0;
  let destroyed = false;

  const applyState = () => {
    rings.visible = active;
    particles.forEach((particle) => { particle.visible = active; });
    host.dataset.toothScene = "ready";
    host.dataset.toothOrbit = active ? "active" : "idle";
    host.dataset.reducedMotion = String(reducedMotion);
    onStateChange?.({ active, reducedMotion });
  };

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  const pointerMove = (event) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = interactionTarget.getBoundingClientRect();
    tiltY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.26;
    tiltX = -((event.clientY - rect.top) / rect.height - 0.5) * 0.2;
  };
  const pointerLeave = () => { tiltX = 0; tiltY = 0; };
  interactionTarget.addEventListener("pointermove", pointerMove);
  interactionTarget.addEventListener("pointerleave", pointerLeave);

  const clock = new THREE.Clock();
  const animate = () => {
    if (destroyed) return;
    const time = clock.getElapsedTime();
    if (reducedMotion) {
      tooth.rotation.set(0.05, 0.24, 0);
      tooth.position.y = 0;
      rings.rotation.set(0, 0, 0);
      particles.forEach((particle) => particle.scale.setScalar(1));
    } else {
      tooth.rotation.x += (tiltX - tooth.rotation.x) * 0.07;
      tooth.rotation.y += (tiltY + time * 0.14 - tooth.rotation.y) * 0.05;
      tooth.position.y = Math.sin(time * 1.35) * 0.09;
      rings.rotation.z = time * 0.24;
      rings.rotation.x = Math.sin(time * 0.3) * 0.08;
      const reveal = active ? 1 : 0.01;
      particles.forEach((particle, index) => {
        const phase = time * 0.8 + index * 0.65;
        particle.scale.lerp(new THREE.Vector3(reveal, reveal, reveal), 0.1);
        if (active) particle.position.y += Math.sin(phase) * 0.0018;
      });
    }
    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(animate);
  };

  applyState();
  animate();

  return {
    toggle() {
      if (reducedMotion) return active;
      active = !active;
      applyState();
      return active;
    },
    setActive(value) {
      active = Boolean(value) || reducedMotion;
      applyState();
      return active;
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      interactionTarget.removeEventListener("pointermove", pointerMove);
      interactionTarget.removeEventListener("pointerleave", pointerLeave);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      host.replaceChildren();
    },
  };
}
