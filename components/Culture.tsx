"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

export default function Culture() {
  const { t } = useLang();
  const c = t.culture;

  return (
    <section
      id="culture"
      className="relative border-t border-white/[0.06] py-24 sm:py-28 md:py-36"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal className="mb-10 text-center sm:mb-12">
          <p className="text-[0.7rem] uppercase tracking-luxe text-gold/80">
            {c.label}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Dictionary-definition card */}
          <div className="relative overflow-hidden border border-white/[0.08] bg-white/[0.015] px-7 pb-10 pt-14 sm:px-12 sm:pb-14 sm:pt-16 md:px-16">
            {/* Subtle backdrop lighting behind the entry */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-gold/[0.06] blur-3xl"
            />

            {/* Oversized decorative open-quote */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 left-4 select-none font-serif text-[7rem] leading-none text-gold/25 sm:left-8 sm:text-[9rem]"
            >
              &ldquo;
            </span>

            <div className="relative">
              {/* Headword */}
              <h2 className="font-serif text-5xl font-light italic leading-none text-ivory sm:text-6xl md:text-7xl">
                {c.word}
              </h2>

              {/* Phonetic + part of speech */}
              <p className="mt-5 font-serif text-lg italic text-slate sm:text-xl">
                <span className="text-ivory/70">{c.phonetic}</span>
                <span className="mx-3 align-middle text-gold/60">&bull;</span>
                <span className="text-sm not-italic uppercase tracking-wide2 text-gold/90">
                  {c.pos}
                </span>
              </p>

              {/* Hairline separating entry head from definition */}
              <div className="my-8 h-px w-full bg-white/[0.08]" />

              {/* Definition body — two-paragraph heritage narrative */}
              <div className="space-y-6">
                <p className="font-serif text-xl font-light leading-relaxed text-slate/90 sm:text-2xl sm:leading-relaxed">
                  {c.p1}
                </p>
                <p className="font-serif text-xl font-light leading-relaxed text-ivory/90 sm:text-2xl sm:leading-relaxed">
                  {c.p2pre}
                  <span className="italic text-gold-gradient">
                    {c.p2highlight}
                  </span>
                  {c.p2post}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
