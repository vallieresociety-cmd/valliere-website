/**
 * Cinematic, slow-easing smooth scroll.
 *
 * Honors the exact requested curve — cubic-bezier(0.25, 1, 0.5, 1) — over a
 * heavy ~1.35s glide, driven by requestAnimationFrame so it never feels like an
 * aggressive anchor jump. Falls back to an instant jump for prefers-reduced-motion.
 */

import type { MouseEvent } from "react";

/** Returns an easing function for a CSS cubic-bezier(x1, y1, x2, y2) curve. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDerivX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  // Solve for the parametric t that yields the given x (progress), then read y.
  const solveT = (x: number) => {
    let t = x;
    for (let i = 0; i < 6; i++) {
      const xEst = sampleX(t) - x;
      const d = sampleDerivX(t);
      if (Math.abs(xEst) < 1e-5 || d === 0) break;
      t -= xEst / d;
    }
    return t;
  };

  return (x: number) => sampleY(solveT(x));
}

const ease = cubicBezier(0.25, 1, 0.5, 1);

export function smoothScrollTo(targetId: string, duration = 1350) {
  if (typeof window === "undefined") return;

  const el = document.getElementById(targetId);
  if (!el) return;

  const reduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const startY = window.scrollY;
  const endY = Math.round(el.getBoundingClientRect().top + window.scrollY);
  const distance = endY - startY;

  if (reduce || Math.abs(distance) < 4) {
    window.scrollTo(0, endY);
    return;
  }

  let startTime: number | null = null;

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/** Anchor click handler: prevents the default jump and glides instead. */
export function handleAnchorScroll(
  e: MouseEvent<HTMLAnchorElement>,
  targetId: string,
) {
  e.preventDefault();
  smoothScrollTo(targetId);
  // Keep the hash in sync without triggering a native jump.
  if (history.replaceState) history.replaceState(null, "", `#${targetId}`);
}
