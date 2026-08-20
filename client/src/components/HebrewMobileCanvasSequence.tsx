import { useEffect, useRef } from "react";

const FRAME_WIDTH = 270;
const FRAME_HEIGHT = 480;
const COLUMNS = 7;
const OPENING_PROGRESS = 0.05;
const SCRUB_END = 0.78;

const HEBREW_MOBILE_SPRITE_URL = "/media/hero/hebrew-mobile-hero-sprite.webp";

export function HebrewMobileCanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = canvas?.closest<HTMLElement>(".hero-scrub-scope--hebrew");
    if (!canvas || !scope || !window.matchMedia("(max-width: 767px)").matches) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const sprite = new Image();
    let frameId = 0;
    let disposed = false;
    let lastFrame = -1;

    const draw = (frameIndex: number) => {
      if (!sprite.complete || !sprite.naturalWidth || disposed) return;
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.round(bounds.width * dpr));
      const pixelHeight = Math.max(1, Math.round(bounds.height * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);
      context.fillStyle = "#f6f6f4";
      context.fillRect(0, 0, bounds.width, bounds.height);

      const row = Math.floor(frameIndex / COLUMNS);
      const column = frameIndex % COLUMNS;
      const sourceX = column * FRAME_WIDTH;
      const sourceY = row * FRAME_HEIGHT;
      const scale = Math.max(bounds.width / FRAME_WIDTH, bounds.height / FRAME_HEIGHT);
      const width = FRAME_WIDTH * scale;
      const height = FRAME_HEIGHT * scale;
      const x = (bounds.width - width) / 2;
      const y = (bounds.height - height) / 2;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(sprite, sourceX, sourceY, FRAME_WIDTH, FRAME_HEIGHT, x, y, width, height);
    };

    const render = () => {
      const rawProgress = Number.parseFloat(scope.style.getPropertyValue("--hero-progress")) || 0;
      const scrubProgress = Math.min(rawProgress / SCRUB_END, 1);
      const frameProgress = OPENING_PROGRESS + scrubProgress * (1 - OPENING_PROGRESS);
      const nextFrame = Math.round(frameProgress * 60);

      if (scrubProgress >= 0.96) {
        scope.dataset.released = "true";
      }

      if (nextFrame !== lastFrame) {
        lastFrame = nextFrame;
        draw(nextFrame);
      }
      frameId = window.requestAnimationFrame(render);
    };

    const onResize = () => draw(lastFrame < 0 ? 3 : lastFrame);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", onResize, { passive: true });

    sprite.decoding = "async";
    sprite.onload = () => {
      if (disposed) return;
      scope.dataset.canvasReady = "true";
      draw(3);
      frameId = window.requestAnimationFrame(render);
    };
    sprite.src = HEBREW_MOBILE_SPRITE_URL;

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      delete scope.dataset.canvasReady;
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-scrub-canvas" aria-hidden="true" />;
}
