import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const runtime = "edge";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          borderRadius: "4px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagon outline */}
          <path
            d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z"
            stroke="#FF8C00"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Simplified eagle wing */}
          <path
            d="M8 16C8 16 9 12 10 10C11 8 13 6 15 5C13.5 7 12.5 8.5 12 10C11.5 11.5 11 13 11 14L8 16Z"
            fill="#FF8C00"
          />
          <path
            d="M9.5 15C10 13 11 11 12.5 9C13.5 7.5 15 6 16.5 5.5C15 7.5 14 9 13.5 10.5C13 12 12.5 13.5 12.5 15L9.5 15Z"
            fill="#FF8C00"
            opacity="0.7"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
