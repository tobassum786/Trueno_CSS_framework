# Base Styles

The **base layer** applies element-level styles: resets that normalize cross-browser behavior, and typography defaults for headings, paragraphs, links, and forms. Base styles are intentionally low-specificity — components and utilities are expected to override them.

Source: `src/base/`

```
base/
├── _resets.scss
└── _typography.scss
```

---

## 1. `_resets.scss`

A lightweight, modern CSS reset. It does not rely on Normalize.css; instead, it implements the small set of rules Trueno CSS needs.

### What it does

| Concern | Behavior |
| --- | --- |
| **Box-sizing** | `html` is set to `box-sizing: border-box;`; every element inherits it. |
| **Font size baseline** | `html { font-size: 100% }` — guarantees `1rem = 16px`. |
| **Margin/padding reset** | Default margins and padding are zeroed on `body`, `h1`–`h6`, `p`, `blockquote`, `pre`, `dl`, `dd`, `ol`, `ul`, `figure`, `figcaption`. |
| **Images** | `max-width: 100%`, `height: auto`, and `display: block` (so images never overflow their parent and never add a baseline gap). |
| **Lists** | `<ul>` and `<ol>` are reset to no margin/padding/list-style via `%list-reset`. |
| **Form elements** | `input`, `button`, `textarea`, and `select` inherit font and color from their parent. |
| **Links** | No underline, color `$color-primary`; underline on `:hover`. |

### Code reference

```scss
html {
  box-sizing: border-box;
  font-size: 100%;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p,
blockquote, pre, dl, dd, ol, ul,
figure, figcaption {
  margin: 0;
  padding: 0;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

ul, ol {
  @extend %list-reset;
}

input, button, textarea, select {
  font: inherit;
  color: inherit;
}

a {
  color: $color-primary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
```

### Usage

The base layer is included automatically by `main.scss` — you do not need to import it directly. If you want to write a custom reset, place it **after** `base/_resets.scss` in your own entry file.

---

## 2. `_typography.scss`

Type defaults for `body`, `h1`–`h6`, `p`, and `a`.

### What it does

| Element | Styles applied |
| --- | --- |
| `body` | `font-family`, `font-size`, `line-height`, `color`, `background-color` |
| `h1`–`h6` | `font-family` (heading stack), `line-height: 1.2`, `margin-bottom: $spacing-sm`, `color` |
| `h1` | `font-size: $h1-font-size` (2.5rem) |
| `h2` | `font-size: $h2-font-size` (2rem) |
| `h3` | `font-size: $h3-font-size` (1.75rem) |
| `h4` | `font-size: $h4-font-size` (1.5rem) |
| `h5` | `font-size: $h5-font-size` (1.25rem) |
| `h6` | `font-size: $h6-font-size` (1rem) |
| `p` | `margin-bottom: $spacing-md` |
| `a` | Note in source: link styles are handled in `_resets.scss`; this file can be extended for additional link states. |

### Code reference

```scss
body {
  font-family: $font-family-base;
  font-size: $font-size-base;
  line-height: $line-height-base;
  color: $text-color-base;
  background-color: $color-white;
}

h1, h2, h3, h4, h5, h6 {
  font-family: $font-family-heading;
  line-height: 1.2;
  margin-bottom: $spacing-sm;
  color: $text-color-base;
}

h1 { font-size: $h1-font-size; }
h2 { font-size: $h2-font-size; }
h3 { font-size: $h3-font-size; }
h4 { font-size: $h4-font-size; }
h5 { font-size: $h5-font-size; }
h6 { font-size: $h6-font-size; }

p {
  margin-bottom: $spacing-md;
}
```

### Default values

Pulled from `abstract/_variables.scss`:

| Token | Value |
| --- | --- |
| `$font-family-base` | `'Helvetica Neue', Helvetica, Arial, sans-serif` |
| `$font-family-heading` | `'Roboto', sans-serif` |
| `$font-size-base` | `1rem` |
| `$line-height-base` | `1.5` |
| `$text-color-base` | `#333333` |

### Usage

The base typography is applied automatically. To change fonts globally, override the variables before the framework compiles:

```scss
// your-overrides.scss
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-family-heading: 'Poppins', sans-serif;
$text-color-base: #1a1a1a;
```

```scss
// your-app.scss
@use 'your-overrides' as *;
@use 'trueno/src/main';
```

### Per-element overrides

For one-off typographic tweaks, use utility classes from [Utilities](./utilities.md) or write your own CSS — Trueno CSS sets only what is needed, so most elements remain easy to style.

---

## Best Practices

1. **Do not duplicate base styles in components.** Use components to *compose* a heading or a paragraph inside a card, not to redefine `h1`–`h6` defaults.
2. **Override variables, not selectors.** Adjusting `$font-family-base` in your override file is much safer than writing a global `* { font-family: ... }` later.
3. **Respect the cascade order.** Base styles are intentionally low-specificity. If a component's style is not winning, the answer is rarely `!important` — usually it's an issue with selector order or specificity.
