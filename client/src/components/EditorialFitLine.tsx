import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const WIDTH_MIN = 80;
const WIDTH_MAX = 132;
const PROBE_SIZE = 100;

type EditorialFitLineProps = {
  children: ReactNode;
  className?: string;
  maxSizeRatio?: number;
};

/**
 * Fits one author-defined English display line using Anybody's real `wdth` axis.
 * It is intentionally opt-in and is used only by the English homepage hero.
 */
export default function EditorialFitLine({
  children,
  className = "",
  maxSizeRatio = 0.17,
}: EditorialFitLineProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const [isFitted, setIsFitted] = useState(false);

  const fit = useCallback(() => {
    const line = lineRef.current;
    const container = line?.parentElement;
    if (!line || !container) return;

    const availableWidth = container.getBoundingClientRect().width;
    if (!availableWidth) return;

    line.style.fontSize = `${PROBE_SIZE}px`;
    line.style.fontVariationSettings = "'wdth' 100, 'wght' 800";

    line.style.fontVariationSettings = `'wdth' ${WIDTH_MIN}, 'wght' 800`;
    let bestWidth = WIDTH_MIN;

    if (line.scrollWidth <= availableWidth) {
      let low = WIDTH_MIN;
      let high = WIDTH_MAX;

      for (let iteration = 0; iteration < 12; iteration += 1) {
        const middle = (low + high) / 2;
        line.style.fontVariationSettings = `'wdth' ${middle}, 'wght' 800`;

        if (line.scrollWidth <= availableWidth) {
          low = middle;
          bestWidth = middle;
        } else {
          high = middle;
        }
      }
    }

    line.style.fontVariationSettings = `'wdth' ${bestWidth}, 'wght' 800`;
    const fittedSize = PROBE_SIZE * (availableWidth / Math.max(line.scrollWidth, 1));
    line.style.fontSize = `${Math.min(fittedSize, availableWidth * maxSizeRatio)}px`;
    setIsFitted(true);
  }, [maxSizeRatio]);

  useEffect(() => {
    const requestFit = () => window.requestAnimationFrame(fit);
    requestFit();

    document.fonts?.ready.then(requestFit);

    const observer = new ResizeObserver(requestFit);
    if (lineRef.current?.parentElement) observer.observe(lineRef.current.parentElement);

    return () => observer.disconnect();
  }, [fit, children]);

  return (
    <span
      ref={lineRef}
      className={`editorial-fit-line ${isFitted ? "is-fitted" : ""} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
