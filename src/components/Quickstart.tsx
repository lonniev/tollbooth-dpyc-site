import { motion } from 'framer-motion';
import { Copy, Github } from 'lucide-react';
import { useState } from 'react';

const SNIPPET = `pip install tollbooth-dpyc

# server.py
from fastmcp import FastMCP
from tollbooth.runtime import OperatorRuntime, register_standard_tools
from tollbooth.tool_identity import (
    ToolIdentity, STANDARD_IDENTITIES, capability_uuid,
)
from tollbooth.slug_tools import make_slug_tool

mcp = FastMCP("my-mcp")
tool = make_slug_tool(mcp, "my")  # tools become my_<name>

# Domain tools, registered by UUID-derived ToolIdentity.tool_id
DOMAIN = [
    ToolIdentity(
        capability="get_weather",
        category="read",
        intent="Current weather for a coordinate.",
    ),
]
TOOL_REGISTRY = {ti.tool_id: ti for ti in DOMAIN}

runtime = OperatorRuntime(
    tool_registry={**STANDARD_IDENTITIES, **TOOL_REGISTRY},
    service_name="My MCP",
)

# Standard tools — check_balance, purchase_credits, Secure Courier,
# proof exchange, pricing, onboarding — all from the wheel.
register_standard_tools(mcp, "my", runtime, service_name="my-mcp")

@tool
@runtime.paid_tool(capability_uuid("get_weather"))
async def get_weather(lat: float, lon: float, npub: str = "", proof: str = ""):
    return await weather.get(lat, lon)`;

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

          <div className="mt-12 rounded-lg border border-brand-400/40 bg-ink-800/60 p-6 flex items-start gap-4">
            <Github className="text-brand-400 flex-shrink-0 mt-0.5" size={28} />
            <div>
              <h3 className="font-semibold mb-1 text-lg">
                Open source. Apache-2.0.
              </h3>
              <p className="text-sm text-ink-100 leading-relaxed">
                Every component on GitHub — the wheel, Pricing Studio, the
                Authority service, the sample operator, the Oracle. Inspect,
                audit, fork, deploy. No closed-source dependencies, no opaque
                middleware. The protocol is the code.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
