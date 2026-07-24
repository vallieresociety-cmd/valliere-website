"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

// Silky, velvet easing for the accordion reveal.
const SILK = [0.16, 1, 0.3, 1] as const;

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-white/[0.08]">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-300 sm:py-8"
        >
          <span
            className={`font-serif text-xl font-light transition-colors duration-300 sm:text-2xl ${
              isOpen ? "text-ivory" : "text-ivory/80 group-hover:text-ivory"
            }`}
          >
            {q}
          </span>
          {/* Minimal +/- toggle */}
          <span className="relative h-4 w-4 flex-shrink-0">
            <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-gold/70" />
            <span
              className={`absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-gold/70 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                isOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    height: { duration: 0.55, ease: SILK },
                    opacity: { duration: 0.4, ease: SILK, delay: isOpen ? 0.06 : 0 },
                  }
            }
            // Promote to its own compositor layer so the reveal stays silky on mobile.
            style={{ willChange: "height, opacity", transform: "translateZ(0)" }}
            className="overflow-hidden [backface-visibility:hidden]"
          >
            <p className="max-w-2xl pb-8 pr-10 text-sm font-light leading-relaxed text-slate sm:text-[0.95rem]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-white/[0.06] py-24 sm:py-28 md:py-36"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal className="mb-12 sm:mb-16">
          <p className="mb-4 text-[0.7rem] uppercase tracking-luxe text-gold/80 sm:mb-5">
            {t.faq.label}
          </p>
          <h2 className="font-serif text-3xl font-light leading-tight text-ivory sm:text-4xl md:text-5xl">
            {t.faq.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="border-t border-white/[0.08]">
          {t.faq.items.map((item, i) => (
            <AccordionItem
              key={item.q}
              index={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
