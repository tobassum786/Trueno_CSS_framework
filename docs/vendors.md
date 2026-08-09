# Vendors

The **vendors** folder is the home for third-party stylesheets — Normalize.css, resets from other libraries, or anything else that should be loaded before the framework's own base styles.

Source: `src/vendors/`

```
vendors/
└── _normalize.scss
```

---

## Purpose

Vendors must come **first** in the compiled CSS, before any of the framework's own base, layout, or component styles. Loading order is controlled by `main.scss`:

```scss
// 1. Abstracts & Tools
@use 'abstract/_variables';
@use 'abstract/_mixins';
@use 'abstract/_functions';
@use 'abstract/_placeholders';

// 2. Vendors (if any)
// @use 'vendors/_normalize';
```

> ℹ️ The `@use 'vendors/_normalize';` line is currently commented out — Trueno CSS ships its own minimal reset in `base/_resets.scss` and does not require Normalize.css.

---

## Included File — `_normalize.scss`

`_normalize.scss` is a placeholder. By default it only contains a comment explaining how to enable Normalize.css:

```scss
// You can include Normalize.css here.
// Download it and place it in this folder, or import it from node_modules.
// Example: @import "~normalize.css/normalize.css";
// For now, this file is just a placeholder.
// A minimal reset is handled in _resets.scss.
```

---

## Adding a Third-Party Stylesheet

There are two common patterns.

### Option A — Place the file in the `vendors` folder

1. Download the stylesheet (e.g., `normalize.css`).
2. Place it in `src/vendors/`. Rename it to start with an underscore (e.g., `_normalize.scss`) so Sass treats it as a partial.
3. Uncomment the line in `main.scss`:

   ```scss
   @use 'vendors/_normalize';
   ```

### Option B — Import from `node_modules`

If the stylesheet is already a dependency in your `package.json`, you can import it directly:

```scss
// src/vendors/_normalize.scss
@use 'normalize.css/normalize.css';
```

```scss
// src/main.scss
@use 'vendors/_normalize';
```

### Option C — Reference a CDN in your HTML

If you do not need to compile a vendor stylesheet, link it from your HTML **before** the framework:

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css/normalize.css">
  <link rel="stylesheet" href="trueno-css-framework.min.css">
</head>
```

---

## Best Practices for Vendors

1. **Keep them isolated.** Vendor styles should never reference framework variables or mixins — if you find yourself reaching for one, copy the relevant rule into a base/component file instead.
2. **Update deliberately.** When a vendor releases a new major version, review the diff before bumping. Some resets introduce opinions that conflict with Trueno CSS.
3. **Document what you've added.** Drop a one-line comment in `main.scss` describing which version of which library is being loaded.
4. **Avoid duplicating resets.** Trueno CSS already ships a minimal reset. If you also include Normalize.css, you may get duplicate work and subtle visual differences. Pick one.

---

## When You Don't Need a Vendor File

Most projects do not need anything in `src/vendors/`. Trueno CSS's built-in reset (`base/_resets.scss`) handles:

- Box-sizing
- Margin and padding reset
- Image defaults
- Form element inheritance
- Link colors

If your project does not need a more aggressive normalize, leave the folder empty and let the framework do the work.
