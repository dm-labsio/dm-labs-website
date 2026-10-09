import "./DemoPreviewArtwork.css";

const covers: Record<string, { height: number }> = {
  hartley: { height: 900 },
  "nomad-coffee": { height: 900 },
  "bella-salon": { height: 900 },
  "dr-elara-dental": { height: 900 },
  "pulse-gym": { height: 900 },
  "arcos-architecture": { height: 900 },
  "luxe-realty": { height: 900 },
};

/** Consistently composed captures of the real demos, displayed edge to edge. */
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
