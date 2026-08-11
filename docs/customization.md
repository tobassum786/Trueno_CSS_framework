# Customization & Design Tokens

Trueno CSS is designed to be customized at three levels, in order of increasing effort:

1. **Sass variables** — change the source and recompile.
2. **Class-scope overrides** — append CSS to theme classes like `.theme--dark`.
3. **CSS custom properties** — drive the framework with runtime values.

This page documents the full set of design tokens and walks through each customization strategy.

---

## 1. Design Tokens

The complete set of tokens defined in `src/abstract/_variables.scss`.

### Colors

Every semantic color is derived from a [color plate](./colors.md) — a tonal scale defined once in `src/abstract/_colors.scss`. Change a plate and every component re-tints consistently.

| Token | Value | Plate source | Purpose |
| --- | --- | --- | --- |
| `$color-primary` | `#3b82f6` | `blue 500` | Primary actions, links by default |
| `$color-primary-hover` | `#2563eb` | `blue 600` | Primary hover |
| `$color-primary-soft` | `#dbe6fe` | `blue 100` | Primary tinted backgrounds |
| `$color-primary-soft-text` | `#1d4ed8` | `blue 700` | Text on primary tints |
| `$color-secondary` | `#4b5563` | `gray 600` | Secondary actions |
| `$color-success` | `#16a34a` | `green 600` | Success states |
| `$color-danger` | `#ef4444` | `red 500` | Errors and destructive actions |
| `$color-warning` | `#f59e0b` | `amber 500` | Warnings |
| `$color-info` | `#06b6d4` | `cyan 500` | Informational accents |
| `$color-light` | `#f9fafb` | `gray 50` | Light surface |
| `$color-dark` | `#1f2937` | `gray 800` | Dark surface |
| `$color-white` | `#ffffff` | — | Pure white |
| `$color-black` | `#000000` | — | Pure black |
| `$text-color-base` | `#111827` | `gray 900` | Default body text |
| `$text-color-light` | `#374151` | `gray 700` | Secondary text |
| `$text-color-muted` | `#6b7280` | `gray 500` | Muted text |

### Typography

| Token | Value | Purpose |
| --- | --- | --- |
| `$font-family-base` | `'Helvetica Neue', Helvetica, Arial, sans-serif` | Body font stack |
| `$font-family-heading` | `'Roboto', sans-serif` | Headings |
| `$font-size-base` | `1rem` | Body size |
| `$line-height-base` | `1.5` | Body line height |
| `$h1-font-size` | `2.5rem` | h1 |
| `$h2-font-size` | `2rem` | h2 |
| `$h3-font-size` | `1.75rem` | h3 |
| `$h4-font-size` | `1.5rem` | h4 |
| `$h5-font-size` | `1.25rem` | h5 |
| `$h6-font-size` | `1rem` | h6 |

### Spacing

| Token | Value | Pixels (at 16px root) |
| --- | --- | --- |
| `$spacing-unit` | `0.25rem` | 4px |
| `$spacing-xxs` | `0.125rem` | 2px |
| `$spacing-xs` | `0.25rem` | 4px |
| `$spacing-sm` | `0.5rem` | 8px |
| `$spacing-md` | `1rem` | 16px |
| `$spacing-lg` | `1.5rem` | 24px |
| `$spacing-xl` | `2rem` | 32px |
| `$spacing-xxl` | `3rem` | 48px |

### Borders

| Token | Value | Purpose |
| --- | --- | --- |
| `$border-color-base` | `#dee2e6` | Default border color |
| `$border-radius-sm` | `0.25rem` | Subtle rounding |
| `$border-radius-base` | `0.5rem` | Default rounding |
| `$border-width-base` | `1px` | Default border thickness |

### Breakpoints

| Token | Value | Sass mixin | Class prefix |
| --- | --- | --- | --- |
| `$breakpoint-sm` | `576px` | `@include media-sm { }` | `col-sm-` |
| `$breakpoint-md` | `768px` | `@include media-md { }` | `col-md-` |
| `$breakpoint-lg` | `992px` | `@include media-lg { }` | `col-lg-` |
| `$breakpoint-xl` | `1200px` | `@include media-xl { }` | `col-xl-` |

### Z-index

| Token | Value | Purpose |
| --- | --- | --- |
| `$z-index-dropdown` | `1000` | Dropdown menus |
| `$z-index-sticky` | `1020` | Sticky elements |
| `$z-index-fixed` | `1030` | Fixed elements |
| `$z-index-modal-backdrop` | `1040` | Modal overlay |
| `$z-index-modal` | `1050` | Modal dialog |
| `$z-index-tooltip` | `1070` | Tooltips |

---

## 2. Customizing via Sass Variables

The cleanest way to customize Trueno CSS is to override the variables in `src/abstract/_variables.scss` (or a copy of it) **before** the framework compiles.

### Project-level override pattern

```scss
// your-overrides.scss
$color-primary: #6c5ce7;        // brand color
$color-secondary: #00b894;      // accent color
$font-family-base: 'Inter', system-ui, sans-serif;
$border-radius-base: 0.75rem;   // softer corners
$spacing-md: 1.25rem;           // slightly larger default spacing
```

