import { renderOgImage, ogAlt, ogSize, ogContentType } from "@/lib/ogImage";

export const runtime = "edge";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage();
}
