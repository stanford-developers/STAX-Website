# STAX Website Redesign

Redesign of the website for **STAX — The Stanford Initiative for Business, Taxation, and Society**, a cross-disciplinary tax research group at the Stanford Graduate School of Business (Economics · Finance · Accounting).

Current site: <https://stax.stanford.edu>

## What's here

This repo currently holds **three design directions** to choose from. Each is a complete, clickable, five-page prototype built with the real STAX content. Once a direction is picked, we build it out as the production site (Next.js on Vercel).

```
explorations/
  index.html          → comparison landing page — start here
  editorial/          → Direction 01 · "The Ledger"  (editorial / scholarly-journal)
  swiss/              → Direction 02 · "The Grid"    (Swiss / institutional-modern)
  warm/               → Direction 03 · "Quarter"     (warm humanist, RegLab-elevated)
content/
  stax-content.json   → single source of truth for all site content
docs/
  research-notes.md   → what we learned from STAX, GCAP, and RegLab
```

**To view:** open `explorations/index.html` in a browser and click into each direction. Everything runs from disk — no build step, no server.

## The brief (from the client)

- Simple and minimal, like the two reference sites: **GCAP** (globalcapitalallocation.com) and **Stanford RegLab** (reglab.stanford.edu).
- A clean **About** page with headshots + positions (RegLab-style).
- A **Research** page like GCAP's — the current STAX site has *"fonts way too big for the abstracts and everything looks way too busy."* Fixed here: abstracts are set small, calm, and airy.
- Pages: **Home, Research, About, Events, Careers** (at least).
- A **Careers** page listing open jobs linked to Stanford application portals — not populated yet, but ready to be.
- Some **basic scrolling animations**.
- **Must not look like a generic AI site** ("no pills and shit") — so: no decorative pill/badge chips, no purple gradients, no glassmorphism, no Inter/Roboto, no emoji. Each direction commits to a real, distinctive aesthetic.

## The three directions

| # | Name | Aesthetic | Type | Palette |
|---|------|-----------|------|---------|
| 01 | **The Ledger** | Editorial / scholarly journal | Fraunces + Newsreader + IBM Plex Mono | Warm paper, ink, cardinal |
| 02 | **The Grid** | Swiss / institutional-modern | Archivo + Space Mono | White, near-black, cardinal |
| 03 | **Quarter** | Warm humanist (RegLab, elevated) | Bricolage Grotesque + Spectral | Bone, warm ink, cardinal |

All three use Stanford Cardinal (`#8C1515`) as the single accent, GCAP-style small-abstract research listings, and a RegLab-style people grid.

## Content notes

- People, mission text, events, and news are pulled from the live STAX site and are accurate as of the research date.
- The **research paper list is representative** — drawn from public STAX topics and Stanford Report coverage. Titles/authors/abstracts should be confirmed by STAX before launch.
- **Headshots are monogram placeholders** (initials) — real photos drop in later. We do not use fake face photos.
- **Careers listings are examples** showing the layout; positions are not yet posted. "Apply" links point to <https://careersearch.stanford.edu/> and get swapped for specific job-requisition URLs.

## Next step

Pick a direction. Then the production build:

- **Next.js (App Router) + TypeScript + Tailwind**, deployed on **Vercel**.
- Real routes for each page, content driven by `content/stax-content.json` (easy for STAX to edit).
- Scroll animations via CSS + a small motion layer, respecting `prefers-reduced-motion`.
- Slots for real headshots and live job-requisition links.
