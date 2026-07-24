"use client";

import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative z-[2] pb-16 pt-2">
      <div className="mx-auto max-w-container px-6 text-center md:px-10">
        {/* Subtle contact row */}
        <div className="flex items-center justify-center gap-8 text-[0.68rem] uppercase tracking-wide2">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate transition-colors duration-300 hover:text-ivory"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate transition-colors duration-300 hover:text-ivory"
          >
            X
          </a>
          <a
            href="mailto:vallieresociety@gmail.com"
            className="text-slate transition-colors duration-300 hover:text-champagne"
          >
            vallieresociety@gmail.com
          </a>
        </div>

        {/* Brand lines */}
        <p className="mt-10 font-serif text-sm tracking-luxe text-ivory">
          {t.footer.brand}
        </p>
        <p className="mt-3 text-[0.68rem] uppercase tracking-wide2 text-slate">
          {t.footer.tagline}
        </p>
      </div>
    </footer>
  );
}
