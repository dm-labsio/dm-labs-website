/* ============================================================
   D&M LABS - Neon Cursor Trail
   Adapted from https://github.com/TommyB-QA/neon-cursor-trail
   Color cycle: blue (#5B8CFF) → cyan (#6FE3FF) → purple (#8B5CFF)
   Smooth LERP between palette stops every ~3s per step.
   Canvas-based, pointer-events: none — zero layout impact.
   Only renders on non-touch devices (pointer: fine).
   ============================================================ */
import { useEffect, useRef } from "react";

// D&M Labs brand palette stops: [core R,G,B] and [glow R,G,B]
const PALETTE_STOPS = [
  { core: [91,  140, 255], glow: [36,  100, 255] }, // blue
  { core: [111, 227, 255], glow: [36,  157, 255] }, // cyan
  { core: [139, 92,  255], glow: [100, 50,  220] }, // purple
];

// Full cycle: blue→cyan→purple→cyan→blue (smooth loop)
const CYCLE = [0, 1, 2, 1]; // indices into PALETTE_STOPS
const STEP_DURATION = 3000; // ms per step

function lerpChannel(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function lerpPalette(t: number): { core: string; glow: string } {
  // t goes 0..CYCLE.length (wraps)
  const totalSteps = CYCLE.length;
  const raw = ((t % totalSteps) + totalSteps) % totalSteps;
  const stepIdx = Math.floor(raw);
  const frac = raw - stepIdx;
  const fromStop = PALETTE_STOPS[CYCLE[stepIdx]];
  const toStop   = PALETTE_STOPS[CYCLE[(stepIdx + 1) % totalSteps]];
  const core = fromStop.core.map((c, i) => lerpChannel(c, toStop.core[i], frac));
  const glow = fromStop.glow.map((c, i) => lerpChannel(c, toStop.glow[i], frac));
  return {
    core: `${core[0]}, ${core[1]}, ${core[2]}`,
    glow: `${glow[0]}, ${glow[1]}, ${glow[2]}`,
  };
}

const MAX_PARTICLES     = 90;
const PARTICLE_LIFE     = 620;
const RIPPLE_LIFE       = 520;
const MIN_SPAWN_DIST    = 7;
const MIN_SPAWN_INTERVAL = 12;

interface Props {
  enabled?: boolean;
}

export default function NeonCursorTrail({ enabled = true }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const animRef      = useRef(0);
  const particlesRef = useRef<{
    x: number; y: number; vx: number; vy: number;
    radius: number; createdAt: number;
  }[]>([]);
  const ripplesRef   = useRef<{ x: number; y: number; createdAt: number }[]>([]);
  const colorRef     = useRef(lerpPalette(0));
  const lastSpawnRef = useRef({ x: 0, y: 0, time: 0, ready: false });
  // Tracks the current position along the cycle (in step units)
  const cycleRef     = useRef(0);
  const lastCycleRef = useRef(0); // performance.now() at last cycle update

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas  = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context || !enabled) {
      particlesRef.current = [];
      ripplesRef.current   = [];
      lastSpawnRef.current.ready = false;
      return;
    }

    let width = 0, height = 0, dpr = 1;
    lastCycleRef.current = performance.now();

    const resize = () => {
      dpr    = Math.min(window.devicePixelRatio || 1, 2);
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = Math.floor(width  * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      animRef.current = 0;

      // Advance color cycle
      const elapsed = now - lastCycleRef.current;
      lastCycleRef.current = now;
      cycleRef.current += elapsed / STEP_DURATION;
      colorRef.current = lerpPalette(cycleRef.current);

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      particlesRef.current = particlesRef.current.filter((p) => {
        const age = now - p.createdAt;
        if (age >= PARTICLE_LIFE) return false;
        const progress = age / PARTICLE_LIFE;
        const alpha    = (1 - progress) ** 1.7;
        const radius   = p.radius * (1 + progress * 1.9);
        const x = p.x + p.vx * progress;
        const y = p.y + p.vy * progress;
        const pal = colorRef.current;
        const g   = context.createRadialGradient(x, y, 0, x, y, radius * 2.8);
        g.addColorStop(0,    `rgba(${pal.core}, ${alpha})`);
        g.addColorStop(0.36, `rgba(${pal.glow}, ${alpha * 0.42})`);
        g.addColorStop(1,    `rgba(${pal.glow}, 0)`);
        context.fillStyle = g;
        context.beginPath();
        context.arc(x, y, radius * 2.8, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = `rgba(255, 255, 255, ${alpha * 0.72})`;
        context.beginPath();
        context.arc(x, y, Math.max(1, radius * 0.34), 0, Math.PI * 2);
        context.fill();
        return true;
      });

      ripplesRef.current = ripplesRef.current.filter((r) => {
        const age = now - r.createdAt;
        if (age >= RIPPLE_LIFE) return false;
        const progress = age / RIPPLE_LIFE;
        const alpha    = (1 - progress) ** 1.35;
        const radius   = 8 + progress * 58;
        const pal = colorRef.current;
        const glow = context.createRadialGradient(
          r.x, r.y, Math.max(1, radius * 0.36),
          r.x, r.y, radius * 1.38,
        );
        glow.addColorStop(0,    `rgba(${pal.core}, 0)`);
        glow.addColorStop(0.62, `rgba(${pal.glow}, ${alpha * 0.22})`);
        glow.addColorStop(1,    `rgba(${pal.glow}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(r.x, r.y, radius * 1.38, 0, Math.PI * 2);
        context.fill();
        context.lineWidth   = 2.4 + (1 - progress) * 2.2;
        context.strokeStyle = `rgba(${pal.core}, ${alpha * 0.9})`;
        context.beginPath();
        context.arc(r.x, r.y, radius, 0, Math.PI * 2);
        context.stroke();
        context.lineWidth   = 1;
        context.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.42})`;
        context.beginPath();
        context.arc(r.x, r.y, radius * 0.72, 0, Math.PI * 2);
        context.stroke();
        return true;
      });

      context.globalCompositeOperation = "source-over";
      if (particlesRef.current.length > 0 || ripplesRef.current.length > 0) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    const requestDraw = () => {
      if (!animRef.current) animRef.current = requestAnimationFrame(draw);
    };

    const spawnParticle = (e: PointerEvent) => {
      const now  = performance.now();
      const last = lastSpawnRef.current;
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      if (last.ready && (dist < MIN_SPAWN_DIST || now - last.time < MIN_SPAWN_INTERVAL)) return;
      lastSpawnRef.current = { x: e.clientX, y: e.clientY, time: now, ready: true };
      particlesRef.current.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        radius: 3 + Math.random() * 4,
        createdAt: now,
      });
      if (particlesRef.current.length > MAX_PARTICLES) {
        particlesRef.current.splice(0, particlesRef.current.length - MAX_PARTICLES);
      }
      requestDraw();
    };

    const spawnRipple = (e: PointerEvent) => {
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, createdAt: performance.now() });
      if (ripplesRef.current.length > 12) ripplesRef.current.splice(0, ripplesRef.current.length - 12);
      requestDraw();
    };

    resize();
    window.addEventListener("resize",       resize,        { passive: true });
    window.addEventListener("pointermove",  spawnParticle, { passive: true });
    window.addEventListener("pointerdown",  spawnRipple,   { passive: true });

    return () => {
      window.removeEventListener("resize",      resize);
      window.removeEventListener("pointermove", spawnParticle);
      window.removeEventListener("pointerdown", spawnRipple);
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
      particlesRef.current = [];
      ripplesRef.current   = [];
      context.clearRect(0, 0, width, height);
      lastSpawnRef.current.ready = false;
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        display: enabled ? "block" : "none",
      }}
    />
  );
}
