# Changelog

All notable changes to **Trueno CSS Framework** are documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- **Gradient utilities** — a complete `src/utilities/_gradients.scss` layer covering backgrounds, text, and border gradients:
  - **Direction modifiers** (`.u-gradient-to-t` / `-tr` / `-r` / `-br` / `-b` / `-bl` / `-l` / `-tl`) that set `--tr-grad-angle` and compose with any gradient utility.
  - **Named background gradients** (`.u-bg-gradient-{hue}`) for every color plate: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `blue`, `indigo`, `violet`, `green`, `red`, `amber`, `cyan`, `gray`, `slate`, `thunder`. Each emits a 2-stop linear gradient.
  - **3-stop variants** (`.u-bg-gradient-{hue}-3`) for the same hues using soft (200) → mid (500) → deep (800) of the same plate.
  - **Pre-baked brand combinations**: `.u-bg-gradient-sunset`, `-ocean`, `-forest`, `-aurora`, `-trueno` (the framework's signature), `-midnight`.
  - **50 advanced gradient recipes** (`.u-bg-gradient-{name}`) — a curated `$gradient-recipes` map where each class ships with its own baked-in `--tr-grad-angle` (0° → 340°) and 2–3 evenly spaced stops, grouped by mood (cool blues/indigos, warm reds/ambers, greens/teals, and multi-hue blends). Direction modifiers still override the baked angle.
  - **Radial and conic** utilities: `.u-bg-gradient-radial`, `.u-bg-gradient-conic`.
  - **Text gradients** (`.u-text-gradient-{hue}`, plus `.u-text-gradient-trueno`) using `background-clip: text`.
  - **Border gradients** (`.u-border-gradient`, `.u-border-gradient-{hue}`) using the layered-background technique with a `--tr-surface` mask.
  - **Custom-property runtime tuning**: `--tr-grad-angle`, `--tr-grad-stop-1/2/3`, `--tr-surface` — every utility exposes its stops so they can be tuned inline without writing a new class.
  - **Base scaffolding**: `.u-bg-gradient` and `.u-bg-gradient-3` for fully custom stops.
- New `Gradients` section in `docs/utilities.md` documenting the runtime variables, all hue tables, the 3-stop variants, the brand combinations, the 50 advanced recipes, and dark-theme `--tr-surface` integration.
- New `Gradients` and `Advanced gradient recipes` sections in the documentation site (`docs-site/pages/utilities.html`) with a hue swatch grid, live gradient builder, brand-combo gallery, and a full 50-recipe gallery with baked-in angles.
- `docs/README.md` now lists gradients under the Utilities layer and updates the framework-at-a-glance table.

### Changed
- Renamed `src/abstract/_veriables.scss` to `src/abstract/_variables.scss` (typo fix).
- Expanded and clarified comments across all partials.
- `src/main.scss` now `@use`s the new `utilities/_gradients` partial as part of layer 6 (utilities).

### Fixed
- `base/_typography.scss` link section now correctly notes that link styles are handled in `_resets.scss`.
- Modal `.is-open` state now correctly lifts z-index to `$z-index-modal`.

---

## [1.0.0] — Initial Release

### Added
- **Abstract layer** — color, typography, spacing, border, breakpoint, and z-index design tokens; flexbox and media query mixins; `rem()` and `get-color()` functions; `visually-hidden`, `list-reset`, and `clearfix` placeholders.
- **Base layer** — minimal CSS reset and typography defaults for body, headings, paragraphs, and links.
- **Layout layer** — 12-column flexbox grid (`.container`, `.row`, `.col`, `.col-{n}`, `.col-{breakpoint}-{n}`) and a default `.main-header` site header pattern.
- **Components**
  - `.btn` button system — base, primary, secondary, outline-primary, and small/large size modifiers
  - `.card` with `.card__header`, `.card__body`, `.card__footer`, `.card__title`, `.card__text`
  - `.modal` with `.modal__dialog`, `.modal__header`, `.modal__title`, `.modal__close-btn`, `.modal__body`, `.modal__footer`, animated open state
- **Utilities**
  - Spacing scale: `.m-*`, `.p-*`, `.mt-*`, `.mb-*`, `.ml-*`, `.mr-*`, `.mx-*`, `.my-*` with `0`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `auto` sizes
  - Helpers: `.u-text-left/-center/-right`, `.u-d-block/-inline-block/-flex/-none`, `.u-hidden`, `.u-invisible`, `.u-sr-only`, `.u-clearfix`, `.u-float-left/-right/-none`
- **Themes**
  - Light theme (default)
  - Dark theme (`.theme--dark` class) with overrides for body, headings, links, header, and cards
- **Vendors** — placeholder for Normalize.css
- **Build pipeline** — `npm run build` for production (expanded + minified CSS and JS), `npm run dev` for watch mode
- **Examples** — starter projects in `examples/`
- **Brand assets** — `Logo.png`, `Logo-alt.png`, `favicon.png`, `Home.png`

### Notes
- Framework is CSS-only by default — an optional vanilla JS bundle powers the interactive components.
- Official React and Vue wrapper packages live in `wrappers/` (`trueno-css-react`, `trueno-css-vue`).
- Targets the two latest versions of every major desktop and mobile browser.
- Follows the 7-1 architecture pattern; entry point is `src/main.scss`.

---

## Versioning Policy

| Bump | When |
| --- | --- |
| **Major** (1.x → 2.x) | Breaking changes — renamed or removed classes, restructured files, dropped browser support. |
| **Minor** (1.0 → 1.1) | New backwards-compatible features — new components, utilities, mixins, or theme tokens. |
| **Patch** (1.0.0 → 1.0.1) | Bug fixes and small improvements that do not change the public API. |

---

## Roadmap

The following items are under consideration for future releases:

- **Form components** — input, textarea, select, checkbox, radio, validation states
- **Feedback components** — toasts, tooltips, popovers
- **More utilities** — color helpers (`.text-primary`, `.bg-light`), sizing, position, responsive display variants
- **Additional themes** — high-contrast, sepia, brand-specific starter themes
- **Unit tests / visual regression** — automated checks for the compiled output

Have a feature request? Open an issue on [GitHub](https://github.com/tobassum786/Trueno_CSS_framework/issues).
