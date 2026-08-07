import { useEffect, useRef, useState } from "react";

type ToothGravityCardProps = { className?: string };
type ToothSceneController = { toggle: () => boolean; destroy: () => void };
type ToothSceneModule = { mountToothGravityScene: (host: HTMLElement, options: { interactionTarget: HTMLElement; reducedMotion: boolean; onStateChange: (state: { active: boolean; reducedMotion: boolean }) => void }) => ToothSceneController };
const loadToothScene = new Function("url", "return import(url)") as (url: string) => Promise<ToothSceneModule>;

/** Reusable mount point for the same Three.js scene used by the Dr. Elara preview. */
export function ToothGravityCard({ className = "" }: ToothGravityCardProps) {
  const stageRef = useRef<HTMLButtonElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ToothSceneController | null>(null);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let disposed = false;
    const host = hostRef.current;
    const stage = stageRef.current;
    if (!host || !stage) return;
    void loadToothScene("/previews/tooth-gravity-scene.js").then((module) => {
      if (disposed) return;
      controllerRef.current = module.mountToothGravityScene(host, {
        interactionTarget: stage,
        reducedMotion,
        onStateChange: ({ active: nextActive }) => setActive(nextActive),
      });
    });
    return () => {
      disposed = true;
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <section className={`relative overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-white via-[#f8fcfc] to-[#e8f5f5] ${className}`}>
      <div className="grid min-h-[420px] gap-8 p-7 sm:p-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:p-12">
        <div>
          <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700">Precision in motion</span>
          <h2 className="mt-5 font-serif text-4xl font-normal leading-tight text-[#0d1f1f] sm:text-5xl">Care designed around <span className="italic text-teal-700">your smile.</span></h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#4a6363] sm:text-base">Select the model to reveal a gentle orbit of clinical detail around a polished, natural tooth form.</p>
        </div>
        <button ref={stageRef} type="button" aria-pressed={active} aria-label="Reveal the tooth orbit" onClick={() => controllerRef.current?.toggle()} className="relative mx-auto aspect-square w-full max-w-[390px] overflow-hidden rounded-[2rem] border border-teal-100 bg-white shadow-[0_24px_65px_rgba(14,124,123,0.13)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-teal-500">
          <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
          <span className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700 shadow-sm backdrop-blur">{reducedMotion ? "Static model" : active ? "Orbit active" : "Tap to explore"}</span>
        </button>
      </div>
    </section>
  );
}

export default ToothGravityCard;
