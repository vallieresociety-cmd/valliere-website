import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vallieresociety.org"),
  title: "VALLIÈRE — The Executive Founders Network",
  description:
    "A private, invitation-only circle uniting high-caliber founders, visionary engineers, and next-generation leaders in Trabzon.",
  alternates: {
    canonical: "https://vallieresociety.org",
  },
  openGraph: {
    title: "VALLIÈRE — The Executive Founders Network",
    description:
      "A private circle uniting high-caliber founders, visionary engineers, and next-generation leaders.",
    url: "https://vallieresociety.org",
    siteName: "Vallière Society",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VALLIÈRE — Üniversite Girişimciler Topluluğu",
    description:
      "Vizyoner ve hırslı üniversite girişimcilerini aynı masada buluşturan bağımsız kolektif.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${pinyon.variable}`}
    >
      <body className="font-sans antialiased grain">{children}</body>
    </html>
  );
}
