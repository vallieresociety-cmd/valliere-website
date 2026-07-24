"use client";

import Reveal from "./Reveal";

/**
 * A realistic, human-sized founder's signature that seals the manifesto like
 * wet ink on a document — not a banner logo. Rendered inline at the close of
 * the Manifesto section.
 */
export default function Signature() {
  return (
    <Reveal delay={0.28} className="mt-16 text-center sm:mt-20">
      <p className="font-signature text-[2rem] leading-none text-champagne drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] sm:text-[2.4rem]">
        Vallière
      </p>

      <span className="mx-auto mt-6 block h-px w-40 max-w-[70%] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </Reveal>
  );
}
