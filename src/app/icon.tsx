import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          padding: 5,
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={22}
          height={22}
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>
    ),
    { ...size }
  );
}
