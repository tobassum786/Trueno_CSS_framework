# Abstract Layer

The **abstract layer** is the Sass-only toolkit of the framework. It produces **no CSS output on its own** — it only defines variables, mixins, functions, and placeholders that every other layer consumes.

Source: `src/abstract/`

```
abstract/
├── _variables.scss
├── _mixins.scss
├── _functions.scss
└── _placeholders.scss
```

---

## 1. `_variables.scss`

All design tokens for the framework live here. The file is the single source of truth for color, typography, spacing, borders, breakpoints, and z-index scales.

### Color tokens

Semantic colors are derived from the [color plates](./colors.md) in `_colors.scss` — edit a plate there, never a hex here:

```scss
$color-primary:   #3b82f6; // plate(blue, 500)
$color-secondary: #4b5563; // plate(gray, 600)
$color-success:   #16a34a; // plate(green, 600)
$color-danger:    #ef4444; // plate(red, 500)
$color-warning:   #f59e0b; // plate(amber, 500)
$color-info:      #06b6d4; // plate(cyan, 500)
$color-light:     #f9fafb; // plate(gray, 50)
$color-dark:      #1f2937; // plate(gray, 800)
$color-white:     #ffffff;
$color-black:     #000000;
```

### Text colors

```scss
$text-color-base:   #111827; // plate(gray, 900)
$text-color-light:  #374151; // plate(gray, 700)
$text-color-muted:  #6b7280; // plate(gray, 500)
```

### Typography

| Variable | Default | Purpose |
| --- | --- | --- |
| `$font-family-base` | `'Helvetica Neue', Helvetica, Arial, sans-serif` | Body font stack |
| `$font-family-heading` | `'Roboto', sans-serif` | Headings |
| `$font-size-base` | `1rem` (16px) | Base body size |
| `$line-height-base` | `1.5` | Body line height |
| `$h1-font-size` | `2.5rem` | h1 |
| `$h2-font-size` | `2rem` | h2 |
| `$h3-font-size` | `1.75rem` | h3 |
| `$h4-font-size` | `1.5rem` | h4 |
| `$h5-font-size` | `1.25rem` | h5 |
| `$h6-font-size` | `1rem` | h6 |

### Spacing scale

A single 4px unit multiplied by integer values keeps the spacing scale consistent and predictable.

```scss
$spacing-unit:  0.25rem; // 4px
$spacing-xxs:   0.125rem; // 2px
$spacing-xs:    0.25rem;  // 4px
$spacing-sm:    0.5rem;   // 8px
$spacing-md:    1rem;     // 16px
$spacing-lg:    1.5rem;   // 24px
$spacing-xl:    2rem;     // 32px
$spacing-xxl:   3rem;     // 48px
```

### Borders

```scss
$border-color-base:   #dee2e6;
$border-radius-sm:    0.25rem;
$border-radius-base:  0.5rem;
$border-width-base:   1px;
```

### Breakpoints (mobile-first)

```scss
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

### Z-index scale

```scss
$z-index-dropdown:        1000;
$z-index-sticky:          1020;
$z-index-fixed:           1030;
$z-index-modal-backdrop:  1040;
$z-index-modal:           1050;
$z-index-tooltip:         1070;
```

### Usage

```scss
@use '../abstract/variables' as *;

