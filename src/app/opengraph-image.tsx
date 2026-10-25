import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteSeo } from "@/lib/seo";

export const alt = `${siteSeo.name} — Medical Equipment & Mobility Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoPath = path.join(process.cwd(), "public/assets/logo.png");
  const logoData = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f2744 0%, #1a3a5c 45%, #0d9488 100%)",
          padding: 64,
        }}
      >
        <img src={logoSrc} alt="" width={420} height={121} style={{ objectFit: "contain", marginBottom: 36 }} />
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            maxWidth: 900,
          }}
        >
          Medical Equipment &amp; Mobility Solutions
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 26,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
          }}
        >
          Toronto · GTA · Canada
        </div>
      </div>
    ),
    { ...size }
  );
}
