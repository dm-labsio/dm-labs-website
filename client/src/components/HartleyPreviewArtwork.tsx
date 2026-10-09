/** Actual Hartley website hero, shared by the three Our Work galleries. */
export default function HartleyPreviewArtwork() {
  return (
    <div
      aria-hidden="true"
      style={{ height: 280, background: "#DDB8AD", overflow: "hidden" }}
    >
      <img
        src="/previews/hartley/assets/cover.webp"
        alt=""
        width={1200}
        height={800}
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
