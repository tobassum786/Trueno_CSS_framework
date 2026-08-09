# Architecture

Trueno CSS follows the **7-1 pattern** — the most widely adopted Sass architecture for scalable, maintainable CSS frameworks. The pattern organizes styles into **7 folders** and **1 entry file** (`main.scss`).

---

## Why 7-1?

- ✅ **Clear separation of concerns** — design tokens, base styles, components, and utilities each live in their own folder.
- ✅ **Tree-shakeable** — import only the layers you need.
- ✅ **Discoverable** — new contributors instantly know where to find or add a file.
- ✅ **No naming conflicts** — the partial-prefix convention (`u-`, `col-`, `btn--`, etc.) keeps the cascade predictable.

---

## Folder Layout

```
src/
├── abstract/              # 1. Design tokens & Sass toolkit
│   ├── _variables.scss    #   Colors, typography, spacing, breakpoints, z-index
│   ├── _mixins.scss       #   Flex helpers, media queries, button-base, visually-hidden
│   ├── _functions.scss    #   rem(), get-color()
│   └── _placeholders.scss #   %visually-hidden, %list-reset, %clearfix
│
├── vendors/               # 2. Third-party styles
│   └── _normalize.scss    #   Placeholder for Normalize.css / resets from other libs
│
├── base/                  # 3. Element-level styles
│   ├── _resets.scss       #   Box-sizing, margin reset, link defaults
│   └── _typography.scss   #   Headings, body, paragraphs
│
├── layout/                # 4. Page-level primitives
│   ├── _grid.scss         #   .container, .row, .col, .col-{breakpoint}-{n}
│   └── _header.scss       #   .main-header, .main-nav
│
├── components/            # 5. Reusable UI components
│   ├── _button.scss       #   .btn, .btn--primary, .btn--outline-primary, sizes
│   ├── _card.scss         #   .card, .card__header, .card__body, .card__footer
│   └── _modal.scss        #   .modal, .modal__dialog, .modal__header, ...
│
├── utilities/             # 6. Single-purpose helper classes
│   ├── _spacing.scss      #   .m-*, .p-*, .mt-*, .px-*, ...
│   └── _helpers.scss      #   .u-text-*, .u-d-*, .u-float-*, .u-sr-only
│
├── themes/                # 7. Theme overrides
│   ├── _light-theme.scss  #   Light theme defaults (scaffold)
│   └── _dark-theme.scss   #   .theme--dark class
│
└── main.scss              # Single entry file — composes every layer
```

---

## The Single Entry File: `main.scss`

`main.scss` is the only file that knows about every other file. It is what the build script compiles.

```scss
// 1. Abstracts & Tools
@use 'abstract/_variables';
@use 'abstract/_mixins';
@use 'abstract/_functions';
@use 'abstract/_placeholders';

// 2. Vendors (if any)
// @use 'vendors/_normalize';

// 3. Base styles
@use 'base/_resets';
@use 'base/_typography';

// 4. Layout
@use 'layout/_grid';
@use 'layout/_header';

// 5. Components
@use 'components/_button';
@use 'components/_card';
@use 'components/_modal';

// 6. Utilities
@use 'utilities/_spacing';
@use 'utilities/_helpers';

// 7. Themes
@use 'themes/_light-theme';
@use 'themes/_dark-theme';
```

> ⚠️ **Order matters.** Sass `@use` resolves dependencies at the top of the file, but the *output order* in the compiled CSS still follows the textual order. The cascade depends on the cascade order in the source — putting themes last means theme rules can override component defaults.

---

## Loading Order Rules

The order in `main.scss` is intentional:

| # | Layer | Why it goes here |
| --- | --- | --- |
| 1 | **Abstract** | Defines variables, mixins, and placeholders used everywhere else. Has no CSS output by itself. |
| 2 | **Vendors** | Third-party resets (e.g., Normalize.css) must come first so the rest of the framework can override them. |
| 3 | **Base** | Element-level defaults (typography, resets) need to come before components. |
| 4 | **Layout** | Structural primitives (grid, header) provide containers that components sit inside. |
| 5 | **Components** | Component styles only need to win against the base, never against utilities or themes. |
| 6 | **Utilities** | Single-purpose helpers that should sit above components so they can override at the leaf. |
| 7 | **Themes** | Theme overrides are scoped to selectors like `.theme--dark` and come last so they always win. |

---

## Naming Conventions

Trueno CSS uses **BEM (Block–Element–Modifier)** for components and a **prefix convention** for utilities.

### Components — BEM

```scss
.card { }                 // Block
.card__header { }         // Element
.card__body { }           // Element
.btn { }                  // Block
.btn--primary { }         // Modifier
.btn--outline-primary { } // Modifier
.btn--sm { }              // Modifier (size)
```

- **Block** — the standalone component (`.card`)
- **Element** — a child of the block, separated by `__` (`.card__header`)
- **Modifier** — a variant of the block, separated by `--` (`.btn--primary`)

### Utilities — `u-` prefix

```scss
.u-text-center { }
.u-d-flex { }
.u-float-left { }
.u-sr-only { }
```

The `u-` prefix signals "this is a utility — it has `!important` and a single responsibility."

### Grid — `col-` and `col-{breakpoint}-{n}`

```scss
.col { }          // Auto-flex column
.col-6 { }        // 6 of 12 columns
.col-md-4 { }     // 4 of 12 columns at md and up
.col-lg-3 { }     // 3 of 12 columns at lg and up
```

---

## Dependency Graph

```
abstract/*  (no dependencies)
   ↑
vendors/*  (depends on abstract)
   ↑
base/*  (depends on abstract)
   ↑
layout/*  (depends on abstract, base)
   ↑
components/*  (depends on abstract, base, layout)
   ↑
utilities/*  (depends on abstract)
   ↑
themes/*  (depends on everything — overrides at the leaf)
```

Each layer may `@use` the layers above it in the diagram. The reverse is not allowed — for example, `abstract/_variables.scss` should never `@use` a component file.

---

## Extending the Framework

### Add a new component

1. Create `src/components/_your-component.scss`.
2. Follow BEM naming and `@use` only the abstract layer.
3. Add `@use 'components/_your-component';` to `main.scss`.
4. Document the new component in `docs/components.md`.

### Add a new utility

1. Create or extend a file in `src/utilities/`.
2. Prefix the class with `u-`.
3. Use the `!important` flag — utilities must always win.
4. Document the new utility in `docs/utilities.md`.

### Add a new theme

1. Create `src/themes/_your-theme.scss`.
2. Scope every selector to a top-level class (e.g., `.theme--yourname`).
3. Add `@use 'themes/_your-theme';` to `main.scss` (last).
4. Document the theme in `docs/themes.md`.

---

## File-by-File Reference

For deeper detail on every file in the framework, see:

- [Abstract Layer](./abstract.md)
- [Base Styles](./base.md)
- [Layout](./layout.md)
- [Components](./components.md)
- [Utilities](./utilities.md)
- [Themes](./themes.md)
- [Vendors](./vendors.md)
