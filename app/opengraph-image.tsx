import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Eagle Automation — Turnkey CNC Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#FF8C00",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#FF8C00",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            FANUC Authorized System Integrator
          </span>
        </div>

        <h1
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Turnkey CNC Automation.
        </h1>

        <h2
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#FF8C00",
            lineHeight: 1.05,
            margin: "8px 0 0 0",
            letterSpacing: "-0.02em",
          }}
        >
          ROI-Driven Integration.
        </h2>

        <p
          style={{
            fontSize: "24px",
            color: "#9CA3AF",
            marginTop: "32px",
            lineHeight: 1.5,
            maxWidth: "700px",
          }}
        >
          Replace labor exposure with fixed capital. Achieve lights-out
          production with predictable payback under 12 months.
        </p>

        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "48px",
            borderTop: "1px solid #333333",
            paddingTop: "32px",
          }}
        >
          {[
            { value: "<12 mo", label: "Payback" },
            { value: "$209K+", label: "3-Year Savings" },
            { value: "24/7", label: "Lights-Out" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: 900, color: "#FFFFFF" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: "14px", color: "#6B7280", marginTop: "4px" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#6B7280",
          }}
        >
          eagleautomation.com
        </div>
      </div>
    ),
    { ...size }
  );
}
