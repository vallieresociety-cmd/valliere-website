"use client";

import Reveal from "./Reveal";
import Signature from "./Signature";
import { useLang } from "./LanguageProvider";

export default function Manifesto() {
  const { t } = useLang();

  return (
    <section
      id="manifesto"
      className="relative border-t border-white/[0.06] py-24 sm:py-28 md:py-40"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <p className="mb-8 text-[0.7rem] uppercase tracking-luxe text-gold/80 sm:mb-10">
            {t.manifesto.label}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-serif text-[1.55rem] font-light leading-[1.55] text-slate/90 sm:text-[1.7rem] sm:leading-[1.6] md:text-[2.15rem] md:leading-[1.6]">
            {t.manifesto.p1}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-10 font-serif text-[1.55rem] font-light leading-[1.55] text-ivory/90 sm:mt-14 sm:text-[1.7rem] sm:leading-[1.6] md:text-[2.15rem] md:leading-[1.6]">
            {t.manifesto.p2pre}
            <span className="italic text-gold-gradient">
              {t.manifesto.p2highlight}
            </span>
            {t.manifesto.p2post}
          </p>
        </Reveal>

        {/* Wet-ink founder's seal closing the manifesto */}
        <Signature />
      </div>
    </section>
  );
}
