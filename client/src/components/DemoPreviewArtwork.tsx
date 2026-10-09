import type { CSSProperties } from "react";
import "./DemoPreviewArtwork.css";

const covers: Record<string, { background: string; height: number }> = {
  hartley: { background: "#cda79d", height: 766 },
  "nomad-coffee": { background: "#dcc790", height: 768 },
  "bella-salon": { background: "#bdbdb8", height: 916 },
  "dr-elara-dental": { background: "#dbe6ef", height: 856 },
  "pulse-gym": { background: "#292b25", height: 960 },
  "arcos-architecture": { background: "#d8d1c5", height: 1189 },
  "luxe-realty": { background: "#879295", height: 916 },
};

/** Complete captures of the real demos, framed without cropping their UI. */
export default function DemoPreviewArtwork({ id }: { id: string }) {
  const cover = covers[id];
  if (!cover) return null;
  const base = `/media/examples/covers/${id}`;
  return (
    <div
      className="demo-cover"
      data-demo-cover={id}
      aria-hidden="true"
      dir="ltr"
      style={{ "--demo-mat": cover.background } as CSSProperties}
    >
      <img
        src={`${base}-1200.webp`}
        srcSet={`${base}-720.webp 720w, ${base}-1200.webp 1200w`}
        sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1279px) 45vw, 580px"
        alt=""
        width={1440}
        height={cover.height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
