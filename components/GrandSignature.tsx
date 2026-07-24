"use client";

import Reveal from "./Reveal";

/**
 * The grand, ceremonial signature block that sits directly above the footer —
 * a full-sized wet-ink seal closing the entire page. Distinct from the small,
 * human-sized seal embedded at the end of the Manifesto.
 */
export default function GrandSignature() {
  return (
    <section className="relative border-t border-white/[0.06] py-24 text-center sm:py-28 md:py-32">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <Reveal>
          <p className="mb-8 text-[0.66rem] uppercase tracking-luxe text-gold/50 sm:mb-10">
            Sealed by the founding table
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="font-signature text-6xl leading-none text-champagne drop-shadow-[0_0_18px_rgba(212,175,55,0.3)] sm:text-7xl md:text-8xl">
            Vallière
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <span className="mx-auto mt-10 block h-px w-56 max-w-[70%] bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:mt-12" />
        </Reveal>
      </div>
    </section>
  );
}
