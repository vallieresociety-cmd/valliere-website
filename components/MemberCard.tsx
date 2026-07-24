"use client";

import { useLang } from "./LanguageProvider";

/**
 * A live, matte gold-foil member-card preview. The holder name projects in
 * real time from the application form's AD SOYAD field.
 */
export default function MemberCard({ name }: { name: string }) {
  const { t } = useLang();
  const holder = name.trim();

  return (
    <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-[#161514] via-[#0d0d0e] to-black shadow-[0_28px_70px_-34px_rgba(212,175,55,0.55)]">
      {/* Gold-foil sheen + ambient bloom */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          background:
            "radial-gradient(120% 90% at 0% 0%, rgba(212,175,55,0.55), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold/10 blur-3xl"
      />
      {/* Fine engraved border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-xl border border-gold/10"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
        {/* Top row: crest + house line */}
        <div className="flex items-start justify-between">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-7 w-7 text-gold/80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              d="M12 2.5l7.5 2.7v6.1c0 4.7-3.2 8-7.5 9.7-4.3-1.7-7.5-5-7.5-9.7V5.2L12 2.5z"
              strokeLinejoin="round"
            />
            <path
              d="M12 8l1.15 2.5 2.7.28-2.02 1.83.57 2.66L12 15.9l-2.37 1.37.57-2.66L8.18 10.78l2.7-.28L12 8z"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[0.55rem] uppercase tracking-[0.25em] text-gold/70">
            Vallière Society
          </span>
        </div>

        {/* Signature logo */}
        <p className="font-signature text-4xl leading-none text-champagne drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] sm:text-5xl">
          Vallière
        </p>

        {/* Dynamic holder line */}
        <div>
          <p className="text-[0.5rem] uppercase tracking-[0.3em] text-slate/60">
            Vallière Member Card
          </p>
          <p
            className={`mt-1.5 truncate text-base tracking-[0.12em] transition-colors duration-300 sm:text-lg ${
              holder ? "text-ivory" : "text-slate/40"
            }`}
          >
            {holder || t.application.cardNamePlaceholder}
          </p>
          <p className="mt-2 text-[0.5rem] uppercase tracking-[0.3em] text-gold/60">
            {t.application.cardStatus}
            <span className="mx-2 text-white/20">•</span>2026
          </p>
        </div>
      </div>
    </div>
  );
}
