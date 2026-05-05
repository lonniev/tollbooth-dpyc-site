import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
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
            Charge per tool call.{' '}
            <span className="text-brand-400 font-semibold">Skip the payment popup.</span>
          </h1>
          <p className="mt-8 text-xl text-ink-100 leading-relaxed max-w-readable">
            Tollbooth DPYC™ monetizes MCP servers with pre-funded Bitcoin Lightning
            balances. Patrons fund once. Then they use your tools without interruption —
            no KYC, no subscriptions, no per-request payment negotiation.
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
