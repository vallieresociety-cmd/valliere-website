/**
 * Dark, cinematic Unsplash imagery used as low-opacity background layers.
 * URLs are size-capped and auto-formatted so they render immediately without
 * any build-time processing. Swap these for owned/licensed assets before
 * launch — Unsplash source URLs are placeholders.
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const images = {
  // Sharp, high-contrast modern glass architecture — elite and ambitious.
  hero: unsplash("1486406146926-c627a92ad1ab", 2000),
  // Dark, candlelit fine-dining table with elegant glassware.
  initialTable: unsplash("1414235077428-338989a2e8c0"),
  // Close-up of code / design execution on a laptop.
  coBuilding: unsplash("1461749280684-dccba630e2f6"),
  // Moody nighttime cityscape / geometric lines.
  earlyBelievers: unsplash("1519501025264-65ba15a82390"),
};
