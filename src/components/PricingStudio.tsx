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
              <Eye size={14} /> The economy is observable
            </p>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
              {/* [section headline TBD] */}
              Pricing Studio: see the dashboard a black-box payment processor would never show you.
            </h2>
            <p className="mt-6 text-ink-100 leading-relaxed max-w-readable">
              {/* [section copy TBD — owner's voice] */}
              An iOS app that visualizes the constraints, tranche lifetimes, demand curves,
              and per-patron account statements behind your operator. Change pricing models,
              add surge windows, set happy-hour discounts — the same data your patrons can
              audit, you can edit live.
            </p>
            <ul className="mt-6 space-y-2 text-ink-100 text-sm">
              <li>— Constraint editor with real-time evaluation against your active model</li>
              <li>— Tranche lifetime visualizer (no demurrage charged in arrears)</li>
              <li>— Per-patron statement infographics — auditable, signed, shareable</li>
              <li>— Built natively in Swift; works against your live MCP</li>
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
