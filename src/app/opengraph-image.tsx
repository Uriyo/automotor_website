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
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <svg width="56" height="56" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.65 24.35 A11 11 0 1 1 22.35 24.35" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" />
            <line x1="7.0" y1="21.5" x2="8.4" y2="20.5" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" opacity="0.30" />
            <line x1="5.5" y1="17.0" x2="7.1" y2="16.6" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" opacity="0.40" />
            <line x1="7.0" y1="10.5" x2="8.4" y2="11.5" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
            <line x1="11.5" y1="6.5" x2="12.5" y2="7.9" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" opacity="0.70" />
            <line x1="17.0" y1="5.5" x2="17.0" y2="7.2" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            <line x1="20.5" y1="6.5" x2="19.5" y2="7.9" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <line x1="24.0" y1="9.0" x2="22.7" y2="10.0" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M25.4 11.7 A11 11 0 0 1 26.5 16" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="16" y1="16" x2="22.5" y2="9.5" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.6" fill="#FAFAFA" />
            <circle cx="16" cy="16" r="1" fill="#09090B" />
          </svg>
          <span style={{ fontSize: "30px", fontWeight: 600, letterSpacing: "-0.01em" }}>
            AutoMotor<span style={{ color: "#EA580C" }}>.</span>AI
          </span>
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