```scss
// your-app.scss
@use 'your-overrides' as *;
@use 'trueno/src/main';           // framework compiles with your overrides
```

The same pattern works for the build pipeline if you have your own `main.scss`:

```scss
@use 'your-overrides' as *;
@use 'trueno/src/abstract/variables' as *;
@use 'trueno/src/abstract/mixins' as *;
// ... continue composing the rest of the framework
```

### Sass module caveats

- `@use` evaluates each file **once** and caches the result. The order of `@use` calls does matter — your override file must be `@use`d **before** the framework's variables file.
- If you `@use 'trueno/src/abstract/variables' as *` *after* your overrides, your values still win for components that read variables from the same module. To guarantee a value, you can use the `!default` flag inside the framework's variables (the framework does not currently, but you can do it in your override file).

### Recompile

```bash
npm run build
```

Your overrides are baked into the compiled CSS.

---

## 3. Customizing at the CSS Level (No Recompile)

For teams that consume the **pre-built** CSS, you can override styles in your own stylesheet. The CSS specificity rules of the cascade apply.

### Override framework styles

```css
/* your-styles.css */
.btn--primary {
  background-color: #6c5ce7;
  border-color: #6c5ce7;
}

.card {
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

> ⚠️ Avoid `!important` for general overrides — it makes future overrides harder. Use it only when you must beat a utility class.

### Override per-section

```css
.hero .btn--primary {
  font-size: 1.25rem;
  padding: 1rem 2rem;
}
```

### Use CSS custom properties (preferred for runtime theming)

If you want the option to switch colors at runtime, expose tokens as CSS custom properties and consume them in your overrides:

```css
:root {
  --primary: #6c5ce7;
  --secondary: #00b894;
}

.btn--primary {
  background-color: var(--primary);
  border-color: var(--primary);
}
```

Then change `--primary` at runtime to retheme every button.

---

## 4. Extending Components

The recommended way to add a brand-specific button variant is to compose with the existing modifiers:

```html
<button class="btn btn--primary btn--lg">Big primary</button>
```

If you need a brand-specific look that the existing modifiers don't cover, **add a new modifier** rather than overriding the framework source:

```scss
// your-app.scss
.btn--brand {
  background: linear-gradient(135deg, #6c5ce7 0%, #00b894 100%);
  border: none;
  color: #fff;
}
```

```html
<button class="btn btn--brand">Brand Button</button>
```

> 💡 This is the safest customization strategy: the framework stays untouched, and your custom code lives in your own stylesheet where it can be versioned and reviewed normally.

---

## 5. Tree-Shaking Unused CSS

The compiled framework includes every component, utility, and theme. For very lean production builds, you can:

1. **Import only the partials you need** into your own `main.scss`:

   ```scss
   // your-app.scss
   @use 'trueno/src/abstract/variables' as *;
   @use 'trueno/src/abstract/mixins' as *;
   @use 'trueno/src/base/typography';
   @use 'trueno/src/layout/grid';
   @use 'trueno/src/components/button';
   @use 'trueno/src/components/card';
   @use 'trueno/src/utilities/spacing';
   @use 'trueno/src/utilities/helpers';
   ```

2. **Use PurgeCSS** in your build pipeline to remove any classes you don't reference in your HTML. The classes are uniquely named (`.u-`, `.col-`, `.btn--`, etc.), so PurgeCSS can match them safely.

   ```js
   // webpack.config.js (PostCSS)
   require('@fullhuman/postcss-purgecss')({
     content: ['./src/**/*.html'],
     safelist: ['is-open', /^theme--/],
   })
   ```

3. **Run the build** with `npm run build` (or your own build tool) to produce a minified, dead-code-free CSS file.

---

## 6. Custom Builds (Modifying the Source)

If you need a deeper change — for example, renaming `.btn--primary` to `.c-btn` everywhere — fork the framework, edit the partials, and recompile. The 7-1 architecture keeps the change local:

- Renaming a modifier: edit the relevant component file (e.g., `_button.scss`).
- Changing a class prefix: do a project-wide search/replace.
- Adding a new token: add a variable to `_variables.scss` and consume it in the appropriate file.

> ⚠️ Forking means you own the maintenance burden. The community will continue to evolve the upstream framework and you will need to merge changes carefully.

---

## 7. Quick Reference — Common Customizations

| I want to… | Strategy |
| --- | --- |
| Change the primary color | Override `$color-primary` in your Sass overrides. |
| Switch fonts globally | Override `$font-family-base` and `$font-family-heading`. |
| Round corners more | Override `$border-radius-base` and `$border-radius-sm`. |
| Tweak spacing scale | Override `$spacing-md` (and other spacing variables). |
| Switch to dark mode at runtime | Toggle the `.theme--dark` class on `<body>` (see [Themes](./themes.md)). |
| Add a new button variant | Compose a new `.btn--{name}` class in your own Sass file. |
| Add a brand new component | Create a new partial in `src/components/`, register it in `main.scss`. |
| Reduce CSS size | Use Sass partials selectively or run PurgeCSS against your HTML. |
| Rename a framework class | Search/replace the source, recompile, or fork the framework. |
