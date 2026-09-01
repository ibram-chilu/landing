import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(135deg, #102A43 0%, #0F766E 65%, #DDF3EF 100%)",
        color: "white",
        padding: "60px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: 32,
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: 0.8,
        }}
      >
        Synq beta
      </div>
      <div style={{ maxWidth: 760, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
          Turn group plans into action.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            lineHeight: 1.35,
            opacity: 0.88,
          }}
        >
          AI-assisted planning, suggested budgets and clearer contribution
          coordination for groups.
        </div>
      </div>
      <div style={{ fontSize: 28, opacity: 0.9 }}>
        Early-access signup for the Synq beta
      </div>
    </div>,
    size,
  );
}
