import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

export interface InteractiveExampleCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  actionText: string;
}

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export default function InteractiveExampleCard({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  href,
  actionText,
}: InteractiveExampleCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { damping: 24, stiffness: 200, mass: 0.65 };
  const springX = useSpring(pointerX, springConfig);
  const springY = useSpring(pointerY, springConfig);
  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const canTilt = () => !prefersReducedMotion && window.matchMedia(FINE_POINTER_QUERY).matches;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canTilt()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div className="interactive-example-card relative z-0 w-full [perspective:1000px] hover:z-10">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          rotateX: prefersReducedMotion ? "0deg" : rotateX,
          rotateY: prefersReducedMotion ? "0deg" : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        transition={{ type: "spring", damping: 24, stiffness: 240 }}
        className="relative min-h-[19rem] w-full overflow-visible rounded-2xl sm:min-h-[21rem]"
      >
        <a
          href={href}
          aria-label={`${actionText}: ${title}`}
          className="group relative block h-full min-h-[19rem] overflow-hidden rounded-2xl border border-white/20 bg-[#101827] shadow-[0_14px_38px_rgba(15,23,42,0.18)] outline-none [transform-style:preserve-3d] transition-shadow duration-300 focus-visible:ring-4 focus-visible:ring-[#6FE3FF]/70 sm:min-h-[21rem] hover:shadow-[0_22px_48px_rgba(91,140,255,0.28)]"
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/58 via-[#0B1220]/12 to-[#0B1220]/88" aria-hidden="true" />

          <span className="absolute inset-0 flex flex-col justify-between p-5 text-white sm:p-6" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
            <span className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-xl font-bold leading-tight tracking-tight sm:text-2xl">{title}</span>
                <span className="mt-1 block text-sm font-medium text-white/80">{subtitle}</span>
              </span>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-inset ring-white/35 transition-colors group-hover:bg-white/25" aria-hidden="true">
                <ArrowUpRight size={19} strokeWidth={2} />
              </span>
            </span>

            <span className="inline-flex w-full items-center justify-center rounded-xl bg-white/12 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-inset ring-white/30 transition-colors group-hover:bg-white/22">
              {actionText}
            </span>
          </span>
        </a>
      </motion.div>
    </div>
  );
}
