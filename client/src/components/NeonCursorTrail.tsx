/* ============================================================
   DM-Labs.io - Fluid Neon Cursor Trail
   Continuous tapered ribbon inspired by the supplied reference.
   Canvas-based, pointer-events: none — zero layout impact.
   Only renders on non-touch devices (pointer: fine).
   ============================================================ */
import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type TrailPoint = Point & { createdAt: number };
type Ripple = Point & { createdAt: number };

// DM-Labs.io brand palette stops: [core R,G,B] and [glow R,G,B]
const PALETTE_STOPS = [
  { core: [91, 140, 255], glow: [36, 100, 255] }, // blue
  { core: [111, 227, 255], glow: [36, 157, 255] }, // cyan
  { core: [139, 92, 255], glow: [100, 50, 220] }, // purple
];

// Full cycle: blue→cyan→purple→cyan→blue (smooth loop)
const CYCLE = [0, 1, 2, 1];
const STEP_DURATION = 3000;
const MAX_TRAIL_POINTS = 38;
const TRAIL_LIFE = 560;
const RIPPLE_LIFE = 520;
const MIN_POINT_DISTANCE = 4;
const MAX_RIPPLES = 12;

function lerpChannel(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function lerpPalette(t: number): { core: string; glow: string } {
  const totalSteps = CYCLE.length;
  const raw = ((t % totalSteps) + totalSteps) % totalSteps;
  const stepIndex = Math.floor(raw);
  const fraction = raw - stepIndex;
  const fromStop = PALETTE_STOPS[CYCLE[stepIndex]];
  const toStop = PALETTE_STOPS[CYCLE[(stepIndex + 1) % totalSteps]];
  const core = fromStop.core.map((channel, index) => lerpChannel(channel, toStop.core[index], fraction));
  const glow = fromStop.glow.map((channel, index) => lerpChannel(channel, toStop.glow[index], fraction));

  return {
    core: `${core[0]}, ${core[1]}, ${core[2]}`,
    glow: `${glow[0]}, ${glow[1]}, ${glow[2]}`,
  };
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function drawRibbonSegment(
  context: CanvasRenderingContext2D,
  start: Point,
  control: Point,
  end: Point,
  lineWidth: number,
  strokeStyle: string,
) {
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = lineWidth;
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.quadraticCurveTo(control.x, control.y, end.x, end.y);
  context.stroke();
}

interface Props {
  enabled?: boolean;
}

export default function NeonCursorTrail({ enabled = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef(0);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const colorRef = useRef(lerpPalette(0));
  const cycleRef = useRef(0);
  const lastCycleRef = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context || !enabled) {
      trailPointsRef.current = [];
      ripplesRef.current = [];
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    lastCycleRef.current = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFluidTrail = (now: number) => {
      const trailPoints = trailPointsRef.current;
      if (trailPoints.length < 2) return;

      const palette = colorRef.current;
      const lastIndex = trailPoints.length - 1;

      trailPoints.forEach((point, index) => {
        const ageProgress = Math.min(1, (now - point.createdAt) / TRAIL_LIFE);
        if (ageProgress >= 1) return;

        const lengthProgress = index / Math.max(1, lastIndex);
        const alpha = (1 - ageProgress) * (0.12 + lengthProgress * 0.88);
        const lineWidth = 1.6 + lengthProgress * 13.2;
        const previous = trailPoints[Math.max(0, index - 1)];
        const next = trailPoints[Math.min(lastIndex, index + 1)];
        const start = index === 0 ? point : midpoint(previous, point);
        const end = index === lastIndex ? point : midpoint(point, next);

        // Layered curves create one continuous, glowing tapered ribbon instead of dots.
        drawRibbonSegment(context, start, point, end, lineWidth + 28, `rgba(${palette.glow}, ${alpha * 0.08})`);
        drawRibbonSegment(context, start, point, end, lineWidth + 14, `rgba(${palette.glow}, ${alpha * 0.18})`);
        drawRibbonSegment(context, start, point, end, lineWidth + 3, `rgba(${palette.core}, ${alpha * 0.5})`);
        drawRibbonSegment(
          context,
          start,
          point,
          end,
          Math.max(1.15, lineWidth * 0.24),
          `rgba(255, 255, 255, ${alpha * 0.72})`,
        );
      });

      const head = trailPoints[lastIndex];
      const headGlow = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, 30);
      headGlow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      headGlow.addColorStop(0.24, `rgba(${palette.core}, 0.64)`);
      headGlow.addColorStop(0.62, `rgba(${palette.glow}, 0.18)`);
      headGlow.addColorStop(1, `rgba(${palette.glow}, 0)`);
      context.fillStyle = headGlow;
      context.beginPath();
      context.arc(head.x, head.y, 30, 0, Math.PI * 2);
      context.fill();
    };

    const drawRipples = (now: number) => {
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        const age = now - ripple.createdAt;
        if (age >= RIPPLE_LIFE) return false;

        const progress = age / RIPPLE_LIFE;
        const alpha = (1 - progress) ** 1.35;
        const radius = 8 + progress * 58;
        const palette = colorRef.current;
        const glow = context.createRadialGradient(
          ripple.x,
          ripple.y,
          Math.max(1, radius * 0.36),
          ripple.x,
          ripple.y,
          radius * 1.38,
        );
        glow.addColorStop(0, `rgba(${palette.core}, 0)`);
        glow.addColorStop(0.62, `rgba(${palette.glow}, ${alpha * 0.22})`);
        glow.addColorStop(1, `rgba(${palette.glow}, 0)`);

        context.fillStyle = glow;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius * 1.38, 0, Math.PI * 2);
        context.fill();

        context.lineWidth = 2.4 + (1 - progress) * 2.2;
        context.strokeStyle = `rgba(${palette.core}, ${alpha * 0.9})`;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.stroke();

        context.lineWidth = 1;
        context.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.42})`;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius * 0.72, 0, Math.PI * 2);
        context.stroke();

        return true;
      });
    };

    const draw = (now: number) => {
      animationRef.current = 0;

      const elapsed = now - lastCycleRef.current;
      lastCycleRef.current = now;
      cycleRef.current += elapsed / STEP_DURATION;
      colorRef.current = lerpPalette(cycleRef.current);

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      trailPointsRef.current = trailPointsRef.current.filter((point) => now - point.createdAt < TRAIL_LIFE);

      drawFluidTrail(now);
      drawRipples(now);

      context.globalCompositeOperation = "source-over";
      if (trailPointsRef.current.length > 0 || ripplesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    const requestDraw = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    const addTrailPoint = (event: PointerEvent) => {
      const now = performance.now();
      const trailPoints = trailPointsRef.current;
      const lastPoint = trailPoints[trailPoints.length - 1];
      const distance = lastPoint ? Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y) : Infinity;
      if (distance < MIN_POINT_DISTANCE) return;

      trailPoints.push({ x: event.clientX, y: event.clientY, createdAt: now });
      if (trailPoints.length > MAX_TRAIL_POINTS) {
        trailPoints.splice(0, trailPoints.length - MAX_TRAIL_POINTS);
      }

      requestDraw();
    };

    const spawnRipple = (event: PointerEvent) => {
      ripplesRef.current.push({ x: event.clientX, y: event.clientY, createdAt: performance.now() });
      if (ripplesRef.current.length > MAX_RIPPLES) {
        ripplesRef.current.splice(0, ripplesRef.current.length - MAX_RIPPLES);
      }
      requestDraw();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", addTrailPoint, { passive: true });
    window.addEventListener("pointerdown", spawnRipple, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", addTrailPoint);
      window.removeEventListener("pointerdown", spawnRipple);
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
      trailPointsRef.current = [];
      ripplesRef.current = [];
      context.clearRect(0, 0, width, height);
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
