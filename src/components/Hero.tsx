import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden">
      {/* Lower-right artwork: DPYC mark + BTC coin. Hidden on small
          screens so it never crowds the headline; absolutely
          positioned so it doesn't push layout. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-6 hidden sm:flex items-end gap-6 lg:right-12 lg:bottom-10"
      >
        <motion.img
          src="/btc-coin.svg"
          alt=""
          className="w-20 lg:w-28 drop-shadow-[0_8px_20px_rgba(247,147,26,0.45)]"
          animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <img
          src="/dpyc-logo.png"
          alt=""
          className="w-40 lg:w-56 opacity-90 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-brand-300 text-sm font-semibold tracking-widest uppercase mb-6">
            Don't Pester Your Customer™
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight">
            MCP Monetization for{' '}
            <span className="text-brand-400 font-semibold">BTC Entrepreneurs</span>
          </h1>
          <p className="mt-8 text-xl text-ink-100 leading-relaxed max-w-readable">
            Sound-money Commerce without KYC or KYT.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#quickstart"
              className="inline-flex items-center gap-2 rounded-md bg-brand-400 px-6 py-3 font-semibold text-ink-700 transition-transform hover:scale-[1.02] hover:bg-brand-300"
            >
              Quickstart <ArrowRight size={18} />
            </a>
            <a
              href="https://github.com/lonniev/tollbooth-dpyc"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-ink-300 px-6 py-3 font-semibold text-ink-50 transition-colors hover:border-brand-400 hover:text-brand-300"
            >
              <Github size={18} /> GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
