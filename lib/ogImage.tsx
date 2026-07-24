import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "Vallière — Üniversite Girişimciler Topluluğu";

const PINYON_URL =
  "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/pinyonscript/PinyonScript-Regular.ttf";
const MARCELLUS_URL =
  "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/marcellus/Marcellus-Regular.ttf";

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed (${res.status}): ${url}`);
  return res.arrayBuffer();
}

/**
 * The social-share (Open Graph / Twitter) card: the calligraphic Vallière
 * wordmark over a dark, gold-lit ground with an elegant Turkish sub-title.
 * Rendered at build time into a static 1200×630 PNG.
 */
export async function renderOgImage(): Promise<ImageResponse> {
  const [pinyon, marcellus] = await Promise.all([
    fetchFont(PINYON_URL),
    fetchFont(MARCELLUS_URL),
  ]);

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
          backgroundColor: "#080a09",
          backgroundImage:
            "radial-gradient(ellipse at 50% 14%, rgba(212,175,55,0.20) 0%, rgba(8,10,9,0) 58%)",
          position: "relative",
        }}
      >
        {/* Deep-green glow rising from the base */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 420,
            backgroundImage:
              "radial-gradient(ellipse at 50% 100%, rgba(11,29,22,0.95) 0%, rgba(8,10,9,0) 62%)",
          }}
        />

        {/* Fine inset gold frame */}
        <div
          style={{
            position: "absolute",
            top: 38,
            left: 38,
            right: 38,
            bottom: 38,
            border: "1px solid rgba(212,175,55,0.28)",
            borderRadius: 10,
          }}
        />

        {/* Calligraphic wordmark */}
        <div
          style={{
            fontFamily: "Pinyon",
            fontSize: 210,
            lineHeight: 1,
            color: "#E6C687",
            paddingBottom: 8,
          }}
        >
          Vallière
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 360,
            height: 1,
            marginTop: 18,
            marginBottom: 30,
            backgroundImage:
              "linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.85) 50%, rgba(212,175,55,0) 100%)",
          }}
        />

        {/* Sub-title */}
        <div
          style={{
            fontFamily: "Marcellus",
            fontSize: 35,
            letterSpacing: 11,
            color: "#E5E0D8",
            display: "flex",
          }}
        >
          ÜNİVERSİTE GİRİŞİMCİLER TOPLULUĞU
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 66,
            fontFamily: "Marcellus",
            fontSize: 22,
            letterSpacing: 8,
            color: "#9a8a5a",
            display: "flex",
          }}
        >
          VALLIERESOCIETY.ORG
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Pinyon", data: pinyon, weight: 400, style: "normal" },
        { name: "Marcellus", data: marcellus, weight: 400, style: "normal" },
      ],
    },
  );
}
