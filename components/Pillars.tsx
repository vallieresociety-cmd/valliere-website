"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";
import { images } from "@/lib/images";

// Images pair with the cards by position; copy comes from the dictionary.
const cardImages = [images.initialTable, images.coBuilding, images.earlyBelievers];

export default function Pillars() {
  const { t } = useLang();

  return (
    <section
      id="pillars"
      className="relative border-t border-white/[0.06] py-24 sm:py-28 md:py-36"
    >
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-4 text-[0.7rem] uppercase tracking-luxe text-gold/80 sm:mb-5">
            {t.pillars.label}
          </p>
          <h2 className="font-serif text-3xl font-light leading-tight text-ivory sm:text-4xl md:text-5xl">
            {t.pillars.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-gold/20 bg-gold/[0.08] md:grid-cols-3">
          {t.pillars.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.12} className="h-full">
              <article className="group relative flex h-full min-h-[19rem] flex-col overflow-hidden bg-obsidian p-7 sm:min-h-[22rem] sm:p-8 md:p-10">
                {/* Dark imagery, kept subtle so text stays crisp */}
                <div aria-hidden className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-[0.18] transition-all duration-700 group-hover:scale-105 group-hover:opacity-30"
                    style={{ backgroundImage: `url(${cardImages[i]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian/60" />
                  {/* Soft ambient gold glow blooming on hover (desktop) */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(65% 55% at 50% 32%, rgba(212,175,55,0.12), transparent 70%)",
                    }}
                  />
                </div>

                <div className="relative flex h-full flex-col">
                  <div className="mb-8 flex items-baseline justify-between sm:mb-10">
                    <span className="font-serif text-2xl text-gold/70">
                      {card.index}
                    </span>
                    <span className="h-px w-10 bg-white/10 transition-all duration-500 group-hover:w-16 group-hover:bg-gold/60" />
                  </div>

                  <h3 className="mb-4 font-serif text-2xl font-normal text-ivory md:text-[1.7rem]">
                    {card.title}
                  </h3>
                  <p className="mt-auto text-sm font-light leading-relaxed text-slate">
                    {card.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
