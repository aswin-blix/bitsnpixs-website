# Design notes: bitsnpixs.com redesign

Written before the build. Research sources: the live Odoo site (all nav and footer
pages) and its compiled CSS. The reference site xipidsports.com was used only for
high-level spirit (bold type hierarchy, generous whitespace, clear CTAs, purposeful
scroll motion). No layout, section order, component, visual or copy was taken from it.

## 1. Palette (exact values from the old site's CSS)

| Token | Hex | Old-site role |
|---|---|---|
| `--brand-primary` | `#6FAF2B` | `--primary`, accent buttons |
| `--brand-primary-deep` | `#588A22` | nav and text links |
| `--brand-primary-darkest` | `#2E4912` | links on tinted sections |
| `--brand-tint` | `#AEDF7B` | section wash (used at ~17% alpha), links on dark |
| `--brand-lime` | `#D9E89A` | panel backgrounds |
| `--brand-slate` | `#454D50` | `--secondary`, body text, default buttons |
| `--brand-night` | `#2C393E` | dark sections |
| `--brand-ink` | `#212529` | footer |
| `--brand-paper` / `--brand-mist` / `--brand-line` | `#FFFFFF` / `#F8F9FA` / `#E9ECEF` | surfaces and borders |

Rules built on it:

- Primary green is the dominant accent: fills, the thread motif, the 3D field, and
  text on dark surfaces. It is about 2.7:1 on white, so it is never used for small
  text on light surfaces; `--accent-text` (a darkened deep green) is used there.
- Washes, the dark "abyss" surface, glows and gradients are derived with
  `color-mix()` from the brand values, so one edit re-themes everything.
- The only non-brand colours are the six `--spectrum-*` thread colours, used
  solely in the Coloreel chapter, where "every colour on one thread" is the story.

All of this lives in `app/styles/tokens.css`.

## 2. Sitemap

| Route | Source page | Notes |
|---|---|---|
| `/` | Home | |
| `/about-us` | About Us | |
| `/services/embroidery-digitizing` | Service | shared service template |
| `/services/coloreel-embroidery-digitizing` | Service | shared service template |
| `/services/vector-artwork-conversion` | Service | shared service template |
| `/software-development-service` | Service | same template, old URL kept |
| `/portfolio` | Portfolio | 9 before/after pairs, 3 categories |
| `/career` | Career | "Apply" goes to Contact (the old /jobs page lists no openings) |
| `/contact-us` | Contact Us | 4 locations + form |
| `/blog` | Blogs (footer link) | index of the 12 posts, linking to the existing articles |
| `/shop` | Shop | pricing page for the 4 products, linking to the existing checkout |

Not rebuilt (Odoo functionality, linked out instead): `/shop/cart`, `/web/login`,
individual blog posts, `/jobs`.

## 3. Concept: "Pixels → Stitches"

BitsNPixs turns pixels into stitches, so the site tells that story with one motif:
**a single thread that runs through everything.**

- **Surfaces.** Light, airy "fabric" pages (paper, mist and the green wash) carry
  most content. The story chapters (process, Coloreel, software method) drop into a
  dark "machine room" surface so the green thread glows.
- **The thread.** A dashed running-stitch line is the recurring graphic: section
  dividers, link underlines, the scroll-progress thread at the page edge, the route
  between studios, and the progress line inside pinned chapters.
- **Pixels.** A faint pixel grid sits behind heroes and image placeholders; labels
  use a mono face, like stitch counts and file extensions on a machine readout.
- **Type.** Very large, tight display headlines against small mono eyebrows.

### Storytelling interactions (each tied to real content)

| Where | Interaction | Content it carries |
|---|---|---|
| Home hero | One Three.js point field: a pixel grid that re-forms into stitched waves on scroll and leans toward the cursor | Hero headline |
| Home | Pinned "How we do it" chapter; the thread sews from step to step | The 5 ordering steps |
| Coloreel | Horizontal pinned chapter; the thread shifts through the spectrum | The 8 Coloreel steps |
| Software | Same chapter component, numbered method | The 7 "How do we work" points |
| Portfolio | Drag (or arrow-key) compare slider | Before / after pairs |
| Embroidery | Placement picker on a line-drawn garment | Cap, left chest, jacket back + technique list |
| Services | Standard / Rush turnaround toggle | 24 h vs 2 to 12 h |
| Home, services | Marquee of machine formats | DST, PES, JEF ... |
| Contact | Studio route: four nodes joined by a stitched line | The 4 addresses |
| Everywhere | Staggered reveals, magnetic buttons, stitched underlines, route curtain | |

## 4. Fonts

The old site uses Gilroy (commercial licence). Replacements, all OFL and self-hosted
through `next/font/local`:

- **Display:** Bricolage Grotesque (variable): characterful, tight, confident.
- **Body:** Figtree (variable): the closest free match to Gilroy's geometric warmth.
- **Labels:** JetBrains Mono (variable): eyebrows, step numbers, file formats.

## 5. Architecture decisions

- **Content is data.** `lib/content.ts` (backed by `lib/content/*`) holds every
  string, typed. Pages are described as a hero plus a list of typed blocks, and one
  `BlockRenderer` maps blocks to section components. This keeps pages thin, makes
  the four service pages one template, and is ready for a CMS later.
- **Layers.** `components/ui` (presentational primitives) → `components/sections`
  (compose primitives, receive data via props) → `app/*` (routes only assemble).
- **Motion in one place.** `lib/motion.ts` (Framer variants, timings) and
  `lib/hooks/*` (`useGsap` with `gsap.context()` + `revert()`, `useMagnetic`,
  media/reduced-motion hooks). No section re-implements animation plumbing.
- **Performance.** Only transform/opacity are animated; the Three.js canvas is a
  dynamically imported client chunk (`ssr: false`), mounts when visible, caps DPR at
  1.5 and is replaced by a static pixel grid for reduced-motion users. Pinned
  chapters fall back to plain lists on small screens and with reduced motion.

## 6. Content decisions and gaps

See the "Missing content and placeholders" section of `README.md` for the full list.
Key calls: the placeholder header phone number is dropped; the two testimonial sets
stay on their own pages; mismatched Coloreel FAQ entries are omitted; no team,
case-study names or open roles are invented.
