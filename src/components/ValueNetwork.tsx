import valueNetwork from '../assets/value-network.jpg';

const alt =
  "Tollbooth DPYC value network: Bank, Lightning wallet, BTCPay, Patron, Patron's Nostr apps, Operator, Authority, Entrepreneur, tollbooth-dpyc SDK, the @tollbooth-dpyc/web libraries, Nostr, AWS EC2, Neon, Horizon, Cloudflare and the Bitcoin blockchain, connected by flows of sats, dollars, MCP calls, certificates and hosting, in seven steps: build, pre-fund, on-ramp, buy credit, certify, use, pay the bills.";

export default function ValueNetwork() {
  return (
    <figure className="mt-12 overflow-x-auto rounded-xl border border-[#3fe4ff]/20">
      <a href={valueNetwork} target="_blank" rel="noopener">
        <img
          src={valueNetwork}
          alt={alt}
          width={3144}
          height={2324}
          loading="lazy"
          className="block h-auto w-[1100px] max-w-none md:w-full"
        />
      </a>
    </figure>
  );
}
