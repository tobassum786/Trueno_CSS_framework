# Layout

The **layout layer** provides page-level structural primitives: a flexible 12-column grid, a fixed-width container, and the default site header.

Source: `src/layout/`

```
layout/
├── _grid.scss
└── _header.scss
```

---

## 1. `_grid.scss`

A modern, responsive layout system built around two interchangeable engines: a **Flexbox** `.row`/`.col` grid for mixed layouts and simple splits, plus a native **CSS Grid** `.grid` system for exact track counts and card lanes. Both are mobile-first — span classes apply full-width by default and opt-in to tracks at larger breakpoints.

Gutters are driven by CSS custom properties (`--gutter-x` / `--gutter-y` / `--grid-gutter`). The Flexbox grid sizes its gutters with padding + negative margins so the 12-track percentages always total exactly 100% and never wrap; the CSS Grid system uses native `gap`, which Grid resolves automatically against its tracks.

### Container

`.container` is a centered, max-width wrapper.

```css
.container {
  max-width: 1200px; /* $breakpoint-xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;  /* $spacing-md */
  padding-right: 1rem; /* $spacing-md */
}
```

Usage:

```html
<div class="container">
  <!-- page content -->
</div>
```

### Rows and columns

- `.row` is a horizontal flex container that wraps. Columns are spaced with `gap`, not padding.
- `.col` automatically grows to fill available space (`flex-grow: 1`).
- `.col-auto` sizes a column to its content instead of stretching.
- `.col-{n}` is a fixed column that takes `n` of 12 tracks.
- `.col-{breakpoint}-{n}` applies the span **at that breakpoint and up**.

### Generated column classes

| Breakpoint | Min-width | Generated classes |
| --- | --- | --- |
| (none) | 0px | `.col-1` through `.col-12` |
| `sm` | 576px | `.col-sm-1` through `.col-sm-12` |
| `md` | 768px | `.col-md-1` through `.col-md-12` |
| `lg` | 992px | `.col-lg-1` through `.col-lg-12` |
| `xl` | 1200px | `.col-xl-1` through `.col-xl-12` |

Each column uses `flex: 0 0 calc(100% / 12 * n)` and the same `max-width`, so columns sit on a single line until the row wraps.

### Example

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Full width on small, half on md, one-third on lg -->
    </div>
    <div class="col-12 col-md-6 col-lg-8">
      <!-- Full width on small, half on md, two-thirds on lg -->
    </div>
  </div>
</div>
```

### Auto-layout columns

Use `.col` to let columns share remaining space:

```html
<div class="row">
  <div class="col">Auto</div>
  <div class="col-6">Half</div>
  <div class="col">Auto</div>
</div>
```

### Gutters

Every `.row` exposes `--gutter-x` (default `$spacing-md`, 16px) and `--gutter-y` (default 0). Columns carry the gutter as padding, and the row's negative margins cancel it at the edges, so fixed-width columns always fit the 12-track math exactly. Tweak them with the built-in helpers or set the custom properties directly:

```css
.row { --gutter-x: 2rem; --gutter-y: 1rem; }
```

| Class | Sets | Values |
| --- | --- | --- |
| `.g-{size}` | both axes | `0` · `xs` (4px) · `sm` (8px) · `md` (16px) · `lg` (24px) · `xl` (32px) |
| `.gx-{size}` | horizontal only | same scale |
| `.gy-{size}` | vertical only | same scale |

### Offsets and reordering

Push columns across tracks with `.offset-{n}` (and `.offset-md-*` / `.offset-lg-*`), or reorder them with `.order-first`, `.order-last`, `.order-1` through `.order-4`.

### Modern CSS Grid

For card lanes and exact track counts, use the native CSS Grid engine:

- A bare `.grid` builds an **auto-filling card layout** — tracks are at least `--grid-min` (default `14rem`) wide and wrap automatically.
- `.grid-cols-{2..6}` (plus `-{bp}-` variants) pins the exact number of tracks.
- `.grid-span-{n}` stretches a cell across `n` tracks.

```html
<div class="grid">
  <div>Card</div>
  <div>Card</div>
  <div>Card</div>
</div>

<div class="grid grid-cols-md-3">
  <div class="grid-span-2">Wide cell</div>
  <div>1 track</div>
</div>
```

### Nesting

You can nest a `.row` inside any column, or a `.grid` inside any grid cell, to create complex layouts:

```html
<div class="row">
  <div class="col-md-6">
    <div class="row">
      <div class="col-6">Nested 1</div>
      <div class="col-6">Nested 2</div>
    </div>
  </div>
  <div class="col-md-6">
    Main column
  </div>
