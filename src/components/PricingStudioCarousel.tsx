// Pricing Studio screenshot carousel — full visual unit.
//
// Owns its own iPad bezel + 3D tilt + crossfading image + dots +
// caption. Renders cleanly when an image is missing (placeholder
// card naming the expected path). Auto-advances every 4.5s, pauses
// on hover/focus and when scrolled off-screen, with manual dots and
// keyboard arrows when focused.
//
// Screen order, image paths, and captions live in
// src/data/pricing-studio-screens.json — edit there to add, remove,
// reorder, or rephrase. Component code doesn't change.
//
// Caption sits BELOW the iPad bezel so screenshot content isn't
// obscured. Body text styles match the rest of the site.

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import manifest from '../data/pricing-studio-screens.json';

type Screen = {
  src: string;
  alt: string;
  caption: string;
};

const SCREENS: Screen[] = manifest.screens;
const AUTO_ADVANCE_MS = 4500;

// Split "Network Topology. Registered Authorities and Operators..."
// into a bold title and a regular description.  Falls back gracefully
// when the caption has no period or is empty.
function splitCaption(caption: string): { title: string; desc: string } {
  const idx = caption.indexOf('. ');
  if (idx === -1) return { title: caption, desc: '' };
  return { title: caption.slice(0, idx + 1), desc: caption.slice(idx + 2) };
}

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

  // Pause when scrolled off-screen — no cycles burned in background.
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
  const { title, desc } = splitCaption(current.caption);

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
      className="focus:outline-none"
    >
      {/* iPad bezel: rounded-[28px] black bezel with a subtle ring, a
          tiny front-camera dot at top-center, and the screen rendered
          inside a slightly smaller rounded inset. The .ipad-tilt class
          applies the 3D rotation above lg, flat on mobile. */}
      <div
        className="ipad-tilt relative rounded-[28px] bg-ink-900 p-2.5 sm:p-3 ring-1 ring-ink-400/40"
        style={{
          boxShadow:
            '0 50px 80px -30px rgba(0, 0, 0, 0.7), 0 25px 40px -20px rgba(225, 167, 48, 0.10)',
        }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ink-400/60" />

        <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden bg-gradient-to-br from-ink-600 to-ink-700 ring-1 ring-ink-300/10">
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
                  <p className="text-sm italic mb-3">Drop a screenshot here:</p>
                  <code className="text-xs text-brand-300 font-mono break-all">
                    public{current.src}
                  </code>
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
            </motion.div>
          </AnimatePresence>

          {/* Dots — a thin strip pinned to the bottom of the screen. */}
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
      </div>

      {/* Caption — below the iPad, body-text styles, crossfades with
          the slide. Title bolded, description regular weight. */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`caption-${index}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4 }}
          className="mt-6 lg:mt-8 text-base text-ink-100 leading-relaxed text-center max-w-prose mx-auto"
        >
          <strong className="text-ink-50 font-semibold">{title}</strong>
          {desc && <> {desc}</>}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
