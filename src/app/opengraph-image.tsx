import { ImageResponse } from "next/og";

export const alt = "Blob Arena: two ridiculous blobs face off";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", height: "100%", position: "relative", width: "100%" }}>
        <svg height="630" viewBox="0 0 1200 630" width="1200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="backdrop" cx="50%" cy="40%" r="75%">
            <stop offset="0%" stopColor="#4d3875" />
            <stop offset="58%" stopColor="#211b38" />
            <stop offset="100%" stopColor="#12111a" />
          </radialGradient>
          <linearGradient id="lavenderBlob" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#e4cfff" />
            <stop offset="52%" stopColor="#b98ce8" />
            <stop offset="100%" stopColor="#8058b7" />
          </linearGradient>
          <linearGradient id="coralBlob" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffd0c8" />
            <stop offset="52%" stopColor="#f38e9b" />
            <stop offset="100%" stopColor="#b94e71" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        <rect fill="url(#backdrop)" height="630" width="1200" />
        <ellipse cx="600" cy="492" fill="#c9a8ff" filter="url(#glow)" opacity=".28" rx="330" ry="45" />
        <ellipse cx="600" cy="533" fill="#090812" filter="url(#shadow)" opacity=".7" rx="480" ry="36" />
        <ellipse cx="600" cy="510" fill="#3d2a5d" opacity=".8" rx="480" ry="55" />
        <ellipse cx="600" cy="496" fill="none" opacity=".8" rx="425" ry="42" stroke="#c9a8ff" strokeWidth="5" />
        <ellipse cx="600" cy="496" fill="#c9a8ff" opacity=".4" rx="125" ry="13" />

        <g transform="translate(150 230)">
          <ellipse cx="150" cy="274" fill="#090812" filter="url(#shadow)" opacity=".65" rx="145" ry="24" />
          <path
            d="M36 207C7 187 0 145 17 113C29 90 53 80 74 71C71 40 92 13 122 11C150 9 167 27 176 49C210 24 251 34 263 65C276 99 252 124 238 140C260 164 254 208 230 231C201 258 158 259 122 254C87 249 55 234 36 207Z"
            fill="url(#lavenderBlob)"
            stroke="#f2eaff"
            strokeOpacity=".35"
            strokeWidth="5"
          />
          <ellipse cx="121" cy="80" fill="#fff" opacity=".38" rx="34" ry="16" transform="rotate(-28 121 80)" />
          <ellipse cx="111" cy="139" fill="#fff" rx="25" ry="31" />
          <ellipse cx="187" cy="139" fill="#fff" rx="25" ry="31" />
          <ellipse cx="117" cy="145" fill="#2a2145" rx="11" ry="16" />
          <ellipse cx="181" cy="145" fill="#2a2145" rx="11" ry="16" />
          <circle cx="120" cy="139" fill="#fff" r="4" />
          <circle cx="184" cy="139" fill="#fff" r="4" />
          <path d="M133 183C147 198 168 198 181 182" fill="none" stroke="#2a2145" strokeLinecap="round" strokeWidth="8" />
          <path d="M82 109L118 99" stroke="#6a429d" strokeLinecap="round" strokeWidth="13" />
          <path d="M176 99L211 109" stroke="#6a429d" strokeLinecap="round" strokeWidth="13" />
        </g>

        <g transform="translate(750 230)">
          <ellipse cx="150" cy="274" fill="#090812" filter="url(#shadow)" opacity=".65" rx="145" ry="24" />
          <path
            d="M36 207C7 187 0 145 17 113C29 90 53 80 74 71C71 40 92 13 122 11C150 9 167 27 176 49C210 24 251 34 263 65C276 99 252 124 238 140C260 164 254 208 230 231C201 258 158 259 122 254C87 249 55 234 36 207Z"
            fill="url(#coralBlob)"
            stroke="#fff0ed"
            strokeOpacity=".35"
            strokeWidth="5"
          />
          <ellipse cx="121" cy="80" fill="#fff" opacity=".4" rx="34" ry="16" transform="rotate(-28 121 80)" />
          <ellipse cx="111" cy="139" fill="#fff" rx="25" ry="31" />
          <ellipse cx="187" cy="139" fill="#fff" rx="25" ry="31" />
          <ellipse cx="117" cy="145" fill="#4d243b" rx="11" ry="16" />
          <ellipse cx="181" cy="145" fill="#4d243b" rx="11" ry="16" />
          <circle cx="120" cy="139" fill="#fff" r="4" />
          <circle cx="184" cy="139" fill="#fff" r="4" />
          <path d="M133 182C147 198 168 198 181 182" fill="none" stroke="#4d243b" strokeLinecap="round" strokeWidth="8" />
          <path d="M82 109L118 99" stroke="#a84560" strokeLinecap="round" strokeWidth="13" />
          <path d="M176 99L211 109" stroke="#a84560" strokeLinecap="round" strokeWidth="13" />
        </g>

        <g fill="#c9a8ff" opacity=".85">
          <circle cx="89" cy="128" r="5" />
          <circle cx="1102" cy="145" r="5" />
          <circle cx="317" cy="166" r="4" />
          <circle cx="892" cy="178" r="4" />
        </g>
        <g fill="none" stroke="#f7f3ff" strokeLinecap="round" strokeWidth="5">
          <path d="M74 203L91 203M82 195L82 211" opacity=".7" />
          <path d="M1090 203L1107 203M1098 195L1098 211" opacity=".7" />
        </g>

        </svg>
        <div
          style={{
            alignItems: "center",
            background: "#c9a8ff",
            borderRadius: 29,
            color: "#2a2145",
            display: "flex",
            fontFamily: "Arial, sans-serif",
            fontSize: 26,
            fontWeight: 900,
            height: 58,
            justifyContent: "center",
            left: 476,
            letterSpacing: 3,
            position: "absolute",
            top: 48,
            width: 248,
          }}
        >
          BLOB ARENA
        </div>
        <div
          style={{
            alignItems: "center",
            color: "#f7f3ff",
            display: "flex",
            fontFamily: "Arial, sans-serif",
            fontSize: 48,
            fontWeight: 900,
            justifyContent: "center",
            left: 0,
            position: "absolute",
            textAlign: "center",
            top: 124,
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          TWO NAMES. ONE WINNER.
        </div>
      </div>
    ),
    size,
  );
}
