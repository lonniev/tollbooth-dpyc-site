import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { useState } from 'react';

const SNIPPET = `pip install tollbooth-dpyc

# In your FastMCP server:
from tollbooth import OperatorRuntime, register_standard_tools, ToolIdentity

TOOL_REGISTRY = {
    "get_weather": ToolIdentity(
        capability="get_weather",
        category="read",
        intent="Returns current weather for a coordinate.",
    ),
}

runtime = OperatorRuntime(tool_registry=TOOL_REGISTRY)

@tool
@runtime.paid_tool(TOOL_REGISTRY["get_weather"].tool_id)
async def get_weather(lat: float, lon: float, npub: str = "", proof: str = ""):
    return await weather.get(lat, lon)

register_standard_tools(mcp, slug="weather", rt=runtime)`;

export default function Quickstart() {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="quickstart" className="border-t border-ink-400/30 bg-ink-700">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
            Five minutes to a paid tool.
          </h2>
          <p className="mt-4 text-ink-100 max-w-readable">
            Install the wheel. Decorate one async function. Register the standard
            tools. The SDK handles identity, billing, rollback, and audit — you
            write only the domain code.
          </p>

          <div className="mt-10 relative rounded-lg border border-ink-400/40 bg-ink-800 overflow-hidden">
            <button
              onClick={onCopy}
              className="absolute top-3 right-3 inline-flex items-center gap-1 rounded border border-ink-400/40 bg-ink-700/80 px-3 py-1.5 text-xs text-ink-100 hover:border-brand-400 hover:text-brand-300"
              aria-label="Copy snippet"
            >
              <Copy size={14} /> {copied ? 'Copied' : 'Copy'}
            </button>
            <pre className="overflow-x-auto p-6 text-sm font-mono leading-relaxed text-ink-50">
              <code>{SNIPPET}</code>
            </pre>
          </div>

          <p className="mt-6 text-ink-200 text-sm">
            Reference implementation:{' '}
            <a
              href="https://github.com/lonniev/tollbooth-sample"
              target="_blank"
              rel="noreferrer"
              className="text-brand-300 hover:text-brand-200 underline underline-offset-4"
            >
              tollbooth-sample
            </a>{' '}
            — copy and run it locally before wiring your own domain code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
