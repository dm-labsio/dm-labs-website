/** A capture of the actual Luxe concept, shared by all gallery languages. */
export default function LuxePreviewArtwork() {
  return (
    <div
      aria-hidden="true"
      style={{ height: 280, background: "#202529", overflow: "hidden" }}
    >
      <img
        src="/media/examples/luxe/cover-v3.webp"
        alt=""
        width={1200}
        height={833}
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
