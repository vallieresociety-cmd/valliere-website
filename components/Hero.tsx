"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { images } from "@/lib/images";
import { handleAnchorScroll } from "@/lib/smoothScroll";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Cinematic background image + darkening overlays for readability */}
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${images.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/85 to-obsidian" />
        <div className="absolute inset-0 bg-hero-glow" />
      </div>

      <div className="relative mx-auto w-full max-w-container px-6 md:px-10">
        <motion.p
          {...rise(0.1)}
          className="mb-8 text-[0.7rem] uppercase tracking-luxe text-slate"
        >
          <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-gold/50 align-middle" />
          {t.hero.badge}
        </motion.p>

        <motion.h1
          {...rise(0.22)}
          className="font-serif text-[clamp(3rem,14vw,12rem)] font-light leading-[0.92] tracking-tight sm:leading-[0.9]"
        >
          <span className="text-gold-gradient">VALLIÈRE</span>
        </motion.h1>

        <motion.p
          {...rise(0.4)}
          className="mt-5 font-serif text-xl font-light italic leading-snug text-ivory/90 sm:mt-6 sm:text-2xl md:text-4xl"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.p
          {...rise(0.52)}
          className="mt-6 max-w-xl text-base font-light leading-loose tracking-wide text-slate/90 sm:mt-7 sm:text-[1.05rem] md:text-lg"
        >
          {t.hero.subLead.pre}
          {t.hero.subLead.highlight}
          {t.hero.subLead.post}
        </motion.p>

        <motion.p
          {...rise(0.6)}
          className="mt-4 max-w-xl text-base font-normal leading-loose tracking-wide text-ivory/90 sm:text-[1.05rem] md:text-lg"
        >
          {t.hero.subEmphasis}
        </motion.p>

        <motion.div {...rise(0.74)} className="mt-10 sm:mt-12">
          <a
            href="#apply"
            onClick={(e) => handleAnchorScroll(e, "apply")}
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-gold/50 bg-white/[0.02] px-9 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-champagne backdrop-blur-md transition-all duration-500 hover:border-gold hover:bg-gold/[0.05] hover:text-ivory hover:shadow-[0_0_36px_-8px_rgba(212,175,55,0.45)] active:scale-[0.98] sm:w-auto"
          >
            {t.hero.cta}
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              &rarr;
            </span>
            {/* Elegant underline sweep on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold/70 transition-all duration-500 group-hover:w-2/3"
            />
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-luxe text-slate/70"
      >
        {t.hero.scroll}
      </motion.div>
    </section>
  );
}
