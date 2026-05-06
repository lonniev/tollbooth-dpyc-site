# Pricing Studio screenshots

The PricingStudio section's carousel reads from this directory.
Filenames are referenced from
`src/components/PricingStudioCarousel.tsx` — match them or update
the `SCREENS` array there.

## Expected files

| File | Caption suggestion |
|---|---|
| `01-pricing-editor.webp` | Live pricing editor — edit per-tool prices inline, diff against live server |
| `02-constraint-pipeline.webp` | Constraint pipeline builder — surge, happy-hour, supply caps |
| `03-campaign-interview.webp` | Six-phase pricing campaign interview with Claude |
| `04-grok-second-opinion.webp` | Second opinion from Grok before deploy |
| `05-account-statement.webp` | Per-patron statement infographics |

If a file is missing, the carousel renders a placeholder card naming
the expected path — handy for confirming naming once you start
dropping files in.

## Capture + convert recipe

On the iPad: full-screen the Studio, take a screenshot (Top button +
Volume Up, or Home + Lock for older models). AirDrop the PNGs to your
Mac, drop them in this directory, then convert each to WebP:

```bash
cd public/pricing-studio
for f in *.PNG; do
  cwebp -q 85 "$f" -o "$(basename "$f" .PNG | tr '[:upper:]' '[:lower:]').webp"
  rm "$f"  # optional, after you confirm the WebP looks right
done
```

`brew install webp` if `cwebp` isn't on your path.

## Aspect ratio

The carousel container is `aspect-[4/3]` — landscape, matching how
the iPad is actually used (and viewed in the marketing mockup, which
shows the device in laptop orientation). Capture screens in
**landscape** with the iPad held wide, or rotate after the fact.

If you ever need portrait again, change the class on the container in
`PricingStudioCarousel.tsx` to `aspect-[3/4]` and adjust the iPad
mockup's aspect ratio to match. Mixing portrait and landscape in the
same carousel makes letterboxing unavoidable on one or the other —
pick a single ratio.

## Adding or removing screens

Edit the `SCREENS` array in
`src/components/PricingStudioCarousel.tsx` — append or trim entries
freely. The dots, keyboard nav, and auto-advance auto-adjust.
