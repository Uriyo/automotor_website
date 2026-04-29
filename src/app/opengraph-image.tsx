import { ImageResponse } from "next/og";

export const alt = "AutoMotor.AI — The fastest way to find a used engine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#09090B",
          color: "#FAFAFA",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Top bar — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(234, 88, 12, 0.15)",
              borderRadius: "8px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <span style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em" }}>AutoMotor.AI</span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "880px" }}>
          <p
            style={{
              fontSize: "20px",
              color: "#A1A1AA",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              margin: 0,
            }}
          >
            AI-powered parts sourcing
          </p>
          <h1
            style={{
              fontSize: "82px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "#FAFAFA",
            }}
          >
            The fastest way to find a used engine.
          </h1>
          <p
            style={{
              fontSize: "30px",
              color: "#A1A1AA",
              lineHeight: 1.3,
              margin: 0,
              maxWidth: "820px",
            }}
          >
            Our AI calls 15 junkyards in parallel. Quotes back in 90 seconds.
          </p>
        </div>

        {/* Bottom bar — stats + accent */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "56px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "32px", fontWeight: 600, color: "#FAFAFA" }}>12,847</span>
              <span style={{ fontSize: "16px", color: "#71717A" }}>drivers</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "32px", fontWeight: 600, color: "#FAFAFA" }}>$3.2M</span>
              <span style={{ fontSize: "16px", color: "#71717A" }}>saved this year</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "32px", fontWeight: 600, color: "#FAFAFA" }}>4.9</span>
              <span style={{ fontSize: "16px", color: "#71717A" }}>average rating</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              background: "#EA580C",
              borderRadius: "999px",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            automotor.ai
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
