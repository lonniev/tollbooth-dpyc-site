// Crossfading screenshot carousel for the Pricing Studio section.
//
// Auto-advances every 4.5s, pauses on hover/focus and when scrolled
// off-screen, with manual dots for tap-to-jump and keyboard arrows
// when focused.  Each screen falls back to a "drop your file here"
// placeholder so the component renders cleanly before any WebPs are
// added.  Drop screenshots in /public/pricing-studio/ matching the
// `src` paths in the SCREENS array below.

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Screen = {
  src: string;
  alt: string;
  caption: string;
};

const SCREENS: Screen[] = [
  {
    src: '/pricing-studio/01-pricing-editor.webp',
    alt: 'Live pricing editor showing per-tool prices and a diff against the live server',
    caption:
      'Live pricing editor — edit per-tool prices inline, diff against the live server before deploy.',
  },
  {
    src: '/pricing-studio/02-constraint-pipeline.webp',
    alt: 'Constraint pipeline builder with surge, happy-hour, and supply-cap steps',
    caption:
      'Constraint pipeline builder — surge windows, happy-hour discounts, supply caps, all visual.',
  },
  {
    src: '/pricing-studio/03-campaign-interview.webp',
    alt: 'Six-phase AI consultant interview screen',
    caption:
      'Six-phase pricing campaign interview — Claude as your AI MBA consultant.',
  },
  {
    src: '/pricing-studio/04-grok-second-opinion.webp',
    alt: 'Grok second-opinion review of a pricing proposal',
    caption:
      'Second opinion from Grok — independent review before you deploy.',
  },
  {
    src: '/pricing-studio/05-account-statement.webp',
    alt: 'Per-patron account statement infographic',
    caption:
      'Per-patron statement infographics — auditable, signed, shareable.',
  },
];

const AUTO_ADVANCE_MS = 4500;

export default function PricingStudioCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [errored, setErrored] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const advance = (delta: number) =>
    setIndex((i) => (i + delta + SCREENS.length) % SCREENS.length);

  // Auto-advance, pausing when hovered/focused or off-screen.
  useEffect(() => {
    if (paused || !visible) return;
    const id = setInterval(() => advance(1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, visible]);

  // Detect visibility — burns no cycles when scrolled away.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      advance(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      advance(1);
    }
  };

  const current = SCREENS[index];
  const isErrored = !!errored[index];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Pricing Studio screens"
      className="relative aspect-[3/4] rounded-2xl border border-ink-400/40 bg-gradient-to-br from-ink-600 to-ink-700 overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-400/40"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {isErrored ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-ink-200">
              <p className="text-sm italic mb-3">
                Drop a screenshot here:
              </p>
              <code className="text-xs text-brand-300 font-mono break-all">
                public{current.src}
              </code>
              <p className="mt-4 text-xs text-ink-300 max-w-[28ch] leading-relaxed">
                {current.caption}
              </p>
            </div>
          ) : (
            <img
              src={current.src}
              alt={current.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={() => setErrored((e) => ({ ...e, [index]: true }))}
              className="w-full h-full object-cover"
            />
          )}

          {/* Caption overlay — only when an image actually loaded. */}
          {!isErrored && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/95 via-ink-900/60 to-transparent pt-12 pb-14 px-5">
              <p className="text-sm text-ink-50 leading-snug">{current.caption}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dots — pinned to bottom, on top of the gradient. */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
        {SCREENS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to screen ${i + 1} of ${SCREENS.length}`}
            aria-current={i === index ? 'true' : 'false'}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? 'bg-brand-400 w-6'
                : 'bg-ink-200/40 hover:bg-ink-100/60 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
