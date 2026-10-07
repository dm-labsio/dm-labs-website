/** The gallery uses the same art and palette as the live Nomad concept. */
export default function NomadPreviewArtwork() {
  return (
    <div
      dir="ltr"
      aria-hidden="true"
      style={{
        height: 280,
        display: "grid",
        gridTemplateColumns: "43% 57%",
        overflow: "hidden",
        background: "#b72d20",
        color: "#f1df9c",
      }}
    >
      <div
        style={{
          padding: "20px 12px 20px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "Impact, 'Arial Narrow', sans-serif",
            fontWeight: 900,
            fontSize: 20,
            letterSpacing: "-0.04em",
          }}
        >
          NOMAD
        </span>
        <span
          style={{
            fontFamily: "Impact, 'Arial Narrow', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(24px, 2.8vw, 36px)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          GOOD
          <br />
          COFFEE.
          <br />
          FULL STOP.
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            textDecoration: "underline",
            textUnderlineOffset: 4,
          }}
        >
          Find your usual
        </span>
      </div>
      <img
        src="/previews/nomad/assets/coffee-still-life-720.webp"
        alt=""
        width={720}
        height={480}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "48% center",
        }}
      />
    </div>
  );
}
