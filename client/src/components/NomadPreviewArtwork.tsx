/** A dedicated project cover, shared by the localized example galleries. */
export default function NomadPreviewArtwork() {
  return (
    <div aria-hidden="true" style={{ height: 280, background: "#ead192", overflow: "hidden" }}>
      <img
        src="/media/examples/nomad/cover.webp"
        alt=""
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}
