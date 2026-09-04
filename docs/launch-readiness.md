# STAX website — launch readiness

Target: launch the custom static site on **GitHub Pages** at **stax.stanford.edu**, via the Stanford Web Services "Website Launch Request" form.

## How hosting works (confirmed)
- Repo lives in a **Stanford GitHub org** (Cardinal Cloud GitHub — free with SUNet: <https://uit.stanford.edu/service/github>). Default org is "Stanford Developers"; a lab can request its own.
- **GitHub Pages** serves the site. Development URL is `https://<org>.github.io/stax-website`.
- `stax.stanford.edu` is a **CNAME → `<org>.github.io`**, requested through Stanford (this launch form / Vanity URL), subject to **University Communications** approval.
- A free **GitHub Action** builds/deploys on every commit; a content edit in GitHub publishes in ~1–2 min. Working Stanford example: `stanford-rc/globus.stanford.edu`.

## Done — brand compliance (Stanford Identity Guide)
- [x] **Stanford Identity Bar** at the top of every page (Cardinal, links to stanford.edu, nothing above it except the skip link).
- [x] **Stanford Global Footer** at the bottom of every page (required unalterable links: Stanford Home, Maps & Directions, Search Stanford, Emergency Info, Terms of Use, Copyright, Trademarks, Non-Discrimination).
- [x] **Accessibility** report link in the local footer.
- [x] **Cardinal `#8C1515`** for brand surfaces (identity bar, header, CTA); **Digital Red `#B1040E`** for interactive elements (links, buttons) to meet contrast.
- [x] Stanford black `#2E2D29`; primary palette throughout.
- [ ] **Typography** — the current display/body fonts (Bricolage Grotesque + Archivo) are not Stanford's official typefaces. **Confirm with GSB Communications** whether they're acceptable or must be swapped (e.g., Source Sans / Source Serif). *Only open brand item.*
- [ ] Replace the identity-bar/footer text wordmark with the official Stanford **signature asset** if Comms requires it.

## Done — accessibility (WCAG 2.1 AA / Siteimprove)
- [x] Mobile menu button now opens the nav (keyboard + Escape support).
- [x] Decorative research thumbnails use `alt=""`.
- [x] "Skip to main content" link added; `<main id="main">` target.
- [x] Repeated "Read paper" links get a distinct accessible name (paper title).
- [x] Darkened the failing light-grey (`--soft`) to pass contrast; fixed white-on-white button hover; strengthened inactive nav contrast.
- [x] Dead `href="#"` event links converted to non-links (add real URLs when available).
- [x] Research filters use `aria-pressed` toggle buttons; visible keyboard focus styles.
- [ ] Register the launched site in **Siteimprove** (via the form) and review the report; fix anything it flags.
- [ ] When the interest form is wired to a backend, add success/error `aria-live` feedback + `required` fields.

## Pending — content & ownership (lab decisions)
- [ ] Real **headshots + full names + titles + bios** for the 9–10 people.
- [ ] Confirm **research/news** items to feature (some papers have external coauthors).
- [ ] Real **event** dates and any registration links.
- [ ] Decide the **content-editing workflow** (GitHub file edits vs. a form CMS) — see the handoff plan.
- [ ] Move repo + hosting to a **lab-owned GitHub org**; name a business owner + technical web admin.

## Launch form — recommended answers
- **Desired subdomain:** `stax.stanford.edu`
- **Development URL:** `https://<org>.github.io/stax-website` (once on Pages)
- **Replaces existing site:** Yes (the current Drupal stax.stanford.edu — coordinate its removal)
- **Kind of site:** "Launched on GitHub Pages…" (this is also the brand-compliance attestation)
- **Crawlable:** Yes
- **Siteimprove:** log in at <https://siteimprove.stanford.edu> and check the box
- **Notify:** Kevin (Lab Director), Becky & Juan Carlos, current site manager

## Key references
- Identity Guide / brand compliance — <https://identity.stanford.edu/digital/web-design/brand-compliance/>
- Web colors (Digital Red #B1040E) — <https://identity.stanford.edu/design-elements/color/web/>
- Minimum Web Standards — <https://uit.stanford.edu/guide/webstandards>
- Accessibility policy (WCAG) — <https://uit.stanford.edu/accessibility/policy>
- Cardinal Cloud GitHub — <https://uit.stanford.edu/service/github>
