import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#c9a8ff",
          borderRadius: 18,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#2a2145",
            borderRadius: "48% 52% 44% 56%",
            display: "flex",
            height: 31,
            transform: "rotate(10deg)",
            width: 27,
          }}
        />
      </div>
    ),
    size,
  );
}
