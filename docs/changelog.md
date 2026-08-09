# Changelog

All notable changes to **Trueno CSS Framework** are documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Comprehensive per-layer documentation in `docs/`:
  - `getting-started.md` — install, build, dev workflow
  - `architecture.md` — 7-1 folder structure and naming conventions
  - `abstract.md` — variables, mixins, functions, placeholders
  - `base.md` — resets and typography
  - `layout.md` — grid system and header
  - `components.md` — buttons, cards, modals
  - `utilities.md` — spacing and helpers
  - `themes.md` — light and dark theme usage
  - `customization.md` — design tokens, overrides, tree-shaking
  - `vendors.md` — third-party stylesheet integration
  - `contributing.md` — contribution guide and code standards
  - `changelog.md` — this file
- New docs index at `docs/README.md` with reading order and quick links.

### Changed
- Renamed `src/abstract/_veriables.scss` to `src/abstract/_variables.scss` (typo fix).
- Expanded and clarified comments across all partials.

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
- **Build pipeline** — `npm run build` for production (expanded + minified), `npm run dev` for watch mode
- **Examples** — starter projects in `examples/`
- **Brand assets** — `Logo.png`, `Logo-alt.png`, `favicon.png`, `Home.png`

### Notes
- Framework is CSS-only — no JavaScript runtime required.
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
- **Navigation components** — navbar, breadcrumbs, tabs, pagination
- **Feedback components** — alerts, toasts, tooltips, popovers
- **More utilities** — color helpers (`.text-primary`, `.bg-light`), display helpers, sizing, position
- **CSS custom properties** — first-class `:root` variables for runtime theming
- **Additional themes** — high-contrast, sepia, brand-specific starter themes
- **Unit tests / visual regression** — automated checks for the compiled output
- **CDN distribution** — pre-built bundles via jsDelivr / unpkg

Have a feature request? Open an issue on [GitHub](https://github.com/tobassum786/Trueno_CSS_framework/issues).
