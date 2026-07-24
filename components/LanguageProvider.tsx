"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { content, type Dictionary, type Lang } from "@/lib/content";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Holds the active language and exposes the matching dictionary via `t`.
 * Switching languages briefly fades the content so the swap reads as a
 * deliberate transition rather than an abrupt text flip. Form state and
 * scroll position are preserved because nothing unmounts — only opacity
 * animates and the text nodes reconcile in place.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");
  const [fading, setFading] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    document.documentElement.lang = lang === "EN" ? "en" : "tr";
  }, [lang]);

  useEffect(() => {
    const pending = timeouts.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      setFading(true);
      timeouts.current.push(
        setTimeout(() => setLangState(next), 180),
        setTimeout(() => setFading(false), 220),
      );
    },
    [lang],
  );

  const toggle = useCallback(
    () => setLang(lang === "EN" ? "TR" : "EN"),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: content[lang] }}>
      <div
        className={`transition-opacity duration-200 ease-out ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}
