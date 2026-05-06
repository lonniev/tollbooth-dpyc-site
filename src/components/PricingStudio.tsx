import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import PricingStudioCarousel from './PricingStudioCarousel';

export default function PricingStudio() {
  return (
    <section id="pricing-studio" className="border-t border-ink-400/30 bg-ink-800">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-brand-300 text-sm font-semibold tracking-widest uppercase mb-4 inline-flex items-center gap-2">
              <Eye size={14} /> An AI MBA Assistant, Not a Web Page
            </p>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
              Tollbooth Pricing Studio.
            </h2>
            <p className="mt-6 text-ink-100 leading-relaxed max-w-readable">
              A native iPadOS, mobile-friendly Pricing Campaign analyst for your
              Tollbooth-DPYC™ MCP.
            </p>
            <p className="mt-3 text-2xl text-brand-300 font-light leading-snug max-w-readable">
              Optimize your business, not your HTTP traffic.
            </p>
            <p className="mt-6 text-ink-100 leading-relaxed max-w-readable">
              Inspect, design, simulate, and deploy Tollbooth pricing models from
              an iPad. Load any Operator's pricing from its MCP endpoint, edit
              per-tool prices inline, build the constraint pipeline visually, and
              diff your changes against the live server before you push.
            </p>
            <ul className="mt-6 space-y-2 text-ink-100 text-sm">
              <li>— Live pricing editor with server-state diff before deploy</li>
              <li>— Constraint pipeline builder — surge, happy-hour, supply caps</li>
              <li>— Six-phase AI consultant (Claude) for designing a fresh model</li>
              <li>— Second-opinion review from Grok before you deploy</li>
              <li>— Multi-identity Nostr DM channel for credentials and Authority claims</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PricingStudioCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
