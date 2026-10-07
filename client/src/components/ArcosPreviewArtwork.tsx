/** A representative capture of the Arcos concept, shared by every gallery locale. */
export default function ArcosPreviewArtwork() {
  return (
    <div
      aria-hidden="true"
      style={{ height: 280, background: "#f2f0e9", overflow: "hidden" }}
    >
      <img
        src="/media/examples/arcos/cover.webp"
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
