"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import MemberCard from "./MemberCard";
import { useLang } from "./LanguageProvider";

const labelClass =
  "mb-3 block text-[0.62rem] tracking-[0.22em] text-slate/80";
const inputClass =
  "w-full border-b border-neutral-800 bg-transparent pb-3 text-ivory placeholder:text-slate/40 transition-all duration-500 focus:border-gold/60 focus:outline-none";

export default function Application() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [pledged, setPledged] = useState(false);
  const [fullName, setFullName] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const a = t.application;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pledged || sending) return;

    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSending(true);
    setFailed(false);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const textFields = [
    { name: "fullName", type: "text", ...a.fullName },
    { name: "university", type: "text", ...a.university },
    { name: "email", type: "email", ...a.email },
    { name: "url", type: "url", ...a.url },
  ] as const;

  return (
    <section
      id="apply"
      className="relative border-t border-white/[0.06] py-24 sm:py-28 md:py-40"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal className="mb-14 text-center sm:mb-16">
          <p className="mb-4 text-[0.7rem] uppercase tracking-luxe text-gold/80 sm:mb-5">
            {a.label}
          </p>
          <h2 className="font-serif text-3xl font-light leading-tight text-ivory sm:text-4xl md:text-5xl">
            {a.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-slate">
            {a.subheading}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start md:gap-14 lg:gap-20">
          {/* Left — the live member card, primary visual anchor */}
          <div className="md:sticky md:top-28">
            <Reveal>
              <MemberCard name={fullName} />
            </Reveal>

            {/* Digital onboarding note — the Vallière Member Card */}
            <Reveal delay={0.12} className="mt-8">
              <div className="flex items-start gap-4 border border-white/[0.08] bg-white/[0.015] px-6 py-5">
                {/* Crest / seal emblem — a membership badge, not a payment card */}
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold/70"
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
                <p className="text-xs font-light leading-relaxed text-slate sm:text-[0.8rem]">
                  {a.cardNote}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — the application form */}
          <div>
            <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="border border-gold/25 bg-gold/[0.04] px-8 py-16 text-center"
            >
              <p className="font-serif text-3xl font-light text-gold-gradient">
                {a.successTitle}
              </p>
              <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-relaxed text-slate">
                {a.successBody}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              {/* Honeypot — hidden from humans, only bots fill it. */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {textFields.map((field) => (
                <div key={field.name}>
                  <label className={labelClass} htmlFor={field.name}>
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    autoComplete="off"
                    className={inputClass}
                    {...(field.name === "fullName"
                      ? {
                          value: fullName,
                          onChange: (e) => setFullName(e.target.value),
                        }
                      : {})}
                  />
                </div>
              ))}

              <div>
                <label className={labelClass} htmlFor="project">
                  {a.project.label}
                </label>
                <textarea
                  id="project"
                  name="project"
                  required
                  rows={3}
                  placeholder={a.project.placeholder}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="value">
                  {a.value.label}
                </label>
                <textarea
                  id="value"
                  name="value"
                  required
                  rows={3}
                  placeholder={a.value.placeholder}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Core cohort pledge — seamless inline, no heavy box */}
              <label className="flex cursor-pointer items-center gap-3 transition-transform duration-300 active:scale-[0.99]">
                <input
                  type="checkbox"
                  name="pledge"
                  checked={pledged}
                  onChange={(e) => setPledged(e.target.checked)}
                  className="peer sr-only"
                  required
                />
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center border border-neutral-700 transition-all duration-300 peer-checked:border-gold/70 peer-checked:bg-gold/10 peer-checked:shadow-[0_0_10px_-2px_rgba(212,175,55,0.5)] peer-focus-visible:ring-1 peer-focus-visible:ring-gold/50">
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className="h-2.5 w-2.5 text-gold opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
                  >
                    <path d="M3 8.5l3 3 7-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-xs italic leading-relaxed text-neutral-400">
                  {a.pledge}
                </span>
              </label>

              <div>
                <button
                  type="submit"
                  disabled={!pledged || sending}
                  aria-disabled={!pledged || sending}
                  aria-busy={sending}
                  className={`group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border px-9 py-4 text-[0.7rem] uppercase tracking-[0.22em] backdrop-blur-md transition-all duration-500 ${
                    pledged && !sending
                      ? "border-gold/50 bg-white/[0.02] text-champagne hover:border-gold hover:bg-gold/[0.05] hover:text-ivory hover:shadow-[0_0_36px_-8px_rgba(212,175,55,0.45)] active:scale-[0.98]"
                      : "cursor-not-allowed border-white/10 bg-transparent text-slate/40"
                  }`}
                >
                  {sending ? a.sending : a.submit}
                  {/* Elegant underline sweep on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold/70 transition-all duration-500 group-hover:w-1/2"
                  />
                </button>

                {failed && (
                  <p
                    role="alert"
                    className="mt-4 text-center text-xs font-light text-red-300/80"
                  >
                    {a.error}
                  </p>
                )}
              </div>

              <p className="text-center text-[0.68rem] uppercase tracking-wide2 text-slate/60">
                {a.confidence}
              </p>
            </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
