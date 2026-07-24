"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

export default function Vetting() {
  const { t } = useLang();

  return (
    <section
      id="vetting"
      className="relative border-t border-white/[0.06] py-24 sm:py-28 md:py-36"
    >
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal className="mb-14 max-w-2xl sm:mb-20">
          <p className="mb-4 text-[0.7rem] uppercase tracking-luxe text-gold/80 sm:mb-5">
            {t.vetting.label}
          </p>
          <h2 className="font-serif text-3xl font-light leading-tight text-ivory sm:text-4xl md:text-5xl">
            {t.vetting.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-slate">
            {t.vetting.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 sm:gap-0 md:grid-cols-3">
          {t.vetting.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.14}>
              <div className="relative border-t border-white/10 pt-8 md:pr-6 md:pt-10">
                {/* node marker */}
                <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-gold" />
                <span className="font-serif text-5xl font-light text-white/10 md:text-6xl">
                  {step.number}
                </span>
                <h3 className="mt-5 font-serif text-2xl font-normal text-ivory">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-slate">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
