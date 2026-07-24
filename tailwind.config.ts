import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        night: "#0D0D0E",
        gold: "#D4AF37",
        champagne: "#E6CA65",
        ivory: "#F5F5F0",
        slate: "#8E8E93",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        signature: ["var(--font-signature)", "cursive"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.18em",
      },
      maxWidth: {
        container: "1180px",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(180deg, #E6CA65 0%, #D4AF37 55%, #B8912B 100%)",
        "hero-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.10) 0%, rgba(10,10,10,0) 70%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
