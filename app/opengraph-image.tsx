import { renderOgImage, ogAlt, ogSize, ogContentType } from "@/lib/ogImage";

// Edge runtime is the supported path for ImageResponse and avoids the Node
// static-prerender wasm-loading bug in @vercel/og.
export const runtime = "edge";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage();
}
