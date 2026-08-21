import { ImageResponse } from "next/og";
import { fromRouteSegment } from "@/game/names";

export const alt = "Two fighters face off in Blob Arena";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OpenGraphImageProps {
  params: Promise<{ fighterA: string; fighterB: string }>;
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const route = await params;
  const fighterA = fromRouteSegment(route.fighterA).toUpperCase();
  const fighterB = fromRouteSegment(route.fighterB).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#12111a",
          color: "#f7f3ff",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "70px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#c9a8ff",
            borderRadius: "28px",
            boxShadow: "inset 0 -8px 0 rgba(42,33,69,.22), inset 0 5px 0 rgba(255,255,255,.35)",
            color: "#2a2145",
            display: "flex",
            fontSize: 34,
            fontWeight: 900,
            padding: "18px 34px 24px",
          }}
        >
          BLOB ARENA
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 74,
            fontWeight: 900,
            gap: 34,
            justifyContent: "center",
            marginTop: 75,
            textAlign: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>{fighterA}</div>
          <div style={{ color: "#c9a8ff", display: "flex", fontSize: 44 }}>VS</div>
          <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>{fighterB}</div>
        </div>
        <div style={{ color: "#b8afcb", display: "flex", fontSize: 30, marginTop: 54 }}>
          WHO WINS?
        </div>
      </div>
    ),
    size,
  );
}
