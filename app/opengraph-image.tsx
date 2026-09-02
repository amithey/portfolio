import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} · developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#10151b",
          color: "#e6edf5",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#5ba2ff",
          }}
        >
          Developer · Israel
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#93a3b4", maxWidth: 900 }}>
          {SITE.headline}
        </div>
      </div>
    ),
    { ...size },
  );
}