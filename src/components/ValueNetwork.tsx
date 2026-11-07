import { useEffect, useRef } from 'react';
import { drawValueNetwork } from './valueNetworkDiagram';

const legend = [
  { color: 'var(--vn-btc)', label: 'Lightning sats' },
  { color: 'var(--vn-fiat)', label: 'US dollars' },
  { color: 'var(--vn-mcp)', label: 'MCP calls & answers' },
  { color: 'var(--vn-cert)', label: 'Certificates & identity' },
  { color: 'var(--vn-chain)', label: 'On-chain anchors' },
  { color: 'var(--vn-build)', label: 'Building & hosting' },
];

const steps = [
  { title: 'Build', body: 'An entrepreneur builds an Operator on the tollbooth-dpyc SDK and a Cloudflare front-end on @tollbooth-dpyc/web, then hosts both.' },
  { title: 'Pre-fund', body: 'The Operator buys api_sats from a Tollbooth Authority over Lightning.' },
  { title: 'On-ramp', body: 'A Patron with only a bank account buys sats into a Lightning wallet.' },
  { title: 'Buy credit', body: "The Patron pays the Operator's BTCPay invoice." },
  { title: 'Certify', body: "The invoice settles, the Patron's api_sats are credited, and the Authority certifies the sale for its tax." },
  { title: 'Use', body: "The Patron's AI agent, or a Cloudflare front-end, calls the Operator's MCP tools, and each fare is debited in api_sats." },
  { title: 'Pay the bills', body: 'The Operator sweeps sats to a wallet, sells some for dollars, and pays its hosts.' },
];

export default function ValueNetwork() {
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!hostRef.current || !svgRef.current) return;
    return drawValueNetwork(svgRef.current, hostRef.current);
  }, []);

  return (
    <figure ref={hostRef} className="value-network mt-12 grid gap-4">
      <div
        className="overflow-x-auto rounded-xl border border-[#3fe4ff]/20"
        style={{
          background: 'radial-gradient(1400px 900px at 50% 40%, #0d2552 0%, #071634 45%, #040b1c 100%)',
          boxShadow: '0 0 40px rgba(20,90,200,.25) inset',
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1600 980"
          role="img"
          aria-label="Tollbooth DPYC value network: Bank, Lightning wallet, BTCPay, Patron, Patron's Nostr apps, Operator, Authority, Entrepreneur, tollbooth-dpyc SDK, the @tollbooth-dpyc/web front-end libraries, Nostr, AWS EC2, Neon, Horizon, Cloudflare and the Bitcoin blockchain, connected by flows of sats, dollars, MCP calls, certificates and hosting."
          className="block h-auto w-[1150px] max-w-none md:w-full"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 font-['JetBrains_Mono',monospace] text-[11.5px] text-[#8fb0dc]">
        {legend.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-2 whitespace-nowrap" style={{ color: item.color }}>
            <i className="h-[3px] w-[22px] rounded-sm" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
            <b className="font-medium text-[#eaf4ff]">{item.label}</b>
          </span>
        ))}
      </div>
      <ol className="grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-4 xl:grid-cols-7">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="grid min-w-0 grid-cols-[auto_1fr] items-start gap-x-2 gap-y-0.5 rounded-lg border border-[#3fe4ff]/20 bg-[#3fe4ff]/5 p-2.5 text-sm leading-snug text-[#8fb0dc]"
          >
            <span
              className="row-span-2 grid h-6 w-6 place-items-center rounded-full font-['JetBrains_Mono',monospace] text-[11px] font-bold text-[#040b1c]"
              style={{ background: 'var(--vn-chain)', boxShadow: '0 0 10px var(--vn-chain)' }}
            >
              {i + 1}
            </span>
            <strong className="text-sm font-semibold uppercase tracking-widest text-[#eaf4ff]">{step.title}</strong>
            <span>{step.body}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
