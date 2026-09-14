import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #2E1065, #0F0728)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 160,
            height: 160,
            background: "linear-gradient(to bottom right, #7C3AED, #4C1D95)",
            borderRadius: 40,
            marginBottom: 60,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFBEB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          {siteConfig.name}
        </h1>
        
        <p
          style={{
            fontSize: 36,
            color: "#DDD6FE",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {siteConfig.tagline}
        </p>
      </div>
    ),
    { ...size },
  );
}