</div>
```

### Code reference

```scss
.container {
  max-width: $breakpoint-xl;
  margin-inline: auto;
  padding-inline: $spacing-md;
}

.row {
  --gutter-x: #{$spacing-md};
  --gutter-y: 0;

  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--gutter-y) * -1);
  margin-left: calc(var(--gutter-x) * -0.5);
  margin-right: calc(var(--gutter-x) * -0.5);

  > [class*="col"] {
    padding-left: calc(var(--gutter-x) * 0.5);
    padding-right: calc(var(--gutter-x) * 0.5);
    margin-top: var(--gutter-y);
    min-width: 0;
  }
}

.col {
  flex: 1 1 0%;
  min-width: 0;
}

.col-auto {
  flex: 0 0 auto;
  width: auto;
}

@for $i from 1 through 12 {
  .col-#{$i} {
    flex: 0 0 calc(100% * #{$i} / 12);
    max-width: calc(100% * #{$i} / 12);
  }
}

@include media-sm { @for $i from 1 through 12 { .col-sm-#{$i} { ... } } }
@include media-md { @for $i from 1 through 12 { .col-md-#{$i} { ... } } }
@include media-lg { @for $i from 1 through 12 { .col-lg-#{$i} { ... } } }
@include media-xl { @for $i from 1 through 12 { .col-xl-#{$i} { ... } } }
```

---

## 2. `_header.scss`

The default site header pattern. Use it as-is for a quick branded top bar, or extend the classes for a more complex navigation.

### Block structure

```
.main-header
├── .main-header__logo
│   └── a
└── nav.main-nav
    └── .main-nav__list
        └── .main-nav__item
            └── a
```

### Class reference

| Class | Purpose |
| --- | --- |
| `.main-header` | Dark background, white text, vertical padding, bottom border. |
| `.main-header .container` | Flex container that aligns logo and nav with `space-between`. |
| `.main-header__logo` | Heading font, large size, bold. |
| `.main-header__logo a` | White link, no underline, primary color on hover. |
| `.main-nav__list` | Flex list (no default `<ul>` styling, thanks to `%list-reset`). |
| `.main-nav__item` | Spacing between items via `margin-left`. |
| `.main-nav__item a` | Light gray link, primary color on hover. |

### Example

```html
<header class="main-header">
  <div class="container">
    <div class="main-header__logo">
      <a href="/">⚡ Trueno</a>
    </div>
    <nav class="main-nav">
      <ul class="main-nav__list">
        <li class="main-nav__item"><a href="/">Home</a></li>
        <li class="main-nav__item"><a href="/docs">Docs</a></li>
        <li class="main-nav__item"><a href="/about">About</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### Code reference

```scss
.main-header {
  background-color: $color-dark;
  color: $color-white;
  padding: $spacing-md 0;
  border-bottom: $border-width-base solid color.adjust($color-dark, $lightness: 10%);

  .container {
    @include flex-align(center);
    justify-content: space-between;
  }
}

.main-header__logo {
  font-family: $font-family-heading;
  font-size: $h3-font-size;
  font-weight: bold;

  a {
    color: $color-white;
    text-decoration: none;

    &:hover {
      color: $color-primary;
      text-decoration: none;
    }
  }
}

.main-nav__list {
  @include flex-align(center);
}

.main-nav__item {
  margin-left: $spacing-lg;

  a {
    color: $color-light;
    font-size: $font-size-base;
    padding: $spacing-xs 0;

    &:hover {
      color: $color-primary;
      text-decoration: none;
    }
  }
}
```

### Theming

The dark theme (`themes/_dark-theme.scss`) provides `.theme--dark .main-header` overrides that lighten the background and tweak link colors. See [Themes](./themes.md) for details.

---

## Layout Best Practices

1. **Always use `.container` for page content.** A naked `.row` will span the full viewport width.
2. **Combine column classes for responsive layouts.** `.col-12 col-md-6 col-lg-4` is the canonical "stack on mobile, half on tablet, third on desktop" pattern.
3. **Let the gutter variables do the spacing.** Don't add margins/padding to columns for gutters — use `.g-*`, `.gx-*`, `.gy-*`, or set `--gutter-x`/`--gutter-y` on the row.
4. **Pick the right engine.** Use `.row`/`.col` for simple splits and mixed-content rows; switch to `.grid` + `.grid-cols-*` when you need exact track counts, dense card lanes, or auto-fill wrapping.
5. **Use `.main-header` as a starting point.** It is designed to be extended: add a search box, dropdowns, or a mobile menu as children.
