import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

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
              <Eye size={14} /> A workbench, not a dashboard
            </p>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
              Pricing Studio. The native iPadOS workbench for your Tollbooth.
            </h2>
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
            className="aspect-[3/4] rounded-2xl border border-ink-400/40 bg-gradient-to-br from-ink-600 to-ink-700 p-8 flex items-center justify-center text-ink-200"
          >
            {/* TODO: replace with real Pricing Studio screenshot/Loom */}
            <span className="text-sm italic">[ Pricing Studio screenshot — drop a PNG in /public/pricing-studio.png ]</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
