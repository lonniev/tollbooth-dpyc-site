# Changelog

All notable changes to the tollbooth-dpyc marketing/docs site are documented
here. This is a content site (no semantic version); entries are dated.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 2026-10-01

- operators: each card links to its page in the MCPs collection (mcps.tollbooth-dpyc.com), joined by endpoint URL at fetch time; "Browse the MCP collection" button added; a service with no page still links to its endpoint
- llms.txt: each entry names its collection page; the collection is listed under Site
- llms.txt: "How to connect" step 4 passes `npub` + `dpop_token` (said `proof_token` as `proof`)
- fetch-members: a failed collection fetch keeps the last snapshot's links; header comment no longer claims it runs during `npm run build`

## 2026-09-30

- pricing-studio: add the official "Download on the App Store" badge, linked to the live listing (id6760925205)
- quickstart: fix the snippet against SDK 0.97.0 — `ToolIdentity` requires `tool_id`; paid tools take `dpop_token` (not `proof`); `register_standard_tools` returns the slug decorator
- copy: the certification fee is debited from the Operator's balance at its Authority, not the Authority's own
- copy: credit expiry is the Operator's pricing choice; the SDK imposes none
- copy: Getting Started lists five steps (said six); deploy on Horizon instead of app.fastmcp.cloud
- registry: refresh snapshot + `llms.txt` (adds GoodEarth, ChartRemotely, BeesKnees)

## 2026-06-04

- content: `llms.txt` now describes the service, not just the registry
- copy: clarify that the operator nsec is the only required env var — every other secret arrives via Secure Courier
- copy: explain the Authority provisions Neon, and the certification fee compensates for that service
- copy: replace "Honor Chain identity" with "secure DPYC identity"
- structure: promote GETTING-STARTED to a first-class section
- pricing-studio: add the Consulting Bench screen to the carousel
