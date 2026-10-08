/** The actual dental concept, shared across the three gallery languages. */
export default function ElaraPreviewArtwork() {
  return (
    <div
      aria-hidden="true"
      style={{ height: 280, background: "#ffffff", overflow: "hidden" }}
    >
      <img
        src="/media/examples/elara/cover.webp"
        alt=""
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
    </div>
  );
}
