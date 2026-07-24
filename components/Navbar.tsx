"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { handleAnchorScroll } from "@/lib/smoothScroll";
import type { Lang } from "@/lib/content";

function LanguageToggle() {
  const { lang, setLang } = useLang();
  const options: Lang[] = ["EN", "TR"];

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 text-[0.7rem] uppercase tracking-wide2"
    >
      {options.map((option, i) => (
        <span key={option} className="flex items-center">
          <button
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={lang === option}
            className={`px-2 py-2 transition-all duration-300 active:scale-[0.98] ${
              lang === option
                ? "text-champagne"
                : "text-slate hover:text-ivory"
            }`}
          >
            {option}
          </button>
          {i === 0 && <span className="text-white/20">|</span>}
        </span>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-gold/20 bg-obsidian/60 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-6 md:h-20 md:px-10">
        <a
          href="#top"
          className="font-serif text-xl font-medium tracking-wide2 text-ivory md:text-2xl"
          aria-label="VALLIÈRE — home"
        >
          VALLIÈRE
        </a>

        <div className="flex items-center gap-5 md:gap-7">
          <LanguageToggle />

          <span className="hidden h-4 w-px bg-white/15 sm:inline-block" />

          <a
            href="#apply"
            onClick={(e) => handleAnchorScroll(e, "apply")}
            className="group relative hidden items-center overflow-hidden border border-gold/20 px-6 py-2.5 text-[0.66rem] tracking-[0.28em] text-champagne backdrop-blur-md transition-all duration-500 hover:border-gold/70 hover:bg-gold/[0.04] hover:text-ivory hover:shadow-[0_0_28px_-10px_rgba(212,175,55,0.55)] active:scale-[0.98] sm:inline-flex"
          >
            {t.nav.cta}
            {/* Refined underline sweep on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold/60 transition-all duration-500 group-hover:w-1/2"
            />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
