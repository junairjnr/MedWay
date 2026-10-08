import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logoPath = path.join(process.cwd(), "public/assets/fav.jpg");
  const logoData = await readFile(logoPath);
  const logoSrc = `data:image/jpeg;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "50%",
          padding: 28,
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={124}
          height={124}
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>
    ),
    { ...size }
  );
}