.my-component {
  color: $color-primary;
  padding: $spacing-md;
  border-radius: $border-radius-base;
  z-index: $z-index-dropdown;
}
```

### Overriding variables

Create a custom Sass file with the variables you want to override, then `@use` it **before** the framework's variables:

```scss
// your-overrides.scss
$color-primary: #6c5ce7;
$spacing-md: 1.5rem;
```

```scss
// your-app.scss
@use 'your-overrides' as *;
@use 'trueno/src/main';
```

> ⚠️ With Sass modules, all `@use` calls are evaluated in the order they appear. Variables defined in your override file will be available to the rest of the build.

---

## 2. `_mixins.scss`

Reusable Sass mixins for layout, media queries, and component patterns.

### Flexbox helpers

```scss
@include flex-center;        // display:flex; justify-content:center; align-items:center;
@include flex-align($align); // display:flex; align-items:$align;
@include flex-justify($j);   // display:flex; justify-content:$j;
```

Example:

```scss
.toolbar {
  @include flex-align(center);
  justify-content: space-between;
}
```

### Media query mixins

All media query mixins are **mobile-first** (`min-width`).

```scss
@include media-sm { /* 576px and up */ }
@include media-md { /* 768px and up */ }
@include media-lg { /* 992px and up */ }
@include media-xl { /* 1200px and up */ }
```

Example:

```scss
.title {
  font-size: 1.25rem;

  @include media-md {
    font-size: 1.5rem;
  }

  @include media-lg {
    font-size: 2rem;
  }
}
```

### `button-base`

The internal mixin that every `.btn` variant extends.

```scss
@include button-base;
```

Provides: inline-flex display, vertical & horizontal padding, line-height, border styling, transition, focus ring, and disabled state.

### `visually-hidden`

Hides an element visually while keeping it accessible to screen readers.

```scss
@include visually-hidden;
```

Equivalent to the `%visually-hidden` placeholder — see below.

### Usage

```scss
@use '../abstract/mixins' as *;

.hero {
  @include flex-center;
  height: 80vh;

  @include media-md {
    height: 60vh;
  }
}
```

---

## 3. `_functions.scss`

Sass functions for common transformations.

### `rem($pixels)`

Convert a pixel value to a `rem` value, using the base 16px assumption.

```scss
@function rem($pixels) {
  @return math.div($pixels, 16px) * 1rem;
}
```

Example:

```scss
.large-text {
  font-size: rem(24px); // 1.5rem
}
```

### `get-color($color-name)`

Look up a color by name from a `$colors` map. The function throws a clear error if the name does not exist.

```scss
@function get-color($color-name) {
  @if map-has-key($colors, $color-name) {
    @return map-get($colors, $color-name);
  } @else {
    @error "Color '#{$color-name}' not found in $colors map.";
  }
}
```

> ℹ️ The current variables file uses direct variables (`$color-primary`, etc.) rather than a `$colors` map. The function is provided so you can adopt a map-based palette by simply defining `$colors` and switching the components to use `get-color(...)`.

### Usage

```scss
@use '../abstract/functions' as *;

.label {
  font-size: rem(14px);
  color: get-color(primary);
}
```

---

## 4. `_placeholders.scss`

Silent selectors (Sass placeholders) for shared visual patterns. Use `@extend` to share a declaration block without duplicating CSS.

### `%visually-hidden`

Hides an element visually while preserving accessibility.

```scss
%visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
```

Used by `.u-sr-only` and `.u-invisible` in `utilities/_helpers.scss`.

### `%list-reset`

Strips default list styles.

```scss
%list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

Used by `<ul>` and `<ol>` in `base/_resets.scss`.

### `%clearfix`

The classic clearfix pseudo-element trick for floated layouts.

```scss
%clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
```

Used by `.u-clearfix` in `utilities/_helpers.scss`.

### Usage

```scss
@use '../abstract/placeholders' as *;

.skip-link {
  @extend %visually-hidden;

  &:focus {
    position: static !important;
    width: auto;
    // ...
  }
}
```

---

## Layer Summary

| File | Purpose | Produces CSS? |
| --- | --- | --- |
| `_variables.scss` | Design tokens (color, type, spacing, breakpoints) | No |
| `_mixins.scss` | Reusable Sass mixins (flex, media queries, button) | Indirectly (via `@content`) |
| `_functions.scss` | `rem()` and `get-color()` | No |
| `_placeholders.scss` | `%visually-hidden`, `%list-reset`, `%clearfix` | Indirectly (via `@extend`) |

For a deep dive into how these tokens are *applied*, see the per-layer docs: [Base](./base.md), [Layout](./layout.md), [Components](./components.md), [Utilities](./utilities.md), [Themes](./themes.md).
