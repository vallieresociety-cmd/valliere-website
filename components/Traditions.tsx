"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

export default function Traditions() {
  const { t } = useLang();

  return (
    <section
      id="traditions"
      className="relative border-t border-white/[0.06] py-24 sm:py-28 md:py-36"
    >
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-4 text-[0.7rem] uppercase tracking-luxe text-gold/80 sm:mb-5">
            {t.traditions.label}
          </p>
          <h2 className="font-serif text-3xl font-light leading-tight text-ivory sm:text-4xl md:text-5xl">
            {t.traditions.heading}
          </h2>
        </Reveal>

        {/* Editorial rows — refined and airy, distinct from the pillar cards */}
        <div className="border-t border-white/[0.08]">
          {t.traditions.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div className="group grid grid-cols-1 gap-4 border-b border-white/[0.08] py-11 transition-colors duration-500 md:grid-cols-12 md:gap-10 md:py-14">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="font-serif text-2xl text-gold/60 transition-colors duration-500 group-hover:text-gold">
                    {item.index}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-ivory md:text-[1.7rem]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm font-light leading-loose text-slate md:col-span-8 md:text-[0.95rem]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
