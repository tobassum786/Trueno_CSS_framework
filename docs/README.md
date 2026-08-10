# ⚡ Trueno CSS Framework — Documentation

Welcome to the official documentation for **Trueno CSS Framework** — a modern, responsive, mobile-first CSS framework built with Sass using the 7-1 architecture pattern.

This documentation covers every layer of the framework, from the abstract design tokens to fully styled components, layout primitives, theming, and utility classes.

---

## 📚 Documentation Index

### 🚀 Getting Started
- [Getting Started](./getting-started.md) — Installation, build, dev workflow, and basic usage
- [Architecture](./architecture.md) — Folder structure and the 7-1 pattern

### 🎨 Design System
- [Abstract Layer](./abstract.md) — Sass variables, mixins, functions, and placeholders
- [Customization & Design Tokens](./customization.md) — CSS custom properties and theming

### 🧱 Framework Layers
- [Base Styles](./base.md) — Resets and typography
- [Layout](./layout.md) — Grid system and header
- [Components](./components.md) — Buttons, cards, modals, navbars, alerts, badges, pagination, and breadcrumbs
- [Utilities](./utilities.md) — Spacing and helper classes
- [Themes](./themes.md) — Light and dark themes
- [Vendors](./vendors.md) — Third-party stylesheet integration

### 🤝 Community
- [Contributing](./contributing.md) — How to contribute, code standards, dev setup
- [Changelog](./changelog.md) — Version history and release notes

---

## ⚡ What is Trueno CSS?

Trueno CSS is a lightweight, modular CSS framework written in **Sass**. It provides:

- **Modular Architecture** — Import only the partials you need
- **Mobile-First Design** — Every breakpoint is min-width based
- **Theming Support** — Light and dark themes out of the box
- **Utility-First Utilities** — Spacing, display, text alignment, and more
- **Pre-Built Components** — Buttons, cards, modals, navbars, alerts, badges, pagination, and breadcrumbs
- **Accessible by Default** — Semantic patterns and ARIA-friendly markup
- **Zero Runtime Dependencies** — Pure CSS output, no JavaScript required

---

## 🏗️ Framework at a Glance

| Layer | Folder | Purpose |
| --- | --- | --- |
| Abstract | `src/abstract/` | Sass variables, mixins, functions, placeholders |
| Vendors | `src/vendors/` | Third-party styles (e.g., Normalize.css) |
| Base | `src/base/` | Resets, typography, element defaults |
| Layout | `src/layout/` | Grid, header, and structural primitives |
| Components | `src/components/` | Buttons, cards, modals, navbars, badges |
| Utilities | `src/utilities/` | Spacing, helpers, display, text |
| Themes | `src/themes/` | Light and dark theme overrides |

The entry point is **`src/main.scss`**, which composes the partials in the canonical 7-1 order.

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the framework (outputs to dist/)
npm run build

# 3. Watch for changes during development
npm run dev
```

Then include the compiled stylesheet in your HTML:

```html
<link rel="stylesheet" href="dist/trueno-css-framework.min.css">
```

---

## 📦 Build Outputs

| File | Description |
| --- | --- |
| `dist/trueno-css-framework.css` | Expanded (development) build |
| `dist/trueno-css-framework.min.css` | Compressed (production) build |

---

## 📖 Reading Order

If you're new to Trueno CSS, read the docs in this order:

1. **Getting Started** → install and run the framework
2. **Architecture** → understand how the source is organized
3. **Abstract** → learn the design tokens (variables, mixins)
4. **Base**, **Layout**, **Components**, **Utilities** → consume the framework
5. **Customization & Themes** → tailor the framework to your brand

---

## 📄 License

Trueno CSS is released under the **MIT License**.

---

Built with ⚡ by the Trueno CSS team.
